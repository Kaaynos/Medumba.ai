import { createClient } from '@supabase/supabase-js';

// Switched from amhzzwiqlmewghtlmjbm (paused: exceed_storage_size_quota,
// unrecovered) to pgubejptzgmqcdiltyns. Schema/RLS policies verified
// present (37/37 tables, 91 policies); medumba-audio Storage bucket and
// Auth provider config still need confirming before this is fully live.
const SUPABASE_URL  = 'https://pgubejptzgmqcdiltyns.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndWJlanB0emdtcWNkaWx0eW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMjQyNzMsImV4cCI6MjEwNDgwMDI3M30.Y4TT0qkHy4NhimCSy5_1Drxc2lmIbN_nMbP-Hu8A7YE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
        autoRefreshToken:    true,
        persistSession:      true,
        detectSessionInUrl:  true,
    },
});
