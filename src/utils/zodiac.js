/* Calcul discret du profil astrologique — usage interne uniquement */

const SIGNS = [
    { sign:'capricorn',  from:[12,22], to:[1,19]  },
    { sign:'aquarius',   from:[1,20],  to:[2,18]  },
    { sign:'pisces',     from:[2,19],  to:[3,20]  },
    { sign:'aries',      from:[3,21],  to:[4,19]  },
    { sign:'taurus',     from:[4,20],  to:[5,20]  },
    { sign:'gemini',     from:[5,21],  to:[6,20]  },
    { sign:'cancer',     from:[6,21],  to:[7,22]  },
    { sign:'leo',        from:[7,23],  to:[8,22]  },
    { sign:'virgo',      from:[8,23],  to:[9,22]  },
    { sign:'libra',      from:[9,23],  to:[10,22] },
    { sign:'scorpio',    from:[10,23], to:[11,21] },
    { sign:'sagittarius',from:[11,22], to:[12,21] },
];

export function getZodiacSign(month, day) {
    const m = parseInt(month, 10);
    const d = parseInt(day,   10);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) return null;

    for (const z of SIGNS) {
        const [fm, fd] = z.from;
        const [tm, td] = z.to;
        if (fm <= tm) {
            if ((m === fm && d >= fd) || (m === tm && d <= td) || (m > fm && m < tm)) return z.sign;
        } else {
            // Capricorne : chevauche décembre/janvier
            if ((m === fm && d >= fd) || (m === tm && d <= td) || m > fm || m < tm) return z.sign;
        }
    }
    return null;
}

/* Profil de personnalisation associé à chaque signe */
const PROFILES = {
    aries:       { pace:'fast',    style:'challenge',   motivation:'competition', focus:'action'     },
    taurus:      { pace:'steady',  style:'methodical',  motivation:'progress',    focus:'mastery'    },
    gemini:      { pace:'varied',  style:'interactive', motivation:'variety',     focus:'expression' },
    cancer:      { pace:'gentle',  style:'story',       motivation:'connection',  focus:'culture'    },
    leo:         { pace:'bold',    style:'performance', motivation:'recognition', focus:'speaking'   },
    virgo:       { pace:'precise', style:'analytical',  motivation:'accuracy',    focus:'grammar'    },
    libra:       { pace:'balanced',style:'aesthetic',   motivation:'harmony',     focus:'vocabulary' },
    scorpio:     { pace:'intense', style:'deep',        motivation:'mastery',     focus:'meaning'    },
    sagittarius: { pace:'fast',    style:'discovery',   motivation:'exploration', focus:'culture'    },
    capricorn:   { pace:'steady',  style:'structured',  motivation:'goals',       focus:'proficiency'},
    aquarius:    { pace:'varied',  style:'innovative',  motivation:'uniqueness',  focus:'expression' },
    pisces:      { pace:'gentle',  style:'intuitive',   motivation:'creativity',  focus:'stories'    },
};

export function getZodiacProfile(sign) {
    return sign ? (PROFILES[sign] ?? null) : null;
}

/* Messages motivationnels adaptés au profil */
const MOTIVATIONS = {
    fast:    ['Défi du jour : batte ton record !', 'Tu es en feu 🔥 — continue !', 'Plus vite, plus fort !'],
    steady:  ['Chaque leçon te rapproche du but.', 'La constance est la clé du succès.', 'Un pas après l\'autre.'],
    varied:  ['Essaie quelque chose de nouveau aujourd\'hui !', 'La surprise t\'attend dans la prochaine leçon.', 'Change de style — explore !'],
    gentle:  ['Prends le temps qu\'il faut.', 'Tu progresses à ton rythme — c\'est parfait.', 'La patience est une vertu.'],
    bold:    ['Montre ce que tu vaux !', 'Les autres t\'admirent — continue.', 'Tu es fait pour briller !'],
    precise: ['Vérifie chaque détail — l\'exactitude compte.', 'Perfectionne ta prononciation aujourd\'hui.', 'La précision fait le maître.'],
    balanced:['Équilibre travail et plaisir.', 'Une leçon bien faite vaut mieux que dix bâclées.', 'Trouve ton rythme idéal.'],
    intense: ['Plonge en profondeur dans la langue.', 'Maîtrise chaque nuance.', 'La profondeur te distingue.'],
    structured:['Suis ton plan — tu tiens le cap.', 'Les objectifs fixés sont là pour être atteints.', 'Méthodique et efficace.'],
    innovative:['Invente ta propre méthode.', 'Sois créatif dans ton apprentissage.', 'Le futur appartient aux innovateurs.'],
    intuitive: ['Laisse la langue te parler.', 'Fais confiance à ton instinct.', 'La langue coule naturellement.'],
};

export function getMotivationMessage(profile) {
    if (!profile) return null;
    const msgs = MOTIVATIONS[profile.pace] ?? MOTIVATIONS.steady;
    return msgs[Math.floor(Date.now() / 86400000) % msgs.length];
}

/* Ordre de présentation des leçons adapté au profil */
export function sortLessonsByProfile(lessons, profile) {
    if (!profile) return lessons;
    // Action/challenge → favorise les exercices pratiques en premier
    // Story/culture → favorise les leçons avec contexte culturel
    // Grammar/analytical → favorise les leçons grammaticales
    return [...lessons]; // extension future : réordonnancement fin
}
