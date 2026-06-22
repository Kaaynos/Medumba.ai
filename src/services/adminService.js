import { supabase } from '../config/supabase';

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*, user_progress(*)')
        .order('created_at', { ascending: false });
    if (error) return [];
    return data.map(p => ({ uid: p.id, ...p }));
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
