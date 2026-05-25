import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { listenAuthState } from '../../services/authService';

const logo = require('../../../assets/logo.png');

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.04, duration: 1000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1,    duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Wait for Firebase auth state then route accordingly
    const unsubscribe = listenAuthState((user) => {
      unsubscribe(); // only need first result

      const fadeTimer = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
      }, 2000);

      const navTimer = setTimeout(() => {
        navigation.replace(user ? 'Dashboard' : 'Welcome');
      }, 2500);

      return () => { clearTimeout(fadeTimer); clearTimeout(navTimer); };
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View style={[styles.logoWrap, { transform: [{ scale }] }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Medumba</Text>
        <Text style={styles.subtitle}>Apprenez la langue de votre famille</Text>
      </Animated.View>
      <ActivityIndicator
        size="large"
        color={colors.primaryDark}
        style={styles.spinner}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: { alignItems: 'center' },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', color: colors.black, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 6 },
  spinner: { position: 'absolute', bottom: 80 },
});
