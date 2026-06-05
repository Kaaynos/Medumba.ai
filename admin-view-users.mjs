// Script d'administration – liste tous les utilisateurs (Auth + Firestore)
// Usage : node admin-view-users.mjs

import { readFileSync } from 'fs';
import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = 'medumba-ia';
const SA_FILE    = './service-account.json';

const auth   = new GoogleAuth({ keyFile: SA_FILE, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
const client = await auth.getClient();
const token  = (await client.getAccessToken()).token;
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
const BASE    = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ── Lecture Firestore ────────────────────────────────────────────
async function listFirestoreUsers() {
  const res  = await fetch(`${BASE}/users`, { headers });
  const data = await res.json();
  if (!res.ok) return {};
  const map = {};
  for (const doc of (data.documents ?? [])) {
    const uid = doc.name.split('/').pop();
    map[uid] = doc.fields ?? {};
  }
  return map;
}

// ── Lecture Firebase Auth ────────────────────────────────────────
async function listAuthUsers() {
  const res  = await fetch(
    `https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:query`,
    { method: 'POST', headers, body: JSON.stringify({ returnUserInfo: true }) }
  );
  const data = await res.json();
  return data.userInfo ?? [];
}

// ── Créer profil Firestore manquant ──────────────────────────────
async function createMissingProfile(uid, name, email, provider) {
  const now  = new Date().toISOString();
  const body = {
    fields: {
      name:             { stringValue: name || '' },
      email:            { stringValue: email || '' },
      age:              { nullValue: null },
      language:         { stringValue: 'french' },
      reason:           { nullValue: null },
      dailyGoal:        { integerValue: 10 },
      xp:               { integerValue: 0 },
      streak:           { integerValue: 0 },
      gems:             { integerValue: 50 },
      hearts:           { integerValue: 5 },
      level:            { stringValue: 'A1' },
      completedLessons: { arrayValue: { values: [] } },
      createdAt:        { timestampValue: now },
      lastSeen:         { timestampValue: now },
      restoredFromAuth: { booleanValue: true },
    }
  };
  const res = await fetch(`${BASE}/users/${uid}`, {
    method: 'PATCH', headers,
    body: JSON.stringify(body),
  });
  return res.ok;
}

function fmt(ts) {
  if (!ts) return '—';
  try { return new Date(ts).toLocaleString('fr-FR'); } catch { return ts; }
}

// ── Main ─────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(70));
console.log('  MEDUMBA.AI — BASE DE DONNÉES UTILISATEURS');
console.log('═'.repeat(70));

const [firestoreMap, authUsers] = await Promise.all([listFirestoreUsers(), listAuthUsers()]);

if (authUsers.length === 0) {
  console.log('\n  ⚠  Aucun compte enregistré.\n');
  setTimeout(() => process.exit(0), 300);
}

// Restaurer les profils Firestore manquants
let restored = 0;
for (const u of authUsers) {
  if (!firestoreMap[u.localId]) {
    const name     = u.displayName || u.email?.split('@')[0] || '';
    const provider = u.providerUserInfo?.[0]?.providerId || 'email';
    const ok       = await createMissingProfile(u.localId, name, u.email || '', provider);
    if (ok) {
      firestoreMap[u.localId] = { _restored: true };
      restored++;
    }
  }
}

if (restored > 0) {
  console.log(`\n  ✅ ${restored} profil(s) manquant(s) restauré(s) depuis Firebase Auth.\n`);
}

console.log(`  Total : ${authUsers.length} utilisateur(s)\n`);

let i = 1;
for (const u of authUsers) {
  const providers = u.providerUserInfo?.map(p => p.providerId).join(', ') || '—';
  const fs        = firestoreMap[u.localId];
  const hasFs     = fs && !fs._restored;

  console.log('─'.repeat(70));
  console.log(`  #${i++}  ${u.displayName || '(sans nom)'}  <${u.email || '—'}>`);
  console.log(`  UID        : ${u.localId}`);
  console.log(`  Méthode    : ${providers}`);
  console.log(`  Firestore  : ${hasFs ? '✅ profil complet' : '⚠️  profil restauré (données par défaut)'}`);
  console.log(`  Inscrit    : ${fmt(u.createdAt ? new Date(Number(u.createdAt)).toISOString() : null)}`);
  console.log(`  Dernière cx: ${fmt(u.lastLoginAt ? new Date(Number(u.lastLoginAt)).toISOString() : null)}`);
  console.log(`  Auth actif : ${u.disabled ? '🔴 Désactivé' : '🟢 Actif'}`);
}

console.log('═'.repeat(70));
console.log(`\n  Rapport généré le ${new Date().toLocaleString('fr-FR')}\n`);
setTimeout(() => process.exit(0), 300);
