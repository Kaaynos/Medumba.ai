/* ─────────────────────────────────────────────────────────────────────────────
   teacherService.js — Teacher portal: own cohorts, roster, homework note.
   RLS (migration 015) scopes every read here to cohorts this teacher owns.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── The teacher's own cohorts ── */
export async function getMyCohorts(teacherUid) {
    const { data, error } = await supabase
        .from('cohorts')
        .select('*')
        .eq('teacher_id', teacherUid)
        .order('created_at', { ascending: true });
    if (error) { console.error('[teacherService] getMyCohorts error:', error.message); return []; }
    return data;
}

/* ── Roster for one cohort: member profile + their practice signals ── */
export async function getCohortRoster(cohortId) {
    const { data: members, error } = await supabase
        .from('cohort_members')
        .select('id, profile_id')
        .eq('cohort_id', cohortId);
    if (error) { console.error('[teacherService] getCohortRoster error:', error.message); return []; }
    if (members.length === 0) return [];

    const ids = members.map(m => m.profile_id);
    const [{ data: profiles }, { data: progress }] = await Promise.all([
        supabase.from('profiles').select('id, name, birth_year, last_seen').in('id', ids),
        supabase.from('user_progress').select('*').in('user_id', ids),
    ]);
    const profileById  = Object.fromEntries((profiles ?? []).map(p => [p.id, p]));
    const progressById = Object.fromEntries((progress ?? []).map(p => [p.user_id, p]));

    return members.map(m => ({
        memberId: m.id,
        profileId: m.profile_id,
        name: profileById[m.profile_id]?.name || null,
        birthYear: profileById[m.profile_id]?.birth_year || null,
        // Real login/usage activity — NOT user_progress.updated_at, which only
        // changes when XP/streak actually move and so reads stale for a
        // student who logged in but didn't finish a lesson.
        lastSeen: profileById[m.profile_id]?.last_seen || null,
        progress: progressById[m.profile_id] || null,
    }));
}

/* ── The one homework note for the cohort's current week ── */
export async function updateCohortHomework(cohortId, text) {
    const { error } = await supabase
        .from('cohorts')
        .update({ homework_note: text, homework_updated_at: new Date().toISOString() })
        .eq('id', cohortId);
    if (error) throw error;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Class sessions & attendance — a session is a real, actionable class date:
   when, and the link to actually join (entered by hand — no video-room API
   is wired into this codebase, so this doesn't fabricate one).
───────────────────────────────────────────────────────────────────────────── */

export async function listCohortSessions(cohortId) {
    const { data, error } = await supabase
        .from('class_sessions')
        .select('*')
        .eq('cohort_id', cohortId)
        .order('session_date', { ascending: true });
    if (error) { console.error('[teacherService] listCohortSessions error:', error.message); return []; }
    return data;
}

export async function createClassSession(cohortId, { sessionDate, scheduledStart, durationMinutes, meetingLink, notes }) {
    // scheduledStart (ISO timestamp) is the real prerequisite for Zoom
    // automation and punctuality tracking; sessionDate alone still works
    // for a session with no known time yet (backward compatible).
    const row = {
        cohort_id: cohortId,
        session_date: sessionDate || (scheduledStart ? scheduledStart.slice(0, 10) : null),
        scheduled_start: scheduledStart || null,
        duration_minutes: durationMinutes || 60,
        meeting_link: meetingLink || null,
        notes: notes || null,
    };
    const { data, error } = await supabase
        .from('class_sessions')
        .insert(row)
        .select()
        .single();
    if (error) throw error;

    // Best-effort Zoom automation — never blocks session creation. Degrades
    // silently to the manually-entered meetingLink above when Zoom isn't
    // configured (no env vars) or this teacher has no zoom_email set yet.
    if (scheduledStart) {
        try {
            const { createZoomMeeting } = await import('./zoomService');
            const zoom = await createZoomMeeting({ sessionId: data.id, scheduledStart, durationMinutes: row.duration_minutes });
            if (zoom?.configured) {
                const { data: updated } = await supabase
                    .from('class_sessions')
                    .update({ zoom_meeting_id: zoom.meetingId, zoom_join_url: zoom.joinUrl, zoom_start_url: zoom.startUrl, meeting_link: zoom.joinUrl })
                    .eq('id', data.id)
                    .select()
                    .single();
                if (updated) return updated;
            }
        } catch (e) {
            console.warn('[teacherService] Zoom automation skipped:', e.message);
        }
    }
    return data;
}

/* ── Teacher punctuality ───────────────────────────────────────────────
   markSessionStarted is a self-reported proxy for "did she show up" — the
   teacher taps it when she starts the class. Not Zoom-verified (a webhook
   on meeting.started would be more accurate; that needs the same Zoom app
   as createZoomMeeting above, worth revisiting once that exists). ──────── */
export async function markSessionStarted(sessionId) {
    const { error } = await supabase
        .from('class_sessions')
        .update({ teacher_started_at: new Date().toISOString() })
        .eq('id', sessionId);
    if (error) throw error;
}

/** Punctuality across a teacher's own sessions: average lateness in minutes
 *  (only counting sessions that were actually started), and a count of
 *  sessions that had a scheduled_start already in the past with no
 *  teacher_started_at and no 'completed' status — i.e. plausibly missed. */
export async function getPunctualityStats(teacherId) {
    const { data: cohorts } = await supabase.from('cohorts').select('id').eq('teacher_id', teacherId);
    const cohortIds = (cohorts ?? []).map(c => c.id);
    if (cohortIds.length === 0) return { avgLateMinutes: 0, sessionsStarted: 0, sessionsMissed: 0 };

    const { data: sessions, error } = await supabase
        .from('class_sessions')
        .select('scheduled_start, teacher_started_at, status')
        .in('cohort_id', cohortIds)
        .not('scheduled_start', 'is', null);
    if (error) { console.error('[teacherService] getPunctualityStats error:', error.message); return { avgLateMinutes: 0, sessionsStarted: 0, sessionsMissed: 0 }; }

    const now = Date.now();
    let lateSum = 0, started = 0, missed = 0;
    for (const s of sessions ?? []) {
        const scheduled = new Date(s.scheduled_start).getTime();
        if (s.teacher_started_at) {
            const lateMinutes = Math.max(0, Math.round((new Date(s.teacher_started_at).getTime() - scheduled) / 60000));
            lateSum += lateMinutes;
            started += 1;
        } else if (scheduled < now && s.status !== 'completed' && s.status !== 'cancelled') {
            missed += 1;
        }
    }
    return { avgLateMinutes: started > 0 ? Math.round(lateSum / started) : 0, sessionsStarted: started, sessionsMissed: missed };
}

export async function updateSessionStatus(sessionId, status) {
    const { error } = await supabase.from('class_sessions').update({ status }).eq('id', sessionId);
    if (error) throw error;
}

export async function getSessionAttendance(sessionId) {
    const { data, error } = await supabase.from('attendance').select('*').eq('session_id', sessionId);
    if (error) { console.error('[teacherService] getSessionAttendance error:', error.message); return []; }
    return data;
}

export async function markAttendance(sessionId, profileId, present) {
    const { error } = await supabase
        .from('attendance')
        .upsert({ session_id: sessionId, profile_id: profileId, present, marked_at: new Date().toISOString() }, { onConflict: 'session_id,profile_id' });
    if (error) throw error;
}
