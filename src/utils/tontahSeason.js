// Plain-JS port of the seasonal Tontah package's src/lib/tontah/season.ts —
// northern-hemisphere rule from the supplied package; override here if the
// audience skews southern hemisphere later.
export function getTontahSeason(date = new Date()) {
    const month = date.getMonth() + 1;
    return month >= 5 && month <= 9 ? 'summer' : 'winter';
}

export const TONTAH_AVATARS = {
    summer: {
        64:  '/assets/tontah/summer/tontah-summer-avatar-64.webp',
        128: '/assets/tontah/summer/tontah-summer-avatar-128.webp',
        256: '/assets/tontah/summer/tontah-summer-avatar-256.webp',
    },
    winter: {
        64:  '/assets/tontah/winter/tontah-winter-avatar-64.webp',
        128: '/assets/tontah/winter/tontah-winter-avatar-128.webp',
        256: '/assets/tontah/winter/tontah-winter-avatar-256.webp',
    },
};

export function tontahAvatar(size = 128, date) {
    return TONTAH_AVATARS[getTontahSeason(date)][size];
}
