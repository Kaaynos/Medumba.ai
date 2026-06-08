/**
 * expressionsByLesson.js
 *
 * Returns a pool of MEDUMBA_EXPRESSIONS relevant to a given lesson theme.
 * Also scales difficulty: early lessons prefer shorter expressions,
 * later lessons allow longer/more complex ones.
 */
import { MEDUMBA_EXPRESSIONS } from './medumbaExpressions';

/* ── Keyword sets per lesson theme ──────────────────────────────────────── */
const LESSON_KEYWORDS = {
  l1:  ['merci', 'excus', 'bientôt', 'bientot', 'aurevoir', 'bienvenue', 'prie',
         'instant', 'vœux', 'salu', 'bonjour', 'bonsoir', 'pardon', 'salut',
         'comment', 'appelles', 'présente', 'enchanté', 'ravi', 'adieu', 'félicit'],
  l2:  ['corps', 'taille', 'grand de', 'petit de', 'sang', 'gardes', 'mal au',
         'courir', 'bras', 'pied', 'tête', 'ventre', 'main', 'dents', 'yeux',
         'oreille', 'langue', 'bouche', 'cheveux'],
  l3:  ['manger', 'boire', 'eau', 'restaurant', 'cafet', 'tapioca', 'viande',
         'beignet', 'faim', 'nourriture', 'nager', 'repas', 'soif', 'cuisine',
         'lait', 'pain', 'fruit', 'légume', 'mangeons', 'buvons'],
  l4:  ['orange', 'robe', 'tissu', 'vêt', 'élégant', 'parfum', 'top ', 'couleur',
         'rouge', 'bleu', 'vert', 'jaune', 'blanc', 'noir', 'rose'],
  l5:  ['francs', 'argent', 'monnaie', 'heure', 'quatre jours', 'chaque fois',
         'midi', 'mille', 'cent', 'combien', 'zéro', 'numéro', 'chiffre',
         'premier', 'deuxième', 'compter', 'nombre'],
  l6:  ['porc', 'truie', 'chèvre', 'maïs', 'animal', 'oiseau', 'viande',
         'vache', 'mouton', 'chien', 'chat', 'poulet', 'bœuf', 'cochon'],
  l7:  ['mère', 'père', 'femme', 'mari', 'fils', 'enfant', 'famille', 'frère',
         'sœur', 'papa', 'fille', 'grand-mère', 'grand-père', 'cousin', 'oncle',
         'tante', 'neveu', 'nièce', 'époux', 'conjoint', 'parenté'],
  l8:  ['pluie', 'arbre', 'maïs', 'sciure', 'lumière', 'parapluie', 'soleil',
         'vent', 'nuage', 'saison', 'nature', 'fleuve', 'forêt', 'champ',
         'montagne', 'terre', 'ciel', 'nuit', 'matin', 'soir'],
  l9:  ['heure', 'aujourd', 'quantième', 'finalement', 'tardé', 'sieste',
         'chaque fois', 'tous les', 'temps', 'date', 'mois', 'année', 'semaine',
         'hier', 'demain', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
         'samedi', 'dimanche', 'janvier', 'hiver', 'printemps'],
  l10: ['bienvenue', 'ami', 'novel', 'situation actuelle', 'né ', 'connais',
        'présente', 'rencontre', 'qui es-tu', 'comment t\'appelles', 'âge',
        'origine', 'viens de', 'habites', 'nationalité', 'profession'],
  l11: ['manger', 'cuisin', 'réfrigér', 'beignet', 'viande', 'restaurant',
        'cafet', 'au réfrig', 'boire', 'eau au', 'salon', 'chambre', 'maison',
        'cuisine', 'pièce', 'lit', 'table', 'chaise', 'porte', 'fenêtre'],
  l12: ['malade', 'fatigué', 'fatigue', 'mal au', 'sang', 'injection',
        'contaminé', 'courir', 'pied', 'douleur', 'médecin', 'hôpital',
        'fièvre', 'remède', 'guérir', 'souffre', 'chaud', 'froid', 'soif'],
  l13: ['livre', 'école', 'examen', 'note', 'page', 'professeur', 'cours',
        'cahier', 'dessin', 'lire', 'diplôm', 'absent', 'élève', 'classe',
        'leçon', 'devoir', 'stylo', 'tableau', 'craie'],
  l14: ['travail', 'travaill', 'policier', 'bureau', 'diplôm', 'surveillant',
        'situation', 'profession', 'métier', 'emploi', 'patron', 'salaire',
        'médecin', 'enseignant', 'ingénieur', 'avocat', 'agriculteur'],
};

/**
 * Max word count (French text) allowed per lesson level.
 * Lessons 1-3 → short phrases only; 4-7 → medium; 8+ → no cap.
 * This ensures beginner lessons use simple, digestible expressions.
 */
const DIFFICULTY_WORD_CAP = {
  l1: 6, l2: 6, l3: 6,
  l4: 9, l5: 9, l6: 9, l7: 9,
  // l8-l14: no cap (allow complex expressions)
};

const MIN_POOL = 5;

function frWordCount(expr) {
  return expr.fr.trim().split(/\s+/).length;
}

/**
 * Returns expressions thematically relevant to `lessonId`.
 * Falls back to full MEDUMBA_EXPRESSIONS if the filtered pool is too small.
 */
export function getExpressionsByLesson(lessonId) {
  const keywords = LESSON_KEYWORDS[lessonId];
  if (!keywords) return MEDUMBA_EXPRESSIONS;

  const maxWords = DIFFICULTY_WORD_CAP[lessonId]; // undefined = no cap

  /* Step 1 – keyword filter */
  let pool = MEDUMBA_EXPRESSIONS.filter(e => {
    const lower = e.fr.toLowerCase();
    return keywords.some(kw => lower.includes(kw.toLowerCase()));
  });

  /* Step 2 – difficulty cap (early lessons only) */
  if (maxWords !== undefined) {
    const easy = pool.filter(e => frWordCount(e) <= maxWords);
    if (easy.length >= MIN_POOL) pool = easy;
  }

  if (pool.length >= MIN_POOL) return pool;

  /* Fallback: return a random sample of 15 expressions with the difficulty cap applied,
     instead of dumping all 261 on the learner */
  const fallbackPool = maxWords !== undefined
    ? MEDUMBA_EXPRESSIONS.filter(e => frWordCount(e) <= maxWords)
    : MEDUMBA_EXPRESSIONS;

  // Fisher-Yates shuffle then take 15
  const shuffled = [...fallbackPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 15);
}
