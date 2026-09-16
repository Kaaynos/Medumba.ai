import posthog from 'posthog-js';

// Write-only client key — safe to ship in the public bundle, same class of
// key as the Supabase anon key in ./supabase.js.
const POSTHOG_KEY  = 'phc_y3visCeRyHnfPuDUTR8ZWcJonfVC7EwiTJvAgwKXQXL9';
const POSTHOG_HOST = 'https://us.i.posthog.com';

// Session replay stays off here deliberately — this app serves children,
// and recording real sessions needs a privacy/consent review (gate G5)
// before it's turned on, not just a checkbox in PostHog's UI.
export function initPosthog() {
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: '2026-05-30',
        person_profiles: 'identified_only',
        disable_session_recording: true,
    });
}

export { posthog };
