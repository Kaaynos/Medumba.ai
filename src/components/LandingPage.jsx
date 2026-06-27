import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

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

function AppPreview({ small }) {
    const W = small ? 200 : 255;
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
                    <div style={{ fontSize:'.46rem', color:'rgba(255,255,255,.3)', fontWeight:700, letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'5px' }}>Leçon 1 · Salutations</div>
                    <div style={{ fontSize:'1rem', color:'#fff', fontWeight:800, marginBottom:'2px' }}>Ó tsɑ̌ʼ nə?</div>
                    <div style={{ fontSize:'.56rem', color:AMB, fontWeight:500 }}>Comment vas-tu ?</div>
                    <div style={{ marginTop:'8px', height:'3px', background:'rgba(255,255,255,.07)', borderRadius:'99px' }}>
                        <div style={{ width:'68%', height:'100%', background:`linear-gradient(90deg,${AMB},${AMB2})`, borderRadius:'99px' }} />
                    </div>
                </div>
                <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', gap:'5px' }}>
                    <div style={{ fontSize:'.55rem', color:'rgba(255,255,255,.4)', fontWeight:600, marginBottom:'2px' }}>Sélectionne la traduction</div>
                    {['Comment vas-tu ?','Bonne nuit.','Au revoir !'].map((opt,i) => (
                        <div key={i} style={{ background:i===0?'rgba(245,158,11,.14)':'rgba(255,255,255,.04)', border:`1.5px solid ${i===0?'rgba(245,158,11,.5)':'rgba(255,255,255,.06)'}`, borderRadius:'9px', padding:'7px 10px', color:i===0?AMB2:'rgba(255,255,255,.45)', fontSize:'.58rem', fontWeight:i===0?700:400 }}>{opt}</div>
                    ))}
                </div>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'8px 0 14px', borderTop:'1px solid rgba(255,255,255,.05)', display:'flex', justifyContent:'space-around', background:B }}>
                    {[{l:'Leçons',a:true},{l:'Dico',a:false},{l:'Classe',a:false},{l:'Profil',a:false}].map(({l,a}) => (
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
export default function LandingPage({ onStart, onLogin, onNavigate, onDownload }) {
    const nav = onNavigate ?? onStart;
    const [menuOpen,  setMenuOpen]  = useState(false);
    const [scrolled,  setScrolled]  = useState(false);
    const [vw,        setVw]        = useState(() => window.innerWidth);
    const [activeT,   setActiveT]   = useState(0);
    const [activePlan, setActivePlan] = useState(1);

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
        document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
        setMenuOpen(false);
    };

    const SERIF = "'Cormorant Garamond', Georgia, serif";
    const PH    = isMobile ? '3.5rem 1.25rem' : '5.5rem 3.5rem';
    const navH  = isMobile ? '56px' : '64px';

    const EYEBROW = { fontSize:'.72rem', fontWeight:700, color:AMB, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'.8rem' };
    const TITLE = (sz, extra={}) => ({ fontFamily:SERIF, fontWeight:700, color:INK, lineHeight:1.07, letterSpacing:'-.02em', fontSize:sz, ...extra });

    const TESTIMONIALS = [
        { name:'Amélie K.',       role:'Diaspora camerounaise, Paris', initials:'AK', color:AMB,        text:"Grâce à Medumba.AI j'ai pu parler avec ma grand-mère pour la première fois en Medumba. Les leçons sont courtes et vraiment efficaces !" },
        { name:'Marc-Aurèle T.', role:'Étudiant, Yaoundé',            initials:'MT', color:B,           text:"Le système de combo et les XP m'ont accroché dès le premier jour. C'est comme un jeu — mais j'apprends vraiment !" },
        { name:'Sophie N.',       role:'Enseignante, Bafoussam',       initials:'SN', color:'#0891b2',   text:"Les classes en ligne avec les enseignants CEPOM sont d'une qualité exceptionnelle. Je recommande à tous mes élèves." },
    ];

    const FEATURES = [
        { Ico:IconGame,   title:'Leçons gamifiées',     desc:'XP, streaks, diamants et combo. Restez motivé grâce à un système de récompenses qui rend chaque leçon inoubliable.' },
        { Ico:IconMic,    title:'Prononciation vocale',  desc:"L'IA analyse votre voix et vous donne un score de prononciation instantané — comme un vrai prof de langue." },
        { Ico:IconBook,   title:'Dictionnaire enrichi',  desc:'Medumba–Français avec traducteur IA, expressions courantes et exemples tirés de textes authentiques.' },
        { Ico:IconMoon,   title:'Dark & Light mode',     desc:'Interface claire ou sombre selon vos préférences. Votre confort visuel, toujours préservé.' },
        { Ico:IconTrophy, title:'Classement & Défis',    desc:'Comparez-vous chaque semaine, relevez des défis quotidiens et grimpez dans le classement mondial.' },
        { Ico:IconVideo,  title:'Vidéos & Culture',      desc:"Tutoriels vidéo, musique traditionnelle et culture bamiléké — la langue et l'âme ensemble." },
    ];

    const NAVLINKS = [
        ['cours','Cours'],['pourquoi','Pourquoi Medumba'],['ressources','Ressources'],
        ['classes','Classes'],['blog','Blog'],['download','Télécharger'],
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
                .lp-btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.82rem 2rem;border-radius:8px;background:${B};color:#fff;border:none;font-weight:700;font-size:.92rem;letter-spacing:.01em;cursor:pointer;font-family:inherit;white-space:nowrap;box-shadow:0 4px 16px rgba(0,86,210,.25);transition:transform .18s,box-shadow .18s,background .18s;}
                .lp-btn:hover{background:${B2};transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,86,210,.32);}
                .lp-btn:active{transform:translateY(0);}
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
                    <button onClick={onLogin} style={{ padding:'.42rem 1.1rem',borderRadius:'7px',border:`1.5px solid rgba(0,86,210,.18)`,background:'transparent',color:B,fontWeight:600,fontSize:'.82rem',cursor:'pointer',fontFamily:'inherit',transition:'all .15s' }}
                        onMouseEnter={e=>{e.currentTarget.style.background=LIGHT;e.currentTarget.style.borderColor=B;}}
                        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(0,86,210,.18)';}}>
                        Se connecter
                    </button>
                    {!isMobile && <button onClick={onStart} className="lp-btn" style={{ padding:'.46rem 1.2rem',fontSize:'.83rem' }}>Commencer ✦</button>}
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
                    <button onClick={onStart} className="lp-btn" style={{ marginTop:'.5rem',width:'100%' }}>Commencer gratuitement ✦</button>
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
                    {FLOAT_BADGE({ top:'18%',right:'6%' }, '🔥', 'Streak', '7 jours', '#d97706', 'float-a 5s')}
                    {FLOAT_BADGE({ top:'44%',left:'3%' },  '⚡', 'XP Gagné', '+340 XP',  B,       'float-b 6s')}
                    {FLOAT_BADGE({ bottom:'22%',right:'5%' }, '💎', 'Diamants', '50',    '#7c3aed', 'float-a 7s 1.5s')}
                </>}

                <div style={{ maxWidth:'1160px',width:'100%',display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',gap:isMobile?'3.5rem':'7rem',position:'relative',zIndex:1 }}>
                    <div style={{ flex:1,minWidth:0 }}>
                        <Reveal>
                            <div style={{ display:'inline-flex',alignItems:'center',gap:'.45rem',background:`linear-gradient(135deg,${LIGHT},#dbeafe)`,border:`2px solid #bfdbfe`,borderRadius:'99px',padding:'.3rem .9rem',marginBottom:'1.25rem' }}>
                                <span style={{ width:'7px',height:'7px',borderRadius:'50%',background:'#22c55e',animation:'pulse-dot 1.8s ease-in-out infinite',display:'inline-block',flexShrink:0 }} />
                                <span style={{ fontSize:isSmall?'.7rem':'.76rem',fontWeight:700,color:B }}>2 847 apprenants actifs cette semaine</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <h1 style={{ ...TITLE(isSmall?'2.7rem':isMobile?'3.3rem':'4.6rem'), marginBottom:'1.4rem' }}>
                                La langue Medumba,<br />
                                <span style={{ background:`linear-gradient(90deg,${B},${AMB},#7c3aed,${B})`,backgroundSize:'300% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 4s linear infinite',display:'inline-block' }}>
                                    enfin accessible.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p style={{ fontSize:isSmall?'.92rem':isMobile?'.97rem':'1.08rem',color:MUTED,lineHeight:1.8,marginBottom:'2.25rem',maxWidth:'460px' }}>
                                Leçons gamifiées, classes live avec des enseignants certifiés CEPOM,
                                et IA vocale — tout pour maîtriser le Medumba, où que vous soyez.
                            </p>
                        </Reveal>

                        <Reveal delay={0.22}>
                            <div className="hero-ctas" style={{ display:'flex',gap:'.85rem',marginBottom:'2.5rem',flexWrap:'wrap' }}>
                                <button onClick={onStart} className="lp-btn">🚀 Commencer gratuitement</button>
                                <button onClick={() => scrollTo('cours')} className="lp-btn-ghost">📚 Voir les cours</button>
                                {onDownload && (
                                    <button onClick={onDownload} className="lp-btn-ghost" style={{ display:'flex',alignItems:'center',gap:'.45rem' }}>
                                        📱 Télécharger l'app
                                    </button>
                                )}
                            </div>
                        </Reveal>

                        <Reveal delay={0.28}>
                            <div style={{ display:'flex',alignItems:'center',gap:'.85rem' }}>
                                <div style={{ display:'flex' }}>
                                    {[{i:'AK',c:AMB},{i:'MT',c:B},{i:'SN',c:'#0891b2'}].map(({i,c},idx) => (
                                        <div key={idx} style={{ width:'30px',height:'30px',borderRadius:'50%',background:c,border:`2.5px solid ${CREAM}`,marginLeft:idx>0?'-9px':0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.5rem',fontWeight:800,color:'#fff',zIndex:3-idx }}>{i}</div>
                                    ))}
                                </div>
                                <p style={{ fontSize:'.82rem',color:MUTED,fontWeight:500 }}><strong style={{ color:INK }}>2 847 apprenants</strong> nous font confiance</p>
                            </div>
                        </Reveal>
                    </div>

                    {!isSmall && (
                        <Reveal delay={0.1} direction="left" style={{ display:'flex',justifyContent:'center' }}>
                            <AppPreview small={isMobile} />
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ══ STATS ══ */}
            <section style={{ background:B,padding:isMobile?'2.5rem 1.25rem':'3rem 3.5rem' }}>
                <div className="stats-grid" style={{ maxWidth:'920px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',textAlign:'center' }}>
                    {[{target:2847,suffix:'+',label:'Apprenants actifs'},{target:17,suffix:'',label:'Leçons interactives'},{target:3,suffix:'',label:'Enseignants CEPOM'},{target:100,suffix:'%',label:"Gratuit d'accès"}].map((s,i) => (
                        <Reveal key={i} delay={i*.06}>
                            <div style={{ borderRight:i<3&&!isSmall?'1px solid rgba(255,255,255,.08)':'none',padding:isMobile?'.4rem 0':0 }}>
                                <div style={{ fontSize:isMobile?'1.8rem':'2.5rem',fontWeight:900,color:'#fff',lineHeight:1,letterSpacing:'-.03em' }}><Counter target={s.target} suffix={s.suffix} /></div>
                                <div style={{ fontSize:isMobile?'.68rem':'.75rem',color:'rgba(255,255,255,.38)',fontWeight:600,marginTop:'5px' }}>{s.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ══ COURS ══ */}
            <section id="cours" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2rem':'3rem' }}>
                        <p style={EYEBROW}>Cours de Medumba</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'480px' })}>
                                Apprenez à votre rythme,<br /><em style={{ color:B,fontStyle:'italic' }}>étape par étape.</em>
                            </h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'280px' }}>De débutant à avancé — 3 unités, 17+ leçons progressives.</p>
                        </div>
                    </Reveal>

                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'1.25rem',marginBottom:'2.5rem' }}>
                        {[
                            { n:'Unité 1',title:'Premiers pas',color:B,       lessons:['Salutations','Corps humain','Nourriture & Boissons','Couleurs & Vêtements','Chiffres & Argent'] },
                            { n:'Unité 2',title:'Vie quotidienne',color:'#7c3aed', lessons:['Animaux & Nature','Famille & Relations','Météo & Environnement','Temps & Calendrier','Identité & Origines'] },
                            { n:'Unité 3',title:'Culture & Expression',color:'#0891b2', lessons:['Maison & Cuisine','Santé & Corps','École & Apprentissage','Travail & Professions','Culture Bamiléké'] },
                        ].map((u,i) => (
                            <Reveal key={i} delay={i*.08}>
                                <div style={{ background:'#fff',border:`1.5px solid ${SAND}`,borderRadius:'20px',overflow:'hidden',height:'100%' }}>
                                    <div style={{ background:u.color,padding:'1.25rem 1.5rem' }}>
                                        <div style={{ fontSize:'.68rem',color:'rgba(255,255,255,.6)',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'.3rem' }}>{u.n}</div>
                                        <div style={{ fontSize:isMobile?'1.1rem':'1.25rem',fontWeight:900,color:'#fff',letterSpacing:'-.01em' }}>{u.title}</div>
                                    </div>
                                    <div style={{ padding:'1.25rem 1.5rem' }}>
                                        {u.lessons.map((l,j) => (
                                            <div key={j} style={{ display:'flex',alignItems:'center',gap:'.6rem',padding:'.42rem 0',borderBottom:j<u.lessons.length-1?`1px solid ${SAND}`:'none' }}>
                                                <div style={{ width:'6px',height:'6px',borderRadius:'50%',background:j===0?u.color:SAND,flexShrink:0 }} />
                                                <span style={{ fontSize:'.82rem',color:j===0?INK:MUTED,fontWeight:j===0?700:400 }}>{l}</span>
                                                {j===0 && <span style={{ marginLeft:'auto',fontSize:'.65rem',background:LIGHT,color:B,fontWeight:700,borderRadius:'99px',padding:'1px 7px' }}>Actif</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <div style={{ textAlign:'center' }}>
                            <button onClick={onStart} className="lp-btn">Commencer les cours</button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ POURQUOI MEDUMBA ══ */}
            <section id="pourquoi" style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center',marginBottom:isMobile?'2.5rem':'3.5rem' }}>
                        <p style={EYEBROW}>Pourquoi Medumba ?</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'600px',margin:'0 auto' })}>
                            Une langue. Une culture.<br /><em style={{ color:B,fontStyle:'italic' }}>Un héritage à préserver.</em>
                        </h2>
                    </Reveal>

                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'1.5rem',marginBottom:'3rem' }}>
                        {[
                            { emoji:'🌍',title:'1 million de locuteurs',desc:"Le Medumba est parlé par plus d'un million de personnes dans la région de l'Ouest Cameroun. C'est l'une des langues Grassfields les plus riches du continent africain.",color:B },
                            { emoji:'🏛',title:'Culture Bamiléké vivante',desc:"La langue Medumba porte en elle l'histoire, la philosophie et la sagesse du peuple Bamiléké — des proverbes aux contes traditionnels, en passant par la musique.",color:'#7c3aed' },
                            { emoji:'🔗',title:'Reconnectez-vous',desc:"Que vous soyez de la diaspora ou simplement curieux, apprendre le Medumba vous connecte à vos racines, à votre famille et à une communauté qui vous attend.",color:'#0891b2' },
                        ].map((r,i) => (
                            <Reveal key={i} delay={i*.08}>
                                <div style={{ background:'#fff',border:`1.5px solid ${SAND}`,borderRadius:'20px',padding:'2rem 1.75rem',height:'100%' }}>
                                    <div style={{ width:'52px',height:'52px',borderRadius:'16px',background:`linear-gradient(135deg,${r.color}22,${r.color}11)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',marginBottom:'1.1rem',border:`1.5px solid ${r.color}33` }}>
                                        {r.emoji}
                                    </div>
                                    <h3 style={{ fontSize:'1.05rem',fontWeight:800,color:INK,marginBottom:'.6rem',letterSpacing:'-.01em' }}>{r.title}</h3>
                                    <p style={{ fontSize:'.84rem',color:MUTED,lineHeight:1.75 }}>{r.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <div style={{ background:B,borderRadius:'24px',padding:isMobile?'2rem 1.5rem':'2.5rem 3rem',position:'relative',overflow:'hidden' }}>
                            <GeomPattern opacity={0.08} id="geo-q" />
                            <div style={{ position:'relative',zIndex:1,textAlign:'center' }}>
                                <div style={{ fontFamily:'Georgia,serif',fontSize:isMobile?'3.5rem':'5rem',lineHeight:.75,color:'rgba(255,255,255,.25)',marginBottom:'.75rem' }}>"</div>
                                <p style={{ fontSize:isMobile?'1rem':'1.2rem',color:'rgba(255,255,255,.92)',lineHeight:1.7,maxWidth:'680px',margin:'0 auto',fontStyle:'italic',fontWeight:500 }}>
                                    Tsɑ̌m nə, pə nwíŋ á — Savoir sa langue, c'est savoir qui on est.
                                </p>
                                <p style={{ fontSize:'.78rem',color:'rgba(255,255,255,.45)',marginTop:'1.25rem',fontWeight:600,letterSpacing:'.05em' }}>PROVERBE MEDUMBA</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ FONCTIONNALITÉS ══ */}
            <section id="features" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>Pourquoi Medumba.AI</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'540px' })}>Tout ce qu'il faut pour<br />maîtriser le Medumba.</h2>
                    </Reveal>
                    <div className="feat-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:SAND,border:`1.5px solid ${SAND}`,borderRadius:'16px',overflow:'hidden' }}>
                        {FEATURES.map((f,i) => (
                            <Reveal key={i} delay={i*.05}>
                                <div className="feat-card">
                                    <div style={{ width:'40px',height:'40px',borderRadius:'10px',background:LIGHT,display:'flex',alignItems:'center',justifyContent:'center',color:B,marginBottom:'1.1rem' }}><f.Ico /></div>
                                    <h3 style={{ fontSize:'.97rem',fontWeight:800,color:INK,marginBottom:'.45rem' }}>{f.title}</h3>
                                    <p style={{ fontSize:'.82rem',color:MUTED,lineHeight:1.72 }}>{f.desc}</p>
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
                                    Comment se déroule une leçon ?
                                </h3>
                                <p style={{ fontSize: '.83rem', color: '#475569', lineHeight: 1.72, margin: 0 }}>
                                    Avant chaque leçon, vous recevez une <strong style={{ color: '#15803d' }}>série de fiches français → Medumba</strong> pour découvrir le vocabulaire de la session. Ensuite, des exercices interactifs vous permettent de pratiquer et de mémoriser durablement.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ RESSOURCES ══ */}
            <section id="ressources" style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>Ressources</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'460px' })}>
                                Bien plus<br /><em style={{ color:B,fontStyle:'italic' }}>qu'une simple appli.</em>
                            </h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'300px' }}>Alphabet, dictionnaire, comptage, calendrier et vidéos — tout accessible en un clic.</p>
                        </div>
                    </Reveal>

                    <div className="res-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1.1rem' }}>
                        {[
                            { Ico:IconDict, view:'dictionary',    title:'Dictionnaire',  desc:'Medumba–Français avec plus de 1 000 entrées, traducteur IA et exemples contextuels.', color:B, badge:'1 000+ mots' },
                            { Ico:IconCalc, view:'counting',      title:'Comptage',      desc:'Apprenez à compter en Medumba — chiffres, ordinaux et système de numération traditionnel.', color:'#7c3aed', badge:'Interactif' },
                            { Ico:IconMic,  view:'pronunciation', title:'Prononciation', desc:'Lisez les mots Medumba à voix haute avec guide syllabique IPA et 1 147 syllabes.', color:'#9333ea', badge:'1 147 syllabes' },
                            { Ico:IconCal,  view:'calendar',      title:'Calendrier',    desc:'Calendrier culturel Bamiléké : fêtes, saisons agricoles et événements traditionnels.', color:'#0891b2', badge:'Culturel' },
                            { Ico:IconVideo, view:'video',        title:'Vidéos',        desc:'Tutoriels vidéo, chants traditionnels et documentaires sur la culture Medumba.', color:'#15803d', badge:'HD' },
                            { Ico:IconAlpha, view:'alphabet',     title:'Alphabet',      desc:'Les 32 lettres Medumba — voyelles, consonnes spéciales, IPA et exemples interactifs.', color:'#d97706', badge:'32 lettres' },
                        ].map((r,i) => (
                            <Reveal key={i} delay={i*.07}>
                                <div className="res-card" onClick={() => nav(r.view)} style={{ position:'relative' }}>
                                    <div style={{ position:'absolute',top:'1rem',right:'1rem',background:`${r.color}15`,color:r.color,fontSize:'.62rem',fontWeight:700,borderRadius:'99px',padding:'2px 8px',border:`1px solid ${r.color}30` }}>{r.badge}</div>
                                    <div style={{ width:'46px',height:'46px',borderRadius:'14px',background:`${r.color}15`,display:'flex',alignItems:'center',justifyContent:'center',color:r.color,marginBottom:'1rem',border:`1.5px solid ${r.color}25` }}><r.Ico /></div>
                                    <h3 style={{ fontSize:'1rem',fontWeight:800,color:INK,marginBottom:'.4rem' }}>{r.title}</h3>
                                    <p style={{ fontSize:'.81rem',color:MUTED,lineHeight:1.7,marginBottom:'1rem' }}>{r.desc}</p>
                                    <span style={{ fontSize:'.8rem',color:r.color,fontWeight:700 }}>Accéder →</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CLASSES ══ */}
            <section id="classes" style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>Classes en ligne</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'flex-end',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'440px' })}>Apprenez avec<br /><em style={{ color:B,fontStyle:'italic' }}>de vrais enseignants.</em></h2>
                            <p style={{ color:MUTED,fontSize:'.88rem',lineHeight:1.75,maxWidth:'300px' }}>Des cours animés par des enseignants certifiés CEPOM — live, replay ou en 1-à-1.</p>
                        </div>
                    </Reveal>

                    <div className="class-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.85rem',marginBottom:'2.5rem' }}>
                        {[
                            {title:'Classes Live',sub:'En direct · max 30',accent:true},
                            {title:'Replay',sub:'Archives illimitées',accent:false},
                            {title:'Cours Particuliers',sub:'Sessions 1-à-1',accent:false},
                            {title:'Ateliers Culturels',sub:'Contes & musique',accent:false},
                        ].map((c,i) => (
                            <Reveal key={i} delay={i*.07}>
                                <div style={{ background:'#fff',border:c.accent?`2px solid ${B}`:`1.5px solid ${SAND}`,borderRadius:'14px',padding:'1.35rem 1.2rem',cursor:'pointer',boxShadow:c.accent?`0 6px 24px rgba(0,86,210,.1)`:'none',transition:'transform .2s,box-shadow .2s' }}
                                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,86,210,.1)`;}}
                                    onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=c.accent?`0 6px 24px rgba(0,86,210,.1)`:'none';}}>
                                    <div style={{ width:'28px',height:'3px',background:c.accent?AMB:SAND,borderRadius:'99px',marginBottom:'1rem' }} />
                                    <div style={{ fontWeight:800,fontSize:'.9rem',color:INK,marginBottom:'.28rem' }}>{c.title}</div>
                                    <div style={{ fontSize:'.75rem',color:MUTED,fontWeight:500 }}>{c.sub}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="teachers-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.25rem' }}>
                        {[
                            {name:'Kammbem Arthur',   level:'Débutant · Intermédiaire',spec:'Grammaire & Phonologie',  rating:'4.9',students:142,initials:'KA',color:B},
                            {name:'Kuikeu Franck',    level:'Intermédiaire · Avancé', spec:'Littérature & Proverbes',  rating:'4.8',students:98, initials:'KF',color:AMB},
                            {name:'Metchezin Francklin',level:'Enfants · Débutant',   spec:'Contes & Culture Medumba',rating:'5.0',students:67, initials:'MF',color:'#0891b2'},
                        ].map((t,i) => (
                            <Reveal key={i} delay={i*.09}>
                                <div className="teacher-card" style={{ background:'#fff',padding:'1.5rem',border:`1.5px solid ${SAND}` }}>
                                    <div style={{ display:'flex',alignItems:'center',gap:'.9rem',marginBottom:'1rem' }}>
                                        <div style={{ width:'46px',height:'46px',borderRadius:'50%',background:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{t.initials}</div>
                                        <div>
                                            <div style={{ fontWeight:800,color:INK,fontSize:'.9rem' }}>{t.name}</div>
                                            <div style={{ fontSize:'.72rem',color:MUTED,fontWeight:500,marginTop:'1px' }}>{t.level}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize:'.78rem',color:INK,fontWeight:600,marginBottom:'.9rem',paddingBottom:'.9rem',borderBottom:`1px solid ${LIGHT}` }}>{t.spec}</div>
                                    <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'1.1rem' }}>
                                        <span style={{ fontSize:'.78rem',color:AMB,fontWeight:700 }}>★ {t.rating}</span>
                                        <span style={{ fontSize:'.75rem',color:MUTED,fontWeight:500 }}>{t.students} élèves</span>
                                    </div>
                                    <button onClick={onStart} style={{ width:'100%',padding:'.6rem',borderRadius:'8px',background:'transparent',color:B,border:`1.5px solid ${B}`,fontWeight:700,fontSize:'.82rem',cursor:'pointer',fontFamily:'inherit',transition:'all .15s' }}
                                        onMouseEnter={e=>{e.currentTarget.style.background=B;e.currentTarget.style.color='#fff';}}
                                        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=B;}}>
                                        Réserver un cours
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
                        <p style={EYEBROW}>Comment ça marche</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem')}>Commencez en 3 étapes.</h2>
                    </Reveal>
                    <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:isMobile?'2rem':'3rem' }}>
                        {[
                            {n:'01',title:'Créez votre profil',   desc:"Choisissez votre niveau et vos objectifs. Aucune carte bancaire requise.",bg:B,   fg:'#fff'},
                            {n:'02',title:'Suivez vos leçons',    desc:"Progressez à votre rythme, gagnez de l'XP et des diamants à chaque bonne réponse.",bg:AMB, fg:'#fff'},
                            {n:'03',title:'Rejoignez une classe', desc:"Réservez un cours live ou regardez un replay avec de vrais enseignants certifiés.",bg:LIGHT,fg:INK,border:true},
                        ].map((s,i) => (
                            <Reveal key={i} delay={i*.1}>
                                <div style={{ display:'flex',flexDirection:isMobile?'row':'column',gap:'1.25rem',alignItems:isMobile?'flex-start':'stretch' }}>
                                    <div style={{ width:'52px',height:'52px',borderRadius:isMobile?'50%':'14px',background:s.bg,border:s.border?`1.5px solid ${SAND}`:'none',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                                        <span style={{ fontFamily:SERIF,fontSize:'1.1rem',fontWeight:700,color:s.fg,letterSpacing:'-.02em' }}>{s.n}</span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize:'.97rem',fontWeight:800,color:INK,marginBottom:'.4rem' }}>{s.title}</h3>
                                        <p style={{ fontSize:'.83rem',color:MUTED,lineHeight:1.72 }}>{s.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3} style={{ marginTop:isMobile?'2.5rem':'3.5rem' }}>
                        <button onClick={onStart} className="lp-btn" style={{ width:isMobile?'100%':'auto' }}>Commencer maintenant — c'est gratuit 🚀</button>
                    </Reveal>
                </div>
            </section>

            {/* ══ TÉMOIGNAGES ══ */}
            <section style={{ background:'#fff',padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2.5rem':'3rem' }}>
                        <p style={EYEBROW}>Témoignages</p>
                        <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem')}>Ce que disent nos apprenants.</h2>
                    </Reveal>
                    {isMobile ? (
                        <div>
                            <div style={{ background:LIGHT,border:`1.5px solid ${SAND}`,borderRadius:'20px',padding:'2rem 1.75rem',animation:'fade-up .4s ease' }} key={activeT}>
                                <div style={{ fontFamily:'Georgia,serif',fontSize:'3.8rem',lineHeight:.75,color:AMB,opacity:.4,marginBottom:'.9rem' }}>"</div>
                                <p style={{ fontSize:'.92rem',lineHeight:1.8,marginBottom:'1.5rem',color:MUTED,fontStyle:'italic' }}>{TESTIMONIALS[activeT].text}</p>
                                <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
                                    <div style={{ width:'38px',height:'38px',borderRadius:'50%',background:TESTIMONIALS[activeT].color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.58rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{TESTIMONIALS[activeT].initials}</div>
                                    <div>
                                        <div style={{ fontWeight:800,fontSize:'.88rem',color:INK }}>{TESTIMONIALS[activeT].name}</div>
                                        <div style={{ fontSize:'.72rem',color:MUTED,fontWeight:500 }}>{TESTIMONIALS[activeT].role}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display:'flex',justifyContent:'center',gap:'.5rem',marginTop:'1.25rem' }}>
                                {TESTIMONIALS.map((_,i) => <div key={i} onClick={() => setActiveT(i)} style={{ width:i===activeT?'22px':'7px',height:'7px',borderRadius:'99px',background:i===activeT?B:SAND,cursor:'pointer',transition:'all .3s' }} />)}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem' }}>
                                {TESTIMONIALS.map((t,i) => (
                                    <Reveal key={i} delay={i*.1}>
                                        <div onClick={() => setActiveT(i)} style={{ background:i===activeT?B:'#fff',border:`1.5px solid ${i===activeT?'transparent':SAND}`,borderRadius:'20px',padding:'2rem 1.75rem',cursor:'pointer',transition:'all .4s cubic-bezier(.16,1,.3,1)',transform:i===activeT?'scale(1.03)':'scale(1)',boxShadow:i===activeT?`0 28px 60px rgba(0,86,210,.28)`:'none' }}>
                                            <div style={{ fontFamily:'Georgia,serif',fontSize:'3.5rem',lineHeight:.75,color:i===activeT?AMB2:`rgba(245,158,11,.28)`,marginBottom:'.9rem' }}>"</div>
                                            <p style={{ fontSize:'.88rem',lineHeight:1.8,marginBottom:'1.5rem',color:i===activeT?'rgba(255,255,255,.85)':MUTED,fontStyle:'italic' }}>{t.text}</p>
                                            <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
                                                <div style={{ width:'38px',height:'38px',borderRadius:'50%',background:i===activeT?'rgba(255,255,255,.15)':t.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.58rem',fontWeight:800,color:'#fff',flexShrink:0 }}>{t.initials}</div>
                                                <div>
                                                    <div style={{ fontWeight:800,fontSize:'.88rem',color:i===activeT?'#fff':INK }}>{t.name}</div>
                                                    <div style={{ fontSize:'.72rem',color:i===activeT?'rgba(255,255,255,.45)':MUTED,fontWeight:500 }}>{t.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                            <div style={{ display:'flex',justifyContent:'center',gap:'.5rem',marginTop:'1.5rem' }}>
                                {TESTIMONIALS.map((_,i) => <div key={i} onClick={() => setActiveT(i)} style={{ width:i===activeT?'22px':'7px',height:'7px',borderRadius:'99px',background:i===activeT?B:SAND,cursor:'pointer',transition:'all .3s' }} />)}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ══ BLOG ══ */}
            <section id="blog" style={{ background:LIGHT,padding:PH }}>
                <div style={{ maxWidth:'1160px',margin:'0 auto' }}>
                    <Reveal style={{ marginBottom:isMobile?'2rem':'3rem' }}>
                        <p style={EYEBROW}>Blog</p>
                        <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'center',gap:'1rem',justifyContent:'space-between' }}>
                            <h2 style={TITLE(isSmall?'2rem':isMobile?'2.4rem':'3rem',{ maxWidth:'420px' })}>Histoires & ressources<br /><em style={{ color:B,fontStyle:'italic' }}>du monde Medumba.</em></h2>
                            <button onClick={onStart} className="lp-btn-ghost" style={{ flexShrink:0 }}>Voir tous les articles</button>
                        </div>
                    </Reveal>
                    <div className="blog-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.25rem' }}>
                        {[
                            { tag:'Culture',    date:'2 juin 2026',    title:'Les 10 proverbes Medumba les plus profonds', desc:"La sagesse bamiléké condensée en quelques mots — et ce qu'ils nous apprennent sur la vie.", color:B,        read:'5 min' },
                            { tag:'Apprendre',  date:'18 mai 2026',   title:'Comment apprendre une langue en 15 min/jour',  desc:"Découvrez la méthode de répétition espacée que nous utilisons dans Medumba.AI.",             color:'#7c3aed', read:'4 min' },
                            { tag:'Histoire',   date:'3 mai 2026',    title:'Bamiléké : histoire et héritage d\'un peuple',  desc:"Qui sont les Bamiléké ? Origines, migrations et traditions d'un peuple aux multiples facettes.", color:'#0891b2', read:'7 min' },
                        ].map((b,i) => (
                            <Reveal key={i} delay={i*.08}>
                                <div className="blog-card" onClick={onStart}>
                                    <div style={{ height:'7px',background:`linear-gradient(90deg,${b.color},${b.color}88)` }} />
                                    <div style={{ padding:'1.5rem' }}>
                                        <div style={{ display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.85rem' }}>
                                            <span style={{ fontSize:'.65rem',fontWeight:700,color:b.color,background:`${b.color}15`,borderRadius:'99px',padding:'2px 8px' }}>{b.tag}</span>
                                            <span style={{ fontSize:'.65rem',color:MUTED }}>{b.date}</span>
                                            <span style={{ fontSize:'.65rem',color:MUTED,marginLeft:'auto' }}>📖 {b.read}</span>
                                        </div>
                                        <h3 style={{ fontSize:'.97rem',fontWeight:800,color:INK,marginBottom:'.5rem',lineHeight:1.4 }}>{b.title}</h3>
                                        <p style={{ fontSize:'.81rem',color:MUTED,lineHeight:1.68 }}>{b.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ TÉLÉCHARGER / ACHAT ══ */}
            <section id="download" style={{ background:B,padding:PH,position:'relative',overflow:'hidden' }}>
                <GeomPattern opacity={0.07} id="geo-dl" />
                <div style={{ position:'absolute',top:'-15%',right:'-3%',width:'50vw',height:'50vw',maxWidth:'560px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 65%)',pointerEvents:'none' }} />

                <div style={{ maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1 }}>
                    <Reveal style={{ textAlign:'center',marginBottom:isMobile?'2.5rem':'3.5rem' }}>
                        <p style={{ ...EYEBROW,color:AMB }}>Télécharger</p>
                        <h2 style={{ fontFamily:SERIF,fontWeight:700,color:'#fff',lineHeight:1.08,letterSpacing:'-.025em',fontSize:isSmall?'2.2rem':isMobile?'2.6rem':'3.2rem',marginBottom:'.9rem' }}>
                            Medumba.AI <em style={{ color:AMB2 }}>dans votre poche.</em>
                        </h2>
                        <p style={{ color:'rgba(255,255,255,.6)',fontSize:isMobile?'.9rem':'1rem',lineHeight:1.8,maxWidth:'460px',margin:'0 auto' }}>
                            Disponible sur Android et iOS — choisissez le plan qui vous convient.
                        </p>
                    </Reveal>

                    {/* Plans tarifaires */}
                    <div className="plans-grid" style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'1.1rem',marginBottom:'3rem' }}>
                        {[
                            {
                                label:'Gratuit', price:'0', unit:'pour toujours', active:activePlan===0,
                                features:['Leçons de base (Unité 1)','Dictionnaire 500 mots','Comptage interactif','5 exercices/jour'],
                                cta:'Télécharger gratuitement', action:onStart,
                            },
                            {
                                label:'Premium', price:'4 990', unit:'XAF / mois', active:activePlan===1, highlight:true,
                                features:['Toutes les leçons & unités','Dictionnaire complet (1 000+)','Calendrier culturel','Vidéos & contes','Classes live avec enseignants','IA vocale & prononciation','Classements & défis'],
                                cta:'Commencer l\'essai gratuit', action:onStart,
                            },
                            {
                                label:'Annuel', price:'39 900', unit:'XAF / an  (-33%)', active:activePlan===2,
                                features:['Tout Premium inclus','2 mois offerts','Support prioritaire','Accès bêta fonctionnalités'],
                                cta:'Souscrire annuellement', action:onStart,
                            },
                        ].map((p,i) => (
                            <div key={i} className={`plan-card${p.active?' active':''}`} onClick={() => setActivePlan(i)}
                                style={{ background:p.highlight&&p.active?B2:p.active?'#fff':'rgba(255,255,255,.07)', border:p.active?`2px solid ${AMB}`:'2px solid rgba(255,255,255,.12)', borderRadius:'20px', padding:'2rem 1.75rem', cursor:'pointer', transition:'all .3s', position:'relative', backdropFilter:'blur(8px)' }}>
                                {p.highlight && <div style={{ position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:AMB,color:'#fff',fontSize:'.65rem',fontWeight:800,borderRadius:'99px',padding:'3px 14px',letterSpacing:'.05em',whiteSpace:'nowrap' }}>⭐ POPULAIRE</div>}
                                <div style={{ marginBottom:'1.25rem' }}>
                                    <div style={{ fontSize:'.72rem',fontWeight:700,color:p.active?AMB:'rgba(255,255,255,.5)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'.4rem' }}>{p.label}</div>
                                    <div style={{ display:'flex',alignItems:'baseline',gap:'.3rem' }}>
                                        <span style={{ fontSize:'2rem',fontWeight:900,color:p.active?INK:'#fff',lineHeight:1 }}>{p.price}</span>
                                        <span style={{ fontSize:'.75rem',color:p.active?MUTED:'rgba(255,255,255,.45)',fontWeight:600 }}>{p.unit}</span>
                                    </div>
                                </div>
                                <div style={{ display:'flex',flexDirection:'column',gap:'.55rem',marginBottom:'1.5rem' }}>
                                    {p.features.map((f,j) => (
                                        <div key={j} style={{ display:'flex',alignItems:'center',gap:'.5rem' }}>
                                            <span style={{ color:p.active?B:'rgba(255,255,255,.5)',fontSize:'.8rem',fontWeight:700,flexShrink:0 }}>✓</span>
                                            <span style={{ fontSize:'.82rem',color:p.active?INK:'rgba(255,255,255,.75)',lineHeight:1.4 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={e=>{e.stopPropagation();p.action();}} className={p.active&&p.highlight?'lp-btn-amber':'lp-btn-ghost'} style={{ width:'100%',justifyContent:'center',background:p.active&&!p.highlight?B:undefined,color:p.active&&!p.highlight?'#fff':undefined,borderColor:p.active&&!p.highlight?B:undefined }}>
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Boutons store */}
                    <Reveal>
                        <div style={{ textAlign:'center',marginBottom:'1.5rem' }}>
                            <p style={{ color:'rgba(255,255,255,.55)',fontSize:'.82rem',marginBottom:'1.25rem' }}>Téléchargez l'application sur votre store :</p>
                            <div className="dl-btns" style={{ display:'flex',gap:'.9rem',justifyContent:'center',flexWrap:'wrap' }}>
                                {[{Ico:IconAndroid,store:'DISPONIBLE SUR',name:'Google Play'},{Ico:IconApple,store:'TÉLÉCHARGER SUR',name:'App Store'}].map((d,i) => (
                                    <div key={i} onClick={onStart} style={{ display:'flex',alignItems:'center',gap:'.85rem',background:'rgba(255,255,255,.09)',backdropFilter:'blur(8px)',border:'1.5px solid rgba(255,255,255,.14)',borderRadius:'10px',padding:'.85rem 1.4rem',cursor:'pointer',transition:'all .18s' }}
                                        onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.15)';e.currentTarget.style.transform='translateY(-2px)';}}
                                        onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.09)';e.currentTarget.style.transform='';}}>
                                        <div style={{ color:'rgba(255,255,255,.65)',flexShrink:0 }}><d.Ico /></div>
                                        <div>
                                            <div style={{ fontSize:'.5rem',color:'rgba(255,255,255,.35)',fontWeight:600,letterSpacing:'.5px',marginBottom:'1px' }}>{d.store}</div>
                                            <div style={{ fontSize:'.98rem',fontWeight:800,color:'#fff',lineHeight:1 }}>{d.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p style={{ textAlign:'center',fontSize:'.72rem',color:'rgba(255,255,255,.25)',fontWeight:500 }}>Android juillet 2026 · iOS via TestFlight (bêta)</p>
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
                            <p style={{ fontSize:'.76rem',lineHeight:1.8 }}>Juillet 2026 · La langue Medumba, accessible à tous.</p>
                        </div>
                        <div style={{ display:'flex',gap:isMobile?'1.25rem':'2.5rem',flexWrap:'wrap' }}>
                            {NAVLINKS.map(([id,l]) => (
                                <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'.82rem',cursor:'pointer',fontWeight:600,transition:'color .15s' }}
                                    onMouseEnter={e=>e.target.style.color='rgba(248,250,252,.8)'}
                                    onMouseLeave={e=>e.target.style.color='rgba(248,250,252,.38)'}>{l}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.75rem' }}>
                        <span style={{ fontSize:'.72rem' }}>© 2026 Medumba.AI · Tous droits réservés</span>
                        <span style={{ fontSize:'.72rem' }}>Fait avec soin pour la communauté Medumba</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
