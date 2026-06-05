import { useState, useEffect, useCallback, useRef } from 'react';
import { isAdmin } from '../services/adminService';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';
import profileWelcomeVector from '../assets/profile_welcome_vector.png';
import celebrationImg from '../assets/Auto Layout Vertical.png';
import person1Img from '../assets/person1.png';
import person2Img from '../assets/person2.png';
import laptopImg  from '../assets/laptop 1.png';
import globeImg   from '../assets/globe 1.png';
import LessonLoadingPage from './LessonLoadingPage';
import LessonPage        from './LessonPage';
import { getPersonalizedTip } from '../utils/lessonGenerator';

/* ════════════════════════════════════════════════════════════════════
   DashboardPage
   – Language switcher in sidebar
   – 5-tab nav: Home | Leaderboard | Challenge | Premium | Account
   – Home: learning path + right panel
   – Premium: gem packages → PaymentMethod → OrderSummary → PaymentSuccess
════════════════════════════════════════════════════════════════════ */

/* ── Profile-driven constants ─────────────────────────────────── */
const DAILY_GOAL_CONFIG = {
    relaxed: { time: 5,  xp: 10  },
    normal:  { time: 10, xp: 20  },
    serious: { time: 15, xp: 30  },
    great:   { time: 30, xp: 60  },
    awesome: { time: 60, xp: 100 },
};

const PROF_LABELS = {
    1: { en: 'Absolute Beginner', fr: 'Débutant absolu',  color: '#ef4444' },
    2: { en: 'Elementary',        fr: 'Élémentaire',      color: '#f59e0b' },
    3: { en: 'Intermediate',      fr: 'Intermédiaire',    color: '#22c55e' },
    4: { en: 'Advanced',          fr: 'Avancé',           color: '#0056D2' },
};

const REASON_META = {
    fun:       { emoji: '😁', en: 'Just for fun',    fr: 'Pour le plaisir',    challengeEn: 'Play 3 fun mini-games',          challengeFr: 'Jouer à 3 mini-jeux',           reward: 25 },
    career:    { emoji: '💼', en: 'Career growth',   fr: 'Carrière',           challengeEn: 'Learn 5 professional expressions', challengeFr: 'Apprendre 5 expressions pro',    reward: 35 },
    education: { emoji: '🎓', en: 'Education',        fr: 'Éducation',          challengeEn: 'Complete 2 study exercises',       challengeFr: 'Finir 2 exercices scolaires',    reward: 30 },
    vacation:  { emoji: '✈️', en: 'Travel',           fr: 'Voyage',             challengeEn: 'Master 5 travel phrases',          challengeFr: 'Maîtriser 5 phrases de voyage',  reward: 30 },
    other:     { emoji: '🧩', en: 'Personal goal',   fr: 'Objectif perso',     challengeEn: 'Beat your daily best',             challengeFr: 'Battre votre record du jour',    reward: 20 },
};

const GOAL_META = {
    speak: { emoji: '💬', en: 'Speak fluently',       fr: 'Parler couramment'   },
    vocab: { emoji: '📇', en: 'Master vocabulary',    fr: 'Maîtriser le vocab'  },
    habit: { emoji: '⏰', en: 'Build study habits',   fr: 'Habitudes d\'étude'  },
};

const GEM_PACKAGES = [
    { id: 'p1', gems: 500,  price: '$1.99',  popular: false, label: '💎 500' },
    { id: 'p2', gems: 1200, price: '$3.99',  popular: true,  label: '💎 1,200' },
    { id: 'p3', gems: 2000, price: '$5.99',  popular: false, label: '💎 2,000' },
    { id: 'p4', gems: 5000, price: '$12.99', popular: false, label: '💎 5,000' },
];

const PAYMENT_METHODS = [
    { id: 'paypal',     icon: '🅿️',  label: 'PayPal'      },
    { id: 'googlepay',  icon: '🇬',  label: 'Google Pay'  },
    { id: 'applepay',   icon: '🍎',  label: 'Apple Pay'   },
    { id: 'mastercard', icon: '💳',  label: 'Mastercard'  },
];

const LEADERBOARD_DATA = [
    { rank: 1,  name: 'Alice M.',    xp: 2840, badge: '🥇', you: false },
    { rank: 2,  name: 'Jean K.',     xp: 2560, badge: '🥈', you: false },
    { rank: 3,  name: 'Sophie T.',   xp: 2190, badge: '🥉', you: false },
    { rank: 4,  name: 'Marc D.',     xp: 1980, badge: null,  you: false },
    { rank: 5,  name: 'Luc N.',      xp: 1740, badge: null,  you: false },
    { rank: 6,  name: 'Emma W.',     xp: 1600, badge: null,  you: false },
    { rank: 7,  name: 'You',         xp: 1340, badge: null,  you: true  },
    { rank: 8,  name: 'Paul F.',     xp: 1200, badge: null,  you: false },
    { rank: 9,  name: 'Nina C.',     xp: 980,  badge: null,  you: false },
    { rank: 10, name: 'Omar B.',     xp: 760,  badge: null,  you: false },
];

const DAILY_CHALLENGES = [
    { id: 'dc1', icon: '⚡', titleEn: 'Complete 3 lessons',    titleFr: 'Terminer 3 leçons',       progress: 2, total: 3, reward: 20 },
    { id: 'dc2', icon: '🔥', titleEn: 'Keep your streak',     titleFr: 'Maintenir votre série',    progress: 1, total: 1, reward: 15 },
    { id: 'dc3', icon: '⭐', titleEn: 'Earn 50 XP today',     titleFr: 'Gagner 50 XP aujourd\'hui', progress: 34, total: 50, reward: 25 },
];

const WEEKLY_CHALLENGES = [
    { id: 'wc1', icon: '🏅', titleEn: 'Perfect week streak',  titleFr: 'Semaine parfaite',         progress: 5, total: 7,  reward: 100 },
    { id: 'wc2', icon: '🎯', titleEn: 'Practice 5 skills',   titleFr: 'Pratiquer 5 compétences',  progress: 2, total: 5,  reward: 80  },
    { id: 'wc3', icon: '💬', titleEn: 'Translate 30 phrases', titleFr: 'Traduire 30 phrases',      progress: 18, total: 30, reward: 60  },
];

