import { supabase } from '../config/supabase';

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*, user_progress(*)')
        .order('created_at', { ascending: false });
    if (error) { console.error('[adminService] getAllUsers error:', error.message); return []; }
    return data.map(p => {
        const progress = Array.isArray(p.user_progress) ? p.user_progress[0] : p.user_progress;
        return {
            uid: p.id,
            name: p.name,
            email: p.email,
            age: p.age,
            reason: p.reason,
            dailyGoal: p.daily_goal,
            nativeLang: p.native_lang,
            learningLang: p.learning_lang,
            proficiency: p.proficiency,
            createdAt: p.created_at,
            xp: progress?.xp ?? 0,
            gems: progress?.gems ?? 0,
            hearts: progress?.hearts ?? 0,
            streak: progress?.streak ?? 0,
            completedLessons: progress?.completed_lessons ?? [],
            lastActive: progress?.updated_at ?? null,
        };
    });
}

export async function isAdmin(uid) {
    if (!uid) return false;
    const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', uid)
        .single();
    return data?.is_admin ?? false;
}
