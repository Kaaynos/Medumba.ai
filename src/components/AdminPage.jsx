import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/adminService';
import { getContactMessages, updateMessageStatus } from '../services/contactService';
import { getAllTestimonials, updateTestimonialStatus } from '../services/testimonialService';

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

function MethodBadge({ method, isFr }) {
  const isGoogle = method?.includes('google');
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '700',
      backgroundColor: isGoogle ? '#fef3c7' : '#eff6ff',
      color: isGoogle ? '#d97706' : B,
    }}>
      {isGoogle ? 'G Google' : `✉ ${isFr ? 'E-mail' : 'Email'}`}
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

function fmt(ts, isFr) {
  if (!ts) return '—';
  try {
    const d = ts.toDate ? ts.toDate() : typeof ts === 'string' ? new Date(ts) : new Date(ts.seconds * 1000);
    return d.toLocaleDateString(isFr ? 'fr-FR' : 'en-US');
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

export default function AdminPage({ onBack, currentUserUid, nativeLang }) {
  const isFr = nativeLang === 'french';
  const [tab, setTab]             = useState('users'); // 'users' | 'messages' | 'testimonials'
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState(null);
  const [error, setError]         = useState('');

  const [messages, setMessages]         = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const [testimonials, setTestimonials]         = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setError(isFr ? 'Erreur de chargement. Vérifiez les règles Firestore.' : 'Loading error. Check the Firestore rules.'))
      .finally(() => setLoading(false));
  }, [isFr]);

  useEffect(() => {
    getContactMessages()
      .then(setMessages)
      .catch(() => {})
      .finally(() => setMessagesLoading(false));
  }, []);

  useEffect(() => {
    getAllTestimonials()
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setTestimonialsLoading(false));
  }, []);

  const markStatus = async (id, status) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    try { await updateMessageStatus(id, status); } catch { /* best-effort */ }
  };

  const markTestimonialStatus = async (id, status) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    try { await updateTestimonialStatus(id, status); } catch { /* best-effort */ }
  };

  const newMessageCount = messages.filter(m => m.status === 'new').length;
  const pendingTestimonialCount = testimonials.filter(t => t.status === 'pending').length;

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
          ← {isFr ? 'Retour' : 'Back'}
        </button>
        <div>
          <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🛡️ Admin Panel</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>Medumba.AI</div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button onClick={() => setTab('users')} style={{
            padding: '0.55rem 1.1rem', borderRadius: '9999px', border: `2px solid ${tab === 'users' ? B : '#e2e8f0'}`,
            backgroundColor: tab === 'users' ? B : '#fff', color: tab === 'users' ? '#fff' : '#64748b',
            fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
          }}>👥 {isFr ? 'Utilisateurs' : 'Users'}</button>
          <button onClick={() => setTab('messages')} style={{
            padding: '0.55rem 1.1rem', borderRadius: '9999px', border: `2px solid ${tab === 'messages' ? B : '#e2e8f0'}`,
            backgroundColor: tab === 'messages' ? B : '#fff', color: tab === 'messages' ? '#fff' : '#64748b',
            fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
          }}>
            💬 {isFr ? 'Messages' : 'Messages'}
            {newMessageCount > 0 && (
              <span style={{ marginLeft: '0.4rem', backgroundColor: '#ef4444', color: '#fff', borderRadius: '9999px', padding: '0.05rem 0.45rem', fontSize: '0.7rem' }}>{newMessageCount}</span>
            )}
          </button>
          <button onClick={() => setTab('testimonials')} style={{
            padding: '0.55rem 1.1rem', borderRadius: '9999px', border: `2px solid ${tab === 'testimonials' ? B : '#e2e8f0'}`,
            backgroundColor: tab === 'testimonials' ? B : '#fff', color: tab === 'testimonials' ? '#fff' : '#64748b',
            fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
          }}>
            ⭐ {isFr ? 'Témoignages' : 'Testimonials'}
            {pendingTestimonialCount > 0 && (
              <span style={{ marginLeft: '0.4rem', backgroundColor: '#ef4444', color: '#fff', borderRadius: '9999px', padding: '0.05rem 0.45rem', fontSize: '0.7rem' }}>{pendingTestimonialCount}</span>
            )}
          </button>
        </div>

        {tab === 'messages' && (
          <div>
            {messagesLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Aucun message' : 'No messages'}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {messages.map(m => (
                  <div key={m.id} style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: m.status === 'new' ? '2px solid #bfdbfe' : '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a' }}>{m.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{m.email}{m.phone ? ` · ${m.phone}` : ''}</div>
                      </div>
                      <span style={{
                        flexShrink: 0, fontSize: '0.68rem', fontWeight: '800', padding: '0.15rem 0.6rem', borderRadius: '9999px',
                        backgroundColor: m.status === 'new' ? '#dbeafe' : m.status === 'read' ? '#fef3c7' : '#dcfce7',
                        color: m.status === 'new' ? '#1d4ed8' : m.status === 'read' ? '#b45309' : '#15803d',
                      }}>{m.status}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.75rem' }}>{m.message}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{fmt(m.created_at, isFr)}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {m.status !== 'read' && m.status !== 'replied' && (
                          <button onClick={() => markStatus(m.id, 'read')} style={{ fontSize: '0.72rem', fontWeight: '700', color: '#b45309', background: '#fef3c7', border: 'none', borderRadius: '8px', padding: '0.35rem 0.7rem', cursor: 'pointer', fontFamily: 'inherit' }}>{isFr ? 'Marquer lu' : 'Mark read'}</button>
                        )}
                        {m.status !== 'replied' && (
                          <button onClick={() => markStatus(m.id, 'replied')} style={{ fontSize: '0.72rem', fontWeight: '700', color: '#15803d', background: '#dcfce7', border: 'none', borderRadius: '8px', padding: '0.35rem 0.7rem', cursor: 'pointer', fontFamily: 'inherit' }}>{isFr ? 'Marquer répondu' : 'Mark replied'}</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'testimonials' && (
          <div>
            {testimonialsLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
            ) : testimonials.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Aucun témoignage' : 'No testimonials'}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {testimonials.map(t => (
                  <div key={t.id} style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: t.status === 'pending' ? '2px solid #bfdbfe' : '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a' }}>{t.name}</div>
                        {t.role && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.role}</div>}
                      </div>
                      <span style={{
                        flexShrink: 0, fontSize: '0.68rem', fontWeight: '800', padding: '0.15rem 0.6rem', borderRadius: '9999px',
                        backgroundColor: t.status === 'pending' ? '#dbeafe' : t.status === 'approved' ? '#dcfce7' : '#fee2e2',
                        color: t.status === 'pending' ? '#1d4ed8' : t.status === 'approved' ? '#15803d' : '#b91c1c',
                      }}>{t.status}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.75rem', fontStyle: 'italic' }}>"{t.message}"</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{fmt(t.created_at, isFr)}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {t.status !== 'approved' && (
                          <button onClick={() => markTestimonialStatus(t.id, 'approved')} style={{ fontSize: '0.72rem', fontWeight: '700', color: '#15803d', background: '#dcfce7', border: 'none', borderRadius: '8px', padding: '0.35rem 0.7rem', cursor: 'pointer', fontFamily: 'inherit' }}>{isFr ? 'Approuver' : 'Approve'}</button>
                        )}
                        {t.status !== 'rejected' && (
                          <button onClick={() => markTestimonialStatus(t.id, 'rejected')} style={{ fontSize: '0.72rem', fontWeight: '700', color: '#b91c1c', background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '0.35rem 0.7rem', cursor: 'pointer', fontFamily: 'inherit' }}>{isFr ? 'Rejeter' : 'Reject'}</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'users' && <>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <StatCard icon="👥" label={isFr ? 'Utilisateurs' : 'Users'}    value={users.length}  color={B} />
          <StatCard icon="🟢" label={isFr ? 'Actifs (7 jours)' : 'Active (7 days)'} value={activeCount}   color="#22c55e" />
          <StatCard icon="⭐" label={isFr ? 'XP total gagné' : 'Total XP earned'}  value={totalXP}       color="#f59e0b" />
          <StatCard icon="💎" label={isFr ? 'Gemmes distribuées' : 'Gems distributed'} value={users.length * 50} color="#8b5cf6" />
        </div>

        {/* Search */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '0.75rem 1rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '1.1rem' }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={isFr ? 'Rechercher par nom ou email...' : 'Search by name or email...'}
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
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
        ) : (
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#f1f5f9', fontSize: '0.72rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>{isFr ? 'Utilisateur' : 'User'}</span>
              <span>Email</span>
              <span>{isFr ? 'Méthode' : 'Method'}</span>
              <span>{isFr ? 'Niveau' : 'Level'}</span>
              <span>XP</span>
              <span>{isFr ? 'Inscrit' : 'Joined'}</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>{isFr ? 'Aucun résultat' : 'No results'}</div>
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
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{u.name || (isFr ? '(sans nom)' : '(no name)')}</div>
                      <div style={{ fontSize: '0.72rem', color: isActive(u.lastSeen) ? '#22c55e' : '#94a3b8', fontWeight: '600' }}>
                        {isActive(u.lastSeen) ? (isFr ? '● Actif récemment' : '● Recently active') : (isFr ? '○ Inactif' : '○ Inactive')}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email || '—'}</div>
                  <div><MethodBadge method={u.provider} isFr={isFr} /></div>
                  <div><LevelBadge level={u.level} /></div>
                  <div style={{ fontWeight: '800', color: B, fontSize: '0.9rem' }}>{u.xp ?? 0}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{fmt(u.createdAt, isFr)}</div>
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
                {isFr ? 'Détail' : 'Detail'} — {selected.name || selected.email}
              </div>
              <button onClick={() => setSelected(null)} style={{ border: 'none', background: '#f1f5f9', borderRadius: '8px', padding: '0.3rem 0.7rem', cursor: 'pointer', color: '#64748b', fontFamily: 'inherit' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { label: 'UID',                              value: selected.uid.slice(0, 16) + '...' },
                { label: isFr ? 'Objectif' : 'Goal',          value: isFr ? `${selected.dailyGoal ?? '—'} min/jour` : `${selected.dailyGoal ?? '—'} min/day` },
                { label: isFr ? 'Langue' : 'Language',        value: selected.language || '—' },
                { label: 'Streak',                            value: isFr ? `🔥 ${selected.streak ?? 0} jours` : `🔥 ${selected.streak ?? 0} days` },
                { label: isFr ? 'Gemmes' : 'Gems',            value: `💎 ${selected.gems ?? 0}` },
                { label: isFr ? 'Cœurs' : 'Hearts',           value: `❤️ ${selected.hearts ?? 0}` },
                { label: isFr ? 'Leçons' : 'Lessons',         value: isFr ? `${(selected.completedLessons ?? []).length} complétée(s)` : `${(selected.completedLessons ?? []).length} completed` },
                { label: isFr ? 'Raison' : 'Reason',          value: selected.reason || '—' },
                { label: isFr ? 'Âge' : 'Age',                value: selected.age || '—' },
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
          {isFr
            ? `${filtered.length} utilisateur(s) affiché(s) · Rapport du ${new Date().toLocaleString('fr-FR')}`
            : `${filtered.length} user(s) shown · Report as of ${new Date().toLocaleString('en-US')}`}
        </div>
        </>}
      </div>
    </div>
  );
}
