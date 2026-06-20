/**
 * notifications.js
 * Browser push notifications for streak reminders.
 * Uses Web Notifications API + SW for background delivery.
 * Ready to upgrade to Firebase FCM when VAPID key is added.
 */

const LAST_SESSION_KEY = 'medumba_last_session';
const NOTIF_ENABLED_KEY = 'medumba_notif_enabled';
const REMINDER_DELAY_MS = 20 * 60 * 60 * 1000; // 20h
const ICON = '/logo.png';

/* ── Service Worker registration ─────────────────────────────── */

let _swReg = null;

export async function registerSW() {
    if (!('serviceWorker' in navigator)) return null;
    try {
        _swReg = await navigator.serviceWorker.register('/sw-notifications.js');
        return _swReg;
    } catch (e) {
        console.warn('[notif] SW registration failed:', e);
        return null;
    }
}

/* ── Permission ──────────────────────────────────────────────── */

export function getPermission() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
}

export async function requestPermission() {
    if (!('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied') return 'denied';
    const result = await Notification.requestPermission();
    return result;
}

/* ── Show a notification ─────────────────────────────────────── */

function _show(title, body, tag = 'medumba-default') {
    if (Notification.permission !== 'granted') return;
    const opts = { body, icon: ICON, badge: ICON, tag, renotify: true };
    if (_swReg) {
        _swReg.showNotification(title, opts).catch(() => {
            new Notification(title, opts);
        });
    } else {
        new Notification(title, opts);
    }
}

/* ── Streak reminder logic ───────────────────────────────────── */

let _reminderTimer = null;

export function recordSession() {
    localStorage.setItem(LAST_SESSION_KEY, Date.now().toString());
    cancelReminder();
    scheduleReminder();
}

export function cancelReminder() {
    if (_reminderTimer) { clearTimeout(_reminderTimer); _reminderTimer = null; }
}

export function scheduleReminder() {
    if (!isEnabled()) return;
    if (Notification.permission !== 'granted') return;

    cancelReminder();
    const last = parseInt(localStorage.getItem(LAST_SESSION_KEY) || '0', 10);
    const now = Date.now();
    const elapsed = now - last;
    const delay = Math.max(0, REMINDER_DELAY_MS - elapsed);

    _reminderTimer = setTimeout(() => {
        _show(
            '🔥 Ta flamme Medumba !',
            'Tu vas perdre ta série ! Fais au moins une leçon aujourd\'hui.',
            'medumba-streak',
        );
    }, delay);
}

/* ── Check on app open (cold start) ─────────────────────────── */

export function checkOnOpen(isFr = true) {
    if (!isEnabled()) return;
    if (Notification.permission !== 'granted') return;

    const last = parseInt(localStorage.getItem(LAST_SESSION_KEY) || '0', 10);
    if (!last) return;

    const hoursElapsed = (Date.now() - last) / (1000 * 60 * 60);

    if (hoursElapsed >= 20 && hoursElapsed < 48) {
        setTimeout(() => {
            _show(
                isFr ? '🔥 Ta flamme Medumba !' : '🔥 Your Medumba streak!',
                isFr
                    ? 'Tu vas perdre ta série ! Fais au moins une leçon aujourd\'hui.'
                    : 'You\'re about to lose your streak! Do at least one lesson today.',
                'medumba-streak',
            );
        }, 3000);
    }

    scheduleReminder();
}

/* ── Enabled flag ────────────────────────────────────────────── */

export function isEnabled() {
    return localStorage.getItem(NOTIF_ENABLED_KEY) === 'true';
}

export function setEnabled(val) {
    localStorage.setItem(NOTIF_ENABLED_KEY, val ? 'true' : 'false');
    if (!val) cancelReminder();
}

/* ── Daily lesson reminder (fixed 9 AM) ─────────────────────── */

export function scheduleDailyReminder(isFr = true) {
    if (!isEnabled()) return;
    if (Notification.permission !== 'granted') return;

    const now = new Date();
    const next9am = new Date();
    next9am.setHours(9, 0, 0, 0);
    if (now >= next9am) next9am.setDate(next9am.getDate() + 1);

    const delay = next9am - now;
    setTimeout(() => {
        _show(
            isFr ? '🌅 Medumba du matin' : '🌅 Morning Medumba',
            isFr ? 'Bonjour ! Ta leçon quotidienne t\'attend.' : 'Good morning! Your daily lesson is waiting.',
            'medumba-daily',
        );
        scheduleDailyReminder(isFr);
    }, delay);
}
