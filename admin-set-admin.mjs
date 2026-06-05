// Donne le rôle admin à un utilisateur
// Usage : node admin-set-admin.mjs <uid>

import { readFileSync } from 'fs';
import { GoogleAuth } from 'google-auth-library';

const uid        = process.argv[2];
const PROJECT_ID = 'medumba-ia';

if (!uid) { console.error('Usage: node admin-set-admin.mjs <uid>'); process.exit(1); }

const auth   = new GoogleAuth({ keyFile: './service-account.json', scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
const client = await auth.getClient();
const token  = (await client.getAccessToken()).token;
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
const BASE    = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const res = await fetch(`${BASE}/users/${uid}?updateMask.fieldPaths=role`, {
  method: 'PATCH', headers,
  body: JSON.stringify({ fields: { role: { stringValue: 'admin' } } }),
});

if (res.ok) {
  console.log(`✅ Rôle admin accordé à l'utilisateur ${uid}`);
} else {
  const err = await res.json();
  console.error('❌ Erreur :', err.error?.message);
}
setTimeout(() => process.exit(0), 300);
