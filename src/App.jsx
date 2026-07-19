import { useState, useEffect } from 'react';
import { getZodiacSign, getZodiacProfile, getMotivationMessage } from './utils/zodiac';
import { logoutUser, listenAuthState, getUserProfile } from './services/authService';
import { getPaymentSuccessFromUrl } from './config/stripe';
import SplashScreen             from './components/SplashScreen';
import WelcomePage              from './components/WelcomePage';
import LanguageSelectionPage    from './components/LanguageSelectionPage';
import ConnectionPage           from './components/ConnectionPage';
import ProficiencyPage          from './components/ProficiencyPage';
import ReasonPage               from './components/ReasonPage';
import AchievePage              from './components/AchievePage';
import DailyGoalPage            from './components/DailyGoalPage';
import ProfileWelcomePage       from './components/ProfileWelcomePage';
import NamePage                 from './components/NamePage';
import AgePage                  from './components/AgePage';
import EmailPage                from './components/EmailPage';
import PasswordPage             from './components/PasswordPage';
import SuccessPage              from './components/SuccessPage';
import LoginPage                from './components/LoginPage';
import ForgotPasswordPage       from './components/ForgotPasswordPage';
import OTPVerificationPage      from './components/OTPVerificationPage';
import NewPasswordPage          from './components/NewPasswordPage';
import PasswordResetSuccessPage from './components/PasswordResetSuccessPage';
import LandingPage              from './components/LandingPage';
import QuickSetupPage           from './components/QuickSetupPage';
import DashboardPage            from './components/DashboardPage';
import CalendarPage             from './components/CalendarPage';
import VideoPage                from './components/VideoPage';
import CountingPage             from './components/CountingPage';
import DictionaryPage           from './components/DictionaryPage';
import PronunciationPage        from './components/PronunciationPage';
import AlphabetPage             from './components/AlphabetPage';
import CepomPage                from './components/CepomPage';
import ContactPage              from './components/ContactPage';
import AdminPage                from './components/AdminPage';
import AppDownloadPage          from './components/AppDownloadPage';
import PrivacyPage              from './components/PrivacyPage';
import TermsPage                from './components/TermsPage';
import ChatWidget                from './components/ChatWidget';
import ErrorBoundary            from './components/ErrorBoundary';
import { ThemeProvider }        from './context/ThemeContext';

// ─── Step map ───────────────────────────────────────────────────────────────
//  0  Splash
//  1  Welcome
//  2  Language Selection
//  3  Connection         ┐
//  4  Proficiency        │ Courses onboarding
//  5  Reason             │
//  6  Achieve            │
//  7  Daily Goal         ┘
//  8  Profile Welcome  (Skip→15) ┐
//  9  Name                       │ Account creation
// 10  Age                        │
// 11  Email                      │
// 12  Password                   │
// 13  Success          (→15)     ┘
// 16  Login            (→15 | Forgot→20)
// 20  Forgot Password  (→21)     ┐
// 21  OTP Verification (→22)     │ Password reset
// 22  New Password     (→23)     │
// 23  Reset Success    (→16)     ┘
// 14  Section viewer   (calendar | video | counting | dictionary)
// 15  Gamified Dashboard
// 99  Admin Panel

