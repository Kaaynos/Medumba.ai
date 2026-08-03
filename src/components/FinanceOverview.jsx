import { useState, useEffect } from 'react';
import { listCohorts } from '../services/adminService';
import { STRIPE_PAYMENT_LINKS, PKG_GEMS } from '../config/stripe';

const B = '#1B4FD8';

const LOCATION_LABELS = {
    cameroon:     { fr: 'Cameroun',          en: 'Cameroon' },
    diaspora_us:  { fr: 'Diaspora (US)',     en: 'Diaspora (US)' },
    diaspora_fr:  { fr: 'Diaspora (France)', en: 'Diaspora (France)' },
    other:        { fr: 'Autre',             en: 'Other' },
};

function Card({ title, children }) {
    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.85rem' }}>{title}</div>
            {children}
        </div>
    );
}

function Row({ label, value, valueColor = '#0f172a' }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f8fafc' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{label}</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: valueColor }}>{value}</span>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   FinanceOverview
   Personas & Journeys v2, Finance Manager: "No interface today... nobody
   is watching gross margin per active household." This ships real
   signals that exist today (headcount, location split, enrollment,
   gems in circulation) and states plainly what doesn't exist yet
   (revenue — Stripe payment links are still placeholders) rather than
   fabricating a dollar figure.
════════════════════════════════════════════════════════════════════ */
const FinanceOverview = ({ isFr, users }) => {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { listCohorts().then(setCohorts).finally(() => setLoading(false)); }, []);

    const configuredPackages = Object.entries(STRIPE_PAYMENT_LINKS).filter(([, url]) => !url.includes('REMPLACEZ_ICI'));
    const revenueConfigured = configuredPackages.length > 0;

    const totalGems = users.reduce((s, u) => s + (u.gems || 0), 0);
    const totalXP   = users.reduce((s, u) => s + (u.xp || 0), 0);

    const locationCounts = users.reduce((acc, u) => {
        const key = u.locationType || 'other';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const teacherCount     = users.filter(u => u.role === 'teacher').length;
    const coordinatorCount = users.filter(u => u.role === 'coordinator').length;
    const totalEnrollments = cohorts.reduce((s, c) => s + (c.memberCount || 0), 0);
    const cohortsNoTeacher = cohorts.filter(c => !c.teacherName).length;

    return (
        <div>
            <Card title={`💳 ${isFr ? 'Revenus & paiements' : 'Revenue & payments'}`}>
                <div style={{
                    padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '0.85rem',
                    backgroundColor: revenueConfigured ? '#f0fdf4' : '#fffbeb',
                    border: `1.5px solid ${revenueConfigured ? '#bbf7d0' : '#fde68a'}`,
                    fontSize: '0.85rem', color: revenueConfigured ? '#15803d' : '#b45309', fontWeight: '600',
                }}>
                    {revenueConfigured
                        ? (isFr ? `${configuredPackages.length} forfait(s) Stripe configuré(s).` : `${configuredPackages.length} Stripe package(s) configured.`)
                        : (isFr
                            ? '⚠ Aucun paiement réel configuré — tous les liens Stripe sont des emplacements réservés. Les achats de gemmes sont actuellement simulés (mode démo), sans revenu réel.'
                            : '⚠ No real payments configured — every Stripe payment link is still a placeholder. Gem purchases currently simulate success (demo mode), with no real revenue.')}
                </div>
                {Object.entries(PKG_GEMS).map(([pkg, gems]) => {
                    const configured = !STRIPE_PAYMENT_LINKS[pkg]?.includes('REMPLACEZ_ICI');
                    return (
                        <Row key={pkg}
                            label={`${pkg} — ${gems} ${isFr ? 'gemmes' : 'gems'}`}
                            value={configured ? (isFr ? '✅ Configuré' : '✅ Configured') : (isFr ? '— Non configuré' : '— Not configured')}
                            valueColor={configured ? '#16a34a' : '#94a3b8'}
                        />
                    );
                })}
            </Card>

            <Card title={`🌍 ${isFr ? 'Répartition géographique' : 'Location breakdown'}`}>
                {Object.entries(locationCounts).map(([key, count]) => (
                    <Row key={key} label={LOCATION_LABELS[key]?.[isFr ? 'fr' : 'en'] || key} value={`${count} (${Math.round(count / users.length * 100)}%)`} />
                ))}
            </Card>

            <Card title={`🎓 ${isFr ? 'Cohortes & inscriptions' : 'Cohorts & enrollment'}`}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : (
                    <>
                        <Row label={isFr ? 'Utilisateurs inscrits' : 'Registered users'} value={users.length} />
                        <Row label={isFr ? 'Enseignants' : 'Teachers'} value={teacherCount} />
                        <Row label={isFr ? 'Coordinateurs' : 'Coordinators'} value={coordinatorCount} />
                        <Row label={isFr ? 'Cohortes actives' : 'Active cohorts'} value={cohorts.length} />
                        <Row label={isFr ? 'Inscriptions en cohorte' : 'Cohort enrollments'} value={totalEnrollments} />
                        {cohortsNoTeacher > 0 && (
                            <Row label={isFr ? '⚠ Cohortes sans enseignant' : '⚠ Cohorts with no teacher'} value={cohortsNoTeacher} valueColor="#d97706" />
                        )}
                    </>
                )}
            </Card>

            <Card title={`💎 ${isFr ? 'Économie de jeu' : 'Game economy'}`}>
                <Row label={isFr ? 'Gemmes en circulation' : 'Gems in circulation'} value={totalGems} />
                <Row label={isFr ? 'XP total gagné' : 'Total XP earned'} value={totalXP} />
            </Card>

            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
                {isFr
                    ? 'Ce tableau ne montre que des chiffres réels — aucun revenu n\'est estimé tant que Stripe n\'est pas configuré.'
                    : 'This dashboard only shows real numbers — no revenue is estimated until Stripe is actually configured.'}
            </div>
        </div>
    );
};

export default FinanceOverview;
