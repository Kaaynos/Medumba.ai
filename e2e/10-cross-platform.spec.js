import { test } from '@playwright/test';

/**
 * Module 10 — Cross-Platform Consistency, QA doc v1.0 (CROSS-01..03)
 *
 * Out of scope for this web-only Playwright suite:
 * - CROSS-01 (same account/progress on Web and Mobile) and CROSS-02 (audio
 *   coverage parity) require a real Mobile (Flutter) app instance running
 *   alongside the web app — no such harness exists here.
 * - CROSS-03 (no crash on a clean Mobile install) is Mobile-only by the
 *   doc's own Platform tag.
 * Recommend manual QA across both apps for this module, or a dedicated
 * Flutter `integration_test` suite for the mobile side.
 */
test.skip('CROSS-01/02/03: N/A for a web-only suite — requires the Mobile app', () => {});
