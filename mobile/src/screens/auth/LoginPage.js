import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { loginUser } from '../../services/authService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const logo = require('../../../assets/logo.png');

GoogleSignin.configure({
  webClientId: '363865771897-csfsjtsnrulsr6vr345p5t3jih7irink.apps.googleusercontent.com',
});

export default function LoginPage({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]       = useState('');

  const valid = email.includes('@') && password.length >= 6;

  async function handleLogin() {
    if (!valid || loading) return;
    setError('');
    setLoading(true);
    try {
      await loginUser(email, password);
      navigation.replace('Dashboard');
    } catch (e) {
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        setError('E-mail ou mot de passe incorrect.');
      } else if (e.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Réessayez plus tard.');
      } else {
        setError('Erreur de connexion. Réessayez.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(data.idToken);
      const result = await signInWithCredential(auth, credential);
      const uid = result.user.uid;

      // Create Firestore profile if first login
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) {
        await setDoc(doc(db, 'users', uid), {
          name:             result.user.displayName || '',
          email:            result.user.email || '',
          age:              null,
          language:         'french',
          reason:           null,
          dailyGoal:        10,
          xp:               0,
          streak:           0,
          gems:             50,
          hearts:           5,
          level:            'A1',
          completedLessons: [],
          createdAt:        serverTimestamp(),
          lastSeen:         serverTimestamp(),
        });
      }
      navigation.replace('Dashboard');
    } catch (e) {
      if (e.code !== 'SIGN_IN_CANCELLED') {
        setError('Connexion Google échouée. Réessayez.');
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>Bon retour !</Text>
          <Text style={styles.sub}>Connectez-vous pour reprendre votre progression.</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Adresse e-mail"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!show}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow(s => !s)}>
              <Text>{show ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.btn, (!valid || loading) && styles.btnDisabled]}
            disabled={!valid || loading}
            onPress={handleLogin}
          >
            {loading
              ? <ActivityIndicator color={colors.white} />
              : <Text style={styles.btnText}>SE CONNECTER</Text>
            }
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.googleBtn, googleLoading && styles.btnDisabled]}
            disabled={googleLoading}
            onPress={handleGoogleLogin}
          >
            {googleLoading
              ? <ActivityIndicator color={colors.black} />
              : (
                <View style={styles.googleInner}>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.googleText}>Continuer avec Google</Text>
                </View>
              )
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.registerLink}>
            <Text style={styles.registerText}>
              Pas encore de compte ? <Text style={styles.registerHighlight}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, paddingTop: 16 },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  logo: { width: 90, height: 90, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '900', color: colors.black, marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.grayBg,
    marginBottom: 14,
  },
  inputWrap: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: 16, top: 14 },
  forgot: { alignSelf: 'flex-end', marginBottom: 16 },
  forgotText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  errorText: {
    fontSize: 13,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.grayLight, shadowOpacity: 0, elevation: 0 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 12, fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  googleBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.white,
  },
  googleInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  googleIcon: { fontSize: 18, fontWeight: '900', color: '#4285F4' },
  googleText: { fontSize: 15, fontWeight: '700', color: colors.black },
  registerLink: { alignItems: 'center' },
  registerText: { fontSize: 14, color: colors.textMuted },
  registerHighlight: { color: colors.primary, fontWeight: '700' },
});
