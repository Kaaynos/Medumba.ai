import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/adminService';

const B  = '#1B4FD8';
const BG = '#f8fafc';

function StatCard({ icon, label, value, color = B }) {
  return (
    <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
      <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: '900', color, marginBottom: '0.2rem' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    </div>
  );
}

function MethodBadge({ method }) {
  const isGoogle = method?.includes('google');
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '700',
      backgroundColor: isGoogle ? '#fef3c7' : '#eff6ff',
      color: isGoogle ? '#d97706' : B,
    }}>
      {isGoogle ? 'G Google' : '✉ Email'}
    </span>
  );
}

function LevelBadge({ level }) {
  const colors = { A1: '#22c55e', A2: '#84cc16', B1: '#f59e0b', B2: '#f97316', C1: '#ef4444', C2: '#8b5cf6' };
  return (
    <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '800', backgroundColor: colors[level] || '#e2e8f0', color: '#fff' }}>
      {level || 'A1'}
    </span>
  );
}

function fmt(ts) {
  if (!ts) return '—';
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000);
    return d.toLocaleDateString('fr-FR');
  } catch { return '—'; }
}

function isActive(lastSeen) {
  if (!lastSeen) return false;
  try {
    const d    = lastSeen.toDate ? lastSeen.toDate() : new Date(lastSeen.seconds * 1000);
    const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  } catch { return false; }
}

export default function AdminPage({ onBack, currentUserUid }) {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState(null);
  const [error, setError]         = useState('');

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setError('Erreur de chargement. Vérifiez les règles Firestore.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalXP    = users.reduce((s, u) => s + (u.xp || 0), 0);
  const activeCount = users.filter(u => isActive(u.lastSeen)).length;
  const googleCount = users.filter(u => u.provider === 'google.com').length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: 'inherit' }}>

      {/* Header */}
      <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#fff', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Retour
        </button>
        <div>
          <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🛡️ Admin Panel</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>Medumba.AI</div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <StatCard icon="👥" label="Utilisateurs"    value={users.length}  color={B} />
          <StatCard icon="🟢" label="Actifs (7 jours)" value={activeCount}   color="#22c55e" />
          <StatCard icon="⭐" label="XP total gagné"  value={totalXP}       color="#f59e0b" />
          <StatCard icon="💎" label="Gemmes distribués" value={users.length * 50} color="#8b5cf6" />
        </div>

        {/* Search */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '0.75rem 1rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '1.1rem' }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.95rem', color: '#0f172a', fontFamily: 'inherit', backgroundColor: 'transparent' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>}
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', color: '#b91c1c', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Chargement...</div>
        ) : (
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#f1f5f9', fontSize: '0.72rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Utilisateur</span>
              <span>Email</span>
              <span>Méthode</span>
              <span>Niveau</span>
              <span>XP</span>
              <span>Inscrit</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Aucun résultat</div>
            ) : (
              filtered.map(u => (
                <div
                  key={u.uid}
                  onClick={() => setSelected(selected?.uid === u.uid ? null : u)}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr',
                    gap: '0.5rem', padding: '0.9rem 1.25rem', alignItems: 'center',
                    borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                    backgroundColor: selected?.uid === u.uid ? '#eff6ff' : '#fff',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: B, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0 }}>
                      {(u.name?.[0] || u.email?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{u.name || '(sans nom)'}</div>
                      <div style={{ fontSize: '0.72rem', color: isActive(u.lastSeen) ? '#22c55e' : '#94a3b8', fontWeight: '600' }}>
                        {isActive(u.lastSeen) ? '● Actif récemment' : '○ Inactif'}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email || '—'}</div>
                  <div><MethodBadge method={u.provider} /></div>
                  <div><LevelBadge level={u.level} /></div>
                  <div style={{ fontWeight: '800', color: B, fontSize: '0.9rem' }}>{u.xp ?? 0}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{fmt(u.createdAt)}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Detail panel */}
        {selected && (
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', marginTop: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>
                Détail — {selected.name || selected.email}
              </div>
              <button onClick={() => setSelected(null)} style={{ border: 'none', background: '#f1f5f9', borderRadius: '8px', padding: '0.3rem 0.7rem', cursor: 'pointer', color: '#64748b', fontFamily: 'inherit' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { label: 'UID',         value: selected.uid.slice(0, 16) + '...' },
                { label: 'Objectif',    value: `${selected.dailyGoal ?? '—'} min/jour` },
                { label: 'Langue',      value: selected.language || '—' },
                { label: 'Streak',      value: `🔥 ${selected.streak ?? 0} jours` },
                { label: 'Gemmes',      value: `💎 ${selected.gems ?? 0}` },
                { label: 'Cœurs',       value: `❤️ ${selected.hearts ?? 0}` },
                { label: 'Leçons',      value: `${(selected.completedLessons ?? []).length} complétée(s)` },
                { label: 'Raison',      value: selected.reason || '—' },
                { label: 'Âge',         value: selected.age || '—' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: BG, borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
          {filtered.length} utilisateur(s) affiché(s) · Rapport du {new Date().toLocaleString('fr-FR')}
        </div>
      </div>
    </div>
  );
}
