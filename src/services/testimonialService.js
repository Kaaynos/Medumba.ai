/* ─────────────────────────────────────────────────────────────────────────────
   testimonialService.js — Témoignages soumis par les utilisateurs (formulaire → Supabase, modérés avant affichage)
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── Soumettre un témoignage (public, pas besoin d'être connecté) ── */
export async function submitTestimonial({ name, role, message }) {
    const { error } = await supabase
        .from('testimonials')
        .insert({ name, role: role || null, message });
    if (error) throw error;
}

/* ── Lire les témoignages approuvés (public, pour la landing page) ── */
export async function getApprovedTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
}

/* ── Lire tous les témoignages (admin uniquement, RLS l'impose) ── */
export async function getAllTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
}

/* ── Approuver / rejeter un témoignage ── */
export async function updateTestimonialStatus(id, status) {
    const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id);
    if (error) throw error;
}
