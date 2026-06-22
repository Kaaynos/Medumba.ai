/* ═══════════════════════════════════════════════════════════════════
   Firebase Cloud Functions — Medumba.AI
   Stripe payment integration (upgrade from Payment Links)

   DÉPLOIEMENT :
   1. firebase login
   2. firebase use medumba-ia
   3. cd functions && npm install
   4. firebase functions:config:set stripe.secret="sk_live_YOUR_KEY"
      (ou sk_test_... pour les tests)
   5. firebase deploy --only functions

   La fonction `createCheckoutSession` remplace les Payment Links
   pour un flow 100% sécurisé avec vérification côté serveur.
═══════════════════════════════════════════════════════════════════ */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret }       = require('firebase-functions/params');
const admin                  = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const stripeSecret = defineSecret('STRIPE_SECRET');

// Gem package prices (must match Stripe Product prices)
const PKG_CONFIG = {
    p1: { gems: 500,  price: 199,  currency: 'usd', name: '500 Diamants' },
    p2: { gems: 1200, price: 399,  currency: 'usd', name: '1,200 Diamants' },
    p3: { gems: 2000, price: 599,  currency: 'usd', name: '2,000 Diamants' },
    p4: { gems: 5000, price: 1299, currency: 'usd', name: '5,000 Diamants' },
};

/* ── createCheckoutSession ──────────────────────────────────────
   Called from frontend to start a Stripe Checkout session.
   Returns { url } — redirect the user to this URL.
──────────────────────────────────────────────────────────────── */
exports.createCheckoutSession = onCall({ secrets: [stripeSecret] }, async (req) => {
    const { pkgId, successUrl, cancelUrl } = req.data;
    const uid  = req.auth?.uid;

    if (!uid)        throw new HttpsError('unauthenticated', 'Vous devez être connecté.');
    if (!PKG_CONFIG[pkgId]) throw new HttpsError('invalid-argument', 'Forfait invalide.');

    const Stripe = require('stripe');
    const stripe = Stripe(stripeSecret.value());
    const pkg    = PKG_CONFIG[pkgId];

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: pkg.currency,
                product_data: { name: pkg.name, description: 'Medumba.AI — Diamants' },
                unit_amount: pkg.price,
            },
            quantity: 1,
        }],
        metadata: { uid, pkgId, gems: String(pkg.gems) },
        success_url: `${successUrl}?payment=success&pkg=${pkgId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${cancelUrl}?payment=cancelled`,
    });

    return { url: session.url };
});

/* ── stripeWebhook ──────────────────────────────────────────────
   Receives Stripe events to confirm payment server-side.
   Configure in Stripe Dashboard → Webhooks → your endpoint.
   Events: checkout.session.completed
──────────────────────────────────────────────────────────────── */
const { onRequest } = require('firebase-functions/v2/https');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

exports.stripeWebhook = onRequest(
    { secrets: [stripeSecret, stripeWebhookSecret] },
    async (req, res) => {
        const Stripe = require('stripe');
        const stripe = Stripe(stripeSecret.value());
        const sig    = req.headers['stripe-signature'];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody, sig, stripeWebhookSecret.value()
            );
        } catch (err) {
            console.error('Webhook signature failed:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const { uid, pkgId, gems } = session.metadata;

            if (uid && pkgId && gems) {
                const userRef = db.collection('users').doc(uid);
                await userRef.update({
                    gems: admin.firestore.FieldValue.increment(parseInt(gems, 10)),
                    [`purchases.${pkgId}`]: admin.firestore.FieldValue.increment(1),
                    lastPurchaseAt: admin.firestore.FieldValue.serverTimestamp(),
                });
                console.log(`✅ ${gems} gems added for user ${uid} (pkg: ${pkgId})`);
            }
        }

        res.json({ received: true });
    }
);
