/* ─────────────────────────────────────────────────────────────────────────────
   advisorService.js — Enrolment Advisor console: lead pipeline from first
   contact through trial to enrolment. RLS (migration 022) scopes reads/
   writes to advisor/admin roles. No call-count field or query here, by
   design — Mireille is measured on trials booked and trial-to-paid
   conversion, never on calls made.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

export async function listLeads(status = null) {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) { console.error('[advisorService] listLeads error:', error.message); return []; }
    return data;
}

export async function listCohortsForTrial() {
    const { data, error } = await supabase.from('cohorts').select('id, name, level, schedule_note').order('name');
    if (error) { console.error('[advisorService] listCohortsForTrial error:', error.message); return []; }
    return data;
}

export async function createLead({ name, contact, source, advisorId }) {
    const { error } = await supabase.from('leads').insert({
        name, contact: contact || null, source: source || null,
        assigned_advisor_id: advisorId || null,
    });
    if (error) throw error;
}

export async function bookTrial(leadId, { cohortId, scheduledAt }) {
    const { error } = await supabase.from('leads').update({
        status: 'trial_booked',
        trial_cohort_id: cohortId || null,
        trial_scheduled_at: scheduledAt || null,
        updated_at: new Date().toISOString(),
    }).eq('id', leadId);
    if (error) throw error;
}

export async function recordTrialOutcome(leadId, attended) {
    const { error } = await supabase.from('leads').update({
        status: attended ? 'trial_attended' : 'lost',
        trial_attended: attended,
        lost_reason: attended ? null : 'no_show',
        updated_at: new Date().toISOString(),
    }).eq('id', leadId);
    if (error) throw error;
}

export async function markEnrolled(leadId) {
    const { error } = await supabase.from('leads').update({
        status: 'enrolled',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }).eq('id', leadId);
    if (error) throw error;
}

export async function markLost(leadId, reason) {
    const { error } = await supabase.from('leads').update({
        status: 'lost', lost_reason: reason || null, updated_at: new Date().toISOString(),
    }).eq('id', leadId);
    if (error) throw error;
}

export async function updateLeadNotes(leadId, notes) {
    const { error } = await supabase.from('leads').update({
        notes, updated_at: new Date().toISOString(),
    }).eq('id', leadId);
    if (error) throw error;
}

/* Trials booked and trial-to-paid conversion only — intentionally no count
   of calls or contact attempts. */
export function computeAdvisorMetrics(leads) {
    const trialsBooked = leads.filter(l => l.status !== 'new').length;
    const trialsAttended = leads.filter(l => l.trial_attended === true).length;
    const enrolled = leads.filter(l => l.status === 'enrolled').length;
    const conversionRate = trialsAttended > 0 ? Math.round((enrolled / trialsAttended) * 100) : null;
    return { trialsBooked, trialsAttended, enrolled, conversionRate };
}
