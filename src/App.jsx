import { useState, useEffect, useRef } from 'react';
import { getZodiacSign, getZodiacProfile, getMotivationMessage } from './utils/zodiac';
import { logoutUser, listenAuthState, getUserProfile } from './services/authService';
import { listHouseholdMembers, getProfileById } from './services/userService';
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
import RoleChoicePage           from './components/RoleChoicePage';
import AddChildDuringSignupPage from './components/AddChildDuringSignupPage';
import NamePage                 from './components/NamePage';
import AgePage                  from './components/AgePage';
import EmailPage                from './components/EmailPage';
import PasswordPage             from './components/PasswordPage';
import SuccessPage              from './components/SuccessPage';
import OTPVerificationPage      from './components/OTPVerificationPage';
import LoginPage                from './components/LoginPage';
import ForgotPasswordPage       from './components/ForgotPasswordPage';
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
import WhoIsLearningPage        from './components/WhoIsLearningPage';
import TeacherPortalPage        from './components/TeacherPortalPage';
import CoordinatorPortalPage    from './components/CoordinatorPortalPage';
import CulturalStewardPage      from './components/CulturalStewardPage';
import ContentCreatorPage       from './components/ContentCreatorPage';
import EnrolmentAdvisorPage     from './components/EnrolmentAdvisorPage';
import BabyRitualPage           from './components/BabyRitualPage';
import YoungLearnerPage         from './components/YoungLearnerPage';
import ChatWidget                from './components/ChatWidget';
import ErrorBoundary            from './components/ErrorBoundary';
import { ThemeProvider }        from './context/ThemeContext';

