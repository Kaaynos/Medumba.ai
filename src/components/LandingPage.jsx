import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import tontah from '../assets/tontah.webp';
import tontahExpressions from '../assets/tontah-expressions.webp';
import tontahPoses from '../assets/tontah-poses.webp';
import tontahAccessories from '../assets/tontah-accessories.webp';
import { getActiveLearnerCount } from '../services/statsService';
import { submitContactMessage, getLandingComments, listenLandingComments } from '../services/contactService';
import { submitTestimonial, getApprovedTestimonials } from '../services/testimonialService';

/* ── Palette Medumba ── */
const B    = '#0056D2';
const B2   = '#0041a3';
const AMB  = '#f59e0b';
const AMB2 = '#fbbf24';
const CREAM = '#f8fafc';
const LIGHT = '#eff6ff';
const SAND  = '#e2e8f0';
const MUTED = '#64748b';
const INK   = '#0f172a';

/* ── Icônes SVG ── */
const Ico = ({ d, size = 20, children, extra = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...extra}>
        {d ? <path d={d} /> : children}
    </svg>
);
const IconBook   = () => <Ico><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Ico>;
const IconMic    = () => <Ico><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></Ico>;
const IconGame   = () => <Ico><rect x="2" y="6" width="20" height="12" rx="3"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="11.5" r=".6" fill="currentColor" stroke="none"/><circle cx="18.5" cy="13.5" r=".6" fill="currentColor" stroke="none"/></Ico>;
const IconMoon   = () => <Ico d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>;
const IconTrophy = () => <Ico><polyline points="8 2 2 2 2 7"/><polyline points="16 2 22 2 22 7"/><path d="M12 17v4"/><line x1="8" y1="21" x2="16" y2="21"/><path d="M2 7c0 5.52 4.48 10 10 10S22 12.52 22 7"/></Ico>;
const IconVideo  = () => <Ico><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></Ico>;
const IconDict   = () => <Ico><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Ico>;
const IconCalc   = () => <Ico><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Ico>;
const IconCal    = () => <Ico><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Ico>;
const IconAlpha  = () => <Ico><polyline points="4 20 8 4 12 16 16 8 20 20"/></Ico>;
const IconAndroid = () => (
    <svg width="26" height="26" viewBox="0 0 512 512" fill="currentColor">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l236.6-236.1L47 0zm414.2 180.5l-48.6-28-67.9 67.9 67.9 67.9 49.4-28.7c14-7.8 23.8-22.2 23.8-38.6.1-16.4-9.4-31.2-24.6-40.5zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
    </svg>
);
const IconApple = () => (
    <svg width="26" height="26" viewBox="0 0 814 1000" fill="currentColor">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.3-143-39.3c-58.5 0-81.3 41.3-144.5 41.3-63.2 0-109.5-54.8-163.5-125.2-25.5-32.3-51.3-93.7-51.3-152.6 0-138.7 90.8-212.2 180.1-212.2 46.8 0 86.2 31.1 115.7 31.1s75-32.6 126.4-32.6c20.3 0 113.7 1.9 172.1 74.7zm-234.8-80.2c17.7-24.7 30-58.3 30-91.9 0-4.5-.3-9-1-13.5-28.7 1-63.9 19.7-84 44.7-17 21.3-32.3 55.3-32.3 89.5 0 4.8.7 9.6 1 11.3 1.9.3 5.1.6 8.3.6 25.7 0 58.5-17.3 77.9-40.7z"/>
    </svg>
);
const IconWhatsApp = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.004 3C9.375 3 4 8.373 4 15c0 2.234.615 4.325 1.687 6.117L4 29l8.062-1.652A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.8a9.76 9.76 0 0 1-4.98-1.363l-.357-.212-4.783.982.99-4.657-.233-.372A9.76 9.76 0 0 1 6.2 15c0-5.404 4.4-9.8 9.804-9.8 5.403 0 9.796 4.396 9.796 9.8 0 5.404-4.393 9.8-9.796 9.8zm5.37-7.335c-.294-.147-1.738-.858-2.007-.956-.269-.098-.465-.147-.66.147-.196.294-.758.955-.93 1.152-.171.196-.343.22-.636.073-.294-.147-1.24-.457-2.362-1.457-.873-.779-1.463-1.741-1.635-2.035-.171-.294-.018-.453.129-.6.132-.132.294-.343.44-.514.147-.171.196-.294.294-.49.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.904-2.178-.238-.572-.48-.494-.66-.503l-.562-.01c-.196 0-.514.073-.783.367-.269.294-1.026 1.002-1.026 2.443 0 1.44 1.05 2.833 1.197 3.03.147.196 2.067 3.157 5.008 4.427.7.302 1.246.483 1.672.618.702.223 1.34.192 1.845.117.563-.084 1.738-.71 1.983-1.395.245-.686.245-1.273.171-1.396-.073-.122-.269-.196-.563-.343z"/>
    </svg>
);

/* ── Hooks ── */
function useReveal(threshold = 0.1) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

function Counter({ target, suffix = '', duration = 1800 }) {
    const [val, setVal] = useState(0);
    const [ref, visible] = useReveal(0.3);
    useEffect(() => {
        if (!visible) return;
        let v = 0; const step = target / (duration / 16);
        const t = setInterval(() => { v += step; if (v >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(v)); }, 16);
        return () => clearInterval(t);
    }, [visible, target, duration]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
    const [ref, visible] = useReveal();
    const from = { up:'translateY(28px)', down:'translateY(-28px)', left:'translateX(-28px)', right:'translateX(28px)' };
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : from[direction],
            transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}s, transform .65s cubic-bezier(.16,1,.3,1) ${delay}s`,
            ...style,
        }}>{children}</div>
    );
}

function GeomPattern({ opacity = 0.04, id = 'geo' }) {
    return (
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke={`rgba(0,86,210,${opacity})`} strokeWidth="1"/>
                    <rect x="16" y="16" width="8" height="8" fill={`rgba(0,86,210,${opacity*.5})`} transform="rotate(45 20 20)"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`}/>
        </svg>
    );
}

