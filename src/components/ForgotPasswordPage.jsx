import { useState } from 'react';
import { resetPassword } from '../services/authService';

const B = '#1B4FD8';

const ForgotPasswordPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail]     = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent]       = useState(false);
    const [error, setError]     = useState('');

    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const t = {
        title:     isFrench ? 'Mot de passe oublié 🔑'                                          : 'Forgot Password 🔑',
        sub:       isFrench ? 'Entrez votre adresse e-mail et nous vous enverrons un lien de réinitialisation.' : 'Enter your email and we\'ll send you a reset link.',
        lbl:       isFrench ? 'Email'                                                             : 'Email',
        ph:        isFrench ? 'ex. nom@exemple.com'                                               : 'e.g. name@example.com',
        btn:       isFrench ? 'Envoyer le lien'                                                   : 'Send reset link',
        sentTitle: isFrench ? 'E-mail envoyé !'                                                   : 'Email sent!',
        sentSub:   isFrench ? `Vérifiez votre boîte mail à ${email} et suivez le lien pour réinitialiser votre mot de passe.` : `Check your inbox at ${email} and follow the link to reset your password.`,
        backLogin: isFrench ? 'Retour à la connexion'                                             : 'Back to login',
    };

    async function handleSend() {
        if (!ok || loading) return;
        setError('');
        setLoading(true);
        try {
            await resetPassword(email);
            setSent(true);
        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                setError(isFrench ? 'Aucun compte trouvé avec cette adresse.' : 'No account found with this email.');
            } else {
                setError(isFrench ? "Erreur lors de l'envoi. Réessayez." : 'Failed to send. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📧</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>{t.sentTitle}</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7', textAlign: 'center', maxWidth: '380px', marginBottom: '2.5rem' }}>{t.sentSub}</p>
                <button
                    onClick={onNext}
                    style={{ padding: '1rem 2.5rem', backgroundColor: B, color: '#fff', border: 'none', borderRadius: '9999px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                    {t.backLogin}
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>{t.title}</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500' }}>{t.sub}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{t.lbl}</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.ph}
                        style={{ border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 0', fontSize: '1.1rem', fontWeight: '600', width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a', fontFamily: 'inherit' }}
                    />
                </div>

                {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>
                )}

                <div style={{ flex: 1 }} />
                <button
                    onClick={handleSend}
                    disabled={!ok || loading}
                    style={{
                        width: '100%', backgroundColor: ok && !loading ? B : '#cbd5e1',
                        color: '#fff', padding: '1.1rem', borderRadius: '9999px',
                        fontSize: '1.05rem', fontWeight: '700', border: 'none',
                        cursor: ok && !loading ? 'pointer' : 'not-allowed',
                        boxShadow: ok && !loading ? '0 8px 24px rgba(27,79,216,0.3)' : 'none',
                        letterSpacing: '0.4px', fontFamily: 'inherit',
                    }}
                >
                    {loading ? '...' : t.btn}
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
