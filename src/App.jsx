import { useState, useEffect } from 'react';
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
import DashboardPage            from './components/DashboardPage';
import CalendarPage             from './components/CalendarPage';
import VideoPage                from './components/VideoPage';
import CountingPage             from './components/CountingPage';
import DictionaryPage           from './components/DictionaryPage';
import ErrorBoundary            from './components/ErrorBoundary';

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
  const [userName,  setUserName]  = useState('');
  const [userAge,   setUserAge]   = useState('');
  const [userEmail, setUserEmail] = useState('');

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

  // ── Assembled profile object ─────────────────────────────────────
  const profile = {
    name:        userName,
    age:         userAge,
    email:       userEmail,
    connection:  connection,
    proficiency: proficiency,
    reason:      reason,
    goals:       goals,
    dailyGoal:   dailyGoal ?? 'normal',
  };

  return (
    <ErrorBoundary>

      {/* ── Splash ── */}
      {step === 0 && <SplashScreen onFinish={() => go(1)} />}

      {/* ── Welcome ── */}
      {step === 1 && (
        <WelcomePage
          onNext={() => go(2)}
          onLogin={() => go(16)}
          onCalendar   ={() => go(14, 'calendar')}
          onVideo      ={() => go(14, 'video')}
          onCounting   ={() => go(14, 'counting')}
          onDictionary ={() => go(14, 'dictionary')}
        />
      )}

      {/* ── Language selection ── */}
      {step === 2 && (
        <LanguageSelectionPage
          onNext={() => go(3)} onBack={back}
          nativeLang={nativeLang} setNativeLang={setNativeLang}
          learningLang={learningLang} setLearningLang={setLearningLang}
        />
      )}

      {/* ── Courses onboarding ── */}
      {step === 3 && (
        <ConnectionPage
          onNext={(c) => { setConnection(c); go(4); }}
          onBack={back}
          nativeLang={nativeLang}
        />
      )}
      {step === 4 && (
        <ProficiencyPage
          onNext={(level) => { setProficiency(level); go(5); }}
          onBack={back}
          nativeLang={nativeLang} learningLang={learningLang}
        />
      )}
      {step === 5 && (
        <ReasonPage
          onNext={(r) => { setReason(r); go(6); }}
          onBack={back}
          nativeLang={nativeLang} learningLang={learningLang}
        />
      )}
      {step === 6 && (
        <AchievePage
          onNext={(g) => { setGoals(g); go(7); }}
          onBack={back}
          nativeLang={nativeLang}
        />
      )}
      {step === 7 && (
        <DailyGoalPage
          onNext={(dg) => { setDailyGoal(dg); go(8); }}
          onBack={back}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Account creation ── */}
      {step === 8  && <ProfileWelcomePage onNext={() => go(9)} onSkip={() => go(15)} nativeLang={nativeLang} />}
      {step === 9  && <NamePage     onNext={(n) => { setUserName(n);  go(10); }} onBack={back} nativeLang={nativeLang} />}
      {step === 10 && <AgePage      onNext={(a) => { setUserAge(a);   go(11); }} onBack={back} nativeLang={nativeLang} />}
      {step === 11 && <EmailPage    onNext={(e) => { setUserEmail(e); go(12); }} onBack={back} nativeLang={nativeLang} />}
      {step === 12 && <PasswordPage onNext={() => go(13)} onBack={back} nativeLang={nativeLang} />}
      {step === 13 && <SuccessPage  onNext={() => go(15)}                        nativeLang={nativeLang} />}

      {/* ── Login ── */}
      {step === 16 && (
        <LoginPage
          onLogin={() => go(15)} onBack={back}
          onForgotPassword={() => go(20)}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Password reset ── */}
      {step === 20 && <ForgotPasswordPage      onNext={(e) => { setResetEmail(e); go(21); }} onBack={back} nativeLang={nativeLang} />}
      {step === 21 && <OTPVerificationPage     onNext={() => go(22)} onBack={back} email={resetEmail}       nativeLang={nativeLang} />}
      {step === 22 && <NewPasswordPage         onNext={() => go(23)} onBack={back}                          nativeLang={nativeLang} />}
      {step === 23 && <PasswordResetSuccessPage onNext={() => go(16)}                                                                         nativeLang={nativeLang} />}

      {/* ── Section viewer (from Welcome page buttons) ── */}
      {step === 14 && hubView === 'calendar'  && <CalendarPage   nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'video'     && <VideoPage      nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'counting'  && <CountingPage   nativeLang={nativeLang} onBack={() => go(1)} />}
      {step === 14 && hubView === 'dictionary'&& <DictionaryPage nativeLang={nativeLang} onBack={() => go(1)} />}

      {/* ── Gamified Dashboard ── */}
      {step === 15 && (
        <DashboardPage
          userStats={userStats}
          nativeLang={nativeLang}
          learningLang={learningLang}
          profile={profile}
        />
      )}

    </ErrorBoundary>
  );
}

export default App;
