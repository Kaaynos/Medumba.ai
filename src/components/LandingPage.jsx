import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

const B  = '#0056D2';
const B2 = '#0041a3';
const A  = '#f59e0b';

function useReveal(threshold = 0.12) {
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

function Counter({ target, suffix = '', duration = 1600 }) {
    const [val, setVal] = useState(0);
    const [ref, visible] = useReveal(0.3);
    useEffect(() => {
        if (!visible) return;
        let v = 0;
        const step = target / (duration / 16);
        const t = setInterval(() => {
            v += step;
            if (v >= target) { setVal(target); clearInterval(t); }
            else setVal(Math.floor(v));
        }, 16);
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
            transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
            ...style,
        }}>{children}</div>
    );
}

function Wave({ topColor = '#fff', bottomColor = '#f8fafc' }) {
    return (
        <div style={{ background: bottomColor, lineHeight: 0, marginTop: '-2px' }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
                <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill={topColor} />
            </svg>
        </div>
    );
}

export default function LandingPage({ onStart, onLogin }) {
    const [menuOpen, setMenuOpen]   = useState(false);
    const [scrolled, setScrolled]   = useState(false);
    const [vw,       setVw]         = useState(() => window.innerWidth);
    const [activeT,  setActiveT]    = useState(0);

    const isMobile = vw < 768;
    const isSmall  = vw < 480;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveT(p => (p + 1) % 3), 4500);
        return () => clearInterval(t);
    }, []);

    const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

    const TESTIMONIALS = [
        { name: 'Amélie K.',       role: 'Diaspora camerounaise, Paris', avatar: '👩🏾', text: "Grâce à Medumba.AI j'ai pu parler avec ma grand-mère pour la première fois en Medumba. Les leçons sont courtes et vraiment efficaces !" },
        { name: 'Marc-Aurèle T.', role: 'Étudiant, Yaoundé',            avatar: '👨🏿', text: "Le système de combo et les XP m'ont accroché dès le premier jour. C'est comme un jeu — mais j'apprends vraiment !" },
        { name: 'Sophie N.',       role: 'Enseignante, Bafoussam',       avatar: '👩🏿', text: "Les classes en ligne avec les enseignants CEPOM sont d'une qualité exceptionnelle. Je recommande à tous mes élèves." },
    ];

    /* ── reusable styles ── */
    const P = isMobile ? '2.5rem 1.1rem' : '5rem 3.5rem';
    const sectionTitle = { fontSize: isSmall ? '1.6rem' : isMobile ? '1.9rem' : '2.5rem', fontWeight: 900, color: '#0f172a' };

    return (
        <div style={{ fontFamily: "'Outfit',system-ui,sans-serif", color: '#0f172a', background: '#fff', overflowX: 'hidden' }}>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                @keyframes float-a   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
                @keyframes float-b   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-9px)} }
                @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.6)} }
                @keyframes shimmer   { 0%{background-position:-250% center} 100%{background-position:250% center} }
                @keyframes glow-ring { 0%,100%{box-shadow:0 0 0 0 rgba(0,86,210,.35)} 50%{box-shadow:0 0 0 20px rgba(0,86,210,0)} }
                @keyframes slide-in  { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
                @keyframes fade-up   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

                .lp-btn-primary {
                    display:inline-flex; align-items:center; justify-content:center;
                    padding:.8rem 1.8rem; border-radius:99px;
                    background:linear-gradient(135deg,${B},#0891b2);
                    color:#fff; border:none; font-weight:800; font-size:.95rem;
                    cursor:pointer; font-family:inherit; white-space:nowrap;
                    box-shadow:0 6px 24px rgba(0,86,210,.35);
                    transition:transform .18s,box-shadow .18s;
                }
                .lp-btn-primary:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,86,210,.45); }
                .lp-btn-primary:active { transform:translateY(0); }

                .lp-btn-ghost {
                    display:inline-flex; align-items:center; justify-content:center;
                    padding:.8rem 1.8rem; border-radius:99px;
                    background:#fff; color:${B}; border:2.5px solid ${B};
                    font-weight:800; font-size:.95rem; cursor:pointer; font-family:inherit; white-space:nowrap;
                    transition:all .18s;
                }
                .lp-btn-ghost:hover { background:#eff6ff; transform:translateY(-2px); }

                .feat-card {
                    background:#fff; border-radius:20px; padding:1.6rem 1.4rem;
                    border:2px solid #e2e8f0; box-shadow:0 2px 16px rgba(0,0,0,.05);
                    transition:transform .25s,box-shadow .25s; height:100%;
                }
                .feat-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,86,210,.13); }

                .class-card { transition:transform .2s; border-radius:22px; overflow:hidden; }
                .class-card:hover { transform:translateY(-5px); }

                .teacher-card { transition:transform .2s,box-shadow .2s; border-radius:22px; }
                .teacher-card:hover { transform:translateY(-5px); box-shadow:0 16px 36px rgba(0,0,0,.11); }

                .dl-btn { transition:transform .2s,box-shadow .2s; }
                .dl-btn:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(0,0,0,.25) !important; }

                .nav-link { cursor:pointer; color:#475569; font-weight:600; font-size:.9rem; transition:color .15s; }
                .nav-link:hover { color:${B}; }

                ::-webkit-scrollbar { width:5px; }
                ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }

                @media (max-width:480px) {
                    .hero-ctas { flex-direction:column !important; }
                    .hero-ctas button, .hero-ctas .lp-btn-ghost { width:100% !important; }
                    .stats-grid { grid-template-columns:1fr 1fr !important; gap:.75rem !important; }
                    .feat-grid  { grid-template-columns:1fr !important; }
                    .class-types-grid { grid-template-columns:1fr 1fr !important; }
                    .teachers-grid { grid-template-columns:1fr !important; }
                    .dl-buttons { flex-direction:column !important; }
                    .dl-buttons > div { width:100% !important; }
                }

                @media (min-width:481px) and (max-width:767px) {
                    .feat-grid { grid-template-columns:1fr 1fr !important; }
                    .class-types-grid { grid-template-columns:1fr 1fr !important; }
                }

                @media (min-width:768px) and (max-width:1023px) {
                    .feat-grid { grid-template-columns:repeat(3,1fr) !important; }
                    .class-types-grid { grid-template-columns:repeat(4,1fr) !important; }
                    .teachers-grid { grid-template-columns:repeat(3,1fr) !important; }
                }
            `}</style>

            {/* ══════ NAVBAR ══════ */}
            <nav style={{
                position:'fixed', top:0, left:0, right:0, zIndex:200,
                background: scrolled ? 'rgba(255,255,255,.97)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
                transition:'all .3s',
                padding: isMobile ? '.8rem 1.1rem' : '.8rem 3.5rem',
                display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.55rem', cursor:'pointer' }} onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
                    <img src={logo} alt="" style={{ width:'30px' }} />
                    <span style={{ fontWeight:900, fontSize:'1.1rem', color:B }}>Medumba<span style={{ color:A }}>.AI</span></span>
                </div>

                {!isMobile && (
                    <div style={{ display:'flex', gap:'2.5rem' }}>
                        {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,l]) => (
                            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{l}</span>
                        ))}
                    </div>
                )}

                <div style={{ display:'flex', gap:'.55rem', alignItems:'center' }}>
                    <button onClick={onLogin} style={{
                        padding:'.45rem 1.1rem', borderRadius:'99px',
                        border:`2px solid ${B}`, background:'transparent', color:B,
                        fontWeight:700, fontSize:'.82rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background='#eff6ff'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >Se connecter</button>
                    {!isMobile && (
                        <button onClick={onStart} className="lp-btn-primary" style={{ padding:'.48rem 1.2rem', fontSize:'.83rem' }}>
                            Commencer ✦
                        </button>
                    )}
                    {isMobile && (
                        <button onClick={() => setMenuOpen(m => !m)} style={{ background:'none', border:'none', fontSize:'1.35rem', cursor:'pointer', color:'#0f172a', padding:'.2rem' }}>
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile drawer */}
            {isMobile && menuOpen && (
                <div style={{
                    position:'fixed', top:'56px', inset:'56px 0 0', zIndex:199,
                    background:'rgba(255,255,255,.98)', backdropFilter:'blur(12px)',
                    padding:'1.75rem 1.25rem', display:'flex', flexDirection:'column', gap:'1.1rem',
                    animation:'slide-in .25s ease',
                }}>
                    {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,l]) => (
                        <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'1.05rem', fontWeight:700, color:'#0f172a', cursor:'pointer', padding:'.5rem 0', borderBottom:'1px solid #f1f5f9' }}>{l}</span>
                    ))}
                    <button onClick={onStart} className="lp-btn-primary" style={{ marginTop:'.5rem', width:'100%' }}>Commencer gratuitement ✦</button>
                </div>
            )}

            {/* ══════ HERO ══════ */}
            <section style={{
                minHeight: '100vh',
                background:'linear-gradient(145deg,#e8f0fe 0%,#dbeafe 40%,#ede9fe 70%,#fce7f3 100%)',
                display:'flex', alignItems:'center', justifyContent:'center',
                padding: isSmall ? '5.5rem .9rem 3rem' : isMobile ? '5.5rem 1.25rem 3.5rem' : '7rem 3.5rem 4rem',
                position:'relative', overflow:'hidden',
            }}>
                {/* Background blobs */}
                <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,86,210,.1) 0%,transparent 70%)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,.1) 0%,transparent 70%)', pointerEvents:'none' }} />

                {/* Floating badges — desktop only */}
                {!isMobile && (
                    <>
                        <div style={{ position:'absolute', top:'20%', right:'7%', animation:'float-a 5s ease-in-out infinite', zIndex:2 }}>
                            <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 28px rgba(0,0,0,.1)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #e0f2fe' }}>
                                <span style={{ fontSize:'1.2rem' }}>🔥</span>
                                <div><div style={{ fontSize:'.65rem', color:'#64748b', fontWeight:600 }}>Streak</div><div style={{ fontSize:'.88rem', fontWeight:800, color:'#d97706' }}>7 jours</div></div>
                            </div>
                        </div>
                        <div style={{ position:'absolute', top:'45%', left:'4%', animation:'float-b 6s ease-in-out infinite', zIndex:2 }}>
                            <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 28px rgba(0,0,0,.1)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #dcfce7' }}>
                                <span style={{ fontSize:'1.2rem' }}>⚡</span>
                                <div><div style={{ fontSize:'.65rem', color:'#64748b', fontWeight:600 }}>XP Gagné</div><div style={{ fontSize:'.88rem', fontWeight:800, color:B }}>+340 XP</div></div>
                            </div>
                        </div>
                        <div style={{ position:'absolute', bottom:'25%', right:'6%', animation:'float-a 7s ease-in-out infinite 1.5s', zIndex:2 }}>
                            <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 28px rgba(0,0,0,.1)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #fef3c7' }}>
                                <span style={{ fontSize:'1.2rem' }}>💎</span>
                                <div><div style={{ fontSize:'.65rem', color:'#64748b', fontWeight:600 }}>Diamants</div><div style={{ fontSize:'.88rem', fontWeight:800, color:'#d97706' }}>50</div></div>
                            </div>
                        </div>
                    </>
                )}

                <div style={{ maxWidth:'1140px', width:'100%', display:'flex', flexDirection: isMobile?'column':'row', alignItems:'center', gap: isMobile?'2.5rem':'5rem', zIndex:3 }}>
                    {/* Left */}
                    <div style={{ flex:1, minWidth:0 }}>
                        <Reveal>
                            <div style={{ display:'inline-flex', alignItems:'center', gap:'.45rem', background:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:'2px solid #bfdbfe', borderRadius:'99px', padding:'.3rem .9rem', marginBottom:'1.25rem', maxWidth:'100%' }}>
                                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', animation:'pulse-dot 1.8s ease-in-out infinite', display:'inline-block', flexShrink:0 }} />
                                <span style={{ fontSize: isSmall?'.72rem':'.78rem', fontWeight:700, color:B, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>2 847 apprenants actifs cette semaine</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 style={{ ...sectionTitle, fontSize: isSmall?'1.9rem':isMobile?'2.3rem':'3.4rem', lineHeight:1.1, marginBottom:'1rem' }}>
                                Apprenez le{' '}
                                <span style={{
                                    background:`linear-gradient(90deg,${B},${A},#7c3aed,${B})`,
                                    backgroundSize:'300% auto', WebkitBackgroundClip:'text',
                                    WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite',
                                    display:'inline-block',
                                }}>Medumba</span>
                                <br />en 5 min par jour
                            </h1>
                        </Reveal>

                        <Reveal delay={0.18}>
                            <p style={{ fontSize: isSmall?'.9rem':isMobile?'.95rem':'1.05rem', color:'#475569', lineHeight:1.7, marginBottom:'1.75rem', maxWidth:'480px' }}>
                                La première app d'apprentissage de la langue Medumba — leçons gamifiées, classes live avec des enseignants certifiés CEPOM, et IA vocale.
                            </p>
                        </Reveal>

                        <Reveal delay={0.26}>
                            <div className="hero-ctas" style={{ display:'flex', gap:'.75rem', marginBottom:'2rem', flexWrap:'wrap' }}>
                                <button onClick={onStart} className="lp-btn-primary">🚀 Commencer gratuitement</button>
                                <button onClick={() => scrollTo('classes')} className="lp-btn-ghost">🎓 Voir les classes</button>
                            </div>
                        </Reveal>

                        <Reveal delay={0.34}>
                            <div style={{ display:'flex', gap: isSmall?'1.25rem':'2rem', flexWrap:'wrap' }}>
                                {[['17+','Leçons'],['3','Unités'],['100%','Gratuit'],['🇨🇲','Medumba']].map(([n,l]) => (
                                    <div key={l}>
                                        <div style={{ fontSize: isSmall?'1.3rem':'1.5rem', fontWeight:900, color:B }}>{n}</div>
                                        <div style={{ fontSize:'.72rem', color:'#64748b', fontWeight:600, marginTop:'1px' }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Phone mockup */}
                    <Reveal delay={0.12} direction="left" style={{ flexShrink:0 }}>
                        <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
                            <div style={{ position:'absolute', inset:'-16px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,86,210,.18) 0%,transparent 70%)', animation:'glow-ring 3s ease-in-out infinite', pointerEvents:'none' }} />
                            <div style={{
                                width: isSmall?'170px':isMobile?'195px':'250px',
                                aspectRatio:'9/19.5', borderRadius:'36px',
                                background:`linear-gradient(160deg,${B2},${B},#0891b2)`,
                                boxShadow:`0 36px 90px rgba(0,86,210,.4),0 0 0 5px rgba(255,255,255,.85),0 0 0 9px rgba(0,86,210,.12)`,
                                display:'flex', flexDirection:'column', alignItems:'center',
                                padding:'1.25rem .9rem .9rem', position:'relative', overflow:'hidden',
                                animation:'float-a 5s ease-in-out infinite',
                            }}>
                                <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', width:'50px', height:'4px', borderRadius:'99px', background:'rgba(0,0,0,.22)' }} />
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 70% 12%,rgba(255,255,255,.16) 0%,transparent 55%)', pointerEvents:'none' }} />
                                <img src={logo} alt="" style={{ width:'38px', marginTop:'.4rem', marginBottom:'.5rem', filter:'brightness(0) invert(1)' }} />
                                <div style={{ color:'#fff', fontWeight:900, fontSize:'1rem', marginBottom:'.15rem' }}>Medumba.AI</div>
                                <div style={{ color:'rgba(255,255,255,.65)', fontSize:'.62rem', fontWeight:600, marginBottom:'1.2rem' }}>Apprenez. Pratiquez. Maîtrisez.</div>
                                <div style={{ width:'100%', background:'rgba(255,255,255,.16)', backdropFilter:'blur(8px)', borderRadius:'14px', padding:'.75rem', marginBottom:'.5rem', border:'1.5px solid rgba(255,255,255,.22)' }}>
                                    <div style={{ fontSize:'.55rem', color:'rgba(255,255,255,.6)', fontWeight:700, letterSpacing:'.4px', marginBottom:'.25rem' }}>📖 MOT DU JOUR</div>
                                    <div style={{ fontSize:'1rem', color:'#fff', fontWeight:900 }}>Ó tsɑ̌ʼ nə?</div>
                                    <div style={{ fontSize:'.62rem', color:'rgba(255,255,255,.75)', marginTop:'1px' }}>Comment vas-tu ?</div>
                                </div>
                                <div style={{ width:'100%', background:'rgba(255,255,255,.1)', borderRadius:'99px', height:'5px', marginBottom:'.5rem', overflow:'hidden' }}>
                                    <div style={{ width:'68%', height:'100%', background:`linear-gradient(90deg,${A},#fbbf24)`, borderRadius:'99px' }} />
                                </div>
                                <div style={{ display:'flex', gap:'.3rem', flexWrap:'wrap', justifyContent:'center' }}>
                                    {['🔥 7j','⚡ 340 XP','💎 50'].map(s => (
                                        <div key={s} style={{ background:'rgba(255,255,255,.18)', borderRadius:'99px', padding:'.18rem .55rem', fontSize:'.58rem', fontWeight:700, color:'#fff' }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Wave topColor="transparent" bottomColor="#fff" />

            {/* ══════ STATS ══════ */}
            <section style={{ background:'#fff', padding: isMobile?'2rem 1.1rem':'2.5rem 3.5rem' }}>
                <Reveal>
                    <div className="stats-grid" style={{ maxWidth:'860px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', textAlign:'center' }}>
                        {[
                            { target:2847, suffix:'+', label:'Apprenants actifs', emoji:'👥', bg:'#eff6ff' },
                            { target:17,   suffix:'',  label:'Leçons interactives', emoji:'📚', bg:'#f0fdf4' },
                            { target:3,    suffix:'',  label:'Enseignants CEPOM', emoji:'🎓', bg:'#fef3c7' },
                            { target:100,  suffix:'%', label:"Gratuit d'accès", emoji:'🎁', bg:'#fdf4ff' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding:isMobile?'1rem .75rem':'1.25rem', borderRadius:'18px', background:`linear-gradient(135deg,${s.bg},#fff)`, border:'2px solid #f1f5f9' }}>
                                <div style={{ fontSize:isMobile?'1.25rem':'1.4rem', marginBottom:'.25rem' }}>{s.emoji}</div>
                                <div style={{ fontSize:isMobile?'1.5rem':'1.9rem', fontWeight:900, color:B, lineHeight:1 }}>
                                    <Counter target={s.target} suffix={s.suffix} />
                                </div>
                                <div style={{ fontSize:isSmall?'.62rem':'.74rem', color:'#64748b', fontWeight:600, marginTop:'4px', lineHeight:1.3 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            <Wave topColor="#fff" bottomColor="#f8fafc" />

            {/* ══════ FEATURES ══════ */}
            <section id="features" style={{ background:'#f8fafc', padding: P }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#eff6ff,#dbeafe)', borderRadius:'99px', padding:'.3rem 1rem', marginBottom:'.65rem' }}>
                            <span style={{ fontSize:'.74rem', fontWeight:800, color:B, letterSpacing:'1px' }}>✦ POURQUOI MEDUMBA.AI</span>
                        </div>
                        <h2 style={sectionTitle}>Tout pour maîtriser le Medumba</h2>
                        <p style={{ color:'#64748b', fontSize: isMobile?'.92rem':'1rem', maxWidth:'480px', margin:'.65rem auto 0', lineHeight:1.7 }}>
                            Une expérience pensée pour les apprenants modernes — interactive, culturelle et efficace.
                        </p>
                    </Reveal>

                    <div className="feat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.1rem' }}>
                        {[
                            { emoji:'🎮', title:'Leçons gamifiées',      desc:'XP, streaks, diamants et combo. Restez motivé grâce à un système de récompenses addictif.',    bg:'linear-gradient(135deg,#eff6ff,#dbeafe)' },
                            { emoji:'🎙', title:'Prononciation vocale',   desc:"Enregistrez votre voix, l'IA analyse votre prononciation et vous donne un score instantané.",  bg:'linear-gradient(135deg,#fef3c7,#fef9c3)' },
                            { emoji:'📚', title:'Dictionnaire enrichi',   desc:'Medumba–Français avec traducteur IA, expressions courantes et exemples contextuels.',           bg:'linear-gradient(135deg,#dcfce7,#f0fdf4)' },
                            { emoji:'🌙', title:'Dark & Light mode',      desc:'Interface claire ou sombre selon vos préférences. Votre confort visuel, toujours.',             bg:'linear-gradient(135deg,#f1f5f9,#e2e8f0)' },
                            { emoji:'🏆', title:'Classement & Défis',     desc:'Comparez-vous chaque semaine, relevez des défis quotidiens et grimpez dans le classement.',     bg:'linear-gradient(135deg,#fefce8,#fef3c7)' },
                            { emoji:'🎬', title:'Vidéos & Culture',       desc:"Tutoriels vidéo, musique traditionnelle et culture bamiléké — la langue et l'âme ensemble.",   bg:'linear-gradient(135deg,#fdf4ff,#ede9fe)' },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i * 0.06}>
                                <div className="feat-card">
                                    <div style={{ width:'52px', height:'52px', borderRadius:'16px', background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', marginBottom:'.9rem' }}>{f.emoji}</div>
                                    <h3 style={{ fontSize:'.98rem', fontWeight:800, color:'#0f172a', marginBottom:'.4rem' }}>{f.title}</h3>
                                    <p style={{ fontSize:'.82rem', color:'#64748b', lineHeight:1.65 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Wave topColor="#f8fafc" bottomColor="#fff" />

            {/* ══════ CLASSES ══════ */}
            <section id="classes" style={{ background:'#fff', padding: P }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#fdf4ff,#ede9fe)', borderRadius:'99px', padding:'.3rem 1rem', marginBottom:'.65rem' }}>
                            <span style={{ fontSize:'.74rem', fontWeight:800, color:'#7c3aed', letterSpacing:'1px' }}>🎓 CLASSES EN LIGNE</span>
                        </div>
                        <h2 style={sectionTitle}>Apprenez avec de vrais enseignants</h2>
                        <p style={{ color:'#64748b', fontSize: isMobile?'.92rem':'1rem', maxWidth:'500px', margin:'.65rem auto 0', lineHeight:1.7 }}>
                            Des cours animés par des enseignants certifiés CEPOM — live, replay ou en 1-à-1.
                        </p>
                    </Reveal>

                    <div className="class-types-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'3rem' }}>
                        {[
                            { emoji:'📡', title:'Classes Live',      desc:'En direct, max 30', grad:'linear-gradient(145deg,#0056D2,#0891b2)' },
                            { emoji:'🎬', title:'Replay',            desc:'Archives illimitées', grad:'linear-gradient(145deg,#7c3aed,#a855f7)' },
                            { emoji:'👤', title:'Cours Particuliers',desc:'Sessions 1-à-1',      grad:'linear-gradient(145deg,#d97706,#f59e0b)' },
                            { emoji:'🏛', title:'Ateliers Culturels',desc:'Contes & musique',    grad:'linear-gradient(145deg,#15803d,#22c55e)' },
                        ].map((c, i) => (
                            <Reveal key={i} delay={i * 0.07}>
                                <div className="class-card" style={{ padding:'1.5rem 1.25rem', background:c.grad, color:'#fff', boxShadow:'0 10px 28px rgba(0,0,0,.14)', height:'100%' }}>
                                    <div style={{ fontSize:isMobile?'1.8rem':'2rem', marginBottom:'.6rem' }}>{c.emoji}</div>
                                    <div style={{ fontWeight:800, fontSize:isMobile?'.88rem':'.95rem', marginBottom:'.3rem' }}>{c.title}</div>
                                    <div style={{ fontSize:'.75rem', opacity:.85, lineHeight:1.4 }}>{c.desc}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal style={{ textAlign:'center', marginBottom:'1.5rem' }}>
                        <h3 style={{ fontSize: isMobile?'1.1rem':'1.25rem', fontWeight:800, color:'#0f172a' }}>Nos enseignants certifiés CEPOM</h3>
                    </Reveal>
                    <div className="teachers-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
                        {[
                            { name:'Prof. Kamgaing J.', level:'Débutant · Intermédiaire', spec:'Grammaire & Phonologie',    rating:'4.9', students:142, avatar:'👨🏿‍🏫', border:'#bfdbfe', bg:'#eff6ff' },
                            { name:'Dr. Feudjio M.',     level:'Intermédiaire · Avancé',  spec:'Littérature & Proverbes',    rating:'4.8', students:98,  avatar:'👩🏾‍🏫', border:'#ddd6fe', bg:'#fdf4ff' },
                            { name:'Mme. Nkouindji A.', level:'Enfants · Débutant',       spec:'Contes & Culture Medumba',  rating:'5.0', students:67,  avatar:'👩🏿‍🎓', border:'#bbf7d0', bg:'#f0fdf4' },
                        ].map((t, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="teacher-card" style={{ background:'#fff', padding:'1.5rem', border:`2px solid ${t.border}`, boxShadow:'0 3px 16px rgba(0,0,0,.05)' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:'.85rem', marginBottom:'.85rem' }}>
                                        <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.7rem', flexShrink:0, border:`2px solid ${t.border}` }}>{t.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight:800, color:'#0f172a', fontSize:'.92rem' }}>{t.name}</div>
                                            <div style={{ fontSize:'.72rem', color:'#64748b', fontWeight:600 }}>{t.level}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize:'.8rem', color:'#475569', fontWeight:600, marginBottom:'.85rem' }}>✦ {t.spec}</div>
                                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                                        <span style={{ fontSize:'.78rem', color:'#ca8a04', fontWeight:700 }}>⭐ {t.rating}</span>
                                        <span style={{ fontSize:'.75rem', color:'#64748b', fontWeight:600 }}>👥 {t.students} élèves</span>
                                    </div>
                                    <button onClick={onStart} style={{
                                        width:'100%', padding:'.6rem', borderRadius:'12px',
                                        background:`linear-gradient(135deg,${B},#0891b2)`,
                                        color:'#fff', border:'none', fontWeight:700, fontSize:'.82rem',
                                        cursor:'pointer', fontFamily:'inherit', transition:'transform .15s',
                                        boxShadow:`0 4px 14px rgba(0,86,210,.28)`,
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                                        onMouseLeave={e => e.currentTarget.style.transform='none'}
                                    >Réserver un cours →</button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Wave topColor="#fff" bottomColor="#f8fafc" />

            {/* ══════ HOW ══════ */}
            <section id="how" style={{ background:'#f8fafc', padding: P }}>
                <div style={{ maxWidth:'860px', margin:'0 auto', textAlign:'center' }}>
                    <Reveal>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#fef9c3,#fde68a)', borderRadius:'99px', padding:'.3rem 1rem', marginBottom:'.65rem' }}>
                            <span style={{ fontSize:'.74rem', fontWeight:800, color:'#92400e', letterSpacing:'1px' }}>✦ COMMENT ÇA MARCHE</span>
                        </div>
                        <h2 style={{ ...sectionTitle, marginBottom:'.6rem' }}>Commencez en 3 étapes</h2>
                        <p style={{ color:'#64748b', fontSize: isMobile?'.9rem':'.98rem', marginBottom: isMobile?'2rem':'3rem', lineHeight:1.7 }}>Simple, rapide, efficace.</p>
                    </Reveal>

                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap: isMobile?'1.5rem':'2rem', position:'relative' }}>
                        {!isMobile && (
                            <>
                                <div style={{ position:'absolute', top:'35px', left:'34%', width:'32%', height:'2px', backgroundImage:`repeating-linear-gradient(90deg,${B} 0,${B} 7px,transparent 7px,transparent 14px)`, zIndex:0 }} />
                                <div style={{ position:'absolute', top:'35px', left:'67%', width:'32%', height:'2px', backgroundImage:`repeating-linear-gradient(90deg,${B} 0,${B} 7px,transparent 7px,transparent 14px)`, zIndex:0 }} />
                            </>
                        )}
                        {[
                            { n:'01', emoji:'🎯', title:'Créez votre profil',    desc:"Choisissez votre niveau et vos objectifs en quelques secondes.", col:'linear-gradient(135deg,#0056D2,#0891b2)' },
                            { n:'02', emoji:'📖', title:'Suivez vos leçons',     desc:"Progressez, gagnez de l'XP et des diamants à chaque bonne réponse.", col:'linear-gradient(135deg,#7c3aed,#a855f7)' },
                            { n:'03', emoji:'🎓', title:'Rejoignez une classe',  desc:"Réservez un cours live ou regardez un replay avec de vrais enseignants.", col:'linear-gradient(135deg,#15803d,#22c55e)' },
                        ].map((s, i) => (
                            <Reveal key={i} delay={i * 0.1} style={{ zIndex:1 }}>
                                <div style={{ display:'flex', flexDirection: isMobile?'row':'column', alignItems: isMobile?'flex-start':'center', gap: isMobile?'1rem':'1rem', textAlign: isMobile?'left':'center' }}>
                                    <div style={{ width:'68px', height:'68px', borderRadius:'50%', background:s.col, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', boxShadow:'0 8px 24px rgba(0,0,0,.16)', flexShrink:0, border:'4px solid #f8fafc' }}>{s.emoji}</div>
                                    <div>
                                        <div style={{ fontSize:'.68rem', fontWeight:800, color:B, letterSpacing:'1px', marginBottom:'.3rem' }}>ÉTAPE {s.n}</div>
                                        <h3 style={{ fontSize:'.98rem', fontWeight:800, color:'#0f172a', marginBottom:'.35rem' }}>{s.title}</h3>
                                        <p style={{ fontSize:'.82rem', color:'#64748b', lineHeight:1.65 }}>{s.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <button onClick={onStart} className="lp-btn-primary" style={{ marginTop: isMobile?'2rem':'3rem', width: isMobile?'100%':'auto' }}>
                            Commencer maintenant — c'est gratuit 🚀
                        </button>
                    </Reveal>
                </div>
            </section>

            <Wave topColor="#f8fafc" bottomColor="#fff" />

            {/* ══════ TESTIMONIALS ══════ */}
            <section style={{ background:'#fff', padding: P, overflow:'hidden' }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#dcfce7,#bbf7d0)', borderRadius:'99px', padding:'.3rem 1rem', marginBottom:'.65rem' }}>
                            <span style={{ fontSize:'.74rem', fontWeight:800, color:'#15803d', letterSpacing:'1px' }}>💬 ILS EN PARLENT</span>
                        </div>
                        <h2 style={sectionTitle}>Ce que disent nos apprenants</h2>
                    </Reveal>

                    {/* Mobile: single card carousel */}
                    {isMobile ? (
                        <div>
                            <div style={{ borderRadius:'22px', padding:'1.75rem 1.5rem', background:`linear-gradient(135deg,${B},#0891b2)`, color:'#fff', boxShadow:'0 16px 40px rgba(0,86,210,.28)', animation:'fade-up .4s ease' }} key={activeT}>
                                <div style={{ fontSize:'1.2rem', marginBottom:'.85rem' }}>{'⭐'.repeat(5)}</div>
                                <p style={{ fontSize:'.9rem', lineHeight:1.7, marginBottom:'1.25rem', color:'rgba(255,255,255,.92)' }}>"{TESTIMONIALS[activeT].text}"</p>
                                <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                                    <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>{TESTIMONIALS[activeT].avatar}</div>
                                    <div>
                                        <div style={{ fontWeight:800, fontSize:'.88rem' }}>{TESTIMONIALS[activeT].name}</div>
                                        <div style={{ fontSize:'.72rem', opacity:.7, fontWeight:600 }}>{TESTIMONIALS[activeT].role}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display:'flex', justifyContent:'center', gap:'.5rem', marginTop:'1.25rem' }}>
                                {TESTIMONIALS.map((_, i) => (
                                    <div key={i} onClick={() => setActiveT(i)} style={{ width: i===activeT?'22px':'8px', height:'8px', borderRadius:'99px', background: i===activeT?B:'#cbd5e1', cursor:'pointer', transition:'all .3s' }} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
                                {TESTIMONIALS.map((t, i) => (
                                    <Reveal key={i} delay={i * 0.1}>
                                        <div onClick={() => setActiveT(i)} style={{
                                            borderRadius:'22px', padding:'1.75rem 1.5rem',
                                            background: i===activeT ? `linear-gradient(135deg,${B},#0891b2)` : '#f8fafc',
                                            border: i===activeT ? 'none' : '2px solid #e2e8f0',
                                            boxShadow: i===activeT ? '0 18px 48px rgba(0,86,210,.28)' : '0 3px 14px rgba(0,0,0,.05)',
                                            color: i===activeT ? '#fff' : '#0f172a',
                                            transform: i===activeT ? 'scale(1.03)' : 'scale(1)',
                                            transition:'all .45s ease', cursor:'pointer',
                                        }}>
                                            <div style={{ fontSize:'1.2rem', marginBottom:'.85rem' }}>{'⭐'.repeat(t.stars)}</div>
                                            <p style={{ fontSize:'.88rem', lineHeight:1.7, marginBottom:'1.25rem', color: i===activeT?'rgba(255,255,255,.9)':'#475569' }}>"{t.text}"</p>
                                            <div style={{ display:'flex', alignItems:'center', gap:'.7rem' }}>
                                                <div style={{ width:'40px', height:'40px', borderRadius:'50%', background: i===activeT?'rgba(255,255,255,.2)':'#eff6ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.35rem' }}>{t.avatar}</div>
                                                <div>
                                                    <div style={{ fontWeight:800, fontSize:'.88rem' }}>{t.name}</div>
                                                    <div style={{ fontSize:'.72rem', opacity:.7, fontWeight:600 }}>{t.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                            <div style={{ display:'flex', justifyContent:'center', gap:'.5rem', marginTop:'1.5rem' }}>
                                {TESTIMONIALS.map((_, i) => (
                                    <div key={i} onClick={() => setActiveT(i)} style={{ width: i===activeT?'22px':'8px', height:'8px', borderRadius:'99px', background: i===activeT?B:'#cbd5e1', cursor:'pointer', transition:'all .3s' }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ══════ DOWNLOAD ══════ */}
            <section id="download" style={{
                background:`linear-gradient(145deg,${B2} 0%,${B} 45%,#0891b2 100%)`,
                padding: P, position:'relative', overflow:'hidden',
            }}>
                <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,.07) 0%,transparent 70%)', pointerEvents:'none' }} />

                <div style={{ maxWidth:'1000px', margin:'0 auto', display:'flex', flexDirection: isMobile?'column':'row', alignItems:'center', gap: isMobile?'2.5rem':'4rem', position:'relative', zIndex:1 }}>
                    <div style={{ flex:1 }}>
                        <Reveal>
                            <div style={{ display:'inline-block', background:'rgba(255,255,255,.14)', borderRadius:'99px', padding:'.3rem 1rem', marginBottom:'.9rem', border:'1px solid rgba(255,255,255,.25)' }}>
                                <span style={{ fontSize:'.74rem', fontWeight:800, color:'rgba(255,255,255,.9)', letterSpacing:'1px' }}>📱 TÉLÉCHARGER</span>
                            </div>
                            <h2 style={{ fontSize: isSmall?'1.7rem':isMobile?'2rem':'2.6rem', fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:'.9rem' }}>
                                Medumba.AI<br />dans votre poche
                            </h2>
                            <p style={{ color:'rgba(255,255,255,.8)', fontSize: isMobile?'.9rem':'1rem', lineHeight:1.75, marginBottom:'2rem', maxWidth:'400px' }}>
                                Apprenez partout — dans le bus, à la maison, en voyage. Disponible sur Android et iOS.
                            </p>

                            <div className="dl-buttons" style={{ display:'flex', gap:'.85rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
                                {[
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" style={{ flexShrink:0 }}>
                                                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l236.6-236.1L47 0zm414.2 180.5l-48.6-28-67.9 67.9 67.9 67.9 49.4-28.7c14-7.8 23.8-22.2 23.8-38.6.1-16.4-9.4-31.2-24.6-40.5zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="white"/>
                                            </svg>
                                        ),
                                        store:'DISPONIBLE SUR', name:'Google Play'
                                    },
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" style={{ flexShrink:0 }}>
                                                <path d="M256,32C132.26,32,32,132.26,32,256S132.26,480,256,480,480,379.74,480,256,379.74,32,256,32ZM171,353.89a15.48,15.48,0,0,1-13.46,7.65,14.91,14.91,0,0,1-7.86-2.16,15.48,15.48,0,0,1-5.6-21.21l15.29-25.42a8.73,8.73,0,0,1,7.54-4.3h2.26c11.09,0,18.85,6.67,21.11,13.13Zm129.45-50L200.32,304H133.77a15.46,15.46,0,0,1-15.51-16.15c.32-8.4,7.65-14.76,16-14.76h48.24l57.19-97.35h0l-18.52-31.55C217,137,218.85,127.52,226,123a15.57,15.57,0,0,1,21.87,5.17l9.9,16.91h.11l9.91-16.91A15.58,15.58,0,0,1,289.6,123c7.11,4.52,8.94,14,4.74,21.22l-18.52,31.55-18,30.69-39.09,66.66v.11h57.61c7.22,0,16.27,3.88,19.93,10.12l.32.65c3.23,5.49,5.06,9.26,5.06,14.75A13.82,13.82,0,0,1,300.48,303.92Zm77.75.11H351.09v.11l19.82,33.71a15.8,15.8,0,0,1-5.17,21.53,15.53,15.53,0,0,1-8.08,2.27A15.71,15.71,0,0,1,344.2,354l-29.29-49.86-18.2-31L273.23,233a38.35,38.35,0,0,1-.65-38c4.64-8.19,8.19-10.34,8.19-10.34L333,273h44.91c8.4,0,15.61,6.46,16,14.75A15.65,15.65,0,0,1,378.23,304Z" fill="white"/>
                                            </svg>
                                        ),
                                        store:'TÉLÉCHARGER SUR', name:'App Store'
                                    },
                                ].map((d, i) => (
                                    <div key={i} className="dl-btn" onClick={onStart} style={{
                                        display:'flex', alignItems:'center', gap:'.75rem',
                                        background:'rgba(255,255,255,.12)', backdropFilter:'blur(10px)',
                                        border:'2px solid rgba(255,255,255,.28)', borderRadius:'14px',
                                        padding:'.8rem 1.35rem', cursor:'pointer',
                                        boxShadow:'0 6px 20px rgba(0,0,0,.14)', flex: isMobile?'1':'none',
                                        justifyContent: isMobile?'center':'flex-start',
                                    }}>
                                        {d.icon}
                                        <div>
                                            <div style={{ fontSize:'.58rem', color:'rgba(255,255,255,.6)', fontWeight:600, letterSpacing:'.4px' }}>{d.store}</div>
                                            <div style={{ fontSize:'.98rem', fontWeight:800, color:'#fff', lineHeight:1 }}>{d.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontSize:'.74rem', color:'rgba(255,255,255,.45)', fontWeight:600 }}>
                                * Android juillet 2026 · iOS via TestFlight (bêta)
                            </div>
                        </Reveal>
                    </div>

                    {!isMobile && (
                        <Reveal delay={0.2} direction="left">
                            <div style={{ display:'flex', gap:'1.1rem', alignItems:'flex-end', flexShrink:0 }}>
                                <div style={{ width:'100px', height:'205px', borderRadius:'24px', background:'rgba(255,255,255,.17)', border:'2px solid rgba(255,255,255,.28)', backdropFilter:'blur(8px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'.5rem', boxShadow:'0 20px 44px rgba(0,0,0,.18)', animation:'float-a 5s ease-in-out infinite' }}>
                                    <span style={{ fontSize:'2.2rem' }}>📱</span>
                                    <span style={{ fontSize:'.62rem', color:'rgba(255,255,255,.7)', fontWeight:700 }}>Android</span>
                                </div>
                                <div style={{ width:'100px', height:'170px', borderRadius:'24px', background:'rgba(255,255,255,.1)', border:'2px solid rgba(255,255,255,.2)', backdropFilter:'blur(8px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'.5rem', boxShadow:'0 16px 36px rgba(0,0,0,.14)', animation:'float-b 6s ease-in-out infinite 1s' }}>
                                    <span style={{ fontSize:'2.2rem' }}>📱</span>
                                    <span style={{ fontSize:'.62rem', color:'rgba(255,255,255,.7)', fontWeight:700 }}>iOS</span>
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ══════ FOOTER ══════ */}
            <footer style={{ background:'#0f172a', padding: isMobile?'2.25rem 1.1rem':'3rem 3.5rem', color:'rgba(255,255,255,.5)', fontFamily:"'Outfit',system-ui,sans-serif" }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <div style={{ display:'flex', flexDirection: isMobile?'column':'row', gap:'2rem', justifyContent:'space-between', alignItems: isMobile?'flex-start':'center', marginBottom:'1.75rem' }}>
                        <div>
                            <div style={{ display:'flex', alignItems:'center', gap:'.55rem', marginBottom:'.5rem' }}>
                                <img src={logo} alt="" style={{ width:'26px', filter:'brightness(0) invert(1)', opacity:.8 }} />
                                <span style={{ fontWeight:900, color:'#fff', fontSize:'1rem' }}>Medumba<span style={{ color:A }}>.AI</span></span>
                            </div>
                            <div style={{ fontSize:'.78rem', lineHeight:1.7 }}>Projet NKONI · Juillet 2026<br />La langue Medumba, accessible à tous.</div>
                        </div>
                        <div style={{ display:'flex', gap: isMobile?'1.25rem':'2.5rem', flexWrap:'wrap' }}>
                            {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,l]) => (
                                <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'.84rem', cursor:'pointer', fontWeight:600, transition:'color .15s' }}
                                    onMouseEnter={e => e.target.style.color='#fff'}
                                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,.5)'}
                                >{l}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:'1.25rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'.75rem' }}>
                        <span style={{ fontSize:'.74rem' }}>© 2026 Medumba.AI · Tous droits réservés</span>
                        <span style={{ fontSize:'.74rem' }}>Fait avec ❤️ pour la communauté Medumba</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
