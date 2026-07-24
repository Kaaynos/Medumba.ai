const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const SECTIONS = [
    {
        titleFr: "Objet de l'application", titleEn: 'About the app',
        bodyFr: "Medumba.AI est une application d'apprentissage de la langue Medumba (Bangangté, Ndé, Cameroun) : leçons gamifiées, dictionnaire, phrasebook, prononciation avec voix réelle, et classes avec des enseignants certifiés CEPOM.",
        bodyEn: "Medumba.AI is a learning app for the Medumba language (Bangangté, Ndé division, Cameroon): gamified lessons, a dictionary, phrasebook, real-voice pronunciation, and classes with CEPOM-certified teachers.",
    },
    {
        titleFr: "Compte utilisateur", titleEn: 'User account',
        bodyFr: "Vous devez fournir des informations exactes lors de la création de votre compte. Vous êtes responsable de la confidentialité de votre mot de passe.",
        bodyEn: "You must provide accurate information when creating your account. You are responsible for keeping your password confidential.",
    },
    {
        titleFr: 'Tarification', titleEn: 'Pricing',
        bodyFr: "L'application est gratuite pour le lancement. Aucune information de paiement n'est actuellement collectée.",
        bodyEn: "The app is free for the launch. No payment information is currently collected.",
    },
    {
        titleFr: 'Certifications', titleEn: 'Certifications',
        bodyFr: "Les certificats délivrés après un examen réussi (≥80%) attestent d'une réussite au sein de l'application Medumba.AI, en partenariat avec le CEPOM.",
        bodyEn: "Certificates issued after passing an exam (≥80%) attest to achievement within the Medumba.AI app, in partnership with CEPOM.",
    },
    {
        titleFr: 'Usage acceptable', titleEn: 'Acceptable use',
        bodyFr: "Vous vous engagez à ne pas utiliser l'application à des fins illégales ni à tenter de perturber son fonctionnement.",
        bodyEn: "You agree not to use the app for unlawful purposes or attempt to disrupt its operation.",
    },
    {
        titleFr: 'Nous contacter', titleEn: 'Contact us',
        bodyFr: 'Pour toute question sur ces conditions : medumba.ai@kaaynos.com',
        bodyEn: 'For any question about these terms: medumba.ai@kaaynos.com',
    },
];

const TermsPage = ({ nativeLang }) => {
    const isFr = nativeLang === 'french';
    return (
        <div style={{ minHeight: '100dvh', backgroundColor: '#f8fafc', fontFamily: "'Outfit',system-ui,sans-serif" }}>
            <div style={{ background: B, padding: '1.5rem 1.5rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <a href="/" style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>←</a>
                    <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Medumba.AI</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>📜 {isFr ? "Conditions d'utilisation" : 'Terms of Service'}</div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '1.5rem', maxWidth: '680px', margin: '-1.5rem auto 0' }}>
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.75rem 1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: '0.8rem', color: MUTED, marginBottom: '1.5rem' }}>
                        {isFr ? 'Dernière mise à jour : juillet 2026' : 'Last updated: July 2026'}
                    </p>
                    {SECTIONS.map((s, i) => (
                        <div key={i} style={{ marginBottom: i < SECTIONS.length - 1 ? '1.5rem' : 0 }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: '800', color: INK, marginBottom: '0.4rem' }}>{isFr ? s.titleFr : s.titleEn}</h2>
                            <p style={{ fontSize: '0.88rem', color: MUTED, lineHeight: 1.8, margin: 0 }}>{isFr ? s.bodyFr : s.bodyEn}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
