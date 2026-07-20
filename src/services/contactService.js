/* ─────────────────────────────────────────────────────────────────────────────
   contactService.js — Point de contact unique (formulaire → Supabase)
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── Envoyer un message de contact (public, pas besoin d'être connecté) ── */
export async function submitContactMessage({ name, email, phone, subject, message }) {
    const { error } = await supabase
        .from('contact_messages')
        .insert({ name, email, phone: phone || null, subject: subject || null, message });
    if (error) throw error;

    // Best-effort email notification — the message is already saved above,
    // so a failure here (e.g. Resend not configured) must not surface to the user.
    try {
        await fetch('/api/contact-notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, subject, message }),
        });
    } catch {
        // ignored — the message still landed in contact_messages
    }

    // Best-effort public landing-page comment — name + message only, never
    // email/phone, since this table is world-readable and streamed live.
    try {
        await supabase.from('landing_comments').insert({ name, message });
    } catch {
        // ignored — the private contact message above already succeeded
    }
}

/* ── Commentaires publics de la landing page (nom + message uniquement) ── */
export async function getLandingComments(limit = 20) {
    const { data, error } = await supabase
        .from('landing_comments')
        .select('id, name, message, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data ?? [];
}

/* ── S'abonner aux nouveaux commentaires en temps réel (Supabase Realtime) ── */
export function listenLandingComments(onInsert) {
    const channel = supabase
        .channel('landing_comments_feed')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'landing_comments' },
            (payload) => onInsert(payload.new))
        .subscribe();
    return () => supabase.removeChannel(channel);
}

/* ── Lire tous les messages (admin uniquement, RLS l'impose) ── */
export async function getContactMessages() {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
}

/* ── Marquer un message comme lu / traité ── */
export async function updateMessageStatus(id, status) {
    const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);
    if (error) throw error;
}
