const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';
const GOLD = '#b45309';

const LEVELS = [
    { n: '01', en: 'Foundations', fr: 'Les Bases', descEn: 'Alphabet, first words, greetings', descFr: 'Alphabet, premiers mots, salutations' },
    { n: '02', en: 'People & World', fr: 'Personnes & Monde', descEn: 'Family, body, colors, numbers', descFr: 'Famille, corps, couleurs, chiffres' },
    { n: '03', en: 'Daily Life', fr: 'Vie Quotidienne', descEn: 'Food, home, everyday conversation', descFr: 'Nourriture, maison, conversation courante' },
    { n: '04', en: 'Society & Health', fr: 'Société & Santé', descEn: 'Health, community, social life', descFr: 'Santé, communauté, vie sociale' },
    { n: '05', en: 'Culture & Language', fr: 'Culture & Langue', descEn: 'Traditions, calendar, deeper grammar', descFr: 'Traditions, calendrier, grammaire avancée' },
];

const CepomPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const tr = (fr, en) => isFr ? fr : en;

    return (
        <div style={{ minHeight: '100dvh', backgroundColor: '#f8fafc', fontFamily: "'Outfit',system-ui,sans-serif" }}>
            {/* Header */}
            <div style={{ background: B, padding: '1.5rem 1.5rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            {tr('Certification', 'Certification')}
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>
                            🎓 CEPOM
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', maxWidth: '680px', margin: '-1.5rem auto 0' }}>

                {/* Certificate-style seal card */}
                <div style={{
                    background: '#fff', border: `2px solid ${GOLD}30`, borderRadius: '20px',
                    padding: '1.75rem 1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    marginBottom: '1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(135deg, ${GOLD}06 0px, ${GOLD}06 2px, transparent 2px, transparent 14px)`, pointerEvents: 'none' }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '800', color: GOLD, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '0.4rem' }}>
                            {tr('Partenariat officiel', 'Official partnership')}
                        </div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: '900', color: INK, marginBottom: '0.6rem' }}>
                            Medumba.AI × CEPOM
                        </h1>
                        <p style={{ fontSize: '0.88rem', color: MUTED, lineHeight: 1.8, maxWidth: '480px', margin: '0 auto' }}>
                            {tr(
                                "Le CEPOM certifie les enseignants qui animent les classes en ligne et les cours particuliers de Medumba.AI, et supervise la structure pédagogique du parcours d'apprentissage.",
                                "CEPOM certifies the teachers who lead Medumba.AI's live classes and private lessons, and oversees the pedagogical structure of the learning path."
                            )}
                        </p>
                    </div>
                </div>

                {/* Curriculum structure */}
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.75rem 1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', marginBottom: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: '900', color: INK, marginBottom: '0.5rem' }}>
                        {tr('Une structure pédagogique reconnue', 'A recognized learning structure')}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.8, marginBottom: '1.25rem' }}>
                        {tr(
                            "L'application n'est pas un contenu isolé : chaque leçon s'inscrit dans un parcours à plusieurs niveaux, le même que celui suivi en classe avec un enseignant CEPOM. Progressez dans l'app à votre rythme, ou en complément de vos cours.",
                            "The app isn't standalone content: every lesson fits into a multi-level path, the same one followed in class with a CEPOM teacher. Progress in the app at your own pace, or alongside your classes."
                        )}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {LEVELS.map((l) => (
                            <div key={l.n} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', padding: '0.75rem', borderRadius: '14px', background: '#f8fafc' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: B, color: '#fff', fontWeight: '900', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {l.n}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '0.9rem', color: INK }}>{tr(l.fr, l.en)}</div>
                                    <div style={{ fontSize: '0.8rem', color: MUTED }}>{tr(l.descFr, l.descEn)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.8, margin: 0 }}>
                        {tr(
                            "Une question sur la certification ou les classes CEPOM ? Écrivez-nous depuis la page Contact.",
                            "A question about CEPOM certification or classes? Reach out from the Contact page."
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CepomPage;
