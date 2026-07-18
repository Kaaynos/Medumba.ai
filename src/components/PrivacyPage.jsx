const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const SECTIONS = [
    {
        titleFr: 'Quelles données collectons-nous ?', titleEn: 'What data do we collect?',
        bodyFr: "Lors de la création de votre compte : nom, âge, adresse e-mail, et mot de passe (via connexion e-mail) ou nom/e-mail/photo de profil (via connexion Google). Votre profil d'apprentissage : langue maternelle, objectif quotidien, raison d'apprendre et niveau. Votre progression : XP, gemmes, série de connexion (streak), leçons et certifications complétées. Si vous nous contactez : nom, e-mail, téléphone (facultatif) et le contenu de votre message.",
        bodyEn: "When you create an account: name, age, email address, and password (email sign-in) or name/email/profile photo (Google sign-in). Your learning profile: native language, daily goal, reason for learning and level. Your progress: XP, gems, login streak, completed lessons and certifications. If you contact us: name, email, phone (optional) and your message content.",
    },
    {
        titleFr: 'Comment utilisons-nous ces données ?', titleEn: 'How do we use this data?',
        bodyFr: "Uniquement pour faire fonctionner l'application : afficher votre progression, personnaliser vos leçons, sauvegarder vos certifications, et vous répondre si vous nous contactez. Nous ne vendons jamais vos données à des tiers.",
        bodyEn: "Only to make the app work: showing your progress, personalizing your lessons, saving your certifications, and replying if you contact us. We never sell your data to third parties.",
    },
    {
        titleFr: 'Où sont stockées vos données ?', titleEn: 'Where is your data stored?',
        bodyFr: 'Vos données sont hébergées chez Supabase (infrastructure PostgreSQL sécurisée). La connexion Google, si vous l\'utilisez, est gérée directement par Google selon leurs propres règles de confidentialité.',
        bodyEn: "Your data is hosted with Supabase (secure PostgreSQL infrastructure). Google sign-in, if you use it, is handled directly by Google under its own privacy policy.",
    },
    {
        titleFr: 'Vos droits', titleEn: 'Your rights',
        bodyFr: "Vous pouvez demander l'accès, la correction ou la suppression de vos données à tout moment en nous contactant via le formulaire de contact ou par e-mail.",
        bodyEn: "You can request access to, correction of, or deletion of your data at any time by contacting us via the contact form or by email.",
    },
    {
        titleFr: 'Nous contacter', titleEn: 'Contact us',
        bodyFr: 'Pour toute question sur vos données personnelles : contact@kaaynos.com',
        bodyEn: 'For any question about your personal data: contact@kaaynos.com',
    },
];

const PrivacyPage = ({ nativeLang }) => {
    const isFr = nativeLang === 'french';
    return (
        <div style={{ minHeight: '100dvh', backgroundColor: '#f8fafc', fontFamily: "'Outfit',system-ui,sans-serif" }}>
            <div style={{ background: B, padding: '1.5rem 1.5rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <a href="/" style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>←</a>
                    <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Medumba.AI</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>🔒 {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}</div>
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

export default PrivacyPage;