/* ── small reusable progress bar ── */
const Bar = ({ value, max, color = '#0056D2' }) => {
    const { T } = useTheme();
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div style={{ width: '100%', height: '8px', backgroundColor: T.border, borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '99px', transition: 'width 0.4s ease' }} />
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
const DashboardPage = ({
    userStats    = { streak: 7, xp: 340, gems: 50, hearts: 4 },
    nativeLang   = null,
    learningLang = null,
    profile      = {},  // { name, age, email, proficiency, reason, goals, dailyGoal }
    onLogout     = null,
    onAdmin      = null,
    currentUid   = null,
}) => {
    /* ── theme ── */
    const { isDark, T, toggle: toggleDark } = useTheme();

    /* ── local lang override ── */
    const [lang, setLang]           = useState(nativeLang === 'french' ? 'fr' : 'en');
    const isFr                      = lang === 'fr';

    /* ── admin role check ── */
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    useEffect(() => {
      if (currentUid) isAdmin(currentUid).then(setUserIsAdmin);
    }, [currentUid]);

    /* ── profile shorthands ── */
    const userName    = profile.name        || '';
    const profLevel   = profile.proficiency || 1;   // 1-4
    const userReason  = profile.reason      || 'fun';
    const userGoals   = profile.goals       || [];
    const goalCfg     = DAILY_GOAL_CONFIG[profile.dailyGoal ?? 'normal'];
    const reasonMeta  = REASON_META[userReason] ?? REASON_META.fun;
    const profMeta    = PROF_LABELS[profLevel]  ?? PROF_LABELS[1];

    /* ── compute lesson statuses from proficiency ──
       profLevel 1 → lesson index 0 active (true beginner)
       profLevel 2 → lesson 0 done, index 1 active
       profLevel 3 → lessons 0-1 done, index 2 active
       profLevel 4 → lessons 0-2 done, index 3 active
    ── */
    const applyProgress = (units) => units.map((unit, uIdx) => {
        if (uIdx > 0) return unit; // only unlock progress in unit 1
        let regularSeen = 0;
        const doneCount = profLevel - 1; // number of regular lessons pre-completed
        return {
            ...unit,
            lessons: unit.lessons.map((lesson) => {
                if (lesson.type === 'chest' || lesson.type === 'boss') {
                    return { ...lesson, status: 'locked' };
                }
                const idx = regularSeen++;
                if (idx < doneCount)       return { ...lesson, status: 'completed' };
                if (idx === doneCount)     return { ...lesson, status: 'active' };
                return { ...lesson, status: 'locked' };
            }),
        };
    });

    /* ── session-completed lessons (unlocks next in path) ── */
    const [completedLessons, setCompletedLessons] = useState(() => { try { const v = localStorage.getItem('med_completed'); return v ? new Set(JSON.parse(v)) : new Set(); } catch { return new Set(); } });
    useEffect(() => { localStorage.setItem('med_completed', JSON.stringify([...completedLessons])); }, [completedLessons]);

    const applySessionProgress = (units) => {
        if (completedLessons.size === 0) return units;

        // Step 1: flatten all lessons and mark session-completed ones
        const allLessons = units.flatMap(u => u.lessons).map(lesson =>
            completedLessons.has(lesson.id) ? { ...lesson, status: 'completed' } : lesson
        );

        // Step 2: promote the first locked regular lesson after a completed one to 'active'
        let lastWasCompleted = false;
        let promotedOne = false;
        const updated = allLessons.map(lesson => {
            if (lesson.type === 'chest' || lesson.type === 'boss') return lesson;
            if (lesson.status === 'completed') { lastWasCompleted = true; return lesson; }
            if (lastWasCompleted && !promotedOne && lesson.status !== 'active') {
                promotedOne = true;
                lastWasCompleted = false;
                return { ...lesson, status: 'active' };
            }
            return lesson;
        });

        // Step 3: rebuild unit structure
        let i = 0;
        return units.map(unit => ({ ...unit, lessons: unit.lessons.map(() => updated[i++]) }));
    };

    /* ── learning language (what the user is studying) ── */
    const defaultLearnLang = learningLang === 'english' ? 'english' : 'medumba';
    const [learnLang, setLearnLang] = useState(defaultLearnLang);

    /* ── lesson flow ── */
    // null | 'loading' | 'lesson' | 'lesson_complete' | 'daily_mission' | 'congrats' | 'share'
    const [lessonFlow,   setLessonFlow]   = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [lessonResult, setLessonResult] = useState(null); // { xp, diamonds, time, accuracy }

    /* ── navigation ── */
    const [activeNav, setActiveNav] = useState('home');

    /* ── leaderboard tab ── */
    const [lbTab, setLbTab]         = useState('weekly');

    /* ── daily stories ── */
    const [activeStory,  setActiveStory]  = useState(null);
    const [seenStories,  setSeenStories]  = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('med_seen_stories') || '{}');
            const today = new Date().toDateString();
            return saved.date === today ? new Set(saved.ids) : new Set();
        } catch { return new Set(); }
    });
    const markStorySeen = (id) => {
        setSeenStories(prev => {
            const next = new Set(prev).add(id);
            localStorage.setItem('med_seen_stories', JSON.stringify({ date: new Date().toDateString(), ids: [...next] }));
            return next;
        });
    };

    /* ── videos tab ── */
    const [activeVideo, setActiveVideo] = useState(null);
    const [filterCat,   setFilterCat]   = useState('all');

    /* ── live stats (persisted in localStorage) ── */
    const [gems,   setGems]   = useState(() => { const v = localStorage.getItem('med_gems');   return v !== null ? parseInt(v) : userStats.gems; });
    const [xp,     setXp]     = useState(() => { const v = localStorage.getItem('med_xp');     return v !== null ? parseInt(v) : userStats.xp; });
    const [streak, setStreak] = useState(() => { const v = localStorage.getItem('med_streak'); return v !== null ? parseInt(v) : userStats.streak; });
    const [hearts, setHearts] = useState(() => { const v = localStorage.getItem('med_hearts'); return v !== null ? parseInt(v) : userStats.hearts; });

    useEffect(() => { localStorage.setItem('med_gems',   gems);   }, [gems]);
    useEffect(() => { localStorage.setItem('med_xp',     xp);     }, [xp]);
    useEffect(() => { localStorage.setItem('med_streak', streak); }, [streak]);
    useEffect(() => { localStorage.setItem('med_hearts', hearts); }, [hearts]);

    /* ── chest mechanic ── */
    const [openedChests,  setOpenedChests]  = useState(() => { try { const v = localStorage.getItem('med_chests'); return v ? new Set(JSON.parse(v)) : new Set(); } catch { return new Set(); } });
    const [chestModal,    setChestModal]    = useState(null);
    const [chestCollected, setChestCollected] = useState(false);

    useEffect(() => { localStorage.setItem('med_chests', JSON.stringify([...openedChests])); }, [openedChests]);

    /* ── purchase flow ──
       null | 'packages' | 'payment' | 'summary' | 'success'
    ── */
    const [purchaseFlow,  setPurchaseFlow]  = useState(null);
    const [selectedPkg,   setSelectedPkg]   = useState(null);
    const [payMethod,     setPayMethod]     = useState(null);
    const [cardNum,       setCardNum]       = useState('');
    const [cardName,      setCardName]      = useState('');
    const [cardExpiry,    setCardExpiry]    = useState('');
    const [cardCvv,       setCardCvv]       = useState('');

    const XP_TO_NEXT = 500;
    const xpProgress = Math.min((xp / XP_TO_NEXT) * 100, 100);

    /* ── mobile breakpoint ── */
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
        const fn = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', fn);
        return () => window.removeEventListener('resize', fn);
    }, []);

    /* ── nav items ── */
    const navItems = [
        { id: 'home',        icon: '🏠', labelEn: 'HOME',        labelFr: 'ACCUEIL'    },
        { id: 'leaderboard', icon: '🏆', labelEn: 'LEADERBOARD', labelFr: 'CLASSEMENT' },
        { id: 'challenge',   icon: '⚡', labelEn: 'CHALLENGE',   labelFr: 'DÉFI'       },
        { id: 'videos',      icon: '🎬', labelEn: 'VIDEOS',      labelFr: 'VIDÉOS'     },
        { id: 'premium',     icon: '💎', labelEn: 'PREMIUM',     labelFr: 'PREMIUM'    },
        { id: 'account',     icon: '👤', labelEn: 'ACCOUNT',     labelFr: 'COMPTE'     },
    ];

    /* ── learning path data — Medumba track ── */
    const unitsMedumba = [
        {
            id: 1, color: '#0056D2', accent: '#0041a3', emoji: '🔤',
            titleEn: 'Foundations',   titleFr: 'Les Bases',
            subEn:   'Learn the basics of Medumba',
            subFr:   'Apprenez les bases du Medumba',
            lessons: [
                { id: 'l1', titleEn: 'Greetings',  titleFr: 'Salutations',   type: 'lesson', status: 'active'  },
                { id: 'l2', titleEn: 'Body Parts',  titleFr: 'Corps humain',  type: 'lesson', status: 'locked'  },
                { id: 'l3', titleEn: 'Food',        titleFr: 'Nourriture',    type: 'lesson', status: 'locked'  },
                { id: 'c1', titleEn: 'Chest',       titleFr: 'Coffre',        type: 'chest',  status: 'locked'  },
                { id: 'l4', titleEn: 'Colors',      titleFr: 'Couleurs',      type: 'lesson', status: 'locked'  },
                { id: 'l5', titleEn: 'Numbers',     titleFr: 'Chiffres',      type: 'lesson', status: 'locked'  },
            ],
        },
        {
            id: 2, color: '#2563eb', accent: '#1d4ed8', emoji: '👥',
            titleEn: 'People & World', titleFr: 'Personnes & Monde',
            subEn:   'Animals, family and the world around you',
            subFr:   'Animaux, famille et le monde qui vous entoure',
            lessons: [
                { id: 'l6', titleEn: 'Animals',    titleFr: 'Animaux',       type: 'lesson', status: 'locked' },
                { id: 'l7', titleEn: 'Family',     titleFr: 'Famille',       type: 'lesson', status: 'locked' },
                { id: 'l8', titleEn: 'Nature',     titleFr: 'Nature',        type: 'lesson', status: 'locked' },
                { id: 'b1', titleEn: 'Boss Fight', titleFr: 'Défi Boss',     type: 'boss',   status: 'locked' },
            ],
        },
        {
            id: 3, color: '#0891b2', accent: '#0e7490', emoji: '🌿',
            titleEn: 'Daily Life',    titleFr: 'Vie Quotidienne',
            subEn:   'Everyday expressions & phrases',
            subFr:   'Expressions pour tous les jours',
            lessons: [
                { id: 'l9',  titleEn: 'Time',          titleFr: 'Temps',          type: 'lesson', status: 'locked' },
                { id: 'l10', titleEn: 'Introductions',  titleFr: 'Présentations',  type: 'lesson', status: 'locked' },
                { id: 'c2',  titleEn: 'Chest',          titleFr: 'Coffre',         type: 'chest',  status: 'locked' },
            ],
        },
        {
            id: 4, color: '#7c3aed', accent: '#6d28d9', emoji: '🏫',
            titleEn: 'Society & Health', titleFr: 'Société & Santé',
            subEn:   'From classroom to kitchen — real-world Medumba',
            subFr:   'De la classe à la cuisine — Medumba du quotidien',
            lessons: [
                { id: 'l11', titleEn: 'Kitchen',      titleFr: 'Cuisine',       type: 'lesson', status: 'locked' },
                { id: 'l12', titleEn: 'Illnesses',    titleFr: 'Maladies',      type: 'lesson', status: 'locked' },
                { id: 'l13', titleEn: 'School',       titleFr: 'École',         type: 'lesson', status: 'locked' },
                { id: 'b2',  titleEn: 'Boss Fight',   titleFr: 'Défi Boss',     type: 'boss',   status: 'locked' },
                { id: 'l14', titleEn: 'Professions',  titleFr: 'Métiers',       type: 'lesson', status: 'locked' },
                { id: 'c3',  titleEn: 'Chest',        titleFr: 'Coffre',        type: 'chest',  status: 'locked' },
            ],
        },
        {
            id: 5, color: '#b45309', accent: '#92400e', emoji: '🥁',
            titleEn: 'Culture & Language', titleFr: 'Culture & Langue',
            subEn:   'Conversations, verbs and Medumba cultural rites',
            subFr:   'Conversations, verbes et rites culturels Medumba',
            lessons: [
                { id: 'l15', titleEn: 'Conversations', titleFr: 'Conversations',   type: 'lesson', status: 'locked' },
                { id: 'l16', titleEn: 'Action Verbs',  titleFr: 'Verbes d\'action', type: 'lesson', status: 'locked' },
                { id: 'b3',  titleEn: 'Boss Fight',    titleFr: 'Défi Boss',        type: 'boss',   status: 'locked' },
                { id: 'l17', titleEn: 'Culture & Rites', titleFr: 'Culture & Rites', type: 'lesson', status: 'locked' },
                { id: 'c4',  titleEn: 'Chest',         titleFr: 'Coffre',           type: 'chest',  status: 'locked' },
            ],
        },
    ];

    /* ── learning path data — English track ── */
    const unitsEnglish = [
        {
            id: 1, color: '#0056D2', accent: '#0041a3', emoji: '🗣️',
            titleEn: 'First Words',   titleFr: 'Premiers Mots',
            subEn:   'Start speaking English from day one',
            subFr:   'Commencez à parler anglais dès le premier jour',
            lessons: [
                { id: 'e1', titleEn: 'Hello!',      titleFr: 'Bonjour !',    type: 'lesson', status: 'completed' },
                { id: 'e2', titleEn: 'Alphabet',    titleFr: 'Alphabet',     type: 'lesson', status: 'active'    },
                { id: 'e3', titleEn: 'Numbers',     titleFr: 'Chiffres',     type: 'lesson', status: 'locked'    },
                { id: 'c1', titleEn: 'Chest',       titleFr: 'Coffre',       type: 'chest',  status: 'locked'    },
                { id: 'e4', titleEn: 'Colors',      titleFr: 'Couleurs',     type: 'lesson', status: 'locked'    },
                { id: 'e5', titleEn: 'Animals',     titleFr: 'Animaux',      type: 'lesson', status: 'locked'    },
            ],
        },
        {
            id: 2, color: '#2563eb', accent: '#1d4ed8', emoji: '🏙️',
            titleEn: 'City Life',     titleFr: 'Vie Urbaine',
            subEn:   'Navigate daily English situations',
            subFr:   'Naviguer dans les situations du quotidien',
            lessons: [
                { id: 'e6', titleEn: 'Shopping',    titleFr: 'Achats',       type: 'lesson', status: 'locked' },
                { id: 'e7', titleEn: 'Directions',  titleFr: 'Directions',   type: 'lesson', status: 'locked' },
                { id: 'e8', titleEn: 'Restaurant',  titleFr: 'Restaurant',   type: 'lesson', status: 'locked' },
                { id: 'b1', titleEn: 'Boss Fight',  titleFr: 'Défi Boss',    type: 'boss',   status: 'locked' },
            ],
        },
        {
            id: 3, color: '#0891b2', accent: '#0e7490', emoji: '💼',
            titleEn: 'Work & Study',  titleFr: 'Travail & Études',
            subEn:   'English for professional contexts',
            subFr:   'L\'anglais dans un contexte professionnel',
            lessons: [
                { id: 'e9',  titleEn: 'Introductions', titleFr: 'Présentations', type: 'lesson', status: 'locked' },
                { id: 'e10', titleEn: 'Emails',        titleFr: 'E-mails',       type: 'lesson', status: 'locked' },
                { id: 'e11', titleEn: 'Meetings',      titleFr: 'Réunions',      type: 'lesson', status: 'locked' },
                { id: 'c2',  titleEn: 'Chest',         titleFr: 'Coffre',        type: 'chest',  status: 'locked' },
            ],
        },
    ];

    /* ── unlock chest when all preceding regular lessons in unit are done ── */
    const applyChestUnlocks = (rawUnits) => rawUnits.map(unit => ({
        ...unit,
        lessons: unit.lessons.map((lesson, idx) => {
            if (lesson.type !== 'chest') return lesson;
            if (openedChests.has(lesson.id)) return { ...lesson, status: 'completed' };
            const preceding = unit.lessons.slice(0, idx).filter(l => l.type === 'lesson');
            const allDone = preceding.length > 0 && preceding.every(l => l.status === 'completed');
            return allDone ? { ...lesson, status: 'active' } : lesson;
        }),
    }));

    const units = applyChestUnlocks(applySessionProgress(applyProgress(learnLang === 'english' ? unitsEnglish : unitsMedumba)));

    const zigzagFull   = [0, 56, 90, 56, 0, -56, -90, -56, 0, 56, 90];
    const zigzagMobile = [0, 36, 56, 36, 0, -36, -56, -36, 0, 36, 56];
    const zigzag       = isMobile ? zigzagMobile : zigzagFull;
    let   globalIdx  = 0;

    /* ════════════════════════════════════════════════════════════════
       PURCHASE FLOW VIEWS
    ════════════════════════════════════════════════════════════════ */

    /* ── Payment Method ── */
    const renderPaymentMethod = () => {
        const isMC = payMethod === 'mastercard';
        const mcReady = isMC
            ? cardNum.replace(/\s/g, '').length === 16 && cardName.trim() && cardExpiry.length === 5 && cardCvv.length === 3
            : true;
        const canContinue = payMethod !== null && mcReady;

        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>
                <button onClick={() => setPurchaseFlow('packages')} style={{
                    background: 'none', border: 'none', fontSize: '1.5rem',
                    cursor: 'pointer', color: T.text, marginBottom: '1.5rem', padding: '0',
                }}>←</button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: T.text, marginBottom: '0.5rem' }}>
                    {isFr ? 'Mode de paiement 💳' : 'Payment Method 💳'}
                </h2>
                <p style={{ fontSize: '0.9rem', color: T.textMuted, marginBottom: '1.5rem' }}>
                    {isFr ? 'Choisissez votre méthode de paiement' : 'Choose your payment method'}
                </p>

                {/* Package summary */}
                {selectedPkg && (
                    <div style={{
                        padding: '0.9rem 1.2rem', borderRadius: '14px',
                        backgroundColor: T.blueTint, border: '2px solid #bfdbfe',
                        marginBottom: '1.5rem', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <span style={{ fontWeight: '700', color: '#0056D2' }}>{selectedPkg.label} gems</span>
                        <span style={{ fontWeight: '800', color: '#0056D2', fontSize: '1.1rem' }}>{selectedPkg.price}</span>
                    </div>
                )}

                {/* Payment options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {PAYMENT_METHODS.map((pm) => {
                        const sel = payMethod === pm.id;
                        return (
                            <button
                                key={pm.id}
                                onClick={() => setPayMethod(pm.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.2rem', borderRadius: '16px',
                                    border: `2px solid ${sel ? '#0056D2' : T.border}`,
                                    backgroundColor: sel ? '#eff6ff' : '#fff',
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{pm.icon}</span>
                                <span style={{ fontWeight: '700', color: sel ? '#0056D2' : '#334155', fontSize: '1rem' }}>
                                    {pm.label}
                                </span>
                                {sel && <span style={{ marginLeft: 'auto', color: '#0056D2', fontSize: '1.2rem' }}>✓</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Mastercard fields */}
                {isMC && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <input
                            placeholder={isFr ? 'Numéro de carte (16 chiffres)' : 'Card number (16 digits)'}
                            maxLength={19}
                            value={cardNum}
                            onChange={(e) => {
                                const v = e.target.value.replace(/\D/g,'').slice(0,16);
                                setCardNum(v.replace(/(.{4})/g,'$1 ').trim());
                            }}
                            style={inputStyle(T)}
                        />
                        <input
                            placeholder={isFr ? 'Nom sur la carte' : 'Name on card'}
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            style={inputStyle(T)}
                        />
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                                placeholder="MM/YY"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g,'').slice(0,4);
                                    setCardExpiry(v.length > 2 ? v.slice(0,2)+'/'+v.slice(2) : v);
                                }}
                                style={{ ...inputStyle(T), flex: 1 }}
                            />
                            <input
                                placeholder="CVV"
                                maxLength={3}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,3))}
                                style={{ ...inputStyle(T), flex: 1 }}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={() => canContinue && setPurchaseFlow('summary')}
                    disabled={!canContinue}
                    style={ctaStyle(canContinue)}
                >
                    {isFr ? 'Continuer' : 'Continue'}
                </button>
            </div>
        );
    };

    /* ── Order Summary ── */
    const renderOrderSummary = () => (
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <button onClick={() => setPurchaseFlow('payment')} style={{
                background: 'none', border: 'none', fontSize: '1.5rem',
                cursor: 'pointer', color: T.text, marginBottom: '1.5rem', padding: '0',
            }}>←</button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: T.text, marginBottom: '0.5rem' }}>
                {isFr ? 'Récapitulatif 📋' : 'Order Summary 📋'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: T.textMuted, marginBottom: '1.5rem' }}>
                {isFr ? 'Vérifiez votre commande avant de confirmer' : 'Review your order before confirming'}
            </p>

            {/* Summary card */}
            <div style={{
                borderRadius: '20px', border: `2px solid ${T.border}`,
                overflow: 'hidden', marginBottom: '1.5rem',
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                    padding: '1.5rem', textAlign: 'center', color: '#fff',
                }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>💎</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>
                        {selectedPkg?.gems.toLocaleString()} {isFr ? 'diamants' : 'diamonds'}
                    </div>
                </div>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                        { labelEn: 'Package', labelFr: 'Forfait', val: selectedPkg?.label },
                        { labelEn: 'Payment', labelFr: 'Paiement', val: PAYMENT_METHODS.find(p => p.id === payMethod)?.label },
                        payMethod === 'mastercard' && { labelEn: 'Card', labelFr: 'Carte', val: `•••• •••• •••• ${cardNum.slice(-4)}` },
                    ].filter(Boolean).map((row, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.88rem', color: T.textMuted, fontWeight: '600' }}>
                                {isFr ? row.labelFr : row.labelEn}
                            </span>
                            <span style={{ fontSize: '0.88rem', color: T.text, fontWeight: '700' }}>{row.val}</span>
                        </div>
                    ))}
                    <div style={{ height: '1px', backgroundColor: T.border }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '800', color: T.text }}>Total</span>
                        <span style={{ fontWeight: '800', color: '#0056D2', fontSize: '1.1rem' }}>
                            {selectedPkg?.price}
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => {
                    setGems((g) => g + (selectedPkg?.gems || 0));
                    setPurchaseFlow('success');
                }}
                style={ctaStyle(true)}
            >
                {isFr ? 'Confirmer le paiement' : 'Confirm Payment'}
            </button>
        </div>
    );

    /* ── Payment Success ── */
    const renderPaymentSuccess = () => (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem', textAlign: 'center',
        }}>
            <style>{`
                @keyframes yeeaayy-bounce {
                    0%,100% { transform: scale(1) rotate(-2deg); }
                    50%     { transform: scale(1.08) rotate(2deg); }
                }
                @keyframes success-pop {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); }
                }
            `}</style>

            <h1 style={{
                fontSize: '2.4rem', fontWeight: '900', color: '#0056D2',
                marginBottom: '1.5rem', letterSpacing: '-0.02em',
                animation: 'yeeaayy-bounce 1s ease-in-out infinite',
            }}>
                Yeeaayy !! 🎉
            </h1>

            <img
                src={profileWelcomeVector}
                alt="Success"
                style={{
                    width: '200px', height: 'auto', marginBottom: '1.5rem',
                    animation: 'success-pop 0.6s cubic-bezier(0.175,0.885,0.32,1.275) both',
                }}
            />

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: T.text, marginBottom: '0.75rem' }}>
                {isFr ? 'Succès !' : 'Successful!'}
            </h2>
            <p style={{
                fontSize: '1rem', color: T.textMuted, maxWidth: '280px',
                lineHeight: '1.65', marginBottom: '2.5rem', fontWeight: '500',
            }}>
                {selectedPkg
                    ? (isFr
                        ? `${selectedPkg.gems.toLocaleString()} diamants ont été ajoutés à votre compte.`
                        : `${selectedPkg.gems.toLocaleString()} diamonds have been added to your account.`)
                    : ''}
            </p>

            <button
                onClick={() => {
                    setPurchaseFlow(null);
                    setSelectedPkg(null);
                    setPayMethod(null);
                    setCardNum(''); setCardName(''); setCardExpiry(''); setCardCvv('');
                    setActiveNav('home');
                }}
                style={ctaStyle(true)}
            >
                OK
            </button>
        </div>
    );

    /* ════════════════════════════════════════════════════════════════
       TAB CONTENT
    ════════════════════════════════════════════════════════════════ */

    /* ── CHEST MODAL ── */
    const renderChestModal = () => {
        if (!chestModal) return null;
        const CHEST_GEMS = 15;
        return (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
                <style>{`@keyframes chest-pop { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } } @keyframes chest-bounce { 0%,100%{transform:scale(1) rotate(0deg);} 25%{transform:scale(1.2) rotate(-6deg);} 75%{transform:scale(1.2) rotate(6deg);} }`}</style>
                <div style={{ backgroundColor:'#fff', borderRadius:'28px', padding:'2.5rem 2rem', textAlign:'center', width:'min(340px,90vw)', boxShadow:'0 24px 60px rgba(0,0,0,0.3)', animation:'chest-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)' }}>
                    <div style={{ fontSize:'5rem', display:'inline-block', animation: chestCollected ? 'none' : 'chest-bounce 0.9s ease infinite' }}>
                        {chestCollected ? '✨' : '💰'}
                    </div>
                    <h2 style={{ fontSize:'1.4rem', fontWeight:'900', color:'#0f172a', margin:'1rem 0 0.5rem' }}>
                        {chestCollected ? (isFr ? 'Récompense collectée !' : 'Reward collected!') : (isFr ? 'Coffre débloqué !' : 'Chest unlocked!')}
                    </h2>
                    <p style={{ fontSize:'0.9rem', color:'#64748b', marginBottom:'1.5rem', lineHeight:1.5 }}>
                        {chestCollected
                            ? (isFr ? 'Continuez votre progression !' : 'Keep up the great work!')
                            : (isFr ? 'Vous avez terminé cette section. Voici votre récompense !' : 'You completed this section. Here\'s your reward!')}
                    </p>
                    {!chestCollected && (
                        <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.5rem' }}>
                            <div style={{ backgroundColor:'#fef3c7', borderRadius:'16px', padding:'0.8rem 2rem', fontWeight:'900', fontSize:'1.4rem', color:'#92400e', boxShadow:'0 4px 12px rgba(251,191,36,0.3)' }}>
                                💎 +{CHEST_GEMS}
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            if (!chestCollected) {
                                setGems(g => g + CHEST_GEMS);
                                setOpenedChests(s => new Set([...s, chestModal.id]));
                                setChestCollected(true);
                            } else {
                                setChestModal(null);
                            }
                        }}
                        style={{ width:'100%', backgroundColor: chestCollected ? '#22c55e' : '#0056D2', color:'#fff', padding:'1rem', borderRadius:'9999px', fontSize:'1rem', fontWeight:'700', border:'none', cursor:'pointer', fontFamily:'inherit', boxShadow: chestCollected ? '0 6px 16px rgba(34,197,94,0.35)' : '0 6px 16px rgba(0,86,210,0.35)' }}
                    >
                        {chestCollected ? (isFr ? 'Continuer →' : 'Continue →') : (isFr ? 'Collecter 💎' : 'Collect 💎')}
                    </button>
                </div>
            </div>
        );
    };

    /* ── DAILY STORIES data ── */
    const STORIES = [
        {
            id: 's1', type: 'word', emoji: '📖', color: '#0056D2',
            labelEn: 'Word of the Day', labelFr: 'Mot du jour',
            titleEn: 'ŋwɑ̂ʼ', titleFr: 'ŋwɑ̂ʼ',
            bodyEn: '"Water" in Medumba. Used in greetings: ŋwɑ̂ʼ tə — the water flows.',
            bodyFr: '"Eau" en Medumba. Utilisé dans les salutations : ŋwɑ̂ʼ tə — l\'eau coule.',
        },
        {
            id: 's2', type: 'phrase', emoji: '💬', color: '#7c3aed',
            labelEn: 'Expression', labelFr: 'Expression',
            titleEn: 'Ó tsɑ̌ʼ nə?', titleFr: 'Ó tsɑ̌ʼ nə?',
            bodyEn: '"How are you?" — the most common Medumba greeting. Reply: Mə̀ tsɑ̌ʼ yə̀.',
            bodyFr: '"Comment vas-tu ?" — la salutation Medumba la plus courante. Réponse : Mə̀ tsɑ̌ʼ yə̀.',
        },
        {
            id: 's3', type: 'challenge', emoji: '⚡', color: '#d97706',
            labelEn: 'Flash Challenge', labelFr: 'Défi Flash',
            titleEn: 'Quick Quiz!', titleFr: 'Quiz Rapide !',
            bodyEn: 'What does "mbɑ́ʼ" mean? A) House  B) Fire  C) Tree\n\nAnswer: A) House 🏠',
            bodyFr: 'Que signifie "mbɑ́ʼ" ? A) Maison  B) Feu  C) Arbre\n\nRéponse : A) Maison 🏠',
        },
        {
            id: 's4', type: 'culture', emoji: '🎵', color: '#059669',
            labelEn: 'Culture', labelFr: 'Culture',
            titleEn: 'Medumba Music', titleFr: 'Musique Medumba',
            bodyEn: 'The "nkúʼ" drum is sacred in Medumba culture. It announces ceremonies and signals important messages across villages.',
            bodyFr: 'Le tambour "nkúʼ" est sacré dans la culture Medumba. Il annonce les cérémonies et transmet des messages importants entre villages.',
        },
        {
            id: 's5', type: 'proverb', emoji: '🌿', color: '#0891b2',
            labelEn: 'Proverb', labelFr: 'Proverbe',
            titleEn: 'Medumba Wisdom', titleFr: 'Sagesse Medumba',
            bodyEn: '"The tree that bends in the wind does not break." — Medumba proverb on resilience.',
            bodyFr: '"L\'arbre qui se courbe dans le vent ne se brise pas." — Proverbe Medumba sur la résilience.',
        },
    ];

    const renderStoriesStrip = () => (
        <div style={{ margin: isMobile ? '1rem 0 0' : '1.25rem 0 0', position: 'relative' }}>
            <style>{`
                @keyframes story-pop   { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes story-ring  { 0%,100% { box-shadow: 0 0 0 3px #0056D2; } 50% { box-shadow: 0 0 0 3px #0056D2, 0 0 12px 4px rgba(0,86,210,0.4); } }
                @keyframes slide-up    { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes progress-bar { from { width: 0%; } to { width: 100%; } }
            `}</style>

            {/* Scrollable strip */}
            <div style={{
                display: 'flex', gap: '1rem', overflowX: 'auto', padding: isMobile ? '0 0.75rem 0.5rem' : '0 2rem 0.5rem',
                scrollbarWidth: 'none', msOverflowStyle: 'none',
            }}>
                {STORIES.map((story, idx) => {
                    const seen = seenStories.has(story.id);
                    return (
                        <div key={story.id}
                            onClick={() => { setActiveStory(idx); markStorySeen(story.id); }}
                            style={{
                                flexShrink: 0, display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '0.4rem', cursor: 'pointer',
                                animation: `story-pop 0.35s ease ${idx * 0.07}s both`,
                            }}
                        >
                            <div style={{
                                width: '62px', height: '62px', borderRadius: '50%',
                                padding: '3px',
                                background: seen ? T.border : `linear-gradient(135deg, ${story.color}, #f59e0b)`,
                                animation: !seen ? 'story-ring 2.5s ease-in-out infinite' : 'none',
                            }}>
                                <div style={{
                                    width: '100%', height: '100%', borderRadius: '50%',
                                    backgroundColor: seen ? T.surface3 : story.color,
                                    border: `3px solid ${T.surface}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.6rem', opacity: seen ? 0.5 : 1,
                                }}>
                                    {story.emoji}
                                </div>
                            </div>
                            <span style={{
                                fontSize: '0.68rem', fontWeight: '700', color: seen ? T.textSub : T.text,
                                maxWidth: '68px', textAlign: 'center', lineHeight: 1.2,
                            }}>
                                {isFr ? story.labelFr : story.labelEn}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Full-screen story overlay */}
            {activeStory !== null && (() => {
                const story = STORIES[activeStory];
                const hasPrev = activeStory > 0;
                const hasNext = activeStory < STORIES.length - 1;
                return (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        backgroundColor: 'rgba(0,0,0,0.92)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'slide-up 0.25s ease',
                    }}
                        onClick={() => setActiveStory(null)}
                    >
                        <div
                            onClick={e => e.stopPropagation()}
                            style={{
                                width: 'min(380px, 92vw)', borderRadius: '24px',
                                background: `linear-gradient(160deg, ${story.color}ee, #0f172a)`,
                                padding: '1.5rem 1.75rem 2rem',
                                position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                            }}
                        >
                            {/* Progress bars */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
                                {STORIES.map((_, i) => (
                                    <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', backgroundColor: '#fff', borderRadius: '99px',
                                            width: i < activeStory ? '100%' : i === activeStory ? '0%' : '0%',
                                            animation: i === activeStory ? 'progress-bar 6s linear forwards' : 'none',
                                        }} />
                                    </div>
                                ))}
                            </div>

                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <span style={{ fontSize: '1.6rem' }}>{story.emoji}</span>
                                    <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>
                                        {isFr ? story.labelFr : story.labelEn}
                                    </span>
                                </div>
                                <button onClick={() => setActiveStory(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.7, padding: '0' }}>✕</button>
                            </div>

                            {/* Content */}
                            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                                {isFr ? story.titleFr : story.titleEn}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                {isFr ? story.bodyFr : story.bodyEn}
                            </div>

                            {/* Nav arrows */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '0.75rem' }}>
                                <button
                                    onClick={() => { if (hasPrev) setActiveStory(activeStory - 1); }}
                                    disabled={!hasPrev}
                                    style={{
                                        flex: 1, padding: '0.7rem', borderRadius: '12px',
                                        backgroundColor: hasPrev ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                                        border: 'none', color: hasPrev ? '#fff' : 'rgba(255,255,255,0.3)',
                                        fontWeight: '700', fontSize: '0.85rem', cursor: hasPrev ? 'pointer' : 'default', fontFamily: 'inherit',
                                    }}
                                >← {isFr ? 'Préc.' : 'Prev'}</button>
                                <button
                                    onClick={() => { if (hasNext) { setActiveStory(activeStory + 1); markStorySeen(STORIES[activeStory + 1].id); } else setActiveStory(null); }}
                                    style={{
                                        flex: 1, padding: '0.7rem', borderRadius: '12px',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        border: 'none', color: '#fff',
                                        fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                                    }}
                                >{hasNext ? (isFr ? 'Suiv. →' : 'Next →') : (isFr ? 'Fermer ✓' : 'Close ✓')}</button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );

    /* ── HOME: Learning Path ── */
    const renderHome = () => (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>
            <style>{`
                @keyframes pulse-ring {
                    0%   { box-shadow: 0 6px 0 #0041a3, 0 0 0 0 rgba(0,86,210,0.45); }
                    70%  { box-shadow: 0 6px 0 #0041a3, 0 0 0 14px rgba(0,86,210,0); }
                    100% { box-shadow: 0 6px 0 #0041a3, 0 0 0 0 rgba(0,86,210,0); }
                }
            `}</style>
            {/* ── Welcome hero banner ── */}
            {userName && (
                <div style={{
                    margin: isMobile ? '1rem 0.75rem 0' : '1.5rem 2rem 0',
                    borderRadius: '22px', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0056D2 0%, #0891b2 60%, #06b6d4 100%)',
                    padding: '1.4rem 1.6rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: '0 8px 28px rgba(0,86,210,0.25)',
                    position: 'relative',
                }}>
                    <div style={{ zIndex: 1 }}>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', fontWeight: '700', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                            {isFr ? 'Bon retour !' : 'Welcome back!'}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fff', marginBottom: '0.3rem' }}>
                            {userName} 👋
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '99px', padding: '0.2rem 0.7rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>🔥</span>
                                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#fff' }}>{streak} {isFr ? 'j.' : 'day streak'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '99px', padding: '0.2rem 0.7rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>⚡</span>
                                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#fff' }}>{xp} XP</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: '3.5rem', flexShrink: 0, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
                        {reasonMeta.emoji}
                    </div>
                </div>
            )}

            {/* ── Personalized tip banner ── */}
            {(profile.reason || (profile.goals && profile.goals.length > 0)) && (
                <div style={{
                    margin: isMobile ? '1rem 0.75rem 0' : '1.5rem 2rem 0',
                    padding: '0.9rem 1.2rem', borderRadius: '16px',
                    backgroundColor: T.blueTint, border: '2px solid #bfdbfe',
                    fontSize: '0.85rem', fontWeight: '600', color: '#1e40af', lineHeight: 1.5,
                }}>
                    {getPersonalizedTip(profile, isFr)}
                </div>
            )}

            {/* ── Daily Stories strip ── */}
            {renderStoriesStrip()}

            {units.map((unit, uIdx) => {
                const unitStart = globalIdx;
                globalIdx += unit.lessons.length;
                return (
                    <div key={unit.id}>
                        {/* Unit header */}
                        <div style={{
                            margin: isMobile ? '1rem 0.75rem 0' : '2rem 2rem 0',
                            padding: isMobile ? '1rem 1.1rem' : '1.2rem 1.6rem', borderRadius: '20px',
                            background: `linear-gradient(135deg, ${unit.color}, ${unit.accent})`,
                            color: '#fff', display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', boxShadow: `0 8px 24px ${unit.color}44`,
                        }}>
                            <div>
                                <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', opacity: 0.75, marginBottom: '0.2rem' }}>
                                    {(isFr ? `UNITÉ ${unit.id}` : `UNIT ${unit.id}`) + ' · ' + (learnLang === 'english' ? '🇬🇧' : '🇨🇲')}
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{isFr ? unit.titleFr : unit.titleEn}</div>
                                <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '0.2rem' }}>{isFr ? unit.subFr : unit.subEn}</div>
                            </div>
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px',
                                backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: '1.85rem',
                            }}>{unit.emoji}</div>
                        </div>

                        {/* Lesson nodes */}
                        <div style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', padding: '2rem 0', gap: '1.6rem',
                        }}>
                            {unit.lessons.map((lesson, lIdx) => {
                                const offset  = zigzag[(unitStart + lIdx) % zigzag.length];
                                const done    = lesson.status === 'completed';
                                const active  = lesson.status === 'active';
                                const locked  = lesson.status === 'locked';
                                const isBoss  = lesson.type === 'boss';
                                const isChest = lesson.type === 'chest';
                                const size    = isBoss ? 88 : isChest ? 72 : 68;
                                const radius  = isBoss ? '20px' : isChest ? '18px' : '50%';
                                const bg      = done || active ? unit.color : T.border;
                                const sh      = done || active ? unit.accent : '#b2b2b2';
                                const icon    = done ? '✓'
                                    : locked ? (isChest ? '💰' : isBoss ? '🏆' : '🔒')
                                    : (isChest ? '💰' : isBoss ? '🏆' : '⭐');

                                // Decorative illustrations placed beside specific nodes
                                const globalNodeIdx = unitStart + lIdx;
                                const decorators = [
                                    { idx: 0, src: person2Img, side: 'right', alt: '' },
                                    { idx: 2, src: laptopImg,  side: 'right', alt: '' },
                                    { idx: 4, src: globeImg,   side: 'right', alt: '' },
                                    { idx: 6, src: person1Img, side: 'left',  alt: '' },
                                ];
                                const decorator = decorators.find(d => d.idx === globalNodeIdx);

                                return (
                                    <div key={lesson.id} style={{
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', gap: '0.55rem',
                                        transform: `translateX(${offset}px)`, position: 'relative',
                                    }}>
                                        {decorator && (
                                            <img src={decorator.src} alt={decorator.alt} style={{
                                                position: 'absolute',
                                                top: '50%', transform: 'translateY(-50%)',
                                                [decorator.side]: decorator.side === 'right' ? '-90px' : '-90px',
                                                width: '78px', height: 'auto',
                                                pointerEvents: 'none', userSelect: 'none',
                                                opacity: 0.92,
                                            }} />
                                        )}
                                        {active && (
                                            <div style={{
                                                position: 'absolute', top: `-${size / 2 + 28}px`,
                                                backgroundColor: unit.color, color: '#fff',
                                                padding: '0.4rem 1rem', borderRadius: '10px',
                                                fontWeight: '800', fontSize: '0.78rem',
                                                letterSpacing: '0.6px', whiteSpace: 'nowrap',
                                                boxShadow: `0 4px 0 ${unit.accent}`, zIndex: 5,
                                            }}>
                                                {isFr ? 'COMMENCER' : 'START'}
                                                <div style={{
                                                    position: 'absolute', bottom: '-7px', left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    borderLeft: '7px solid transparent',
                                                    borderRight: '7px solid transparent',
                                                    borderTop: `7px solid ${unit.color}`,
                                                }} />
                                            </div>
                                        )}
                                        <div
                                            onClick={() => {
                                                if (locked || isBoss) return;
                                                if (isChest) {
                                                    if (!locked) { setChestModal({ ...lesson, unitColor: unit.color }); setChestCollected(false); }
                                                } else {
                                                    setActiveLesson({ ...lesson, unitColor: unit.color, unitAccent: unit.accent });
                                                    setLessonFlow('loading');
                                                }
                                            }}
                                            style={{
                                                width: `${size}px`, height: `${size}px`,
                                                borderRadius: radius, backgroundColor: bg,
                                                boxShadow: `0 6px 0 ${sh}`,
                                                display: 'flex', flexDirection: 'column',
                                                justifyContent: 'center', alignItems: 'center',
                                                cursor: locked || isBoss ? 'default' : 'pointer',
                                                opacity: locked ? 0.55 : 1, gap: '2px',
                                                animation: active ? 'pulse-ring 2s ease-out infinite' : 'none',
                                            }}
                                            onMouseDown={(e) => { if (!locked && !isBoss) e.currentTarget.style.transform = 'translateY(5px)'; }}
                                            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <span style={{ fontSize: isBoss ? '1.9rem' : isChest ? '1.6rem' : '1.5rem' }}>{icon}</span>
                                            {isBoss && <span style={{ fontSize: '0.55rem', fontWeight: '800', color: '#fff', letterSpacing: '0.5px' }}>BOSS</span>}
                                        </div>
                                        <span style={{
                                            fontWeight: '700', fontSize: '0.78rem',
                                            color: done || active ? unit.color : '#9ca3af',
                                            textAlign: 'center', maxWidth: '84px', lineHeight: 1.3,
                                        }}>
                                            {isFr ? lesson.titleFr : lesson.titleEn}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {uIdx < units.length - 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 2rem', color: '#cbd5e1' }}>
                                <div style={{ flex: 1, height: '2px', backgroundColor: T.border }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#cbd5e1' }}>
                                    {isFr ? 'UNITÉ SUIVANTE' : 'NEXT UNIT'}
                                </span>
                                <div style={{ flex: 1, height: '2px', backgroundColor: T.border }} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    /* ── LEADERBOARD ── */
    const renderLeaderboard = () => (
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: T.text, marginBottom: '0.25rem' }}>
                {isFr ? '🏆 Classement' : '🏆 Leaderboard'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: T.textMuted, marginBottom: '1.5rem' }}>
                {isFr ? 'Voyez où vous vous situez cette semaine' : 'See how you rank this week'}
            </p>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                    { id: 'weekly', en: 'Weekly', fr: 'Hebdomadaire' },
                    { id: 'alltime', en: 'All Time', fr: 'Depuis Toujours' },
                ].map((t) => (
                    <button key={t.id} onClick={() => setLbTab(t.id)} style={{
                        padding: '0.5rem 1.2rem', borderRadius: '99px',
                        border: `2px solid ${lbTab === t.id ? '#0056D2' : T.border}`,
                        backgroundColor: lbTab === t.id ? '#eff6ff' : '#fff',
                        color: lbTab === t.id ? '#0056D2' : '#64748b',
                        fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                        {isFr ? t.fr : t.en}
                    </button>
                ))}
            </div>

            {/* Top 3 Podium */}
            <div style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                gap: '1rem', marginBottom: '2rem',
            }}>
                {[LEADERBOARD_DATA[1], LEADERBOARD_DATA[0], LEADERBOARD_DATA[2]].map((entry, pi) => {
                    const heights = [90, 120, 75];
                    const colors  = [T.border, '#fbbf24', '#d1d5db'];
                    const order   = [2, 1, 3];
                    return (
                        <div key={entry.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '50%',
                                backgroundColor: colors[pi], display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', fontWeight: '800', color: T.text,
                                border: `3px solid ${pi === 1 ? '#f59e0b' : T.border}`,
                            }}>
                                {entry.badge || entry.name[0]}
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', maxWidth: '60px', textAlign: 'center' }}>
                                {entry.name}
                            </span>
                            <div style={{
                                width: '64px', height: `${heights[pi]}px`,
                                backgroundColor: pi === 1 ? '#fbbf24' : pi === 0 ? '#9ca3af' : '#d1d5db',
                                borderRadius: '8px 8px 0 0', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                flexDirection: 'column', gap: '4px',
                            }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{order[pi]}</span>
                                <span style={{ fontSize: '0.6rem', color: '#fff', fontWeight: '700', opacity: 0.85 }}>{entry.xp} XP</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Full list */}
            <div style={{ borderRadius: '16px', border: `2px solid ${T.border}`, overflow: 'hidden' }}>
                {LEADERBOARD_DATA.map((entry, i) => (
                    <div key={entry.rank} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.85rem 1.1rem',
                        backgroundColor: entry.you ? '#eff6ff' : i % 2 === 0 ? '#fff' : '#fafafa',
                        borderBottom: i < LEADERBOARD_DATA.length - 1 ? `1px solid ${T.borderSub}` : 'none',
                    }}>
                        <span style={{
                            width: '24px', textAlign: 'center',
                            fontWeight: '800', fontSize: '0.85rem',
                            color: entry.rank <= 3 ? '#f59e0b' : '#9ca3af',
                        }}>
                            {entry.badge || entry.rank}
                        </span>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            backgroundColor: entry.you ? '#0056D2' : T.border,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.82rem', fontWeight: '800',
                            color: entry.you ? '#fff' : '#334155',
                        }}>
                            {entry.name[0]}
                        </div>
                        <span style={{
                            flex: 1, fontWeight: entry.you ? '800' : '600',
                            fontSize: '0.88rem', color: entry.you ? '#0056D2' : '#334155',
                        }}>
                            {entry.you ? (isFr ? 'Vous' : 'You') : entry.name}
                        </span>
                        <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#0056D2' }}>
                            {entry.xp} XP
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    /* ── CHALLENGE ── */
    const renderChallenge = () => (
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: T.text, marginBottom: '0.25rem' }}>
                {isFr ? '⚡ Défis' : '⚡ Challenges'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: T.textMuted, marginBottom: '1.5rem' }}>
                {isFr ? 'Relevez des défis pour gagner des récompenses' : 'Complete challenges to earn rewards'}
            </p>

            {/* ── Personalised challenge based on user's reason ── */}
            <div style={{
                padding: '1rem 1.25rem', borderRadius: '16px', marginBottom: '1.75rem',
                background: 'linear-gradient(135deg, #0056D2 0%, #38bdf8 100%)',
                color: '#fff',
            }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '800', letterSpacing: '0.8px', opacity: 0.8, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {isFr ? `✨ Défi personnalisé · ${reasonMeta.fr}` : `✨ Personalised · ${reasonMeta.en}`}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{reasonMeta.emoji}</span>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                        {isFr ? reasonMeta.challengeFr : reasonMeta.challengeEn}
                    </span>
                    <span style={{
                        marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: '99px', padding: '0.2rem 0.65rem',
                        fontSize: '0.75rem', fontWeight: '800', whiteSpace: 'nowrap',
                    }}>
                        +{reasonMeta.reward} XP
                    </span>
                </div>
                <Bar value={0} max={1} color="rgba(255,255,255,0.5)" />
            </div>

            {/* Daily */}
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: T.text, marginBottom: '1rem' }}>
                {isFr ? '📅 Défis du jour' : '📅 Daily Challenges'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {DAILY_CHALLENGES.map((ch) => {
                    const done = ch.progress >= ch.total;
                    return (
                        <div key={ch.id} style={{
                            padding: '1rem 1.25rem', borderRadius: '16px',
                            border: `2px solid ${done ? '#bbf7d0' : T.border}`,
                            backgroundColor: done ? '#f0fdf4' : '#fff',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
                                <span style={{ flex: 1, fontWeight: '700', fontSize: '0.9rem', color: T.text }}>
                                    {isFr ? ch.titleFr : ch.titleEn}
                                </span>
                                <span style={{
                                    padding: '0.25rem 0.65rem', borderRadius: '99px',
                                    backgroundColor: '#fef9c3', color: '#ca8a04',
                                    fontSize: '0.75rem', fontWeight: '800',
                                }}>
                                    +{ch.reward} XP
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: T.textMuted, marginBottom: '0.4rem' }}>
                                <span>{ch.progress} / {ch.total}</span>
                                {done && <span style={{ color: '#16a34a', fontWeight: '700' }}>✓ {isFr ? 'Terminé' : 'Done'}</span>}
                            </div>
                            <Bar value={ch.progress} max={ch.total} color={done ? '#16a34a' : '#0056D2'} />
                        </div>
                    );
                })}
            </div>

            {/* Weekly */}
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: T.text, marginBottom: '1rem' }}>
                {isFr ? '📆 Défis de la semaine' : '📆 Weekly Challenges'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {WEEKLY_CHALLENGES.map((ch) => {
                    const done = ch.progress >= ch.total;
                    return (
                        <div key={ch.id} style={{
                            padding: '1rem 1.25rem', borderRadius: '16px',
                            border: `2px solid ${done ? '#bbf7d0' : T.border}`,
                            backgroundColor: done ? '#f0fdf4' : '#fff',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
                                <span style={{ flex: 1, fontWeight: '700', fontSize: '0.9rem', color: T.text }}>
                                    {isFr ? ch.titleFr : ch.titleEn}
                                </span>
                                <span style={{
                                    padding: '0.25rem 0.65rem', borderRadius: '99px',
                                    backgroundColor: T.blueTint, color: '#0056D2',
                                    fontSize: '0.75rem', fontWeight: '800',
                                }}>
                                    💎 {ch.reward}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: T.textMuted, marginBottom: '0.4rem' }}>
                                <span>{ch.progress} / {ch.total}</span>
                                {done && <span style={{ color: '#16a34a', fontWeight: '700' }}>✓ {isFr ? 'Terminé' : 'Done'}</span>}
                            </div>
                            <Bar value={ch.progress} max={ch.total} color={done ? '#16a34a' : '#2563eb'} />
                        </div>
                    );
                })}
            </div>
        </div>
    );

    /* ── PREMIUM (gem packages) ── */
    const renderPremium = () => {
        if (purchaseFlow === 'payment')  return renderPaymentMethod();
        if (purchaseFlow === 'summary')  return renderOrderSummary();
        if (purchaseFlow === 'success')  return renderPaymentSuccess();

        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>
                {/* Hero */}
                <div style={{
                    borderRadius: '20px', padding: '1.75rem',
                    background: 'linear-gradient(135deg, #0056D2 0%, #38bdf8 100%)',
                    color: '#fff', textAlign: 'center', marginBottom: '2rem',
                }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💎</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.35rem' }}>
                        {isFr ? 'Acheter des Diamants' : 'Buy Diamonds'}
                    </h2>
                    <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.55 }}>
                        {isFr
                            ? 'Utilisez des diamants pour débloquer des boosts, des cours bonus et bien plus encore.'
                            : 'Use diamonds to unlock boosts, bonus lessons, and much more.'}
                    </p>
                    <div style={{
                        marginTop: '1rem', display: 'inline-flex', alignItems: 'center',
                        gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '0.4rem 1rem', borderRadius: '99px',
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>💎</span>
                        <span style={{ fontWeight: '800', fontSize: '1rem' }}>
                            {gems.toLocaleString()} {isFr ? 'diamants' : 'diamonds'}
                        </span>
                    </div>
                </div>

                {/* Packages */}
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: T.text, marginBottom: '1rem' }}>
                    {isFr ? 'Choisissez un forfait' : 'Choose a package'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                    {GEM_PACKAGES.map((pkg) => (
                        <div key={pkg.id} style={{
                            padding: '1rem 1.25rem', borderRadius: '16px',
                            border: `2px solid ${pkg.popular ? '#0056D2' : T.border}`,
                            backgroundColor: pkg.popular ? '#eff6ff' : '#fff',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            position: 'relative',
                        }}>
                            {pkg.popular && (
                                <div style={{
                                    position: 'absolute', top: '-11px', left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#0056D2', color: '#fff',
                                    fontSize: '0.68rem', fontWeight: '800',
                                    padding: '0.2rem 0.75rem', borderRadius: '99px',
                                    letterSpacing: '0.5px', whiteSpace: 'nowrap',
                                }}>
                                    {isFr ? '⭐ POPULAIRE' : '⭐ POPULAR'}
                                </div>
                            )}
                            <span style={{ fontSize: '1.75rem' }}>💎</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '800', fontSize: '1rem', color: T.text }}>
                                    {pkg.gems.toLocaleString()} {isFr ? 'diamants' : 'diamonds'}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: T.textMuted, fontWeight: '600' }}>
                                    {isFr ? `Environ ${(pkg.gems / parseFloat(pkg.price.slice(1))).toFixed(0)} par $` : `~${(pkg.gems / parseFloat(pkg.price.slice(1))).toFixed(0)} per $`}
                                </div>
                            </div>
                            <button
                                onClick={() => { setSelectedPkg(pkg); setPurchaseFlow('payment'); }}
                                style={{
                                    padding: '0.6rem 1.2rem', borderRadius: '99px',
                                    backgroundColor: '#0056D2', color: '#fff',
                                    fontWeight: '800', fontSize: '0.88rem',
                                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                }}
                            >
                                {pkg.price}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Perks */}
                <div style={{
                    padding: '1.25rem', borderRadius: '16px',
                    border: `2px solid ${T.border}`, backgroundColor: T.surface2,
                }}>
                    <h4 style={{ fontWeight: '800', fontSize: '0.9rem', color: T.text, marginBottom: '0.75rem' }}>
                        {isFr ? '💡 À quoi servent les diamants ?' : '💡 What can diamonds do?'}
                    </h4>
                    {[
                        { icon: '❤️', en: 'Refill hearts instantly',      fr: 'Recharger les cœurs instantanément'  },
                        { icon: '🎯', en: 'Unlock bonus lessons',         fr: 'Débloquer des leçons bonus'           },
                        { icon: '⚡', en: 'Activate XP boosts',           fr: 'Activer des boosts XP'               },
                        { icon: '🎨', en: 'Customize your profile',       fr: 'Personnaliser votre profil'          },
                    ].map((perk, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.65rem',
                            padding: '0.4rem 0',
                            borderBottom: i < 3 ? `1px solid ${T.border}` : 'none',
                        }}>
                            <span>{perk.icon}</span>
                            <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                                {isFr ? perk.fr : perk.en}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    /* ── ACCOUNT ── */
    const renderAccount = () => {
        const initials = userName
            ? userName.trim().split(' ').map((w) => w[0].toUpperCase()).slice(0, 2).join('')
            : '?';

        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>

                {/* ── Language selectors — mobile only ── */}
                {isMobile && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: '700', color: T.textSub, letterSpacing: '0.5px', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                                {isFr ? 'Langue app' : 'App language'}
                            </div>
                            <select value={lang} onChange={(e) => setLang(e.target.value)} style={selectStyle(T)}>
                                <option value="en">🇺🇸 English</option>
                                <option value="fr">🇫🇷 Français</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: '700', color: T.textSub, letterSpacing: '0.5px', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                                {isFr ? 'J\'apprends' : 'Learning'}
                            </div>
                            <select value={learnLang} onChange={(e) => setLearnLang(e.target.value)} style={{ ...selectStyle(T), border: '2px solid #bfdbfe', backgroundColor: T.blueTint, color: '#0056D2' }}>
                                <option value="medumba">🇨🇲 Medumba</option>
                                <option value="english">🇬🇧 English</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* ── Profile hero card ── */}
                <div style={{
                    borderRadius: '24px', marginBottom: '1.25rem', overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,86,210,0.15)',
                }}>
                    {/* Gradient header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0056D2 0%, #0891b2 100%)',
                        padding: '1.5rem 1.5rem 3.5rem',
                        position: 'relative',
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {isFr ? 'Mon profil' : 'My profile'}
                        </div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', marginTop: '0.25rem' }}>
                            {userName || (isFr ? 'Apprenant' : 'Learner')}
                        </div>
                        {profile.email && (
                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.2rem' }}>
                                {profile.email}
                            </div>
                        )}
                    </div>
                    {/* Overlapping avatar */}
                    <div style={{ backgroundColor: T.surface, padding: '0 1.5rem 1.25rem', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '-2.25rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                                border: '4px solid #fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.6rem', fontWeight: '900', color: '#fff',
                                boxShadow: '0 4px 16px rgba(0,86,210,0.3)', flexShrink: 0,
                            }}>{initials}</div>
                            <div style={{ paddingBottom: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{
                                        fontSize: '0.72rem', fontWeight: '800', color: profMeta.color,
                                        backgroundColor: profMeta.color + '18', border: `1.5px solid ${profMeta.color}44`,
                                        borderRadius: '99px', padding: '0.15rem 0.6rem',
                                    }}>📊 {isFr ? profMeta.fr : profMeta.en}</span>
                                    <span style={{
                                        fontSize: '0.72rem', fontWeight: '800', color: '#0056D2',
                                        backgroundColor: T.blueTint, border: '1.5px solid #bfdbfe',
                                        borderRadius: '99px', padding: '0.15rem 0.6rem',
                                    }}>{learnLang === 'english' ? '🇬🇧 English' : '🇨🇲 Medumba'}</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Personal info rows ── */}
                        <h3 style={{ fontSize: '0.82rem', fontWeight: '800', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.65rem' }}>
                            {isFr ? 'Informations personnelles' : 'Personal information'}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {[
                                { icon: '👤', labelEn: 'Full Name',      labelFr: 'Nom complet',     value: profile.name  || '—' },
                                { icon: '📧', labelEn: 'Email address',  labelFr: 'Adresse e-mail',  value: profile.email || '—' },
                                { icon: '🎂', labelEn: 'Age',            labelFr: 'Âge',             value: profile.age ? `${profile.age} ${isFr ? 'ans' : 'years old'}` : '—' },
                                { icon: '🎯', labelEn: 'Learning goal',  labelFr: 'Objectif',        value: profile.reason ? `${reasonMeta.emoji} ${isFr ? reasonMeta.fr : reasonMeta.en}` : '—' },
                                { icon: '⏱️', labelEn: 'Daily practice', labelFr: 'Pratique/jour',   value: `${goalCfg.time} min — ${goalCfg.xp} XP` },
                            ].map((row, i, arr) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.75rem 0',
                                    borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSub}` : 'none',
                                }}>
                                    <span style={{ fontSize: '1rem', flexShrink: 0, width: '22px', textAlign: 'center' }}>{row.icon}</span>
                                    <span style={{ fontSize: '0.78rem', color: T.textSub, fontWeight: '600', width: '100px', flexShrink: 0 }}>
                                        {isFr ? row.labelFr : row.labelEn}
                                    </span>
                                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: T.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Goals chips ── */}
                {userGoals.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {userGoals.map((g) => {
                            const gm = GOAL_META[g];
                            if (!gm) return null;
                            return (
                                <div key={g} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.35rem 0.85rem', borderRadius: '99px',
                                    backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                                }}>
                                    <span>{gm.emoji}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16a34a' }}>
                                        {isFr ? gm.fr : gm.en}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Stats ── */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: T.text, marginBottom: '0.85rem' }}>
                    {isFr ? '📊 Mes Statistiques' : '📊 My Stats'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {[
                        { icon: '🔥', valEn: `${streak} days`, valFr: `${streak} jours`, labelEn: 'Streak', labelFr: 'Série' },
                        { icon: '⚡', valEn: `${xp} XP`,      valFr: `${xp} XP`,        labelEn: 'Total XP', labelFr: 'XP Total' },
                        { icon: '💎', valEn: `${gems}`,                  valFr: `${gems}`,                    labelEn: 'Diamonds', labelFr: 'Diamants' },
                        { icon: '❤️', valEn: `${hearts}/5`,   valFr: `${hearts}/5`,      labelEn: 'Hearts',   labelFr: 'Cœurs' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            padding: '1rem', borderRadius: '14px',
                            border: `2px solid ${T.border}`, backgroundColor: T.surface, textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
                            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#0056D2' }}>
                                {isFr ? stat.valFr : stat.valEn}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: T.textMuted, fontWeight: '600', marginTop: '2px' }}>
                                {isFr ? stat.labelFr : stat.labelEn}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Settings ── */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: T.text, marginBottom: '0.85rem' }}>
                    {isFr ? '⚙️ Paramètres' : '⚙️ Settings'}
                </h3>
                <div style={{ borderRadius: '16px', border: `2px solid ${T.border}`, overflow: 'hidden', marginBottom: '1rem' }}>
                    <style>{`
                        @keyframes toggle-slide { from{transform:translateX(0);} to{transform:translateX(20px);} }
                    `}</style>
                    {/* Dark Mode row — functional toggle */}
                    <div onClick={toggleDark} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.9rem 1.1rem', cursor: 'pointer', backgroundColor: T.surface,
                        borderBottom: `1px solid ${T.borderSub}`,
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>{isDark ? '☀️' : '🌙'}</span>
                        <span style={{ flex: 1, fontWeight: '600', fontSize: '0.9rem', color: T.text }}>
                            {isFr ? 'Mode Sombre' : 'Dark Mode'}
                        </span>
                        {/* Toggle pill */}
                        <div style={{
                            width: '44px', height: '24px', borderRadius: '99px', flexShrink: 0,
                            backgroundColor: isDark ? '#0056D2' : T.border,
                            position: 'relative', transition: 'background-color 0.25s',
                        }}>
                            <div style={{
                                position: 'absolute', top: '3px',
                                left: isDark ? '21px' : '3px',
                                width: '18px', height: '18px', borderRadius: '50%',
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                                transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                        </div>
                    </div>
                    {[
                        { icon: '🔔', en: 'Notifications',      fr: 'Notifications'        },
                        { icon: '🔒', en: 'Privacy & Security', fr: 'Confidentialité'      },
                        { icon: '📖', en: 'About Medumba',      fr: 'À propos de Medumba'  },
                    ].map((item, i, arr) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.9rem 1.1rem', cursor: 'pointer', backgroundColor: T.surface,
                            borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSub}` : 'none',
                        }}>
                            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                            <span style={{ flex: 1, fontWeight: '600', fontSize: '0.9rem', color: T.text }}>
                                {isFr ? item.fr : item.en}
                            </span>
                            <span style={{ color: T.textSub }}>›</span>
                        </div>
                    ))}
                </div>

                {/* Admin button - visible only for admins */}
                {userIsAdmin && onAdmin && (
                    <button
                        onClick={onAdmin}
                        style={{
                            width: '100%', padding: '0.9rem', borderRadius: '14px',
                            border: '2px solid #1B4FD8', backgroundColor: T.blueTint,
                            color: '#1B4FD8', fontWeight: '800', fontSize: '0.9rem',
                            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.3px',
                            marginBottom: '0.75rem',
                        }}
                    >
                        🛡️ {isFr ? 'Panel Administrateur' : 'Admin Panel'}
                    </button>
                )}

                {/* Logout */}
                <button
                    onClick={onLogout}
                    style={{
                        width: '100%', padding: '0.9rem', borderRadius: '14px',
                        border: '2px solid #fee2e2', backgroundColor: T.surface,
                        color: '#ef4444', fontWeight: '800', fontSize: '0.9rem',
                        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.3px',
                    }}
                >
                    🚪 {isFr ? 'Se déconnecter' : 'Log out'}
                </button>
            </div>
        );
    };

    /* ── right panel (home only) ── */
    const renderRightPanel = () => (
        <aside style={{
            width: '272px', minWidth: '272px',
            borderLeft: `2px solid ${T.border}`, padding: '1.5rem 1.1rem',
            display: 'flex', flexDirection: 'column', gap: '1.1rem',
            backgroundColor: T.surface, overflowY: 'auto',
        }}>
            {/* Daily goal */}
            <div style={{ padding: '1.1rem 1.2rem', borderRadius: '16px', border: `2px solid ${T.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.88rem', color: T.text }}>
                        {isFr ? 'Objectif du jour' : 'Daily Goal'}
                    </span>
                    <span style={{ fontSize: '1.1rem' }}>🎯</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: T.textSub, fontWeight: '600', marginBottom: '0.5rem' }}>
                    {goalCfg.time} {isFr ? 'min / jour' : 'min / day'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: T.textMuted, marginBottom: '0.5rem' }}>
                    <span>0 / {goalCfg.xp} XP</span>
                    <span style={{ fontWeight: '700', color: '#0056D2' }}>0%</span>
                </div>
                <Bar value={0} max={goalCfg.xp} />
            </div>

            {/* Streak week tracker */}
            <div style={{ padding: '1.1rem 1.2rem', borderRadius: '16px', border: '2px solid #fde68a', backgroundColor: '#fffbeb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#92400e' }}>
                        {isFr ? 'Ma Série' : 'My Streak'}
                    </span>
                    <span style={{ fontSize: '1.1rem' }}>🔥</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {(isFr ? ['L','M','M','J','V','S','D'] : ['M','T','W','T','F','S','S']).map((day, i) => {
                        const on = i < streak;
                        return (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    backgroundColor: on ? '#f59e0b' : T.border,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: on ? '0.8rem' : '0',
                                }}>
                                    {on && '🔥'}
                                </div>
                                <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontWeight: '600' }}>{day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Leaderboard teaser */}
            <div style={{ padding: '1.1rem 1.2rem', borderRadius: '16px', border: `2px solid ${T.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.88rem', color: T.text }}>
                        {isFr ? 'Classement' : 'Leaderboard'}
                    </span>
                    <span style={{ fontSize: '1.1rem' }}>🏆</span>
                </div>
                {LEADERBOARD_DATA.slice(0, 3).map((entry, i, arr) => (
                    <div key={entry.rank} style={{
                        display: 'flex', alignItems: 'center', gap: '0.55rem',
                        padding: '0.45rem 0',
                        borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSub}` : 'none',
                    }}>
                        <span style={{ fontSize: '1rem' }}>{entry.badge}</span>
                        <span style={{ flex: 1, fontWeight: '600', fontSize: '0.82rem', color: '#334155' }}>{entry.name}</span>
                        <span style={{ fontWeight: '800', fontSize: '0.78rem', color: '#0056D2' }}>{entry.xp} XP</span>
                    </div>
                ))}
                <button
                    onClick={() => setActiveNav('leaderboard')}
                    style={{
                        marginTop: '0.75rem', width: '100%', padding: '0.5rem',
                        borderRadius: '8px', backgroundColor: 'transparent',
                        border: `2px solid ${T.border}`, color: '#0056D2',
                        fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer',
                        fontFamily: 'inherit', letterSpacing: '0.5px',
                    }}
                >
                    {isFr ? 'VOIR TOUT' : 'VIEW ALL'}
                </button>
            </div>

            {/* Upgrade card */}
            <div style={{
                padding: '1.2rem', borderRadius: '16px',
                background: 'linear-gradient(135deg, #0056D2 0%, #38bdf8 100%)',
                color: '#fff', textAlign: 'center',
            }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>✨</div>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Medumba Plus</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.9, marginBottom: '1rem', lineHeight: 1.5 }}>
                    {isFr ? 'Cœurs illimités. Sans publicités. Hors ligne.' : 'Unlimited hearts. No ads. Offline mode.'}
                </div>
                <button
                    onClick={() => setActiveNav('premium')}
                    style={{
                        backgroundColor: T.surface, color: '#0056D2',
                        width: '100%', padding: '0.6rem', borderRadius: '10px',
                        fontWeight: '800', fontSize: '0.82rem', border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.5px',
                    }}
                >
                    {isFr ? 'METTRE À NIVEAU' : 'UPGRADE'}
                </button>
            </div>
        </aside>
    );

    /* ════════════════════════════════════════════════════════════════
       LESSON FLOW — full-screen take-over
    ════════════════════════════════════════════════════════════════ */
    if (lessonFlow === 'loading') {
        return (
            <LessonLoadingPage
                isFr={isFr}
                lessonTitle={isFr ? (activeLesson?.titleFr ?? '') : (activeLesson?.titleEn ?? '')}
                userName={userName}
                onReady={() => setLessonFlow('lesson')}
                onClose={() => { setLessonFlow(null); setActiveLesson(null); }}
            />
        );
    }

    if (lessonFlow === 'lesson') {
        return (
            <LessonPage
                lesson={activeLesson}
                learnLang={learnLang}
                isFr={isFr}
                profile={profile}
                onFinish={(result) => {
                    if (activeLesson?.id) {
                        setCompletedLessons(prev => new Set([...prev, activeLesson.id]));
                    }
                    setXp(prev => prev + (result.xp || 0));
                    setGems(prev => prev + (result.diamonds || 0));
                    setLessonResult(result);
                    setLessonFlow('lesson_complete');
                }}
                onShare={() => setLessonFlow('share')}
                onClose={() => { setLessonFlow(null); setActiveLesson(null); }}
            />
        );
    }

    /* ── Lesson complete screen ── */
    if (lessonFlow === 'lesson_complete') {
        const res = lessonResult ?? { xp: 0, diamonds: 0, time: 0, accuracy: 0 };
        const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
        return (
            <div style={{
                width: '100%', height: '100vh', backgroundColor: T.bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center',
                fontFamily: "'Outfit', system-ui, sans-serif", gap: '1.25rem',
                position: 'relative', overflow: 'hidden',
            }}>
                <style>{`
                    @keyframes lc-pop  { 0%{transform:scale(0.7);opacity:0;} 65%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
                    @keyframes lc-fade { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
                    @keyframes xp-float { 0%{opacity:0;transform:translateY(0) scale(0.6);} 25%{opacity:1;transform:translateY(-12px) scale(1.1);} 70%{opacity:1;transform:translateY(-30px) scale(1);} 100%{opacity:0;transform:translateY(-52px) scale(0.9);} }
                `}</style>

                {/* Floating XP badge */}
                {res.xp > 0 && (
                    <div style={{
                        position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
                        pointerEvents: 'none', zIndex: 10,
                        animation: 'xp-float 1.8s ease-out 0.3s both',
                        backgroundColor: '#fef3c7', border: '2.5px solid #f59e0b',
                        borderRadius: '99px', padding: '0.45rem 1.1rem',
                        fontSize: '1.1rem', fontWeight: '900', color: '#d97706',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                    }}>
                        ⚡ +{res.xp} XP
                    </div>
                )}

                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0056D2', margin: 0, animation: 'lc-fade 0.5s ease-out both' }}>
                    {isFr ? 'Leçon terminée !' : 'Lesson completed!'}
                </h1>
                <img src={celebrationImg} alt="Celebration" style={{ width: '240px', maxWidth: '80%', height: 'auto', animation: 'lc-pop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both' }} />
                <div style={{ width: '100%', maxWidth: '320px', backgroundColor: '#0056D2', borderRadius: '16px', padding: '1rem', color: '#fff', animation: 'lc-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s both' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', opacity: 0.8, marginBottom: '0.4rem' }}>
                        {isFr ? 'Diamants' : 'Diamonds'}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>💎 {res.diamonds}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
                    {[
                        { label: 'Total XP',                      value: res.xp,               bg: '#f59e0b', icon: '⚡', delay: '0.3s' },
                        { label: isFr ? 'Temps' : 'Time',         value: formatTime(res.time),  bg: '#22c55e', icon: '⏱', delay: '0.4s' },
                        { label: isFr ? 'Précision' : 'Accuracy', value: `${res.accuracy}%`,    bg: '#ef4444', icon: '🎯', delay: '0.5s' },
                    ].map(s => (
                        <div key={s.label} style={{ flex: 1, backgroundColor: s.bg, borderRadius: '14px', padding: '0.75rem 0.5rem', color: '#fff', textAlign: 'center', animation: `lc-pop 0.45s cubic-bezier(0.175,0.885,0.32,1.275) ${s.delay} both` }}>
                            <div style={{ fontSize: '1.2rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '1rem', fontWeight: '900' }}>{s.value}</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: '700', opacity: 0.85 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setLessonFlow('daily_mission')}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,86,210,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,86,210,0.35)'; }}
                    style={{
                        width: '100%', maxWidth: '320px', backgroundColor: '#0056D2', color: '#fff',
                        padding: '1.1rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: '700',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        boxShadow: '0 8px 20px rgba(0,86,210,0.35)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        animation: 'lc-fade 0.5s ease-out 0.55s both',
                    }}>
                    {isFr ? 'Continuer →' : 'Continue →'}
                </button>
            </div>
        );
    }

    /* ── Daily mission screen ── */
    if (lessonFlow === 'daily_mission') {
        const res = lessonResult ?? { xp: 0, diamonds: 0, accuracy: 0 };
        const missions = [
            { icon: '💎', labelEn: 'Get 25 Diamonds',        labelFr: 'Obtenir 25 Diamants',      current: Math.min(res.diamonds, 25),        total: 25,  color: '#0056D2' },
            { icon: '⚡', labelEn: 'Get 40 XP',              labelFr: 'Obtenir 40 XP',             current: Math.min(xp, 40), total: 40,  color: '#f59e0b' },
            { icon: '🎯', labelEn: 'Get 2 perfect lessons',  labelFr: '2 leçons parfaites',        current: res.accuracy === 100 ? 1 : 0,       total: 2,   color: '#ef4444' },
            { icon: '🔥', labelEn: 'Complete 1 challenge',   labelFr: 'Terminer 1 défi',           current: 1,                                  total: 1,   color: '#f97316' },
        ];
        return (
            <div style={{
                width: '100%', height: '100vh', backgroundColor: T.bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '2.5rem 1.5rem', fontFamily: "'Outfit', system-ui, sans-serif", overflowY: 'auto',
            }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0056D2', margin: '0 0 1.5rem' }}>
                    {isFr ? 'Missions quotidiennes !' : 'Daily mission updates!'}
                </h1>
                <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                    {missions.map(m => (
                        <div key={m.labelEn} style={{
                            backgroundColor: T.surface, borderRadius: '16px', padding: '1rem 1.25rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            display: 'flex', alignItems: 'center', gap: '1rem',
                        }}>
                            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{m.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: T.text, marginBottom: '0.4rem' }}>
                                    {isFr ? m.labelFr : m.labelEn}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ flex: 1, height: '8px', backgroundColor: T.border, borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${Math.min((m.current / m.total) * 100, 100)}%`, backgroundColor: m.color, borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: T.textMuted, whiteSpace: 'nowrap' }}>
                                        {m.current} / {m.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setLessonFlow('congrats')} style={{
                    width: '100%', maxWidth: '360px', backgroundColor: '#0056D2', color: '#fff',
                    padding: '1.1rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: '700',
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: '1.5rem',
                    boxShadow: '0 8px 20px rgba(0,86,210,0.35)',
                }}>
                    {isFr ? 'Continuer →' : 'Continue →'}
                </button>
            </div>
        );
    }

    /* ── Congrats / streak screen ── */
    if (lessonFlow === 'congrats') {
        const today    = new Date().getDay(); // 0=Sun
        const days     = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        // map JS day (0=Sun) → Monday-first index
        const todayIdx = today === 0 ? 6 : today - 1;
        const checked  = days.map((_, i) => i <= todayIdx && (todayIdx - i) < streak);
        return (
            <div style={{
                width: '100%', height: '100vh', backgroundColor: T.surface,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center',
                fontFamily: "'Outfit', system-ui, sans-serif", gap: '1.25rem',
            }}>
                <style>{`
                    @keyframes flame-bounce { 0%,100%{transform:scale(1) rotate(-3deg);} 30%{transform:scale(1.2) rotate(3deg);} 60%{transform:scale(1.1) rotate(-2deg);} }
                    @keyframes flame-glow   { 0%,100%{filter:drop-shadow(0 0 0px #f97316);} 50%{filter:drop-shadow(0 0 18px #f97316);} }
                    @keyframes streak-pop   { 0%{transform:scale(0.6);opacity:0;} 65%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
                `}</style>
                <span style={{ fontSize: '5rem', lineHeight: 1, animation: 'flame-bounce 0.8s ease-in-out infinite, flame-glow 1.2s ease-in-out infinite' }}>🔥</span>
                <h1 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#0056D2', margin: 0, animation: 'streak-pop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) 0.15s both' }}>
                    {isFr ? `${streak} jours de suite !` : `${streak} days straight!`}
                </h1>
                {/* Week calendar */}
                <div style={{ width: '100%', maxWidth: '320px', backgroundColor: T.bg, borderRadius: '18px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0.75rem' }}>
                        {days.map(d => <span key={d} style={{ fontSize: '0.75rem', fontWeight: '700', color: T.textMuted }}>{d}</span>)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {checked.map((done, i) => (
                            <div key={i} style={{
                                width: '32px', height: '32px', borderRadius: '6px',
                                border: `2px solid ${done ? '#0056D2' : '#cbd5e1'}`,
                                backgroundColor: done ? '#0056D2' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {done && <span style={{ color: '#fff', fontSize: '1rem', fontWeight: '900' }}>✓</span>}
                            </div>
                        ))}
                    </div>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: `1px solid ${T.border}` }} />
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', fontWeight: '600', lineHeight: 1.6 }}>
                        {isFr
                            ? 'Augmente si vous pratiquez chaque jour et revient à zéro si vous ratez une journée !'
                            : 'Increases if you practice every day and will return to zero if you skip a day!'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
                    <button onClick={() => setLessonFlow('share')} style={{
                        flex: 1, padding: '1rem', borderRadius: '9999px',
                        backgroundColor: T.blueTint, color: '#0056D2',
                        border: '2px solid #bfdbfe', fontWeight: '700', fontSize: '0.95rem',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                        {isFr ? 'Partager' : 'Share'}
                    </button>
                    <button onClick={() => { setLessonFlow(null); setActiveLesson(null); setActiveNav('home'); }} style={{
                        flex: 2, padding: '1rem', borderRadius: '9999px',
                        backgroundColor: '#0056D2', color: '#fff', border: 'none',
                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                        fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(0,86,210,0.35)',
                    }}>
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            </div>
        );
    }

    /* ── Share screen ── */
    if (lessonFlow === 'share') {
        const shareText = `🔥 ${streak} ${isFr ? 'jours de suite sur Medumba.ia !' : 'days straight on Medumba.ia!'}`;
        const doShare = async () => {
            if (navigator.share) {
                try { await navigator.share({ title: 'Medumba.ia', text: shareText }); } catch (_) {}
            } else {
                try { await navigator.clipboard.writeText(shareText); } catch (_) {}
            }
        };
        const socials = [
            { icon: '📘', label: 'Facebook'  },
            { icon: '💬', label: 'WhatsApp'  },
            { icon: '📷', label: 'Instagram' },
            { icon: '🐦', label: 'Twitter'   },
            { icon: '💚', label: 'Line'       },
            { icon: '💼', label: 'LinkedIn'  },
        ];
        return (
            <div style={{
                width: '100%', height: '100vh', backgroundColor: T.surface,
                display: 'flex', flexDirection: 'column',
                fontFamily: "'Outfit', system-ui, sans-serif", overflowY: 'auto',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 1.5rem', borderBottom: `1px solid ${T.border}` }}>
                    <button onClick={() => setLessonFlow('congrats')} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#475569' }}>✕</button>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: T.text }}>
                        {isFr ? 'Partager' : 'Share'}
                    </span>
                </div>

                <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                    {/* Share card */}
                    <div style={{
                        width: '100%', maxWidth: '360px', backgroundColor: T.bg,
                        borderRadius: '18px', padding: '1.75rem', textAlign: 'center',
                        border: `1px solid ${T.border}`,
                    }}>
                        <span style={{ fontSize: '3rem' }}>🔥</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: T.text, margin: '0.5rem 0 0.25rem' }}>
                            {isFr ? `${streak} jours de suite !` : `${streak} days straight!`}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0056D2' }}>Medumba.ia</div>
                    </div>

                    {/* Social list */}
                    <div style={{ width: '100%', maxWidth: '360px', backgroundColor: T.surface, borderRadius: '18px', border: `1px solid ${T.border}`, overflow: 'hidden' }}>
                        {socials.map((s, i) => (
                            <button key={s.label} onClick={doShare} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem 1.25rem',
                                borderBottom: i < socials.length - 1 ? `1px solid ${T.borderSub}` : 'none',
                                background: 'none', border: 'none',
                                cursor: 'pointer', fontFamily: 'inherit',
                                fontSize: '1rem', fontWeight: '600', color: T.text,
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => { setLessonFlow(null); setActiveLesson(null); setActiveNav('home'); }} style={{
                        width: '100%', maxWidth: '360px', padding: '1.1rem', borderRadius: '9999px',
                        backgroundColor: '#0056D2', color: '#fff', border: 'none',
                        fontWeight: '700', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
                        boxShadow: '0 8px 20px rgba(0,86,210,0.35)',
                    }}>
                        {isFr ? 'Terminé' : 'Done'}
                    </button>
                </div>
            </div>
        );
    }

    /* ── VIDEOS ── */
    const VIDEO_LIBRARY = [
        {
            id: 'v1', youtubeId: 'PLACEHOLDER_1',
            titleEn: 'Introduction to Medumba', titleFr: 'Introduction au Medumba',
            descEn: 'Discover the basics of the Medumba language',
            descFr: 'Découvrez les bases de la langue Medumba',
            duration: '5:32', category: 'beginner',
        },
        {
            id: 'v2', youtubeId: 'PLACEHOLDER_2',
            titleEn: 'Greetings & Expressions', titleFr: 'Salutations & Expressions',
            descEn: 'Essential greetings used every day',
            descFr: 'Les salutations essentielles du quotidien',
            duration: '8:14', category: 'beginner',
        },
        {
            id: 'v3', youtubeId: 'PLACEHOLDER_3',
            titleEn: 'Medumba Tones & Pronunciation', titleFr: 'Tons & Prononciation Medumba',
            descEn: 'Master the tonal system of Medumba',
            descFr: 'Maîtrisez le système tonal du Medumba',
            duration: '12:07', category: 'intermediate',
        },
        {
            id: 'v4', youtubeId: 'PLACEHOLDER_4',
            titleEn: 'Numbers 1–20', titleFr: 'Les Chiffres 1–20',
            descEn: 'Count from 1 to 20 in Medumba',
            descFr: 'Comptez de 1 à 20 en Medumba',
            duration: '6:45', category: 'beginner',
        },
        {
            id: 'v5', youtubeId: 'PLACEHOLDER_5',
            titleEn: 'Family Vocabulary', titleFr: 'Vocabulaire de la Famille',
            descEn: 'Family members and relationships',
            descFr: 'Les membres de la famille et les relations',
            duration: '9:20', category: 'beginner',
        },
        {
            id: 'v6', youtubeId: 'PLACEHOLDER_6',
            titleEn: 'Medumba Grammar Essentials', titleFr: 'Grammaire Essentielle',
            descEn: 'Core grammar rules explained simply',
            descFr: 'Les règles de grammaire essentielles expliquées simplement',
            duration: '15:30', category: 'intermediate',
        },
    ];

    const CATEGORY_COLORS = {
        beginner:     { bg: '#dcfce7', text: '#15803d', label: { en: 'Beginner', fr: 'Débutant' } },
        intermediate: { bg: '#dbeafe', text: '#1d4ed8', label: { en: 'Intermediate', fr: 'Intermédiaire' } },
        advanced:     { bg: '#fef3c7', text: '#b45309', label: { en: 'Advanced', fr: 'Avancé' } },
    };

    const renderVideos = () => {
        const filtered = filterCat === 'all' ? VIDEO_LIBRARY : VIDEO_LIBRARY.filter(v => v.category === filterCat);
        const isPlaceholder = (id) => id.startsWith('PLACEHOLDER');

        return (
            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '2rem' }}>
                <style>{`
                    @keyframes vid-fade-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                    .vid-card { animation: vid-fade-in 0.3s ease both; transition: transform 0.18s, box-shadow 0.18s; }
                    .vid-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,86,210,0.15) !important; }
                    .play-btn { transition: transform 0.15s, background 0.15s; }
                    .play-btn:hover { transform: scale(1.08); }
                `}</style>

                {/* Header */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: T.text, marginBottom: '0.25rem' }}>
                    {isFr ? '🎬 Vidéos' : '🎬 Videos'}
                </h2>
                <p style={{ fontSize: '0.88rem', color: T.textMuted, marginBottom: '1.5rem' }}>
                    {isFr ? 'Apprenez le Medumba avec nos tutoriels vidéo' : 'Learn Medumba with our video tutorials'}
                </p>

                {/* Category filter */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {[
                        { id: 'all',          en: 'All',          fr: 'Tout'          },
                        { id: 'beginner',     en: 'Beginner',     fr: 'Débutant'      },
                        { id: 'intermediate', en: 'Intermediate', fr: 'Intermédiaire' },
                        { id: 'advanced',     en: 'Advanced',     fr: 'Avancé'        },
                    ].map((cat) => (
                        <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{
                            padding: '0.45rem 1.1rem', borderRadius: '99px',
                            border: `2px solid ${filterCat === cat.id ? '#0056D2' : T.border}`,
                            backgroundColor: filterCat === cat.id ? '#0056D2' : T.surface,
                            color: filterCat === cat.id ? '#fff' : T.textMuted,
                            fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 0.15s',
                        }}>
                            {isFr ? cat.fr : cat.en}
                        </button>
                    ))}
                </div>

                {/* Video grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {filtered.map((vid, idx) => {
                        const cat = CATEGORY_COLORS[vid.category];
                        const isActive = activeVideo === vid.id;
                        const placeholder = isPlaceholder(vid.youtubeId);
                        return (
                            <div key={vid.id} className="vid-card" style={{
                                animationDelay: `${idx * 0.06}s`,
                                backgroundColor: T.surface,
                                borderRadius: '16px',
                                border: `2px solid ${isActive ? '#0056D2' : T.border}`,
                                overflow: 'hidden',
                                boxShadow: T.cardShadow,
                            }}>
                                {/* Video / Thumbnail area */}
                                {isActive && !placeholder ? (
                                    <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={isFr ? vid.titleFr : vid.titleEn}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => !placeholder && setActiveVideo(vid.id)}
                                        style={{
                                            position: 'relative', paddingTop: '56.25%',
                                            backgroundColor: placeholder ? T.surface3 : '#0f172a',
                                            cursor: placeholder ? 'default' : 'pointer',
                                        }}
                                    >
                                        {!placeholder && (
                                            <img
                                                src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                                                alt=""
                                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                                            />
                                        )}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {placeholder ? (
                                                <div style={{ textAlign: 'center', color: T.textMuted }}>
                                                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎬</div>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                                        {isFr ? 'Bientôt disponible' : 'Coming soon'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="play-btn" style={{
                                                    width: '52px', height: '52px', borderRadius: '50%',
                                                    backgroundColor: 'rgba(0,86,210,0.92)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                                }}>
                                                    <span style={{ color: '#fff', fontSize: '1.3rem', marginLeft: '3px' }}>▶</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Duration badge */}
                                        {!placeholder && (
                                            <div style={{
                                                position: 'absolute', bottom: '8px', right: '8px',
                                                backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff',
                                                fontSize: '0.72rem', fontWeight: '700', padding: '2px 6px', borderRadius: '4px',
                                            }}>
                                                {vid.duration}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Card body */}
                                <div style={{ padding: '0.9rem 1rem 1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '99px', backgroundColor: cat.bg, color: cat.text }}>
                                            {isFr ? cat.label.fr : cat.label.en}
                                        </span>
                                        {isActive && (
                                            <button onClick={() => setActiveVideo(null)} style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                color: T.textMuted, fontSize: '0.8rem', padding: '0',
                                            }}>✕</button>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: T.text, margin: '0 0 0.3rem', lineHeight: 1.3 }}>
                                        {isFr ? vid.titleFr : vid.titleEn}
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>
                                        {isFr ? vid.descFr : vid.descEn}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Upload CTA */}
                <div style={{
                    marginTop: '2rem', padding: '1.5rem',
                    backgroundColor: T.blueTint, border: `2px solid ${T.blueBorder}`,
                    borderRadius: '16px', textAlign: 'center',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                    <div style={{ fontWeight: '800', color: '#0056D2', fontSize: '1rem', marginBottom: '0.3rem' }}>
                        {isFr ? 'Ajouter des vidéos' : 'Add Videos'}
                    </div>
                    <p style={{ fontSize: '0.83rem', color: T.textMuted, margin: '0 0 1rem', lineHeight: 1.5 }}>
                        {isFr
                            ? 'Uploadez vos vidéos sur YouTube puis ajoutez l\'ID ici pour les diffuser dans l\'app.'
                            : 'Upload your videos to YouTube then add the ID here to stream them in the app.'}
                    </p>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        backgroundColor: '#0056D2', color: '#fff',
                        padding: '0.6rem 1.4rem', borderRadius: '99px',
                        fontSize: '0.83rem', fontWeight: '700',
                    }}>
                        {isFr ? '→ youtube.com/upload' : '→ youtube.com/upload'}
                    </div>
                </div>
            </div>
        );
    };

    /* ════════════════════════════════════════════════════════════════
       RENDER
    ════════════════════════════════════════════════════════════════ */
    return (
        <>
        <div style={{
            display: 'flex', width: '100%', height: '100vh',
            backgroundColor: T.bg,
            fontFamily: "'Outfit', system-ui, sans-serif",
            overflow: 'hidden',
        }}>

            {/* ══════════════ LEFT SIDEBAR — desktop only ══════════════ */}
            {!isMobile && <aside style={{
                width: '220px', minWidth: '220px',
                borderRight: `2px solid ${T.border}`,
                display: 'flex', flexDirection: 'column',
                height: '100%', backgroundColor: T.surface,
                padding: '1.5rem 0.75rem',
            }}>
                {/* Brand */}
                <div
                    onClick={() => { setActiveNav('home'); setPurchaseFlow(null); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.65rem',
                        padding: '0 0.5rem', marginBottom: '1.25rem',
                        cursor: 'pointer', userSelect: 'none',
                    }}
                >
                    <img src={logo} alt="Medumba" style={{ width: '34px', height: 'auto' }} />
                    <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0056D2' }}>Medumba</span>
                </div>

                {/* Interface language switcher */}
                <div style={{ padding: '0 0.5rem', marginBottom: '0.65rem' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: '700', color: T.textSub, letterSpacing: '0.6px', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                        {isFr ? 'Langue de l\'app' : 'App language'}
                    </div>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        style={selectStyle(T)}
                    >
                        <option value="en">🇺🇸 English</option>
                        <option value="fr">🇫🇷 Français</option>
                    </select>
                </div>

                {/* Dark mode quick toggle */}
                <div style={{ padding: '0 0.5rem', marginBottom: '0.65rem' }}>
                    <button onClick={toggleDark} style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.55rem 0.75rem', borderRadius: '12px',
                        border: `2px solid ${T.border}`, backgroundColor: T.bg,
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: T.text }}>
                            {isDark ? '☀️ Light' : '🌙 Dark'}
                        </span>
                        <div style={{
                            width: '36px', height: '20px', borderRadius: '99px',
                            backgroundColor: isDark ? '#0056D2' : T.border,
                            position: 'relative', transition: 'background-color 0.25s',
                            flexShrink: 0,
                        }}>
                            <div style={{
                                position: 'absolute', top: '2px',
                                left: isDark ? '17px' : '2px',
                                width: '16px', height: '16px', borderRadius: '50%',
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                        </div>
                    </button>
                </div>

                {/* Learning language switcher */}
                <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: '700', color: T.textSub, letterSpacing: '0.6px', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                        {isFr ? 'J\'apprends' : 'I\'m learning'}
                    </div>
                    <select
                        value={learnLang}
                        onChange={(e) => setLearnLang(e.target.value)}
                        style={{ ...selectStyle(T), border: '2px solid #bfdbfe', backgroundColor: T.blueTint, color: '#0056D2' }}
                    >
                        <option value="medumba">🇨🇲 Medumba</option>
                        <option value="english">🇬🇧 English</option>
                    </select>
                </div>

                {/* Nav items */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                    {navItems.map((item) => {
                        const on = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveNav(item.id); if (item.id !== 'premium') setPurchaseFlow(null); if (item.id !== 'videos') { setActiveVideo(null); setFilterCat('all'); } }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    padding: '0.78rem 1rem', borderRadius: '12px',
                                    backgroundColor: on ? '#eff6ff' : 'transparent',
                                    color: on ? '#0056D2' : '#6b7280',
                                    border: on ? '2px solid #bfdbfe' : '2px solid transparent',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                    textAlign: 'left', width: '100%', fontFamily: 'inherit',
                                }}
                                onMouseEnter={(e) => { if (!on) e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                                onMouseLeave={(e) => { if (!on) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <span style={{ fontSize: '1.15rem' }}>{item.icon}</span>
                                <span style={{ fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.7px' }}>
                                    {isFr ? item.labelFr : item.labelEn}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Streak badge */}
                <div style={{
                    borderRadius: '14px', border: '2px solid #fde68a',
                    backgroundColor: '#fffbeb', padding: '0.9rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto',
                }}>
                    <span style={{ fontSize: '1.9rem' }}>🔥</span>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#d97706', lineHeight: 1 }}>
                            {streak}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: '600', marginTop: '2px' }}>
                            {isFr ? 'jours de suite' : 'day streak'}
                        </div>
                    </div>
                </div>
            </aside>}

            {/* ══════════════ MAIN ══════════════ */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

                {/* Top Stats Bar */}
                <header style={{
                    backgroundColor: T.surface, borderBottom: `2px solid ${T.border}`,
                    padding: isMobile ? '0.65rem 1rem' : '0.8rem 2rem',
                    display: 'flex', alignItems: 'center',
                    justifyContent: isMobile ? 'space-between' : 'flex-end',
                    gap: '1rem', flexShrink: 0, zIndex: 10,
                }}>
                    {/* Logo — mobile only */}
                    {isMobile && (
                        <div onClick={() => { setActiveNav('home'); setPurchaseFlow(null); }}
                             style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                            <img src={logo} alt="" style={{ width: '24px', height: 'auto' }} />
                            <span style={{ fontWeight: '800', color: '#0056D2', fontSize: '1rem' }}>Medumba</span>
                        </div>
                    )}
                    {/* Stats */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1.75rem' }}>
                        {/* XP + Level — desktop only */}
                        {!isMobile && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <span style={{ fontSize: '1rem' }}>⚡</span>
                                    <span style={{ fontWeight: '800', color: '#0056D2', fontSize: '0.9rem' }}>
                                        {xp} XP
                                    </span>
                                    <span style={{
                                        fontSize: '0.65rem', fontWeight: '800', color: '#fff',
                                        backgroundColor: '#f59e0b', borderRadius: '6px',
                                        padding: '1px 5px', letterSpacing: '0.3px',
                                    }}>
                                        Lv.{Math.floor(xp / XP_TO_NEXT) + 1}
                                    </span>
                                </div>
                                <div style={{ width: '72px', height: '5px', backgroundColor: '#dbeafe', borderRadius: '99px', overflow: 'hidden' }}>
                                    <div style={{ width: `${xpProgress}%`, height: '100%', backgroundColor: '#0056D2', borderRadius: '99px', transition: 'width 0.4s ease' }} />
                                </div>
                            </div>
                        )}
                        {/* Gems */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>💎</span>
                            <span style={{ fontWeight: '800', color: '#0284c7', fontSize: '0.88rem' }}>{gems}</span>
                        </div>
                        {/* Hearts */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{
                                    fontSize: isMobile ? '0.75rem' : '0.95rem',
                                    filter: i < hearts ? 'none' : 'grayscale(1)',
                                    opacity: i < hearts ? 1 : 0.3,
                                }}>❤️</span>
                            ))}
                        </div>
                        {/* Streak — mobile only */}
                        {isMobile && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <span style={{ fontSize: '1rem' }}>🔥</span>
                                <span style={{ fontWeight: '800', color: '#d97706', fontSize: '0.88rem' }}>{streak}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Tab content */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {activeNav === 'home'        && renderHome()}
                        {activeNav === 'leaderboard' && renderLeaderboard()}
                        {activeNav === 'challenge'   && renderChallenge()}
                        {activeNav === 'videos'      && renderVideos()}
                        {activeNav === 'premium'     && renderPremium()}
                        {activeNav === 'account'     && renderAccount()}
                    </div>

                    {/* Right panel — home tab, desktop only */}
                    {!isMobile && activeNav === 'home' && renderRightPanel()}
                </div>

                {/* ══════════════ BOTTOM NAV — mobile only ══════════════ */}
                {isMobile && (
                    <nav style={{
                        display: 'flex', flexShrink: 0,
                        borderTop: `2px solid ${T.border}`,
                        backgroundColor: T.surface,
                        height: '62px',
                    }}>
                        {navItems.map((item) => {
                            const on = activeNav === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveNav(item.id); if (item.id !== 'premium') setPurchaseFlow(null); if (item.id !== 'videos') { setActiveVideo(null); setFilterCat('all'); } }}
                                    style={{
                                        flex: 1, display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center', gap: '2px',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        borderTop: `3px solid ${on ? '#0056D2' : 'transparent'}`,
                                        color: on ? '#0056D2' : T.textSub,
                                        fontFamily: 'inherit', padding: '0',
                                    }}
                                >
                                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                                    <span style={{ fontSize: '0.56rem', fontWeight: '700', letterSpacing: '0.3px' }}>
                                        {isFr ? item.labelFr : item.labelEn}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                )}
            </div>
        </div>
        {renderChestModal()}
        </>
    );
};

/* ── shared style helpers (T passed as argument because they live outside the component) ── */
const selectStyle = (T) => ({
    width: '100%', padding: '0.55rem 0.75rem',
    borderRadius: '12px', border: `2px solid ${T.border}`,
    backgroundColor: T.bg, color: T.text,
    fontSize: '0.85rem', fontWeight: '700',
    cursor: 'pointer', fontFamily: 'inherit',
    outline: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%230056D2' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    paddingRight: '2rem',
});

const inputStyle = (T) => ({
    padding: '0.9rem 1rem', borderRadius: '14px',
    border: `2px solid ${T.border}`, fontSize: '0.95rem',
    width: '100%', outline: 'none', backgroundColor: T.surface,
    color: T.text, fontFamily: 'inherit', boxSizing: 'border-box',
});

const ctaStyle = (enabled) => ({
    width: '100%', backgroundColor: enabled ? '#0056D2' : '#cbd5e1',
    color: '#fff', padding: '1.1rem', borderRadius: '9999px',
    fontSize: '1rem', fontWeight: '700', border: 'none',
    cursor: enabled ? 'pointer' : 'not-allowed',
    boxShadow: enabled ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
    letterSpacing: '0.4px', fontFamily: 'inherit',
});

export default DashboardPage;
