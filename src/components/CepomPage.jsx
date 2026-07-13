const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const CepomPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{ minHeight: '100dvh', backgroundColor: '#f8fafc', fontFamily: "'Outfit',system-ui,sans-serif" }}>
            {/* Header */}
            <div style={{ background: B, padding: '1.5rem 1.5rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            {isFr ? 'Certification' : 'Certification'}
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>
                            🎓 CEPOM
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', maxWidth: '640px', margin: '-1.5rem auto 0' }}>
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.75rem 1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: '900', color: INK, marginBottom: '0.75rem' }}>
                        {isFr ? "Qu'est-ce que le CEPOM ?" : 'What is CEPOM?'}
                    </h1>
                    <p style={{ fontSize: '0.92rem', color: MUTED, lineHeight: 1.8, marginBottom: '1.25rem' }}>
                        {isFr
                            ? "Medumba.AI travaille en partenariat avec le CEPOM pour la certification de ses enseignants. Les classes en ligne et les cours particuliers proposés dans l'application sont animés par des enseignants certifiés CEPOM."
                            : "Medumba.AI partners with CEPOM for the certification of its teachers. The live classes and private lessons offered in the app are led by CEPOM-certified teachers."}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.8, fontStyle: 'italic' }}>
                        {isFr
                            ? 'Plus de détails sur le CEPOM seront ajoutés prochainement.'
                            : 'More details about CEPOM will be added soon.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CepomPage;
