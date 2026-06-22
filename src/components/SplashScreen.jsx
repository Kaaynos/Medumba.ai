import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { listenAuthState } from '../services/authService';

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let navTimer;
    let fadeTimer;

    // Wait for Supabase to resolve auth state, then navigate
    const unsubscribe = listenAuthState((user) => {
      unsubscribe();

      fadeTimer = setTimeout(() => setVisible(false), 2000);
      navTimer  = setTimeout(() => onFinish(user), 2500);
    });

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#ffffff',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-out', zIndex: 50,
    }}>
      <style>{`
        @keyframes splash-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes spin-dots { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .splash-dot { position: absolute; border-radius: 50%; background: #0056D2; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'splash-pulse 2s infinite ease-in-out' }}>
        <img src={logo} alt="Medumba" style={{ width: '120px', height: 'auto', marginBottom: '1.25rem' }} />
        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.02em' }}>Medumba</span>
      </div>

      <div style={{ position: 'absolute', bottom: '80px', width: '48px', height: '48px', animation: 'spin-dots 1.2s linear infinite' }}>
        {[...Array(8)].map((_, i) => {
          const angle  = (i / 8) * 360;
          const rad    = (angle * Math.PI) / 180;
          const radius = 20;
          const size   = Math.round(4 + (i / 8) * 6);
          const x      = 24 + radius * Math.cos(rad) - size / 2;
          const y      = 24 + radius * Math.sin(rad) - size / 2;
          return (
            <span key={i} className="splash-dot" style={{ left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`, opacity: 0.2 + (i / 8) * 0.8 }} />
          );
        })}
      </div>
    </div>
  );
};

export default SplashScreen;
