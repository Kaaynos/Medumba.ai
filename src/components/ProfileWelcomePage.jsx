import { useState } from 'react';
import profileVector from '../assets/welcom vector.png';
import logo from '../assets/logo.png';
import { loginWithGoogle } from '../services/authService';

const ProfileWelcomePage = ({ onNext, nativeLang }) => {
    const isFr = nativeLang === 'french';
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [error, setError] = useState('');

    const handleGoogle = async () => {
        setError('');
        setLoadingGoogle(true);
        try {
            await loginWithGoogle();
            // auth state listener in App.jsx handles redirect to step 15
        } catch (e) {
            setError(isFr ? 'Connexion Google annulée ou échouée.' : 'Google sign-in cancelled or failed.');
            setLoadingGoogle(false);
        }
    };

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center',
            padding: '2rem 1.5rem',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes pw-bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} 60%{transform:translateY(-5px)} }
                @keyframes pw-pop    { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
                @keyframes pw-fade   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
                @keyframes spin      { to{transform:rotate(360deg)} }
            `}</style>

            <img src={logo} alt="Medumba Logo" style={{ width: '90px', height: 'auto', marginBottom: '0.75rem', animation: 'pw-fade 0.4s ease-out both' }} />

            <div style={{ position: 'relative', width: '100%', maxWidth: '360px', marginBottom: '1.5rem', animation: 'pw-fade 0.45s ease-out 0.1s both' }}>
                <img src={profileVector} alt="Heritage learners" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{
                    position: 'absolute', top: '6%', left: '30%',
                    backgroundColor: '#d97706', color: '#fff',
                    borderRadius: '10px 10px 10px 2px', padding: '0.25rem 0.7rem',
                    fontSize: '0.7rem', fontWeight: '900', boxShadow: '0 2px 8px rgba(217,119,6,0.4)',
                    whiteSpace: 'nowrap', animation: 'pw-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s both',
                }}>
                    {isFr ? '🌱 Mon parcours' : '🌱 My journey'}
                </div>
                <div style={{
                    position: 'absolute', top: '3%', right: '6%',
                    backgroundColor: '#1B4FD8', color: '#fff',
                    borderRadius: '10px 10px 2px 10px', padding: '0.25rem 0.7rem',
                    fontSize: '0.7rem', fontWeight: '900', boxShadow: '0 2px 8px rgba(27,79,216,0.4)',
                    whiteSpace: 'nowrap', animation: 'pw-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.45s both',
                }}>
                    {isFr ? '🔥 Ma progression' : '🔥 My progress'}
                </div>
            </div>

            <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1B4FD8', marginBottom: '0.5rem', animation: 'pw-bounce 2s infinite' }}>
                {isFr ? 'Sauvegardez votre voyage 🏡' : 'Save your reconnection journey 🏡'}
            </div>

            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '2rem', fontWeight: '600', maxWidth: '300px', lineHeight: 1.6, animation: 'pw-fade 0.5s ease-out 0.2s both' }}>
                {isFr
                    ? 'Créez un profil pour ne jamais perdre vos progrès et retrouver votre chemin chaque jour.'
                    : 'Create a profile to never lose your progress and find your way back every day.'}
            </p>

            {error && (
                <div style={{ marginBottom: '1rem', fontSize: '0.83rem', color: '#ef4444', fontWeight: '600', backgroundColor: '#fef2f2', padding: '0.6rem 1rem', borderRadius: '10px', maxWidth: '300px' }}>
                    {error}
                </div>
            )}

            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'pw-fade 0.5s ease-out 0.3s both' }}>
                {/* Google button */}
                <button
                    onClick={handleGoogle}
                    disabled={loadingGoogle}
                    style={{
                        width: '100%', backgroundColor: '#fff', color: '#1e293b',
                        padding: '1rem', borderRadius: '9999px',
                        fontSize: '0.95rem', fontWeight: '700',
                        border: '2px solid #e2e8f0', cursor: loadingGoogle ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        opacity: loadingGoogle ? 0.7 : 1,
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (!loadingGoogle) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
                >
                    {loadingGoogle ? (
                        <span style={{ width: '20px', height: '20px', border: '2.5px solid #cbd5e1', borderTopColor: '#1B4FD8', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                    )}
                    {loadingGoogle
                        ? (isFr ? 'Connexion...' : 'Signing in...')
                        : (isFr ? 'Continuer avec Google' : 'Continue with Google')}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '600' }}>{isFr ? 'ou' : 'or'}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                </div>

                {/* Email button */}
                <button onClick={onNext} style={{
                    width: '100%', backgroundColor: '#1B4FD8', color: '#fff',
                    padding: '1.1rem', borderRadius: '9999px',
                    fontSize: '1rem', fontWeight: '800', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 20px rgba(27,79,216,0.3)',
                    letterSpacing: '0.3px', transition: 'all 0.15s',
                }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0041a3'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1B4FD8'; }}
                >
                    {isFr ? 'CRÉER AVEC EMAIL' : 'CREATE WITH EMAIL'}
                </button>
            </div>
        </div>
    );
};

export default ProfileWelcomePage;
