import { createClient } from '@supabase/supabase-js';

// Falls back to the production project when VITE_SUPABASE_* isn't set, so
// existing deployments and local dev keep working unchanged. Set
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (e.g. in Vercel's Preview
// environment, or a local .env.local — see .env.example) to point a
// deployment or local run at a staging project instead of production.
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL || 'https://amhzzwiqlmewghtlmjbm.supabase.co';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaHp6d2lxbG1ld2dodGxtamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTE0MDYsImV4cCI6MjA5Nzg2NzQwNn0.u5awGG3fob1zhh6-r6gNtrc8-KR-tnAL3-SETn7dcQA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
        autoRefreshToken:    true,
        persistSession:      true,
        detectSessionInUrl:  true,
    },
});
