import { useState } from 'react';
import { updateUserPassword } from '../services/authService';

const B = '#1B4FD8';

const Eye = ({ crossed }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
        {crossed && <line x1="1" y1="1" x2="23" y2="23"/>}
    </svg>
);

const NewPasswordPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [password, setPassword]       = useState('');
    const [confirm, setConfirm]         = useState('');
    const [showPass, setShowPass]       = useState(false);
    const [showConf, setShowConf]       = useState(false);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState('');

    const isLong  = password.length >= 6;
    const isMatch = password === confirm && confirm.length > 0;
    const ok      = isLong && isMatch;

    const t = {
        title:     isFrench ? 'Nouveau mot de passe 🔒'              : 'Create new password 🔒',
        sub:       isFrench ? 'Votre nouveau mot de passe doit être différent de celui utilisé précédemment.' : 'Save the new password in a safe place, if you forget it then you have to do a forgot password again.',
        pwLbl:     isFrench ? 'Nouveau mot de passe'                 : 'Create a new password',
        pwPH:      isFrench ? 'Minimum 6 caractères'                 : 'Minimum 6 characters',
        cfLbl:     isFrench ? 'Confirmer le mot de passe'            : 'Confirm a new password',
        cfPH:      isFrench ? 'Répétez le mot de passe'              : 'Repeat your password',
        mismatch:  isFrench ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match',
        remember:  isFrench ? 'Se souvenir de moi'                   : 'Remember me',
        btn:       isFrench ? 'Continuer'                            : 'Continue',
    };

    async function handleNext() {
        if (!ok || loading) return;
        setError('');
        setLoading(true);
        try {
            await updateUserPassword(password);
            onNext();
        } catch (e) {
            console.error('[update-password]', e);
            setError(isFrench ? 'Erreur lors de la mise à jour. Réessayez.' : 'Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const underline = {
        border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 2.5rem 0.5rem 0',
        fontSize: '1.1rem', fontWeight: '600', width: '100%', outline: 'none',
        backgroundColor: 'transparent', color: '#0f172a', fontFamily: 'inherit',
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>{t.title}</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500' }}>{t.sub}</p>

                {/* New password */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{t.pwLbl}</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.pwPH} style={{ ...underline, borderBottomColor: password && !isLong ? '#f87171' : B }} />
                        <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Eye crossed={showPass} />
                        </button>
                    </div>
                </div>

                {/* Confirm password */}
                <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{t.cfLbl}</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showConf ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder={t.cfPH} style={{ ...underline, borderBottomColor: confirm && !isMatch ? '#f87171' : B }} />
                        <button type="button" onClick={() => setShowConf(!showConf)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Eye crossed={showConf} />
                        </button>
                    </div>
                </div>

                {confirm && !isMatch && <span style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: '600' }}>{t.mismatch}</span>}
                {error && <p style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: '600', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

                <div style={{ flex: 1 }} />
                <button onClick={handleNext} disabled={!ok || loading} style={{ width: '100%', backgroundColor: ok && !loading ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: ok && !loading ? 'pointer' : 'not-allowed', boxShadow: ok && !loading ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.4px', fontFamily: 'inherit', marginTop: '2rem' }}>
                    {loading ? '...' : t.btn}
                </button>
            </div>
        </div>
    );
};

export default NewPasswordPage;
