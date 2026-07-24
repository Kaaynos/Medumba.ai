import { useState } from 'react';
import { registerUser, resendConfirmationEmail } from '../services/authService';

const B = '#1B4FD8';

const Eye = ({ crossed }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
        {crossed && <line x1="1" y1="1" x2="23" y2="23"/>}
    </svg>
);

const DAILY_GOAL_MAP = { relaxed: 5, normal: 10, serious: 15, great: 30, awesome: 60 };

const PasswordPage = ({ onNext, onBack, nativeLang, registrationData = {} }) => {
    const isFrench = nativeLang === 'french';
    const [password, setPassword] = useState('');
    const [show, setShow]         = useState(false);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState('');
    const [needsConfirmation, setNeedsConfirmation] = useState(false);
    const [resendState, setResendState] = useState('idle'); // idle | sending | sent

    const h   = isFrench ? "Crée un mot de passe 🔒" : "Create a password 🔒";
    const lbl = isFrench ? "Mot de passe" : "Password";
    const ph  = isFrench ? "Minimum 6 caractères" : "Minimum 6 characters";
    const btn = isFrench ? "C'est parti !" : "Let's go!";
    const ok  = password.length >= 6;

    async function handleNext() {
        if (!ok || loading) return;
        setError('');
        setLoading(true);
        try {
            const user = await registerUser({
                name:      registrationData.name     || '',
                email:     registrationData.email    || '',
                password,
                age:       registrationData.age      || null,
                language:  isFrench ? 'french' : 'english',
                reason:    registrationData.reason   || null,
                dailyGoal: DAILY_GOAL_MAP[registrationData.dailyGoal] ?? 10,
            });
            if (user?.needsEmailConfirmation) {
                setNeedsConfirmation(true);
            } else {
                onNext();
            }
        } catch (e) {
            console.error('[register]', e);
            const msg = (e.message || '').toLowerCase();
            if (e.message === 'EMAIL_ALREADY_LINKED') {
                setError(isFrench
                    ? 'Un compte existe déjà avec cet e-mail (peut-être via Google). Connectez-vous avec Google, ou utilisez "Mot de passe oublié" pour en créer un.'
                    : 'An account already exists with this email (maybe via Google). Sign in with Google instead, or use "Forgot password" to set one.');
            } else if (msg.includes('already registered') || msg.includes('already in use') || e.status === 422) {
                setError(isFrench ? 'Cette adresse e-mail est déjà utilisée.' : 'This email is already in use.');
            } else if (msg.includes('invalid email') || msg.includes('email') && msg.includes('invalid')) {
                setError(isFrench ? 'Adresse e-mail invalide.' : 'Invalid email address.');
            } else if (msg.includes('password') && (msg.includes('6') || msg.includes('weak') || msg.includes('short'))) {
                setError(isFrench ? 'Mot de passe trop court (6 caractères min.).' : 'Password too short (min. 6 characters).');
            } else {
                setError((isFrench ? 'Erreur : ' : 'Error: ') + (e.message || (isFrench ? 'Réessayez.' : 'Try again.')));
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        if (resendState === 'sending') return;
        setResendState('sending');
        try {
            await resendConfirmationEmail(registrationData.email || '');
            setResendState('sent');
        } catch (e) {
            console.error('[resend-confirmation]', e);
            setResendState('idle');
        }
    }

    if (needsConfirmation) {
        return (
            <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>📬</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                        {isFrench ? 'Confirmez votre e-mail' : 'Confirm your email'}
                    </h1>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
                        {isFrench
                            ? `Nous avons envoyé un lien de confirmation à ${registrationData.email}. Cliquez dessus pour activer votre compte, puis connectez-vous.`
                            : `We've sent a confirmation link to ${registrationData.email}. Click it to activate your account, then log in.`}
                    </p>
                    {resendState === 'sent' ? (
                        <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.9rem' }}>
                            {isFrench ? 'E-mail renvoyé !' : 'Email resent!'}
                        </p>
                    ) : (
                        <button onClick={handleResend} disabled={resendState === 'sending'} style={{ background: 'none', border: 'none', color: B, fontWeight: '700', fontSize: '0.9rem', cursor: resendState === 'sending' ? 'default' : 'pointer', fontFamily: 'inherit' }}>
                            {resendState === 'sending' ? (isFrench ? 'Envoi…' : 'Sending…') : (isFrench ? "Renvoyer l'e-mail" : 'Resend email')}
                        </button>
                    )}
                    <button onClick={onBack} style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#94a3b8', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {isFrench ? '← Retour' : '← Back'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2.5rem' }}>{h}</h1>
                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{lbl}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={show ? 'text' : 'password'} value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder={ph}
                            style={{ border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 2.5rem 0.5rem 0', fontSize: '1.15rem', fontWeight: '600', width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a' }}
                        />
                        <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}>
                            <Eye crossed={show} />
                        </button>
                    </div>
                </div>

                {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                <div style={{ flex: 1 }} />
                <button
                    onClick={handleNext}
                    disabled={!ok || loading}
                    style={{
                        width: '100%', backgroundColor: ok && !loading ? B : '#cbd5e1',
                        color: '#fff', padding: '1.1rem', borderRadius: '9999px',
                        fontSize: '1.05rem', fontWeight: '700', border: 'none',
                        cursor: ok && !loading ? 'pointer' : 'not-allowed',
                        boxShadow: ok && !loading ? '0 8px 24px rgba(27,79,216,0.3)' : 'none',
                        letterSpacing: '0.3px',
                    }}
                >
                    {loading ? '...' : btn}
                </button>
            </div>
        </div>
    );
};

export default PasswordPage;