function App() {
  const [step, setStep] = useState(0);
  const [hubView, setHubView] = useState('hub'); // 'hub' | 'calendar' | 'video' | 'counting' | 'dictionary'

  // ── Language selection ───────────────────────────────────────────
  const [nativeLang,    setNativeLang]    = useState('');
  const [learningLang,  setLearningLang]  = useState('medumba');

  // ── Onboarding profile ───────────────────────────────────────────
  const [connection,  setConnection]  = useState(null);
  const [proficiency, setProficiency] = useState(null);
  const [reason,      setReason]      = useState(null);
  const [goals,       setGoals]       = useState([]);
  const [dailyGoal,   setDailyGoal]   = useState(null);

  // ── Account creation ─────────────────────────────────────────────
  const [userName,    setUserName]    = useState('');
  const [userAge,     setUserAge]     = useState('');
  const [userEmail,   setUserEmail]   = useState('');
  const [currentUid,  setCurrentUid]  = useState(null);

  // ── Stripe payment success (detected from URL on load) ─────────
  const [paymentSuccess, setPaymentSuccess] = useState(() => getPaymentSuccessFromUrl());

  // ── Profil discret (usage interne uniquement) ────────────────────
  const [_zodiacSign, _setZodiacSign] = useState(() => {
    try { return localStorage.getItem('_mp') ?? null; } catch { return null; }
  });

  // ── Password reset ───────────────────────────────────────────────
  const [resetEmail, setResetEmail] = useState('');

  // ── Static game stats ────────────────────────────────────────────
  const [userStats] = useState({ streak: 7, xp: 340, gems: 50, hearts: 4 });

  /* ── History API — fixes browser back button ─────────────────────
     Every go(n) pushes a state so the browser can pop it back.
     popstate syncs React state when the user presses ← in the browser.
  ── */
  const go = (n, newHubView) => {
    const hv = newHubView ?? hubView;
    if (newHubView !== undefined) setHubView(newHubView);
    history.pushState({ step: n, hubView: hv }, '');
    setStep(n);
  };

  const back = () => history.back();

  useEffect(() => {
    // Stamp the very first page so the first back-press lands here, not outside
    history.replaceState({ step: 0, hubView: 'hub' }, '');

    const onPop = (e) => {
      if (e.state) {
        setStep(e.state.step);
        setHubView(e.state.hubView ?? 'hub');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Supabase auth listener ──────────────────────────────────────
  // listenAuthState appelle le callback pour la session existante
  // (event: null) ET pour le fire immédiat 'INITIAL_SESSION' du SDK —
  // deux appels "snapshot" distincts, pas un seul. La SplashScreen gère
  // déjà ce premier rendu ; on les ignore tous les deux ici (peu importe
  // l'ordre) pour ne réagir qu'aux vrais changements ultérieurs. Un ref
  // "premier appel seulement" sous-comptait ces deux appels et laissait
  // le second ('INITIAL_SESSION') retomber sur setStep(15), écrasant la
  // redirection vers l'écran de récupération de mot de passe.
  useEffect(() => {
    return listenAuthState((user, event) => {
      if (!event || event === 'INITIAL_SESSION') {
        return; // SplashScreen handles initial routing
      }
      if (event === 'PASSWORD_RECOVERY') {
        go(22);
        return;
      }
      if (user) {
        if (user.email) setUserEmail(user.email);
        setCurrentUid(user.uid);
        getUserProfile(user.uid).then((prof) => {
          const name = prof?.name || user.displayName || '';
          if (name) setUserName(name.split(' ')[0]);
        });
        setStep(15);
        history.pushState({ step: 15, hubView: 'hub' }, '');
      } else {
        setCurrentUid(null);
        setStep(1);
        history.pushState({ step: 1, hubView: 'hub' }, '');
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Assembled profile object ─────────────────────────────────────
  const _zp = getZodiacProfile(_zodiacSign);
  const profile = {
    name:        userName,
    age:         userAge,
    email:       userEmail,
    connection:  connection,
    proficiency: proficiency,
    reason:      reason,
    goals:       goals,
    dailyGoal:   dailyGoal ?? 'normal',
    _pace:       _zp?.pace       ?? 'normal',
    _style:      _zp?.style      ?? 'standard',
    _focus:      _zp?.focus      ?? 'vocabulary',
    _motivation: getMotivationMessage(_zp),
  };

  // ── Standalone legal pages (direct URL, outside the step machine) ──
  // Required so Google's OAuth branding-verification crawler can fetch
  // /privacy and /terms directly without going through onboarding.
  if (window.location.pathname === '/privacy') return <PrivacyPage nativeLang={nativeLang} />;
  if (window.location.pathname === '/terms') return <TermsPage nativeLang={nativeLang} />;

  return (
    <ThemeProvider>
    <ErrorBoundary>

      {/* ── Splash ── */}
      {step === 0 && (
        <SplashScreen onFinish={(user, event) => {
          if (event === 'PASSWORD_RECOVERY') {
            go(22);
            return;
          }
          if (user) {
            if (user.email) setUserEmail(user.email);
            setCurrentUid(user.uid);
            getUserProfile(user.uid).then((prof) => {
              const name = prof?.name || user.displayName || '';
              if (name) setUserName(name.split(' ')[0]);
            });
            go(15);
          } else {
            go(1);
          }
        }} />
      )}

      {/* ── Landing (marketing) ── */}
      {step === 1 && (
        <LandingPage
          onStart={() => go(2)}
          onLogin={() => go(16)}
          onNavigate={(view) => go(14, view)}
          onDownload={() => go(17)}
        />
      )}

      {/* ── App Download Page ── */}
      {step === 17 && <AppDownloadPage onBack={back} />}

      {/* ── Language selection ── */}
      {step === 2 && (
        <LanguageSelectionPage
          onNext={() => go(3)} onBack={back}
          nativeLang={nativeLang} setNativeLang={setNativeLang}
          learningLang={learningLang} setLearningLang={setLearningLang}
        />
      )}

      {/* ── Quick setup (niveau + raison + objectif — tout en 1) ── */}
      {step === 3 && (
        <QuickSetupPage
          onNext={() => go(15)} onBack={back}
          nativeLang={nativeLang}
          setConnection={setConnection}
          setProficiency={setProficiency}
          setReason={setReason}
          setGoals={setGoals}
          setDailyGoal={setDailyGoal}
        />
      )}

      {/* ── Account creation ── */}
      {step === 8  && <ProfileWelcomePage onNext={() => go(9)} nativeLang={nativeLang} />}
      {step === 9  && <NamePage     onNext={(n) => { setUserName(n);  go(10); }} onBack={back} nativeLang={nativeLang} />}
      {step === 10 && <AgePage      onNext={(a, birthdate) => {
        setUserAge(a);
        if (birthdate) {
          const [mon, day] = birthdate.split('-');
          const sign = getZodiacSign(mon, day);
          if (sign) {
            _setZodiacSign(sign);
            try { localStorage.setItem('_mp', sign); } catch {}
          }
        }
        go(11);
      }} onBack={back} nativeLang={nativeLang} />}
      {step === 11 && <EmailPage    onNext={(e) => { setUserEmail(e); go(12); }} onBack={back} nativeLang={nativeLang} />}
      {step === 12 && (
        <PasswordPage
          onNext={() => go(13)} onBack={back} nativeLang={nativeLang}
          registrationData={{ name: userName, email: userEmail, age: userAge, reason, dailyGoal }}
        />
      )}
      {step === 13 && <SuccessPage
          onNext={() => go(15)}
          nativeLang={nativeLang}
          userName={userName}
          onNavigate={(view) => go(14, view)}
          onLanding={() => go(1)}
        />}

      {/* ── Login ── */}
      {step === 16 && (
        <LoginPage
          onLogin={({ user }) => {
            if (user?.email) setUserEmail(user.email);
            if (user?.uid) getUserProfile(user.uid).then((prof) => {
              const name = prof?.name || user.displayName || '';
              if (name) setUserName(name.split(' ')[0]);
            });
            go(15);
          }}
          onBack={back}
          onForgotPassword={() => go(20)}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Password reset (Supabase sends the reset link directly, no OTP needed) ── */}
      {step === 20 && <ForgotPasswordPage onNext={() => go(16)} onBack={back} nativeLang={nativeLang} />}
      {step === 22 && <NewPasswordPage onNext={() => go(23)} onBack={() => go(16)} nativeLang={nativeLang} />}
      {step === 23 && <PasswordResetSuccessPage onNext={() => go(15)} nativeLang={nativeLang} />}

      {/* ── Section viewer (from Welcome page buttons) ── */}
      {step === 14 && hubView === 'calendar'  && <CalendarPage   nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'video'     && <VideoPage      nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'counting'  && <CountingPage   nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'dictionary'     && <DictionaryPage    nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'pronunciation' && <PronunciationPage nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'alphabet'      && <AlphabetPage      nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'cepom'         && <CepomPage         nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'contact'       && <ContactPage       nativeLang={nativeLang} onBack={() => go(1)} />}

      {/* ── Gamified Dashboard ── */}
      {step === 15 && (
        <DashboardPage
          key={currentUid || 'anon'}
          userStats={userStats}
          nativeLang={nativeLang}
          learningLang={learningLang}
          profile={profile}
          currentUid={currentUid}
          onLogout={async () => { await logoutUser(); go(1); }}
          onAdmin={() => go(99)}
          paymentSuccess={paymentSuccess}
          onPaymentHandled={() => setPaymentSuccess(null)}
        />
      )}

      {/* ── Admin Panel ── */}
      {step === 99 && (
        <AdminPage
          onBack={() => go(15)}
          currentUserUid={currentUid}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Support chat widget — landing, hub sections, dashboard ── */}
      {(step === 1 || step === 14 || step === 15) && <ChatWidget nativeLang={nativeLang} />}

    </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
