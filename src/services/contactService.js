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
