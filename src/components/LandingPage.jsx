import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

const B  = '#0056D2';
const B2 = '#0041a3';
const A  = '#f59e0b';

/* ── Intersection Observer hook for scroll-reveal ── */
function useReveal(threshold = 0.15) {
    const ref  = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 1600 }) {
    const [val, setVal] = useState(0);
    const [ref, visible] = useReveal(0.3);
    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [visible, target, duration]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
    const [ref, visible] = useReveal();
    const transforms = { up: 'translateY(32px)', down: 'translateY(-32px)', left: 'translateX(-32px)', right: 'translateX(32px)' };
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : transforms[direction],
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            ...style,
        }}>{children}</div>
    );
}

/* ── Wave divider ── */
function Wave({ flip = false, topColor = '#fff', bottomColor = '#f8fafc' }) {
    return (
        <div style={{ backgroundColor: bottomColor, marginTop: flip ? 0 : '-2px', lineHeight: 0 }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px', transform: flip ? 'scaleY(-1)' : 'none' }}>
                <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={topColor} />
            </svg>
        </div>
    );
}

export default function LandingPage({ onStart, onLogin }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setActiveTestimonial(t => (t + 1) % 3), 4000);
        return () => clearInterval(timer);
    }, []);

    const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

    const TESTIMONIALS = [
        { name: 'Amélie K.', role: 'Diaspora camerounaise, Paris', text: "Grâce à Medumba.AI j'ai pu échanger avec ma grand-mère pour la première fois en Medumba. Les leçons sont courtes, efficaces et vraiment motivantes !", stars: 5, avatar: '👩🏾' },
        { name: 'Marc-Aurèle T.', role: 'Étudiant, Yaoundé', text: "Le système de combo et les XP m'ont accroché dès le premier jour. C'est comme jouer à un jeu tout en apprenant ma propre langue.", stars: 5, avatar: '👨🏿' },
        { name: 'Sophie N.', role: 'Enseignante, Bafoussam', text: "Les classes en ligne avec les enseignants CEPOM sont d'une qualité exceptionnelle. Je recommande Medumba.AI à tous mes élèves.", stars: 5, avatar: '👩🏿' },
    ];

    return (
        <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: '#0f172a', backgroundColor: '#fff', overflowX: 'hidden' }}>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                @keyframes float-slow  { 0%,100%{transform:translateY(0) rotate(0deg)}  50%{transform:translateY(-16px) rotate(3deg)} }
                @keyframes float-med   { 0%,100%{transform:translateY(0) rotate(0deg)}  50%{transform:translateY(-10px) rotate(-2deg)} }
                @keyframes pulse-glow  { 0%,100%{box-shadow:0 0 0 0 rgba(0,86,210,0.4)} 50%{box-shadow:0 0 0 18px rgba(0,86,210,0)} }
                @keyframes pulse-dot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
                @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
                @keyframes spin-slow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes bounce-in   { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
                @keyframes slide-left  { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }

                .land-btn-primary {
                    padding: .85rem 2.2rem; border-radius: 99px;
                    background: linear-gradient(135deg, ${B}, #0891b2);
                    color: #fff; border: none; font-weight: 800; font-size: 1rem;
                    cursor: pointer; font-family: inherit;
                    box-shadow: 0 8px 28px rgba(0,86,210,.35);
                    transition: transform .18s, box-shadow .18s;
                }
                .land-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(0,86,210,.45); }

                .land-btn-ghost {
                    padding: .85rem 2.2rem; border-radius: 99px;
                    background: #fff; color: ${B};
                    border: 2.5px solid ${B};
                    font-weight: 800; font-size: 1rem; cursor: pointer; font-family: inherit;
                    transition: all .18s;
                }
                .land-btn-ghost:hover { background: #eff6ff; transform: translateY(-2px); }

                .feat-card {
                    background: #fff; border-radius: 24px; padding: 2rem 1.75rem;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 4px 20px rgba(0,0,0,.05);
                    transition: transform .25s, box-shadow .25s;
                }
                .feat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,86,210,.14); }

                .teacher-card { transition: transform .2s, box-shadow .2s; }
                .teacher-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,.12); }

                .class-type-card { transition: transform .2s; }
                .class-type-card:hover { transform: scale(1.04); }

                .nav-link { cursor: pointer; color: #475569; font-weight: 600; font-size: .9rem; transition: color .15s; }
                .nav-link:hover { color: ${B}; }

                .dl-badge { transition: all .2s; }
                .dl-badge:hover { transform: translateY(-3px) scale(1.03); }

                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #f1f5f9; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
            `}</style>

            {/* ══════════════════════ NAVBAR ══════════════════════ */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                backgroundColor: scrolled ? 'rgba(255,255,255,.97)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
                transition: 'all .3s ease',
                padding: isMobile ? '.85rem 1.25rem' : '.85rem 3.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src={logo} alt="Medumba.AI" style={{ width: '34px' }} />
                    <span style={{ fontWeight: 900, fontSize: '1.2rem', color: B }}>Medumba<span style={{ color: A }}>.AI</span></span>
                </div>

                {!isMobile && (
                    <div style={{ display: 'flex', gap: '2.5rem' }}>
                        {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,label]) => (
                            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                    <button onClick={onLogin} style={{
                        padding: '.5rem 1.25rem', borderRadius: '99px',
                        border: `2px solid ${B}`, background: 'transparent', color: B,
                        fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >Se connecter</button>
                    {!isMobile && (
                        <button onClick={onStart} className="land-btn-primary" style={{ padding: '.5rem 1.3rem', fontSize: '.85rem' }}>
                            Commencer gratuitement ✦
                        </button>
                    )}
                    {isMobile && (
                        <button onClick={() => setMenuOpen(m => !m)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#0f172a' }}>
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobile && menuOpen && (
                <div style={{
                    position: 'fixed', top: '60px', inset: '60px 0 0', zIndex: 199,
                    background: 'rgba(255,255,255,.98)', backdropFilter: 'blur(12px)',
                    padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
                    animation: 'slide-left .25s ease',
                }}>
                    {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,label]) => (
                        <span key={id} onClick={() => scrollTo(id)} style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer', padding: '.5rem 0', borderBottom: '1px solid #f1f5f9' }}>{label}</span>
                    ))}
                    <button onClick={onStart} className="land-btn-primary" style={{ marginTop: '.5rem' }}>Commencer gratuitement ✦</button>
                </div>
            )}

            {/* ══════════════════════ HERO ══════════════════════ */}
            <section style={{
                minHeight: '100vh',
                background: 'linear-gradient(145deg,#e8f0fe 0%,#dbeafe 35%,#ede9fe 65%,#fce7f3 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: isMobile ? '6rem 1.25rem 4rem' : '7rem 3.5rem 4rem',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Decorative blobs */}
                <div style={{ position:'absolute', top:'-120px', right:'-120px', width:'550px', height:'550px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,86,210,.12) 0%,transparent 70%)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 70%)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', top:'30%', left:'10%', width:'80px', height:'80px', borderRadius:'50%', background:'linear-gradient(135deg,#0056D2,#0891b2)', opacity:.1, animation:'spin-slow 20s linear infinite', pointerEvents:'none' }} />

                {/* Floating badges */}
                <div style={{ position:'absolute', top: isMobile?'12%':'18%', right: isMobile?'4%':'8%', animation:'float-slow 5s ease-in-out infinite', zIndex:2 }}>
                    <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 32px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #e0f2fe' }}>
                        <span style={{ fontSize:'1.2rem' }}>🔥</span>
                        <div><div style={{ fontSize:'.7rem', color:'#64748b', fontWeight:600 }}>Streak</div><div style={{ fontSize:'.9rem', fontWeight:800, color:'#d97706' }}>7 jours</div></div>
                    </div>
                </div>
                <div style={{ position:'absolute', top: isMobile?'30%':'40%', left: isMobile?'2%':'4%', animation:'float-med 6s ease-in-out infinite', zIndex:2 }}>
                    <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 32px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #dcfce7' }}>
                        <span style={{ fontSize:'1.2rem' }}>⚡</span>
                        <div><div style={{ fontSize:'.7rem', color:'#64748b', fontWeight:600 }}>XP Gagné</div><div style={{ fontSize:'.9rem', fontWeight:800, color:B }}>+340 XP</div></div>
                    </div>
                </div>
                {!isMobile && (
                    <div style={{ position:'absolute', bottom:'22%', right:'6%', animation:'float-slow 7s ease-in-out infinite 1s', zIndex:2 }}>
                        <div style={{ background:'#fff', borderRadius:'16px', padding:'.6rem 1rem', boxShadow:'0 8px 32px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:'.5rem', border:'2px solid #fef3c7' }}>
                            <span style={{ fontSize:'1.2rem' }}>💎</span>
                            <div><div style={{ fontSize:'.7rem', color:'#64748b', fontWeight:600 }}>Diamants</div><div style={{ fontSize:'.9rem', fontWeight:800, color:'#d97706' }}>50</div></div>
                        </div>
                    </div>
                )}

                <div style={{ maxWidth:'1140px', width:'100%', display:'flex', flexDirection: isMobile?'column':'row', alignItems:'center', gap: isMobile?'3rem':'5rem', zIndex:3 }}>
                    {/* Left */}
                    <div style={{ flex:1 }}>
                        {/* Live badge */}
                        <Reveal>
                            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:`2px solid #bfdbfe`, borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'1.5rem' }}>
                                <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', animation:'pulse-dot 1.8s ease-in-out infinite', display:'inline-block', flexShrink:0 }} />
                                <span style={{ fontSize:'.8rem', fontWeight:700, color:B }}>2 847 apprenants actifs cette semaine</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 style={{ fontSize: isMobile?'2.4rem':'3.5rem', fontWeight:900, lineHeight:1.1, color:'#0f172a', marginBottom:'1.25rem' }}>
                                Apprenez le{' '}
                                <span style={{
                                    background:`linear-gradient(90deg,${B},${A},#7c3aed,${B})`,
                                    backgroundSize:'300% auto', WebkitBackgroundClip:'text',
                                    WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite',
                                    display:'inline-block',
                                }}>Medumba</span>
                                <br />en 5 minutes par jour
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p style={{ fontSize: isMobile?'1rem':'1.1rem', color:'#475569', lineHeight:1.75, marginBottom:'2rem', maxWidth:'500px' }}>
                                La première app d'apprentissage de la langue Medumba — leçons gamifiées, classes live avec des enseignants certifiés CEPOM, et IA vocale.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div style={{ display:'flex', gap:'.85rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
                                <button onClick={onStart} className="land-btn-primary">🚀 Commencer gratuitement</button>
                                <button onClick={() => scrollTo('classes')} className="land-btn-ghost">🎓 Voir les classes</button>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
                                {[['17+','Leçons interactives'],['3','Unités complètes'],['100%','Gratuit'],['🇨🇲','Langue Medumba']].map(([n,l]) => (
                                    <div key={l}>
                                        <div style={{ fontSize:'1.6rem', fontWeight:900, color:B }}>{n}</div>
                                        <div style={{ fontSize:'.75rem', color:'#64748b', fontWeight:600, marginTop:'2px' }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — phone mockup */}
                    <Reveal delay={0.15} direction="left" style={{ flexShrink:0 }}>
                        <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
                            {/* Glow ring */}
                            <div style={{ position:'absolute', inset:'-20px', borderRadius:'50%', background:`radial-gradient(circle,rgba(0,86,210,.2) 0%,transparent 70%)`, animation:'pulse-glow 3s ease-in-out infinite', pointerEvents:'none' }} />
                            {/* Phone */}
                            <div style={{
                                width: isMobile?'210px':'260px', aspectRatio:'9/19.5',
                                borderRadius:'38px',
                                background:`linear-gradient(160deg,${B2},${B},#0891b2)`,
                                boxShadow:`0 40px 100px rgba(0,86,210,.45),0 0 0 6px rgba(255,255,255,.8),0 0 0 10px rgba(0,86,210,.15)`,
                                display:'flex', flexDirection:'column', alignItems:'center',
                                padding:'1.5rem 1rem 1rem', position:'relative', overflow:'hidden',
                                animation:'float-slow 5s ease-in-out infinite',
                            }}>
                                {/* Notch */}
                                <div style={{ position:'absolute', top:'14px', left:'50%', transform:'translateX(-50%)', width:'60px', height:'5px', borderRadius:'99px', background:'rgba(0,0,0,.25)' }} />
                                <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:'radial-gradient(circle at 70% 15%,rgba(255,255,255,.18) 0%,transparent 55%)', pointerEvents:'none' }} />

                                <img src={logo} alt="" style={{ width:'44px', marginTop:'.5rem', marginBottom:'.6rem', filter:'brightness(0) invert(1)' }} />
                                <div style={{ color:'#fff', fontWeight:900, fontSize:'1.15rem', marginBottom:'.2rem' }}>Medumba.AI</div>
                                <div style={{ color:'rgba(255,255,255,.7)', fontSize:'.7rem', fontWeight:600, marginBottom:'1.5rem' }}>Apprenez. Pratiquez. Maîtrisez.</div>

                                {/* Word of day card */}
                                <div style={{ width:'100%', background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', borderRadius:'16px', padding:'.85rem', marginBottom:'.6rem', border:'1.5px solid rgba(255,255,255,.25)' }}>
                                    <div style={{ fontSize:'.6rem', color:'rgba(255,255,255,.65)', fontWeight:700, letterSpacing:'.5px', marginBottom:'.3rem' }}>📖 MOT DU JOUR</div>
                                    <div style={{ fontSize:'1.1rem', color:'#fff', fontWeight:900 }}>Ó tsɑ̌ʼ nə?</div>
                                    <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,.8)', marginTop:'2px' }}>Comment vas-tu ?</div>
                                </div>

                                {/* XP bar */}
                                <div style={{ width:'100%', background:'rgba(255,255,255,.12)', borderRadius:'99px', height:'6px', marginBottom:'.6rem', overflow:'hidden' }}>
                                    <div style={{ width:'68%', height:'100%', background:`linear-gradient(90deg,${A},#fbbf24)`, borderRadius:'99px' }} />
                                </div>

                                <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', justifyContent:'center' }}>
                                    {['🔥 7j','⚡ 340 XP','💎 50'].map(s => (
                                        <div key={s} style={{ background:'rgba(255,255,255,.2)', borderRadius:'99px', padding:'.2rem .65rem', fontSize:'.62rem', fontWeight:700, color:'#fff' }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Wave divider */}
            <Wave topColor="transparent" bottomColor="#fff" />

            {/* ══════════════════════ STATS BAR ══════════════════════ */}
            <section style={{ background:'#fff', padding: isMobile?'2rem 1.25rem':'2.5rem 3.5rem' }}>
                <Reveal>
                    <div style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:'2rem', textAlign:'center' }}>
                        {[
                            { target:2847, suffix:'+', label:'Apprenants actifs', emoji:'👥' },
                            { target:17,   suffix:'',  label:'Leçons interactives', emoji:'📚' },
                            { target:3,    suffix:'',  label:'Enseignants CEPOM', emoji:'🎓' },
                            { target:100,  suffix:'%', label:'Gratuit à l\'accès', emoji:'🎁' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding:'1.25rem', borderRadius:'20px', background:`linear-gradient(135deg,${i===0?'#eff6ff':i===1?'#f0fdf4':i===2?'#fef3c7':'#fdf4ff'},#fff)`, border:'2px solid #f1f5f9' }}>
                                <div style={{ fontSize:'1.5rem', marginBottom:'.3rem' }}>{s.emoji}</div>
                                <div style={{ fontSize:'2rem', fontWeight:900, color:B }}>
                                    <Counter target={s.target} suffix={s.suffix} />
                                </div>
                                <div style={{ fontSize:'.78rem', color:'#64748b', fontWeight:600, marginTop:'4px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            <Wave topColor="#fff" bottomColor="#f8fafc" />

            {/* ══════════════════════ FEATURES ══════════════════════ */}
            <section id="features" style={{ background:'#f8fafc', padding: isMobile?'4rem 1.25rem':'5.5rem 3.5rem' }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'3.5rem' }}>
                        <div style={{ display:'inline-block', background:`linear-gradient(135deg,#eff6ff,#dbeafe)`, borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'.75rem' }}>
                            <span style={{ fontSize:'.78rem', fontWeight:800, color:B, letterSpacing:'1px' }}>✦ POURQUOI MEDUMBA.AI</span>
                        </div>
                        <h2 style={{ fontSize: isMobile?'1.9rem':'2.6rem', fontWeight:900, color:'#0f172a', marginBottom:'.75rem' }}>
                            Tout pour maîtriser le Medumba
                        </h2>
                        <p style={{ color:'#64748b', fontSize:'1.05rem', maxWidth:'500px', margin:'0 auto', lineHeight:1.7 }}>
                            Une expérience d'apprentissage pensée pour les apprenants modernes — interactive, culturelle et efficace.
                        </p>
                    </Reveal>

                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap:'1.5rem' }}>
                        {[
                            { emoji:'🎮', title:'Leçons gamifiées', desc:'17 leçons avec XP, streaks, diamants et combo. Restez motivé grâce à un système de récompenses addictif.', grad:'linear-gradient(135deg,#eff6ff,#dbeafe)', accent:B },
                            { emoji:'🎙', title:'Prononciation vocale', desc:'Enregistrez votre voix, l\'IA analyse votre prononciation et vous donne un score instantané.', grad:'linear-gradient(135deg,#fef3c7,#fde68a20)', accent:'#d97706' },
                            { emoji:'📚', title:'Dictionnaire enrichi', desc:'Dictionnaire Medumba–Français avec traducteur IA, expressions courantes et exemples contextuels.', grad:'linear-gradient(135deg,#dcfce7,#bbf7d020)', accent:'#15803d' },
                            { emoji:'🌙', title:'Dark & Light mode', desc:'Interface claire ou sombre selon vos préférences. Votre confort visuel, partout et en tout moment.', grad:'linear-gradient(135deg,#f1f5f9,#e2e8f020)', accent:'#475569' },
                            { emoji:'🏆', title:'Classement & Défis', desc:'Comparez-vous chaque semaine, relevez des défis quotidiens et grimpez dans le classement mondial.', grad:'linear-gradient(135deg,#fefce8,#fef9c320)', accent:'#ca8a04' },
                            { emoji:'🎬', title:'Vidéos & Culture', desc:'Tutoriels vidéo, musique traditionnelle, proverbes et culture bamiléké — la langue et l\'âme ensemble.', grad:'linear-gradient(135deg,#fdf4ff,#ede9fe20)', accent:'#7c3aed' },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i * 0.07}>
                                <div className="feat-card" style={{ background:'#fff', height:'100%' }}>
                                    <div style={{ width:'58px', height:'58px', borderRadius:'18px', background:f.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.75rem', marginBottom:'1.1rem', border:`2px solid ${f.accent}22` }}>{f.emoji}</div>
                                    <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'#0f172a', marginBottom:'.5rem' }}>{f.title}</h3>
                                    <p style={{ fontSize:'.875rem', color:'#64748b', lineHeight:1.7 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Wave topColor="#f8fafc" bottomColor="#fff" />

            {/* ══════════════════════ CLASSES ══════════════════════ */}
            <section id="classes" style={{ background:'#fff', padding: isMobile?'4rem 1.25rem':'5.5rem 3.5rem' }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'3.5rem' }}>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#fdf4ff,#ede9fe)', borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'.75rem' }}>
                            <span style={{ fontSize:'.78rem', fontWeight:800, color:'#7c3aed', letterSpacing:'1px' }}>🎓 CLASSES EN LIGNE</span>
                        </div>
                        <h2 style={{ fontSize: isMobile?'1.9rem':'2.6rem', fontWeight:900, color:'#0f172a', marginBottom:'.75rem' }}>
                            Apprenez avec de vrais enseignants
                        </h2>
                        <p style={{ color:'#64748b', fontSize:'1.05rem', maxWidth:'520px', margin:'0 auto', lineHeight:1.7 }}>
                            Des cours en direct animés par des enseignants certifiés CEPOM — live, replay ou en 1-à-1.
                        </p>
                    </Reveal>

                    {/* Class types */}
                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr 1fr':'repeat(4,1fr)', gap:'1.25rem', marginBottom:'3.5rem' }}>
                        {[
                            { emoji:'📡', title:'Classes Live', desc:'En direct, max 30 apprenants', grad:'linear-gradient(145deg,#0056D2,#0891b2)', delay:0 },
                            { emoji:'🎬', title:'Replay', desc:'Accès illimité aux archives', grad:'linear-gradient(145deg,#7c3aed,#a855f7)', delay:.07 },
                            { emoji:'👤', title:'Cours Particuliers', desc:'Sessions 1-à-1 personnalisées', grad:'linear-gradient(145deg,#d97706,#f59e0b)', delay:.14 },
                            { emoji:'🏛', title:'Ateliers Culturels', desc:'Contes, musique et rites', grad:'linear-gradient(145deg,#15803d,#22c55e)', delay:.21 },
                        ].map((c, i) => (
                            <Reveal key={i} delay={c.delay}>
                                <div className="class-type-card" style={{ borderRadius:'24px', padding:'1.75rem 1.5rem', background:c.grad, color:'#fff', boxShadow:'0 12px 32px rgba(0,0,0,.15)', height:'100%' }}>
                                    <div style={{ fontSize:'2.2rem', marginBottom:'.75rem' }}>{c.emoji}</div>
                                    <div style={{ fontWeight:800, fontSize:'1rem', marginBottom:'.4rem' }}>{c.title}</div>
                                    <div style={{ fontSize:'.8rem', opacity:.85, lineHeight:1.5 }}>{c.desc}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Teachers */}
                    <Reveal style={{ textAlign:'center', marginBottom:'1.75rem' }}>
                        <h3 style={{ fontSize:'1.3rem', fontWeight:800, color:'#0f172a' }}>Nos enseignants certifiés CEPOM</h3>
                    </Reveal>
                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap:'1.5rem' }}>
                        {[
                            { name:'Prof. Kamgaing J.', level:'Débutant · Intermédiaire', spec:'Grammaire & Phonologie', rating:'4.9', students:142, avatar:'👨🏿‍🏫', color:'#eff6ff', border:'#bfdbfe' },
                            { name:'Dr. Feudjio M.', level:'Intermédiaire · Avancé', spec:'Littérature & Proverbes', rating:'4.8', students:98, avatar:'👩🏾‍🏫', color:'#fdf4ff', border:'#ddd6fe' },
                            { name:'Mme. Nkouindji A.', level:'Enfants · Débutant', spec:'Contes & Culture Medumba', rating:'5.0', students:67, avatar:'👩🏿‍🎓', color:'#f0fdf4', border:'#bbf7d0' },
                        ].map((t, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="teacher-card" style={{ background:'#fff', borderRadius:'24px', padding:'1.75rem', border:`2px solid ${t.border}`, boxShadow:'0 4px 20px rgba(0,0,0,.06)' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                                        <div style={{ width:'58px', height:'58px', borderRadius:'50%', background:t.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.9rem', flexShrink:0, border:`2px solid ${t.border}` }}>{t.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight:800, color:'#0f172a', fontSize:'1rem' }}>{t.name}</div>
                                            <div style={{ fontSize:'.75rem', color:'#64748b', fontWeight:600 }}>{t.level}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize:'.85rem', color:'#475569', fontWeight:600, marginBottom:'1rem' }}>✦ {t.spec}</div>
                                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.1rem' }}>
                                        <span style={{ fontSize:'.82rem', color:'#ca8a04', fontWeight:700 }}>⭐ {t.rating} / 5</span>
                                        <span style={{ fontSize:'.78rem', color:'#64748b', fontWeight:600 }}>👥 {t.students} élèves</span>
                                    </div>
                                    <button onClick={onStart} style={{
                                        width:'100%', padding:'.65rem', borderRadius:'12px',
                                        background:`linear-gradient(135deg,${B},#0891b2)`,
                                        color:'#fff', border:'none', fontWeight:700, fontSize:'.85rem',
                                        cursor:'pointer', fontFamily:'inherit',
                                        boxShadow:`0 4px 16px rgba(0,86,210,.3)`,
                                        transition:'transform .15s',
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

            {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
            <section id="how" style={{ background:'#f8fafc', padding: isMobile?'4rem 1.25rem':'5.5rem 3.5rem' }}>
                <div style={{ maxWidth:'900px', margin:'0 auto', textAlign:'center' }}>
                    <Reveal>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#fef9c3,#fde68a)', borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'.75rem' }}>
                            <span style={{ fontSize:'.78rem', fontWeight:800, color:'#92400e', letterSpacing:'1px' }}>✦ COMMENT ÇA MARCHE</span>
                        </div>
                        <h2 style={{ fontSize: isMobile?'1.9rem':'2.6rem', fontWeight:900, color:'#0f172a', marginBottom:'.75rem' }}>
                            Commencez en 3 étapes
                        </h2>
                        <p style={{ color:'#64748b', fontSize:'1.05rem', marginBottom:'3.5rem', lineHeight:1.7 }}>Simple, rapide, efficace.</p>
                    </Reveal>

                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap: isMobile?'2rem':'1.5rem', position:'relative' }}>
                        {/* Connector lines — desktop only */}
                        {!isMobile && (
                            <>
                                <div style={{ position:'absolute', top:'36px', left:'33%', width:'34%', height:'2px', background:`linear-gradient(90deg,${B}40,${B}40)`, backgroundImage:`repeating-linear-gradient(90deg,${B} 0,${B} 8px,transparent 8px,transparent 16px)`, zIndex:0 }} />
                                <div style={{ position:'absolute', top:'36px', left:'67%', width:'34%', height:'2px', backgroundImage:`repeating-linear-gradient(90deg,${B} 0,${B} 8px,transparent 8px,transparent 16px)`, zIndex:0 }} />
                            </>
                        )}
                        {[
                            { n:'01', emoji:'🎯', title:'Créez votre profil', desc:'Choisissez votre niveau, vos objectifs et votre rythme d\'apprentissage en quelques secondes.', color:`linear-gradient(135deg,${B},#0891b2)` },
                            { n:'02', emoji:'📖', title:'Suivez vos leçons', desc:'Progressez à travers les unités, gagnez de l\'XP et des diamants à chaque bonne réponse.', color:`linear-gradient(135deg,#7c3aed,#a855f7)` },
                            { n:'03', emoji:'🎓', title:'Rejoignez une classe', desc:'Réservez un cours live ou regardez un replay — apprenez avec de vrais enseignants certifiés.', color:`linear-gradient(135deg,#15803d,#22c55e)` },
                        ].map((s, i) => (
                            <Reveal key={i} delay={i * 0.12} style={{ zIndex:1 }}>
                                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
                                    <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.9rem', boxShadow:`0 8px 28px rgba(0,0,0,.18)`, flexShrink:0, border:'4px solid #fff' }}>{s.emoji}</div>
                                    <div style={{ fontSize:'.7rem', fontWeight:800, color:B, letterSpacing:'1px' }}>ÉTAPE {s.n}</div>
                                    <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'#0f172a' }}>{s.title}</h3>
                                    <p style={{ fontSize:'.875rem', color:'#64748b', lineHeight:1.7 }}>{s.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <button onClick={onStart} className="land-btn-primary" style={{ marginTop:'3.5rem' }}>
                            Commencer maintenant — c'est gratuit 🚀
                        </button>
                    </Reveal>
                </div>
            </section>

            <Wave topColor="#f8fafc" bottomColor="#fff" />

            {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
            <section style={{ background:'#fff', padding: isMobile?'4rem 1.25rem':'5rem 3.5rem', overflow:'hidden' }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <Reveal style={{ textAlign:'center', marginBottom:'3rem' }}>
                        <div style={{ display:'inline-block', background:'linear-gradient(135deg,#dcfce7,#bbf7d0)', borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'.75rem' }}>
                            <span style={{ fontSize:'.78rem', fontWeight:800, color:'#15803d', letterSpacing:'1px' }}>💬 ILS EN PARLENT</span>
                        </div>
                        <h2 style={{ fontSize: isMobile?'1.9rem':'2.6rem', fontWeight:900, color:'#0f172a' }}>
                            Ce que disent nos apprenants
                        </h2>
                    </Reveal>

                    <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap:'1.5rem' }}>
                        {TESTIMONIALS.map((t, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div style={{
                                    background: i === activeTestimonial ? `linear-gradient(135deg,${B},#0891b2)` : '#f8fafc',
                                    borderRadius:'24px', padding:'2rem 1.75rem',
                                    border: i === activeTestimonial ? 'none' : '2px solid #e2e8f0',
                                    boxShadow: i === activeTestimonial ? '0 20px 50px rgba(0,86,210,.3)' : '0 4px 16px rgba(0,0,0,.05)',
                                    transition:'all .5s ease', color: i === activeTestimonial ? '#fff' : '#0f172a',
                                    transform: i === activeTestimonial ? 'scale(1.03)' : 'scale(1)',
                                }}>
                                    <div style={{ fontSize:'1.5rem', marginBottom:'1rem' }}>{'⭐'.repeat(t.stars)}</div>
                                    <p style={{ fontSize:'.9rem', lineHeight:1.7, marginBottom:'1.5rem', color: i === activeTestimonial ? 'rgba(255,255,255,.9)' : '#475569' }}>
                                        "{t.text}"
                                    </p>
                                    <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                                        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background: i === activeTestimonial ? 'rgba(255,255,255,.2)' : '#eff6ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' }}>{t.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight:800, fontSize:'.9rem' }}>{t.name}</div>
                                            <div style={{ fontSize:'.75rem', opacity:.7, fontWeight:600 }}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Dots */}
                    <div style={{ display:'flex', justifyContent:'center', gap:'.5rem', marginTop:'2rem' }}>
                        {TESTIMONIALS.map((_, i) => (
                            <div key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? '24px' : '8px', height:'8px', borderRadius:'99px', background: i === activeTestimonial ? B : '#cbd5e1', cursor:'pointer', transition:'all .3s' }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════ DOWNLOAD ══════════════════════ */}
            <section id="download" style={{
                background:`linear-gradient(145deg,${B2} 0%,${B} 45%,#0891b2 100%)`,
                padding: isMobile?'4rem 1.25rem':'5.5rem 3.5rem',
                position:'relative', overflow:'hidden',
            }}>
                {/* Blobs */}
                <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,.15) 0%,transparent 70%)', pointerEvents:'none' }} />

                <div style={{ maxWidth:'1000px', margin:'0 auto', display:'flex', flexDirection: isMobile?'column':'row', alignItems:'center', gap:'4rem', position:'relative', zIndex:1 }}>
                    <div style={{ flex:1 }}>
                        <Reveal>
                            <div style={{ display:'inline-block', background:'rgba(255,255,255,.15)', borderRadius:'99px', padding:'.35rem 1.1rem', marginBottom:'1rem', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.25)' }}>
                                <span style={{ fontSize:'.78rem', fontWeight:800, color:'rgba(255,255,255,.9)', letterSpacing:'1px' }}>📱 TÉLÉCHARGER L'APP</span>
                            </div>
                            <h2 style={{ fontSize: isMobile?'2rem':'2.8rem', fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:'1rem' }}>
                                Medumba.AI<br />dans votre poche
                            </h2>
                            <p style={{ color:'rgba(255,255,255,.8)', fontSize:'1rem', lineHeight:1.75, marginBottom:'2.5rem', maxWidth:'420px' }}>
                                Apprenez le Medumba partout — dans le bus, à la maison, en voyage. Disponible sur Android et iOS.
                            </p>

                            {/* Download buttons */}
                            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
                                {[
                                    { icon:'▶', store:'DISPONIBLE SUR', name:'Google Play', bg:'rgba(255,255,255,.12)', border:'rgba(255,255,255,.3)' },
                                    { icon:'🍎', store:'TÉLÉCHARGER SUR', name:'App Store', bg:'rgba(255,255,255,.12)', border:'rgba(255,255,255,.3)' },
                                ].map((d, i) => (
                                    <div key={i} className="dl-badge" onClick={onStart} style={{
                                        display:'flex', alignItems:'center', gap:'.85rem',
                                        background:d.bg, backdropFilter:'blur(10px)',
                                        border:`2px solid ${d.border}`, borderRadius:'16px',
                                        padding:'.85rem 1.5rem', cursor:'pointer',
                                        boxShadow:'0 8px 24px rgba(0,0,0,.15)',
                                    }}>
                                        <span style={{ fontSize:'2rem' }}>{d.icon}</span>
                                        <div>
                                            <div style={{ fontSize:'.62rem', color:'rgba(255,255,255,.65)', fontWeight:600, letterSpacing:'.5px' }}>{d.store}</div>
                                            <div style={{ fontSize:'1.05rem', fontWeight:800, color:'#fff', lineHeight:1 }}>{d.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.5)', fontWeight:600 }}>
                                * Android disponible dès juillet 2026 · iOS via TestFlight (bêta)
                            </div>
                        </Reveal>
                    </div>

                    {/* Phone mockups */}
                    <Reveal delay={0.2} direction="left">
                        <div style={{ display:'flex', gap:'1.25rem', alignItems:'flex-end', flexShrink:0 }}>
                            <div style={{
                                width:'110px', height:'220px', borderRadius:'26px',
                                background:'rgba(255,255,255,.18)', border:'2px solid rgba(255,255,255,.3)',
                                backdropFilter:'blur(8px)', display:'flex', flexDirection:'column',
                                alignItems:'center', justifyContent:'center', gap:'.5rem',
                                boxShadow:'0 24px 48px rgba(0,0,0,.2)', animation:'float-slow 5s ease-in-out infinite',
                            }}>
                                <span style={{ fontSize:'2.5rem' }}>📱</span>
                                <span style={{ fontSize:'.65rem', color:'rgba(255,255,255,.7)', fontWeight:700 }}>Android</span>
                            </div>
                            <div style={{
                                width:'110px', height:'185px', borderRadius:'26px',
                                background:'rgba(255,255,255,.12)', border:'2px solid rgba(255,255,255,.2)',
                                backdropFilter:'blur(8px)', display:'flex', flexDirection:'column',
                                alignItems:'center', justifyContent:'center', gap:'.5rem',
                                boxShadow:'0 20px 40px rgba(0,0,0,.15)', animation:'float-med 6s ease-in-out infinite 1s',
                            }}>
                                <span style={{ fontSize:'2.5rem' }}>📱</span>
                                <span style={{ fontSize:'.65rem', color:'rgba(255,255,255,.7)', fontWeight:700 }}>iOS</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════ FOOTER ══════════════════════ */}
            <footer style={{ background:'#0f172a', padding: isMobile?'3rem 1.25rem':'3.5rem', color:'rgba(255,255,255,.55)', fontFamily:"'Outfit',system-ui,sans-serif" }}>
                <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
                    <div style={{ display:'flex', flexDirection: isMobile?'column':'row', gap:'2.5rem', justifyContent:'space-between', alignItems: isMobile?'flex-start':'center', marginBottom:'2rem' }}>
                        <div>
                            <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.6rem' }}>
                                <img src={logo} alt="" style={{ width:'28px', filter:'brightness(0) invert(1)', opacity:.85 }} />
                                <span style={{ fontWeight:900, color:'#fff', fontSize:'1.1rem' }}>Medumba<span style={{ color:A }}>.AI</span></span>
                            </div>
                            <div style={{ fontSize:'.82rem', lineHeight:1.7 }}>
                                Projet NKONI · Juillet 2026<br />
                                La langue Medumba, accessible à tous.
                            </div>
                        </div>
                        <div style={{ display:'flex', gap: isMobile?'1.5rem':'3rem', flexWrap:'wrap' }}>
                            {[['features','Fonctionnalités'],['classes','Classes'],['how','Comment ça marche'],['download','Télécharger']].map(([id,label]) => (
                                <span key={id} onClick={() => scrollTo(id)} style={{ fontSize:'.88rem', cursor:'pointer', fontWeight:600, transition:'color .15s' }}
                                    onMouseEnter={e => e.target.style.color='#fff'}
                                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,.55)'}
                                >{label}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
                        <span style={{ fontSize:'.78rem' }}>© 2026 Medumba.AI · Tous droits réservés</span>
                        <span style={{ fontSize:'.78rem' }}>Fait avec ❤️ pour la communauté Medumba</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