function AppPreview({ small, isFr }) {
    const W = small ? 200 : 255;
    const tr = (fr, en) => isFr ? fr : en;
    return (
        <div style={{ position:'relative', width:`${W}px`, flexShrink:0 }}>
            <div style={{ position:'absolute', inset:'-40px', borderRadius:'50%', background:`radial-gradient(ellipse,rgba(0,86,210,.15) 0%,transparent 65%)`, pointerEvents:'none', zIndex:0 }} />
            <div style={{
                width:`${W}px`, aspectRatio:'9/19.5', borderRadius:'36px', background:B,
                position:'relative', zIndex:1, overflow:'hidden',
                boxShadow:`0 52px 96px rgba(0,86,210,.38),0 0 0 4px ${B2},0 0 0 8px rgba(0,86,210,.07)`,
                animation:'float-a 6s ease-in-out infinite',
            }}>
                <div style={{ position:'absolute', top:'13px', left:'50%', transform:'translateX(-50%)', width:'54px', height:'5px', borderRadius:'99px', background:'rgba(0,0,0,.4)', zIndex:10 }} />
                <div style={{ padding:'22px 18px 6px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ color:'rgba(255,255,255,.35)', fontSize:'.52rem', fontWeight:600 }}>9:41</span>
                    <div style={{ display:'flex', gap:'3px', alignItems:'flex-end' }}>
                        {[1,.65,.4].map((o,i) => <div key={i} style={{ width:'3px', height:`${4+i*2}px`, background:`rgba(255,255,255,${o})`, borderRadius:'1px' }} />)}
                    </div>
                </div>
                <div style={{ padding:'2px 18px 10px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                        <img src={logo} alt="" style={{ width:'18px', filter:'brightness(0) invert(1)', opacity:.9 }} />
                        <span style={{ color:'#fff', fontWeight:800, fontSize:'.68rem' }}>Medumba.AI</span>
                    </div>
                    <div style={{ background:'rgba(245,158,11,.18)', borderRadius:'99px', padding:'2px 7px', border:'1px solid rgba(245,158,11,.3)' }}>
                        <span style={{ color:AMB2, fontSize:'.5rem', fontWeight:700 }}>340 XP</span>
                    </div>
                </div>
                <div style={{ margin:'10px 14px 7px', background:'rgba(255,255,255,.06)', borderRadius:'14px', padding:'10px 12px', border:'1px solid rgba(255,255,255,.08)' }}>
                    <div style={{ fontSize:'.46rem', color:'rgba(255,255,255,.3)', fontWeight:700, letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'5px' }}>{tr('Leçon 1 · Salutations','Lesson 1 · Greetings')}</div>
                    <div style={{ fontSize:'1rem', color:'#fff', fontWeight:800, marginBottom:'2px' }}>Ó tsɑ̌ʼ nə?</div>
                    <div style={{ fontSize:'.56rem', color:AMB, fontWeight:500 }}>{tr('Comment vas-tu ?','How are you?')}</div>
                    <div style={{ marginTop:'8px', height:'3px', background:'rgba(255,255,255,.07)', borderRadius:'99px' }}>
                        <div style={{ width:'68%', height:'100%', background:`linear-gradient(90deg,${AMB},${AMB2})`, borderRadius:'99px' }} />
                    </div>
                </div>
                <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', gap:'5px' }}>
                    <div style={{ fontSize:'.55rem', color:'rgba(255,255,255,.4)', fontWeight:600, marginBottom:'2px' }}>{tr('Sélectionne la traduction','Select the translation')}</div>
                    {[tr('Comment vas-tu ?','How are you?'),tr('Bonne nuit.','Good night.'),tr('Au revoir !','Goodbye!')].map((opt,i) => (
                        <div key={i} style={{ background:i===0?'rgba(245,158,11,.14)':'rgba(255,255,255,.04)', border:`1.5px solid ${i===0?'rgba(245,158,11,.5)':'rgba(255,255,255,.06)'}`, borderRadius:'9px', padding:'7px 10px', color:i===0?AMB2:'rgba(255,255,255,.45)', fontSize:'.58rem', fontWeight:i===0?700:400 }}>{opt}</div>
                    ))}
                </div>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'8px 0 14px', borderTop:'1px solid rgba(255,255,255,.05)', display:'flex', justifyContent:'space-around', background:B }}>
                    {[{l:tr('Leçons','Lessons'),a:true},{l:tr('Dico','Dict'),a:false},{l:tr('Classe','Class'),a:false},{l:tr('Profil','Profile'),a:false}].map(({l,a}) => (
                        <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px' }}>
                            <div style={{ width:'16px', height:'2px', borderRadius:'99px', background:a?AMB:'transparent' }} />
                            <span style={{ fontSize:'.46rem', color:a?AMB:'rgba(255,255,255,.22)', fontWeight:a?700:400 }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ══════════════ COMPOSANT PRINCIPAL ══════════════ */
export default function LandingPage({ onStart, onRegister, onLogin, onNavigate, onDownload, setNativeLang }) {
    const nav = onNavigate ?? onStart;
    const [menuOpen,  setMenuOpen]  = useState(false);
    const [scrolled,  setScrolled]  = useState(false);
    const [vw,        setVw]        = useState(() => window.innerWidth);
    const [activeT,   setActiveT]   = useState(0);
    // Anglais en langue principale, français disponible via la bascule.
    const [isFr,      setIsFr]      = useState(false);
    const tr = (fr, en) => isFr ? fr : en;

    // Le choix de langue ici doit survivre à l'inscription (le flux Register
    // ne passe plus par LanguageSelectionPage) — on le répercute vers l'état
    // global à chaque changement, y compris la valeur initiale au montage.
    useEffect(() => { setNativeLang?.(isFr ? 'french' : 'english'); }, [isFr]); // eslint-disable-line react-hooks/exhaustive-deps

    // Nombre réel d'apprenants actifs (30 derniers jours) — remplace le "4" en dur.
    const [activeLearners, setActiveLearners] = useState(null);
    useEffect(() => {
        getActiveLearnerCount().then(n => { if (n !== null) setActiveLearners(n); });
    }, []);
    const learnerCountLabel = activeLearners ?? '…';

    // Vrais témoignages approuvés (plus de faux contenu — cf. réunion du 12/07).
    const [testimonials, setTestimonials] = useState(null); // null = chargement
    useEffect(() => {
        getApprovedTestimonials().then(setTestimonials).catch(() => setTestimonials([]));
    }, []);
    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', message: '' });
    const [testimonialStatus, setTestimonialStatus] = useState('idle'); // idle | sending | sent | error
    const testimonialSet = (field) => (e) => setTestimonialForm(f => ({ ...f, [field]: e.target.value }));
    const submitTestimonialForm = async (e) => {
        e.preventDefault();
        if (!testimonialForm.name.trim() || !testimonialForm.message.trim()) return;
        setTestimonialStatus('sending');
        try {
            await submitTestimonial(testimonialForm);
            setTestimonialStatus('sent');
            setTestimonialForm({ name: '', role: '', message: '' });
        } catch {
            setTestimonialStatus('error');
        }
    };

    // Commentaires publics en direct (section "Une question ? Écrivez-nous").
    const [landingComments, setLandingComments] = useState([]);
    const [activeComment, setActiveComment] = useState(0);
    const [showAllComments, setShowAllComments] = useState(false);
    useEffect(() => {
        getLandingComments().then(setLandingComments).catch(() => { /* best-effort, la page reste utilisable sans */ });
        return listenLandingComments((row) => {
            setLandingComments((prev) => [row, ...prev].slice(0, 20));
        });
    }, []);
    // Défilement auto d'un commentaire à la fois — désactivé dès que la liste complète est ouverte.
    useEffect(() => {
        if (showAllComments || landingComments.length <= 1) return;
        const t = setInterval(() => setActiveComment(p => (p + 1) % landingComments.length), 4000);
        return () => clearInterval(t);
    }, [showAllComments, landingComments.length]);

    // Formulaire de contact compact dans le footer.
    const [footerForm, setFooterForm] = useState({ name: '', email: '', message: '' });
    const [footerStatus, setFooterStatus] = useState('idle'); // idle | sending | sent | error
    const footerSet = (field) => (e) => setFooterForm(f => ({ ...f, [field]: e.target.value }));
    const submitFooterForm = async (e) => {
        e.preventDefault();
        if (!footerForm.name.trim() || !footerForm.email.trim() || !footerForm.message.trim()) return;
        setFooterStatus('sending');
        try {
            await submitContactMessage(footerForm);
            setFooterStatus('sent');
            setFooterForm({ name: '', email: '', message: '' });
        } catch {
            setFooterStatus('error');
        }
    };

    const ENTERPRISE_WHATSAPP = '+237697531413'; // Seul canal WhatsApp officiel — tout contact passe par là ou par e-mail

    // WhatsApp buttons ask for the visitor's name first (the app has no user
    // identity yet at this point — Landing renders before any onboarding),
    // then include it in the pre-filled message.
    const [waModal, setWaModal] = useState(null); // { phone, message } | null
    const [waName,  setWaName]  = useState('');
    const openWhatsApp = (phone, message) => { setWaName(''); setWaModal({ phone, message }); };
    const sendWhatsApp = () => {
        if (!waModal || !waName.trim()) return;
        const greeting = tr(`Bonjour, je m'appelle ${waName.trim()}. `, `Hello, my name is ${waName.trim()}. `);
        const url = `https://wa.me/${waModal.phone.replace('+', '')}?text=${encodeURIComponent(greeting + waModal.message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setWaModal(null);
    };

    const isMobile = vw < 768;
    const isSmall  = vw < 480;

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap';
        document.head.appendChild(link);
        return () => { try { document.head.removeChild(link); } catch {} };
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveT(p => (p + 1) % 3), 5000);
        return () => clearInterval(t);
    }, []);

    const scrollTo = (id) => {
        if (id === 'download' && onDownload) { onDownload(); setMenuOpen(false); return; }
        if (id === 'cepom' || id === 'contact') { nav(id); setMenuOpen(false); return; }
        document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
        setMenuOpen(false);
    };

    const SERIF = "'Cormorant Garamond', Georgia, serif";
    const PH    = isMobile ? '3.5rem 1.25rem' : '5.5rem 3.5rem';
    const navH  = isMobile ? '56px' : '64px';

    const EYEBROW = { fontSize:'.72rem', fontWeight:700, color:AMB, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'.8rem' };
    const TITLE = (sz, extra={}) => ({ fontFamily:SERIF, fontWeight:700, color:INK, lineHeight:1.07, letterSpacing:'-.02em', fontSize:sz, ...extra });

    const TESTIMONIAL_COLORS = [AMB, B, '#0891b2', '#7c3aed', '#16a34a'];
    const testimonialInitials = (name) => (name || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const FEATURES = [
        { Ico:IconGame,   titleFr:'Leçons gamifiées',     titleEn:'Gamified lessons',      descFr:'XP, streaks, diamants et combo. Restez motivé grâce à un système de récompenses qui rend chaque leçon inoubliable.', descEn:'XP, streaks, diamonds and combos. Stay motivated with a reward system that makes every lesson memorable.' },
        { Ico:IconMic,    titleFr:'Prononciation vocale',  titleEn:'Voice pronunciation',   descFr:"L'IA analyse votre voix et vous donne un score de prononciation instantané — comme un vrai prof de langue.", descEn:"AI analyzes your voice and gives you an instant pronunciation score — like a real language teacher." },
        { Ico:IconBook,   titleFr:'Dictionnaire enrichi',  titleEn:'Rich dictionary',       descFr:'Medumba–Français avec traducteur IA, expressions courantes et exemples tirés de textes authentiques.', descEn:'Medumba–French with AI translator, common expressions and examples from authentic texts.' },
        { Ico:IconMoon,   titleFr:'Dark & Light mode',     titleEn:'Dark & Light mode',     descFr:'Interface claire ou sombre selon vos préférences. Votre confort visuel, toujours préservé.', descEn:'Light or dark interface, your choice. Your visual comfort, always preserved.' },
        { Ico:IconTrophy, titleFr:'Classement & Défis',    titleEn:'Leaderboard & Challenges', descFr:'Comparez-vous chaque semaine, relevez des défis quotidiens et grimpez dans le classement mondial.', descEn:'Compare yourself weekly, take on daily challenges and climb the global leaderboard.' },
        { Ico:IconVideo,  titleFr:'Vidéos & Culture',      titleEn:'Videos & Culture',      descFr:"Tutoriels vidéo, musique traditionnelle et culture bamiléké — la langue et l'âme ensemble.", descEn:"Video tutorials, traditional music and Bamiléké culture — the language and the soul together." },
    ];

    // Ancres qui font défiler la landing page ; 'cepom'/'contact' naviguent
    // vers une vraie page séparée (pas de scroll) — voir scrollTo().
    const NAVLINKS = [
        ['cours', tr('Cours','Courses')], ['features', tr('Pourquoi Medumba','Why Medumba')], ['ressources', tr('Ressources','Resources')],
        ['classes', tr('Classes','Classes')], ['cepom', tr('CEPOM','CEPOM')], ['contact', tr('Contact','Contact')], ['download', tr('Télécharger','Download')],
    ];

    const FLOAT_BADGE = (pos, emoji, label, value, color, anim) => (
        <div style={{ position:'absolute', ...pos, animation:`${anim} ease-in-out infinite`, zIndex:2 }}>
            <div style={{ background:'#fff', borderRadius:'14px', padding:'.55rem .9rem', boxShadow:'0 8px 24px rgba(0,0,0,.1)', display:'flex', alignItems:'center', gap:'.5rem', border:`1.5px solid ${SAND}` }}>
                <span style={{ fontSize:'1.1rem' }}>{emoji}</span>
                <div>
                    <div style={{ fontSize:'.6rem', color:MUTED, fontWeight:600 }}>{label}</div>
                    <div style={{ fontSize:'.82rem', fontWeight:800, color }}>{value}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ fontFamily:"'Outfit',system-ui,sans-serif", color:INK, background:CREAM, overflowX:'hidden' }}>
            <style>{`
                *,*::before,*::after{box-sizing:border-box;}
                html{scroll-behavior:smooth;}
                @keyframes float-a{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
                @keyframes float-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
                @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.6)}}
                @keyframes fade-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
                @keyframes slide-in{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
                @keyframes shimmer{0%{background-position:-250% center}100%{background-position:250% center}}
                @keyframes cta-ring{0%{transform:scale(1);opacity:.65}100%{transform:scale(1.9);opacity:0}}
                @keyframes cta-glow{0%,100%{box-shadow:0 6px 24px rgba(0,86,210,.45),0 0 0 0 rgba(79,70,229,.45)}55%{box-shadow:0 6px 24px rgba(0,86,210,.45),0 0 0 12px rgba(79,70,229,0)}}
                @keyframes bounce-arrow{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
                .lp-btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.82rem 2rem;border-radius:8px;background:${B};color:#fff;border:none;font-weight:700;font-size:.92rem;letter-spacing:.01em;cursor:pointer;font-family:inherit;white-space:nowrap;box-shadow:0 4px 16px rgba(0,86,210,.25);transition:transform .18s,box-shadow .18s,background .18s;}
                .lp-btn:hover{background:${B2};transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,86,210,.32);}
                .lp-btn:active{transform:translateY(0);}
                .lp-cta{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;padding:1.05rem 2.6rem;border-radius:12px;background:linear-gradient(135deg,${B} 0%,#4f46e5 100%);color:#fff;border:none;font-weight:800;font-size:1.05rem;letter-spacing:.01em;cursor:pointer;font-family:inherit;white-space:nowrap;position:relative;animation:cta-glow 2.4s ease-in-out infinite;transition:transform .18s,filter .18s;}
                .lp-cta::before{content:'';position:absolute;inset:0;border-radius:12px;background:linear-gradient(135deg,${B},#4f46e5);animation:cta-ring 2.4s ease-out infinite;z-index:-1;}
                .lp-cta:hover{transform:translateY(-3px) scale(1.03);filter:brightness(1.12);}
                .lp-cta:active{transform:scale(.98);}
                .lp-btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.82rem 2rem;border-radius:8px;background:transparent;color:${B};border:1.5px solid rgba(0,86,210,.22);font-weight:700;font-size:.92rem;letter-spacing:.01em;cursor:pointer;font-family:inherit;white-space:nowrap;transition:all .18s;}
                .lp-btn-ghost:hover{background:${LIGHT};border-color:${B};transform:translateY(-2px);}
                .lp-btn-amber{display:inline-flex;align-items:center;justify-content:center;padding:.82rem 2rem;border-radius:8px;background:${AMB};color:#fff;border:none;font-weight:700;font-size:.92rem;cursor:pointer;font-family:inherit;white-space:nowrap;box-shadow:0 4px 16px rgba(245,158,11,.32);transition:transform .18s,box-shadow .18s;}
                .lp-btn-amber:hover{background:${AMB2};transform:translateY(-2px);box-shadow:0 10px 28px rgba(245,158,11,.4);}
                .feat-card{background:#fff;padding:1.75rem 1.5rem;height:100%;transition:background .2s;}
                .feat-card:hover{background:${LIGHT};}
                .res-card{background:#fff;border:1.5px solid ${SAND};border-radius:18px;padding:1.5rem;cursor:pointer;transition:transform .2s,box-shadow .2s,border-color .2s;}
                .res-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,86,210,.12);border-color:${B};}
                .plan-card{border-radius:20px;padding:2rem 1.75rem;border:2px solid ${SAND};background:#fff;transition:all .3s;cursor:pointer;}
                .plan-card.active{border-color:${B};box-shadow:0 16px 48px rgba(0,86,210,.18);}
                .blog-card{background:#fff;border:1.5px solid ${SAND};border-radius:18px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s;}
                .blog-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,86,210,.1);}
                .nav-link{cursor:pointer;color:${MUTED};font-weight:600;font-size:.82rem;letter-spacing:.01em;transition:color .15s;}
                .nav-link:hover{color:${B};}
                .teacher-card{transition:transform .2s,box-shadow .2s;border-radius:18px;}
                .teacher-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(0,86,210,.12);}
                ::-webkit-scrollbar{width:5px;}
                ::-webkit-scrollbar-thumb{background:${SAND};border-radius:99px;}
                @media(max-width:480px){
                    .hero-ctas{flex-direction:column!important;}
                    .hero-ctas button{width:100%!important;}
                    .stats-grid{grid-template-columns:1fr 1fr!important;}
                    .feat-grid{grid-template-columns:1fr!important;}
                    .res-grid{grid-template-columns:1fr 1fr!important;}
                    .class-grid{grid-template-columns:1fr 1fr!important;}
                    .teachers-grid{grid-template-columns:1fr!important;}
                    .plans-grid{grid-template-columns:1fr!important;}
                    .blog-grid{grid-template-columns:1fr!important;}
                    .dl-btns{flex-direction:column!important;}
                }
                @media(min-width:481px) and (max-width:767px){
                    .feat-grid{grid-template-columns:1fr 1fr!important;}
                    .res-grid{grid-template-columns:1fr 1fr!important;}
                    .class-grid{grid-template-columns:1fr 1fr!important;}
                    .blog-grid{grid-template-columns:1fr 1fr!important;}
                }
            `}</style>

            {/* ══ NAVBAR ══ */}
            <nav style={{
                position:'fixed',top:0,left:0,right:0,zIndex:200,height:navH,
                background:scrolled?'rgba(248,250,252,.97)':'transparent',
                backdropFilter:scrolled?'blur(18px)':'none',
                borderBottom:scrolled?`1px solid ${SAND}`:'none',
                transition:'all .3s',
                padding:isMobile?'0 1.1rem':'0 2.5rem',
                display:'flex',alignItems:'center',justifyContent:'space-between',
            }}>
                <div style={{ display:'flex',alignItems:'center',gap:'.55rem',cursor:'pointer' }} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
                    <img src={logo} alt="" style={{ width:'28px' }} />
                    <span style={{ fontWeight:900,fontSize:'1.05rem',color:B,letterSpacing:'-.02em' }}>Medumba<span style={{ color:AMB }}>.AI</span></span>
                </div>

                {!isMobile && (
                    <div style={{ display:'flex',gap:'1.75rem' }}>
                        {NAVLINKS.map(([id,l]) => (
                            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{l}</span>
                        ))}
                    </div>
                )}

                <div style={{ display:'flex',gap:'.6rem',alignItems:'center' }}>
                    <button onClick={() => setIsFr(v=>!v)} style={{ padding:isMobile?'.42rem .6rem':'.42rem .8rem',borderRadius:'7px',border:`1.5px solid rgba(0,86,210,.18)`,background:'transparent',color:B,fontWeight:700,fontSize:'.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all .15s' }}
                        onMouseEnter={e=>{e.currentTarget.style.background=LIGHT;e.currentTarget.style.borderColor=B;}}
                        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(0,86,210,.18)';}}>
                        {isFr ? '🇬🇧 EN' : '🇫🇷 FR'}
                    </button>
                    {!isMobile && onLogin && (
                        <button onClick={onLogin} style={{ background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:700,fontSize:'.83rem',color:INK,padding:'.46rem .6rem' }}>
                            {tr('Se connecter','Log in')}
                        </button>
                    )}
                    <button onClick={onRegister} className="lp-btn-amber" style={{ padding:isMobile?'.42rem .9rem':'.46rem 1.2rem',fontSize:isMobile?'.78rem':'.83rem' }}>
                        {tr("S'inscrire",'Register')}
                    </button>
                    {!isMobile && <button onClick={onStart} className="lp-btn" style={{ padding:'.46rem 1.2rem',fontSize:'.83rem' }}>{tr('Commencer','Start')} ✦</button>}
                    {isMobile && (
                        <button onClick={() => setMenuOpen(m=>!m)} style={{ background:'none',border:'none',fontSize:'1.25rem',cursor:'pointer',color:INK,padding:'.25rem',lineHeight:1 }}>
                            {menuOpen?'✕':'☰'}
                        </button>
                    )}
                </div>
            </nav>

            {/* Menu mobile */}
            {isMobile && menuOpen && (
                <div style={{ position:'fixed',top:navH,inset:`${navH} 0 0`,zIndex:199,background:'rgba(248,250,252,.99)',backdropFilter:'blur(18px)',padding:'1.75rem 1.5rem',display:'flex',flexDirection:'column',gap:'1rem',animation:'slide-in .22s ease',overflowY:'auto' }}>
                    {NAVLINKS.map(([id,l]) => (
                        <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'1rem',fontWeight:700,color:INK,cursor:'pointer',paddingBottom:'.85rem',borderBottom:`1px solid ${SAND}` }}>{l}</span>
                    ))}
                    <button onClick={onRegister} className="lp-btn-amber" style={{ marginTop:'.5rem',width:'100%' }}>{tr("S'inscrire",'Register')}</button>
                    <button onClick={onStart} className="lp-btn" style={{ width:'100%' }}>{tr('Commencer gratuitement','Start for free')} ✦</button>
                    {onLogin && (
                        <button onClick={onLogin} style={{ background:'none',border:`1.5px solid ${SAND}`,borderRadius:'10px',cursor:'pointer',fontFamily:'inherit',fontWeight:700,fontSize:'.9rem',color:INK,padding:'.6rem',width:'100%' }}>
                            {tr('Se connecter','Log in')}
                        </button>
                    )}
                </div>
            )}

            {/* ══ HERO ══ */}
            <section style={{
                minHeight:'100vh',
                background:'linear-gradient(158deg,#f0f5ff 0%,#dbeafe 50%,#e0f2fe 100%)',
                display:'flex',alignItems:'center',justifyContent:'center',
                padding:isSmall?'6.5rem .9rem 3.5rem':isMobile?'6.5rem 1.25rem 4rem':'9rem 3.5rem 6rem',
                position:'relative',overflow:'hidden',
            }}>
                <GeomPattern opacity={0.045} id="geo-hero" />
                <div style={{ position:'absolute',top:'-8%',right:'-4%',width:'55vw',height:'55vw',maxWidth:'640px',borderRadius:'50%',background:'radial-gradient(circle,rgba(0,86,210,.12) 0%,transparent 65%)',pointerEvents:'none' }} />
                <div style={{ position:'absolute',bottom:'-12%',left:'-5%',width:'40vw',height:'40vw',maxWidth:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,.1) 0%,transparent 65%)',pointerEvents:'none' }} />

                {/* Badges flottants — desktop seulement */}
                {!isMobile && <>
                    {FLOAT_BADGE({ top:'18%',right:'6%' }, '🔥', 'Streak', tr('7 jours','7 days'), '#d97706', 'float-a 5s')}
                    {FLOAT_BADGE({ top:'44%',left:'3%' },  '⚡', tr('XP Gagné','XP Earned'), '+340 XP',  B,       'float-b 6s')}
                    {FLOAT_BADGE({ bottom:'22%',right:'5%' }, '💎', tr('Diamants','Diamonds'), '50',    '#7c3aed', 'float-a 7s 1.5s')}
                </>}

                <div style={{ maxWidth:'1160px',width:'100%',display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',gap:isMobile?'3.5rem':'7rem',position:'relative',zIndex:1 }}>
                    <div style={{ flex:1,minWidth:0 }}>
                        <Reveal>
                            <div style={{ display:'flex',flexWrap:'wrap',gap:'.5rem',marginBottom:'1.25rem' }}>
                                <div style={{ display:'inline-flex',alignItems:'center',gap:'.45rem',background:`linear-gradient(135deg,${LIGHT},#dbeafe)`,border:`2px solid #bfdbfe`,borderRadius:'99px',padding:'.3rem .9rem' }}>
                                    <span style={{ width:'7px',height:'7px',borderRadius:'50%',background:'#22c55e',animation:'pulse-dot 1.8s ease-in-out infinite',display:'inline-block',flexShrink:0 }} />
                                    <span style={{ fontSize:isSmall?'.7rem':'.76rem',fontWeight:700,color:B }}>{tr(`${learnerCountLabel} apprenants nous ont déjà rejoints`,`${learnerCountLabel} learners have already joined us`)}</span>
                                </div>
                                <button onClick={() => nav('cepom')} style={{ display:'inline-flex',alignItems:'center',gap:'.4rem',background:'#fff',border:'2px solid #fde68a',borderRadius:'99px',padding:'.3rem .9rem',cursor:'pointer',fontFamily:'inherit' }}>
                                    <span style={{ fontSize:'.9rem' }}>🎓</span>
                                    <span style={{ fontSize:isSmall?'.7rem':'.76rem',fontWeight:700,color:'#92400e' }}>{tr('Certifié par le CEPOM','Certified by CEPOM')}</span>
                                </button>
                            </div>
                        </Reveal>

                        {/* Coordonnées visibles dès le premier écran */}
                        <Reveal delay={0.03}>
                            <div style={{ display:'flex',flexWrap:'wrap',gap:'.5rem',marginBottom:'1.25rem' }}>
                                <button
                                    onClick={() => openWhatsApp(ENTERPRISE_WHATSAPP, tr("j'ai une question sur Medumba.AI.", 'I have a question about Medumba.AI.'))}
                                    style={{ display:'inline-flex',alignItems:'center',gap:'.4rem',background:'rgba(37,211,102,.1)',border:'1.5px solid rgba(37,211,102,.35)',borderRadius:'99px',padding:'.28rem .8rem',cursor:'pointer',fontFamily:'inherit',color:'#15803d',fontWeight:700,fontSize:isSmall?'.7rem':'.76rem' }}
                                >
                                    <IconWhatsApp size={14} /> {ENTERPRISE_WHATSAPP}
                                </button>
                                <a
                                    href="mailto:medumba.ai@kaaynos.com"
                                    style={{ display:'inline-flex',alignItems:'center',gap:'.4rem',background:'rgba(0,86,210,.06)',border:'1.5px solid rgba(0,86,210,.25)',borderRadius:'99px',padding:'.28rem .8rem',color:B,fontWeight:700,fontSize:isSmall?'.7rem':'.76rem',textDecoration:'none' }}
                                >
                                    ✉️ medumba.ai@kaaynos.com
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={0.06}>
                            <h2 style={{ fontSize:'.72rem',fontWeight:700,color:AMB,letterSpacing:'2.5px',textTransform:'uppercase',marginBottom:'.8rem' }}>
                                Medumba.AI
                            </h2>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <h1 style={{ ...TITLE(isSmall?'2.7rem':isMobile?'3.3rem':'4.6rem'), marginBottom:'1.4rem' }}>
                                {tr('La langue Medumba,','The Medumba language,')}<br />
                                <span style={{ background:`linear-gradient(90deg,${B},${AMB},#7c3aed,${B})`,backgroundSize:'300% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 4s linear infinite',display:'inline-block' }}>
                                    {tr('enfin accessible.','finally accessible.')}
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p style={{ fontSize:isSmall?'.92rem':isMobile?'.97rem':'1.08rem',color:MUTED,lineHeight:1.8,marginBottom:'.75rem',maxWidth:'460px' }}>
                                {tr(
                                    "Leçons gamifiées, classes live avec des enseignants certifiés CEPOM, et IA vocale — tout pour maîtriser le Medumba, où que vous soyez.",
                                    "Gamified lessons, live classes with CEPOM-certified teachers, and voice AI — everything to master Medumba, wherever you are."
                                )}
                            </p>
                            <p style={{ fontSize:isSmall?'.8rem':'.85rem',color:MUTED,lineHeight:1.7,marginBottom:'2.25rem',maxWidth:'460px',opacity:0.85 }}>
                                {tr(
                                    "Medumba.AI est une application d'apprentissage pour la langue Medumba de Bangangté, dans le Ndé, Cameroun. La connexion Google est optionnelle et sert uniquement à créer votre profil apprenant et à sauvegarder votre progression.",
                                    "Medumba.AI is a learning app for the Medumba language of Bangangté, in the Ndé division, Cameroon. Signing in with Google is optional and is used only to create your learner profile and securely save your course progress."
                                )}
                            </p>
                        </Reveal>

                        <Reveal delay={0.22}>
                            <div style={{ marginBottom:'2.5rem' }}>
                                {/* CTA principal — visible en premier */}
                                <div style={{ position:'relative',display:'inline-block',marginBottom:'1rem' }}>
                                    <button onClick={onStart} className="lp-cta" style={{ fontSize:isMobile?'1rem':'1.1rem',padding:isMobile?'1rem 2rem':'1.1rem 2.8rem' }}>
                                        <span style={{ fontSize:'1.1em' }}>🚀</span>
                                        {tr("Commencer le cours — c'est gratuit","Start the course — it's free")}
                                    </button>
                                </div>
                                {/* Flèche animée sous le CTA */}
                                <div style={{ display:'flex',justifyContent:'center',marginBottom:'.85rem' }}>
                                    <span style={{ fontSize:'1rem',color:B,animation:'bounce-arrow 1.4s ease-in-out infinite',display:'inline-block',opacity:.55 }}>↓</span>
                                </div>
                                {/* Actions secondaires discrètes */}
                                <div className="hero-ctas" style={{ display:'flex',gap:'.65rem',flexWrap:'wrap' }}>
                                    <button onClick={() => scrollTo('cours')} className="lp-btn-ghost" style={{ fontSize:'.85rem',padding:'.65rem 1.4rem' }}>📚 {tr('Voir les cours','View courses')}</button>
                                    {onDownload && (
                                        <button onClick={onDownload} className="lp-btn-ghost" style={{ fontSize:'.85rem',padding:'.65rem 1.4rem' }}>
                                            📱 {tr("Télécharger l'app","Download the app")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.28}>
                            <div style={{ display:'flex',alignItems:'center',gap:'.85rem' }}>
                                <div style={{ display:'flex' }}>
                                    {[{i:'AK',c:AMB},{i:'MT',c:B},{i:'SN',c:'#0891b2'}].map(({i,c},idx) => (
                                        <div key={idx} style={{ width:'30px',height:'30px',borderRadius:'50%',background:c,border:`2.5px solid ${CREAM}`,marginLeft:idx>0?'-9px':0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.5rem',fontWeight:800,color:'#fff',zIndex:3-idx }}>{i}</div>
                                    ))}
                                </div>
                                <p style={{ fontSize:'.82rem',color:MUTED,fontWeight:500 }}><strong style={{ color:INK }}>{tr(`${learnerCountLabel} apprenants`,`${learnerCountLabel} learners`)}</strong> {tr('nous font déjà confiance','already trust us')}</p>
                            </div>
                        </Reveal>
                    </div>

                    {!isSmall && (
                        <Reveal delay={0.1} direction="left" style={{ display:'flex',justifyContent:'center' }}>
                            <AppPreview small={isMobile} isFr={isFr} />
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ══ TONTAH ══ */}
            <section style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto',display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',gap:isMobile?'2.5rem':'5rem' }}>
                    {!isSmall && (
                        <Reveal delay={0.1} style={{ flexShrink:0,display:'flex',justifyContent:'center' }}>
                            <img src={tontah} alt="Tontah" style={{ width:isMobile?'260px':'340px', height:'auto', borderRadius:'32px', filter:'drop-shadow(0 18px 30px rgba(0,86,210,0.18))' }} />
                        </Reveal>
                    )}
                    <div style={{ flex:1,minWidth:0 }}>
                        <Reveal>
                            <div style={{ display:'inline-flex',alignItems:'center',gap:'.4rem',background:'#fff',border:`2px solid #fde68a`,borderRadius:'99px',padding:'.3rem .9rem',marginBottom:'1.1rem' }}>
                                <span style={{ fontSize:'.9rem' }}>✨</span>
                                <span style={{ fontSize:'.72rem',fontWeight:700,color:'#92400e',letterSpacing:'.3px' }}>{tr('Bientôt disponible','Coming soon')}</span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'2.9rem')}>{tr('Bientôt : votre compagnon ','Meet ')}<span style={{ color:B }}>Tontah</span></h2>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p style={{ fontSize:isSmall?'.92rem':'1.02rem',color:MUTED,lineHeight:1.8,marginTop:'1rem',marginBottom:'1.75rem',maxWidth:'480px' }}>
                                {tr(
                                    "Tontah sera votre compagnon IA pour l'apprentissage, la croissance et le bien-être — toujours là pour vous aider à apprendre, explorer et progresser en confiance.",
                                    "Tontah will be your AI companion for learning, growth and well-being — always here to help you learn, explore, and grow with confidence."
                                )}
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:'1rem',maxWidth:'520px' }}>
                                {[
                                    { icon:'📖', fr:'Intelligent et bienveillant', en:'Smart & Supportive' },
                                    { icon:'🧡', fr:'Attentif et encourageant',    en:'Caring & Encouraging' },
                                    { icon:'🛡️', fr:'Sûr et digne de confiance',   en:'Safe & Trustworthy' },
                                    { icon:'✨', fr:'Curieux et créatif',          en:'Curious & Creative' },
                                ].map((p,i) => (
                                    <div key={i} style={{ display:'flex',alignItems:'center',gap:'.6rem' }}>
                                        <span style={{ fontSize:'1.1rem' }}>{p.icon}</span>
                                        <span style={{ fontSize:'.85rem',fontWeight:700,color:INK }}>{tr(p.fr,p.en)}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {!isSmall && (
                    <div style={{ maxWidth:'1160px',margin:'3.5rem auto 0',display:'flex',flexDirection:'column',gap:'2rem' }}>
                        {[
                            { src:tontahExpressions, fr:'Ses expressions', en:'Her expressions', delay:0.05 },
                            { src:tontahPoses,       fr:'Ses poses',       en:'Her poses',       delay:0.1 },
                            { src:tontahAccessories, fr:'Ses accessoires', en:'Her accessories', delay:0.15 },
                        ].map((row,i) => (
                            <Reveal key={i} delay={row.delay}>
                                <p style={{ fontSize:'.72rem',fontWeight:700,color:AMB,letterSpacing:'2px',textTransform:'uppercase',marginBottom:'.6rem' }}>{tr(row.fr,row.en)}</p>
                                <img src={row.src} alt={tr(row.fr,row.en)} style={{ width:'100%',height:'auto',borderRadius:'20px',boxShadow:'0 8px 24px rgba(0,86,210,0.08)' }} />
                            </Reveal>
                        ))}
                    </div>
                )}
            </section>

            {/* ══ RESSOURCES ══ */}
            <section id="ressources" style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2rem':'2.5rem' }}>
                        <p style={EYEBROW}>{tr('Ressources','Resources')}</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'460px' })}>
                                {tr('Bien plus','Much more')}<br /><em style={{ color:B,fontStyle:'italic' }}>{tr("qu'une simple appli.",'than just an app.')}</em>
                            </h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'300px' }}>{tr('Le dictionnaire à voix réelle — sans compte à créer, sans rien à installer.','The real-voice dictionary — no account to create, nothing to install.')}</p>
                        </div>
                    </Reveal>

                    {/* Killer features — dictionnaire et alphabet, en avant */}
                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'1.3fr 1fr',gap:'1.1rem',marginBottom:'1.1rem' }}>
                        <Reveal>
                            <div className="res-card" onClick={() => nav('dictionary')} style={{ position:'relative', height:'100%', background:'#fff' }}>
                                <div style={{ position:'absolute',top:'1rem',right:'1rem',background:`${AMB}18`,color:'#92400e',fontSize:'.66rem',fontWeight:800,borderRadius:'99px',padding:'3px 10px',border:`1px solid ${AMB}40` }}>⭐ {tr('Le plus populaire','Most popular')}</div>
                                <div style={{ width:'52px',height:'52px',borderRadius:'16px',background:`${B}15`,display:'flex',alignItems:'center',justifyContent:'center',color:B,marginBottom:'1.1rem',border:`1.5px solid ${B}25` }}><IconDict /></div>
                                <h3 style={{ fontSize:'1.2rem',fontWeight:900,color:INK,marginBottom:'.5rem' }}>{tr('Dictionnaire à voix réelle','Real-voice dictionary')}</h3>
                                <p style={{ fontSize:'.85rem',color:MUTED,lineHeight:1.7,marginBottom:'1.1rem',maxWidth:'420px' }}>
                                    {tr('Écoutez chaque mot prononcé par un vrai locuteur Medumba — pas une synthèse vocale. Recherchez, écoutez, apprenez, gratuitement.', 'Hear every word spoken by a real Medumba speaker — not text-to-speech. Search, listen, learn, for free.')}
                                </p>
                                <span style={{ fontSize:'.85rem',color:B,fontWeight:700 }}>{tr('Ouvrir le dictionnaire','Open the dictionary')} →</span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.07}>
                            <div className="res-card" onClick={() => nav('alphabet')} style={{ position:'relative', height:'100%', background:'#fff' }}>
                                <div style={{ width:'52px',height:'52px',borderRadius:'16px',background:`${'#7c3aed'}15`,display:'flex',alignItems:'center',justifyContent:'center',color:'#7c3aed',marginBottom:'1.1rem',border:'1.5px solid #7c3aed25' }}><IconAlpha /></div>
                                <h3 style={{ fontSize:'1.2rem',fontWeight:900,color:INK,marginBottom:'.5rem' }}>{tr("L'alphabet Medumba",'The Medumba alphabet')}</h3>
                                <p style={{ fontSize:'.85rem',color:MUTED,lineHeight:1.7,marginBottom:'1.1rem' }}>
                                    {tr('De nouvelles lettres, de nouveaux sons. Commencez ici avant les mots.', 'New letters, new sounds. Start here before the words.')}
                                </p>
                                <span style={{ fontSize:'.85rem',color:'#7c3aed',fontWeight:700 }}>{tr("Découvrir l'alphabet",'Discover the alphabet')} →</span>
                            </div>
                        </Reveal>
                    </div>

                    {/* Le reste — secondaire */}
                    <div className="res-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1.1rem' }}>
                        {[
                            { Ico:IconCalc, view:'counting',      titleFr:'Comptage',      titleEn:'Counting',      descFr:'Apprenez à compter en Medumba — chiffres, ordinaux et système de numération traditionnel.', descEn:'Learn to count in Medumba — numbers, ordinals and the traditional counting system.', color:'#7c3aed', badgeFr:'Interactif', badgeEn:'Interactive' },
                            { Ico:IconCal,  view:'calendar',      titleFr:'Calendrier',    titleEn:'Calendar',      descFr:'Calendrier culturel Bamiléké : fêtes, saisons agricoles et événements traditionnels.', descEn:'Bamiléké cultural calendar: festivals, farming seasons and traditional events.', color:'#0891b2', badgeFr:'Culturel', badgeEn:'Cultural' },
                            { Ico:IconMic,  view:'pronunciation', titleFr:'Prononciation', titleEn:'Pronunciation', descFr:'Lisez les mots Medumba à voix haute avec guide syllabique IPA et 1 147 syllabes.', descEn:'Read Medumba words aloud with an IPA syllable guide and 1,147 syllables.', color:'#9333ea', badgeFr:'1 147 syllabes', badgeEn:'1,147 syllables' },
                            { Ico:IconVideo, view:'video',        titleFr:'Vidéos',        titleEn:'Videos',        descFr:'Tutoriels vidéo, chants traditionnels et documentaires sur la culture Medumba.', descEn:'Video tutorials, traditional songs and documentaries on Medumba culture.', color:'#15803d', badgeFr:'HD', badgeEn:'HD' },
                        ].map((r,i) => (
                            <Reveal key={i} delay={i*.07}>
                                <div className="res-card" onClick={() => nav(r.view)} style={{ position:'relative' }}>
                                    <div style={{ position:'absolute',top:'1rem',right:'1rem',background:`${r.color}15`,color:r.color,fontSize:'.62rem',fontWeight:700,borderRadius:'99px',padding:'2px 8px',border:`1px solid ${r.color}30` }}>{tr(r.badgeFr,r.badgeEn)}</div>
                                    <div style={{ width:'46px',height:'46px',borderRadius:'14px',background:`${r.color}15`,display:'flex',alignItems:'center',justifyContent:'center',color:r.color,marginBottom:'1rem',border:`1.5px solid ${r.color}25` }}><r.Ico /></div>
                                    <h3 style={{ fontSize:'1rem',fontWeight:800,color:INK,marginBottom:'.4rem' }}>{tr(r.titleFr,r.titleEn)}</h3>
                                    <p style={{ fontSize:'.81rem',color:MUTED,lineHeight:1.7,marginBottom:'1rem' }}>{tr(r.descFr,r.descEn)}</p>
                                    <span style={{ fontSize:'.8rem',color:r.color,fontWeight:700 }}>{tr('Accéder','Access')} →</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ STATS ══ */}
            <section style={{ background:B,padding:isMobile?'2.5rem 1.25rem':'3rem 3.5rem' }}>
                <div className="stats-grid" style={{ maxWidth:'920px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',textAlign:'center' }}>
                    {[
                        {target:activeLearners ?? 0,suffix:'',labelFr:'Apprenants actifs',labelEn:'Active learners'},
                        {target:15,suffix:'',labelFr:'Leçons interactives',labelEn:'Interactive lessons'},
                        {target:3,suffix:'',labelFr:'Enseignants CEPOM',labelEn:'CEPOM teachers'},
                        {textFr:'Gratuit',textEn:'Free',labelFr:'Pour commencer',labelEn:'To get started'},
                    ].map((s,i) => (
                        <Reveal key={i} delay={i*.06}>
                            <div style={{ borderRight:i<3&&!isSmall?'1px solid rgba(255,255,255,.08)':'none',padding:isMobile?'.4rem 0':0 }}>
                                <div style={{ fontSize:isMobile?'1.8rem':'2.5rem',fontWeight:900,color:'#fff',lineHeight:1,letterSpacing:'-.03em' }}>
                                    {s.textFr ? tr(s.textFr,s.textEn) : <Counter target={s.target} suffix={s.suffix} />}
                                </div>
                                <div style={{ fontSize:isMobile?'.68rem':'.75rem',color:'rgba(255,255,255,.38)',fontWeight:600,marginTop:'5px' }}>{tr(s.labelFr,s.labelEn)}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ══ COURS ══ */}
            <section id="cours" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2rem':'3rem' }}>
                        <p style={EYEBROW}>{tr('Cours de Medumba','Medumba Courses')}</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'480px' })}>
                                {tr('Apprenez à votre rythme,','Learn at your own pace,')}<br /><em style={{ color:B,fontStyle:'italic' }}>{tr('étape par étape.','step by step.')}</em>
                            </h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'280px' }}>{tr('De débutant à avancé — 3 unités, 18+ leçons progressives.','From beginner to advanced — 3 units, 18+ progressive lessons.')}</p>
                        </div>
                    </Reveal>

                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'1.25rem',marginBottom:'2.5rem' }}>
                        {[
                            { nFr:'Unité 1', nEn:'Unit 1', titleFr:'Premiers pas', titleEn:'First Steps', color:B,
                              lessonsFr:['Alphabet','Salutations','Corps humain','Nourriture & Boissons','Couleurs & Vêtements','Chiffres & Argent'],
                              lessonsEn:['Alphabet','Greetings','Body Parts','Food & Drinks','Colors & Clothing','Numbers & Money'] },
                            { nFr:'Unité 2', nEn:'Unit 2', titleFr:'Vie quotidienne', titleEn:'Daily Life', color:'#7c3aed',
                              lessonsFr:['Animaux & Nature','Famille & Relations','Météo & Environnement','Temps & Calendrier','Identité & Origines'],
                              lessonsEn:['Animals & Nature','Family & Relationships','Weather & Environment','Time & Calendar','Identity & Origins'] },
                            { nFr:'Unité 3', nEn:'Unit 3', titleFr:'Culture & Expression', titleEn:'Culture & Expression', color:'#0891b2',
                              lessonsFr:['Maison & Cuisine','Santé & Corps','École & Apprentissage','Travail & Professions','Culture Bamiléké'],
                              lessonsEn:['Home & Kitchen','Health & Body','School & Learning','Work & Professions','Bamiléké Culture'] },
                        ].map((u,i) => (
                            <Reveal key={i} delay={i*.08}>
                                <div style={{ background:'#fff',border:`1.5px solid ${SAND}`,borderRadius:'20px',overflow:'hidden',height:'100%' }}>
                                    <div style={{ background:u.color,padding:'1.25rem 1.5rem' }}>
                                        <div style={{ fontSize:'.68rem',color:'rgba(255,255,255,.6)',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'.3rem' }}>{tr(u.nFr,u.nEn)}</div>
                                        <div style={{ fontSize:isMobile?'1.1rem':'1.25rem',fontWeight:900,color:'#fff',letterSpacing:'-.01em' }}>{tr(u.titleFr,u.titleEn)}</div>
                                    </div>
                                    <div style={{ padding:'1.25rem 1.5rem' }}>
                                        {(isFr ? u.lessonsFr : u.lessonsEn).map((l,j) => (
                                            <div key={j} style={{ display:'flex',alignItems:'center',gap:'.6rem',padding:'.42rem 0',borderBottom:j<u.lessonsFr.length-1?`1px solid ${SAND}`:'none' }}>
                                                <div style={{ width:'6px',height:'6px',borderRadius:'50%',background:j===0?u.color:SAND,flexShrink:0 }} />
                                                <span style={{ fontSize:'.82rem',color:j===0?INK:MUTED,fontWeight:j===0?700:400 }}>{l}</span>
                                                {j===0 && <span style={{ marginLeft:'auto',fontSize:'.65rem',background:LIGHT,color:B,fontWeight:700,borderRadius:'99px',padding:'1px 7px' }}>{tr('Actif','Active')}</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <div style={{ textAlign:'center' }}>
                            <button onClick={onStart} className="lp-cta">🚀 {tr('Commencer les cours — gratuit','Start the courses — free')}</button>
                        </div>
                    </Reveal>
                </div>
            </section>


            {/* ══ FONCTIONNALITÉS ══ */}
            <section id="features" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>{tr('Pourquoi Medumba.AI','Why Medumba.AI')}</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'540px' })}>{tr("Tout ce qu'il faut pour",'Everything you need to')}<br />{tr('maîtriser le Medumba.','master Medumba.')}</h2>
                    </Reveal>
                    <div className="feat-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:SAND,border:`1.5px solid ${SAND}`,borderRadius:'16px',overflow:'hidden' }}>
                        {FEATURES.map((f,i) => (
                            <Reveal key={i} delay={i*.05}>
                                <div className="feat-card">
                                    <div style={{ width:'40px',height:'40px',borderRadius:'10px',background:LIGHT,display:'flex',alignItems:'center',justifyContent:'center',color:B,marginBottom:'1.1rem' }}><f.Ico /></div>
                                    <h3 style={{ fontSize:'.97rem',fontWeight:800,color:INK,marginBottom:'.45rem' }}>{tr(f.titleFr,f.titleEn)}</h3>
                                    <p style={{ fontSize:'.82rem',color:MUTED,lineHeight:1.72 }}>{tr(f.descFr,f.descEn)}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* ── Comment se déroule une leçon ── */}
                    <Reveal style={{ marginTop: isMobile ? '2rem' : '2.5rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                            border: '1.5px solid #bbf7d0',
                            borderRadius: '20px',
                            padding: isMobile ? '1.25rem 1.25rem' : '1.5rem 2rem',
                            display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                                background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                            }}>📚</div>
                            <div>
                                <h3 style={{ fontSize: '.97rem', fontWeight: 800, color: '#15803d', marginBottom: '.45rem' }}>
                                    {tr('Comment se déroule une leçon ?','How does a lesson work?')}
                                </h3>
                                <p style={{ fontSize: '.83rem', color: '#475569', lineHeight: 1.72, margin: 0 }}>
                                    {isFr ? (
                                        <>Avant chaque leçon, vous recevez une <strong style={{ color: '#15803d' }}>série de fiches français → Medumba</strong> pour découvrir le vocabulaire de la session. Ensuite, des exercices interactifs vous permettent de pratiquer et de mémoriser durablement.</>
                                    ) : (
                                        <>Before each lesson, you get a <strong style={{ color: '#15803d' }}>set of French → Medumba flashcards</strong> to discover the session's vocabulary. Then, interactive exercises let you practice and retain it long-term.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>


            {/* ══ CLASSES ══ */}
            <section id="classes" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>{tr('Classes en ligne','Online Classes')}</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'440px' })}>{tr('Apprenez avec','Learn with')}<br /><em style={{ color:B,fontStyle:'italic' }}>{tr('de vrais enseignants.','real teachers.')}</em></h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'300px' }}>{tr('Des cours animés par des enseignants certifiés CEPOM — live, replay ou en 1-à-1.','Classes led by CEPOM-certified teachers — live, replay, or 1-on-1.')}</p>
                        </div>
                    </Reveal>

                    <div className="class-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.85rem',marginBottom:'2.5rem' }}>
                        {[
                            {titleFr:'Classes Live',titleEn:'Live Classes',subFr:'En direct · max 30',subEn:'Live · max 30',accent:true},
                            {titleFr:'Replay',titleEn:'Replay',subFr:'Archives illimitées',subEn:'Unlimited archives',accent:false},
                            {titleFr:'Cours Particuliers',titleEn:'Private Lessons',subFr:'Sessions 1-à-1',subEn:'1-on-1 sessions',accent:false},
                            {titleFr:'Ateliers Culturels',titleEn:'Cultural Workshops',subFr:'Contes & musique',subEn:'Stories & music',accent:false},
                        ].map((c,i) => (
                            <Reveal key={i} delay={i*.07}>
                                <div style={{ background:'#fff',border:c.accent?`2px solid ${B}`:`1.5px solid ${SAND}`,borderRadius:'14px',padding:'1.35rem 1.2rem',cursor:'pointer',boxShadow:c.accent?`0 6px 24px rgba(0,86,210,.1)`:'none',transition:'transform .2s,box-shadow .2s' }}
                                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,86,210,.1)`;}}
                                    onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=c.accent?`0 6px 24px rgba(0,86,210,.1)`:'none';}}>
                                    <div style={{ width:'28px',height:'3px',background:c.accent?AMB:SAND,borderRadius:'99px',marginBottom:'1rem' }} />
                                    <div style={{ fontWeight:800,fontSize:'.9rem',color:INK,marginBottom:'.28rem' }}>{tr(c.titleFr,c.titleEn)}</div>
                                    <div style={{ fontSize:'.75rem',color:MUTED,fontWeight:500 }}>{tr(c.subFr,c.subEn)}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="teachers-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.25rem' }}>
                        {[
                            {name:'Kammbem Arthur',   levelFr:'Débutant · Intermédiaire',levelEn:'Beginner · Intermediate', specFr:'Grammaire & Phonologie', specEn:'Grammar & Phonology',  rating:'4.9',initials:'KA',color:B},
                            {name:'Kuikeu Franck',    levelFr:'Intermédiaire · Avancé',levelEn:'Intermediate · Advanced', specFr:'Littérature & Proverbes', specEn:'Literature & Proverbs',  rating:'4.8',initials:'KF',color:AMB},
                            {name:'Metchezin Francklin',levelFr:'Enfants · Débutant',levelEn:'Kids · Beginner',   specFr:'Contes & Culture Medumba', specEn:'Stories & Medumba Culture',rating:'5.0',initials:'MF',color:'#0891b2'},
                        ].map((t,i) => (
                            <Reveal key={i} delay={i*.09}>
                                <div className="teacher-card" style={{ background:'#fff',padding:'1.5rem',border:`1.5px solid ${SAND}` }}>
                                    <div style={{ display:'flex',alignItems:'center',gap:'.9rem',marginBottom:'1rem' }}>
                                        <div style={{ width:'46px',height:'46px',borderRadius:'50%',background:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{t.initials}</div>
                                        <div>
                                            <div style={{ fontWeight:800,color:INK,fontSize:'.9rem' }}>{t.name}</div>
                                            <div style={{ fontSize:'.72rem',color:MUTED,fontWeight:500,marginTop:'1px' }}>{tr(t.levelFr,t.levelEn)}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize:'.78rem',color:INK,fontWeight:600,marginBottom:'.9rem',paddingBottom:'.9rem',borderBottom:`1px solid ${LIGHT}` }}>{tr(t.specFr,t.specEn)}</div>
                                    <div style={{ marginBottom:'1.1rem' }}>
                                        <span style={{ fontSize:'.78rem',color:AMB,fontWeight:700 }}>★ {t.rating}</span>
                                    </div>
                                    <button
                                        onClick={() => openWhatsApp(ENTERPRISE_WHATSAPP, tr(`je souhaite prendre des cours de Medumba avec ${t.name}. Pouvez-vous me contacter ?`,`I'd like to take Medumba lessons with ${t.name}. Could you contact me?`))}
                                        style={{ width:'100%',display:'block',boxSizing:'border-box',textAlign:'center',padding:'.6rem',borderRadius:'8px',background:'transparent',color:B,border:`1.5px solid ${B}`,fontWeight:700,fontSize:'.82rem',cursor:'pointer',fontFamily:'inherit',transition:'all .15s',textDecoration:'none' }}
                                        onMouseEnter={e=>{e.currentTarget.style.background=B;e.currentTarget.style.color='#fff';}}
                                        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=B;}}>
                                        {tr('Contacter','Contact')} {t.name.split(' ')[0]}
                                    </button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ COMMENT ÇA MARCHE ══ */}
            <section id="how" style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1000px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3.5rem' }}>
                        <p style={EYEBROW}>{tr('Comment ça marche','How it works')}</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem')}>{tr('Commencez en 3 étapes.','Get started in 3 steps.')}</h2>
                    </Reveal>
                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:isMobile?'2rem':'3rem' }}>
                        {[
                            {n:'01',titleFr:'Créez votre profil',   titleEn:'Create your profile',   descFr:"Choisissez votre niveau et vos objectifs. Aucune carte bancaire requise.", descEn:"Choose your level and goals. No credit card required.",bg:B,   fg:'#fff'},
                            {n:'02',titleFr:'Suivez vos leçons',    titleEn:'Follow your lessons',    descFr:"Progressez à votre rythme, gagnez de l'XP et des diamants à chaque bonne réponse.", descEn:"Progress at your own pace, earn XP and diamonds with every correct answer.",bg:AMB, fg:'#fff'},
                            {n:'03',titleFr:'Rejoignez une classe', titleEn:'Join a class', descFr:"Réservez un cours live ou regardez un replay avec de vrais enseignants certifiés.", descEn:"Book a live class or watch a replay with real certified teachers.",bg:LIGHT,fg:INK,border:true},
                        ].map((s,i) => (
                            <Reveal key={i} delay={i*.1}>
                                <div style={{ display:'flex',flexDirection:isMobile?'row':'column',gap:'1.25rem',alignItems:isMobile?'flex-start':'stretch' }}>
                                    <div style={{ width:'52px',height:'52px',borderRadius:isMobile?'50%':'14px',background:s.bg,border:s.border?`1.5px solid ${SAND}`:'none',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                                        <span style={{ fontFamily:SERIF,fontSize:'1.1rem',fontWeight:700,color:s.fg,letterSpacing:'-.02em' }}>{s.n}</span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize:'.97rem',fontWeight:800,color:INK,marginBottom:'.4rem' }}>{tr(s.titleFr,s.titleEn)}</h3>
                                        <p style={{ fontSize:'.83rem',color:MUTED,lineHeight:1.72 }}>{tr(s.descFr,s.descEn)}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3} style={{ marginTop:isMobile?'2.5rem':'3.5rem' }}>
                        <button onClick={onStart} className="lp-cta" style={{ width:isMobile?'100%':'auto' }}>🚀 {tr("Commencer maintenant — c'est gratuit","Start now — it's free")}</button>
                    </Reveal>
                </div>
            </section>

            {/* ══ TÉMOIGNAGES ══ */}
            <section style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <div>
                                <p style={EYEBROW}>{tr('Témoignages','Testimonials')}</p>
                                <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem')}>{tr('Ce que disent nos apprenants.','What our learners say.')}</h2>
                            </div>
                            <button onClick={() => setShowTestimonialForm(v => !v)} style={{ flexShrink:0,background:'#fff',border:`2px solid ${B}`,color:B,borderRadius:'99px',padding:'.6rem 1.3rem',fontWeight:700,fontSize:'.85rem',cursor:'pointer',fontFamily:'inherit' }}>
                                {tr('Partagez votre expérience','Share your experience')}
                            </button>
                        </div>
                    </Reveal>

                    {showTestimonialForm && (
                        <Reveal style={{ marginBottom:'2rem' }}>
                            <div style={{ background:LIGHT,border:`1.5px solid ${SAND}`,borderRadius:'20px',padding:'1.75rem' }}>
                                {testimonialStatus === 'sent' ? (
                                    <p style={{ fontSize:'.9rem',color:INK,fontWeight:700,margin:0 }}>
                                        {tr('Merci ! Votre témoignage sera publié après vérification.','Thank you! Your testimonial will be published after review.')}
                                    </p>
                                ) : (
                                    <form onSubmit={submitTestimonialForm} style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
                                        <div style={{ display:'flex',gap:'.75rem',flexWrap:'wrap' }}>
                                            <input required value={testimonialForm.name} onChange={testimonialSet('name')} placeholder={tr('Votre nom','Your name')}
                                                style={{ flex:'1 1 160px',padding:'.65rem .9rem',borderRadius:'10px',border:`1.5px solid ${SAND}`,fontFamily:'inherit',fontSize:'.85rem' }} />
                                            <input value={testimonialForm.role} onChange={testimonialSet('role')} placeholder={tr('Ville / rôle (optionnel)','City / role (optional)')}
                                                style={{ flex:'1 1 160px',padding:'.65rem .9rem',borderRadius:'10px',border:`1.5px solid ${SAND}`,fontFamily:'inherit',fontSize:'.85rem' }} />
                                        </div>
                                        <textarea required value={testimonialForm.message} onChange={testimonialSet('message')} placeholder={tr('Votre expérience avec Medumba.AI…','Your experience with Medumba.AI…')} rows={3}
                                            style={{ padding:'.65rem .9rem',borderRadius:'10px',border:`1.5px solid ${SAND}`,fontFamily:'inherit',fontSize:'.85rem',resize:'vertical' }} />
                                        {testimonialStatus === 'error' && (
                                            <p style={{ color:'#dc2626',fontSize:'.8rem',margin:0 }}>{tr("Erreur d'envoi. Réessayez.",'Failed to send. Please try again.')}</p>
                                        )}
                                        <button type="submit" disabled={testimonialStatus==='sending'} className="lp-btn-amber" style={{ alignSelf:'flex-start',padding:'.6rem 1.4rem',fontSize:'.85rem',opacity:testimonialStatus==='sending'?0.7:1 }}>
                                            {testimonialStatus==='sending' ? tr('Envoi…','Sending…') : tr('Envoyer','Send')}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </Reveal>
                    )}

                    {testimonials === null ? null : testimonials.length === 0 ? (
                        <div style={{ background:LIGHT,border:`1.5px solid ${SAND}`,borderRadius:'20px',padding:'2.5rem',textAlign:'center' }}>
                            <p style={{ fontSize:'.92rem',color:MUTED,margin:0 }}>
                                {tr('Soyez le premier à partager votre expérience avec Medumba.AI.','Be the first to share your experience with Medumba.AI.')}
                            </p>
                        </div>
                    ) : isMobile ? (
                        <div>
                            <div style={{ background:LIGHT,border:`1.5px solid ${SAND}`,borderRadius:'20px',padding:'2rem 1.75rem',animation:'fade-up .4s ease' }} key={activeT}>
                                <div style={{ fontFamily:'Georgia,serif',fontSize:'3.8rem',lineHeight:.75,color:AMB,opacity:.4,marginBottom:'.9rem' }}>"</div>
                                <p style={{ fontSize:'.92rem',lineHeight:1.8,marginBottom:'1.5rem',color:MUTED,fontStyle:'italic' }}>{testimonials[activeT % testimonials.length].message}</p>
                                <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
                                    <div style={{ width:'38px',height:'38px',borderRadius:'50%',background:TESTIMONIAL_COLORS[activeT % TESTIMONIAL_COLORS.length],display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.58rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{testimonialInitials(testimonials[activeT % testimonials.length].name)}</div>
                                    <div>
                                        <div style={{ fontWeight:800,fontSize:'.88rem',color:INK }}>{testimonials[activeT % testimonials.length].name}</div>
                                        {testimonials[activeT % testimonials.length].role && <div style={{ fontSize:'.72rem',color:MUTED,fontWeight:500 }}>{testimonials[activeT % testimonials.length].role}</div>}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display:'flex',justifyContent:'center',gap:'.5rem',marginTop:'1.25rem' }}>
                                {testimonials.map((_,i) => <div key={i} onClick={() => setActiveT(i)} style={{ width:i===activeT?'22px':'7px',height:'7px',borderRadius:'99px',background:i===activeT?B:SAND,cursor:'pointer',transition:'all .3s' }} />)}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display:'grid',gridTemplateColumns:`repeat(${Math.min(testimonials.length,3)},1fr)`,gap:'1.5rem' }}>
                                {testimonials.slice(0,3).map((tm,i) => (
                                    <Reveal key={tm.id ?? i} delay={i*.1}>
                                        <div onClick={() => setActiveT(i)} style={{ background:i===activeT?B:'#fff',border:`1.5px solid ${i===activeT?'transparent':SAND}`,borderRadius:'20px',padding:'2rem 1.75rem',cursor:'pointer',transition:'all .4s cubic-bezier(.16,1,.3,1)',transform:i===activeT?'scale(1.03)':'scale(1)',boxShadow:i===activeT?`0 28px 60px rgba(0,86,210,.28)`:'none' }}>
                                            <div style={{ fontFamily:'Georgia,serif',fontSize:'3.5rem',lineHeight:.75,color:i===activeT?AMB2:`rgba(245,158,11,.28)`,marginBottom:'.9rem' }}>"</div>
                                            <p style={{ fontSize:'.88rem',lineHeight:1.8,marginBottom:'1.5rem',color:i===activeT?'rgba(255,255,255,.85)':MUTED,fontStyle:'italic' }}>{tm.message}</p>
                                            <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
                                                <div style={{ width:'38px',height:'38px',borderRadius:'50%',background:i===activeT?'rgba(255,255,255,.15)':TESTIMONIAL_COLORS[i % TESTIMONIAL_COLORS.length],display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.58rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{testimonialInitials(tm.name)}</div>
                                                <div>
                                                    <div style={{ fontWeight:800,fontSize:'.88rem',color:i===activeT?'#fff':INK }}>{tm.name}</div>
                                                    {tm.role && <div style={{ fontSize:'.72rem',color:i===activeT?'rgba(255,255,255,.45)':MUTED,fontWeight:500 }}>{tm.role}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                            {testimonials.length > 1 && (
                                <div style={{ display:'flex',justifyContent:'center',gap:'.5rem',marginTop:'1.5rem' }}>
                                    {testimonials.slice(0,3).map((_,i) => <div key={i} onClick={() => setActiveT(i)} style={{ width:i===activeT?'22px':'7px',height:'7px',borderRadius:'99px',background:i===activeT?B:SAND,cursor:'pointer',transition:'all .3s' }} />)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>


            {/* ══ TÉLÉCHARGER / ACHAT ══ */}
            <section id="download" style={{ background:B,padding:PH,position:'relative',overflow:'hidden' }}>
                <GeomPattern opacity={0.07} id="geo-dl" />
                <div style={{ position:'absolute',top:'-15%',right:'-3%',width:'50vw',height:'50vw',maxWidth:'560px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 65%)',pointerEvents:'none' }} />

                <div style={{ maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1 }}>
                    <Reveal style={{ textAlign:'center',marginBottom:isMobile?'2.5rem':'3.5rem' }}>
                        <p style={{ ...EYEBROW,color:AMB }}>{tr('Télécharger','Download')}</p>
                        <h2 style={{ fontFamily:SERIF,fontWeight:700,color:'#fff',lineHeight:1.15,letterSpacing:'-.02em',fontSize:isSmall?'1.5rem':isMobile?'1.7rem':'2rem',marginBottom:'.9rem' }}>
                            Medumba.AI <em style={{ color:AMB2 }}>{tr('dans votre poche.','in your pocket.')}</em>
                        </h2>
                        <p style={{ color:'rgba(255,255,255,.6)',fontSize:isMobile?'.9rem':'1rem',lineHeight:1.8,maxWidth:'460px',margin:'0 auto' }}>
                            {tr('Disponible sur Android et iOS — 100% gratuit pour le lancement.','Available on Android and iOS — 100% free for the launch.')}
                        </p>
                    </Reveal>

                    {/* Message gratuit — pas de prix tant que la tarification n'est pas finalisée */}
                    <Reveal style={{ marginBottom:'3rem' }}>
                        <div style={{ maxWidth:'480px', margin:'0 auto', textAlign:'center', background:'rgba(255,255,255,.08)', backdropFilter:'blur(8px)', border:'2px solid rgba(245,158,11,.35)', borderRadius:'20px', padding:isMobile?'1.75rem 1.5rem':'2.25rem 2rem' }}>
                            <div style={{ fontSize:'2.4rem', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:'.5rem' }}>{tr('Gratuit','Free')}</div>
                            <p style={{ color:'rgba(255,255,255,.7)', fontSize:'.88rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
                                {tr('Toutes les leçons, le dictionnaire, le comptage et les vidéos — sans frais pour le lancement.','All lessons, the dictionary, counting and videos — free of charge for the launch.')}
                            </p>
                            <button onClick={onStart} className="lp-btn-amber" style={{ width:'100%' }}>{tr('Commencer gratuitement','Start for free')}</button>
                        </div>
                    </Reveal>

                    {/* Boutons store */}
                    <Reveal>
                        <div style={{ textAlign:'center',marginBottom:'1.5rem' }}>
                            <p style={{ color:'rgba(255,255,255,.55)',fontSize:'.82rem',marginBottom:'1.25rem' }}>{tr("Téléchargez l'application sur votre store :",'Download the app from your store:')}</p>
                            <div className="dl-btns" style={{ display:'flex',gap:'.9rem',justifyContent:'center',flexWrap:'wrap' }}>
                                {[{Ico:IconAndroid,storeFr:'DISPONIBLE SUR',storeEn:'AVAILABLE ON',name:'Google Play'},{Ico:IconApple,storeFr:'TÉLÉCHARGER SUR',storeEn:'DOWNLOAD ON THE',name:'App Store'}].map((d,i) => (
                                    <div key={i} onClick={onStart} style={{ display:'flex',alignItems:'center',gap:'.85rem',background:'rgba(255,255,255,.09)',backdropFilter:'blur(8px)',border:'1.5px solid rgba(255,255,255,.14)',borderRadius:'10px',padding:'.85rem 1.4rem',cursor:'pointer',transition:'all .18s' }}
                                        onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.15)';e.currentTarget.style.transform='translateY(-2px)';}}
                                        onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.09)';e.currentTarget.style.transform='';}}>
                                        <div style={{ color:'rgba(255,255,255,.65)',flexShrink:0 }}><d.Ico /></div>
                                        <div>
                                            <div style={{ fontSize:'.5rem',color:'rgba(255,255,255,.35)',fontWeight:600,letterSpacing:'.5px',marginBottom:'1px' }}>{tr(d.storeFr,d.storeEn)}</div>
                                            <div style={{ fontSize:'.98rem',fontWeight:800,color:'#fff',lineHeight:1 }}>{d.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p style={{ textAlign:'center',fontSize:'.72rem',color:'rgba(255,255,255,.25)',fontWeight:500 }}>{tr('Android juillet 2026 · iOS via TestFlight (bêta)','Android July 2026 · iOS via TestFlight (beta)')}</p>
                    </Reveal>
                </div>
            </section>

            {/* ══ FOOTER ══ */}
            <footer style={{ background:INK,padding:isMobile?'2.5rem 1.25rem':'3.5rem 3.5rem',color:'rgba(248,250,252,.38)' }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <div style={{ display:'flex',flexDirection:isMobile?'column':'row',gap:'2rem',justifyContent:'space-between',alignItems:isMobile?'flex-start':'center',marginBottom:'2rem' }}>
                        <div>
                            <div style={{ display:'flex',alignItems:'center',gap:'.55rem',marginBottom:'.6rem' }}>
                                <img src={logo} alt="" style={{ width:'24px',filter:'brightness(0) invert(1)',opacity:.55 }} />
                                <span style={{ fontWeight:900,color:'rgba(248,250,252,.75)',fontSize:'.95rem' }}>Medumba<span style={{ color:AMB }}>.AI</span></span>
                            </div>
                            <p style={{ fontSize:'.76rem',lineHeight:1.8 }}>{tr('Juillet 2026 · La langue Medumba, accessible à tous.','July 2026 · The Medumba language, accessible to all.')}</p>
                        </div>
                        <div style={{ display:'flex',gap:isMobile?'1.25rem':'2.5rem',flexWrap:'wrap' }}>
                            {NAVLINKS.map(([id,l]) => (
                                <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'.82rem',cursor:'pointer',fontWeight:600,transition:'color .15s' }}
                                    onMouseEnter={e=>e.target.style.color='rgba(248,250,252,.8)'}
                                    onMouseLeave={e=>e.target.style.color='rgba(248,250,252,.38)'}>{l}</span>
                            ))}
                        </div>
                    </div>
                    {/* ── Formulaire de contact compact ── */}
                    <div style={{ borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:'1.75rem',paddingBottom:'1.75rem' }}>
                        <p style={{ fontSize:'.78rem',fontWeight:800,color:'rgba(248,250,252,.7)',letterSpacing:'.5px',textTransform:'uppercase',marginBottom:'.9rem' }}>
                            {tr('Une question ? Écrivez-nous','Have a question? Write to us')}
                        </p>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem', marginBottom:'1.1rem' }}>
                            <button
                                onClick={() => openWhatsApp(ENTERPRISE_WHATSAPP, tr("j'ai une question sur Medumba.AI.", 'I have a question about Medumba.AI.'))}
                                style={{ display:'inline-flex',alignItems:'center',gap:'.5rem',padding:'.55rem .95rem',borderRadius:'99px',background:'rgba(37,211,102,.12)',border:'1.5px solid rgba(37,211,102,.35)',color:'#4ade80',fontWeight:700,fontSize:'.82rem',fontFamily:'inherit',cursor:'pointer' }}
                            >
                                <IconWhatsApp size={17} /> {ENTERPRISE_WHATSAPP}
                            </button>
                            <a
                                href="mailto:medumba.ai@kaaynos.com"
                                style={{ display:'inline-flex',alignItems:'center',gap:'.5rem',padding:'.55rem .95rem',borderRadius:'99px',background:'rgba(96,165,250,.12)',border:'1.5px solid rgba(96,165,250,.35)',color:'#93c5fd',fontWeight:700,fontSize:'.82rem',textDecoration:'none' }}
                            >
                                ✉️ medumba.ai@kaaynos.com
                            </a>
                        </div>
                        {footerStatus === 'sent' ? (
                            <div style={{ background:'rgba(34,197,94,.12)',border:'1.5px solid rgba(34,197,94,.35)',borderRadius:'12px',padding:'.85rem 1.1rem',color:'#4ade80',fontWeight:700,fontSize:'.85rem',maxWidth:'520px' }}>
                                ✅ {tr('Message envoyé ! Merci.','Message sent! Thank you.')}
                            </div>
                        ) : (
                            <form onSubmit={submitFooterForm} style={{ display:'flex', flexDirection:isMobile?'column':'row', gap:'.6rem', maxWidth:'720px' }}>
                                <input required value={footerForm.name} onChange={footerSet('name')} placeholder={tr('Nom','Name')}
                                    style={{ flex:1, padding:'.65rem .9rem', borderRadius:'10px', border:'1.5px solid rgba(255,255,255,.15)', background:'rgba(255,255,255,.06)', color:'#fff', fontFamily:'inherit', fontSize:'.85rem', outline:'none' }} />
                                <input required type="email" value={footerForm.email} onChange={footerSet('email')} placeholder="Email"
                                    style={{ flex:1, padding:'.65rem .9rem', borderRadius:'10px', border:'1.5px solid rgba(255,255,255,.15)', background:'rgba(255,255,255,.06)', color:'#fff', fontFamily:'inherit', fontSize:'.85rem', outline:'none' }} />
                                <input required value={footerForm.message} onChange={footerSet('message')} placeholder={tr('Votre message','Your message')}
                                    style={{ flex:2, padding:'.65rem .9rem', borderRadius:'10px', border:'1.5px solid rgba(255,255,255,.15)', background:'rgba(255,255,255,.06)', color:'#fff', fontFamily:'inherit', fontSize:'.85rem', outline:'none' }} />
                                <button type="submit" disabled={footerStatus==='sending'} className="lp-btn-amber" style={{ padding:'.65rem 1.4rem', fontSize:'.85rem', whiteSpace:'nowrap', opacity: footerStatus==='sending'?0.7:1 }}>
                                    {footerStatus==='sending' ? (tr('Envoi…','Sending…')) : (tr('Envoyer','Send'))}
                                </button>
                            </form>
                        )}
                        {footerStatus === 'error' && (
                            <div style={{ fontSize:'.78rem', color:'#f87171', fontWeight:600, marginTop:'.5rem' }}>
                                {tr("Erreur d'envoi. Réessayez.",'Failed to send. Please try again.')}
                            </div>
                        )}

                        {landingComments.length > 0 && (
                            <div style={{ marginTop:'1.5rem', maxWidth:'720px' }}>
                                {!showAllComments ? (
                                    <div key={activeComment} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'10px', padding:'.65rem .9rem', animation:'fade-up .4s ease' }}>
                                        <span style={{ fontWeight:800, fontSize:'.8rem', color:'#fff' }}>{landingComments[activeComment % landingComments.length].name}</span>
                                        <p style={{ margin:'.25rem 0 0', fontSize:'.8rem', color:'rgba(248,250,252,.75)', lineHeight:1.5 }}>{landingComments[activeComment % landingComments.length].message}</p>
                                    </div>
                                ) : (
                                    <div style={{ display:'flex', flexDirection:'column', gap:'.6rem', maxHeight:'260px', overflowY:'auto' }}>
                                        {landingComments.map((c) => (
                                            <div key={c.id} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'10px', padding:'.65rem .9rem' }}>
                                                <span style={{ fontWeight:800, fontSize:'.8rem', color:'#fff' }}>{c.name}</span>
                                                <p style={{ margin:'.25rem 0 0', fontSize:'.8rem', color:'rgba(248,250,252,.75)', lineHeight:1.5 }}>{c.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {landingComments.length > 1 && (
                                    <button onClick={() => setShowAllComments(v => !v)} style={{ marginTop:'.6rem', background:'none', border:'none', color:AMB2, fontWeight:700, fontSize:'.78rem', cursor:'pointer', fontFamily:'inherit', padding:0 }}>
                                        {showAllComments
                                            ? tr('Réduire', 'Show less')
                                            : tr(`Voir les ${landingComments.length} messages →`, `See all ${landingComments.length} messages →`)}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div style={{ borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.75rem' }}>
                        <span style={{ fontSize:'.72rem' }}>{tr('© 2026 Medumba.AI · Tous droits réservés','© 2026 Medumba.AI · All rights reserved')}</span>
                        <span style={{ fontSize:'.72rem',display:'flex',gap:'1rem' }}>
                            <a href="/privacy" style={{ color:'inherit',textDecoration:'none' }}>{tr('Confidentialité','Privacy')}</a>
                            <a href="/terms" style={{ color:'inherit',textDecoration:'none' }}>{tr("Conditions d'utilisation",'Terms of Service')}</a>
                        </span>
                        <span style={{ fontSize:'.72rem' }}>{tr('Fait avec soin pour la communauté Medumba','Made with care for the Medumba community')}</span>
                    </div>
                </div>
            </footer>

            {/* ── Bouton flottant WhatsApp — contact direct entreprise ── */}
            <button
                onClick={() => openWhatsApp(ENTERPRISE_WHATSAPP, tr("je souhaite avoir plus d'informations sur Medumba.AI.", "I'd like more information about Medumba.AI."))}
                aria-label="WhatsApp"
                style={{
                    position:'fixed', bottom:'5.5rem', right:'1.25rem', zIndex:200,
                    width:'56px', height:'56px', borderRadius:'50%',
                    background:'#25D366', color:'#fff', border:'none',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow:'0 6px 20px rgba(37,211,102,.45)',
                    cursor:'pointer', transition:'transform .18s,box-shadow .18s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.08)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';}}
            >
                <IconWhatsApp />
            </button>

            {/* ── Modale : demande du nom avant d'ouvrir WhatsApp ── */}
            {waModal && (
                <div
                    onClick={() => setWaModal(null)}
                    style={{ position:'fixed', inset:0, background:'rgba(15,23,42,.55)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}
                >
                    <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:'20px', padding:'1.75rem', maxWidth:'380px', width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
                        <div style={{ fontSize:'1.05rem', fontWeight:900, color:INK, marginBottom:'.5rem' }}>
                            {tr('Avant de continuer…', 'Before we continue…')}
                        </div>
                        <p style={{ fontSize:'.85rem', color:MUTED, marginBottom:'1rem', lineHeight:1.6 }}>
                            {tr("Quel est votre nom ? Il sera inclus dans votre message WhatsApp.", "What's your name? It'll be included in your WhatsApp message.")}
                        </p>
                        <input
                            autoFocus value={waName} onChange={e => setWaName(e.target.value)}
                            placeholder={tr('Votre nom', 'Your name')}
                            onKeyDown={e => { if (e.key === 'Enter' && waName.trim()) sendWhatsApp(); }}
                            style={{ width:'100%', boxSizing:'border-box', padding:'.7rem .9rem', borderRadius:'10px', border:`1.5px solid ${SAND}`, fontSize:'.9rem', fontFamily:'inherit', outline:'none', marginBottom:'1.1rem' }}
                        />
                        <div style={{ display:'flex', gap:'.6rem' }}>
                            <button onClick={() => setWaModal(null)} style={{ flex:1, padding:'.65rem', borderRadius:'10px', border:`1.5px solid ${SAND}`, background:'#fff', color:MUTED, fontWeight:700, fontSize:'.85rem', cursor:'pointer', fontFamily:'inherit' }}>
                                {tr('Annuler', 'Cancel')}
                            </button>
                            <button onClick={sendWhatsApp} disabled={!waName.trim()} style={{ flex:2, padding:'.65rem', borderRadius:'10px', border:'none', background: waName.trim() ? '#25D366' : SAND, color:'#fff', fontWeight:800, fontSize:'.85rem', cursor: waName.trim() ? 'pointer' : 'default', fontFamily:'inherit' }}>
                                {tr('Continuer vers WhatsApp', 'Continue to WhatsApp')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
