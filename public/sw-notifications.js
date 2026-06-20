/* Service Worker — Medumba push notifications */
/* Upgrade path: add Firebase FCM importScripts here when VAPID key is ready */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
    if (!e.data) return;
    const data = e.data.json();
    e.waitUntil(
        self.registration.showNotification(data.title || 'Medumba', {
            body: data.body || '',
            icon: '/logo.png',
            badge: '/logo.png',
            tag: data.tag || 'medumba',
        })
    );
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            if (list.length) return list[0].focus();
            return clients.openWindow('/');
        })
    );
});
