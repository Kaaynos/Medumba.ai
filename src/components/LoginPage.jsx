import { useState } from 'react';
import { loginUser, loginWithGoogle } from '../services/authService';

const B = '#1B4FD8';

const Eye = ({ crossed }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
        {crossed && <line x1="1" y1="1" x2="23" y2="23"/>}
    </svg>
);

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

const LoginPage = ({ onLogin, onBack, onForgotPassword, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw]     = useState(false);
    const [loading, setLoading]   = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError]       = useState('');

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

    const t = {
        title:   isFrench ? 'Bon retour 👋🏽'           : 'Hello there 👋',
        emLbl:   isFrench ? 'Adresse e-mail'            : 'Email',
        emPH:    isFrench ? 'ex. nom@exemple.com'       : 'e.g. name@example.com',
        pwLbl:   isFrench ? 'Mot de passe'              : 'Password',
        pwPH:    isFrench ? 'Entrez votre mot de passe' : 'Enter your password',
        forgot:  isFrench ? 'Mot de passe oublié ?'     : 'Forgot Password?',
        signIn:  isFrench ? 'SE CONNECTER'              : 'SIGN IN',
        google:  isFrench ? 'Continuer avec Google'     : 'Continue with Google',
        or:      isFrench ? 'ou'                        : 'or',
    };

    const underline = {
        border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 0',
        fontSize: '1.1rem', fontWeight: '600', width: '100%', outline: 'none',
        backgroundColor: 'transparent', color: '#0f172a', fontFamily: 'inherit',
    };

    async function handleLogin() {
        if (!isValid || loading) return;
        setError('');
        setLoading(true);
        try {
            const user = await loginUser(email, password);
            onLogin({ user });
        } catch (e) {
            console.error('[login]', e);
            const msg = (e.message || '').toLowerCase();
            if (msg.includes('invalid') || msg.includes('credentials') || msg.includes('not found') || msg.includes('wrong')) {
                setError(isFrench
                    ? 'E-mail ou mot de passe incorrect. Si vous vous êtes inscrit·e avec Google, utilisez "Continuer avec Google" ci-dessus, ou "Mot de passe oublié ?" pour en créer un.'
                    : 'Incorrect email or password. If you signed up with Google, use "Continue with Google" above, or "Forgot Password?" to set one.');
            } else if (msg.includes('too many') || msg.includes('rate') || e.status === 429) {
                setError(isFrench ? 'Trop de tentatives. Réessayez plus tard.' : 'Too many attempts. Try again later.');
            } else {
                setError((isFrench ? 'Erreur : ' : 'Error: ') + (e.message || (isFrench ? 'Réessayez.' : 'Try again.')));
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogle() {
        setError('');
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            // Navigation handled instantly by the persistent auth listener in App.jsx
        } catch (e) {
            console.error('[google-login]', e);
            const msg = (e.message || '').toLowerCase();
            if (!msg.includes('cancelled') && !msg.includes('closed')) {
                setError((isFrench ? 'Google : ' : 'Google: ') + (e.message || (isFrench ? 'Réessayez.' : 'Try again.')));
            }
        } finally {
            setGoogleLoading(false);
        }
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2.5rem' }}>{t.title}</h1>

                {/* Google Sign-In */}
                <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '10px', padding: '0.9rem', borderRadius: '9999px',
                        border: '2px solid #e2e8f0', backgroundColor: '#fff',
                        fontSize: '1rem', fontWeight: '700', cursor: googleLoading ? 'not-allowed' : 'pointer',
                        color: '#0f172a', fontFamily: 'inherit', marginBottom: '1.5rem',
                        opacity: googleLoading ? 0.6 : 1,
                    }}
                >
                    {googleLoading ? '...' : <><GoogleIcon />{t.google}</>}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>{t.or}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.4rem' }}>{t.emLbl}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emPH} style={underline} />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.4rem' }}>{t.pwLbl}</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.pwPH} style={{ ...underline, paddingRight: '2.5rem' }} />
                        <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Eye crossed={showPw} />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    <button onClick={onForgotPassword} style={{ background: 'none', border: 'none', color: B, fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {t.forgot}
                    </button>
                </div>

                {error && (
                    <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}

                <div style={{ flex: 1 }} />
                <button
                    onClick={handleLogin}
                    disabled={!isValid || loading}
                    style={{
                        width: '100%', backgroundColor: isValid && !loading ? B : '#cbd5e1',
                        color: '#fff', padding: '1.1rem', borderRadius: '9999px',
                        fontSize: '1.05rem', fontWeight: '700', border: 'none',
                        cursor: isValid && !loading ? 'pointer' : 'not-allowed',
                        boxShadow: isValid && !loading ? '0 8px 24px rgba(27,79,216,0.3)' : 'none',
                        letterSpacing: '0.5px',
                    }}
                >
                    {loading ? '...' : t.signIn}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
