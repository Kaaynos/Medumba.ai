/* ─────────────────────────────────────────────────────────────────────────────
   zoomService.js — client-side wrapper around /api/zoom.
   Resolves which Zoom-licensed teacher a session belongs to (via the
   cohort → teacher → profiles.zoom_email chain), then asks the serverless
   function to create the meeting. Returns { configured: false } whenever
   Zoom isn't set up yet (env vars missing or this teacher has no
   zoom_email) — never throws, so a caller can just fall back to a manual
   link, same as before this existed.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

export async function createZoomMeeting({ sessionId, scheduledStart, durationMinutes }) {
    const { data: session } = await supabase.from('class_sessions').select('cohort_id').eq('id', sessionId).single();
    if (!session) return { configured: false };

    const { data: cohort } = await supabase.from('cohorts').select('teacher_id').eq('id', session.cohort_id).single();
    if (!cohort?.teacher_id) return { configured: false };

    const { data: teacher } = await supabase.from('profiles').select('zoom_email, name').eq('id', cohort.teacher_id).single();
    if (!teacher?.zoom_email) return { configured: false };

    const res = await fetch('/api/zoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'createMeeting',
            zoomEmail: teacher.zoom_email,
            topic: `Medumba.AI class — ${teacher.name || 'Teacher'}`,
            scheduledStart,
            durationMinutes,
        }),
    });
    if (!res.ok) return { configured: false };
    return res.json();
}

export async function deleteZoomMeeting(zoomMeetingId) {
    if (!zoomMeetingId) return;
    try {
        await fetch('/api/zoom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'deleteMeeting', meetingId: zoomMeetingId }),
        });
    } catch {
        // best-effort — a stray Zoom meeting from a cancelled session isn't worth surfacing an error for
    }
}
