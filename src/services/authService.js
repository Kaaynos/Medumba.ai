/* ─────────────────────────────────────────────────────────────────────────────
   authService.js — Supabase Auth (remplace Firebase Auth)
   Mêmes signatures de fonctions qu'avant pour ne pas casser l'app.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── Google OAuth redirect result (appelé au chargement) ── */
export async function handleGoogleRedirectResult() {
    // Supabase gère automatiquement la session OAuth via detectSessionInUrl
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    return _toUserShape(session.user);
}

/* ── Inscription email / mot de passe ── */
export async function registerUser({ name, email, password, age, language, reason, dailyGoal }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name, native_lang: language || 'french' },
        },
    });
    if (error) throw error;

    // Anti-énumération Supabase : si l'e-mail existe déjà (ex. compte créé
    // via Google), signUp() répond "succès" sans erreur mais avec un user
    // fantôme (identities: []) — aucun mot de passe n'est réellement créé.
    // Sans cette vérification, l'utilisateur croit s'être inscrit puis ne
    // peut plus jamais se connecter par e-mail/mot de passe.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        throw new Error('EMAIL_ALREADY_LINKED');
    }

    // Le trigger handle_new_user() crée automatiquement profiles + user_progress
    // On met à jour les champs supplémentaires immédiatement
    if (data.user) {
        await supabase.from('profiles').upsert({
            id:           data.user.id,
            name:         name         || '',
            age:          age          || null,
            native_lang:  language     || 'french',
            reason:       reason       || null,
            daily_goal:   dailyGoal    || 'normal',
        });
    }
    return data.user ? _toUserShape(data.user) : null;
}

/* ── Connexion email / mot de passe ── */
export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return _toUserShape(data.user);
}

/* ── Connexion Google OAuth ── */
export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin,
            queryParams: { prompt: 'select_account' },
        },
    });
    if (error) throw error;
    return null; // la page se recharge après le redirect
}

/* ── Déconnexion ── */
export async function logoutUser() {
    await supabase.auth.signOut();
}

/* ── Réinitialisation mot de passe ── */
export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
    });
    if (error) throw error;
}

/* ── Définir le nouveau mot de passe (après clic sur le lien de récupération) ── */
export async function updateUserPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
}

/* ── Profil utilisateur ── */
export async function getUserProfile(uid) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();
    if (error) return null;
    return data;
}

/* ── Marque le profil comme vu à l'instant (compteur "apprenants actifs") ── */
async function _touchLastSeen(uid) {
    if (!uid) return;
    try { await supabase.from('profiles').update({ last_seen: new Date().toISOString() }).eq('id', uid); }
    catch { /* best-effort, ne doit jamais bloquer la connexion */ }
}

/* ── Écouter les changements d'état auth (même API qu'Firebase) ──
   callback(user, event) — event vaut notamment 'PASSWORD_RECOVERY' quand
   la session vient d'un lien de réinitialisation de mot de passe, pour
   que l'appelant puisse rediriger vers l'écran "nouveau mot de passe"
   au lieu de traiter ça comme une connexion normale. ── */
export function listenAuthState(callback) {
    // Vérifier la session existante au démarrage
    supabase.auth.getSession().then(({ data: { session } }) => {
        callback(session?.user ? _toUserShape(session.user) : null, null);
    });

    // Écouter les changements futurs — met à jour last_seen sur une vraie
    // connexion (email/mot de passe ou Google OAuth), pas sur chaque refresh.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) _touchLastSeen(session.user.id);
        callback(session?.user ? _toUserShape(session.user) : null, event);
    });

    // Retourner la fonction d'unsubscribe (comme Firebase)
    return () => subscription.unsubscribe();
}

/* ── Convertit un user Supabase au format attendu par l'app ── */
function _toUserShape(user) {
    if (!user) return null;
    return {
        uid:         user.id,
        email:       user.email       || '',
        displayName: user.user_metadata?.name || user.user_metadata?.full_name || '',
        photoURL:    user.user_metadata?.avatar_url || null,
        // Supabase fields kept for compatibility
        id:          user.id,
        _raw:        user,
    };
}
