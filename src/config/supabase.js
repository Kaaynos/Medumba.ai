import { createClient } from '@supabase/supabase-js';

// Copie ces valeurs depuis : supabase.com → ton projet → Settings → API
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || 'https://REMPLACE.supabase.co';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || 'REMPLACE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
        autoRefreshToken:    true,
        persistSession:      true,
        detectSessionInUrl:  true,
    },
});