// ─── Step map ───────────────────────────────────────────────────────────────
//  0  Splash
//  1  Welcome (Landing) — an account is required for course access either way,
//     but "Start" and "Register" take different paths to get there:
//     "Start"    → 2 (Language Selection) → 3 (Quick setup) → 26 (Role choice)
//     "Register" → 26 (Role choice) directly, skipping 2 and 3
// 26  Role choice (parent / learning myself / content creator) — asked right
//     after "Personalize your journey" (Quick setup) so the answer is
//     captured before account creation, not lost along the way.
//  2  Language Selection (Start only)
//  3  Quick setup (level/reason/objectives/daily goal) (Start only)
//  8  Profile Welcome  ┐
//  9  Name             │
// 10  Age               │ Registration (mandatory for course access)
// 11  Email             │
// 12  Password          │
// 27  Add your child (→13) — only when Role choice was "parent"; carries
//     the Quick setup answers onto the CHILD's own profile, since without
//     this they had nowhere to go but the parent's own account.
// 13  Success  (→15, auto-starts the first lesson)                    ┘
// 20  Log in           (reached from ProfileWelcomePage's "Log in" link)
// 21  Forgot Password  (→20)
// 22  New Password     (→23)  ┐ Reached only via an emailed recovery link
// 23  Reset Success    (→15)  ┘
// 4-7  orphaned — Connection/Proficiency/Reason/Achieve/DailyGoal pages are
//     no longer routed to
// 14  Section viewer   (calendar | video | counting | dictionary)
// 15  Gamified Dashboard — or, if the active profile is 0-4 or 5-8,
//     BabyRitualPage / YoungLearnerPage instead (same step, age-branched)
// 16  Teacher Portal      (role === 'teacher' logins land here, never 15)
// 17  App Download Page
// 18  Coordinator Portal  (role === 'coordinator' logins land here, never 15)
// 19  Cultural Steward Portal (role === 'content_owner' logins land here, never 15)
// 24  Content Creator Studio (role === 'content_creator' logins land here, never 15)
// 25  Enrolment Advisor Console (role === 'advisor' logins land here, never 15)
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
  const [userFullName, setUserFullName] = useState(''); // untruncated — Teacher Portal etc.
  const [userAge,     setUserAge]     = useState('');
  const [userEmail,   setUserEmail]   = useState('');
  const [requestedRole, setRequestedRole] = useState('');
  const [currentUid,  setCurrentUid]  = useState(null);

  // ── Which household member's Hub is active — defaults to the account
  // holder; switched from the "My Family" screen when a guardian picks a
  // child profile. Reset to the account holder on every fresh login. ──
  const [activeProfileId, setActiveProfileId] = useState(null);

  // ── Age band of the active profile — a 0-4 or 5-8 child gets a wholly
  // different experience (BabyRitualPage / YoungLearnerPage) instead of the
  // gamified Hub (Personas & Journeys v2: "age is collected one screen
  // earlier and read by nothing afterward" — this is what reads it). Kept
  // separate from the login-time `prof` lookup because the active profile
  // can be switched mid-session to any household member, each with their
  // own birth_year. ──
  const [activeProfileMeta, setActiveProfileMeta] = useState(null);
  useEffect(() => {
    if (!activeProfileId) { setActiveProfileMeta(null); return; }
    getProfileById(activeProfileId).then(setActiveProfileMeta);
  }, [activeProfileId]);
  const activeAge = activeProfileMeta?.birth_year ? new Date().getFullYear() - activeProfileMeta.birth_year : null;
  const isBabyBand = activeAge !== null && activeAge <= 4;
  const isYoungLearnerBand = activeAge !== null && activeAge >= 5 && activeAge <= 8;

  // ── "Who's learning?" gate — shown once per login, only when the
  // household holds more than one profile (a guardian plus at least one
  // child). Most accounts only ever have one profile, so this stays null
  // and nobody sees an extra screen. ──
  const [profilePicker, setProfilePicker] = useState(null); // null | array of members

  // Runs once per successful login: resolves who this auth session actually
  // is (name, language, which portal to land in), and whether the "Who's
  // learning?" picker is needed before landing on the Hub. Centralised here
  // because it used to be duplicated at both call sites, and because the
  // profile lookup needs care: for a self-claimed teen profile (migration
  // 019) profiles.id is NOT the same as the auth uid — only auth_user_id is
  // — so activeProfileId must come from the resolved profile, never assumed
  // to equal the raw uid.
  const handleLogin = async (user) => {
    if (user.email) setUserEmail(user.email);
    setCurrentUid(user.uid);
    const prof = await getUserProfile(user.uid);
    const name = prof?.name || user.displayName || '';
    if (name) { setUserName(name.split(' ')[0]); setUserFullName(name); }
    if (prof?.native_lang) setNativeLang(prof.native_lang);
    // These used to only ever get set during the same-session signup quiz
    // (QuickSetupPage) and never reloaded on a normal login — so every
    // returning user silently lost their proficiency/reason/goals/daily
    // goal the moment they closed the app, even though the database had
    // it. profile.proficiency defaults to 1 either way (existing rows
    // written before migration 043 have no real value stored), so this
    // fix alone won't retroactively recover data that was never saved —
    // only what's actually in the row now gets applied.
    if (prof?.age)         setUserAge(prof.age);
    if (prof?.proficiency) setProficiency(prof.proficiency);
    if (prof?.reason)      setReason(prof.reason);
    if (prof?.goals?.length) setGoals(prof.goals);
    if (prof?.daily_goal)  setDailyGoal(prof.daily_goal);
    const myProfileId = prof?.id || user.uid;
    setActiveProfileId(myProfileId);
    listHouseholdMembers(user.uid).then((members) => {
      if (members.length > 1) setProfilePicker(members);
    });
    if (prof?.role === 'teacher') return 16;
    if (prof?.role === 'coordinator') return 18;
    if (prof?.role === 'content_owner') return 19;
    if (prof?.role === 'content_creator') return 24; // 20-23 already used (login/reset flow)
    if (prof?.role === 'advisor') return 25;
    return 15;
  };

  // Re-opens "Who's learning?" so a guardian can switch away from a 0-4/5-8
  // profile — those bands have no in-page nav back to the Hub by design.
  const reopenProfilePicker = () => {
    if (!currentUid) return;
    listHouseholdMembers(currentUid).then((members) => setProfilePicker(members));
  };

  // ── Stripe payment success (detected from URL on load) ─────────
  const [paymentSuccess, setPaymentSuccess] = useState(() => getPaymentSuccessFromUrl());

  // ── Deep-link query params (?register=1, ?login=1), captured once at
  // initial render — listenAuthState fires its startup snapshot TWICE
  // (documented above), and SplashScreen's onFinish reads this on every
  // call. Re-reading the live window.location.search there would break on
  // the second call, since the first call's own history.replaceState()
  // already stripped the param by then. ──
  const [initialDeepLinkParams] = useState(() => new URLSearchParams(window.location.search));

  // ── Free-access "Start" users land straight in their first lesson ──
  const [autoStartFirstLesson, setAutoStartFirstLesson] = useState(false);

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

  /* ── Idle logout — clicking the Hub logo goes to the Landing page but
     keeps the session alive for a grace period (in case the user comes
     right back), only actually signing out after 20 minutes idle. The
     user's XP/streak/level are never at risk either way: they're synced
     to Supabase live as they're earned, independent of session state. ── */
  const IDLE_LOGOUT_MS = 20 * 60 * 1000;
  const idleLogoutTimerRef = useRef(null);
  const cancelIdleLogout = () => {
    if (idleLogoutTimerRef.current) { clearTimeout(idleLogoutTimerRef.current); idleLogoutTimerRef.current = null; }
  };
  const goToLandingWithIdleLogout = () => {
    cancelIdleLogout();
    idleLogoutTimerRef.current = setTimeout(() => { logoutUser(); }, IDLE_LOGOUT_MS);
    go(1);
  };

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
        handleLogin(user).then((dest) => {
          setStep(dest);
          history.pushState({ step: dest, hubView: 'hub' }, '');
        });
      } else {
        setCurrentUid(null);
        setActiveProfileId(null);
        setProfilePicker(null);
        setStep(1);
        history.pushState({ step: 1, hubView: 'hub' }, '');
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Assembled profile object ─────────────────────────────────────
  // Prefers the ACTIVE profile's own proficiency/reason/goals/daily_goal
  // (activeProfileMeta — set whenever a household member other than the
  // account holder is being viewed, e.g. after switching via "Who's
  // learning?") over the logged-in account holder's own state. Without
  // this, switching to a child's Hub kept showing the parent's own quiz
  // answers — the child's personalization (however it got set: signup-time
  // or manually) was fetched but never actually used.
  const _zp = getZodiacProfile(_zodiacSign);
  const profile = {
    name:        activeProfileMeta?.name ?? userName,
    age:         activeAge ?? userAge,
    email:       userEmail,
    connection:  connection,
    proficiency: activeProfileMeta?.proficiency ?? proficiency,
    reason:      activeProfileMeta?.reason ?? reason,
    goals:       (activeProfileMeta?.goals?.length ? activeProfileMeta.goals : goals) ?? goals,
    dailyGoal:   activeProfileMeta?.daily_goal ?? dailyGoal ?? 'normal',
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
            handleLogin(user).then((dest) => go(dest));
          } else if (initialDeepLinkParams.get('register') === '1') {
            // QR-code deep link (festival banners etc.) — skip the marketing
            // landing page and go straight into account creation.
            history.replaceState(null, '', window.location.pathname);
            go(26);
          } else if (initialDeepLinkParams.get('login') === '1') {
            // Email deep link (e.g. the age-confirmation notice) — skip the
            // marketing landing page and go straight to Log in. Once
            // authenticated, handleLogin() runs as normal and the
            // age-confirm modal (DashboardPage) takes it from there.
            history.replaceState(null, '', window.location.pathname);
            go(20);
          } else {
            go(1);
          }
        }} />
      )}

      {/* ── Landing (marketing) ── */}
      {step === 1 && (
        <LandingPage
          onStart={() => { if (currentUid) { cancelIdleLogout(); go(15); } else go(2); }}
          onRegister={() => { if (currentUid) { cancelIdleLogout(); go(15); } else go(26); }}
          onLogin={() => { if (currentUid) { cancelIdleLogout(); go(15); } else go(20); }}
          onNavigate={(view) => go(14, view)}
          onDownload={() => go(17)}
          nativeLang={nativeLang}
          setNativeLang={setNativeLang}
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
          onNext={() => go(26)} onBack={back}
          nativeLang={nativeLang}
          setConnection={setConnection}
          setProficiency={setProficiency}
          setReason={setReason}
          setGoals={setGoals}
          setDailyGoal={setDailyGoal}
        />
      )}

      {/* ── Account creation ── */}
      {step === 26 && <RoleChoicePage onNext={(role) => { setRequestedRole(role); go(8); }} onBack={back} nativeLang={nativeLang} />}
      {step === 8  && <ProfileWelcomePage onNext={() => go(9)} onLogin={() => go(20)} nativeLang={nativeLang} />}
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
          onNext={() => go(requestedRole === 'parent' ? 27 : 13)} onBack={back} onLogin={() => go(20)} nativeLang={nativeLang}
          registrationData={{ name: userName, email: userEmail, age: userAge, reason, dailyGoal, requestedRole, proficiency, goals }}
        />
      )}
      {step === 27 && (
        <AddChildDuringSignupPage
          onNext={() => go(13)} nativeLang={nativeLang}
          proficiency={proficiency} reason={reason} goals={goals} dailyGoal={dailyGoal}
        />
      )}
      {step === 13 && <SuccessPage
          onNext={() => { setAutoStartFirstLesson(true); go(15); }}
          nativeLang={nativeLang}
          userName={userName}
          onNavigate={(view) => go(14, view)}
          onLanding={() => go(1)}
        />}

      {/* ── Password reset — plus de flux "connexion" dans l'UI, mais un lien de
         récupération déjà envoyé (avant ce changement) doit encore fonctionner. ── */}
      {step === 20 && (
        <LoginPage
          onLogin={() => {}} // navigation handled instantly by the persistent auth listener above
          onBack={back}
          onForgotPassword={() => go(21)}
          nativeLang={nativeLang}
        />
      )}
      {step === 21 && <ForgotPasswordPage onNext={() => go(20)} onBack={() => go(20)} nativeLang={nativeLang} />}
      {step === 22 && <NewPasswordPage onNext={() => go(23)} onBack={() => go(1)} nativeLang={nativeLang} />}
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

      {/* ── Teacher Portal — a teacher's login never sees the learner Hub ── */}
      {step === 16 && (
        <TeacherPortalPage
          teacherUid={currentUid}
          teacherName={userFullName}
          nativeLang={nativeLang}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── Coordinator Portal — same idea, a coordinator's login never
         sees the learner Hub either ── */}
      {step === 18 && (
        <CoordinatorPortalPage
          coordinatorName={userFullName}
          nativeLang={nativeLang}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── Cultural Steward Portal — same idea again ── */}
      {step === 19 && (
        <CulturalStewardPage
          stewardName={userFullName}
          nativeLang={nativeLang}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── Content Creator Studio — same idea again ── */}
      {step === 24 && (
        <ContentCreatorPage
          creatorUid={currentUid}
          creatorName={userFullName}
          nativeLang={nativeLang}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── Enrolment Advisor Console — same idea again ── */}
      {step === 25 && (
        <EnrolmentAdvisorPage
          advisorUid={currentUid}
          advisorName={userFullName}
          nativeLang={nativeLang}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── "Who's learning?" — only shown when the household has more than
         one profile; picking one closes the gate and reveals the Hub. ── */}
      {step === 15 && profilePicker && (
        <WhoIsLearningPage
          members={profilePicker}
          nativeLang={nativeLang}
          onPick={(id) => { setActiveProfileId(id); setProfilePicker(null); }}
        />
      )}

      {/* ── The 0-4 band: audio-only ritual, no screen "app" at all ── */}
      {step === 15 && !profilePicker && isBabyBand && (
        <BabyRitualPage
          key={`baby_${activeProfileId}`}
          babyProfileId={activeProfileId}
          babyName={activeProfileMeta?.name}
          nativeLang={nativeLang}
          onBack={reopenProfilePicker}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── The 5-8 band: tap-and-speak only, four-minute hard cap ── */}
      {step === 15 && !profilePicker && isYoungLearnerBand && (
        <YoungLearnerPage
          key={`young_${activeProfileId}`}
          learnerProfileId={activeProfileId}
          learnerName={activeProfileMeta?.name}
          nativeLang={nativeLang}
          onBack={reopenProfilePicker}
          onLogout={async () => { await logoutUser(); go(1); }}
        />
      )}

      {/* ── Gamified Dashboard ── */}
      {step === 15 && !profilePicker && !isBabyBand && !isYoungLearnerBand && (
        <DashboardPage
          // Remount cleanly whenever the logged-in account OR the active
          // household profile changes, so per-profile localStorage-backed
          // state (xp/gems/streak lazy initializers) never leaks between
          // profiles while switching who the Hub is showing.
          key={`${currentUid || 'anon'}_${activeProfileId || 'anon'}`}
          userStats={userStats}
          nativeLang={nativeLang}
          learningLang={learningLang}
          profile={profile}
          currentUid={currentUid}
          activeProfileId={activeProfileId}
          onSwitchProfile={setActiveProfileId}
          onLogout={async () => { await logoutUser(); go(1); }}
          onAdmin={() => go(99)}
          paymentSuccess={paymentSuccess}
          onPaymentHandled={() => setPaymentSuccess(null)}
          autoStartFirstLesson={autoStartFirstLesson}
          onAutoStartHandled={() => setAutoStartFirstLesson(false)}
          onLogoClick={goToLandingWithIdleLogout}
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
      {(step === 1 || step === 14 || step === 15) && <ChatWidget nativeLang={nativeLang} profileId={activeProfileId || currentUid} />}

    </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
