import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://amhzzwiqlmewghtlmjbm.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaHp6d2lxbG1ld2dodGxtamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTE0MDYsImV4cCI6MjA5Nzg2NzQwNn0.u5awGG3fob1zhh6-r6gNtrc8-KR-tnAL3-SETn7dcQA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
        autoRefreshToken:    true,
        persistSession:      true,
        detectSessionInUrl:  true,
    },
});
