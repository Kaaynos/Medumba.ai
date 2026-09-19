import * as Sentry from '@sentry/react';

// Public DSN — safe to ship, same trust class as the Supabase anon key and
// the PostHog client key already in this directory. It only accepts error
// reports, it can't read anything back.
const SENTRY_DSN = 'https://f307c254b2d3c17122a21c872e1fce8c@o4512097066680320.ingest.us.sentry.io/4512097072250880';

export function initSentry() {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: import.meta.env.MODE,
        // Traces/replay stay off for the same reason session replay is off
        // in PostHog (see src/config/posthog.js) — this app serves
        // children, and replay-style tooling needs a privacy/consent pass
        // first. Plain error capture only for now.
    });
}

export { Sentry };
