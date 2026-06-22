/* ─────────────────────────────────────────────────────────────────────────
   Stripe Configuration — Medumba.AI
   ─────────────────────────────────────────────────────────────────────────
   SETUP STEPS:
   1. Create a Stripe account at https://dashboard.stripe.com
   2. Go to Payment Links → + New link (create one per gem package)
   3. For each link → After payment → Redirect to website → set the URL below
   4. Paste the payment link URLs below

   SUCCESS URL to configure in Stripe dashboard for each package:
     p1 → https://votre-domaine.com/?payment=success&pkg=p1
     p2 → https://votre-domaine.com/?payment=success&pkg=p2
     p3 → https://votre-domaine.com/?payment=success&pkg=p3
     p4 → https://votre-domaine.com/?payment=success&pkg=p4

   For local testing use: http://localhost:5173/?payment=success&pkg=p1
──────────────────────────────────────────────────────────────────────────── */

export const STRIPE_MODE = 'test'; // 'test' | 'live'

// Stripe Payment Link URLs — replace with your real links from the dashboard
export const STRIPE_PAYMENT_LINKS = {
    p1: 'https://buy.stripe.com/test_REMPLACEZ_ICI_p1',  // 500 gems  — $1.99
    p2: 'https://buy.stripe.com/test_REMPLACEZ_ICI_p2',  // 1200 gems — $3.99
    p3: 'https://buy.stripe.com/test_REMPLACEZ_ICI_p3',  // 2000 gems — $5.99
    p4: 'https://buy.stripe.com/test_REMPLACEZ_ICI_p4',  // 5000 gems — $12.99
};

// Gem amounts per package (must match Stripe product prices)
export const PKG_GEMS = {
    p1:  500,
    p2: 1200,
    p3: 2000,
    p4: 5000,
};

// Open the Stripe payment link for a given gem package
export function openStripePayment(pkgId, userEmail) {
    const baseUrl = STRIPE_PAYMENT_LINKS[pkgId];
    if (!baseUrl || baseUrl.includes('REMPLACEZ_ICI')) {
        // Not configured yet — simulate success for demo
        return false;
    }
    // Save pkg to localStorage so we can recover it if URL params get lost
    try { localStorage.setItem('med_pending_pkg', pkgId); } catch {}

    const url = new URL(baseUrl);
    if (userEmail) url.searchParams.set('prefilled_email', userEmail);

    window.location.href = url.toString();
    return true;
}

// Read payment success from URL params (called on app load)
// Returns { pkg, gems } or null
export function getPaymentSuccessFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment') !== 'success') return null;
        const pkg = params.get('pkg') || localStorage.getItem('med_pending_pkg');
        if (!pkg || !PKG_GEMS[pkg]) return null;
        localStorage.removeItem('med_pending_pkg');
        // Clean the URL without reloading
        const clean = window.location.pathname;
        window.history.replaceState({}, '', clean);
        return { pkg, gems: PKG_GEMS[pkg] };
    } catch {
        return null;
    }
}
