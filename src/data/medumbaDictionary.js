/* ════════════════════════════════════════════════════════════════
   medumbaDictionary.js
   Auto-generated from Dictionnaire Ncobnkùn.xlsx
   4257 total entries — columns A (Medumba) & E (French)
════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   VARIETY_QUESTIONS — mixed exercise types (meaning / audio / match)
   Interleaved into every Medumba lesson to break monotony.
════════════════════════════════════════════════════════════════ */
export const VARIETY_QUESTIONS = [
    /* ── meaning: show native-language word, choose Medumba translation ── */
    {
        type: 'meaning',
        sourceFr: 'Chien', sourceEn: 'Dog', audio: 'Mbʉ',
        options: ['Mbʉ', 'Bùsi', 'Saŋə', 'Ngǒntsə'],
        optionsFr: ['Mbʉ', 'Bùsi', 'Saŋə', 'Ngǒntsə'],
        answer: 'Mbʉ', answerFr: 'Mbʉ',
    },
    {
        type: 'meaning',
        sourceFr: 'Eau', sourceEn: 'Water', audio: 'Ntsə',
        options: ['Ntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        optionsFr: ['Ntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        answer: 'Ntsə', answerFr: 'Ntsə',
    },
    {
        type: 'meaning',
        sourceFr: 'Soleil', sourceEn: 'Sun', audio: 'Nyàm',
        options: ['Nyàm', 'Mαŋwʉ', 'Mbwoge', 'Mbàŋ'],
        optionsFr: ['Nyàm', 'Mαŋwʉ', 'Mbwoge', 'Mbàŋ'],
        answer: 'Nyàm', answerFr: 'Nyàm',
    },
    {
        type: 'meaning',
        sourceFr: 'Enfant', sourceEn: 'Child', audio: 'Mɛn',
        options: ['Mɛn', 'Ngòn', 'Nshùm', 'Fàd'],
        optionsFr: ['Mɛn', 'Ngòn', 'Nshùm', 'Fàd'],
        answer: 'Mɛn', answerFr: 'Mɛn',
    },
    {
        type: 'meaning',
        sourceFr: 'Feu', sourceEn: 'Fire', audio: 'Mbwoge',
        options: ['Mbwoge', 'Ntsə', 'Mbàŋ', 'Lòŋ'],
        optionsFr: ['Mbwoge', 'Ntsə', 'Mbàŋ', 'Lòŋ'],
        answer: 'Mbwoge', answerFr: 'Mbwoge',
    },
    {
        type: 'meaning',
        sourceFr: 'Fille', sourceEn: 'Girl', audio: 'Ngòn',
        options: ['Ngòn', 'Mɛn', 'Nshùm', 'Ngònmα'],
        optionsFr: ['Ngòn', 'Mɛn', 'Nshùm', 'Ngònmα'],
        answer: 'Ngòn', answerFr: 'Ngòn',
    },
    /* ── audio: listen then choose meaning ── */
    {
        type: 'audio',
        audio: 'Bùsi',
        options: ['Dog', 'Cat', 'Cow', 'Bird'],
        optionsFr: ['Chien', 'Chat', 'Vache', 'Oiseau'],
        answer: 'Cat', answerFr: 'Chat',
    },
    {
        type: 'audio',
        audio: 'Leꞌe',
        options: ['Night', 'Week', 'Day', 'Month'],
        optionsFr: ['Nuit', 'Semaine', 'Jour', 'Mois'],
        answer: 'Day', answerFr: 'Jour',
    },
    {
        type: 'audio',
        audio: 'Mαŋwʉ',
        options: ['Sun', 'Star', 'Moon', 'Cloud'],
        optionsFr: ['Soleil', 'Étoile', 'Lune', 'Nuage'],
        answer: 'Moon', answerFr: 'Lune',
    },
    {
        type: 'audio',
        audio: 'Tswəꞌ',
        options: ['Morning', 'Evening', 'Night', 'Noon'],
        optionsFr: ['Matin', 'Soir', 'Nuit', 'Midi'],
        answer: 'Night', answerFr: 'Nuit',
    },
    /* ── match: pair 5 Medumba words with their meanings ── */
    {
        type: 'match',
        pairs: [
            { medumba: 'Mbʉ',    french: 'Chien',   english: 'Dog'   },
            { medumba: 'Bùsi',   french: 'Chat',    english: 'Cat'   },
            { medumba: 'Ntsə',   french: 'Eau',     english: 'Water' },
            { medumba: 'Nyàm',   french: 'Soleil',  english: 'Sun'   },
            { medumba: 'Mɛn',    french: 'Enfant',  english: 'Child' },
        ],
    },
    {
        type: 'match',
        pairs: [
            { medumba: 'Leꞌe',   french: 'Jour',    english: 'Day'   },
            { medumba: 'Tswəꞌ',  french: 'Nuit',    english: 'Night' },
            { medumba: 'Mαŋwʉ',  french: 'Lune',    english: 'Moon'  },
            { medumba: 'Mbwoge', french: 'Feu',     english: 'Fire'  },
            { medumba: 'Ngòn',   french: 'Fille',   english: 'Girl'  },
        ],
    },
    /* ── image_vocab: see an emoji, choose the Medumba word ── */
    {
        type: 'image_vocab',
        emoji: '🐕',
        labelFr: 'Chien', labelEn: 'Dog',
        options: ['Mbʉ', 'Bùsi', 'Saŋə', 'Nyαmnaꞌ'],
        optionsFr: ['Mbʉ', 'Bùsi', 'Saŋə', 'Nyαmnaꞌ'],
        answer: 'Mbʉ', answerFr: 'Mbʉ', audio: 'Mbʉ',
    },
    {
        type: 'image_vocab',
        emoji: '🐱',
        labelFr: 'Chat', labelEn: 'Cat',
        options: ['Mbʉ', 'Bùsi', 'Ngǒntsə', 'Saŋə'],
        optionsFr: ['Mbʉ', 'Bùsi', 'Ngǒntsə', 'Saŋə'],
        answer: 'Bùsi', answerFr: 'Bùsi', audio: 'Bùsi',
    },
    {
        type: 'image_vocab',
        emoji: '💧',
        labelFr: 'Eau', labelEn: 'Water',
        options: ['Ntsə', 'Bʉn', 'Dʉ̀mtə̀', 'Ngwa'],
        optionsFr: ['Ntsə', 'Bʉn', 'Dʉ̀mtə̀', 'Ngwa'],
        answer: 'Ntsə', answerFr: 'Ntsə', audio: 'Ntsə',
    },
    {
        type: 'image_vocab',
        emoji: '☀️',
        labelFr: 'Soleil', labelEn: 'Sun',
        options: ['Nyàm', 'Mαŋwʉ', 'Leꞌe', 'Mbwoge'],
        optionsFr: ['Nyàm', 'Mαŋwʉ', 'Leꞌe', 'Mbwoge'],
        answer: 'Nyàm', answerFr: 'Nyàm', audio: 'Nyàm',
    },
    {
        type: 'image_vocab',
        emoji: '🐟',
        labelFr: 'Poisson', labelEn: 'Fish',
        options: ['Ngǒntsə', 'Mbαb', 'Ngab', 'Saŋə'],
        optionsFr: ['Ngǒntsə', 'Mbαb', 'Ngab', 'Saŋə'],
        answer: 'Ngǒntsə', answerFr: 'Ngǒntsə', audio: 'Ngǒntsə',
    },
    {
        type: 'image_vocab',
        emoji: '🏠',
        labelFr: 'Maison', labelEn: 'House',
        options: ['Baꞌ', 'Buꞌŋwàꞌnì', 'Ngwa', 'Ntsə'],
        optionsFr: ['Baꞌ', 'Buꞌŋwàꞌnì', 'Ngwa', 'Ntsə'],
        answer: 'Baꞌ', answerFr: 'Baꞌ', audio: 'Baꞌ',
    },
    {
        type: 'image_vocab',
        emoji: '🍌',
        labelFr: 'Banane', labelEn: 'Banana',
        options: ['Kəlɔ̀ bàkə̀lɔ̀', 'Nkûnmèkale', 'Mbαb', 'Ngǒntsə'],
        optionsFr: ['Kəlɔ̀ bàkə̀lɔ̀', 'Nkûnmèkale', 'Mbαb', 'Ngǒntsə'],
        answer: 'Kəlɔ̀ bàkə̀lɔ̀', answerFr: 'Kəlɔ̀ bàkə̀lɔ̀', audio: 'Kəlɔ̀ bàkə̀lɔ̀',
    },
    {
        type: 'image_vocab',
        emoji: '🥛',
        labelFr: 'Lait', labelEn: 'Milk',
        options: ['Bʉn', 'Ntsə', 'Dʉ̀mtə̀', 'Ngwa'],
        optionsFr: ['Bʉn', 'Ntsə', 'Dʉ̀mtə̀', 'Ngwa'],
        answer: 'Bʉn', answerFr: 'Bʉn', audio: 'Bʉn',
    },
    {
        type: 'image_vocab',
        emoji: '🔥',
        labelFr: 'Feu', labelEn: 'Fire',
        options: ['Mbwoge', 'Nyàm', 'Mαŋwʉ', 'Ntsə'],
        optionsFr: ['Mbwoge', 'Nyàm', 'Mαŋwʉ', 'Ntsə'],
        answer: 'Mbwoge', answerFr: 'Mbwoge', audio: 'Mbwoge',
    },
    {
        type: 'image_vocab',
        emoji: '🌙',
        labelFr: 'Nuit', labelEn: 'Night',
        options: ['Tswəꞌ', 'Leꞌe', 'Mαŋwʉ', 'Nyàm'],
        optionsFr: ['Tswəꞌ', 'Leꞌe', 'Mαŋwʉ', 'Nyàm'],
        answer: 'Tswəꞌ', answerFr: 'Tswəꞌ', audio: 'Tswəꞌ',
    },
    {
        type: 'image_vocab',
        emoji: '🐦',
        labelFr: 'Oiseau', labelEn: 'Bird',
        options: ['Saŋə', 'Ngǒntsə', 'Mbʉ', 'Ngab'],
        optionsFr: ['Saŋə', 'Ngǒntsə', 'Mbʉ', 'Ngab'],
        answer: 'Saŋə', answerFr: 'Saŋə', audio: 'Saŋə',
    },
    {
        type: 'image_vocab',
        emoji: '🌧️',
        labelFr: 'Pluie', labelEn: 'Rain',
        options: ['Mbàŋ', 'Ntsə', 'Mαŋwʉ', 'Leꞌe'],
        optionsFr: ['Mbàŋ', 'Ntsə', 'Mαŋwʉ', 'Leꞌe'],
        answer: 'Mbàŋ', answerFr: 'Mbàŋ', audio: 'Mbàŋ',
    },
];

/* Lesson theme metadata */
export const THEMES_META = {
  "l1": {
    "titleFr": "Salutations",
    "titleEn": "Greetings"
  },
  "l2": {
    "titleFr": "Corps humain",
    "titleEn": "Human Body"
  },
  "l3": {
    "titleFr": "Nourriture",
    "titleEn": "Food"
  },
  "l4": {
    "titleFr": "Couleurs",
    "titleEn": "Colors"
  },
  "l5": {
    "titleFr": "Chiffres",
    "titleEn": "Numbers"
  },
  "l6": {
    "titleFr": "Animaux",
    "titleEn": "Animals"
  },
  "l7": {
    "titleFr": "Famille",
    "titleEn": "Family"
  },
  "l8": {
    "titleFr": "Nature",
    "titleEn": "Nature"
  },
  "l9": {
    "titleFr": "Temps",
    "titleEn": "Time"
  },
  "l10": {
    "titleFr": "Présentations",
    "titleEn": "Introductions"
  },
  "l11": {
    "titleFr": "Cuisine",
    "titleEn": "Kitchen"
  },
  "l12": {
    "titleFr": "Maladies",
    "titleEn": "Illnesses"
  },
  "l13": {
    "titleFr": "École",
    "titleEn": "School"
  },
  "l14": {
    "titleFr": "Métiers",
    "titleEn": "Professions"
  },
  "l15": {
    "titleFr": "Conversations",
    "titleEn": "Conversations"
  },
  "l16": {
    "titleFr": "Verbes d'action",
    "titleEn": "Action Verbs"
  },
  "l17": {
    "titleFr": "Culture & Rites",
    "titleEn": "Culture & Rites"
  }
};

/* Thematic lesson questions — imported by LessonPage */
export const MEDUMBA_QUESTIONS = {
  "l0": [
    {
      "sourceFr": "Maison",
      "sourceEn": "House",
      "answer": ["Baꞌ"],
      "bank": ["Baꞌ", "Cα̂ꞌ", "Nkwǐ", "Mɛn", "Ntsə", "Saŋə"],
      "audio": "Baꞌ"
    },
    {
      "sourceFr": "Chien",
      "sourceEn": "Dog",
      "answer": ["Cα̂ꞌ"],
      "bank": ["Cα̂ꞌ", "Baꞌ", "Nkwǐ", "Mɛn", "Ntsə", "Saŋə"],
      "audio": "Cα̂ꞌ"
    },
    {
      "sourceFr": "Enfant",
      "sourceEn": "Child",
      "answer": ["Mɛn"],
      "bank": ["Mɛn", "Baꞌ", "Cα̂ꞌ", "Nkwǐ", "Ntsə", "Saŋə"],
      "audio": "Mɛn"
    }
  ],
  "l1": [
    {
      "sourceFr": "Salut",
      "sourceEn": "Hi",
      "answer": [
        "Càꞌtə̀"
      ],
      "bank": [
        "Bìtò",
        "Nə̀ kʉꞌ ntoŋ",
        "Nə̀ tʉ nkab fàꞌ",
        "Nkə̂bnjʉ",
        "Càꞌtə̀",
        "Ngàlǎntsə"
      ],
      "audio": "Càꞌtə̀"
    },
    {
      "sourceFr": "Salutation",
      "sourceEn": "Greeting",
      "answer": [
        "Càꞌtə"
      ],
      "bank": [
        "Càꞌtə",
        "Nswɛnmfu",
        "Ncùsə",
        "Ngàzwi",
        "Ngàlǒꞌnkα̂bŋwʉ (1/6",
        "Fàgtə̀"
      ],
      "audio": "Càꞌtə"
    },
    {
      "sourceFr": "Oui",
      "sourceEn": "Yes",
      "answer": [
        "Ŋ̂"
      ],
      "bank": [
        "Nə̀ diàg ntùn",
        "Nt̀hgə",
        "Mbα̂ntu",
        "Nə̀dʉꞌnα",
        "Co",
        "Ŋ̂"
      ],
      "audio": "Ŋ̂"
    },
    {
      "sourceFr": "Non",
      "sourceEn": "No",
      "answer": [
        "Nga"
      ],
      "bank": [
        "Nga",
        "Mbwə̌jum",
        "Ndα̂ mαbwə",
        "Ngatàdtə",
        "Nə̀ bǎb ndʉ",
        "Ncǎgncag"
      ],
      "audio": "Nga"
    },
    {
      "sourceFr": "Pardon",
      "sourceEn": "Pardon",
      "answer": [
        "Làgtə"
      ],
      "bank": [
        "Nə̀ ghὰbtə̌",
        "Làgtə",
        "Zenù",
        "Ndα̂bwə",
        "Nə̀ tɛnə",
        "Nə̀ swɛ̌n mɛ̀n"
      ],
      "audio": "Làgtə"
    },
    {
      "sourceFr": "Remercier",
      "sourceEn": "To thank",
      "answer": [
        "Lὰbtə̀"
      ],
      "bank": [
        "Nə̀ coꞌ",
        "Nə̀ bɛ̀ntə̀ tùntùn",
        "Ndǎmju",
        "Lὰbtə̀",
        "Ngàtantαn",
        "Teblè"
      ],
      "audio": "Lὰbtə̀"
    }
  ],
  "l2": [
    {
      "sourceFr": "Main",
      "sourceEn": "Hand",
      "answer": [
        "Bu"
      ],
      "bank": [
        "Ndα̂ntoŋkù",
        "Bu",
        "Nə̀ kiàgtə̌",
        "Bwoŋ̍",
        "Kât",
        "Kǔmfàꞌ"
      ],
      "audio": "Bu"
    },
    {
      "sourceFr": "Pied",
      "sourceEn": "Foot",
      "answer": [
        "Kù"
      ],
      "bank": [
        "Cαmmbwoŋ",
        "Mvαn",
        "Kù",
        "Ngàtecaꞌa",
        "Mbὰ welo ze",
        "Ncǒbncob nəsɛn"
      ],
      "audio": "Kù"
    },
    {
      "sourceFr": "Nez",
      "sourceEn": "Nose",
      "answer": [
        "Nkɔ̀ntsəlαg"
      ],
      "bank": [
        "Bὰgαbinαbo",
        "Ngàtswǐnkʉ̀n",
        "Məkəꞌ",
        "Nkwì",
        "Fěꞌntsə",
        "Nkɔ̀ntsəlαg"
      ],
      "audio": "Nkɔ̀ntsəlαg"
    },
    {
      "sourceFr": "Œil",
      "sourceEn": "Eye",
      "answer": [
        "Lαg"
      ],
      "bank": [
        "Nə̀ tə nka",
        "Nə̀ ŋuꞌtə",
        "Nə̀ kotə",
        "Sɔ̀",
        "Lαg",
        "Nə̀ fitə"
      ],
      "audio": "Lαg"
    },
    {
      "sourceFr": "Oreille",
      "sourceEn": "Ear",
      "answer": [
        "Toŋ"
      ],
      "bank": [
        "Nǔŋuꞌu",
        "Toŋ",
        "Ngʉꞌ tɔ̀ngɔ̀",
        "Nə̀ bǔm ncù",
        "NgàyabngəꞋ",
        "Məsin"
      ],
      "audio": "Toŋ"
    },
    {
      "sourceFr": "Dos",
      "sourceEn": "Back",
      "answer": [
        "Nvɛ̀n"
      ],
      "bank": [
        "Nvɛ̀n",
        "Nə̀ jαgə",
        "Nə̀ gha",
        "Ngɔ̌tɔ̀ngɔ̀",
        "Nsὰhntubu",
        "Ngàbenbnzə̀ndα (1/6"
      ],
      "audio": "Nvɛ̀n"
    },
    {
      "sourceFr": "Cou",
      "sourceEn": "Neck",
      "answer": [
        "Tɔ"
      ],
      "bank": [
        "Tɔ",
        "Mbùmtə̀",
        "Nə̀taꞌa",
        "Nə̀ tam tûmə",
        "Ngàkαbnə̀nὰ",
        "Nə̀ kwimtə"
      ],
      "audio": "Tɔ"
    },
    {
      "sourceFr": "Dent",
      "sourceEn": "Tooth",
      "answer": [
        "Sɔ̀"
      ],
      "bank": [
        "Sɔ̀",
        "Tα̂kà",
        "Kog",
        "Nə̀ nyǐꞌtə̌",
        "Nə̀ yantʉ",
        "Juwα"
      ],
      "audio": "Sɔ̀"
    },
    {
      "sourceFr": "Cheveux",
      "sourceEn": "Hair",
      "answer": [
        "Nyǎŋtu"
      ],
      "bank": [
        "Nyiꞌ",
        "yǒbkwi",
        "Sagntʉ",
        "Mbom",
        "yâg mbαb",
        "Nyǎŋtu"
      ],
      "audio": "Nyǎŋtu"
    },
    {
      "sourceFr": "Cœur",
      "sourceEn": "Heart",
      "answer": [
        "Ntʉ"
      ],
      "bank": [
        "Nə̀ laŋ mbaŋə",
        "Nə̀ ghʉ̌ sa",
        "Mɛ̂nngab",
        "Fǒdnaꞌ",
        "Nə̀ mi ntswə",
        "Ntʉ"
      ],
      "audio": "Ntʉ"
    }
  ],
  "l3": [
    {
      "sourceFr": "Eau",
      "sourceEn": "Water",
      "answer": [
        "Ntsə"
      ],
      "bank": [
        "Nə̀ cuadtə",
        "Nə̀ tam njàm",
        "Bαsitɔ̀",
        "Ntsə",
        "Nὰ",
        "Gham"
      ],
      "audio": "Ntsə"
    },
    {
      "sourceFr": "Viande",
      "sourceEn": "Meat",
      "answer": [
        "Mbαb"
      ],
      "bank": [
        "Mbαb",
        "Ngàlɔtə̀",
        "Nə̀ kwʉ",
        "Ncʉ̂ꞌnὰ",
        "Zə̂nù",
        "Ngàzwì"
      ],
      "audio": "Mbαb"
    },
    {
      "sourceFr": "Poisson",
      "sourceEn": "Fish",
      "answer": [
        "Ngǒntsə"
      ],
      "bank": [
        "Nə̀ lǒ",
        "Ngǒntsə",
        "Nə̀ cələ",
        "Nə̀ kaŋə",
        "Nə̀ bəꞌtə",
        "Nə̀ fàgtə̌"
      ],
      "audio": "Ngǒntsə"
    },
    {
      "sourceFr": "Sel",
      "sourceEn": "Salt",
      "answer": [
        "Ngwa"
      ],
      "bank": [
        "Tα̂kà",
        "Nə̀ kα̌g fʉ",
        "Nə̀ t̀otə vʉ",
        "Bin",
        "Nə̀ sǒ",
        "Ngwa"
      ],
      "audio": "Ngwa"
    },
    {
      "sourceFr": "Sucre",
      "sourceEn": "Sugar",
      "answer": [
        "Dʉ̀mtə̀"
      ],
      "bank": [
        "Dʉ̀mtə̀",
        "Jûnə̀ziꞌi",
        "Ghe̍mə",
        "Fedntsə",
        "Ndα̂mbwogə",
        "Ntsəŋwàꞌnì"
      ],
      "audio": "Dʉ̀mtə̀"
    },
    {
      "sourceFr": "Riz",
      "sourceEn": "Rice",
      "answer": [
        "Nkûnmèkale"
      ],
      "bank": [
        "Nə̀ tɛntə",
        "Nə̀ zwězwə̀",
        "Nə̀ nu ngù",
        "Nkûnmèkale",
        "Ngàbum",
        "Nə̀ bàgə"
      ],
      "audio": "Nkûnmèkale"
    },
    {
      "sourceFr": "Banane",
      "sourceEn": "Banana",
      "answer": [
        "Kəlɔ̀ bàkə̀lɔ̀"
      ],
      "bank": [
        "Nə̀ nywìlə",
        "Kumfàꞌ",
        "Kəlɔ̀ bàkə̀lɔ̀",
        "Nə̀ fàgtə̌",
        "Màꞌmbu",
        "Kuan"
      ],
      "audio": "Kəlɔ̀ bàkə̀lɔ̀"
    }
  ],
  "l4": [
    {
      "sourceFr": "Noir",
      "sourceEn": "Black",
      "answer": [
        "Mɛ̀nnə̀sɛn"
      ],
      "bank": [
        "tə̂nntsə",
        "Nə̀ sə̀btə̌",
        "Nə̀tsiαgtə",
        "kwǐnkuni",
        "Nkwàtənù",
        "Mɛ̀nnə̀sɛn"
      ],
      "audio": "Mɛ̀nnə̀sɛn"
    },
    {
      "sourceFr": "Rouge",
      "sourceEn": "Red",
      "answer": [
        "Bà"
      ],
      "bank": [
        "Mbʉ̀ntə̂nù",
        "Nə̀ bèꞌtə̌",
        "Nə̀ kwimtə",
        "Teloŋe",
        "Lα̌nnyα",
        "Bà"
      ],
      "audio": "Bà"
    },
    {
      "sourceFr": "Jaune",
      "sourceEn": "Yellow",
      "answer": [
        "Bwòŋ"
      ],
      "bank": [
        "Nə̀ tα tʉ",
        "Tadtə̀",
        "Bwòŋ",
        "Ghòmtə̀",
        "Ntûmnyàm",
        "bwɔ̌ntʉ"
      ],
      "audio": "Bwòŋ"
    }
  ],
  "l5": [
    {
      "sourceFr": "Deux",
      "sourceEn": "Two",
      "answer": [
        "Bαhα"
      ],
      "bank": [
        "Bαhα",
        "Kə̀ndα",
        "Ngànkinə",
        "Nə̀ kondɛ̀n",
        "Vògtə̌",
        "Kûꞌkà"
      ],
      "audio": "Bαhα"
    },
    {
      "sourceFr": "Trois",
      "sourceEn": "Three",
      "answer": [
        "Tad"
      ],
      "bank": [
        "Nə̀ tswǐ",
        "Tad",
        "Nə̀ zwə̌ zwəꞌ",
        "Nə̀tanù",
        "Nə̀ zìn",
        "Nə̀ ncʉα̌"
      ],
      "audio": "Tad"
    },
    {
      "sourceFr": "Quatre",
      "sourceEn": "Four",
      "answer": [
        "Kuὰ"
      ],
      "bank": [
        "Mimôꞌ",
        "Kuὰ",
        "Nə̀ cobtə",
        "Nə̀ laŋ nɛ̂n tʉ",
        "Ntshaŋ mbùmtə̀",
        "Ntànt̀"
      ],
      "audio": "Kuὰ"
    },
    {
      "sourceFr": "Cinq",
      "sourceEn": "Five",
      "answer": [
        "Tα̂n"
      ],
      "bank": [
        "Nǔsaŋvə̀",
        "nə̀ kʉmtə",
        "Nə̀ ŋwàg◌",
        "Mfiꞌ",
        "Diǎŋfə̀n",
        "Tα̂n"
      ],
      "audio": "Tα̂n"
    },
    {
      "sourceFr": "Six",
      "sourceEn": "Six",
      "answer": [
        "Ntoge"
      ],
      "bank": [
        "Fə̀n",
        "NgàyabngəꞋ",
        "Mbadtə̀ bαhα",
        "Ntoge",
        "Nkὰgnì",
        "Ndα̂bwə"
      ],
      "audio": "Ntoge"
    },
    {
      "sourceFr": "Sept",
      "sourceEn": "Seven",
      "answer": [
        "Sὰmmbαhα"
      ],
      "bank": [
        "Wûdmɛ̀nntʉ̀n",
        "Ndα̂kà",
        "Sὰmmbαhα",
        "Mɛ̂nmfɔ",
        "Ndòŋtânjòŋ",
        "Nsὰbi"
      ],
      "audio": "Sὰmmbαhα"
    },
    {
      "sourceFr": "Huit",
      "sourceEn": "Eight",
      "answer": [
        "Fomə"
      ],
      "bank": [
        "Mbûꞌloŋə",
        "Fomə",
        "Ngàlonndone",
        "Ncoꞌfàꞌ",
        "Nzidvogə",
        "ndα̂ghʉ̀n"
      ],
      "audio": "Fomə"
    },
    {
      "sourceFr": "Neuf",
      "sourceEn": "Nine",
      "answer": [
        "Mbwə̀ꞌə"
      ],
      "bank": [
        "Nəbùmtə̌",
        "Nə̀ bǎm nǔm vʉ",
        "Nə̀ cobtə",
        "Mbwə̀ꞌə",
        "Nde",
        "Nə̀ bə ncùncʉꞌ"
      ],
      "audio": "Mbwə̀ꞌə"
    },
    {
      "sourceFr": "Dix",
      "sourceEn": "Ten",
      "answer": [
        "Gham"
      ],
      "bank": [
        "Kʉ̂dfi",
        "Nzwìmα̂ntɔ̀",
        "Nèyob",
        "Gham",
        "Nkò jubαnbαn",
        "Tɛ̌dlaꞌ"
      ],
      "audio": "Gham"
    },
    {
      "sourceFr": "Mille",
      "sourceEn": "Thousand",
      "answer": [
        "Ncaꞌ"
      ],
      "bank": [
        "Ncaꞌ",
        "Nə̀ feme",
        "Nə̀ yαb cwɛd",
        "Nyàm",
        "Nkadtə̀",
        "Tα̂ndα"
      ],
      "audio": "Ncaꞌ"
    }
  ],
  "l6": [
    {
      "sourceFr": "Chien",
      "sourceEn": "Dog",
      "answer": [
        "Mbʉ"
      ],
      "bank": [
        "Kə",
        "Swəncù",
        "Nə̀ nuꞌu",
        "Nùm",
        "Nə̀ maŋə",
        "Mbʉ"
      ],
      "audio": "Mbʉ"
    },
    {
      "sourceFr": "Chat",
      "sourceEn": "Cat",
      "answer": [
        "Bùsi"
      ],
      "bank": [
        "Ntὰgmfə",
        "Mαla",
        "Nə̀làꞌtə̌",
        "Bùsi",
        "Nə̀ fi",
        "Kə̀ŋuꞌu"
      ],
      "audio": "Bùsi"
    },
    {
      "sourceFr": "Vache",
      "sourceEn": "Cow",
      "answer": [
        "Nyαmnaꞌ"
      ],
      "bank": [
        "Nyαmnaꞌ",
        "Ncobə",
        "Tôꞌndα",
        "Nkwαlὰ",
        "Nkib",
        "Ntâꞌ nku"
      ],
      "audio": "Nyαmnaꞌ"
    },
    {
      "sourceFr": "Mouton",
      "sourceEn": "Sheep",
      "answer": [
        "Njʉ̀mbwə"
      ],
      "bank": [
        "Njʉ̀mbwə",
        "Nə nywinə",
        "Ndα̂nsα",
        "Ngǎkù",
        "Nə̀ kwabtə mɛ̀n",
        "Nzwìd"
      ],
      "audio": "Njʉ̀mbwə"
    },
    {
      "sourceFr": "Oiseau",
      "sourceEn": "Bird",
      "answer": [
        "Saŋə"
      ],
      "bank": [
        "Kə̀lɛ̌n mènnzwi",
        "Saŋə",
        "Zəmətə",
        "Mbǎbngò",
        "Nzwə̂nùmtʉ",
        "Nə̀ bɛ̂nnjàmnjàm"
      ],
      "audio": "Saŋə"
    },
    {
      "sourceFr": "Serpent",
      "sourceEn": "Snake",
      "answer": [
        "Nyu"
      ],
      "bank": [
        "Bwɔ̀",
        "Kʉ̂dnjumə",
        "Nkǎmwud",
        "Nə̀ nyǐꞌtə̌",
        "Nə̀ghuagnù",
        "Nyu"
      ],
      "audio": "Nyu"
    },
    {
      "sourceFr": "Lion",
      "sourceEn": "Lion",
      "answer": [
        "Ngwα̌yid"
      ],
      "bank": [
        "Kə̀lɛ̌n mαndùm",
        "Nzə̀ꞌ tu",
        "Nə̀ nyǐlə",
        "Bǎgbàb",
        "Nə̀satə",
        "Ngwα̌yid"
      ],
      "audio": "Ngwα̌yid"
    }
  ],
  "l7": [
    {
      "sourceFr": "Sœur",
      "sourceEn": "Sister",
      "answer": [
        "Ngònmα"
      ],
      "bank": [
        "Ntəꞌ",
        "Fə̌ꞌ ntsə",
        "Nə̀ wagə",
        "Mbwɔ̀mɛ̀n",
        "Ngònmα",
        "Nə̀caŋ̀"
      ],
      "audio": "Ngònmα"
    },
    {
      "sourceFr": "Mari",
      "sourceEn": "Husband",
      "answer": [
        "Ndu"
      ],
      "bank": [
        "Ndu",
        "Ndɛ̀nghòn",
        "Kὰn",
        "Kǔmbàꞌ",
        "Cαmmbwoŋ",
        "Nə̀ kwǐmntunkə̀kwiꞌnsi"
      ],
      "audio": "Ndu"
    },
    {
      "sourceFr": "Femme",
      "sourceEn": "Wife",
      "answer": [
        "Mɛ̀nnzwi"
      ],
      "bank": [
        "Ngàbəbmbwə",
        "Fʉ̀ꞌtə̀",
        "Nə̀ mὰgtə̌",
        "Mɛ̀nnzwi",
        "Nènὰ",
        "Mvɛ̀dmvɛ̀d"
      ],
      "audio": "Mɛ̀nnzwi"
    },
    {
      "sourceFr": "Enfant",
      "sourceEn": "Child",
      "answer": [
        "Mɛn"
      ],
      "bank": [
        "Nə̀ ta nyàm",
        "Mɛn",
        "Bὰgyi",
        "Moꞌ",
        "Fì",
        "Ntʉ̀m"
      ],
      "audio": "Mɛn"
    },
    {
      "sourceFr": "Fille",
      "sourceEn": "Girl",
      "answer": [
        "Ngòn"
      ],
      "bank": [
        "Nə̀ lôꞌ mɛ̀n fàꞌ",
        "Nə̀ ncὰm",
        "Nə̀ bɛ̀ntə̀ tùntùn",
        "Ngòn",
        "Nukekônkô",
        "Nə̀ yàꞌa"
      ],
      "audio": "Ngòn"
    },
    {
      "sourceFr": "Fils",
      "sourceEn": "Son",
      "answer": [
        "Nshùm"
      ],
      "bank": [
        "Nùkə̀bwɔ̀",
        "Ntàmtə̀",
        "Ngàyǒbkwi",
        "Nə̀ coꞌ",
        "Nshùm",
        "Nzə̀mɛn"
      ],
      "audio": "Nshùm"
    },
    {
      "sourceFr": "Cousin",
      "sourceEn": "Cousin",
      "answer": [
        "Fàd"
      ],
      "bank": [
        "Nə̀ yab kamə",
        "Lα̂gbwə",
        "Nə̀ tamnsi",
        "Leꞌfitə̀",
        "Nə̀ diaŋ nkʉα",
        "Fàd"
      ],
      "audio": "Fàd"
    },
    {
      "sourceFr": "Beau-frère",
      "sourceEn": "Brother-in-law",
      "answer": [
        "Mɛnndu"
      ],
      "bank": [
        "Nə̀nywinə",
        "Mɛnndu",
        "Jûnə̀ziꞌi",
        "Lα̂gntsə",
        "Njʉ̂sɛ̂nnî",
        "Nə̀ lǒtʉ"
      ],
      "audio": "Mɛnndu"
    }
  ],
  "l8": [
    {
      "sourceFr": "Soleil",
      "sourceEn": "Sun",
      "answer": [
        "Nyàm"
      ],
      "bank": [
        "Nyàm",
        "Nùm kekaŋə",
        "Tα̂kum",
        "Nə̀mǎꞌmbu",
        "Càꞌtə",
        "Mbìꞌnù"
      ],
      "audio": "Nyàm"
    },
    {
      "sourceFr": "Lune",
      "sourceEn": "Moon",
      "answer": [
        "Mαŋwʉ"
      ],
      "bank": [
        "Zìn",
        "Ntsəwud",
        "Ncobe",
        "Njʉ",
        "Mαŋwʉ",
        "Nə̀ miàgtə̌"
      ],
      "audio": "Mαŋwʉ"
    },
    {
      "sourceFr": "Feu",
      "sourceEn": "Fire",
      "answer": [
        "Mbwoge"
      ],
      "bank": [
        "nə̀ kʉmtə",
        "Ntα̌bnzwə",
        "Ntsi nə̀ sə̌ꞌ ncù",
        "Nə̀ kwimtə",
        "Mbwoge",
        "Kə̂bnca"
      ],
      "audio": "Mbwoge"
    },
    {
      "sourceFr": "Eau",
      "sourceEn": "Water",
      "answer": [
        "Ntsə"
      ],
      "bank": [
        "Ntsə",
        "Nə̀ lɛ̀nə",
        "Nə̀ kom tu",
        "Nə̀ sǎ",
        "Fə̀ꞌsògwud",
        "Nə̀nywinə"
      ],
      "audio": "Ntsə"
    },
    {
      "sourceFr": "Pluie",
      "sourceEn": "Rain",
      "answer": [
        "Mbàŋ"
      ],
      "bank": [
        "Mbwoŋncwɛn",
        "Nə̀ vǔ ncà",
        "Nə̀ cʉbntʉ",
        "Ngɔ̌ bὰmmɛ̀n",
        "Kə̀tàg",
        "Mbàŋ"
      ],
      "audio": "Mbàŋ"
    },
    {
      "sourceFr": "Vent",
      "sourceEn": "Wind",
      "answer": [
        "Fə̀dmbàŋ"
      ],
      "bank": [
        "Fə̀dmbàŋ",
        "Siꞌi",
        "Nə̀ co",
        "kǒnjʉ̀",
        "Nə̀ kαgə",
        "Nkə̀ku"
      ],
      "audio": "Fə̀dmbàŋ"
    },
    {
      "sourceFr": "Pierre",
      "sourceEn": "Stone",
      "answer": [
        "Lòŋ"
      ],
      "bank": [
        "Lòŋ",
        "Mbǎtsi",
        "Ntʉ̀m",
        "Nə̀ bʉꞌ nsi",
        "Ngàkitə̀",
        "Bin"
      ],
      "audio": "Lòŋ"
    },
    {
      "sourceFr": "Montagne",
      "sourceEn": "Mountain",
      "answer": [
        "Mbalə"
      ],
      "bank": [
        "Nə̀ kwabtə mɛ̀n",
        "Nə̀gha",
        "Cà",
        "Nə̀ kudtu",
        "Mbalə",
        "Nə̀ cog ndà"
      ],
      "audio": "Mbalə"
    }
  ],
  "l9": [
    {
      "sourceFr": "Jour",
      "sourceEn": "Day",
      "answer": [
        "Leꞌe"
      ],
      "bank": [
        "Leꞌe",
        "Fαbwɔ̌ntʉ",
        "Zǐnfə̀n",
        "Nzwìd",
        "Ndàꞌ",
        "Diaŋnzwə"
      ],
      "audio": "Leꞌe"
    },
    {
      "sourceFr": "Nuit",
      "sourceEn": "Night",
      "answer": [
        "Tswəꞌ"
      ],
      "bank": [
        "Tswəꞌ",
        "Nə̀ bə",
        "Ndɛ̀nghòn",
        "Ghamtə̀",
        "Dʉ̌ꞌzìꞌ",
        "Cαmmbwoŋ"
      ],
      "audio": "Tswəꞌ"
    },
    {
      "sourceFr": "Matin",
      "sourceEn": "Morning",
      "answer": [
        "Nkə̂bnjʉ"
      ],
      "bank": [
        "Nkə̂bnjʉ",
        "Koŋ",
        "Nə̀ kemə",
        "Ngàlen",
        "Ndèꞌcàm",
        "Kə̀kǔbncù"
      ],
      "audio": "Nkə̂bnjʉ"
    },
    {
      "sourceFr": "Soir",
      "sourceEn": "Evening",
      "answer": [
        "Mfə̌dnjʉ"
      ],
      "bank": [
        "Ntsi nə̀ sə̌ꞌ ncù",
        "Mɛ̀nnkə̀kwɔ̀",
        "Mfə̌dnjʉ",
        "Nə̀tɛdntsə",
        "Nə̀ tswe",
        "Nə̀ cuꞌu"
      ],
      "audio": "Mfə̌dnjʉ"
    },
    {
      "sourceFr": "Semaine",
      "sourceEn": "Week",
      "answer": [
        "Ngὰbnjʉ"
      ],
      "bank": [
        "Nkα̂fbfàꞌ",
        "Ghamtə̀",
        "Mvoge",
        "Ngàntâꞌ nkù",
        "Ngὰbnjʉ",
        "Ntsəmɛ̀n"
      ],
      "audio": "Ngὰbnjʉ"
    },
    {
      "sourceFr": "Mois",
      "sourceEn": "Month",
      "answer": [
        "Mətsill"
      ],
      "bank": [
        "Ngʉ̌fə̀n",
        "Bǎgtʉꞌ",
        "Fǎꞌndα",
        "Nə̀ kələ",
        "Mətsill",
        "Zwì"
      ],
      "audio": "Mətsill"
    },
    {
      "sourceFr": "Heure",
      "sourceEn": "Hour",
      "answer": [
        "Ngə̀laŋ"
      ],
      "bank": [
        "Ndǎŋndaŋ",
        "Ngə̀laŋ",
        "Nə̀ sǒ mɛ̀nnzwi",
        "Nə̀ yam ntαmə",
        "Ntə̂caꞌa",
        "Nə̀ kʉα"
      ],
      "audio": "Ngə̀laŋ"
    }
  ],

  /* ── l10 : Introductions / Présentations (Jûzi' 4) ── */
  "l10": [
    { "sourceFr": "Homme", "sourceEn": "Man", "answer": ["Mαndùm"],
      "bank": ["Mαndùm", "Mɛ̀nnzwi", "Mfɛd", "Mɛn", "Nshun", "Ncʉὰmbwə̀"], "audio": "Mαndùm" },
    { "sourceFr": "Femme", "sourceEn": "Woman", "answer": ["Mɛ̀nnzwi"],
      "bank": ["Mɛ̀nnzwi", "Mαndùm", "Mfɛd", "Mɛn", "Nshun", "Ntʉ'njàm"], "audio": "Mɛ̀nnzwi" },
    { "sourceFr": "Frère / Cousin", "sourceEn": "Brother / Cousin", "answer": ["Mfɛd"],
      "bank": ["Mfɛd", "Nshun", "Mɛn", "Ncʉὰmbwə̀", "Ntʉ'njàm", "Mαndùm"], "audio": "Mfɛd" },
    { "sourceFr": "Ami(e)", "sourceEn": "Friend", "answer": ["Nshun"],
      "bank": ["Nshun", "Mfɛd", "Mɛn", "Mαndùm", "Mɛ̀nnzwi", "Ncʉὰmbwə̀"], "audio": "Nshun" },
    { "sourceFr": "Personne", "sourceEn": "Person", "answer": ["Mɛ̀nntʉ̀n"],
      "bank": ["Mɛ̀nntʉ̀n", "Mɛn", "Nshun", "Mαndùm", "Mfɛd", "Ncʉὰmbwə̀"], "audio": "Mɛ̀nntʉ̀n" },
    { "sourceFr": "Aîné(e)", "sourceEn": "Elder", "answer": ["Ncʉὰmbwə̀"],
      "bank": ["Ncʉὰmbwə̀", "Ntʉ'njàm", "Nshun", "Mfɛd", "Mɛn", "Mαndùm"], "audio": "Ncʉὰmbwə̀" },
    { "sourceFr": "Cadet(te)", "sourceEn": "Younger sibling", "answer": ["Ntʉ'njàm"],
      "bank": ["Ntʉ'njàm", "Ncʉὰmbwə̀", "Mαndùm", "Mɛ̀nnzwi", "Nshun", "Mfɛd"], "audio": "Ntʉ'njàm" },
    { "sourceFr": "Mon père", "sourceEn": "My father", "answer": ["Tα"],
      "bank": ["Tα", "Mα", "Mfɛd", "Mɛn", "Nshun", "Ncʉὰmbwə̀"], "audio": "Tα" }
  ],

  /* ── l11 : Kitchen / Cuisine (Jûzi' 11-12) ── */
  "l11": [
    { "sourceFr": "Cuisine", "sourceEn": "Kitchen", "answer": ["Fə̌'mbwogə"],
      "bank": ["Fə̌'mbwogə", "Nzə̂mbwogə", "Ntànywìn", "Mbwogə", "Ntàmfʉαg", "Kwe'"], "audio": "Fə̌'mbwogə" },
    { "sourceFr": "Casserole / Marmite", "sourceEn": "Pot", "answer": ["Nzə̂mbwogə"],
      "bank": ["Nzə̂mbwogə", "Fə̌'mbwogə", "Ntànywìn", "Mbwogə", "Kwe'", "Ntàmfʉαg"], "audio": "Nzə̂mbwogə" },
    { "sourceFr": "Cuillère", "sourceEn": "Spoon", "answer": ["Ntànywìn"],
      "bank": ["Ntànywìn", "Ntàmfʉαg", "Nzə̂mbwogə", "Fə̌'mbwogə", "Mbwogə", "Kwe'"], "audio": "Ntànywìn" },
    { "sourceFr": "Feu / Foyer", "sourceEn": "Fire / Stove", "answer": ["Mbwogə"],
      "bank": ["Mbwogə", "Fə̌'mbwogə", "Kwe'", "Nzə̂mbwogə", "Ntànywìn", "Ntàmfʉαg"], "audio": "Mbwogə" },
    { "sourceFr": "Louche", "sourceEn": "Ladle", "answer": ["Ntàmfʉαg"],
      "bank": ["Ntàmfʉαg", "Ntànywìn", "Nzə̂mbwogə", "Mbwogə", "Kwe'", "Fə̌'mbwogə"], "audio": "Ntàmfʉαg" },
    { "sourceFr": "Sel", "sourceEn": "Salt", "answer": ["Kwe'"],
      "bank": ["Kwe'", "Nzə̂mbwogə", "Ntànywìn", "Fə̌'mbwogə", "Mbwogə", "Ntàmfʉαg"], "audio": "Kwe'" },
    { "sourceFr": "Couteau", "sourceEn": "Knife", "answer": ["Tə"],
      "bank": ["Tə", "Kwe'", "Ntànywìn", "Fə̌'mbwogə", "Mbwogə", "Nzə̂mbwogə"], "audio": "Tə" },
    { "sourceFr": "Fumée", "sourceEn": "Smoke", "answer": ["Kə̀kîmbwogə"],
      "bank": ["Kə̀kîmbwogə", "Mbwogə", "Fə̌'mbwogə", "Nzə̂mbwogə", "Kwe'", "Ntànywìn"], "audio": "Kə̀kîmbwogə" }
  ],

  /* ── l12 : Illnesses / Maladies (Jûzi' 13) ── */
  "l12": [
    { "sourceFr": "Maladie", "sourceEn": "Illness", "answer": ["Ngòkɛd"],
      "bank": ["Ngòkɛd", "Yâtu", "Bǎmmba", "Kwiag", "Saŋtə̀wud", "Bìkoŋə"], "audio": "Ngòkɛd" },
    { "sourceFr": "Mal de tête", "sourceEn": "Headache", "answer": ["Yâtu"],
      "bank": ["Yâtu", "Bǎmmba", "Kwiag", "Saŋtə̀wud", "Bìkoŋə", "Ngòkɛd"], "audio": "Yâtu" },
    { "sourceFr": "Mal au ventre", "sourceEn": "Stomachache", "answer": ["Bǎmmba"],
      "bank": ["Bǎmmba", "Yâtu", "Kwiag", "Saŋtə̀wud", "Ngòkɛd", "Mìntsi"], "audio": "Bǎmmba" },
    { "sourceFr": "Toux", "sourceEn": "Cough", "answer": ["Kwiag"],
      "bank": ["Kwiag", "Yâtu", "Bǎmmba", "Saŋtə̀wud", "Bìkoŋə", "Mìntsi"], "audio": "Kwiag" },
    { "sourceFr": "Fièvre", "sourceEn": "Fever", "answer": ["Saŋtə̀wud"],
      "bank": ["Saŋtə̀wud", "Kwiag", "Yâtu", "Bǎmmba", "Ngòkɛd", "Bìkoŋə"], "audio": "Saŋtə̀wud" },
    { "sourceFr": "Rhume", "sourceEn": "Cold", "answer": ["Bìkoŋə"],
      "bank": ["Bìkoŋə", "Saŋtə̀wud", "Kwiag", "Yâtu", "Mìntsi", "Ngòkɛd"], "audio": "Bìkoŋə" },
    { "sourceFr": "Douleur", "sourceEn": "Pain", "answer": ["Mìntsi"],
      "bank": ["Mìntsi", "Bìkoŋə", "Ngòkɛd", "Yâtu", "Kwiag", "Bǎmmba"], "audio": "Mìntsi" },
    { "sourceFr": "Médecin", "sourceEn": "Doctor", "answer": ["Ngàngokɛd"],
      "bank": ["Ngàngokɛd", "Ngòkɛd", "Saŋtə̀wud", "Mìntsi", "Bìkoŋə", "Yâtu"], "audio": "Ngàngokɛd" }
  ],

  /* ── l13 : School / École (Jûzi' 15) ── */
  "l13": [
    { "sourceFr": "École", "sourceEn": "School", "answer": ["ŋwà'nì"],
      "bank": ["ŋwà'nì", "Bu'kì", "Kʉ̂dfi", "Cɛ̂dkì", "Bǎgcɛ̂dkì", "Bu'ŋwà'nì"], "audio": "ŋwà'nì" },
    { "sourceFr": "Cahier", "sourceEn": "Notebook", "answer": ["Bu'kì"],
      "bank": ["Bu'kì", "Bu'ŋwà'nì", "Kʉ̂dfi", "Cɛ̂dkì", "Bǎgcɛ̂dkì", "ŋwà'nì"], "audio": "Bu'kì" },
    { "sourceFr": "Livre", "sourceEn": "Book", "answer": ["Bu'ŋwà'nì"],
      "bank": ["Bu'ŋwà'nì", "Bu'kì", "Cɛ̂dkì", "Kʉ̂dfi", "Bǎgcɛ̂dkì", "ŋwà'nì"], "audio": "Bu'ŋwà'nì" },
    { "sourceFr": "Table-banc", "sourceEn": "School desk", "answer": ["Kʉ̂dfi"],
      "bank": ["Kʉ̂dfi", "Bu'kì", "Cɛ̂dkì", "Bu'ŋwà'nì", "Bǎgcɛ̂dkì", "ŋwà'nì"], "audio": "Kʉ̂dfi" },
    { "sourceFr": "Stylo / Crayon", "sourceEn": "Pen / Pencil", "answer": ["Cɛ̂dkì"],
      "bank": ["Cɛ̂dkì", "Bu'kì", "Kʉ̂dfi", "Bu'ŋwà'nì", "ŋwà'nì", "Bǎgcɛ̂dkì"], "audio": "Cɛ̂dkì" },
    { "sourceFr": "Cartable / Sac", "sourceEn": "School bag", "answer": ["Bǎgcɛ̂dkì"],
      "bank": ["Bǎgcɛ̂dkì", "Bu'kì", "Kʉ̂dfi", "Cɛ̂dkì", "Bu'ŋwà'nì", "ŋwà'nì"], "audio": "Bǎgcɛ̂dkì" },
    { "sourceFr": "Tableau", "sourceEn": "Blackboard", "answer": ["Mbə̂mkì"],
      "bank": ["Mbə̂mkì", "Bu'kì", "Kʉ̂dfi", "Cɛ̂dkì", "Bu'ŋwà'nì", "Bǎgcɛ̂dkì"], "audio": "Mbə̂mkì" },
    { "sourceFr": "Règle", "sourceEn": "Ruler", "answer": ["Nkǒ'ŋwà'nì"],
      "bank": ["Nkǒ'ŋwà'nì", "Bu'kì", "Cɛ̂dkì", "Kʉ̂dfi", "Bu'ŋwà'nì", "Mbə̂mkì"], "audio": "Nkǒ'ŋwà'nì" }
  ],

  /* ── l14 : Professions / Métiers (Jûzi' 16) ── */
  "l14": [
    { "sourceFr": "Enseignant", "sourceEn": "Teacher", "answer": ["Ngàtswìtə̀"],
      "bank": ["Ngàtswìtə̀", "Ndʉ̂'nὰ", "Tα̂lὰm", "Ntântαnə", "Ndè'càm", "Nsòŋsaŋvə̀"], "audio": "Ngàtswìtə̀" },
    { "sourceFr": "Cultivateur / Fermier", "sourceEn": "Farmer", "answer": ["Ndʉ̂'nὰ"],
      "bank": ["Ndʉ̂'nὰ", "Ngàtswìtə̀", "Tα̂lὰm", "Ntântαnə", "Ndè'càm", "Nsòŋsaŋvə̀"], "audio": "Ndʉ̂'nὰ" },
    { "sourceFr": "Couturier", "sourceEn": "Tailor", "answer": ["Tα̂lὰm"],
      "bank": ["Tα̂lὰm", "Ndʉ̂'nὰ", "Ngàtswìtə̀", "Ntântαnə", "Nsòŋsaŋvə̀", "Ndè'càm"], "audio": "Tα̂lὰm" },
    { "sourceFr": "Maçon / Entrepreneur", "sourceEn": "Builder", "answer": ["Ntântαnə"],
      "bank": ["Ntântαnə", "Tα̂lὰm", "Ndʉ̂'nὰ", "Ngàtswìtə̀", "Ndè'càm", "Nsòŋsaŋvə̀"], "audio": "Ntântαnə" },
    { "sourceFr": "Secrétaire", "sourceEn": "Secretary", "answer": ["Ndè'càm"],
      "bank": ["Ndè'càm", "Ntântαnə", "Tα̂lὰm", "Ngàtswìtə̀", "Nsòŋsaŋvə̀", "Nswɛ̀nfu"], "audio": "Ndè'càm" },
    { "sourceFr": "Pharmacien", "sourceEn": "Pharmacist", "answer": ["Nsòŋsaŋvə̀"],
      "bank": ["Nsòŋsaŋvə̀", "Ndè'càm", "Ngàtswìtə̀", "Ndʉ̂'nὰ", "Nswɛ̀nfu", "Ntântαnə"], "audio": "Nsòŋsaŋvə̀" },
    { "sourceFr": "Coiffeur", "sourceEn": "Hairdresser", "answer": ["Nswɛ̀nfu"],
      "bank": ["Nswɛ̀nfu", "Nsòŋsaŋvə̀", "Ndè'càm", "Tα̂lὰm", "Ndʉ̂'nὰ", "Ngàtswìtə̀"], "audio": "Nswɛ̀nfu" },
    { "sourceFr": "Banquier", "sourceEn": "Banker", "answer": ["Ndè'nkαb"],
      "bank": ["Ndè'nkαb", "Ndè'càm", "Nsòŋsaŋvə̀", "Tα̂lὰm", "Ngàtswìtə̀", "Nswɛ̀nfu"], "audio": "Ndè'nkαb" }
  ],

  /* ── l15 : Conversations (Phrasebook Ch.1-2) ── */
  "l15": [
    { "sourceFr": "Bonjour / Salut", "sourceEn": "Hello / Hi", "answer": ["Ndà'ndà' lα!"],
      "bank": ["Ndà'ndà' lα!", "A fi tsə", "Mə làbtə̌", "Ndʉ̂ kə?", "Ò bə α̂ wə?"], "audio": "Ndà'ndà' lα!" },
    { "sourceFr": "Comment ça va ?", "sourceEn": "How are you?", "answer": ["Ndʉ̂ kə?"],
      "bank": ["Ndʉ̂ kə?", "Ndà'ndà' lα!", "Lɛ̂n su bə α̂ wə?", "Mə làbtə̌", "A fi tsə"], "audio": "Ndʉ̂ kə?" },
    { "sourceFr": "Ça va bien", "sourceEn": "I'm fine", "answer": ["A fi tsə"],
      "bank": ["A fi tsə", "Ndʉ̂ kə?", "Ndà'ndà' lα!", "Mə làbtə̌", "Ò bə α̂ wə?"], "audio": "A fi tsə" },
    { "sourceFr": "Merci", "sourceEn": "Thank you", "answer": ["Mə làbtə̌"],
      "bank": ["Mə làbtə̌", "A fi tsə", "Ndà'ndà' lα!", "Ngα", "Ŋ"], "audio": "Mə làbtə̌" },
    { "sourceFr": "Comment tu t'appelles ?", "sourceEn": "What is your name?", "answer": ["Lɛ̂n su bə α̂ wə?"],
      "bank": ["Lɛ̂n su bə α̂ wə?", "Ò bə α̂ wə?", "Ndʉ̂ kə?", "Ndà'ndà' lα!", "A fi tsə"], "audio": "Lɛ̂n su bə α̂ wə?" },
    { "sourceFr": "Mon nom est…", "sourceEn": "My name is…", "answer": ["Lɛ̂n sαm bə α̂…"],
      "bank": ["Lɛ̂n sαm bə α̂…", "Lɛ̂n su bə α̂ wə?", "Mə làbtə̌", "A fi tsə", "Ndʉ̂ kə?"], "audio": "Lɛ̂n sαm bə α̂…" },
    { "sourceFr": "Qui es-tu ?", "sourceEn": "Who are you?", "answer": ["Ò bə α̂ wə?"],
      "bank": ["Ò bə α̂ wə?", "Lɛ̂n su bə α̂ wə?", "Ndʉ̂ kə?", "A fi tsə", "Ndà'ndà' lα!"], "audio": "Ò bə α̂ wə?" },
    { "sourceFr": "Oui", "sourceEn": "Yes", "answer": ["Ŋ"],
      "bank": ["Ŋ", "Ngα", "A fi tsə", "Mə làbtə̌", "Ò bə α̂ wə?"], "audio": "Ŋ" },
    { "sourceFr": "Non", "sourceEn": "No", "answer": ["Ngα"],
      "bank": ["Ngα", "Ŋ", "A fi tsə", "Mə làbtə̌", "Ndʉ̂ kə?"], "audio": "Ngα" },
    { "sourceFr": "Et toi ?", "sourceEn": "And you?", "answer": ["Wʉ̌ yò ghò?"],
      "bank": ["Wʉ̌ yò ghò?", "Ò bə α̂ wə?", "Ndʉ̂ kə?", "A fi tsə", "Mə làbtə̌"], "audio": "Wʉ̌ yò ghò?" },
    { "sourceFr": "Je suis en bonne santé", "sourceEn": "I am healthy", "answer": ["Mə tswə ntʉ̀n"],
      "bank": ["Mə tswə ntʉ̀n", "A fi tsə", "Mə làbtə̌", "Ndʉ̂ kə?", "Ò bə α̂ wə?"], "audio": "Mə tswə ntʉ̀n" },
    { "sourceFr": "Mon ami / Mon amie", "sourceEn": "My friend", "answer": ["Nshûn ὰm"],
      "bank": ["Nshûn ὰm", "Mɛ̀nnzwi", "Mɛnmαndùm", "Mə làbtə̌", "Lɛ̂n sαm bə α̂…"], "audio": "Nshûn ὰm" }
  ],

  /* ── l16 : Verbes d'action ── */
  "l16": [
    { "sourceFr": "Récolter / Cueillir", "sourceEn": "Harvest", "answer": ["Nə̀ ba"],
      "bank": ["Nə̀ ba", "Nə̀ bǎg", "Nə̀ badtə", "Nə̀ bàdtə̌", "Nə̀ babə", "Nə̀ bagə"], "audio": "Nə̀ ba" },
    { "sourceFr": "Rougir / Mûrir", "sourceEn": "To redden / ripen", "answer": ["Nə̀ bǎ"],
      "bank": ["Nə̀ bǎ", "Nə̀ ba", "Nə̀ bàdtə̌", "Nə̀ bǎg", "Nə̀ bagə", "Nə̀ babə"], "audio": "Nə̀ bǎ" },
    { "sourceFr": "Verser (avec violence)", "sourceEn": "To pour forcefully", "answer": ["Nə̀ babə"],
      "bank": ["Nə̀ babə", "Nə̀ ba", "Nə̀ bǎ", "Nə̀ bǎg", "Nə̀ badtə", "Nə̀ bagə"], "audio": "Nə̀ babə" },
    { "sourceFr": "Flatter / Coller", "sourceEn": "To flatter / stick", "answer": ["Nə̀ badtə"],
      "bank": ["Nə̀ badtə", "Nə̀ bàdtə̌", "Nə̀ babə", "Nə̀ ba", "Nə̀ bagə", "Nə̀ bǎg"], "audio": "Nə̀ badtə" },
    { "sourceFr": "Porter au dos", "sourceEn": "To carry on back", "answer": ["Nə̀ bàdtə̌"],
      "bank": ["Nə̀ bàdtə̌", "Nə̀ badtə", "Nə̀ babə", "Nə̀ bǎ", "Nə̀ bagə", "Nə̀ bǎg"], "audio": "Nə̀ bàdtə̌" },
    { "sourceFr": "Se gâter / S'avarier", "sourceEn": "To spoil / go bad", "answer": ["Nə̀ bagə"],
      "bank": ["Nə̀ bagə", "Nə̀ ba", "Nə̀ bǎ", "Nə̀ bàdtə̌", "Nə̀ babə", "Nə̀ badtə"], "audio": "Nə̀ bagə" },
    { "sourceFr": "Fendre / Éventrer", "sourceEn": "To split / cut open", "answer": ["Nə̀ bǎg"],
      "bank": ["Nə̀ bǎg", "Nə̀ ba", "Nə̀ bǎ", "Nə̀ bagə", "Nə̀ badtə", "Nə̀ babə"], "audio": "Nə̀ bǎg" },
    { "sourceFr": "Changer de chemin", "sourceEn": "To change path", "answer": ["Nə̀ ba nzə̀"],
      "bank": ["Nə̀ ba nzə̀", "Nə̀ bǎg", "Nə̀ babə", "Nə̀ badtə", "Nə̀ bagə", "Nə̀ bàdtə̌"], "audio": "Nə̀ ba nzə̀" }
  ],

  /* ── l17 : Culture & Rites ── */
  "l17": [
    { "sourceFr": "Deuil", "sourceEn": "Mourning", "answer": ["Vʉ"],
      "bank": ["Vʉ", "Ndαvʉ", "Nə̀ sǎvʉ", "Nə̀ zi mò", "Mbwə̀'", "Nə̀ nyǎncu"], "audio": "Vʉ" },
    { "sourceFr": "Déclarer la mort", "sourceEn": "Announce death", "answer": ["Nə̀ to vʉ"],
      "bank": ["Nə̀ to vʉ", "Nə̀ lα̌n vʉ", "Nə̀ coŋ mɛ̀n", "Nə̀ sǎvʉ", "Nə̀ loŋvʉ", "Vʉ"], "audio": "Nə̀ to vʉ" },
    { "sourceFr": "Se lamenter / Pleurer un mort", "sourceEn": "To lament", "answer": ["Nə̀ lα̌n vʉ"],
      "bank": ["Nə̀ lα̌n vʉ", "Nə̀ to vʉ", "Nə̀ sǎvʉ", "Nə̀ coŋ mɛ̀n", "Vʉ", "Ndαvʉ"], "audio": "Nə̀ lα̌n vʉ" },
    { "sourceFr": "Enterrer", "sourceEn": "To bury", "answer": ["Nə̀ coŋ mɛ̀n"],
      "bank": ["Nə̀ coŋ mɛ̀n", "Nə̀ lα̌n vʉ", "Nə̀ to vʉ", "Nə̀ loŋvʉ", "Ndαvʉ", "Nə̀ zi mò"], "audio": "Nə̀ coŋ mɛ̀n" },
    { "sourceFr": "Veillée funèbre", "sourceEn": "Wake / Night vigil", "answer": ["Nə̀ zi mò"],
      "bank": ["Nə̀ zi mò", "Nə̀ coŋ mɛ̀n", "Nə̀ sǎvʉ", "Ndαvʉ", "Vʉ", "Mbwə̀'"], "audio": "Nə̀ zi mò" },
    { "sourceFr": "Maison de deuil", "sourceEn": "House of mourning", "answer": ["Ndαvʉ"],
      "bank": ["Ndαvʉ", "Nə̀ zi mò", "Mbwə̀'", "Lâ'kwa", "Nshʉ̂'nὰ", "Vʉ"], "audio": "Ndαvʉ" },
    { "sourceFr": "Danser", "sourceEn": "To dance", "answer": ["Nə̀ nyǎncu"],
      "bank": ["Nə̀ nyǎncu", "Nə̀ sǎvʉ", "Nə̀ loŋvʉ", "Nə̀ zi mò", "Ndαvʉ", "Mbwə̀'"], "audio": "Nə̀ nyǎncu" },
    { "sourceFr": "Funérailles", "sourceEn": "Funeral rites", "answer": ["Nə̀ sǎvʉ"],
      "bank": ["Nə̀ sǎvʉ", "Nə̀ nyǎncu", "Nə̀ loŋvʉ", "Nə̀ coŋ mɛ̀n", "Ndαvʉ", "Vʉ"], "audio": "Nə̀ sǎvʉ" },
    { "sourceFr": "Porter le deuil", "sourceEn": "To be in mourning", "answer": ["Nə̀ loŋvʉ"],
      "bank": ["Nə̀ loŋvʉ", "Nə̀ sǎvʉ", "Nə̀ coŋ mɛ̀n", "Nə̀ nyǎncu", "Vʉ", "Mbwə̀'"], "audio": "Nə̀ loŋvʉ" },
    { "sourceFr": "Lieu sacré", "sourceEn": "Sacred place", "answer": ["Mbwə̀'"],
      "bank": ["Mbwə̀'", "Lâ'kwa", "Ndαvʉ", "Nshʉ̂'nὰ", "Nə̀ zi mò", "Vʉ"], "audio": "Mbwə̀'" },
    { "sourceFr": "Travail communautaire", "sourceEn": "Community work", "answer": ["Nshʉ̂'nὰ"],
      "bank": ["Nshʉ̂'nὰ", "Mbwə̀'", "Lâ'kwa", "Ndαvʉ", "Nə̀ nyǎncu", "Nə̀ sǎvʉ"], "audio": "Nshʉ̂'nὰ" },
    { "sourceFr": "Lieu d'initiation", "sourceEn": "Initiation ground", "answer": ["Lâ'kwa"],
      "bank": ["Lâ'kwa", "Mbwə̀'", "Nshʉ̂'nὰ", "Ndαvʉ", "Nə̀ zi mò", "Nə̀ sǎvʉ"], "audio": "Lâ'kwa" }
  ]
};

/* ════════════════════════════════════════════════════════════════
   LEVEL_QUESTIONS
   Per-lesson meaning and match exercises used by lessonGenerator
   to build proficiency-appropriate sessions.
════════════════════════════════════════════════════════════════ */
export const LEVEL_QUESTIONS = {

  /* ── l0 : Alphabet — example words drawn from the 32-letter reference
     used in AlphabetPage.jsx, so vocabulary stays consistent across
     the app. ─────────────────────────────────────────────────────── */
  l0: {
    meaning: [
      { type: 'meaning', sourceFr: 'Maison', sourceEn: 'House', audio: 'Baꞌ',
        options: ['Baꞌ', 'Cα̂ꞌ', 'Nkwǐ', 'Mɛn'],
        optionsFr: ['Baꞌ', 'Cα̂ꞌ', 'Nkwǐ', 'Mɛn'],
        answer: 'Baꞌ', answerFr: 'Baꞌ' },
      { type: 'meaning', sourceFr: 'Chien', sourceEn: 'Dog', audio: 'Cα̂ꞌ',
        options: ['Cα̂ꞌ', 'Baꞌ', 'Ntsə', 'Saŋə'],
        optionsFr: ['Cα̂ꞌ', 'Baꞌ', 'Ntsə', 'Saŋə'],
        answer: 'Cα̂ꞌ', answerFr: 'Cα̂ꞌ' },
      { type: 'meaning', sourceFr: 'Singe', sourceEn: 'Monkey', audio: 'Nkwǐ',
        options: ['Nkwǐ', 'Mɛn', 'Cα̂ꞌ', 'Ntsə'],
        optionsFr: ['Nkwǐ', 'Mɛn', 'Cα̂ꞌ', 'Ntsə'],
        answer: 'Nkwǐ', answerFr: 'Nkwǐ' },
      { type: 'meaning', sourceFr: 'Enfant', sourceEn: 'Child', audio: 'Mɛn',
        options: ['Mɛn', 'Nkwǐ', 'Saŋə', 'Baꞌ'],
        optionsFr: ['Mɛn', 'Nkwǐ', 'Saŋə', 'Baꞌ'],
        answer: 'Mɛn', answerFr: 'Mɛn' },
      { type: 'meaning', sourceFr: 'Eau', sourceEn: 'Water', audio: 'Ntsə',
        options: ['Ntsə', 'Saŋə', 'Mɛn', 'Cα̂ꞌ'],
        optionsFr: ['Ntsə', 'Saŋə', 'Mɛn', 'Cα̂ꞌ'],
        answer: 'Ntsə', answerFr: 'Ntsə' },
      { type: 'meaning', sourceFr: 'Vache', sourceEn: 'Cow', audio: 'Saŋə',
        options: ['Saŋə', 'Ntsə', 'Baꞌ', 'Nkwǐ'],
        optionsFr: ['Saŋə', 'Ntsə', 'Baꞌ', 'Nkwǐ'],
        answer: 'Saŋə', answerFr: 'Saŋə' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Baꞌ',  french: 'Maison', english: 'House'  },
      { medumba: 'Cα̂ꞌ', french: 'Chien',  english: 'Dog'    },
      { medumba: 'Nkwǐ', french: 'Singe',  english: 'Monkey' },
      { medumba: 'Mɛn',  french: 'Enfant', english: 'Child'  },
      { medumba: 'Ntsə', french: 'Eau',    english: 'Water'  },
    ]}],
  },

  /* ── l1 : Greetings ─────────────────────────────────────────── */
  l1: {
    meaning: [
      { type: 'meaning', sourceFr: 'Salut', sourceEn: 'Hi', audio: 'Càꞌtə̀',
        options: ['Càꞌtə̀', 'Nga', 'Làgtə', 'Lὰbtə̀'],
        optionsFr: ['Càꞌtə̀', 'Nga', 'Làgtə', 'Lὰbtə̀'],
        answer: 'Càꞌtə̀', answerFr: 'Càꞌtə̀' },
      { type: 'meaning', sourceFr: 'Oui', sourceEn: 'Yes', audio: 'Ŋ̂',
        options: ['Ŋ̂', 'Nga', 'Làgtə', 'Càꞌtə'],
        optionsFr: ['Ŋ̂', 'Nga', 'Làgtə', 'Càꞌtə'],
        answer: 'Ŋ̂', answerFr: 'Ŋ̂' },
      { type: 'meaning', sourceFr: 'Non', sourceEn: 'No', audio: 'Nga',
        options: ['Ŋ̂', 'Nga', 'Càꞌtə', 'Lὰbtə̀'],
        optionsFr: ['Ŋ̂', 'Nga', 'Càꞌtə', 'Lὰbtə̀'],
        answer: 'Nga', answerFr: 'Nga' },
      { type: 'meaning', sourceFr: 'Pardon', sourceEn: 'Pardon', audio: 'Làgtə',
        options: ['Làgtə', 'Lὰbtə̀', 'Ŋ̂', 'Nga'],
        optionsFr: ['Làgtə', 'Lὰbtə̀', 'Ŋ̂', 'Nga'],
        answer: 'Làgtə', answerFr: 'Làgtə' },
      { type: 'meaning', sourceFr: 'Remercier', sourceEn: 'To thank', audio: 'Lὰbtə̀',
        options: ['Lὰbtə̀', 'Làgtə', 'Càꞌtə', 'Nga'],
        optionsFr: ['Lὰbtə̀', 'Làgtə', 'Càꞌtə', 'Nga'],
        answer: 'Lὰbtə̀', answerFr: 'Lὰbtə̀' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Càꞌtə̀', french: 'Salut',      english: 'Hi'       },
      { medumba: 'Ŋ̂',     french: 'Oui',        english: 'Yes'      },
      { medumba: 'Nga',    french: 'Non',         english: 'No'       },
      { medumba: 'Làgtə',  french: 'Pardon',      english: 'Pardon'   },
      { medumba: 'Lὰbtə̀', french: 'Remercier',   english: 'To thank' },
    ]}],
  },

  /* ── l2 : Body Parts ─────────────────────────────────────────── */
  l2: {
    meaning: [
      { type: 'meaning', sourceFr: 'Main', sourceEn: 'Hand', audio: 'Bu',
        options: ['Bu', 'Kù', 'Lαg', 'Toŋ'],
        optionsFr: ['Bu', 'Kù', 'Lαg', 'Toŋ'],
        answer: 'Bu', answerFr: 'Bu' },
      { type: 'meaning', sourceFr: 'Pied', sourceEn: 'Foot', audio: 'Kù',
        options: ['Kù', 'Bu', 'Toŋ', 'Sɔ̀'],
        optionsFr: ['Kù', 'Bu', 'Toŋ', 'Sɔ̀'],
        answer: 'Kù', answerFr: 'Kù' },
      { type: 'meaning', sourceFr: 'Œil', sourceEn: 'Eye', audio: 'Lαg',
        options: ['Lαg', 'Toŋ', 'Bu', 'Sɔ̀'],
        optionsFr: ['Lαg', 'Toŋ', 'Bu', 'Sɔ̀'],
        answer: 'Lαg', answerFr: 'Lαg' },
      { type: 'meaning', sourceFr: 'Oreille', sourceEn: 'Ear', audio: 'Toŋ',
        options: ['Toŋ', 'Lαg', 'Sɔ̀', 'Bu'],
        optionsFr: ['Toŋ', 'Lαg', 'Sɔ̀', 'Bu'],
        answer: 'Toŋ', answerFr: 'Toŋ' },
      { type: 'meaning', sourceFr: 'Dent', sourceEn: 'Tooth', audio: 'Sɔ̀',
        options: ['Sɔ̀', 'Toŋ', 'Lαg', 'Bu'],
        optionsFr: ['Sɔ̀', 'Toŋ', 'Lαg', 'Bu'],
        answer: 'Sɔ̀', answerFr: 'Sɔ̀' },
      { type: 'meaning', sourceFr: 'Nez', sourceEn: 'Nose', audio: 'Nkɔ̀ntsəlαg',
        options: ['Nkɔ̀ntsəlαg', 'Lαg', 'Toŋ', 'Bu'],
        optionsFr: ['Nkɔ̀ntsəlαg', 'Lαg', 'Toŋ', 'Bu'],
        answer: 'Nkɔ̀ntsəlαg', answerFr: 'Nkɔ̀ntsəlαg' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Bu',   french: 'Main',     english: 'Hand'  },
      { medumba: 'Kù',   french: 'Pied',     english: 'Foot'  },
      { medumba: 'Lαg',  french: 'Œil',      english: 'Eye'   },
      { medumba: 'Toŋ',  french: 'Oreille',  english: 'Ear'   },
      { medumba: 'Sɔ̀',  french: 'Dent',     english: 'Tooth' },
    ]}],
  },

  /* ── l3 : Food ───────────────────────────────────────────────── */
  l3: {
    meaning: [
      { type: 'meaning', sourceFr: 'Eau', sourceEn: 'Water', audio: 'Ntsə',
        options: ['Ntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        optionsFr: ['Ntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        answer: 'Ntsə', answerFr: 'Ntsə' },
      { type: 'meaning', sourceFr: 'Viande', sourceEn: 'Meat', audio: 'Mbαb',
        options: ['Mbαb', 'Ntsə', 'Ngǒntsə', 'Ngwa'],
        optionsFr: ['Mbαb', 'Ntsə', 'Ngǒntsə', 'Ngwa'],
        answer: 'Mbαb', answerFr: 'Mbαb' },
      { type: 'meaning', sourceFr: 'Poisson', sourceEn: 'Fish', audio: 'Ngǒntsə',
        options: ['Ngǒntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        optionsFr: ['Ngǒntsə', 'Mbαb', 'Ngwa', 'Dʉ̀mtə̀'],
        answer: 'Ngǒntsə', answerFr: 'Ngǒntsə' },
      { type: 'meaning', sourceFr: 'Sel', sourceEn: 'Salt', audio: 'Ngwa',
        options: ['Ngwa', 'Dʉ̀mtə̀', 'Ntsə', 'Nkûnmèkale'],
        optionsFr: ['Ngwa', 'Dʉ̀mtə̀', 'Ntsə', 'Nkûnmèkale'],
        answer: 'Ngwa', answerFr: 'Ngwa' },
      { type: 'meaning', sourceFr: 'Sucre', sourceEn: 'Sugar', audio: 'Dʉ̀mtə̀',
        options: ['Dʉ̀mtə̀', 'Ngwa', 'Nkûnmèkale', 'Mbαb'],
        optionsFr: ['Dʉ̀mtə̀', 'Ngwa', 'Nkûnmèkale', 'Mbαb'],
        answer: 'Dʉ̀mtə̀', answerFr: 'Dʉ̀mtə̀' },
      { type: 'meaning', sourceFr: 'Riz', sourceEn: 'Rice', audio: 'Nkûnmèkale',
        options: ['Nkûnmèkale', 'Kəlɔ̀ bàkə̀lɔ̀', 'Dʉ̀mtə̀', 'Mbαb'],
        optionsFr: ['Nkûnmèkale', 'Kəlɔ̀ bàkə̀lɔ̀', 'Dʉ̀mtə̀', 'Mbαb'],
        answer: 'Nkûnmèkale', answerFr: 'Nkûnmèkale' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Ntsə',      french: 'Eau',     english: 'Water'  },
      { medumba: 'Mbαb',      french: 'Viande',  english: 'Meat'   },
      { medumba: 'Ngǒntsə',   french: 'Poisson', english: 'Fish'   },
      { medumba: 'Ngwa',      french: 'Sel',     english: 'Salt'   },
      { medumba: 'Dʉ̀mtə̀',   french: 'Sucre',   english: 'Sugar'  },
    ]}],
  },

  /* ── l4 : Colors ─────────────────────────────────────────────── */
  l4: {
    meaning: [
      { type: 'meaning', sourceFr: 'Noir', sourceEn: 'Black', audio: 'Mɛ̀nnə̀sɛn',
        options: ['Mɛ̀nnə̀sɛn', 'Bà', 'Bwòŋ', 'Ntsə'],
        optionsFr: ['Mɛ̀nnə̀sɛn', 'Bà', 'Bwòŋ', 'Ntsə'],
        answer: 'Mɛ̀nnə̀sɛn', answerFr: 'Mɛ̀nnə̀sɛn' },
      { type: 'meaning', sourceFr: 'Rouge', sourceEn: 'Red', audio: 'Bà',
        options: ['Bà', 'Bwòŋ', 'Mɛ̀nnə̀sɛn', 'Ngwa'],
        optionsFr: ['Bà', 'Bwòŋ', 'Mɛ̀nnə̀sɛn', 'Ngwa'],
        answer: 'Bà', answerFr: 'Bà' },
      { type: 'meaning', sourceFr: 'Jaune', sourceEn: 'Yellow', audio: 'Bwòŋ',
        options: ['Bwòŋ', 'Bà', 'Mɛ̀nnə̀sɛn', 'Mbαb'],
        optionsFr: ['Bwòŋ', 'Bà', 'Mɛ̀nnə̀sɛn', 'Mbαb'],
        answer: 'Bwòŋ', answerFr: 'Bwòŋ' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Mɛ̀nnə̀sɛn', french: 'Noir',   english: 'Black'  },
      { medumba: 'Bà',          french: 'Rouge',  english: 'Red'    },
      { medumba: 'Bwòŋ',        french: 'Jaune',  english: 'Yellow' },
      { medumba: 'Ntsə',        french: 'Eau',    english: 'Water'  },
      { medumba: 'Mbʉ',         french: 'Chien',  english: 'Dog'    },
    ]}],
  },

  /* ── l5 : Numbers ────────────────────────────────────────────── */
  l5: {
    meaning: [
      { type: 'meaning', sourceFr: 'Deux', sourceEn: 'Two', audio: 'Bαhα',
        options: ['Bαhα', 'Tad', 'Kuὰ', 'Tα̂n'],
        optionsFr: ['Bαhα', 'Tad', 'Kuὰ', 'Tα̂n'],
        answer: 'Bαhα', answerFr: 'Bαhα' },
      { type: 'meaning', sourceFr: 'Trois', sourceEn: 'Three', audio: 'Tad',
        options: ['Tad', 'Bαhα', 'Kuὰ', 'Ntoge'],
        optionsFr: ['Tad', 'Bαhα', 'Kuὰ', 'Ntoge'],
        answer: 'Tad', answerFr: 'Tad' },
      { type: 'meaning', sourceFr: 'Quatre', sourceEn: 'Four', audio: 'Kuὰ',
        options: ['Kuὰ', 'Tα̂n', 'Tad', 'Bαhα'],
        optionsFr: ['Kuὰ', 'Tα̂n', 'Tad', 'Bαhα'],
        answer: 'Kuὰ', answerFr: 'Kuὰ' },
      { type: 'meaning', sourceFr: 'Cinq', sourceEn: 'Five', audio: 'Tα̂n',
        options: ['Tα̂n', 'Kuὰ', 'Ntoge', 'Sὰmmbαhα'],
        optionsFr: ['Tα̂n', 'Kuὰ', 'Ntoge', 'Sὰmmbαhα'],
        answer: 'Tα̂n', answerFr: 'Tα̂n' },
      { type: 'meaning', sourceFr: 'Six', sourceEn: 'Six', audio: 'Ntoge',
        options: ['Ntoge', 'Tα̂n', 'Sὰmmbαhα', 'Fomə'],
        optionsFr: ['Ntoge', 'Tα̂n', 'Sὰmmbαhα', 'Fomə'],
        answer: 'Ntoge', answerFr: 'Ntoge' },
      { type: 'meaning', sourceFr: 'Dix', sourceEn: 'Ten', audio: 'Gham',
        options: ['Gham', 'Fomə', 'Mbwə̀ꞌə', 'Sὰmmbαhα'],
        optionsFr: ['Gham', 'Fomə', 'Mbwə̀ꞌə', 'Sὰmmbαhα'],
        answer: 'Gham', answerFr: 'Gham' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Bαhα',       french: 'Deux',    english: 'Two'   },
      { medumba: 'Tad',         french: 'Trois',   english: 'Three' },
      { medumba: 'Kuὰ',         french: 'Quatre',  english: 'Four'  },
      { medumba: 'Tα̂n',        french: 'Cinq',    english: 'Five'  },
      { medumba: 'Gham',        french: 'Dix',     english: 'Ten'   },
    ]}],
  },

  /* ── l6 : Animals ────────────────────────────────────────────── */
  l6: {
    meaning: [
      { type: 'meaning', sourceFr: 'Chien', sourceEn: 'Dog', audio: 'Mbʉ',
        options: ['Mbʉ', 'Bùsi', 'Saŋə', 'Nyu'],
        optionsFr: ['Mbʉ', 'Bùsi', 'Saŋə', 'Nyu'],
        answer: 'Mbʉ', answerFr: 'Mbʉ' },
      { type: 'meaning', sourceFr: 'Chat', sourceEn: 'Cat', audio: 'Bùsi',
        options: ['Bùsi', 'Mbʉ', 'Nyαmnaꞌ', 'Njʉ̀mbwə'],
        optionsFr: ['Bùsi', 'Mbʉ', 'Nyαmnaꞌ', 'Njʉ̀mbwə'],
        answer: 'Bùsi', answerFr: 'Bùsi' },
      { type: 'meaning', sourceFr: 'Vache', sourceEn: 'Cow', audio: 'Nyαmnaꞌ',
        options: ['Nyαmnaꞌ', 'Njʉ̀mbwə', 'Mbʉ', 'Saŋə'],
        optionsFr: ['Nyαmnaꞌ', 'Njʉ̀mbwə', 'Mbʉ', 'Saŋə'],
        answer: 'Nyαmnaꞌ', answerFr: 'Nyαmnaꞌ' },
      { type: 'meaning', sourceFr: 'Mouton', sourceEn: 'Sheep', audio: 'Njʉ̀mbwə',
        options: ['Njʉ̀mbwə', 'Nyαmnaꞌ', 'Bùsi', 'Mbʉ'],
        optionsFr: ['Njʉ̀mbwə', 'Nyαmnaꞌ', 'Bùsi', 'Mbʉ'],
        answer: 'Njʉ̀mbwə', answerFr: 'Njʉ̀mbwə' },
      { type: 'meaning', sourceFr: 'Oiseau', sourceEn: 'Bird', audio: 'Saŋə',
        options: ['Saŋə', 'Nyu', 'Ngwα̌yid', 'Bùsi'],
        optionsFr: ['Saŋə', 'Nyu', 'Ngwα̌yid', 'Bùsi'],
        answer: 'Saŋə', answerFr: 'Saŋə' },
      { type: 'meaning', sourceFr: 'Lion', sourceEn: 'Lion', audio: 'Ngwα̌yid',
        options: ['Ngwα̌yid', 'Nyαmnaꞌ', 'Nyu', 'Mbʉ'],
        optionsFr: ['Ngwα̌yid', 'Nyαmnaꞌ', 'Nyu', 'Mbʉ'],
        answer: 'Ngwα̌yid', answerFr: 'Ngwα̌yid' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Mbʉ',      french: 'Chien',   english: 'Dog'   },
      { medumba: 'Bùsi',     french: 'Chat',    english: 'Cat'   },
      { medumba: 'Nyαmnaꞌ',  french: 'Vache',   english: 'Cow'   },
      { medumba: 'Saŋə',     french: 'Oiseau',  english: 'Bird'  },
      { medumba: 'Ngwα̌yid',  french: 'Lion',    english: 'Lion'  },
    ]}],
  },

  /* ── l7 : Family ─────────────────────────────────────────────── */
  l7: {
    meaning: [
      { type: 'meaning', sourceFr: 'Sœur', sourceEn: 'Sister', audio: 'Ngònmα',
        options: ['Ngònmα', 'Ndu', 'Mɛ̀nnzwi', 'Mɛn'],
        optionsFr: ['Ngònmα', 'Ndu', 'Mɛ̀nnzwi', 'Mɛn'],
        answer: 'Ngònmα', answerFr: 'Ngònmα' },
      { type: 'meaning', sourceFr: 'Mari', sourceEn: 'Husband', audio: 'Ndu',
        options: ['Ndu', 'Mɛ̀nnzwi', 'Ngònmα', 'Nshùm'],
        optionsFr: ['Ndu', 'Mɛ̀nnzwi', 'Ngònmα', 'Nshùm'],
        answer: 'Ndu', answerFr: 'Ndu' },
      { type: 'meaning', sourceFr: 'Femme', sourceEn: 'Wife', audio: 'Mɛ̀nnzwi',
        options: ['Mɛ̀nnzwi', 'Ndu', 'Ngòn', 'Ngònmα'],
        optionsFr: ['Mɛ̀nnzwi', 'Ndu', 'Ngòn', 'Ngònmα'],
        answer: 'Mɛ̀nnzwi', answerFr: 'Mɛ̀nnzwi' },
      { type: 'meaning', sourceFr: 'Enfant', sourceEn: 'Child', audio: 'Mɛn',
        options: ['Mɛn', 'Ngòn', 'Nshùm', 'Fàd'],
        optionsFr: ['Mɛn', 'Ngòn', 'Nshùm', 'Fàd'],
        answer: 'Mɛn', answerFr: 'Mɛn' },
      { type: 'meaning', sourceFr: 'Fille', sourceEn: 'Girl', audio: 'Ngòn',
        options: ['Ngòn', 'Mɛn', 'Nshùm', 'Ngònmα'],
        optionsFr: ['Ngòn', 'Mɛn', 'Nshùm', 'Ngònmα'],
        answer: 'Ngòn', answerFr: 'Ngòn' },
      { type: 'meaning', sourceFr: 'Fils', sourceEn: 'Son', audio: 'Nshùm',
        options: ['Nshùm', 'Mɛn', 'Ngòn', 'Fàd'],
        optionsFr: ['Nshùm', 'Mɛn', 'Ngòn', 'Fàd'],
        answer: 'Nshùm', answerFr: 'Nshùm' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Ngònmα',   french: 'Sœur',    english: 'Sister'  },
      { medumba: 'Ndu',      french: 'Mari',     english: 'Husband' },
      { medumba: 'Mɛn',      french: 'Enfant',   english: 'Child'   },
      { medumba: 'Ngòn',     french: 'Fille',    english: 'Girl'    },
      { medumba: 'Nshùm',    french: 'Fils',     english: 'Son'     },
    ]}],
  },

  /* ── l8 : Nature ─────────────────────────────────────────────── */
  l8: {
    meaning: [
      { type: 'meaning', sourceFr: 'Soleil', sourceEn: 'Sun', audio: 'Nyàm',
        options: ['Nyàm', 'Mαŋwʉ', 'Mbwoge', 'Mbàŋ'],
        optionsFr: ['Nyàm', 'Mαŋwʉ', 'Mbwoge', 'Mbàŋ'],
        answer: 'Nyàm', answerFr: 'Nyàm' },
      { type: 'meaning', sourceFr: 'Lune', sourceEn: 'Moon', audio: 'Mαŋwʉ',
        options: ['Mαŋwʉ', 'Nyàm', 'Mbàŋ', 'Lòŋ'],
        optionsFr: ['Mαŋwʉ', 'Nyàm', 'Mbàŋ', 'Lòŋ'],
        answer: 'Mαŋwʉ', answerFr: 'Mαŋwʉ' },
      { type: 'meaning', sourceFr: 'Feu', sourceEn: 'Fire', audio: 'Mbwoge',
        options: ['Mbwoge', 'Ntsə', 'Mbàŋ', 'Lòŋ'],
        optionsFr: ['Mbwoge', 'Ntsə', 'Mbàŋ', 'Lòŋ'],
        answer: 'Mbwoge', answerFr: 'Mbwoge' },
      { type: 'meaning', sourceFr: 'Pluie', sourceEn: 'Rain', audio: 'Mbàŋ',
        options: ['Mbàŋ', 'Fə̀dmbàŋ', 'Mbwoge', 'Nyàm'],
        optionsFr: ['Mbàŋ', 'Fə̀dmbàŋ', 'Mbwoge', 'Nyàm'],
        answer: 'Mbàŋ', answerFr: 'Mbàŋ' },
      { type: 'meaning', sourceFr: 'Vent', sourceEn: 'Wind', audio: 'Fə̀dmbàŋ',
        options: ['Fə̀dmbàŋ', 'Mbàŋ', 'Lòŋ', 'Mbalə'],
        optionsFr: ['Fə̀dmbàŋ', 'Mbàŋ', 'Lòŋ', 'Mbalə'],
        answer: 'Fə̀dmbàŋ', answerFr: 'Fə̀dmbàŋ' },
      { type: 'meaning', sourceFr: 'Pierre', sourceEn: 'Stone', audio: 'Lòŋ',
        options: ['Lòŋ', 'Mbalə', 'Mbwoge', 'Ntsə'],
        optionsFr: ['Lòŋ', 'Mbalə', 'Mbwoge', 'Ntsə'],
        answer: 'Lòŋ', answerFr: 'Lòŋ' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Nyàm',    french: 'Soleil', english: 'Sun'   },
      { medumba: 'Mαŋwʉ',   french: 'Lune',   english: 'Moon'  },
      { medumba: 'Mbwoge',  french: 'Feu',    english: 'Fire'  },
      { medumba: 'Mbàŋ',    french: 'Pluie',  english: 'Rain'  },
      { medumba: 'Lòŋ',     french: 'Pierre', english: 'Stone' },
    ]}],
  },

  /* ── l9 : Time ───────────────────────────────────────────────── */
  l9: {
    meaning: [
      { type: 'meaning', sourceFr: 'Jour', sourceEn: 'Day', audio: 'Leꞌe',
        options: ['Leꞌe', 'Tswəꞌ', 'Nkə̂bnjʉ', 'Ngὰbnjʉ'],
        optionsFr: ['Leꞌe', 'Tswəꞌ', 'Nkə̂bnjʉ', 'Ngὰbnjʉ'],
        answer: 'Leꞌe', answerFr: 'Leꞌe' },
      { type: 'meaning', sourceFr: 'Nuit', sourceEn: 'Night', audio: 'Tswəꞌ',
        options: ['Tswəꞌ', 'Leꞌe', 'Mfə̌dnjʉ', 'Nkə̂bnjʉ'],
        optionsFr: ['Tswəꞌ', 'Leꞌe', 'Mfə̌dnjʉ', 'Nkə̂bnjʉ'],
        answer: 'Tswəꞌ', answerFr: 'Tswəꞌ' },
      { type: 'meaning', sourceFr: 'Matin', sourceEn: 'Morning', audio: 'Nkə̂bnjʉ',
        options: ['Nkə̂bnjʉ', 'Mfə̌dnjʉ', 'Leꞌe', 'Tswəꞌ'],
        optionsFr: ['Nkə̂bnjʉ', 'Mfə̌dnjʉ', 'Leꞌe', 'Tswəꞌ'],
        answer: 'Nkə̂bnjʉ', answerFr: 'Nkə̂bnjʉ' },
      { type: 'meaning', sourceFr: 'Soir', sourceEn: 'Evening', audio: 'Mfə̌dnjʉ',
        options: ['Mfə̌dnjʉ', 'Nkə̂bnjʉ', 'Ngὰbnjʉ', 'Tswəꞌ'],
        optionsFr: ['Mfə̌dnjʉ', 'Nkə̂bnjʉ', 'Ngὰbnjʉ', 'Tswəꞌ'],
        answer: 'Mfə̌dnjʉ', answerFr: 'Mfə̌dnjʉ' },
      { type: 'meaning', sourceFr: 'Semaine', sourceEn: 'Week', audio: 'Ngὰbnjʉ',
        options: ['Ngὰbnjʉ', 'Mətsill', 'Leꞌe', 'Ngə̀laŋ'],
        optionsFr: ['Ngὰbnjʉ', 'Mətsill', 'Leꞌe', 'Ngə̀laŋ'],
        answer: 'Ngὰbnjʉ', answerFr: 'Ngὰbnjʉ' },
      { type: 'meaning', sourceFr: 'Mois', sourceEn: 'Month', audio: 'Mətsill',
        options: ['Mətsill', 'Ngὰbnjʉ', 'Ngə̀laŋ', 'Leꞌe'],
        optionsFr: ['Mətsill', 'Ngὰbnjʉ', 'Ngə̀laŋ', 'Leꞌe'],
        answer: 'Mətsill', answerFr: 'Mətsill' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Leꞌe',    french: 'Jour',     english: 'Day'     },
      { medumba: 'Tswəꞌ',   french: 'Nuit',     english: 'Night'   },
      { medumba: 'Nkə̂bnjʉ', french: 'Matin',    english: 'Morning' },
      { medumba: 'Ngὰbnjʉ', french: 'Semaine',  english: 'Week'    },
      { medumba: 'Mətsill', french: 'Mois',     english: 'Month'   },
    ]}],
  },

  /* ── l10 : Introductions / Présentations ─────────────────────── */
  l10: {
    meaning: [
      { type: 'meaning', sourceFr: 'Homme', sourceEn: 'Man', audio: 'Mαndùm',
        options: ['Mαndùm', 'Mɛ̀nnzwi', 'Mɛn', 'Mfɛd'],
        optionsFr: ['Mαndùm', 'Mɛ̀nnzwi', 'Mɛn', 'Mfɛd'],
        answer: 'Mαndùm', answerFr: 'Mαndùm' },
      { type: 'meaning', sourceFr: 'Femme', sourceEn: 'Woman', audio: 'Mɛ̀nnzwi',
        options: ['Mɛ̀nnzwi', 'Mαndùm', 'Mɛn', 'Nshun'],
        optionsFr: ['Mɛ̀nnzwi', 'Mαndùm', 'Mɛn', 'Nshun'],
        answer: 'Mɛ̀nnzwi', answerFr: 'Mɛ̀nnzwi' },
      { type: 'meaning', sourceFr: 'Frère', sourceEn: 'Brother', audio: 'Mfɛd',
        options: ['Mfɛd', 'Nshun', 'Ncʉὰmbwə̀', 'Ntʉ\'njàm'],
        optionsFr: ['Mfɛd', 'Nshun', 'Ncʉὰmbwə̀', 'Ntʉ\'njàm'],
        answer: 'Mfɛd', answerFr: 'Mfɛd' },
      { type: 'meaning', sourceFr: 'Ami(e)', sourceEn: 'Friend', audio: 'Nshun',
        options: ['Nshun', 'Mfɛd', 'Ncʉὰmbwə̀', 'Mαndùm'],
        optionsFr: ['Nshun', 'Mfɛd', 'Ncʉὰmbwə̀', 'Mαndùm'],
        answer: 'Nshun', answerFr: 'Nshun' },
      { type: 'meaning', sourceFr: 'Enfant', sourceEn: 'Child', audio: 'Mɛn',
        options: ['Mɛn', 'Mɛ̀nntʉ̀n', 'Mαndùm', 'Ntʉ\'njàm'],
        optionsFr: ['Mɛn', 'Mɛ̀nntʉ̀n', 'Mαndùm', 'Ntʉ\'njàm'],
        answer: 'Mɛn', answerFr: 'Mɛn' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Mαndùm',    french: 'Homme',   english: 'Man'    },
      { medumba: 'Mɛ̀nnzwi',   french: 'Femme',   english: 'Woman'  },
      { medumba: 'Mfɛd',      french: 'Frère',   english: 'Brother'},
      { medumba: 'Nshun',     french: 'Ami',     english: 'Friend' },
      { medumba: 'Mɛn',       french: 'Enfant',  english: 'Child'  },
    ]}],
  },

  /* ── l11 : Kitchen / Cuisine ──────────────────────────────────── */
  l11: {
    meaning: [
      { type: 'meaning', sourceFr: 'Cuisine', sourceEn: 'Kitchen', audio: 'Fə̌\'mbwogə',
        options: ['Fə̌\'mbwogə', 'Nzə̂mbwogə', 'Mbwogə', 'Ntànywìn'],
        optionsFr: ['Fə̌\'mbwogə', 'Nzə̂mbwogə', 'Mbwogə', 'Ntànywìn'],
        answer: 'Fə̌\'mbwogə', answerFr: 'Fə̌\'mbwogə' },
      { type: 'meaning', sourceFr: 'Casserole', sourceEn: 'Pot', audio: 'Nzə̂mbwogə',
        options: ['Nzə̂mbwogə', 'Fə̌\'mbwogə', 'Ntànywìn', 'Ntàmfʉαg'],
        optionsFr: ['Nzə̂mbwogə', 'Fə̌\'mbwogə', 'Ntànywìn', 'Ntàmfʉαg'],
        answer: 'Nzə̂mbwogə', answerFr: 'Nzə̂mbwogə' },
      { type: 'meaning', sourceFr: 'Cuillère', sourceEn: 'Spoon', audio: 'Ntànywìn',
        options: ['Ntànywìn', 'Ntàmfʉαg', 'Kwe\'', 'Nzə̂mbwogə'],
        optionsFr: ['Ntànywìn', 'Ntàmfʉαg', 'Kwe\'', 'Nzə̂mbwogə'],
        answer: 'Ntànywìn', answerFr: 'Ntànywìn' },
      { type: 'meaning', sourceFr: 'Feu', sourceEn: 'Fire', audio: 'Mbwogə',
        options: ['Mbwogə', 'Fə̌\'mbwogə', 'Kwe\'', 'Ntànywìn'],
        optionsFr: ['Mbwogə', 'Fə̌\'mbwogə', 'Kwe\'', 'Ntànywìn'],
        answer: 'Mbwogə', answerFr: 'Mbwogə' },
      { type: 'meaning', sourceFr: 'Sel', sourceEn: 'Salt', audio: 'Kwe\'',
        options: ['Kwe\'', 'Mbwogə', 'Ntànywìn', 'Nzə̂mbwogə'],
        optionsFr: ['Kwe\'', 'Mbwogə', 'Ntànywìn', 'Nzə̂mbwogə'],
        answer: 'Kwe\'', answerFr: 'Kwe\'' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Fə̌\'mbwogə', french: 'Cuisine',    english: 'Kitchen' },
      { medumba: 'Nzə̂mbwogə',  french: 'Casserole',  english: 'Pot'     },
      { medumba: 'Ntànywìn',   french: 'Cuillère',   english: 'Spoon'   },
      { medumba: 'Mbwogə',     french: 'Feu',        english: 'Fire'    },
      { medumba: 'Kwe\'',      french: 'Sel',        english: 'Salt'    },
    ]}],
  },

  /* ── l12 : Illnesses / Maladies ───────────────────────────────── */
  l12: {
    meaning: [
      { type: 'meaning', sourceFr: 'Mal de tête', sourceEn: 'Headache', audio: 'Yâtu',
        options: ['Yâtu', 'Bǎmmba', 'Kwiag', 'Saŋtə̀wud'],
        optionsFr: ['Yâtu', 'Bǎmmba', 'Kwiag', 'Saŋtə̀wud'],
        answer: 'Yâtu', answerFr: 'Yâtu' },
      { type: 'meaning', sourceFr: 'Mal au ventre', sourceEn: 'Stomachache', audio: 'Bǎmmba',
        options: ['Bǎmmba', 'Yâtu', 'Kwiag', 'Mìntsi'],
        optionsFr: ['Bǎmmba', 'Yâtu', 'Kwiag', 'Mìntsi'],
        answer: 'Bǎmmba', answerFr: 'Bǎmmba' },
      { type: 'meaning', sourceFr: 'Toux', sourceEn: 'Cough', audio: 'Kwiag',
        options: ['Kwiag', 'Bǎmmba', 'Saŋtə̀wud', 'Bìkoŋə'],
        optionsFr: ['Kwiag', 'Bǎmmba', 'Saŋtə̀wud', 'Bìkoŋə'],
        answer: 'Kwiag', answerFr: 'Kwiag' },
      { type: 'meaning', sourceFr: 'Fièvre', sourceEn: 'Fever', audio: 'Saŋtə̀wud',
        options: ['Saŋtə̀wud', 'Kwiag', 'Bìkoŋə', 'Yâtu'],
        optionsFr: ['Saŋtə̀wud', 'Kwiag', 'Bìkoŋə', 'Yâtu'],
        answer: 'Saŋtə̀wud', answerFr: 'Saŋtə̀wud' },
      { type: 'meaning', sourceFr: 'Rhume', sourceEn: 'Cold', audio: 'Bìkoŋə',
        options: ['Bìkoŋə', 'Saŋtə̀wud', 'Kwiag', 'Mìntsi'],
        optionsFr: ['Bìkoŋə', 'Saŋtə̀wud', 'Kwiag', 'Mìntsi'],
        answer: 'Bìkoŋə', answerFr: 'Bìkoŋə' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Yâtu',       french: 'Mal de tête',  english: 'Headache'    },
      { medumba: 'Bǎmmba',     french: 'Mal au ventre',english: 'Stomachache' },
      { medumba: 'Kwiag',      french: 'Toux',         english: 'Cough'       },
      { medumba: 'Saŋtə̀wud',  french: 'Fièvre',       english: 'Fever'       },
      { medumba: 'Bìkoŋə',     french: 'Rhume',        english: 'Cold'        },
    ]}],
  },

  /* ── l13 : School / École ─────────────────────────────────────── */
  l13: {
    meaning: [
      { type: 'meaning', sourceFr: 'Cahier', sourceEn: 'Notebook', audio: 'Bu\'kì',
        options: ['Bu\'kì', 'Bu\'ŋwà\'nì', 'Cɛ̂dkì', 'Kʉ̂dfi'],
        optionsFr: ['Bu\'kì', 'Bu\'ŋwà\'nì', 'Cɛ̂dkì', 'Kʉ̂dfi'],
        answer: 'Bu\'kì', answerFr: 'Bu\'kì' },
      { type: 'meaning', sourceFr: 'Livre', sourceEn: 'Book', audio: 'Bu\'ŋwà\'nì',
        options: ['Bu\'ŋwà\'nì', 'Bu\'kì', 'Mbə̂mkì', 'Bǎgcɛ̂dkì'],
        optionsFr: ['Bu\'ŋwà\'nì', 'Bu\'kì', 'Mbə̂mkì', 'Bǎgcɛ̂dkì'],
        answer: 'Bu\'ŋwà\'nì', answerFr: 'Bu\'ŋwà\'nì' },
      { type: 'meaning', sourceFr: 'Table-banc', sourceEn: 'School desk', audio: 'Kʉ̂dfi',
        options: ['Kʉ̂dfi', 'Bu\'kì', 'Cɛ̂dkì', 'Bǎgcɛ̂dkì'],
        optionsFr: ['Kʉ̂dfi', 'Bu\'kì', 'Cɛ̂dkì', 'Bǎgcɛ̂dkì'],
        answer: 'Kʉ̂dfi', answerFr: 'Kʉ̂dfi' },
      { type: 'meaning', sourceFr: 'Stylo', sourceEn: 'Pen', audio: 'Cɛ̂dkì',
        options: ['Cɛ̂dkì', 'Bu\'kì', 'Kʉ̂dfi', 'Mbə̂mkì'],
        optionsFr: ['Cɛ̂dkì', 'Bu\'kì', 'Kʉ̂dfi', 'Mbə̂mkì'],
        answer: 'Cɛ̂dkì', answerFr: 'Cɛ̂dkì' },
      { type: 'meaning', sourceFr: 'Cartable', sourceEn: 'School bag', audio: 'Bǎgcɛ̂dkì',
        options: ['Bǎgcɛ̂dkì', 'Bu\'kì', 'Cɛ̂dkì', 'Kʉ̂dfi'],
        optionsFr: ['Bǎgcɛ̂dkì', 'Bu\'kì', 'Cɛ̂dkì', 'Kʉ̂dfi'],
        answer: 'Bǎgcɛ̂dkì', answerFr: 'Bǎgcɛ̂dkì' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Bu\'kì',     french: 'Cahier',     english: 'Notebook'   },
      { medumba: 'Bu\'ŋwà\'nì',french: 'Livre',      english: 'Book'       },
      { medumba: 'Kʉ̂dfi',     french: 'Table-banc', english: 'School desk'},
      { medumba: 'Cɛ̂dkì',     french: 'Stylo',      english: 'Pen'        },
      { medumba: 'Bǎgcɛ̂dkì',  french: 'Cartable',   english: 'School bag' },
    ]}],
  },

  /* ── l14 : Professions / Métiers ──────────────────────────────── */
  l14: {
    meaning: [
      { type: 'meaning', sourceFr: 'Enseignant', sourceEn: 'Teacher', audio: 'Ngàtswìtə̀',
        options: ['Ngàtswìtə̀', 'Ndʉ̂\'nὰ', 'Tα̂lὰm', 'Ndè\'càm'],
        optionsFr: ['Ngàtswìtə̀', 'Ndʉ̂\'nὰ', 'Tα̂lὰm', 'Ndè\'càm'],
        answer: 'Ngàtswìtə̀', answerFr: 'Ngàtswìtə̀' },
      { type: 'meaning', sourceFr: 'Cultivateur', sourceEn: 'Farmer', audio: 'Ndʉ̂\'nὰ',
        options: ['Ndʉ̂\'nὰ', 'Ngàtswìtə̀', 'Ntântαnə', 'Nsòŋsaŋvə̀'],
        optionsFr: ['Ndʉ̂\'nὰ', 'Ngàtswìtə̀', 'Ntântαnə', 'Nsòŋsaŋvə̀'],
        answer: 'Ndʉ̂\'nὰ', answerFr: 'Ndʉ̂\'nὰ' },
      { type: 'meaning', sourceFr: 'Couturier', sourceEn: 'Tailor', audio: 'Tα̂lὰm',
        options: ['Tα̂lὰm', 'Ndʉ̂\'nὰ', 'Ntântαnə', 'Nswɛ̀nfu'],
        optionsFr: ['Tα̂lὰm', 'Ndʉ̂\'nὰ', 'Ntântαnə', 'Nswɛ̀nfu'],
        answer: 'Tα̂lὰm', answerFr: 'Tα̂lὰm' },
      { type: 'meaning', sourceFr: 'Secrétaire', sourceEn: 'Secretary', audio: 'Ndè\'càm',
        options: ['Ndè\'càm', 'Tα̂lὰm', 'Nsòŋsaŋvə̀', 'Nswɛ̀nfu'],
        optionsFr: ['Ndè\'càm', 'Tα̂lὰm', 'Nsòŋsaŋvə̀', 'Nswɛ̀nfu'],
        answer: 'Ndè\'càm', answerFr: 'Ndè\'càm' },
      { type: 'meaning', sourceFr: 'Pharmacien', sourceEn: 'Pharmacist', audio: 'Nsòŋsaŋvə̀',
        options: ['Nsòŋsaŋvə̀', 'Ndè\'càm', 'Ngàtswìtə̀', 'Nswɛ̀nfu'],
        optionsFr: ['Nsòŋsaŋvə̀', 'Ndè\'càm', 'Ngàtswìtə̀', 'Nswɛ̀nfu'],
        answer: 'Nsòŋsaŋvə̀', answerFr: 'Nsòŋsaŋvə̀' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Ngàtswìtə̀',  french: 'Enseignant',  english: 'Teacher'    },
      { medumba: 'Ndʉ̂\'nὰ',    french: 'Cultivateur', english: 'Farmer'     },
      { medumba: 'Tα̂lὰm',      french: 'Couturier',   english: 'Tailor'     },
      { medumba: 'Ndè\'càm',    french: 'Secrétaire',  english: 'Secretary'  },
      { medumba: 'Nsòŋsaŋvə̀',  french: 'Pharmacien',  english: 'Pharmacist' },
    ]}],
  },

  l15: {
    meaning: [
      { type: 'meaning', sourceFr: 'Bonjour / Salut', sourceEn: 'Hello', audio: 'Ndà\'ndà\' lα!',
        options: ['Ndà\'ndà\' lα!', 'A fi tsə', 'Mə làbtə̌', 'Ndʉ̂ kə?'],
        optionsFr: ['Ndà\'ndà\' lα!', 'A fi tsə', 'Mə làbtə̌', 'Ndʉ̂ kə?'],
        answer: 'Ndà\'ndà\' lα!', answerFr: 'Ndà\'ndà\' lα!' },
      { type: 'meaning', sourceFr: 'Ça va bien', sourceEn: 'I\'m fine', audio: 'A fi tsə',
        options: ['A fi tsə', 'Ndʉ̂ kə?', 'Mə làbtə̌', 'Ò bə α̂ wə?'],
        optionsFr: ['A fi tsə', 'Ndʉ̂ kə?', 'Mə làbtə̌', 'Ò bə α̂ wə?'],
        answer: 'A fi tsə', answerFr: 'A fi tsə' },
      { type: 'meaning', sourceFr: 'Merci', sourceEn: 'Thank you', audio: 'Mə làbtə̌',
        options: ['Mə làbtə̌', 'A fi tsə', 'Ngα', 'Ŋ'],
        optionsFr: ['Mə làbtə̌', 'A fi tsə', 'Ngα', 'Ŋ'],
        answer: 'Mə làbtə̌', answerFr: 'Mə làbtə̌' },
      { type: 'meaning', sourceFr: 'Comment ça va ?', sourceEn: 'How are you?', audio: 'Ndʉ̂ kə?',
        options: ['Ndʉ̂ kə?', 'Ò bə α̂ wə?', 'A fi tsə', 'Lɛ̂n su bə α̂ wə?'],
        optionsFr: ['Ndʉ̂ kə?', 'Ò bə α̂ wə?', 'A fi tsə', 'Lɛ̂n su bə α̂ wə?'],
        answer: 'Ndʉ̂ kə?', answerFr: 'Ndʉ̂ kə?' },
      { type: 'meaning', sourceFr: 'Oui', sourceEn: 'Yes', audio: 'Ŋ',
        options: ['Ŋ', 'Ngα', 'Mə làbtə̌', 'A fi tsə'],
        optionsFr: ['Ŋ', 'Ngα', 'Mə làbtə̌', 'A fi tsə'],
        answer: 'Ŋ', answerFr: 'Ŋ' },
      { type: 'meaning', sourceFr: 'Non', sourceEn: 'No', audio: 'Ngα',
        options: ['Ngα', 'Ŋ', 'A fi tsə', 'Ndʉ̂ kə?'],
        optionsFr: ['Ngα', 'Ŋ', 'A fi tsə', 'Ndʉ̂ kə?'],
        answer: 'Ngα', answerFr: 'Ngα' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Ndà\'ndà\' lα!', french: 'Bonjour',        english: 'Hello'     },
      { medumba: 'A fi tsə',       french: 'Ça va bien',     english: 'I\'m fine' },
      { medumba: 'Mə làbtə̌',      french: 'Merci',          english: 'Thank you' },
      { medumba: 'Ndʉ̂ kə?',       french: 'Comment ça va?', english: 'How are you?' },
      { medumba: 'Ò bə α̂ wə?',    french: 'Qui es-tu ?',    english: 'Who are you?' },
    ]}],
  },

  l16: {
    meaning: [
      { type: 'meaning', sourceFr: 'Récolter / Cueillir', sourceEn: 'To harvest', audio: 'Nə̀ ba',
        options: ['Nə̀ ba', 'Nə̀ bǎg', 'Nə̀ bagə', 'Nə̀ babə'],
        optionsFr: ['Nə̀ ba', 'Nə̀ bǎg', 'Nə̀ bagə', 'Nə̀ babə'],
        answer: 'Nə̀ ba', answerFr: 'Nə̀ ba' },
      { type: 'meaning', sourceFr: 'Rougir / Mûrir', sourceEn: 'To ripen', audio: 'Nə̀ bǎ',
        options: ['Nə̀ bǎ', 'Nə̀ ba', 'Nə̀ bagə', 'Nə̀ bǎg'],
        optionsFr: ['Nə̀ bǎ', 'Nə̀ ba', 'Nə̀ bagə', 'Nə̀ bǎg'],
        answer: 'Nə̀ bǎ', answerFr: 'Nə̀ bǎ' },
      { type: 'meaning', sourceFr: 'Se gâter', sourceEn: 'To spoil', audio: 'Nə̀ bagə',
        options: ['Nə̀ bagə', 'Nə̀ ba', 'Nə̀ bǎ', 'Nə̀ bǎg'],
        optionsFr: ['Nə̀ bagə', 'Nə̀ ba', 'Nə̀ bǎ', 'Nə̀ bǎg'],
        answer: 'Nə̀ bagə', answerFr: 'Nə̀ bagə' },
      { type: 'meaning', sourceFr: 'Fendre / Couper', sourceEn: 'To split', audio: 'Nə̀ bǎg',
        options: ['Nə̀ bǎg', 'Nə̀ ba', 'Nə̀ bǎ', 'Nə̀ babə'],
        optionsFr: ['Nə̀ bǎg', 'Nə̀ ba', 'Nə̀ bǎ', 'Nə̀ babə'],
        answer: 'Nə̀ bǎg', answerFr: 'Nə̀ bǎg' },
      { type: 'meaning', sourceFr: 'Porter au dos', sourceEn: 'Carry on back', audio: 'Nə̀ bàdtə̌',
        options: ['Nə̀ bàdtə̌', 'Nə̀ badtə', 'Nə̀ babə', 'Nə̀ bagə'],
        optionsFr: ['Nə̀ bàdtə̌', 'Nə̀ badtə', 'Nə̀ babə', 'Nə̀ bagə'],
        answer: 'Nə̀ bàdtə̌', answerFr: 'Nə̀ bàdtə̌' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Nə̀ ba',     french: 'Récolter',         english: 'To harvest'  },
      { medumba: 'Nə̀ bǎ',     french: 'Rougir / Mûrir',   english: 'To ripen'    },
      { medumba: 'Nə̀ bagə',   french: 'Se gâter',          english: 'To spoil'    },
      { medumba: 'Nə̀ bǎg',    french: 'Fendre',            english: 'To split'    },
      { medumba: 'Nə̀ babə',   french: 'Verser avec force', english: 'Pour forcefully' },
    ]}],
  },

  l17: {
    meaning: [
      { type: 'meaning', sourceFr: 'Deuil', sourceEn: 'Mourning', audio: 'Vʉ',
        options: ['Vʉ', 'Ndαvʉ', 'Nə̀ sǎvʉ', 'Nə̀ loŋvʉ'],
        optionsFr: ['Vʉ', 'Ndαvʉ', 'Nə̀ sǎvʉ', 'Nə̀ loŋvʉ'],
        answer: 'Vʉ', answerFr: 'Vʉ' },
      { type: 'meaning', sourceFr: 'Enterrer', sourceEn: 'To bury', audio: 'Nə̀ coŋ mɛ̀n',
        options: ['Nə̀ coŋ mɛ̀n', 'Nə̀ to vʉ', 'Nə̀ lα̌n vʉ', 'Nə̀ loŋvʉ'],
        optionsFr: ['Nə̀ coŋ mɛ̀n', 'Nə̀ to vʉ', 'Nə̀ lα̌n vʉ', 'Nə̀ loŋvʉ'],
        answer: 'Nə̀ coŋ mɛ̀n', answerFr: 'Nə̀ coŋ mɛ̀n' },
      { type: 'meaning', sourceFr: 'Funérailles', sourceEn: 'Funeral rites', audio: 'Nə̀ sǎvʉ',
        options: ['Nə̀ sǎvʉ', 'Nə̀ coŋ mɛ̀n', 'Ndαvʉ', 'Vʉ'],
        optionsFr: ['Nə̀ sǎvʉ', 'Nə̀ coŋ mɛ̀n', 'Ndαvʉ', 'Vʉ'],
        answer: 'Nə̀ sǎvʉ', answerFr: 'Nə̀ sǎvʉ' },
      { type: 'meaning', sourceFr: 'Lieu sacré', sourceEn: 'Sacred place', audio: 'Mbwə̀\'',
        options: ['Mbwə̀\'', 'Lâ\'kwa', 'Ndαvʉ', 'Nshʉ̂\'nὰ'],
        optionsFr: ['Mbwə̀\'', 'Lâ\'kwa', 'Ndαvʉ', 'Nshʉ̂\'nὰ'],
        answer: 'Mbwə̀\'', answerFr: 'Mbwə̀\'' },
      { type: 'meaning', sourceFr: 'Lieu d\'initiation', sourceEn: 'Initiation ground', audio: 'Lâ\'kwa',
        options: ['Lâ\'kwa', 'Mbwə̀\'', 'Ndαvʉ', 'Nshʉ̂\'nὰ'],
        optionsFr: ['Lâ\'kwa', 'Mbwə̀\'', 'Ndαvʉ', 'Nshʉ̂\'nὰ'],
        answer: 'Lâ\'kwa', answerFr: 'Lâ\'kwa' },
      { type: 'meaning', sourceFr: 'Danser', sourceEn: 'To dance', audio: 'Nə̀ nyǎncu',
        options: ['Nə̀ nyǎncu', 'Nə̀ sǎvʉ', 'Nə̀ loŋvʉ', 'Nə̀ zi mò'],
        optionsFr: ['Nə̀ nyǎncu', 'Nə̀ sǎvʉ', 'Nə̀ loŋvʉ', 'Nə̀ zi mò'],
        answer: 'Nə̀ nyǎncu', answerFr: 'Nə̀ nyǎncu' },
      { type: 'meaning', sourceFr: 'Travail communautaire', sourceEn: 'Community work', audio: 'Nshʉ̂\'nὰ',
        options: ['Nshʉ̂\'nὰ', 'Mbwə̀\'', 'Lâ\'kwa', 'Ndαvʉ'],
        optionsFr: ['Nshʉ̂\'nὰ', 'Mbwə̀\'', 'Lâ\'kwa', 'Ndαvʉ'],
        answer: 'Nshʉ̂\'nὰ', answerFr: 'Nshʉ̂\'nὰ' },
    ],
    match: [{ type: 'match', pairs: [
      { medumba: 'Vʉ',           french: 'Deuil',              english: 'Mourning'        },
      { medumba: 'Nə̀ sǎvʉ',     french: 'Funérailles',        english: 'Funeral rites'   },
      { medumba: 'Nə̀ coŋ mɛ̀n', french: 'Enterrer',           english: 'To bury'         },
      { medumba: 'Mbwə̀\'',       french: 'Lieu sacré',         english: 'Sacred place'    },
      { medumba: 'Nə̀ nyǎncu',   french: 'Danser',             english: 'To dance'        },
    ]}],
  },
};

/* Full vocabulary list (4000+ entries) for dictionary/search views */
export const DICTIONARY = [
  {
    "medumba": "Ngàfαncʉꞌ",
    "french": "Le̍gislateur",
    "english": "Legislator"
  },
  {
    "medumba": "Njὰb",
    "french": "Le̍gume",
    "english": "Vegetable"
  },
  {
    "medumba": "Nə̀fikɛlə",
    "french": "Lent",
    "english": "Slow"
  },
  {
    "medumba": "Fikɛ̀d",
    "french": "Lenteur",
    "english": "Slowness"
  },
  {
    "medumba": "Nə̀fikɛlə",
    "french": "Lenteur",
    "english": "Slowness"
  },
  {
    "medumba": "Nkinə",
    "french": "Lèpre",
    "english": "Leprosy"
  },
  {
    "medumba": "Ngànkinə",
    "french": "Le̍preux",
    "english": "Le̍preux"
  },
  {
    "medumba": "Dʉ̌ꞌghǎnkin",
    "french": "Le̍priserie",
    "english": "Le̍priserie"
  },
  {
    "medumba": "Ndǎmnjʉ",
    "french": "Lendemain",
    "english": "Next day"
  },
  {
    "medumba": "Lα̂gŋwàꞌni",
    "french": "Lettre",
    "english": "Letter"
  },
  {
    "medumba": "Ŋwàꞌni",
    "french": "Lettre",
    "english": "Letter"
  },
  {
    "medumba": "Ncàꞌ",
    "french": "Levain",
    "english": "Sourdough"
  },
  {
    "medumba": "Nə̀ bʉꞌ nsi",
    "french": "Lever",
    "english": "Lift"
  },
  {
    "medumba": "Nə̀ lǒtʉ",
    "french": "Lever",
    "english": "Lift"
  },
  {
    "medumba": "Nə̀ lǒnsi",
    "french": "Lever",
    "english": "Lift"
  },
  {
    "medumba": "Nə̀ koꞌo",
    "french": "Lever",
    "english": "Lift"
  },
  {
    "medumba": "Kə̀kǔbncù",
    "french": "Lèvre",
    "english": "Lip"
  },
  {
    "medumba": "Lə̀",
    "french": "Liane",
    "english": "Liane"
  },
  {
    "medumba": "Shudnyὰm",
    "french": "Lièvre",
    "english": "Hare"
  },
  {
    "medumba": "Nkʉ",
    "french": "Lien",
    "english": "Link"
  },
  {
    "medumba": "Nga",
    "french": "Lien",
    "english": "Link"
  },
  {
    "medumba": "Nə̀ kwul",
    "french": "Lier",
    "english": "Link"
  },
  {
    "medumba": "Nə̀ làlə",
    "french": "Lier",
    "english": "Link"
  },
  {
    "medumba": "Nə̀ tàŋ",
    "french": "Lier",
    "english": "Link"
  },
  {
    "medumba": "Dʉꞌ",
    "french": "Lieu",
    "english": "Location"
  },
  {
    "medumba": "Dʉ̌ꞌzìꞌ",
    "french": "Lieu d’apprantissage",
    "english": "Learning place"
  },
  {
    "medumba": "Dʉ̌ꞌbeb",
    "french": "Lieu d’attente",
    "english": "Waiting place"
  },
  {
    "medumba": "Dʉ̌ꞌjuα",
    "french": "Lieu de fête",
    "english": "Party location"
  },
  {
    "medumba": "Dʉ̌ꞌkàꞌ",
    "french": "Lieu de rendez-vous",
    "english": "Meeting place"
  },
  {
    "medumba": "Nka",
    "french": "Ligne",
    "english": "Line"
  },
  {
    "medumba": "Ndʉ",
    "french": "Limite",
    "english": "Limit"
  },
  {
    "medumba": "Nə̀ tə ndʉ",
    "french": "Limiter",
    "english": "Limit"
  },
  {
    "medumba": "Kə̀bɛ̀n",
    "french": "Limpide",
    "english": "Clear"
  },
  {
    "medumba": "Nə̀lαn",
    "french": "Limpide",
    "english": "Clear"
  },
  {
    "medumba": "Ngwα̌yid",
    "french": "Lion",
    "english": "Leo"
  },
  {
    "medumba": "Nyαmkə̀màꞌ",
    "french": "Lion",
    "english": "Leo"
  },
  {
    "medumba": "Ntə̌ntsə",
    "french": "Liquide",
    "english": "Liquid"
  },
  {
    "medumba": "Nə̀ siaŋə",
    "french": "Lire",
    "english": "Read"
  },
  {
    "medumba": "Kun",
    "french": "Lit",
    "english": "Bed"
  },
  {
    "medumba": "Làkunndα",
    "french": "Lit (dessous)",
    "english": "Bed (underneath)"
  },
  {
    "medumba": "Kòŋntsə",
    "french": "Lit d’eau",
    "english": "Water bed"
  },
  {
    "medumba": "Nsintsə",
    "french": "Lit d’eau",
    "english": "Water bed"
  },
  {
    "medumba": "Cûkun",
    "french": "Literie",
    "english": "Bedding"
  },
  {
    "medumba": "Buꞌŋwàꞌnì",
    "french": "Livre",
    "english": "Book"
  },
  {
    "medumba": "Buꞌŋwàꞌnicɔ̀ (1/6",
    "french": "Livre (de contre)",
    "english": "Book (against)"
  },
  {
    "medumba": "Buꞌŋwàꞌninkʉd (5/4",
    "french": "Livre (de proverbes)",
    "english": "Book (of proverbs)"
  },
  {
    "medumba": "Nə̀ swɛ̀n",
    "french": "Livrer",
    "english": "Deliver"
  },
  {
    "medumba": "Nə̀ fα",
    "french": "Livrer",
    "english": "Deliver"
  },
  {
    "medumba": "Kὰn",
    "french": "Loi",
    "english": "Law"
  },
  {
    "medumba": "Ncʉꞌ",
    "french": "Loi",
    "english": "Law"
  },
  {
    "medumba": "Nə̀sὰ",
    "french": "Loin",
    "english": "Far away"
  },
  {
    "medumba": "Ngʉanə̀sὰ",
    "french": "Loin",
    "english": "Far away"
  },
  {
    "medumba": "Nə̀sàgə",
    "french": "Long",
    "english": "Long"
  },
  {
    "medumba": "Nsὰ",
    "french": "Long",
    "english": "Long"
  },
  {
    "medumba": "Nə̀sàgə",
    "french": "Longueur",
    "english": "Length"
  },
  {
    "medumba": "Tsə̂bàꞌ",
    "french": "Lot (à batir)",
    "english": "Lot (to be built)"
  },
  {
    "medumba": "Ghamtə̀",
    "french": "Louange",
    "english": "Praise"
  },
  {
    "medumba": "Nə̀ ghamte",
    "french": "Louer",
    "english": "Rent"
  },
  {
    "medumba": "Nə̀ cwiꞌi",
    "french": "Louer(location)",
    "english": "Rent (rental)"
  },
  {
    "medumba": "Swəncù",
    "french": "Loup",
    "english": "Wolf"
  },
  {
    "medumba": "Nə̀lɛ̀lə",
    "french": "Lourd",
    "english": "Heavy"
  },
  {
    "medumba": "Lɛ̀dwud",
    "french": "Lourdeur",
    "english": "Heaviness"
  },
  {
    "medumba": "Məsěkàꞌ",
    "french": "Lueur",
    "english": "Glow"
  },
  {
    "medumba": "Nə̀ kèꞌe",
    "french": "Luire",
    "english": "Glow"
  },
  {
    "medumba": "Nə̀kèꞌe",
    "french": "Luisant",
    "english": "Glowing"
  },
  {
    "medumba": "Nkàꞌ",
    "french": "Lumière",
    "english": "Light"
  },
  {
    "medumba": "Nkàꞌlα̂gmyàm",
    "french": "Lumière (du soleil)",
    "english": "Light (of the sun)"
  },
  {
    "medumba": "Nə̀sɛ̂nmbwogə (3/6",
    "french": "Lumignon",
    "english": "Candle"
  },
  {
    "medumba": "Mαŋwʉ",
    "french": "Lune",
    "english": "Moon"
  },
  {
    "medumba": "Zwə̀ꞌ",
    "french": "Lutte",
    "english": "Wrestling"
  },
  {
    "medumba": "Diaŋzwə̀",
    "french": "Lutte (compe̍tition)",
    "english": "Wrestling (competition)"
  },
  {
    "medumba": "Nə̀ zwə̌ zwəꞌ",
    "french": "Lutter",
    "english": "Fight"
  },
  {
    "medumba": "Ngàzwə̌zwə̀ꞌ",
    "french": "Lutteur",
    "english": "Wrestler"
  },
  {
    "medumba": "Nzwə̀zwə̀ꞌ",
    "french": "Lutteur",
    "english": "Wrestler"
  },
  {
    "medumba": "Ngʉa",
    "french": "Luxe",
    "english": "Luxury"
  },
  {
    "medumba": "Jûngʉa",
    "french": "Luxe",
    "english": "Luxury"
  },
  {
    "medumba": "Jûngʉa",
    "french": "Luxueux",
    "english": "Luxurious"
  },
  {
    "medumba": "Dʉ̌ꞌŋwàꞌni tɛ̀dkʉlə",
    "french": "Lyce̍e",
    "english": "High school"
  },
  {
    "medumba": "Kûꞌkà",
    "french": "Macabo",
    "english": "Macabo"
  },
  {
    "medumba": "Lòŋ",
    "french": "Machine",
    "english": "Machine"
  },
  {
    "medumba": "Ntαg",
    "french": "Mâchoire",
    "english": "Jaw"
  },
  {
    "medumba": "Mα",
    "french": "Madame",
    "english": "Madam"
  },
  {
    "medumba": "Məko",
    "french": "Mademoiselle",
    "english": "Miss"
  },
  {
    "medumba": "Fəꞌ",
    "french": "Magasin",
    "english": "Store"
  },
  {
    "medumba": "Ngàkà",
    "french": "Magicien",
    "english": "Magician"
  },
  {
    "medumba": "Kà",
    "french": "Magie",
    "english": "Magic"
  },
  {
    "medumba": "Jûkà",
    "french": "Magique",
    "english": "Magic"
  },
  {
    "medumba": "Njʉàfoŋ",
    "french": "Magne̍tophone",
    "english": "Tape recorder"
  },
  {
    "medumba": "Nə̀ jum",
    "french": "Maigrir",
    "english": "Lose weight"
  },
  {
    "medumba": "Bu",
    "french": "Main",
    "english": "Hand"
  },
  {
    "medumba": "Bûfàꞌ",
    "french": "Main d’oeuvre",
    "english": "Labor"
  },
  {
    "medumba": "Nkα̂bfàꞌ",
    "french": "Main d’oeuvre",
    "english": "Labor"
  },
  {
    "medumba": "Ncoꞌfàꞌ",
    "french": "Main d’oeuvre",
    "english": "Labor"
  },
  {
    "medumba": "Ndɔ̌nnî",
    "french": "Maintenant",
    "english": "Now"
  },
  {
    "medumba": "Baꞌ",
    "french": "Maison",
    "english": "House"
  },
  {
    "medumba": "Ndα",
    "french": "Maison",
    "english": "House"
  },
  {
    "medumba": "Tunndα",
    "french": "Maison",
    "english": "House"
  },
  {
    "medumba": "Dʉ̌ꞌfoŋ",
    "french": "Maison (de radio)",
    "english": "House (of radio)"
  },
  {
    "medumba": "Ndα̂foŋ",
    "french": "Maison (de radio)",
    "english": "House (of radio)"
  },
  {
    "medumba": "Ndα̂nsàfoŋ",
    "french": "Maison (de radio )",
    "english": "House (of radio)"
  },
  {
    "medumba": "Ndα̂kwαn",
    "french": "Maison (de̍portation",
    "english": "House (deportation"
  },
  {
    "medumba": "Ngə̀fələ",
    "french": "Maïs",
    "english": "Corn"
  },
  {
    "medumba": "Ngàtswìtə̀",
    "french": "Maître",
    "english": "Master"
  },
  {
    "medumba": "Tα",
    "french": "Maître",
    "english": "Master"
  },
  {
    "medumba": "Tα̂ndα",
    "french": "Maître (maison)",
    "english": "Master (house)"
  },
  {
    "medumba": "Mα̂fàꞌ",
    "french": "Maîtresse",
    "english": "Mistress"
  },
  {
    "medumba": "Mαndα",
    "french": "Maîtresse",
    "english": "Mistress"
  },
  {
    "medumba": "Mɛ̀nnzwîndα",
    "french": "Maîtresse",
    "english": "Mistress"
  },
  {
    "medumba": "Nsὰhntubu",
    "french": "Majeur (doigt)",
    "english": "Middle finger (finger)"
  },
  {
    "medumba": "Nə̀kùꞌu",
    "french": "Majeur",
    "english": "Major"
  },
  {
    "medumba": "Nə̀kǔꞌntse",
    "french": "Majorite̍",
    "english": "Majority"
  },
  {
    "medumba": "Bèn yαmə",
    "french": "Majorite̍",
    "english": "Majority"
  },
  {
    "medumba": "Kə̀bwɔ̀",
    "french": "Mal",
    "english": "Evil"
  },
  {
    "medumba": "Ngə̀",
    "french": "Mal",
    "english": "Evil"
  },
  {
    "medumba": "Nə nywìlə",
    "french": "Mal(de̍guise̍ en bien",
    "english": "Evil (disguised as good)"
  },
  {
    "medumba": "Nə̀ ghʉ̌ ngeꞌ",
    "french": "Mal (faire du)",
    "english": "Hurt (do)"
  },
  {
    "medumba": "Nə̀ ka ngəꞌ",
    "french": "Mal (faire du)",
    "english": "Hurt (do)"
  },
  {
    "medumba": "Nə̀ yab ngəꞌ",
    "french": "Mal (faire du)",
    "english": "Hurt (do)"
  },
  {
    "medumba": "Nə̀ nywìlə",
    "french": "Mal (parler de qqn)",
    "english": "Evil (talking about someone)"
  },
  {
    "medumba": "Nùkə̀bwɔ̀",
    "french": "Mal (quelque chose",
    "english": "Bad (something"
  },
  {
    "medumba": "Ngàngòkɛd",
    "french": "Malade",
    "english": "Sick"
  },
  {
    "medumba": "Ngòkɛd",
    "french": "Maladie",
    "english": "Disease"
  },
  {
    "medumba": "Ngòkɛd kə̀yàtə̀",
    "french": "Maladie chronique",
    "english": "Chronic illness"
  },
  {
    "medumba": "Nə̀ tebtə",
    "french": "Malaxer",
    "english": "Mix"
  },
  {
    "medumba": "Len",
    "french": "Malchance",
    "english": "Bad luck"
  },
  {
    "medumba": "Ngàlen",
    "french": "Malchanceux",
    "english": "Unlucky"
  },
  {
    "medumba": "Ndu",
    "french": "Mâle",
    "english": "Male"
  },
  {
    "medumba": "Fod",
    "french": "Mâle (animaux)",
    "english": "Male (animals)"
  },
  {
    "medumba": "Kʉꞌ",
    "french": "Mâle (oiseaux)",
    "english": "Male (birds)"
  },
  {
    "medumba": "Bα̂glinə",
    "french": "Malchance",
    "english": "Bad luck"
  },
  {
    "medumba": "Nə̀ bαglinə",
    "french": "Malchance (avoir la",
    "english": "Bad luck (having"
  },
  {
    "medumba": "Ndon",
    "french": "Male̍diction",
    "english": "Curse"
  },
  {
    "medumba": "Ngàghʉ̌kə̀bwɔ̀",
    "french": "Malfaiteur",
    "english": "Malefactor"
  },
  {
    "medumba": "Ngəꞌ",
    "french": "Malheur",
    "english": "Misfortune"
  },
  {
    "medumba": "Ngàyənngəꞌ",
    "french": "Malheureux",
    "english": "Unhappy"
  },
  {
    "medumba": "Zətə̀",
    "french": "Malice",
    "english": "Malice"
  },
  {
    "medumba": "Ngàzətə̀",
    "french": "Maliciaeux",
    "english": "Malicious"
  },
  {
    "medumba": "Mɛ̀nnkə̀kwɔ̀",
    "french": "Malin",
    "english": "Clever"
  },
  {
    "medumba": "Ngàzətə̀ 1/6",
    "french": "Malin",
    "english": "Clever"
  },
  {
    "medumba": "Nə̀ kα̌gngə'",
    "french": "Maltraiter",
    "english": "Mistreat"
  },
  {
    "medumba": "Nə̀ ghʉ̀dnǐ",
    "french": "Maltraiter",
    "english": "Mistreat"
  },
  {
    "medumba": "Nə̀ coꞌnkukə̀mbαn",
    "french": "Maltraiter",
    "english": "Mistreat"
  },
  {
    "medumba": "Mbʉn",
    "french": "Mamelles",
    "english": "Udders"
  },
  {
    "medumba": "Ngud",
    "french": "Manche",
    "english": "Sleeve"
  },
  {
    "medumba": "Nə̀ jʉ ju",
    "french": "Manger",
    "english": "Eat"
  },
  {
    "medumba": "Nə̀ fɛlə",
    "french": "Manger",
    "english": "Eat"
  },
  {
    "medumba": "Ngàjʉju",
    "french": "Mangeur",
    "english": "Eater"
  },
  {
    "medumba": "Ngànzi",
    "french": "Mangeur",
    "english": "Eater"
  },
  {
    "medumba": "Njʉ̂ju",
    "french": "Mangeur",
    "english": "Eater"
  },
  {
    "medumba": "Màd",
    "french": "Manière",
    "english": "Manner"
  },
  {
    "medumba": "Nə̀ ghòmtə̌",
    "french": "Manière (faire des)",
    "english": "Manner (to do)"
  },
  {
    "medumba": "Ghòmtə̀",
    "french": "Manles",
    "english": "Manles"
  },
  {
    "medumba": "Kὰsαlàꞌ",
    "french": "Manioc",
    "english": "Cassava"
  },
  {
    "medumba": "Sə̀mbʉ̀n",
    "french": "Manioc",
    "english": "Cassava"
  },
  {
    "medumba": "Mαnὰ",
    "french": "Manne",
    "english": "Manna"
  },
  {
    "medumba": "Nə̀ tsǐ",
    "french": "Manquer",
    "english": "Miss"
  },
  {
    "medumba": "Nə̀ bwoŋə",
    "french": "Manquer",
    "english": "Miss"
  },
  {
    "medumba": "Kǔmmbàŋ",
    "french": "Manteau",
    "english": "Coat"
  },
  {
    "medumba": "Fɛ̀n",
    "french": "Maquis",
    "english": "Maquis"
  },
  {
    "medumba": "Zəfɛ̀n",
    "french": "Maquisard",
    "english": "Maquisard"
  },
  {
    "medumba": "Màꞌncǒfɛ̀n",
    "french": "Maquisard",
    "english": "Maquisard"
  },
  {
    "medumba": "Marmɔ̀ (",
    "french": "Marbre",
    "english": "Marble"
  },
  {
    "medumba": "Ngàtantαn",
    "french": "Marchand",
    "english": "Merchant"
  },
  {
    "medumba": "Ntântαnə",
    "french": "Marchand",
    "english": "Merchant"
  },
  {
    "medumba": "Ntâ",
    "french": "Marchand de",
    "english": "Merchant of"
  },
  {
    "medumba": "Nə̀ ta",
    "french": "Marchander",
    "english": "Haggle"
  },
  {
    "medumba": "Nə̀ ta ntαn",
    "french": "Marchander",
    "english": "Haggle"
  },
  {
    "medumba": "Jûntαnə",
    "french": "Marchandise",
    "english": "Merchandise"
  },
  {
    "medumba": "Zìn",
    "french": "Marche",
    "english": "Walk"
  },
  {
    "medumba": "Nə̀bɛ̀ntə̀ tùntùn",
    "french": "Marche arrière",
    "english": "Reverse"
  },
  {
    "medumba": "Ntαnə",
    "french": "Marche̍",
    "english": "Walk"
  },
  {
    "medumba": "Wa",
    "french": "Marche̍ (espace )",
    "english": "Walk (space)"
  },
  {
    "medumba": "Wǎnzwə",
    "french": "Marche̍ de tissu",
    "english": "Fabric walk"
  },
  {
    "medumba": "Kàmnkòꞌ",
    "french": "Marchepied",
    "english": "Footboard"
  },
  {
    "medumba": "Nə̀ zìn",
    "french": "Marcher",
    "english": "Walk"
  },
  {
    "medumba": "Tǎmntsə",
    "french": "Mare d’eau",
    "english": "Pool of water"
  },
  {
    "medumba": "Ndu",
    "french": "Mari",
    "english": "Husband"
  },
  {
    "medumba": "Nândα",
    "french": "Mariage",
    "english": "Wedding"
  },
  {
    "medumba": "Nzwighʉ̀n",
    "french": "Marie̍ (nouvelle)",
    "english": "Marie̍ (new)"
  },
  {
    "medumba": "Nə̀ nandα",
    "french": "Marier (se)",
    "english": "Get married"
  },
  {
    "medumba": "Nə̀ sǒ mɛ̀nnzwi",
    "french": "Marier (se)",
    "english": "Get married"
  },
  {
    "medumba": "Mba",
    "french": "Marmite",
    "english": "Pot"
  },
  {
    "medumba": "Kəkì",
    "french": "Marque",
    "english": "Brand"
  },
  {
    "medumba": "Lɛ̀n",
    "french": "Marque",
    "english": "Brand"
  },
  {
    "medumba": "Nə̀ kìꞌi",
    "french": "Marquer",
    "english": "Mark"
  },
  {
    "medumba": "Mα̂",
    "french": "Marraine (de bap",
    "english": "Godmother (of bap"
  },
  {
    "medumba": "Zwìd",
    "french": "Massue",
    "english": "Club"
  },
  {
    "medumba": "Lə̂kunə",
    "french": "Matelas",
    "english": "Mattresses"
  },
  {
    "medumba": "Ndα̂bwə",
    "french": "Maternite̍",
    "english": "Maternity"
  },
  {
    "medumba": "Ndα̂ mαbwə",
    "french": "Maternite̍",
    "english": "Maternity"
  },
  {
    "medumba": "Nə̀ bə ndα̂bwə",
    "french": "Maternite̍ ( être en)",
    "english": "Motherhood (to be in)"
  },
  {
    "medumba": "Nkə̂bnjʉ",
    "french": "Matin",
    "english": "Morning"
  },
  {
    "medumba": "Mfognjʉ",
    "french": "Matin",
    "english": "Morning"
  },
  {
    "medumba": "Nə̀ naŋndon",
    "french": "Maudire",
    "english": "Curse"
  },
  {
    "medumba": "Nə̀ sǒ ndon",
    "french": "Maudire",
    "english": "Curse"
  },
  {
    "medumba": "Ngàndon",
    "french": "Maudit (e)",
    "english": "Cursed"
  },
  {
    "medumba": "Cʉagkɛ̂dntʉ",
    "french": "Me̍chancete̍",
    "english": "Me̍chancete̍"
  },
  {
    "medumba": "Mɛ̀nkə̀bwɔ̀",
    "french": "Me̍chant",
    "english": "Mean"
  },
  {
    "medumba": "Ngàbαg",
    "french": "Me̍chant",
    "english": "Mean"
  },
  {
    "medumba": "Ngàyabngeꞌ",
    "french": "Me̍chant",
    "english": "Mean"
  },
  {
    "medumba": "Cʉagkɛdntʉmɛ̀n (1/6",
    "french": "Me̍chant",
    "english": "Mean"
  },
  {
    "medumba": "Cʉagntʉmɛ̀n",
    "french": "Me̍chant",
    "english": "Mean"
  },
  {
    "medumba": "Nə̀bilɛ̀n",
    "french": "Me̍connaissable",
    "english": "Unrecognizable"
  },
  {
    "medumba": "Nə̀ sələ",
    "french": "Me̍connaître",
    "english": "Know myself"
  },
  {
    "medumba": "Cʉὰgtə̌ wud",
    "french": "Me̍contentement",
    "english": "Discontent"
  },
  {
    "medumba": "Ndɛ̀nghòn",
    "french": "Me̍decin",
    "english": "Doctor"
  },
  {
    "medumba": "Ncwimghòn",
    "french": "Me̍decin",
    "english": "Doctor"
  },
  {
    "medumba": "Ngànzə̀",
    "french": "Me̍diateur",
    "english": "Mediator"
  },
  {
    "medumba": "Fu",
    "french": "Me̍dicament",
    "english": "Medicine"
  },
  {
    "medumba": "Nə̀ coꞌ",
    "french": "Me̍dire",
    "english": "Tell me"
  },
  {
    "medumba": "Nə̀coꞌ kùd mɛ̀n",
    "french": "Me̍disance",
    "english": "Mediation"
  },
  {
    "medumba": "Nə̀ləꞌtə",
    "french": "Me̍fiance",
    "english": "Distrust"
  },
  {
    "medumba": "Nə̀bαmə",
    "french": "Me̍fiance",
    "english": "Distrust"
  },
  {
    "medumba": "Zətə̀",
    "french": "Me̍fiance",
    "english": "Mistrust"
  },
  {
    "medumba": "Nə̀ ləꞌtə",
    "french": "Me̍fier (se)",
    "english": "Beware (oneself)"
  },
  {
    "medumba": "Nə̀ zətə",
    "french": "Me̍fier (se)",
    "english": "Beware (oneself)"
  },
  {
    "medumba": "Bwətə",
    "french": "Me̍lange",
    "english": "Mixture"
  },
  {
    "medumba": "Bwəntam",
    "french": "Me̍lange",
    "english": "Mixture"
  },
  {
    "medumba": "Tὰbwə̌",
    "french": "Me̍lange",
    "english": "Mixture"
  },
  {
    "medumba": "Nə̀ bwə̌",
    "french": "Mêler",
    "english": "Mix"
  },
  {
    "medumba": "Nə̀ bwə̌̀ꞌtə̌",
    "french": "Menacer",
    "english": "Threaten"
  },
  {
    "medumba": "Nə̀ cobtə",
    "french": "Menacer (parole)",
    "english": "Threaten (speech)"
  },
  {
    "medumba": "Màꞌmbu",
    "french": "Mendiant",
    "english": "Beggar"
  },
  {
    "medumba": "Ngàlonndone",
    "french": "Mendiant",
    "english": "Beggar"
  },
  {
    "medumba": "Ncʉ̀ju",
    "french": "Mendiant",
    "english": "Beggar"
  },
  {
    "medumba": "Nə̀mǎꞌmbu",
    "french": "Mendicite̍",
    "english": "Beg"
  },
  {
    "medumba": "Cʉ̀ju",
    "french": "Mendicite̍",
    "english": "Beg"
  },
  {
    "medumba": "N ə̀ mǎꞌmbu",
    "french": "Mendier",
    "english": "Beg"
  },
  {
    "medumba": "Tadtə̀",
    "french": "Mensonge",
    "english": "Lie"
  },
  {
    "medumba": "Nə̀ tadtə",
    "french": "Mensonge (dire)",
    "english": "Lie (tell)"
  },
  {
    "medumba": "Nə̀ cob tadtə̀",
    "french": "Mensonge (dire)",
    "english": "Lie (tell)"
  },
  {
    "medumba": "Ngatàdtə",
    "french": "Menteur",
    "english": "Liar"
  },
  {
    "medumba": "Nə̀ Tadtə",
    "french": "Mentir",
    "english": "Lying"
  },
  {
    "medumba": "Tǔnncù",
    "french": "Menton",
    "english": "Chin"
  },
  {
    "medumba": "Wag",
    "french": "Me̍pris",
    "english": "Scorned"
  },
  {
    "medumba": "Nə̀ wagə",
    "french": "Me̍priser",
    "english": "Despise"
  },
  {
    "medumba": "Dibαntsə",
    "french": "Mer",
    "english": "Sea"
  },
  {
    "medumba": "Tɛ̀dntə",
    "french": "Mer (milieu, large)",
    "english": "Sea (middle, wide)"
  },
  {
    "medumba": "Mα",
    "french": "Mère",
    "english": "Mother"
  },
  {
    "medumba": "Mαkwiꞌ",
    "french": "Mère de l’epouse",
    "english": "Mother of the bride"
  },
  {
    "medumba": "Mαntsə",
    "french": "Mère del’epouse",
    "english": "Mother of the bride"
  },
  {
    "medumba": "Mα̂ntuꞌkam",
    "french": "Mère du 1er fills du roi",
    "english": "Mother of the king's 1st daughter"
  },
  {
    "medumba": "Mα̂bǒꞌkam",
    "french": "Mère du 2e fils du roi",
    "english": "Mother of the king's 2nd son"
  },
  {
    "medumba": "Mα̂mdu",
    "french": "Mère du mari",
    "english": "Husband's mother"
  },
  {
    "medumba": "Mα̂fə̀n",
    "french": "Mère du roi",
    "english": "mother of the king"
  },
  {
    "medumba": "Nkʉ̀n",
    "french": "Message",
    "english": "Message"
  },
  {
    "medumba": "Ngàntum",
    "french": "Messager",
    "english": "Messenger"
  },
  {
    "medumba": "Ngàtswǐnkʉ̀n",
    "french": "Messager",
    "english": "Messenger"
  },
  {
    "medumba": "Ntswìnkʉ̀n",
    "french": "Messager",
    "english": "Messenger"
  },
  {
    "medumba": "Mfiꞌ",
    "french": "Mesure",
    "english": "Measurement"
  },
  {
    "medumba": "Nə̀ fiꞌi",
    "french": "Mesurer",
    "english": "Measure"
  },
  {
    "medumba": "Nə̀kaŋə",
    "french": "Me̍tamorphose",
    "english": "Metamorphosis"
  },
  {
    "medumba": "Nəfèlə",
    "french": "Me̍tamorphose",
    "english": "Metamorphosis"
  },
  {
    "medumba": "Nə̀ kaŋə",
    "french": "Me̍tamorphoser",
    "english": "Metamorphose"
  },
  {
    "medumba": "Nə̀ fə̀lə",
    "french": "Me̍tamorphoser",
    "english": "Metamorphose"
  },
  {
    "medumba": "Maꞌ",
    "french": "Mètre",
    "english": "Meter"
  },
  {
    "medumba": "Nə̀ yαbə",
    "french": "Mèttre",
    "english": "Put"
  },
  {
    "medumba": "Nə̀ tα tʉ",
    "french": "Mettre debout",
    "english": "Stand up"
  },
  {
    "medumba": "Lǒŋkʉὰ",
    "french": "Meule",
    "english": "Grindstone"
  },
  {
    "medumba": "Lǒŋbαn",
    "french": "Meule (moulin)",
    "english": "Grindstone (mill)"
  },
  {
    "medumba": "Nə̀ zwimɛ̀n",
    "french": "Meurtre (commettre)",
    "english": "Murder (commit)"
  },
  {
    "medumba": "Ngàzwimɛ̀n",
    "french": "Meurtrier",
    "english": "Murderer"
  },
  {
    "medumba": "Ngafɛ̀dtə̌ləm",
    "french": "Meurtrier",
    "english": "Murderer"
  },
  {
    "medumba": "Njα̌gnyàm",
    "french": "Midi",
    "english": "Noon"
  },
  {
    "medumba": "Ndʉ̌ŋwaꞌa",
    "french": "Miel",
    "english": "Honey"
  },
  {
    "medumba": "Nsa",
    "french": "Mil",
    "english": "Mil"
  },
  {
    "medumba": "Nə̀tɛ̀d",
    "french": "Milieu",
    "english": "Middle"
  },
  {
    "medumba": "Tɛ̀d",
    "french": "Milieu",
    "english": "Middle"
  },
  {
    "medumba": "Dʉꞌ",
    "french": "Milieu",
    "english": "Middle"
  },
  {
    "medumba": "Ncaꞌ",
    "french": "Mille",
    "english": "Thousand"
  },
  {
    "medumba": "Ncaꞌmbʉm",
    "french": "Mille (monnaie)",
    "english": "Thousand (currency)"
  },
  {
    "medumba": "Càŋtɛ̀dtswəꞌ",
    "french": "Minuit",
    "english": "Midnight"
  },
  {
    "medumba": "Fə̀nyam",
    "french": "Minute",
    "english": "Minute"
  },
  {
    "medumba": "Nsα",
    "french": "Miracle",
    "english": "Miracle"
  },
  {
    "medumba": "Nǔnsα",
    "french": "Miraculeux",
    "english": "Miraculous"
  },
  {
    "medumba": "Jûnsα",
    "french": "Miraculeux",
    "english": "Miraculous"
  },
  {
    "medumba": "Nə̀ yəntə sə",
    "french": "Mirer (se)",
    "english": "Mire (oneself)"
  },
  {
    "medumba": "Yəntə̀sə",
    "french": "Mirioir",
    "english": "Mirror"
  },
  {
    "medumba": "Ngəꞌ",
    "french": "Misère",
    "english": "Misery"
  },
  {
    "medumba": "Kôndɛ̀n",
    "french": "Mise̍ricordieux",
    "english": "Merciful"
  },
  {
    "medumba": "Ngakondɛ̀n",
    "french": "Mise̍ricordieux",
    "english": "Merciful"
  },
  {
    "medumba": "Cαmmbwoŋ",
    "french": "Moelle",
    "english": "Marrow"
  },
  {
    "medumba": "Nzidvogə",
    "french": "Moi",
    "english": "Me"
  },
  {
    "medumba": "Mə̀",
    "french": "Moindre",
    "english": "Lesser"
  },
  {
    "medumba": "Metsid",
    "french": "Moindre",
    "english": "Lesser"
  },
  {
    "medumba": "Mətsill",
    "french": "Mois",
    "english": "Month"
  },
  {
    "medumba": "Ŋwʉ",
    "french": "Moisir",
    "english": "Mold"
  },
  {
    "medumba": "Nə fàmə",
    "french": "Moisissure",
    "english": "Mold"
  },
  {
    "medumba": "Mfam",
    "french": "Moisson",
    "english": "Harvest"
  },
  {
    "medumba": "Ncôꞌcu",
    "french": "Moissonner",
    "english": "Harvest"
  },
  {
    "medumba": "Nə̀ coꞌcu",
    "french": "Moissonneur",
    "english": "Harvester"
  },
  {
    "medumba": "Bàg",
    "french": "Moitie̍",
    "english": "Half"
  },
  {
    "medumba": "Bàgkɛd",
    "french": "Moite̍",
    "english": "Sweaty"
  },
  {
    "medumba": "Kàm",
    "french": "Motie̍",
    "english": "Motie̍"
  },
  {
    "medumba": "Kamkɛ̀d",
    "french": "Motie̍",
    "english": "Motie̍"
  },
  {
    "medumba": "Tàŋkɛd",
    "french": "Moitie̍",
    "english": "Half"
  },
  {
    "medumba": "Njàmkù",
    "french": "Mollet",
    "english": "Calf"
  },
  {
    "medumba": "Fə̌ntɔ̀ngɔ̀",
    "french": "Monarchie",
    "english": "Monarchy"
  },
  {
    "medumba": "Njʉ",
    "french": "Monde",
    "english": "World"
  },
  {
    "medumba": "Njʉ̂nsicaꞌa",
    "french": "Monde",
    "english": "World"
  },
  {
    "medumba": "Nsicaꞌa",
    "french": "Monde",
    "english": "World"
  },
  {
    "medumba": "Njʉ̂sɛ̂nnî",
    "french": "Monde(aujourd’hui)",
    "english": "World (today)"
  },
  {
    "medumba": "Bwôŋbə̀nntʉ̀n",
    "french": "Monde (foule)",
    "english": "World (crowd)"
  },
  {
    "medumba": "Njʉ̂mə̀kelə",
    "french": "Monde (moderne)",
    "english": "World (modern)"
  },
  {
    "medumba": "Tα",
    "french": "Monsieur",
    "english": "Sir"
  },
  {
    "medumba": "Kôngà",
    "french": "Mont",
    "english": "Mount"
  },
  {
    "medumba": "Mbalə",
    "french": "Montagne",
    "english": "Mountain"
  },
  {
    "medumba": "Nə̀ koꞌo",
    "french": "Monter",
    "english": "Go up"
  },
  {
    "medumba": "Nyàm",
    "french": "Montre",
    "english": "Watch"
  },
  {
    "medumba": "Nə̀ làꞌtə̌",
    "french": "Montrer",
    "english": "Show"
  },
  {
    "medumba": "Nə̀ tswǐ",
    "french": "Montrer",
    "english": "Show"
  },
  {
    "medumba": "Jûə̀koꞌo",
    "french": "Monture",
    "english": "Mount"
  },
  {
    "medumba": "Nə̀ cα̌bncù",
    "french": "Moquer (se)",
    "english": "Make fun of"
  },
  {
    "medumba": "Nə̀ tu mɛ̀n",
    "french": "Moquer (se)",
    "english": "Make fun of"
  },
  {
    "medumba": "Cὰbncù",
    "french": "Moquerie",
    "english": "Mockery"
  },
  {
    "medumba": "Ngàcα̌bncù",
    "french": "Moqueur",
    "english": "Mockingbird"
  },
  {
    "medumba": "Ncὰbncù",
    "french": "Moqueur",
    "english": "Mockingbird"
  },
  {
    "medumba": "Kàm",
    "french": "Morceau",
    "english": "Piece"
  },
  {
    "medumba": "Kə̀",
    "french": "Morceau",
    "english": "Piece"
  },
  {
    "medumba": "Tàŋkɛd",
    "french": "Morceau",
    "english": "Piece"
  },
  {
    "medumba": "Məkəꞌ",
    "french": "Morceau (petit)",
    "english": "Piece (small)"
  },
  {
    "medumba": "Nə̀ cogə",
    "french": "Mordre",
    "english": "bite"
  },
  {
    "medumba": "Tʉnncù",
    "french": "Mors",
    "english": "Bit"
  },
  {
    "medumba": "Nə̀kwʉ",
    "french": "Mort",
    "english": "Death"
  },
  {
    "medumba": "Vʉ",
    "french": "Mort (la)",
    "english": "Death (the)"
  },
  {
    "medumba": "Vʉkob",
    "french": "Mort (la)",
    "english": "Death (the)"
  },
  {
    "medumba": "Fə̂mɛ̀n",
    "french": "Mort (un)",
    "english": "Death (one)"
  },
  {
    "medumba": "Vʉ̂fà",
    "french": "Mort accidentel",
    "english": "Accidental death"
  },
  {
    "medumba": "Mbαgmbα̂gwvʉ",
    "french": "Mort subite",
    "english": "Sudden death"
  },
  {
    "medumba": "Lɔ̂ntsəlαg",
    "french": "Morveux",
    "english": "Snotty"
  },
  {
    "medumba": "Tûnù",
    "french": "Motif",
    "english": "Pattern"
  },
  {
    "medumba": "Tûju",
    "french": "Motif",
    "english": "Pattern"
  },
  {
    "medumba": "Mag",
    "french": "Motif",
    "english": "Pattern"
  },
  {
    "medumba": "Nzə̀nzə̀",
    "french": "Mouche",
    "english": "Fly"
  },
  {
    "medumba": "Nə̀ ghòꞌo",
    "french": "Moudre",
    "english": "Grind"
  },
  {
    "medumba": "Ngoꞌbαn",
    "french": "Moulin",
    "english": "Mill"
  },
  {
    "medumba": "Nə̀ kwʉ",
    "french": "Mourir",
    "english": "Die"
  },
  {
    "medumba": "Nə̀ kwʉtə",
    "french": "Mourir nombreux",
    "english": "Many die"
  },
  {
    "medumba": "Mvɛ̀dmvɛ̀d",
    "french": "Moustique",
    "english": "Mosquito"
  },
  {
    "medumba": "Njʉ̀mbwə",
    "french": "Mouton",
    "english": "Sheep"
  },
  {
    "medumba": "Mbàbwwud",
    "french": "Muscle",
    "english": "Muscle"
  },
  {
    "medumba": "Kə̀cob",
    "french": "Muet",
    "english": "Mute"
  },
  {
    "medumba": "Kǔmbàꞌ",
    "french": "Maçon",
    "english": "Mason"
  },
  {
    "medumba": "Nə̀bǎ",
    "french": "Murrir",
    "english": "Murrir"
  },
  {
    "medumba": "Nə̀tswə",
    "french": "Mûr",
    "english": "Ripe"
  },
  {
    "medumba": "Nə̀sɛnə",
    "french": "Noisir",
    "english": "Blacken"
  },
  {
    "medumba": "Nə̀ bǎ",
    "french": "Mûr",
    "english": "Ripe"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Mûrir",
    "english": "Ripen"
  },
  {
    "medumba": "Nə̀ sɛnə",
    "french": "Noisir",
    "english": "Blacken"
  },
  {
    "medumba": "Nə̀ cobtə tûmtɔ",
    "french": "Mûrir",
    "english": "Ripen"
  },
  {
    "medumba": "Nə̀ ywɛdtə tǔntɔ",
    "french": "Murmurer",
    "english": "Whisper"
  },
  {
    "medumba": "Nə̀ kòtə̌",
    "french": "Murmurer",
    "english": "Whisper"
  },
  {
    "medumba": "Nə̀ zimtə",
    "french": "Murmurer",
    "english": "Whisper"
  },
  {
    "medumba": "Mbûꞌloŋə",
    "french": "Murmurer",
    "english": "Whisper"
  },
  {
    "medumba": "Ngabuꞌloŋə",
    "french": "Musicien",
    "english": "Musician"
  },
  {
    "medumba": "Ncùniꞌi",
    "french": "Mutisme",
    "english": "Mutism"
  },
  {
    "medumba": "Ngαmnsi",
    "french": "Mygale",
    "english": "Mygale"
  },
  {
    "medumba": "Ncûꞌncuꞌ",
    "french": "Myriade",
    "english": "Myriad"
  },
  {
    "medumba": "Miro",
    "french": "Myrrhe",
    "english": "Myrrh"
  },
  {
    "medumba": "Nsα",
    "french": "Mystère",
    "english": "Mystery"
  },
  {
    "medumba": "Jûnsα",
    "french": "Myste̍rieux",
    "english": "Mysterious"
  },
  {
    "medumba": "Nǔnsα",
    "french": "Myste̍rieux",
    "english": "Mysterious"
  },
  {
    "medumba": "Nə̀lǎntsə",
    "french": "Nage",
    "english": "Swimming"
  },
  {
    "medumba": "Nə̀ lǎntsə",
    "french": "Nager",
    "english": "Swim"
  },
  {
    "medumba": "Ngàlǎntsə",
    "french": "Nageur",
    "english": "Swimmer"
  },
  {
    "medumba": "Fɛ̌nnsi",
    "french": "Nain",
    "english": "Dwarf"
  },
  {
    "medumba": "Məkàmmɛ̀n",
    "french": "Nain",
    "english": "Dwarf"
  },
  {
    "medumba": "Bwə",
    "french": "Naissance",
    "english": "Birth"
  },
  {
    "medumba": "Mfǎŋŋtsəlαg",
    "french": "Narine",
    "english": "Nostril"
  },
  {
    "medumba": "Nə̀ bwə",
    "french": "Naître",
    "english": "To be born"
  },
  {
    "medumba": "Ca",
    "french": "Natte",
    "english": "Mat"
  },
  {
    "medumba": "Mαtὰ",
    "french": "Natte",
    "english": "Mat"
  },
  {
    "medumba": "Làntsəbàꞌ",
    "french": "Navire",
    "english": "Ship"
  },
  {
    "medumba": "Sitimὰ",
    "french": "Navire",
    "english": "Ship"
  },
  {
    "medumba": "Ncǎncag",
    "french": "Ne̍gligence",
    "english": "Negligence"
  },
  {
    "medumba": "Ncǎncɛ̌gmɛ̀n",
    "french": "Ne̍gligent",
    "english": "Negligent"
  },
  {
    "medumba": "Nga",
    "french": "Nerf",
    "english": "Nerve"
  },
  {
    "medumba": "Mbwə̀ꞌə",
    "french": "Neuf",
    "english": "New"
  },
  {
    "medumba": "Nswə",
    "french": "Neuf",
    "english": "New"
  },
  {
    "medumba": "Mbadtə̀ mbwə̀ꞌə",
    "french": "Neuvième",
    "english": "Ninth"
  },
  {
    "medumba": "Nkɔ̀ntsəlαg",
    "french": "Nez",
    "english": "Nose"
  },
  {
    "medumba": "Ntsəlαg",
    "french": "Nez",
    "english": "Nose"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Nier",
    "english": "Deny"
  },
  {
    "medumba": "Ləbngòn",
    "french": "Noce",
    "english": "Wedding"
  },
  {
    "medumba": "Nândα",
    "french": "Noces",
    "english": "Wedding"
  },
  {
    "medumba": "Ncoŋ",
    "french": "Noeud",
    "english": "Knot"
  },
  {
    "medumba": "Mɛ̀nnə̀sɛn",
    "french": "Noir",
    "english": "Black"
  },
  {
    "medumba": "Nəsɛn",
    "french": "Noir",
    "english": "Black"
  },
  {
    "medumba": "Sɛnnkɛd",
    "french": "Noir",
    "english": "Black"
  },
  {
    "medumba": "Nə̀ ghʉ̀ ju sɛ̀n",
    "french": "Noircir",
    "english": "Blacken"
  },
  {
    "medumba": "Nə̀ kà̀ŋ sɛnə",
    "french": "Noircir",
    "english": "Blacken"
  },
  {
    "medumba": "Mba",
    "french": "Noix",
    "english": "Nuts"
  },
  {
    "medumba": "Lɛn",
    "french": "Nom",
    "english": "Name"
  },
  {
    "medumba": "Kə̀tətùn",
    "french": "Nomade",
    "english": "Nomad"
  },
  {
    "medumba": "Tʉntə̀",
    "french": "Nombre",
    "english": "Number"
  },
  {
    "medumba": "Tɔ̀",
    "french": "Nombril",
    "english": "Navel"
  },
  {
    "medumba": "Nə̀sǒlɛn",
    "french": "Nomination",
    "english": "Appointment"
  },
  {
    "medumba": "Nə̀ twǐ lɛn",
    "french": "Nommer",
    "english": "Name"
  },
  {
    "medumba": "Nə̀ yαb lɛn",
    "french": "Nommer",
    "english": "Name"
  },
  {
    "medumba": "Nə̀ tsiaŋ lɛn",
    "french": "Nommer",
    "english": "Name"
  },
  {
    "medumba": "Nə̀ fαlɛn",
    "french": "Nommer",
    "english": "Name"
  },
  {
    "medumba": "Nga",
    "french": "Non",
    "english": "No"
  },
  {
    "medumba": "Ŋŋ̀",
    "french": "Non",
    "english": "No"
  },
  {
    "medumba": "Nkamə",
    "french": "Notable",
    "english": "Notable"
  },
  {
    "medumba": "Nkɔ̂bà",
    "french": "Note",
    "english": "Note"
  },
  {
    "medumba": "Nə̀ coŋə",
    "french": "Nouer",
    "english": "Tie"
  },
  {
    "medumba": "Nə̀ kemə",
    "french": "Nourrir",
    "english": "Feed"
  },
  {
    "medumba": "Mɛ̂nmbu",
    "french": "Nourrisson",
    "english": "Infant"
  },
  {
    "medumba": "Mɛ̂nfi",
    "french": "Nourrisson",
    "english": "Infant"
  },
  {
    "medumba": "Jûjʉ",
    "french": "Nourriture",
    "english": "Food"
  },
  {
    "medumba": "Caŋ",
    "french": "Nourriture",
    "english": "Food"
  },
  {
    "medumba": "Bαg",
    "french": "Nous",
    "english": "We"
  },
  {
    "medumba": "Bə̀",
    "french": "Nous",
    "english": "We"
  },
  {
    "medumba": "Bὰgαbo",
    "french": "Nous (eux et moi)",
    "english": "We (them and me)"
  },
  {
    "medumba": "Bὰgαbinαbo",
    "french": "Nous (eux vous et moi)",
    "english": "We (them you and me)"
  },
  {
    "medumba": "Njàmtu",
    "french": "Nuque",
    "english": "Neck"
  },
  {
    "medumba": "Bὰgyi",
    "french": "Nous (lui et moi)",
    "english": "We (him and me)"
  },
  {
    "medumba": "Bαgwʉ̀",
    "french": "Nous (toi et moi)",
    "english": "We (you and me)"
  },
  {
    "medumba": "Bὰgαbin",
    "french": "Nous (vous et moi)",
    "english": "We (you and me)"
  },
  {
    "medumba": "Foŋə",
    "french": "Nouvelle",
    "english": "News"
  },
  {
    "medumba": "Nkʉ̀n",
    "french": "Nouvelle",
    "english": "News"
  },
  {
    "medumba": "Cɔ̀",
    "french": "Nouvelle",
    "english": "News"
  },
  {
    "medumba": "Nkʉ̀nmə̀bwɔ",
    "french": "Nouvelle (bonne)",
    "english": "News (good)"
  },
  {
    "medumba": "Ntǒgtùn",
    "french": "Nu",
    "english": "Naked"
  },
  {
    "medumba": "Tùnntog",
    "french": "Nu",
    "english": "Naked"
  },
  {
    "medumba": "Ndod",
    "french": "Nuage",
    "english": "Cloud"
  },
  {
    "medumba": "Nə̀bêntǒgtùn",
    "french": "Nudite̍",
    "english": "Nudity"
  },
  {
    "medumba": "Tswəꞌ",
    "french": "Nuit",
    "english": "Night"
  },
  {
    "medumba": "Tɛ̀dtswəꞌ",
    "french": "Nuit",
    "english": "Night"
  },
  {
    "medumba": "Càŋtɛ̀dtswəꞌ",
    "french": "Nuit (mi)",
    "english": "Night (mid)"
  },
  {
    "medumba": "Njàmtu",
    "french": "Nuque",
    "english": "Neck"
  },
  {
    "medumba": "Bèncə̂n",
    "french": "O hommesi",
    "english": "O meni"
  },
  {
    "medumba": "Ntsəkônkwa",
    "french": "Oasi",
    "english": "Oasi"
  },
  {
    "medumba": "Nə̀ juꞌ ncù",
    "french": "Obe̍ir",
    "english": "Obey"
  },
  {
    "medumba": "Nə̀juꞌ ncù",
    "french": "Obe̍isance",
    "english": "Obedience"
  },
  {
    "medumba": "Jûꞌncù",
    "french": "Obe̍issance",
    "english": "Obedience"
  },
  {
    "medumba": "Ngàjuꞌncù",
    "french": "Obe̍issant",
    "english": "Obedient"
  },
  {
    "medumba": "Ju",
    "french": "Objet",
    "english": "Purpose"
  },
  {
    "medumba": "Jungʉa",
    "french": "Objet de luxe",
    "english": "Luxury item"
  },
  {
    "medumba": "Judiaŋə",
    "french": "Objet de luxe",
    "english": "Luxury item"
  },
  {
    "medumba": "Nukekônkô",
    "french": "Obligation",
    "english": "Obligation"
  },
  {
    "medumba": "Kə̀kɔnkô",
    "french": "Obligation",
    "english": "Obligation"
  },
  {
    "medumba": "Nə nαnə",
    "french": "Obliger",
    "english": "Force"
  },
  {
    "medumba": "Ngwâŋnkʉꞌʉ",
    "french": "Obliquer",
    "english": "Oblique"
  },
  {
    "medumba": "Ngwâŋnkʉꞌʉ",
    "french": "Obliquement",
    "english": "Obliquely"
  },
  {
    "medumba": "Kələꞌə",
    "french": "Obstacle",
    "english": "Obstacle"
  },
  {
    "medumba": "Nə̀ sɛntə",
    "french": "Obscurcir",
    "english": "Obscure"
  },
  {
    "medumba": "Nə̀ tam njamə",
    "french": "Obscurcir",
    "english": "Obscure"
  },
  {
    "medumba": "Njamə",
    "french": "Obscurité",
    "english": "Darkness"
  },
  {
    "medumba": "Kùmnjâmnjamə",
    "french": "Obscurité",
    "english": "Darkness"
  },
  {
    "medumba": "Nə̀ lɔtə",
    "french": "Observer",
    "english": "Observe"
  },
  {
    "medumba": "Nə̀ tə lαg",
    "french": "Observer",
    "english": "Observe"
  },
  {
    "medumba": "Nə̀ zədʉ",
    "french": "Observer longtemps",
    "english": "Observe for a long time"
  },
  {
    "medumba": "Ngàghub",
    "french": "Obstine̍",
    "english": "Obstinate"
  },
  {
    "medumba": "Ngàkutu",
    "french": "Obstiné",
    "english": "Obstinate"
  },
  {
    "medumba": "Mbînyàm",
    "french": "Obstiner ̍(sꞌ)",
    "english": "Obstinate ̍(sꞌ)"
  },
  {
    "medumba": "Dibαntsə",
    "french": "Océan",
    "english": "Ocean"
  },
  {
    "medumba": "Ndǎmju",
    "french": "Odeur",
    "english": "Odor"
  },
  {
    "medumba": "Nsèm",
    "french": "Odeur",
    "english": "Odor"
  },
  {
    "medumba": "Ywɛdju",
    "french": "Odeur",
    "english": "Odor"
  },
  {
    "medumba": "Nəlàmtə̌",
    "french": "Odorant",
    "english": "Odorous"
  },
  {
    "medumba": "Lαg",
    "french": "Œil",
    "english": "Eye"
  },
  {
    "medumba": "ngwàlαg",
    "french": "Œil (clin)",
    "english": "Eye (wink)"
  },
  {
    "medumba": "Sǎlαg",
    "french": "Œil (tale dans)",
    "english": "Eye (tale in)"
  },
  {
    "medumba": "Lα̂g bα̌nbαn",
    "french": "Oeil nu",
    "english": "Naked eye"
  },
  {
    "medumba": "Bum",
    "french": "Oeuf",
    "english": "Egg"
  },
  {
    "medumba": "Fàꞌ",
    "french": "Oeuvre",
    "english": "Work"
  },
  {
    "medumba": "Ncà",
    "french": "Offense",
    "english": "Offense"
  },
  {
    "medumba": "Mfα̌nnù",
    "french": "Offense",
    "english": "Offense"
  },
  {
    "medumba": "Nə̀ diα̌g ncà",
    "french": "Offenser",
    "english": "Offend"
  },
  {
    "medumba": "Nə̀ fα̌nnù",
    "french": "Offenser",
    "english": "Offend"
  },
  {
    "medumba": "Ngàbebndα̂ncà",
    "french": "Offenser de justice",
    "english": "Offend justice"
  },
  {
    "medumba": "Kǎla",
    "french": "Officine",
    "english": "Pharmacy"
  },
  {
    "medumba": "Ndα̂kà",
    "french": "Officine",
    "english": "Pharmacy"
  },
  {
    "medumba": "Fαbwɔ̌ntʉ",
    "french": "Offrande",
    "english": "Offering"
  },
  {
    "medumba": "Jûbwɔ̌ntʉ",
    "french": "Offrande",
    "english": "Offering"
  },
  {
    "medumba": "Nə̀ yoꞌo",
    "french": "Oindre",
    "english": "Anoint"
  },
  {
    "medumba": "Nə̀ bèꞌtə̌",
    "french": "Oindre",
    "english": "Anoint"
  },
  {
    "medumba": "Nə̀ sèꞌe",
    "french": "Oindre",
    "english": "Anoint"
  },
  {
    "medumba": "Saŋə",
    "french": "Oiseau",
    "english": "Bird"
  },
  {
    "medumba": "Tʉmvɛd",
    "french": "Olivier",
    "english": "Olivier"
  },
  {
    "medumba": "Nə̀caŋ̀",
    "french": "Ombre",
    "english": "Shadow"
  },
  {
    "medumba": "Ncuǎꞌnkə̀mbòꞌ",
    "french": "Omoplates",
    "english": "Shoulder blades"
  },
  {
    "medumba": "Bo",
    "french": "On",
    "english": "We"
  },
  {
    "medumba": "Nkib",
    "french": "Ongle",
    "english": "Nail"
  },
  {
    "medumba": "Nkibkù",
    "french": "Ongle de l’orteil",
    "english": "Toenail"
  },
  {
    "medumba": "Nkibbu",
    "french": "Ongle du doigt",
    "english": "Fingernail"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Opposer",
    "english": "Oppose"
  },
  {
    "medumba": "Bàgwuα",
    "french": "Opposition",
    "english": "Opposition"
  },
  {
    "medumba": "Ndʉ̀",
    "french": "Or",
    "english": "Gold"
  },
  {
    "medumba": "Tʉngol",
    "french": "Or",
    "english": "Gold"
  },
  {
    "medumba": "Nə̀tâmbàŋ",
    "french": "Orage",
    "english": "Thunderstorm"
  },
  {
    "medumba": "Nzwə̌ꞌnzwəꞌ",
    "french": "Orageux",
    "english": "Stormy"
  },
  {
    "medumba": "Kǔmbuꞌ",
    "french": "Orchestre",
    "english": "Orchestra"
  },
  {
    "medumba": "Mαndɔ",
    "french": "Orchestre",
    "english": "Orchestra"
  },
  {
    "medumba": "Nènὰ",
    "french": "Ordure",
    "english": "Garbage"
  },
  {
    "medumba": "Nə̀nα̌nsîndα",
    "french": "Ordure",
    "english": "Garbage"
  },
  {
    "medumba": "Toŋ",
    "french": "Oreille",
    "english": "Ear"
  },
  {
    "medumba": "Kʉ̌ꞌkunə",
    "french": "Oreiller",
    "english": "Pillow"
  },
  {
    "medumba": "Sedgheꞌ",
    "french": "Orellons",
    "english": "Orellons"
  },
  {
    "medumba": "Ngàvə̀",
    "french": "Orfèvre",
    "english": "Goldsmith"
  },
  {
    "medumba": "Kôꞌtə̀wud",
    "french": "Orgueille",
    "english": "Pride"
  },
  {
    "medumba": "Ngàkôꞌtəwud",
    "french": "Orguilleux",
    "english": "Proud"
  },
  {
    "medumba": "Ntûmnyàm",
    "french": "Orient",
    "english": "East"
  },
  {
    "medumba": "Bǎgntûmnyàm (",
    "french": "Orient (en)",
    "english": "Orient"
  },
  {
    "medumba": "Mənntse",
    "french": "Orphelin",
    "english": "Orphan"
  },
  {
    "medumba": "Ndα̂bôntse",
    "french": "Orphelinat",
    "english": "Orphanage"
  },
  {
    "medumba": "Ntûkù",
    "french": "Orteil",
    "english": "Toe"
  },
  {
    "medumba": "Mfêꞌkù",
    "french": "Orteil (entre les )",
    "english": "Toe (between)"
  },
  {
    "medumba": "Ntûkù mα̂dùꞌ",
    "french": "Orteil (gros)",
    "english": "Toe (big)"
  },
  {
    "medumba": "Nkêdkù",
    "french": "Orteil (petit)",
    "english": "Toe (small)"
  },
  {
    "medumba": "Nə̀ sɔ̌",
    "french": "Ôter",
    "english": "Remove"
  },
  {
    "medumba": "Voge",
    "french": "Os",
    "english": "Bones"
  },
  {
    "medumba": "Nə̀ bǎb",
    "french": "Oser",
    "english": "Dare"
  },
  {
    "medumba": "Nə̀ bǎb ndʉꞌ",
    "french": "Oser",
    "english": "Dare"
  },
  {
    "medumba": "Nə̀ kə̀mtě",
    "french": "Oser",
    "english": "Dare"
  },
  {
    "medumba": "Nə̀ kutu",
    "french": "Oser",
    "english": "Dare"
  },
  {
    "medumba": "Mvoge",
    "french": "Ossement",
    "english": "Bone"
  },
  {
    "medumba": "Làgtə̀",
    "french": "Oubli",
    "english": "Forgetfulness"
  },
  {
    "medumba": "Nə̀ làgtə̌",
    "french": "Oublier",
    "english": "Forget"
  },
  {
    "medumba": "Mbînyàm",
    "french": "Ouest",
    "english": "West"
  },
  {
    "medumba": "Bǎgmbînyàm",
    "french": "Ouest (à)",
    "english": "West (to)"
  },
  {
    "medumba": "Ŋ̂",
    "french": "Oui",
    "english": "Yes"
  },
  {
    "medumba": "Jûfàꞌ",
    "french": "Outil",
    "english": "Tool"
  },
  {
    "medumba": "Cὰbtə̀",
    "french": "Outrage",
    "english": "Contempt"
  },
  {
    "medumba": "Nə̀ cὰbtə̌",
    "french": "Outrer",
    "english": "Outer"
  },
  {
    "medumba": "Nə̀ghàꞌ ntə ngə",
    "french": "Ouvert",
    "english": "Open"
  },
  {
    "medumba": "Ngə",
    "french": "Ouvert",
    "english": "Open"
  },
  {
    "medumba": "Nə̀ tə ngə",
    "french": "Ouvert(laisser)",
    "english": "Open(leave)"
  },
  {
    "medumba": "Nzə̀",
    "french": "Ouverture",
    "english": "Opening"
  },
  {
    "medumba": "Tɔ",
    "french": "Ouverture",
    "english": "Opening"
  },
  {
    "medumba": "Ngàfàꞌ",
    "french": "Ouvrier",
    "english": "Worker"
  },
  {
    "medumba": "Nə̀ coꞌo",
    "french": "Ouvrir",
    "english": "Open"
  },
  {
    "medumba": "Nə̀ ghaꞌa",
    "french": "Ouvrir",
    "english": "Open"
  },
  {
    "medumba": "Nə̀ ghab ntə ngə",
    "french": "Ouvrir",
    "english": "Open"
  },
  {
    "medumba": "Bǎgŋwàꞌni",
    "french": "Page",
    "english": "Page"
  },
  {
    "medumba": "Nkαbfàꞌ",
    "french": "Paiement",
    "english": "Payment"
  },
  {
    "medumba": "Kə̀lɛ̌nnsi",
    "french": "Païen",
    "english": "Pagan"
  },
  {
    "medumba": "Dʉ̌ꞌnkα̂bfàꞌ",
    "french": "Paierie",
    "english": "Payroll"
  },
  {
    "medumba": "Nyîꞌngà",
    "french": "Paille",
    "english": "Straw"
  },
  {
    "medumba": "Bɛnə",
    "french": "Paille",
    "english": "Straw"
  },
  {
    "medumba": "Ntαb",
    "french": "Paillotte",
    "english": "straw hut"
  },
  {
    "medumba": "Fitə̌mɛ̀n",
    "french": "Paisible",
    "english": "Peaceful"
  },
  {
    "medumba": "Nə̀fitə",
    "french": "Paisible",
    "english": "Peaceful"
  },
  {
    "medumba": "Fitə̀",
    "french": "Paix",
    "english": "Peace"
  },
  {
    "medumba": "Ncà",
    "french": "Palable",
    "english": "Palable"
  },
  {
    "medumba": "Nə̀ saꞌncà",
    "french": "Palabrer",
    "english": "Palaver"
  },
  {
    "medumba": "Ngàsaꞌncà",
    "french": "Palabreur",
    "english": "Palaver"
  },
  {
    "medumba": "Ndα̂ncà",
    "french": "Palais de justice",
    "english": "Courthouse"
  },
  {
    "medumba": "Nzwə̌ꞌnzwəꞌ",
    "french": "Pâle",
    "english": "Pale"
  },
  {
    "medumba": "Câtənə",
    "french": "Palme",
    "english": "Palm"
  },
  {
    "medumba": "Cânkʉα",
    "french": "Palme du raphia",
    "english": "Raffia palm"
  },
  {
    "medumba": "Tənə",
    "french": "Palmier",
    "english": "Palm tree"
  },
  {
    "medumba": "Mba",
    "french": "Palmiste",
    "english": "Palm kernel"
  },
  {
    "medumba": "Ntsì",
    "french": "Panier",
    "english": "Shopping cart"
  },
  {
    "medumba": "Kə̀soŋə",
    "french": "Panier",
    "english": "Shopping cart"
  },
  {
    "medumba": "Cə̌ꞌnkù",
    "french": "Pantalon",
    "english": "Pants"
  },
  {
    "medumba": "Nzwìmα̂ntɔ̀",
    "french": "Panthère",
    "english": "Panther"
  },
  {
    "medumba": "Nzwì",
    "french": "Panthère",
    "english": "Panther"
  },
  {
    "medumba": "Sitimὰ",
    "french": "Paquebot",
    "english": "Liner"
  },
  {
    "medumba": "Buꞌu",
    "french": "Paquet",
    "english": "Package"
  },
  {
    "medumba": "Buꞌmfʉm",
    "french": "Paquet vide",
    "english": "Empty package"
  },
  {
    "medumba": "Ngʉmə (",
    "french": "Parabole",
    "english": "Parable"
  },
  {
    "medumba": "Tα̂nkʉd",
    "french": "Parabole",
    "english": "Parable"
  },
  {
    "medumba": "Nə̀ ŋwàg◌",
    "french": "Paraitre",
    "english": "Appear"
  },
  {
    "medumba": "Beꞌtə̀wud",
    "french": "Paralysie",
    "english": "Paralysis"
  },
  {
    "medumba": "Kə̀kalə",
    "french": "Paralytique",
    "english": "Paralytic"
  },
  {
    "medumba": "Nǔmmbə̂",
    "french": "Parce que",
    "english": "Because"
  },
  {
    "medumba": "Ŋwàꞌ ningùb",
    "french": "Parchemin",
    "english": "Parchment"
  },
  {
    "medumba": "Nzwə̂nùmtʉ",
    "french": "Pardessus",
    "english": "Overcoat"
  },
  {
    "medumba": "Làgtə",
    "french": "Pardon",
    "english": "Sorry"
  },
  {
    "medumba": "Nə̀ làgtə̀ mfα",
    "french": "Pardonner",
    "english": "forgive"
  },
  {
    "medumba": "Ndǎŋndaŋ",
    "french": "Pareil",
    "english": "Same"
  },
  {
    "medumba": "Bə̂ndǎŋndaŋ",
    "french": "Pareillement",
    "english": "Likewise"
  },
  {
    "medumba": "Lɔ",
    "french": "Paresse",
    "english": "Laziness"
  },
  {
    "medumba": "Ywɛnə",
    "french": "Paresse",
    "english": "Laziness"
  },
  {
    "medumba": "Nə̀ lɔ",
    "french": "Paresser",
    "english": "Laze"
  },
  {
    "medumba": "Nə̀ ko ywɛnə",
    "french": "Paresser",
    "english": "Laze"
  },
  {
    "medumba": "Ndɔ",
    "french": "Paresseux",
    "english": "Lazy"
  },
  {
    "medumba": "Ngàlɛ̌dwud",
    "french": "Paresseux",
    "english": "Lazy"
  },
  {
    "medumba": "Ngàywɛnə",
    "french": "Paresseux",
    "english": "Lazy"
  },
  {
    "medumba": "Bwɔ̀niâgtə",
    "french": "Parfait",
    "english": "Perfect"
  },
  {
    "medumba": "Lὰnbindὰ (",
    "french": "Parfun",
    "english": "Perfume"
  },
  {
    "medumba": "Nkwὰ",
    "french": "Pari",
    "english": "Bet"
  },
  {
    "medumba": "Ti",
    "french": "Paria",
    "english": "Outcast"
  },
  {
    "medumba": "Nə̀ fiag nkwὰ",
    "french": "Parier",
    "english": "Bet"
  },
  {
    "medumba": "Mfə",
    "french": "Parjure",
    "english": "Perjury"
  },
  {
    "medumba": "Nə̀ kǎnmfə",
    "french": "Parjurer",
    "english": "Perjure"
  },
  {
    "medumba": "nə̀ cobə",
    "french": "Parler",
    "english": "Talk"
  },
  {
    "medumba": "nə̀ tαgtə nù",
    "french": "Parler à l’oreille",
    "english": "Talking in your ear"
  },
  {
    "medumba": "Nə̀ sǔ ncǔ nsi",
    "french": "Parler en cachette",
    "english": "Talking in secret"
  },
  {
    "medumba": "Nə̀ tsin càm",
    "french": "Parler en secret",
    "english": "Talk in secret"
  },
  {
    "medumba": "Nə̀ tswə̀ꞌtə̌",
    "french": "Parler en insistant",
    "english": "Speak insistently"
  },
  {
    "medumba": "Ncobə",
    "french": "Parole",
    "english": "Word"
  },
  {
    "medumba": "Ncobnsi",
    "french": "Parole de dieu",
    "english": "word of god"
  },
  {
    "medumba": "Ncob kə̀tùn",
    "french": "Parole vaine",
    "english": "Vain word"
  },
  {
    "medumba": "Nzwiaŋtə ncobə",
    "french": "Parole vaine",
    "english": "Vain word"
  },
  {
    "medumba": "Bàg",
    "french": "Part",
    "english": "Share"
  },
  {
    "medumba": "Ghὰbtə̀",
    "french": "Partage",
    "english": "Sharing"
  },
  {
    "medumba": "Nə̀ghὰbtə̌",
    "french": "Partage",
    "english": "Sharing"
  },
  {
    "medumba": "Nə̀ ghὰbtə̌",
    "french": "Partager",
    "english": "Share"
  },
  {
    "medumba": "Nə̀ gὰbtə̌ tɔ̀bu",
    "french": "Partager (de façon discrim)",
    "english": "Share (discriminately)"
  },
  {
    "medumba": "Kum",
    "french": "Parti",
    "english": "Gone"
  },
  {
    "medumba": "Kǔmmfʉngɔ̀",
    "french": "Partie politique",
    "english": "Political part"
  },
  {
    "medumba": "Kǔmnkʉ̂nkʉ",
    "french": "Parti politique",
    "english": "Political party"
  },
  {
    "medumba": "Bàg",
    "french": "Partie",
    "english": "Part"
  },
  {
    "medumba": "Nə̀ nɛ̀ne",
    "french": "Partir",
    "english": "Leave"
  },
  {
    "medumba": "Njǒŋdʉ̀ꞌfa",
    "french": "Partout",
    "english": "Everywhere"
  },
  {
    "medumba": "Bǎgbàg",
    "french": "Part (toutes)",
    "english": "Share (all)"
  },
  {
    "medumba": "Nèŋwàgə",
    "french": "Parution",
    "english": "Publication"
  },
  {
    "medumba": "Nə̀ ncuὰ nkumə",
    "french": "Parvenir",
    "english": "Reach"
  },
  {
    "medumba": "Nə̀ ncʉὰ nco",
    "french": "Parvenir",
    "english": "Reach"
  },
  {
    "medumba": "Ncʉὰnzə̀",
    "french": "Passant",
    "english": "Passerby"
  },
  {
    "medumba": "Nə̀ cʉα̌",
    "french": "Passer",
    "english": "Pass"
  },
  {
    "medumba": "Nə̀ togə",
    "french": "Passer",
    "english": "Pass"
  },
  {
    "medumba": "Nə̀ zwi ngə̀laŋ",
    "french": "Passer du temps",
    "english": "Spend time"
  },
  {
    "medumba": "Togzinə",
    "french": "Passereau",
    "english": "Passerine"
  },
  {
    "medumba": "Bαsitɔ̀",
    "french": "Pasteur",
    "english": "Pastor"
  },
  {
    "medumba": "Ngàbəbmbwə",
    "french": "Pasteur",
    "english": "Pastor"
  },
  {
    "medumba": "Bèlòŋ",
    "french": "Patate",
    "english": "Potato"
  },
  {
    "medumba": "Fɛ̌nntʉ",
    "french": "Patience",
    "english": "Patience"
  },
  {
    "medumba": "Ghǔbntʉ",
    "french": "Patience",
    "english": "Patience"
  },
  {
    "medumba": "Nə̀ fɛntə",
    "french": "Patienter",
    "english": "Wait"
  },
  {
    "medumba": "Nə̀ ghubtə",
    "french": "Patienter",
    "english": "Wait"
  },
  {
    "medumba": "Ngàtengɔ̀",
    "french": "Patriarche",
    "english": "Patriarch"
  },
  {
    "medumba": "Ngɔ̀",
    "french": "Patrie",
    "english": "Homeland"
  },
  {
    "medumba": "Ngɔ̌ bὰmmɛ̀n",
    "french": "Patrie",
    "english": "Homeland"
  },
  {
    "medumba": "Nkwàtənù",
    "french": "Patron",
    "english": "Boss"
  },
  {
    "medumba": "Nə̀ kwàtə̌",
    "french": "Pensée",
    "english": "Thought"
  },
  {
    "medumba": "Ngàkwǎnù",
    "french": "Penser",
    "english": "Think"
  },
  {
    "medumba": "Ngàkwentscùb",
    "french": "Penseur",
    "english": "Thinker"
  },
  {
    "medumba": "Ndα̂ncùb",
    "french": "Percepteur",
    "english": "Collector"
  },
  {
    "medumba": "Nəjuꞌu",
    "french": "Perception",
    "english": "Perception"
  },
  {
    "medumba": "Nə̀ sòbə",
    "french": "Percer",
    "english": "Drill"
  },
  {
    "medumba": "Nə̀ to",
    "french": "Percer",
    "english": "Drill"
  },
  {
    "medumba": "Nə̀bi",
    "french": "Perdition",
    "english": "Perdition"
  },
  {
    "medumba": "Nə̀ bi",
    "french": "Perdre",
    "english": "Lose"
  },
  {
    "medumba": "Nə̀ wuaꞌa",
    "french": "Perdre",
    "english": "Lose"
  },
  {
    "medumba": "Nə̀ vǔ ncà",
    "french": "Perdre procès",
    "english": "Lose court case"
  },
  {
    "medumba": "Saŋngab",
    "french": "Perdrix",
    "english": "Partridge"
  },
  {
    "medumba": "Tα",
    "french": "Père",
    "english": "Father"
  },
  {
    "medumba": "Ntsə",
    "french": "Père (beau)",
    "english": "Father (handsome)"
  },
  {
    "medumba": "Tα̂ndu",
    "french": "Père (beau)",
    "english": "Father (handsome)"
  },
  {
    "medumba": "Tα̂nzwi",
    "french": "Père (beau)",
    "english": "Father (handsome)"
  },
  {
    "medumba": "Ŋuꞌtə̂nù",
    "french": "Perfide",
    "english": "Perfidious"
  },
  {
    "medumba": "Nə̀ kwʉ",
    "french": "Périr",
    "english": "Perish"
  },
  {
    "medumba": "Nə̀ bi",
    "french": "Périr",
    "english": "Perish"
  },
  {
    "medumba": "Ntogntse",
    "french": "Perles",
    "english": "Beads"
  },
  {
    "medumba": "Ncɛ̀n",
    "french": "Perles",
    "english": "Beads"
  },
  {
    "medumba": "Nə̀ ghʉdnǐ mɛ̀n",
    "french": "Persécuter",
    "english": "Persecute"
  },
  {
    "medumba": "nə̀ coꞌnkù kə̀bὰn",
    "french": "Persécuter",
    "english": "Persecute"
  },
  {
    "medumba": "Fɛntə̀",
    "french": "Persévérance",
    "english": "Perseverance"
  },
  {
    "medumba": "Fɛ̌nntʉ",
    "french": "Persévérance",
    "english": "Perseverance"
  },
  {
    "medumba": "Kàgtʉ̀n",
    "french": "Persévérance",
    "english": "Perseverance"
  },
  {
    "medumba": "Nə̀ fɛntə",
    "french": "Persévérer",
    "english": "Persevere"
  },
  {
    "medumba": "Nə̀ cʉbntʉ",
    "french": "Persévérer",
    "english": "Persevere"
  },
  {
    "medumba": "Nə̀ kagtʉ̀n",
    "french": "Persévérer",
    "english": "Persevere"
  },
  {
    "medumba": "Mɛ̀nntʉ̀n",
    "french": "Personne",
    "english": "Nobody"
  },
  {
    "medumba": "Sα̌mmɛ̀n",
    "french": "Personne",
    "english": "Nobody"
  },
  {
    "medumba": "Nsα kʉlə",
    "french": "Personne très instruite",
    "english": "Highly educated person"
  },
  {
    "medumba": "Nə̀lɛ̀lə",
    "french": "Posant",
    "english": "Posing"
  },
  {
    "medumba": "Məcǒg",
    "french": "Petit",
    "english": "Small"
  },
  {
    "medumba": "Metsǐd",
    "french": "Petit",
    "english": "Small"
  },
  {
    "medumba": "Nə̀kagə",
    "french": "Petit",
    "english": "Small"
  },
  {
    "medumba": "Zə̀nkəꞌə",
    "french": "Petit",
    "english": "Small"
  },
  {
    "medumba": "Mɛ̀nnkəꞌə",
    "french": "Petit (en valeur)",
    "english": "Small (in value)"
  },
  {
    "medumba": "Kʉdfoŋə",
    "french": "Petite antenne radio",
    "english": "Small radio antenna"
  },
  {
    "medumba": "Kʉdngʉαyən",
    "french": "Petit antenne tele",
    "english": "Small TV antenna"
  },
  {
    "medumba": "Kàmmɛ̀n",
    "french": "Petite taille (de)",
    "english": "Small size (of)"
  },
  {
    "medumba": "Ngɔ̀",
    "french": "Peuple",
    "english": "People"
  },
  {
    "medumba": "Ngɔ̀ngɔ̀",
    "french": "Peuple",
    "english": "People"
  },
  {
    "medumba": "Bwog",
    "french": "Peur",
    "english": "Fear"
  },
  {
    "medumba": "Mbwôgtùn",
    "french": "Peureux",
    "english": "Fearful"
  },
  {
    "medumba": "Ngàbwog",
    "french": "Peureux",
    "english": "Fearful"
  },
  {
    "medumba": "Ndα̂ntα̂nmfu",
    "french": "Pharmacie",
    "english": "Pharmacy"
  },
  {
    "medumba": "Ndɛ̀nngα̂mmfu",
    "french": "Pharmacien",
    "english": "Pharmacist"
  },
  {
    "medumba": "Ngàswɛ̌nmfu",
    "french": "Pharmacien",
    "english": "Pharmacist"
  },
  {
    "medumba": "Nswɛnmfu",
    "french": "Pharmacien",
    "english": "Pharmacist"
  },
  {
    "medumba": "Cammbwoŋə",
    "french": "Philanthrope",
    "english": "Philanthropist"
  },
  {
    "medumba": "Kǔncobə",
    "french": "Phrase",
    "english": "Sentence"
  },
  {
    "medumba": "Caꞌtɔ̀ngɔ̀",
    "french": "Physiocratie",
    "english": "Physiocracy"
  },
  {
    "medumba": "Sə",
    "french": "Physionomie",
    "english": "Physiognomy"
  },
  {
    "medumba": "kǎmŋwàꞌnì",
    "french": "Pièce d’un dossier",
    "english": "Part of a file"
  },
  {
    "medumba": "Kɔ̂nkαb",
    "french": "Pièce d’arrgent",
    "english": "Silver coin"
  },
  {
    "medumba": "Nə̀ bʉ̌n ywì",
    "french": "Pie̍ger",
    "english": "Trap"
  },
  {
    "medumba": "Kù",
    "french": "Pied",
    "english": "Foot"
  },
  {
    "medumba": "Tùn",
    "french": "Pied",
    "english": "Foot"
  },
  {
    "medumba": "Ywìꞌ",
    "french": "Piège",
    "english": "Trap"
  },
  {
    "medumba": "Lòŋ",
    "french": "Pierre",
    "english": "Peter"
  },
  {
    "medumba": "Lǒŋfaꞌtə̀",
    "french": "Pierre d’achopement",
    "english": "Stumbling block"
  },
  {
    "medumba": "Ndòŋtânjòŋ",
    "french": "Pierres pre̍cieuses",
    "english": "Precious stones"
  },
  {
    "medumba": "Nə̀ tὰbtə nkù",
    "french": "Pie̍tiner",
    "english": "Stomp"
  },
  {
    "medumba": "Nə̀ nyàŋtə̀ nkù",
    "french": "Pie̍tiner",
    "english": "Stomp"
  },
  {
    "medumba": "Kə̀ŋuꞌu",
    "french": "Pieux",
    "english": "Piles"
  },
  {
    "medumba": "Ngàbwognsi",
    "french": "Pieux",
    "english": "Piles"
  },
  {
    "medumba": "bwòŋsaŋə",
    "french": "Pigeon",
    "english": "Pigeon"
  },
  {
    "medumba": "Ngàsoŋ",
    "french": "Pilote",
    "english": "Pilot"
  },
  {
    "medumba": "Ngàcàgtə̀",
    "french": "Pilote",
    "english": "Pilot"
  },
  {
    "medumba": "Sàto",
    "french": "Piment",
    "english": "Chili pepper"
  },
  {
    "medumba": "Sogə",
    "french": "Piment",
    "english": "Chili pepper"
  },
  {
    "medumba": "Tâmcɛd",
    "french": "Ping pong",
    "english": "Ping pong"
  },
  {
    "medumba": "Kənu",
    "french": "Pirogue",
    "english": "Canoe"
  },
  {
    "medumba": "Ngàsǒŋkə̀nu",
    "french": "Piroguier",
    "english": "Canoeist"
  },
  {
    "medumba": "Nzoꞌ",
    "french": "Pistache",
    "english": "Pistachio"
  },
  {
    "medumba": "Kôndɛ̀n",
    "french": "Pitie̍",
    "english": "Pity"
  },
  {
    "medumba": "Ndɛ̀n",
    "french": "Pitie̍",
    "english": "Pity"
  },
  {
    "medumba": "Ndɛ̌nnko",
    "french": "Pitie̍",
    "english": "Pity"
  },
  {
    "medumba": "Nə̀ kondɛ̀n",
    "french": "Pitie̍ (avoir )",
    "english": "Pity (to have)"
  },
  {
    "medumba": "Dʉ",
    "french": "Place",
    "english": "Square"
  },
  {
    "medumba": "Nsem",
    "french": "Place publique",
    "english": "Public square"
  },
  {
    "medumba": "Kekoꞌo",
    "french": "Plaie",
    "english": "Wound"
  },
  {
    "medumba": "Lèkètè",
    "french": "Plaine",
    "english": "Plain"
  },
  {
    "medumba": "Nə̀ bwɔ̌",
    "french": "Plaire",
    "english": "Please"
  },
  {
    "medumba": "Nə̀ kǒmzwì",
    "french": "Plaisanter",
    "english": "Joking"
  },
  {
    "medumba": "Fiǎŋsoŋə",
    "french": "Plaisanterie",
    "english": "Joke"
  },
  {
    "medumba": "Mfìꞌ",
    "french": "Plan",
    "english": "Map"
  },
  {
    "medumba": "Nsîndα",
    "french": "Plancher",
    "english": "Floor"
  },
  {
    "medumba": "Tɛ̌dndα",
    "french": "Plancher",
    "english": "Floor"
  },
  {
    "medumba": "Nə̀, siaŋtə nù nǔm",
    "french": "Plancher sur",
    "english": "Floor on"
  },
  {
    "medumba": "Mbwə̌jum",
    "french": "Plant",
    "english": "plant"
  },
  {
    "medumba": "Nzwìdju",
    "french": "Plant",
    "english": "plant"
  },
  {
    "medumba": "Kə̀lɔntʉ̀n",
    "french": "Plantain",
    "english": "Plantain"
  },
  {
    "medumba": "Nzwǐntʉ",
    "french": "Plante (jeune)",
    "english": "Plant (young)"
  },
  {
    "medumba": "Bǎnkù",
    "french": "Plante du pied",
    "english": "Sole of the foot"
  },
  {
    "medumba": "Nzə̌nyì",
    "french": "Plante (d’hysope)",
    "english": "Plant (hyssop)"
  },
  {
    "medumba": "Nə̀ ywìlə",
    "french": "Planter",
    "english": "Plant"
  },
  {
    "medumba": "Nə̀ bwə̌",
    "french": "Planter",
    "english": "Plant"
  },
  {
    "medumba": "Nə̀ jαgə",
    "french": "Planter",
    "english": "Plant"
  },
  {
    "medumba": "Ka",
    "french": "Plat",
    "english": "Dish"
  },
  {
    "medumba": "Nə̀vʉ̌",
    "french": "Plat",
    "english": "Dish"
  },
  {
    "medumba": "Nə̀nɔ̌nsi",
    "french": "Plat",
    "english": "Dish"
  },
  {
    "medumba": "Kôngàkəꞌə",
    "french": "Plateau",
    "english": "Tray"
  },
  {
    "medumba": "Məkôngà",
    "french": "Plateau",
    "english": "Tray"
  },
  {
    "medumba": "Ndunə",
    "french": "Plein",
    "english": "Full"
  },
  {
    "medumba": "Nə̀dunə",
    "french": "Plénitude",
    "english": "Fullness"
  },
  {
    "medumba": "Kunì",
    "french": "Plénitude",
    "english": "Fullness"
  },
  {
    "medumba": "Nə̀kwaꞌa",
    "french": "Pleur",
    "english": "Cry"
  },
  {
    "medumba": "Nə̀ kwaꞌa",
    "french": "Pleurer",
    "english": "Cry"
  },
  {
    "medumba": "Nə̀ lὰnə",
    "french": "Pleurer",
    "english": "Cry"
  },
  {
    "medumba": "Lα̌nnyα",
    "french": "Pleureur",
    "english": "Weeper"
  },
  {
    "medumba": "Nə̀ lo",
    "french": "Pleuvoir",
    "english": "Rain"
  },
  {
    "medumba": "Nə̀ bǎmntsə",
    "french": "Plonger",
    "english": "Dive"
  },
  {
    "medumba": "Nə̀ nyuꞌntsə",
    "french": "Plonger",
    "english": "Dive"
  },
  {
    "medumba": "Nə̀ bi làm",
    "french": "Plonger",
    "english": "Dive"
  },
  {
    "medumba": "Mbàŋ",
    "french": "Pluie",
    "english": "Rain"
  },
  {
    "medumba": "Ndʉ̌sαnə",
    "french": "Pluie (saison)",
    "english": "Rain (season)"
  },
  {
    "medumba": "Kʉdŋwàꞌni",
    "french": "Plume",
    "english": "Feather"
  },
  {
    "medumba": "Fə",
    "french": "Plume (s)",
    "english": "Feather(s)"
  },
  {
    "medumba": "MVƏ̀Ꞌ",
    "french": "Poche",
    "english": "Pocket"
  },
  {
    "medumba": "Tôꞌbὰm",
    "french": "Poche",
    "english": "Pocket"
  },
  {
    "medumba": "Ndɛ̀nkʉlə",
    "french": "Poète",
    "english": "Poet"
  },
  {
    "medumba": "Lɛd",
    "french": "Poids",
    "english": "Weight"
  },
  {
    "medumba": "Ntòbi",
    "french": "Poignard",
    "english": "Dagger"
  },
  {
    "medumba": "Nsὰbi",
    "french": "Poignard",
    "english": "Dagger"
  },
  {
    "medumba": "Nə̀ sòbə",
    "french": "Poignarder",
    "english": "Stabbing"
  },
  {
    "medumba": "Bu",
    "french": "Poigne̍e",
    "english": "Handle"
  },
  {
    "medumba": "Ndâŋbu (",
    "french": "Poignet",
    "english": "Wrist"
  },
  {
    "medumba": "Nyaŋ",
    "french": "Poil",
    "english": "Hair"
  },
  {
    "medumba": "Nyaŋnyaŋ",
    "french": "Poilu",
    "english": "Hairy"
  },
  {
    "medumba": "Tsinə",
    "french": "Point (.)",
    "english": "Period (.)"
  },
  {
    "medumba": "Lα̂gntsə",
    "french": "Point d’eau",
    "english": "Water point"
  },
  {
    "medumba": "Tsin ncαmə",
    "french": "Point d’exclamation",
    "english": "Exclamation point"
  },
  {
    "medumba": "Tsin mbɛdtə",
    "french": "Point d’interrogation",
    "english": "Question mark"
  },
  {
    "medumba": "Mbumtə̀",
    "french": "Point d’intersection",
    "english": "Intersection point"
  },
  {
    "medumba": "Tsin mfaŋə",
    "french": "Point de supension",
    "english": "Suspension point"
  },
  {
    "medumba": "Tsinyoŋ ncʉꞌ",
    "french": "Point final",
    "english": "Full stop"
  },
  {
    "medumba": "Kʉdfi",
    "french": "Pointe à bille",
    "english": "Ball point"
  },
  {
    "medumba": "Kʉ̀lə",
    "french": "Pointe à e̍crire",
    "english": "Writing point"
  },
  {
    "medumba": "Kʉdŋwàꞌni",
    "french": "Pointe à e̍crire",
    "english": "Writing point"
  },
  {
    "medumba": "Tsin tʉntə",
    "french": "Points (:) (deux)",
    "english": "Periods (:) (two)"
  },
  {
    "medumba": "Nə̀betə",
    "french": "Pointu",
    "english": "Pointed"
  },
  {
    "medumba": "Tsin zwiagə (",
    "french": "Point-virgule (;)",
    "english": "Semicolon (;)"
  },
  {
    "medumba": "Còŋ",
    "french": "Poire",
    "english": "Pear"
  },
  {
    "medumba": "Cə̀b",
    "french": "Poison",
    "english": "Poison"
  },
  {
    "medumba": "Ngǒntsə",
    "french": "Poisson",
    "english": "Fish"
  },
  {
    "medumba": "Mbʉ̀m",
    "french": "Poitrine",
    "english": "Chest"
  },
  {
    "medumba": "Ndα̂ntʉ",
    "french": "Poitrine",
    "english": "Chest"
  },
  {
    "medumba": "Mfʉὰgncù",
    "french": "Poli",
    "english": "Polished"
  },
  {
    "medumba": "Ngàfʉα̌gncu",
    "french": "Poli",
    "english": "Polished"
  },
  {
    "medumba": "Ngàyǎncù",
    "french": "Poli",
    "english": "Polished"
  },
  {
    "medumba": "Njàncù",
    "french": "Poli",
    "english": "Polished"
  },
  {
    "medumba": "Fʉὰgncù (",
    "french": "Politesse",
    "english": "Politeness"
  },
  {
    "medumba": "Ngànkʉ̂nkʉ",
    "french": "Politicien",
    "english": "Politician"
  },
  {
    "medumba": "Nkʉ̂nkʉ",
    "french": "Politique",
    "english": "Politics"
  },
  {
    "medumba": "Mfʉ",
    "french": "Politique",
    "english": "Politics"
  },
  {
    "medumba": "Nǔngɔ̀",
    "french": "Politique",
    "english": "Politics"
  },
  {
    "medumba": "Nə̀ maꞌa",
    "french": "Pondre (oeuf)",
    "english": "Lay (egg)"
  },
  {
    "medumba": "Nkǒꞌntsə",
    "french": "Pont",
    "english": "Bridge"
  },
  {
    "medumba": "Ngɔ̀",
    "french": "Population",
    "english": "Population"
  },
  {
    "medumba": "Bə̀nntʉ̀n",
    "french": "Population",
    "english": "Population"
  },
  {
    "medumba": "Ngʉ̌nyὰm",
    "french": "Porc",
    "english": "Pork"
  },
  {
    "medumba": "Nkaꞌngʉ̌nyὰm",
    "french": "Porcherie",
    "english": "Pigsty"
  },
  {
    "medumba": "Ncùntsə (",
    "french": "Port",
    "english": "Port"
  },
  {
    "medumba": "Nzə̀ndα",
    "french": "Porte",
    "english": "Door"
  },
  {
    "medumba": "Mvvə̀ꞌnkαb",
    "french": "Porte-monnale",
    "english": "Wallet"
  },
  {
    "medumba": "Nə̀ kə̀lə",
    "french": "Porter",
    "english": "Carry"
  },
  {
    "medumba": "Nə̀ ŋaꞌa",
    "french": "Porter",
    "english": "Carry"
  },
  {
    "medumba": "Nə̀ bǎd mvɛ̀n",
    "french": "Porter (au dos)",
    "english": "Wear (back)"
  },
  {
    "medumba": "Nə̀ yam ntαmə",
    "french": "Porter (fruit)",
    "english": "Bear (fruit)"
  },
  {
    "medumba": "Ngàbenbnzə̀ndα (1/6",
    "french": "Portier",
    "english": "Doorman"
  },
  {
    "medumba": "Nə̀ yαbə",
    "french": "Poser",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ yαb nsi",
    "french": "Poser",
    "english": "Ask"
  },
  {
    "medumba": "Ndα̂nkʉ̌nŋwàꞌni",
    "french": "Poste",
    "english": "Post"
  },
  {
    "medumba": "Nzwìd",
    "french": "Poste̍rite̍",
    "english": "Posterite"
  },
  {
    "medumba": "Tʉ̌nndα",
    "french": "Poste̍rite̍",
    "english": "Posterite"
  },
  {
    "medumba": "Kab",
    "french": "Pot",
    "english": "Jar"
  },
  {
    "medumba": "Ngàtəkab",
    "french": "Potier",
    "english": "Potter"
  },
  {
    "medumba": "Ngàtecaꞌa",
    "french": "Potier",
    "english": "Potter"
  },
  {
    "medumba": "Ntə̂kab",
    "french": "Potier",
    "english": "Potter"
  },
  {
    "medumba": "Ntə̂caꞌa",
    "french": "Potier",
    "english": "Potter"
  },
  {
    "medumba": "Ncɛ̀d",
    "french": "Pou",
    "english": "Pou"
  },
  {
    "medumba": "Bwə",
    "french": "Poudre",
    "english": "Powder"
  },
  {
    "medumba": "Njòg",
    "french": "Poudre (à canon)",
    "english": "Powder (gun)"
  },
  {
    "medumba": "Mbâbmbabe",
    "french": "Poudre (en)",
    "english": "Powder (in)"
  },
  {
    "medumba": "Ngab",
    "french": "Poule",
    "english": "Hen"
  },
  {
    "medumba": "Mα̂ngab",
    "french": "Poule mère",
    "english": "Mother hen"
  },
  {
    "medumba": "Bǎgtʉꞌ",
    "french": "Poumons",
    "english": "Lungs"
  },
  {
    "medumba": "Cǔꞌntʉ",
    "french": "Pour",
    "english": "For"
  },
  {
    "medumba": "Nǔm",
    "french": "Pour",
    "english": "For"
  },
  {
    "medumba": "Mɛ̂nngʉ̌nyὰm",
    "french": "Pourceau",
    "english": "Pig"
  },
  {
    "medumba": "Ŋwǎꞌŋwaꞌ",
    "french": "Pourpe",
    "english": "Purple"
  },
  {
    "medumba": "Nǔmkə̂",
    "french": "Pourquoi",
    "english": "Why"
  },
  {
    "medumba": "Yaŋkàg",
    "french": "Pousse-pousse",
    "english": "Rickshaw"
  },
  {
    "medumba": "Nə̀ bilə",
    "french": "Décoler",
    "english": "Take off"
  },
  {
    "medumba": "Nə̀ tɛnə",
    "french": "Pousser",
    "english": "Push"
  },
  {
    "medumba": "Nə̀ cwɛnə",
    "french": "Pousser",
    "english": "Push"
  },
  {
    "medumba": "Mbabə",
    "french": "Poussiere",
    "english": "Dust"
  },
  {
    "medumba": "Mɛ̂nngab",
    "french": "Poussin",
    "english": "Chick"
  },
  {
    "medumba": "Kǎmncwɛn",
    "french": "Poutre",
    "english": "Beam"
  },
  {
    "medumba": "Mbwoŋncwɛn",
    "french": "Poutre",
    "english": "Beam"
  },
  {
    "medumba": "Mbàꞌ",
    "french": "Pouvoir",
    "english": "Power"
  },
  {
    "medumba": "Nə̀ kùꞌnǐ",
    "french": "Pouvoir",
    "english": "Power"
  },
  {
    "medumba": "Nə̀ta",
    "french": "Pouvoir",
    "english": "Power"
  },
  {
    "medumba": "Nzə̀mɛn",
    "french": "Pre̍cepteur",
    "english": "Preceptor"
  },
  {
    "medumba": "Nə̀ cob nǔ nsi",
    "french": "Prêcher",
    "english": "Preach"
  },
  {
    "medumba": "Jûtànjòŋ",
    "french": "Pre̍cieux",
    "english": "Precious"
  },
  {
    "medumba": "Jûkə̀njòŋ",
    "french": "Pre̍cieux",
    "english": "Precious"
  },
  {
    "medumba": "Ghe̍mə",
    "french": "Pre̍cipice",
    "english": "Precipice"
  },
  {
    "medumba": "Nαntə̀",
    "french": "Pre̍cipitation",
    "english": "Precipitation"
  },
  {
    "medumba": "Faꞌtə̀",
    "french": "Pre̍cipitation",
    "english": "Precipitation"
  },
  {
    "medumba": "Vògtə̌",
    "french": "Pre̍cipitation",
    "english": "Precipitation"
  },
  {
    "medumba": "Nə̀ nαntə",
    "french": "Pre̍cipiter",
    "english": "Rush"
  },
  {
    "medumba": "Nə̀ faꞌtə",
    "french": "Pre̍cipiter",
    "english": "Rush"
  },
  {
    "medumba": "Nə̀ vògtə̌",
    "french": "Pre̍cipiter",
    "english": "Rush"
  },
  {
    "medumba": "Ngàcobncobnsi",
    "french": "Pre̍dicateur",
    "english": "Preacher"
  },
  {
    "medumba": "Ncobnsi",
    "french": "Pre̍dication",
    "english": "Preaching"
  },
  {
    "medumba": "Mbwə̀tαmtʉ",
    "french": "Pre̍mice",
    "english": "First"
  },
  {
    "medumba": "Mbwə̀",
    "french": "Premier",
    "english": "First"
  },
  {
    "medumba": "Mbwə̀mɛn",
    "french": "Premier fils",
    "english": "First son"
  },
  {
    "medumba": "Tûswə",
    "french": "Premier fils",
    "english": "First son"
  },
  {
    "medumba": "Nə̀ kwe",
    "french": "Prendre",
    "english": "Take"
  },
  {
    "medumba": "Nə̀ lòꞌo",
    "french": "Prendre",
    "english": "Take"
  },
  {
    "medumba": "Nə̀ fedtə",
    "french": "Prendre de force",
    "english": "Take by force"
  },
  {
    "medumba": "Nə̀ kwə nə̀ta",
    "french": "Prendre de force",
    "english": "Take by force"
  },
  {
    "medumba": "Nə̀ kwə tʉ̀n",
    "french": "Prendre de force",
    "english": "Take by force"
  },
  {
    "medumba": "Nə̀ mǐ",
    "french": "Prendre fin",
    "english": "End"
  },
  {
    "medumba": "Ngansα",
    "french": "Presdigitateur",
    "english": "Presdigitator"
  },
  {
    "medumba": "Ngaghʉ̌məsin",
    "french": "Presdigitation",
    "english": "Presdigitation"
  },
  {
    "medumba": "Nsα",
    "french": "Presdigitation",
    "english": "Presdigitation"
  },
  {
    "medumba": "Məsin",
    "french": "Pre̍sent",
    "english": "Present"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Pre̍sent (le)",
    "english": "Present (the)"
  },
  {
    "medumba": "Ndɔ̌nni",
    "french": "Pre̍sent (le)",
    "english": "Present (the)"
  },
  {
    "medumba": "Fìm",
    "french": "Pre̍sservatif",
    "english": "Condom"
  },
  {
    "medumba": "Tα̂kum",
    "french": "Président",
    "english": "President"
  },
  {
    "medumba": "Tα̂mαnjɔ̀",
    "french": "Président",
    "english": "President"
  },
  {
    "medumba": "Tα̂ndα",
    "french": "Président",
    "english": "President"
  },
  {
    "medumba": "Tα̂ngɔ̀",
    "french": "Président",
    "english": "President"
  },
  {
    "medumba": "Nə̀nαntə",
    "french": "Pressant",
    "english": "Pressing"
  },
  {
    "medumba": "Ntsənetamə",
    "french": "Pressentiment",
    "english": "Presentiment"
  },
  {
    "medumba": "Nə̀ nαntə",
    "french": "Presser",
    "english": "Squeeze"
  },
  {
    "medumba": "Nə̀ nyi",
    "french": "Presser",
    "english": "Squeeze"
  },
  {
    "medumba": "Cὰb",
    "french": "Pressoir",
    "english": "Press"
  },
  {
    "medumba": "Nə̀ lôꞌfα",
    "french": "Prêt (être)",
    "english": "Ready (to be)"
  },
  {
    "medumba": "Nə̀ bǎb ndʉ",
    "french": "Pre̍tendre",
    "english": "Pretend"
  },
  {
    "medumba": "Nə̀ buꞌbum",
    "french": "Pre̍tencieux",
    "english": "Pretentious"
  },
  {
    "medumba": "Nə fǒ",
    "french": "Prêter",
    "english": "Lend"
  },
  {
    "medumba": "Nə̀ kʉꞌ ntoŋ",
    "french": "Prêter attention",
    "english": "Pay attention"
  },
  {
    "medumba": "Nə̀ cwɛ̀lə",
    "french": "Prêter sur gage",
    "english": "Pawn"
  },
  {
    "medumba": "Nə̀ yαb cwɛd",
    "french": "Prêter sur gage",
    "english": "Pawn"
  },
  {
    "medumba": "Lǎdnta",
    "french": "Prétexte",
    "english": "Pretext"
  },
  {
    "medumba": "Nə̀ lǎdnta",
    "french": "Prétexter",
    "english": "Pretext"
  },
  {
    "medumba": "Nkâmnsi",
    "french": "Prête",
    "english": "Ready"
  },
  {
    "medumba": "Kə̀ki",
    "french": "Preuve",
    "english": "Proof"
  },
  {
    "medumba": "Mf̀ꞌ",
    "french": "Preuve",
    "english": "Proof"
  },
  {
    "medumba": "Nə̀ lə̀ꞌtə̌",
    "french": "Prier",
    "english": "Pray"
  },
  {
    "medumba": "Nə̀ mǎꞌmbu",
    "french": "Prier",
    "english": "Pray"
  },
  {
    "medumba": "Nə̀ buꞌmbu",
    "french": "Prier",
    "english": "Pray"
  },
  {
    "medumba": "Nə̀ lə̀ꞌtə̌ Nsi",
    "french": "Prier dieu",
    "english": "pray to god"
  },
  {
    "medumba": "Lə̀ꞌtə̀",
    "french": "Prière",
    "english": "Prayer"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Prime",
    "english": "Bonus"
  },
  {
    "medumba": "Nə̀ jʉǎ mɛ̀n",
    "french": "Primer",
    "english": "Primer"
  },
  {
    "medumba": "Nə̀ fα ndà",
    "french": "Primer",
    "english": "Primer"
  },
  {
    "medumba": "Mɛ̂nmfə̀n",
    "french": "Prince",
    "english": "Prince"
  },
  {
    "medumba": "Mɛ̀nndʉb",
    "french": "Principal",
    "english": "Main"
  },
  {
    "medumba": "Ndα̂ca",
    "french": "Prison",
    "english": "Jail"
  },
  {
    "medumba": "Ca",
    "french": "Prison",
    "english": "Jail"
  },
  {
    "medumba": "Ngàndα̂ca",
    "french": "Prisonnier",
    "english": "Prisoner"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Prix",
    "english": "Price"
  },
  {
    "medumba": "Njòŋ",
    "french": "Prix",
    "english": "Price"
  },
  {
    "medumba": "Cǒꞌnguꞌ",
    "french": "Prix",
    "english": "Price"
  },
  {
    "medumba": "Kamə",
    "french": "Procès",
    "english": "Trial"
  },
  {
    "medumba": "Ncà",
    "french": "Procès",
    "english": "Trial"
  },
  {
    "medumba": "Nə̀ soŋə",
    "french": "Proclamer",
    "english": "Proclaim"
  },
  {
    "medumba": "Ngàbαgtὰkə̀siaŋ",
    "french": "Prodigue",
    "english": "Prodigal"
  },
  {
    "medumba": "Bìn",
    "french": "Profit",
    "english": "Profit"
  },
  {
    "medumba": "Nə̀ jʉbin",
    "french": "Profiter",
    "english": "Enjoy"
  },
  {
    "medumba": "Ngàjʉnbìn",
    "french": "Profiteur",
    "english": "Profiteer"
  },
  {
    "medumba": "Njʉ̂bìn",
    "french": "Profiteur",
    "english": "Profiteer"
  },
  {
    "medumba": "Co",
    "french": "Profond",
    "english": "Deep"
  },
  {
    "medumba": "Mαnjàmnsi",
    "french": "Profondeur",
    "english": "Depth"
  },
  {
    "medumba": "Nə̀co",
    "french": "Profondeur",
    "english": "Depth"
  },
  {
    "medumba": "Lǎmntsə",
    "french": "Profondeu d’eau",
    "english": "Water depth"
  },
  {
    "medumba": "Nyînnso",
    "french": "Prognate",
    "english": "Prognate"
  },
  {
    "medumba": "Mfîꞌnə̀maꞌa",
    "french": "Projet",
    "english": "Project"
  },
  {
    "medumba": "Nə̀ maꞌa mfìꞌ",
    "french": "Projet (avoir un)",
    "english": "Project (have one)"
  },
  {
    "medumba": "Nkadtə̀",
    "french": "Promenade",
    "english": "Walk"
  },
  {
    "medumba": "Nə̀ kadtə",
    "french": "Promener",
    "english": "Walk"
  },
  {
    "medumba": "Nə̀ zìnə",
    "french": "Promener",
    "english": "Walk"
  },
  {
    "medumba": "Nə̀ zintə̌",
    "french": "Promener",
    "english": "Walk"
  },
  {
    "medumba": "Ngàzìn",
    "french": "Promeneur",
    "english": "Walker"
  },
  {
    "medumba": "Nkàꞌnì",
    "french": "Promesse",
    "english": "Promise"
  },
  {
    "medumba": "Nə̀ kaꞌa",
    "french": "Promettre",
    "english": "Promise"
  },
  {
    "medumba": "Nə̀ bʉ",
    "french": "Promettre",
    "english": "Promise"
  },
  {
    "medumba": "Ncobnsi",
    "french": "Prophe̍tie",
    "english": "Prophecy"
  },
  {
    "medumba": "Ngàntûmnsi",
    "french": "Prophète",
    "english": "Prophet"
  },
  {
    "medumba": "Lαnə",
    "french": "Proprete̍",
    "english": "Clean"
  },
  {
    "medumba": "Ced",
    "french": "Proprete̍̍",
    "english": "Clean"
  },
  {
    "medumba": "Nə̀ kwǐmntunkə̀kwiꞌnsi",
    "french": "Prosterner",
    "english": "Prostrate"
  },
  {
    "medumba": "Nə̀ vʉ̌nsi mbwə̌ mɛ̀n",
    "french": "Prosterner",
    "english": "Prostrate"
  },
  {
    "medumba": "Kâdtʉ",
    "french": "Prostitue̍e",
    "english": "Prostitute"
  },
  {
    "medumba": "Taα̂nkʉd",
    "french": "Proverbe",
    "english": "Proverb"
  },
  {
    "medumba": "Kǎmnɔ̀",
    "french": "Province",
    "english": "Province"
  },
  {
    "medumba": "Nə̀kǎm ncà",
    "french": "Provocation",
    "english": "Provocation"
  },
  {
    "medumba": "Nə̀ kàmə ncà",
    "french": "Provoquer",
    "english": "Provoke"
  },
  {
    "medumba": "Zətə̀",
    "french": "Prudence",
    "english": "Caution"
  },
  {
    "medumba": "Com",
    "french": "Prune",
    "english": "Plum"
  },
  {
    "medumba": "Tʉcom",
    "french": "Prunier",
    "english": "Plum tree"
  },
  {
    "medumba": "Nə̀ sǎ kʉ̀n",
    "french": "Publier une nouvelle",
    "english": "Publish a news"
  },
  {
    "medumba": "Nə̀ ŋwàlə",
    "french": "Puiser",
    "english": "Draw"
  },
  {
    "medumba": "Nə̀ tuꞌu",
    "french": "Puiser",
    "english": "Draw"
  },
  {
    "medumba": "Ngàtuꞌ",
    "french": "Puiseur",
    "english": "Drawer"
  },
  {
    "medumba": "Nə̀ta",
    "french": "Puissance",
    "english": "Power"
  },
  {
    "medumba": "Mbàꞌ",
    "french": "Puissance",
    "english": "Power"
  },
  {
    "medumba": "Fə̀d",
    "french": "Puissance",
    "english": "Power"
  },
  {
    "medumba": "Mɛ̀nmbàꞌ",
    "french": "Puissant",
    "english": "Powerful"
  },
  {
    "medumba": "Nə̀ta",
    "french": "Puissant",
    "english": "Powerful"
  },
  {
    "medumba": "Ngànə̀ta",
    "french": "Puissant",
    "english": "Powerful"
  },
  {
    "medumba": "Tɔntsə",
    "french": "Puits",
    "english": "Well"
  },
  {
    "medumba": "Cǎŋntsə",
    "french": "Pure̍e",
    "english": "Pure̍e"
  },
  {
    "medumba": "Nswə",
    "french": "Pus",
    "english": "Pus"
  },
  {
    "medumba": "Nyὰmnkùnkuα",
    "french": "Quadrupède",
    "english": "Quadruped"
  },
  {
    "medumba": "Ŋâmnkuα",
    "french": "Quarante",
    "english": "Forty"
  },
  {
    "medumba": "Tǎŋlaꞌ",
    "french": "Quartier",
    "english": "Neighborhood"
  },
  {
    "medumba": "Kuὰ",
    "french": "Quatre",
    "english": "Four"
  },
  {
    "medumba": "Mbadtə̀ kuὰ",
    "french": "Quatrième",
    "english": "Fourth"
  },
  {
    "medumba": "Mbə",
    "french": "Que",
    "english": "What"
  },
  {
    "medumba": "Mi",
    "french": "Que",
    "english": "What"
  },
  {
    "medumba": "Tsə",
    "french": "Que",
    "english": "What"
  },
  {
    "medumba": "Zə",
    "french": "Que",
    "english": "What"
  },
  {
    "medumba": "Mîlə",
    "french": "Quel",
    "english": "What"
  },
  {
    "medumba": "Sîlə",
    "french": "Quel",
    "english": "What"
  },
  {
    "medumba": "Zîlə",
    "french": "Quel",
    "english": "What"
  },
  {
    "medumba": "Tsîlə",
    "french": "Quels",
    "english": "What"
  },
  {
    "medumba": "Mǒꞌ mɛ̀n",
    "french": "Quelqu’un",
    "english": "someone"
  },
  {
    "medumba": "Môꞌ , môꞌ",
    "french": "Quelque",
    "english": "Some"
  },
  {
    "medumba": "Môꞌdʉꞌ",
    "french": "Quelque part",
    "english": "Somewhere"
  },
  {
    "medumba": "Mimôꞌ",
    "french": "Quelques",
    "english": "Some"
  },
  {
    "medumba": "Tsə̀môꞌ",
    "french": "Quelques",
    "english": "Some"
  },
  {
    "medumba": "Nə̀ mǎꞌ mbu",
    "french": "Que̍mander",
    "english": "What to ask"
  },
  {
    "medumba": "Màꞌ mbu",
    "french": "Que̍mandeur",
    "english": "Que̍demander"
  },
  {
    "medumba": "Ndà",
    "french": "Querelle",
    "english": "Quarrel"
  },
  {
    "medumba": "Ntànta",
    "french": "Querelle",
    "english": "Quarrel"
  },
  {
    "medumba": "Ncà",
    "french": "Querelle",
    "english": "Quarrel"
  },
  {
    "medumba": "Nə̀ caŋ ncà",
    "french": "Quereller",
    "english": "Quarrel"
  },
  {
    "medumba": "Nə̀ cog ndà",
    "french": "Quereller",
    "english": "Quarrel"
  },
  {
    "medumba": "Nə̀ saꞌ ncà",
    "french": "Quereller (se)",
    "english": "Quarrel"
  },
  {
    "medumba": "Ngàntàntà",
    "french": "Querelleur",
    "english": "Quarrelsome"
  },
  {
    "medumba": "Ngàcaŋncà",
    "french": "Querelleur",
    "english": "Quarrelsome"
  },
  {
    "medumba": "Nkùn",
    "french": "Queue",
    "english": "Tail"
  },
  {
    "medumba": "Swa",
    "french": "Queue",
    "english": "Tail"
  },
  {
    "medumba": "Swadiaŋə",
    "french": "Queue de parade",
    "english": "Parade tail"
  },
  {
    "medumba": "Tsə",
    "french": "Qui",
    "english": "Who"
  },
  {
    "medumba": "Wə",
    "french": "Qui",
    "english": "Who"
  },
  {
    "medumba": "Zə",
    "french": "Qui",
    "english": "Who"
  },
  {
    "medumba": "Bə twə nzə",
    "french": "Qui vive",
    "english": "Who lives"
  },
  {
    "medumba": "Mɛ̌nzə",
    "french": "Quiconque",
    "english": "Anyone"
  },
  {
    "medumba": "Mbὰ welo ze",
    "french": "Quiconque",
    "english": "Anyone"
  },
  {
    "medumba": "Nə̀ lǒ",
    "french": "Quitter",
    "english": "Exit"
  },
  {
    "medumba": "Kə",
    "french": "Quoi",
    "english": "What"
  },
  {
    "medumba": "Nə̀ komə",
    "french": "Raboter",
    "english": "Plane"
  },
  {
    "medumba": "Nzwìd",
    "french": "Race",
    "english": "Breed"
  },
  {
    "medumba": "Nə̀cùꞌu",
    "french": "Rachat",
    "english": "Redemption"
  },
  {
    "medumba": "Nə̀ cuꞌu",
    "french": "Racheter",
    "english": "Redeem"
  },
  {
    "medumba": "Nga",
    "french": "Racine",
    "english": "Root"
  },
  {
    "medumba": "Ngǎtʉ",
    "french": "Racine (arbre)",
    "english": "Root (tree)"
  },
  {
    "medumba": "Ngǎnkʉα",
    "french": "Racine de raphia",
    "english": "Raffia root"
  },
  {
    "medumba": "Nə̀ soŋə",
    "french": "Raconter",
    "english": "Tell"
  },
  {
    "medumba": "Nsàfoŋə",
    "french": "Radio diffusion",
    "english": "Radio broadcasting"
  },
  {
    "medumba": "Ndα̂nsàfoŋə",
    "french": "Radio (maison de la)",
    "english": "Radio (home of)"
  },
  {
    "medumba": "Nkwə̂foŋə",
    "french": "Radio (re̍cepteur)",
    "english": "Radio (receiver)"
  },
  {
    "medumba": "Saŋntâ",
    "french": "Raide",
    "english": "Stiff"
  },
  {
    "medumba": "Nə̀ saŋntâ",
    "french": "Raidir",
    "english": "Stiffen"
  },
  {
    "medumba": "Mbǎtsi",
    "french": "Raisin",
    "english": "Grape"
  },
  {
    "medumba": "Buꞌmfə",
    "french": "Rame paplers",
    "english": "Oar paplers"
  },
  {
    "medumba": "Cuꞌwud",
    "french": "Rac̩on",
    "english": "Rac̩on"
  },
  {
    "medumba": "Mbaŋə",
    "french": "Rancune",
    "english": "Grudge"
  },
  {
    "medumba": "Nə̀ laŋ mbaŋə",
    "french": "Rancune (garder)",
    "english": "Grudge (keep)"
  },
  {
    "medumba": "Ngà laŋmbaŋə",
    "french": "Rancunier",
    "english": "Resentful"
  },
  {
    "medumba": "Nka",
    "french": "Rang",
    "english": "Rank"
  },
  {
    "medumba": "Nə̀ tə nka",
    "french": "Ranger",
    "english": "Put away"
  },
  {
    "medumba": "Nkʉα",
    "french": "Raphia",
    "english": "Raffia"
  },
  {
    "medumba": "Nkʉα labə",
    "french": "Raphia du mare̍cage",
    "english": "Swamp raffia"
  },
  {
    "medumba": "Nkʉα tɛ̀dbenə",
    "french": "Raphia de haute tèrre",
    "english": "high earth raffia"
  },
  {
    "medumba": "Nə̀ diaŋ nkʉα",
    "french": "Raphia vigner le",
    "english": "Raffia vine"
  },
  {
    "medumba": "Nə̀ to nkʉα",
    "french": "Raphia faire le trou",
    "english": "Raffia make the hole"
  },
  {
    "medumba": "Nə̀ coꞌnkʉα",
    "french": "Raphia enleve̍",
    "english": "Raffia removed"
  },
  {
    "medumba": "Nə̀ kα̌g nkʉα",
    "french": "Raphia laisser au repos",
    "english": "Raffia leave to rest"
  },
  {
    "medumba": "Tα̂fàꞌ",
    "french": "Patron",
    "english": "Boss"
  },
  {
    "medumba": "Ntɛ̂nnkʉα",
    "french": "Raphia pied de",
    "english": "Raffia foot"
  },
  {
    "medumba": "Nə̀kwimtə",
    "french": "Rappel",
    "english": "Reminder"
  },
  {
    "medumba": "Nə̀ kwimtə",
    "french": "Rappeller",
    "english": "Remind"
  },
  {
    "medumba": "Nə̀ komə",
    "french": "Raser",
    "english": "Shave"
  },
  {
    "medumba": "Nə̀ kom tu",
    "french": "Raser (tête)",
    "english": "Shave (head)"
  },
  {
    "medumba": "Shuaꞌ",
    "french": "Rasoir (lame)",
    "english": "Razor (blade)"
  },
  {
    "medumba": "Lisὰ",
    "french": "Rasoir (lame)",
    "english": "Razor (blade)"
  },
  {
    "medumba": "Nə̀ywɛlə",
    "french": "Rassasie̍",
    "english": "Satisfied"
  },
  {
    "medumba": "Nə̀ kʉmtə",
    "french": "Rassembler",
    "english": "Gather"
  },
  {
    "medumba": "Nə̀ tsəꞌtə",
    "french": "Rassembler",
    "english": "Gather"
  },
  {
    "medumba": "Nsàm",
    "french": "Rassi",
    "english": "Rassi"
  },
  {
    "medumba": "Mbα̂bndun",
    "french": "Rat",
    "english": "Rat"
  },
  {
    "medumba": "Nsame",
    "french": "Ravin",
    "english": "Ravine"
  },
  {
    "medumba": "Nkǒꞌndα",
    "french": "Rayons",
    "english": "Rays"
  },
  {
    "medumba": "Nkòꞌ",
    "french": "Rayon (boutique)",
    "english": "Department (store)"
  },
  {
    "medumba": "Kǒnyàm",
    "french": "Rayon (soleil)",
    "english": "Ray (sun)"
  },
  {
    "medumba": "Nkɔ",
    "french": "Rayons",
    "english": "Rays"
  },
  {
    "medumba": "Ngatǎtu",
    "french": "Rebelle",
    "english": "Rebel"
  },
  {
    "medumba": "Tǎtu",
    "french": "Rebellion",
    "english": "Rebellion"
  },
  {
    "medumba": "Nə̀ kwe",
    "french": "Recevoir",
    "english": "Receive"
  },
  {
    "medumba": "Nə̀ lǒꞌmɛ̀n ngʉ̀n",
    "french": "Recevoir qqn",
    "english": "Receive someone"
  },
  {
    "medumba": "Nə̀ tatə ngʉ̀n",
    "french": "Recevoir qqn",
    "english": "Receive someone"
  },
  {
    "medumba": "Côbtu",
    "french": "Re̍cit",
    "english": "Story"
  },
  {
    "medumba": "Côbtu",
    "french": "Re̍citation",
    "english": "Recitation"
  },
  {
    "medumba": "Jûntsə",
    "french": "Re̍cipient",
    "english": "Container"
  },
  {
    "medumba": "Cûnə̀coꞌo",
    "french": "Re̍colte",
    "english": "Harvest"
  },
  {
    "medumba": "Nə̀ coꞌcu",
    "french": "Re̍colter",
    "english": "Harvest"
  },
  {
    "medumba": "Nt̀hgə",
    "french": "Recommandation",
    "english": "Recommendation"
  },
  {
    "medumba": "Nə̀ tswə̀ꞌtə̌",
    "french": "Recommander",
    "english": "Recommend"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Re̍compense",
    "english": "Reward"
  },
  {
    "medumba": "Ndàꞌntum",
    "french": "Re̍compense",
    "english": "Reward"
  },
  {
    "medumba": "Côꞌfàꞌ",
    "french": "Re̍compense",
    "english": "Reward"
  },
  {
    "medumba": "Nə̀ fα ndàꞌ",
    "french": "Re̍compenser",
    "english": "Reward"
  },
  {
    "medumba": "Nə̀ coꞌ faꞌ",
    "french": "Re̍compenser",
    "english": "Reward"
  },
  {
    "medumba": "Mfɛdni",
    "french": "Re̍concilliation",
    "english": "Reconciliation"
  },
  {
    "medumba": "Nə̀ bə ncùncʉꞌ",
    "french": "Re̍concilliation",
    "english": "Reconciliation"
  },
  {
    "medumba": "Nə kam nèyabe",
    "french": "Re̍concilliation",
    "english": "Reconciliation"
  },
  {
    "medumba": "Nə̀ nkɔ̀nì nèsǒ",
    "french": "Re̍concillietion",
    "english": "Reconciliation"
  },
  {
    "medumba": "Nə̀ ghǒꞌ mfɛdnì",
    "french": "Re̍concilier",
    "english": "Reconcile"
  },
  {
    "medumba": "Nə̀ sǒ nkɔ̀nì",
    "french": "Re̍concilier",
    "english": "Reconcile"
  },
  {
    "medumba": "Nə̀ yab kamə",
    "french": "Re̍concilier",
    "english": "Reconcile"
  },
  {
    "medumba": "Nə̀ lǒ ntʉ̀ nɛ̂n càm",
    "french": "Re̍concilier (se)",
    "english": "Reconcile"
  },
  {
    "medumba": "Nə̀ tswə ncùncʉꞌ (V",
    "french": "Re̍concilier",
    "english": "Reconcile"
  },
  {
    "medumba": "Nə̀tsiagte",
    "french": "Rectification",
    "english": "Rectification"
  },
  {
    "medumba": "Nə̀ tsiagtə",
    "french": "Rectifier",
    "english": "Rectify"
  },
  {
    "medumba": "Nə̀ lǒꞌ ntʉ̀ nɛ̂n càm",
    "french": "Recueillement",
    "english": "Collection"
  },
  {
    "medumba": "Nə̀ lədtə",
    "french": "Recueillir",
    "english": "Collect"
  },
  {
    "medumba": "nə̀ kʉmtə",
    "french": "Recueillir",
    "english": "Collect"
  },
  {
    "medumba": "Nə̀ bɛ̂nnjàmnjàm",
    "french": "Reculer",
    "english": "Back"
  },
  {
    "medumba": "Ne kʉꞌtə",
    "french": "Reculer",
    "english": "Back"
  },
  {
    "medumba": "Nə̀ bɛ̀ntə̀ tùntùn",
    "french": "Reculer",
    "english": "Back"
  },
  {
    "medumba": "Kwànkî",
    "french": "Re̍daction",
    "english": "Writing"
  },
  {
    "medumba": "Lɛ̀nnkî",
    "french": "Re̍daction",
    "english": "Writing"
  },
  {
    "medumba": "Nə̀kǐ",
    "french": "Re̍daction",
    "english": "Writing"
  },
  {
    "medumba": "Ngàcǔꞌmɛ̀n",
    "french": "Re̍dempteur",
    "english": "Redeemer"
  },
  {
    "medumba": "Ngàyǒgmɛ̀n",
    "french": "Re̍dempteur",
    "english": "Redeemer"
  },
  {
    "medumba": "Ncùꞌmɛ̀n",
    "french": "Re̍dempteur",
    "english": "Redeemer"
  },
  {
    "medumba": "Nəcǔꞌwud",
    "french": "Re̍demption",
    "english": "Redemption"
  },
  {
    "medumba": "Ngànjo",
    "french": "Redevable",
    "english": "Accountable"
  },
  {
    "medumba": "Nə̀tsiagtə",
    "french": "Redressement",
    "english": "Recovery"
  },
  {
    "medumba": "Nə̀ tsiagtə",
    "french": "Redresser",
    "english": "Straighten"
  },
  {
    "medumba": "Nə̀ bʉꞌ ntətʉ",
    "french": "Redresser",
    "english": "Straighten"
  },
  {
    "medumba": "Nə tə ndǎŋndaŋ",
    "french": "Redresser",
    "english": "Straighten"
  },
  {
    "medumba": "Nə̀ kwàtə̌",
    "french": "Re̍flechir",
    "english": "Reflect"
  },
  {
    "medumba": "Nə̀bɛ̌n nùm kǒ nù (1/6",
    "french": "Re̍forme",
    "english": "Reform"
  },
  {
    "medumba": "Nə̀ tsiagtə nte dʉ̀ꞌi",
    "french": "Re̍former",
    "english": "Reform"
  },
  {
    "medumba": "Nə̀bɛ̌n nùm kǒꞌ nù",
    "french": "Re̍former",
    "english": "Reform"
  },
  {
    "medumba": "Nə̀tsiagte ntə dʉ̩ꞌi",
    "french": "Reformer",
    "english": "Reform"
  },
  {
    "medumba": "Nə̀ nywìnə",
    "french": "Refroidir",
    "english": "Cool"
  },
  {
    "medumba": "Nə̀ fi",
    "french": "Refroidir",
    "english": "Cool"
  },
  {
    "medumba": "nə̀ ghʉ̀ a fi",
    "french": "Refroidir",
    "english": "Cool"
  },
  {
    "medumba": "Nə̀fi",
    "french": "Refroidissement",
    "english": "Cooling"
  },
  {
    "medumba": "Nə̀nywinə",
    "french": "Refroidissement",
    "english": "Cooling"
  },
  {
    "medumba": "Nə̀gha",
    "french": "Refus",
    "english": "Refusal"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Refuser",
    "english": "Refuse"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Refuter",
    "english": "Reject"
  },
  {
    "medumba": "Nə̀ ta nù",
    "french": "Refuter",
    "english": "Reject"
  },
  {
    "medumba": "Ngwàdlαg",
    "french": "Regard",
    "english": "Look"
  },
  {
    "medumba": "Nə̀ lɔtə",
    "french": "Regarder",
    "english": "Watch"
  },
  {
    "medumba": "Tûmba",
    "french": "Re̍gime (de noix)",
    "english": "Diet (of nuts)"
  },
  {
    "medumba": "Ncàkə̀lɔ̀",
    "french": "Re̍gime de plantain",
    "english": "Plantain diet"
  },
  {
    "medumba": "Njʉmɛ̀n",
    "french": "Re̍gime alimentaire",
    "english": "Diet"
  },
  {
    "medumba": "Màd netǒngɔ̀",
    "french": "Re̍gime politique",
    "english": "Political regime"
  },
  {
    "medumba": "Kə̂bnka",
    "french": "Règle",
    "english": "Rule"
  },
  {
    "medumba": "Kǔzin",
    "french": "Règle",
    "english": "Rule"
  },
  {
    "medumba": "Nə̀ yən ŋwʉ",
    "french": "Règle menstrues",
    "english": "Menstrual period"
  },
  {
    "medumba": "Ntə̂nù",
    "french": "Règlement",
    "english": "Regulations"
  },
  {
    "medumba": "Ncʉꞌkum",
    "french": "Règlement",
    "english": "Regulations"
  },
  {
    "medumba": "Ntswəndα",
    "french": "Règlement",
    "english": "Regulations"
  },
  {
    "medumba": "Nətǒ",
    "french": "Règne",
    "english": "Reign"
  },
  {
    "medumba": "Nǔfə̀n",
    "french": "Règne",
    "english": "Reign"
  },
  {
    "medumba": "Fə̀n",
    "french": "Règne",
    "english": "Reign"
  },
  {
    "medumba": "Nə̀ tɔ̌",
    "french": "Re̍gner",
    "english": "Reign"
  },
  {
    "medumba": "Fem",
    "french": "Regret",
    "english": "Regret"
  },
  {
    "medumba": "Nə̀ feme",
    "french": "Regretter",
    "english": "Regret"
  },
  {
    "medumba": "Ntʉ̂ mɛ̀n nə̀ saꞌi",
    "french": "Regretter",
    "english": "Regret"
  },
  {
    "medumba": "Mbâzwəꞌ",
    "french": "Rein",
    "english": "Kidney"
  },
  {
    "medumba": "Zwəꞌ",
    "french": "Reine",
    "english": "Queen"
  },
  {
    "medumba": "Mα̂mfə̀n",
    "french": "Reine",
    "english": "Queen"
  },
  {
    "medumba": "Nə̀ kotə",
    "french": "Rejoindre",
    "english": "Join"
  },
  {
    "medumba": "Tsiàŋtə̀",
    "french": "Re̍jouissance",
    "english": "Rejoicing"
  },
  {
    "medumba": "Jʉα",
    "french": "Re̍jouissance",
    "english": "Rejoicing"
  },
  {
    "medumba": "Nə̀ bàꞌa",
    "french": "Rembousser",
    "english": "Refund"
  },
  {
    "medumba": "Nə̀ tɔ̌ nkαb",
    "french": "Rembousser",
    "english": "Refund"
  },
  {
    "medumba": "Nə̀ bǎꞌnjàm",
    "french": "Remède",
    "english": "Remedy"
  },
  {
    "medumba": "Fu",
    "french": "Reme̍dier",
    "english": "Remedy"
  },
  {
    "medumba": "Nə̀ tsiagtə",
    "french": "Reme̍dier",
    "english": "Remedy"
  },
  {
    "medumba": "Nə̀ diǎg fu",
    "french": "Remerciement",
    "english": "Thanks"
  },
  {
    "medumba": "Lὰbtə̀",
    "french": "Remercier",
    "english": "Thank"
  },
  {
    "medumba": "Nə̀ lα̌bncù",
    "french": "Remercier",
    "english": "Thank"
  },
  {
    "medumba": "Nə̀ lαbtə̌",
    "french": "Remords",
    "english": "Remorse"
  },
  {
    "medumba": "Zwentʉ",
    "french": "Remplac̩ant",
    "english": "Substitute"
  },
  {
    "medumba": "Kwîbtu",
    "french": "Remplacement",
    "english": "Replacement"
  },
  {
    "medumba": "Bàtə",
    "french": "Remplacement",
    "english": "Replacement"
  },
  {
    "medumba": "Nə̀batə̌",
    "french": "Remplacer",
    "english": "Replace"
  },
  {
    "medumba": "Nə̀ dune",
    "french": "Remplir",
    "english": "Fill"
  },
  {
    "medumba": "Nə̀ zwiagtə",
    "french": "Remplir",
    "english": "Fill"
  },
  {
    "medumba": "Nkâbtfà",
    "french": "Remunération",
    "english": "Remuneration"
  },
  {
    "medumba": "Nə̀ tʉ nkab fàꞌ",
    "french": "Remunérer",
    "english": "Pay"
  },
  {
    "medumba": "Nkàꞌwune",
    "french": "Renard",
    "english": "Fox"
  },
  {
    "medumba": "Nə̀ koꞌ jòŋ ju",
    "french": "Renchérir",
    "english": "Increase"
  },
  {
    "medumba": "Nə̀ kwìꞌtə̌ joŋ ju",
    "french": "Renchérir",
    "english": "Increase"
  },
  {
    "medumba": "Nə̀ tǎnjòŋ ju",
    "french": "Renchérir",
    "english": "Increase"
  },
  {
    "medumba": "Mbùmtə̀",
    "french": "Renchérir",
    "english": "Increase"
  },
  {
    "medumba": "Nəbùmtə̌",
    "french": "Rencontre",
    "english": "Meeting"
  },
  {
    "medumba": "Nə̀ bùmtə",
    "french": "Rencontre",
    "english": "Meeting"
  },
  {
    "medumba": "Nkàꞌnì",
    "french": "Rencontrer",
    "english": "Meet"
  },
  {
    "medumba": "Nə̀kàꞌa",
    "french": "Rendez-vous",
    "english": "Appointment"
  },
  {
    "medumba": "Nə̀ bàꞌa",
    "french": "Rendez-vous",
    "english": "Appointment"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Rendre",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Renier",
    "english": "Deny"
  },
  {
    "medumba": "Nə̀gha",
    "french": "Renoncer",
    "english": "Give up"
  },
  {
    "medumba": "Tǔnnù",
    "french": "Reonciation",
    "english": "Renunciation"
  },
  {
    "medumba": "Nə̀ soŋe",
    "french": "Renseignement",
    "english": "Intelligence"
  },
  {
    "medumba": "Nə̀ bedtə",
    "french": "Renseigner",
    "english": "Inform"
  },
  {
    "medumba": "Nə̀bɛ̌nnjàm",
    "french": "Renseigner (se)",
    "english": "Find out"
  },
  {
    "medumba": "Nə̀ bɛ̌nnjàm",
    "french": "Rentrée",
    "english": "Back to school"
  },
  {
    "medumba": "Nə fə",
    "french": "Rentrer",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ sɔ̌",
    "french": "Rentrer",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Renvoi",
    "english": "Referral"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Renvoi",
    "english": "Referral"
  },
  {
    "medumba": "Ngàb",
    "french": "Renvoyer",
    "english": "Resend"
  },
  {
    "medumba": "Nə̀ sǎ",
    "french": "Repaire",
    "english": "Lair"
  },
  {
    "medumba": "Nə̀ fɛ̀dtə̌",
    "french": "Répandre",
    "english": "Spread"
  },
  {
    "medumba": "Nə̀ naŋə",
    "french": "Répandre",
    "english": "Spread"
  },
  {
    "medumba": "Nə̀ kǎŋntʉ",
    "french": "Répentance",
    "english": "Repentance"
  },
  {
    "medumba": "Nə̀ kǎŋntʉ",
    "french": "Répentir",
    "english": "Repent"
  },
  {
    "medumba": "Nə̀ bʉ̀ntə̌",
    "french": "Répondre",
    "english": "Reply"
  },
  {
    "medumba": "Mbʉ̀ntə̂nù",
    "french": "Réponse",
    "english": "Response"
  },
  {
    "medumba": "Mbʉ̀ntə̂ncobe",
    "french": "Réponse",
    "english": "Response"
  },
  {
    "medumba": "Fitə̀",
    "french": "Répos",
    "english": "Rest"
  },
  {
    "medumba": "Nə̀ fitə",
    "french": "Reposer (se)",
    "english": "Rest"
  },
  {
    "medumba": "Cobtə̀",
    "french": "Reprimande",
    "english": "Reprimand"
  },
  {
    "medumba": "Nə̀ cobtə",
    "french": "Reprimander",
    "english": "Reprimand"
  },
  {
    "medumba": "Nə̀sɔ̌",
    "french": "Réputation",
    "english": "Reputation"
  },
  {
    "medumba": "Nə̀taꞌa",
    "french": "Réputation",
    "english": "Reputation"
  },
  {
    "medumba": "Nə̀ sɔ̌",
    "french": "Répudier",
    "english": "Repudiate"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Répudier",
    "english": "Repudiate"
  },
  {
    "medumba": "Nə̀ lèꞌdʉ",
    "french": "Réservation",
    "english": "Reservation"
  },
  {
    "medumba": "Nə̀ leꞌe",
    "french": "Réserver",
    "english": "Reserve"
  },
  {
    "medumba": "Ne tǎ ngʉꞌ",
    "french": "Résister",
    "english": "Resist"
  },
  {
    "medumba": "Nə̀ tǎ tu",
    "french": "Résister",
    "english": "Resist"
  },
  {
    "medumba": "Zwiàg",
    "french": "Respirer",
    "english": "Breathe"
  },
  {
    "medumba": "Nə̀ zwiàge",
    "french": "Respiration",
    "english": "Breathing"
  },
  {
    "medumba": "Mbìꞌnù",
    "french": "Responsabilité",
    "english": "Responsibility"
  },
  {
    "medumba": "Ngànù",
    "french": "Responsable",
    "english": "Responsible"
  },
  {
    "medumba": "Tu",
    "french": "Responsable",
    "english": "Responsible"
  },
  {
    "medumba": "Ngàlɔtə̀",
    "french": "Responsable",
    "english": "Responsible"
  },
  {
    "medumba": "Nə̀ ghǒm wud",
    "french": "Ressaisir (se)",
    "english": "Pull yourself together"
  },
  {
    "medumba": "Mfuni",
    "french": "Ressemblance",
    "english": "Similarity"
  },
  {
    "medumba": "Lɛ̀n",
    "french": "Ressamblace",
    "english": "resembling"
  },
  {
    "medumba": "Nə̀ fu",
    "french": "Ressembler",
    "english": "Look like"
  },
  {
    "medumba": "Nə̀ futə",
    "french": "Ressembler",
    "english": "Look like"
  },
  {
    "medumba": "Nə̀ bǎm nǔm vʉ",
    "french": "Ressusciter",
    "english": "Resurrect"
  },
  {
    "medumba": "Nə̀ bàme",
    "french": "Ressusciter",
    "english": "Resurrect"
  },
  {
    "medumba": "Ceꞌe",
    "french": "Reste",
    "english": "Rest"
  },
  {
    "medumba": "Mbwə̀ꞌ",
    "french": "Reste",
    "english": "Rest"
  },
  {
    "medumba": "Nə̀ bwə̀ꞌe",
    "french": "Rester",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ ghɔ",
    "french": "Rester",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ tswe",
    "french": "Rester",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ tʉꞌʉ",
    "french": "Rester",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀lǒ nǔm vʉ",
    "french": "Résurection",
    "english": "Resurrection"
  },
  {
    "medumba": "Nə̀sɛne",
    "french": "Retard",
    "english": "Delay"
  },
  {
    "medumba": "Ngàsɛn",
    "french": "Retardataire",
    "english": "Latecomer"
  },
  {
    "medumba": "Nə̀ lὰtə́",
    "french": "Retarder",
    "english": "Delay"
  },
  {
    "medumba": "Nə̀ cʉbe",
    "french": "Retenir",
    "english": "Remember"
  },
  {
    "medumba": "Nə̀ sɔ̌",
    "french": "Retirer",
    "english": "Remove"
  },
  {
    "medumba": "Nə̀ lòꞌo",
    "french": "Prendre",
    "english": "Take"
  },
  {
    "medumba": "Nə̀fə",
    "french": "Retour",
    "english": "Return"
  },
  {
    "medumba": "Nə̀bɛ̀nə",
    "french": "Retour",
    "english": "Return"
  },
  {
    "medumba": "Nə̀kàŋə",
    "french": "Retournement",
    "english": "Turnaround"
  },
  {
    "medumba": "Nə̀bʉ̀nə",
    "french": "Retournement",
    "english": "Turnaround"
  },
  {
    "medumba": "Nə̀ fə",
    "french": "Retourner",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ kàŋə",
    "french": "Retourner",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ bʉ̀nə",
    "french": "Retourner",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ felə",
    "french": "Retrécir",
    "english": "Shrink"
  },
  {
    "medumba": "Nə̀ meme",
    "french": "Retrecir",
    "english": "Shrink"
  },
  {
    "medumba": "Nə̀ fα ndàꞌ",
    "french": "Retribuer",
    "english": "Retribute"
  },
  {
    "medumba": "Ncôꞌfàꞌ",
    "french": "Retribution",
    "english": "Retribution"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Retribution",
    "english": "Retribution"
  },
  {
    "medumba": "Kum",
    "french": "Réunion",
    "english": "Meeting"
  },
  {
    "medumba": "Mbùntə̀",
    "french": "Réunion",
    "english": "Meeting"
  },
  {
    "medumba": "Ntsəꞌtə̀",
    "french": "Réunion",
    "english": "Meeting"
  },
  {
    "medumba": "Nə̀ tàmtə̌",
    "french": "Réunir",
    "english": "Reunite"
  },
  {
    "medumba": "Nə̀ tsəꞌtə",
    "french": "Réunir",
    "english": "Reunite"
  },
  {
    "medumba": "Nə̀ ncʉα̌",
    "french": "Réussir",
    "english": "Succeed"
  },
  {
    "medumba": "Njèm",
    "french": "Rêve",
    "english": "Dream"
  },
  {
    "medumba": "Zwìd ju kə̀bwɔ̀",
    "french": "Révélation",
    "english": "Revelation"
  },
  {
    "medumba": "Nə̀làꞌtə̌",
    "french": "Révéler",
    "english": "Reveal"
  },
  {
    "medumba": "Nə̀ làꞌtə̌",
    "french": "Révéler",
    "english": "Reveal"
  },
  {
    "medumba": "Nə̀ tswìtə̌ wud",
    "french": "Réveil",
    "english": "Alarm clock"
  },
  {
    "medumba": "Nyàm",
    "french": "Réveiller (se)",
    "english": "Wake up"
  },
  {
    "medumba": "Nə̀ bamə",
    "french": "Rêver",
    "english": "Dream"
  },
  {
    "medumba": "Nə̀ zi njèm",
    "french": "Rêver",
    "english": "Dream"
  },
  {
    "medumba": "Nə̀ yen njèm",
    "french": "Rêverie",
    "english": "Daydream"
  },
  {
    "medumba": "Njèm",
    "french": "Revers (échec)",
    "english": "Setback (failure)"
  },
  {
    "medumba": "Bi",
    "french": "Revers (habits)",
    "english": "Lapel (clothes)"
  },
  {
    "medumba": "Njamnzwə",
    "french": "Revers (main)",
    "english": "Backhand (hand)"
  },
  {
    "medumba": "Njàmbu",
    "french": "Revers (main)",
    "english": "Backhand (hand)"
  },
  {
    "medumba": "Mvɛ̀nbu",
    "french": "Réviser",
    "english": "Revise"
  },
  {
    "medumba": "Nə̀ bwogtə",
    "french": "Révision",
    "english": "Revision"
  },
  {
    "medumba": "Nə̀bwogtə",
    "french": "Révolte",
    "english": "Revolt"
  },
  {
    "medumba": "Tǎtu",
    "french": "Révolte",
    "english": "Revolt"
  },
  {
    "medumba": "Cùꞌtə̀",
    "french": "Révolter",
    "english": "Revolt"
  },
  {
    "medumba": "Nə̀ kα̌g ncà",
    "french": "Révolter",
    "english": "Revolt"
  },
  {
    "medumba": "Nə tam mvɛ̀d",
    "french": "Révolter",
    "english": "Revolt"
  },
  {
    "medumba": "Nə̀ kǎm ntàntà",
    "french": "Révolter (se)",
    "english": "Revolt (oneself)"
  },
  {
    "medumba": "Nə̀ tem mvɛ̀d",
    "french": "Révolter (se)",
    "english": "Revolt (oneself)"
  },
  {
    "medumba": "Ntàntà",
    "french": "Révolution",
    "english": "Revolution"
  },
  {
    "medumba": "Nə̀gha",
    "french": "Révolution",
    "english": "Revolution"
  },
  {
    "medumba": "Nə̀tammvɛ̀d",
    "french": "Révolution",
    "english": "Revolution"
  },
  {
    "medumba": "Ngàntàntà",
    "french": "Révolutionnaire",
    "english": "Revolutionary"
  },
  {
    "medumba": "Ngàcǔꞌtu",
    "french": "Révolutionnaire",
    "english": "Revolutionary"
  },
  {
    "medumba": "Ngàtammvɛ̀d",
    "french": "Révolutionnaire",
    "english": "Revolutionary"
  },
  {
    "medumba": "Ngʉ̌nyὰm ntsə",
    "french": "Rhinocéroce",
    "english": "Rhinocerocosis"
  },
  {
    "medumba": "M̀αŋwʉ",
    "french": "Rhume",
    "english": "Cold"
  },
  {
    "medumba": "Ngànkαb",
    "french": "Riche",
    "english": "Rich"
  },
  {
    "medumba": "Cûdnk̀αb",
    "french": "Richesse",
    "english": "Wealth"
  },
  {
    "medumba": "Ŋuꞌtəsə (",
    "french": "Ride",
    "english": "Ride"
  },
  {
    "medumba": "Nzwə̂nzə̀ndα",
    "french": "Rideau",
    "english": "Curtain"
  },
  {
    "medumba": "Cɛ̂dndα",
    "french": "Rideau",
    "english": "Curtain"
  },
  {
    "medumba": "Nzwə̂tɔndα",
    "french": "Rideau",
    "english": "Curtain"
  },
  {
    "medumba": "Nə̀ ŋuꞌtə",
    "french": "Rider",
    "english": "Rider"
  },
  {
    "medumba": "Bα̌nbαn",
    "french": "Rein",
    "english": "Kidney"
  },
  {
    "medumba": "Sα̌mju",
    "french": "Rein",
    "english": "Kidney"
  },
  {
    "medumba": "Ngàzwì",
    "french": "Rieur",
    "english": "Laughing"
  },
  {
    "medumba": "Nə̀ zwǐ",
    "french": "Rire",
    "english": "Laugh"
  },
  {
    "medumba": "Zwì",
    "french": "Rire d’un condamner",
    "english": "Laugh at a condemner"
  },
  {
    "medumba": "Nə̀ siag nù",
    "french": "Rire d’un condamner",
    "english": "Laugh at a condemner"
  },
  {
    "medumba": "Nə̀ siag mɛ̀n",
    "french": "Rivage",
    "english": "Shore"
  },
  {
    "medumba": "Nkaŋntsə",
    "french": "Rival",
    "english": "Rival"
  },
  {
    "medumba": "Ngàmaŋndʉꞌ",
    "french": "Rival",
    "english": "Rival"
  },
  {
    "medumba": "Ngàsaꞌmbà",
    "french": "Rivaliser",
    "english": "Compete"
  },
  {
    "medumba": "Nə̀ bǎb ndʉꞌ",
    "french": "Rivaliser",
    "english": "Compete"
  },
  {
    "medumba": "Nə̀ maŋ nd̀uꞌ",
    "french": "Rivaliser",
    "english": "Compete"
  },
  {
    "medumba": "Nə̀ maŋə",
    "french": "Rivaliser",
    "english": "Compete"
  },
  {
    "medumba": "Nə̀ saꞌ mbàꞌ",
    "french": "Rivaliser",
    "english": "Compete"
  },
  {
    "medumba": "Nə̀ sab ndʉꞌ",
    "french": "Rivaliser qqn",
    "english": "Compete with someone"
  },
  {
    "medumba": "Maŋ",
    "french": "Rivalité",
    "english": "Rivalry"
  },
  {
    "medumba": "Maŋtə̀",
    "french": "Rivalité",
    "english": "Rivalry"
  },
  {
    "medumba": "Mbàꞌ",
    "french": "Rivalité",
    "english": "Rivalry"
  },
  {
    "medumba": "Ndʉꞌ",
    "french": "Rivalité",
    "english": "Rivalry"
  },
  {
    "medumba": "Ntàntà",
    "french": "Rivalité",
    "english": "Rivalry"
  },
  {
    "medumba": "Nkaŋntsə",
    "french": "Rive",
    "english": "Shore"
  },
  {
    "medumba": "Taꞌntsə",
    "french": "Rivière",
    "english": "River"
  },
  {
    "medumba": "Nkûnmèkale",
    "french": "Riz",
    "english": "Rice"
  },
  {
    "medumba": "Nα̌nkûnmèkale",
    "french": "Rizière",
    "english": "Rice field"
  },
  {
    "medumba": "Cěmntsə",
    "french": "Robinet",
    "english": "Faucet"
  },
  {
    "medumba": "Mbâzweꞌ",
    "french": "Rognon",
    "english": "Kidney"
  },
  {
    "medumba": "Mfə̀n",
    "french": "Roi",
    "english": "King"
  },
  {
    "medumba": "Nə̀ kəbe",
    "french": "Rompre",
    "english": "Break up"
  },
  {
    "medumba": "Nə̀ sɔ̌ wud",
    "french": "Rompre (avec)",
    "english": "Break up (with)"
  },
  {
    "medumba": "Nə̀ bəꞌtə",
    "french": "Rompre (pain)",
    "english": "Break (bread)"
  },
  {
    "medumba": "Nèsòŋ",
    "french": "Roseau",
    "english": "Reed"
  },
  {
    "medumba": "Nkǎꞌnə̀soŋ",
    "french": "Roseau",
    "english": "Reed"
  },
  {
    "medumba": "Bà",
    "french": "Rouge",
    "english": "Red"
  },
  {
    "medumba": "Nə̀ bǎ",
    "french": "Rougir",
    "english": "Blush"
  },
  {
    "medumba": "Nə̀ kǎŋ ncʉ̀ mi",
    "french": "Rougir (colère)",
    "english": "Blush (anger)"
  },
  {
    "medumba": "Banngʉa",
    "french": "Rouille",
    "english": "Rust"
  },
  {
    "medumba": "Kʉàfə",
    "french": "Rouille",
    "english": "Rust"
  },
  {
    "medumba": "Nə̀ cʉb banngʉa",
    "french": "Rouiller",
    "english": "Rust"
  },
  {
    "medumba": "Nə̀ bwoŋtə",
    "french": "Rouler",
    "english": "Roll"
  },
  {
    "medumba": "Nə̀ yaŋə",
    "french": "Rouler",
    "english": "Roll"
  },
  {
    "medumba": "Nə̀ yaŋtə",
    "french": "Roule plusieur foi",
    "english": "Roll several times"
  },
  {
    "medumba": "Nə̀ bwoŋə",
    "french": "Rouler qqch",
    "english": "Roll something"
  },
  {
    "medumba": "Nə̀ bwoŋə",
    "french": "Rouler qqn",
    "english": "Roll sb"
  },
  {
    "medumba": "Mα̂nzə̀",
    "french": "Route",
    "english": "Road"
  },
  {
    "medumba": "Nzə̀",
    "french": "Route",
    "english": "Road"
  },
  {
    "medumba": "Zǐnfə̀n",
    "french": "Royal démarche",
    "english": "Royal approach"
  },
  {
    "medumba": "Ngʉ̌fə̀n",
    "french": "Royal fac̩on",
    "english": "Royal style"
  },
  {
    "medumba": "Ngɔ̌mfə̀n",
    "french": "Royaume",
    "english": "Kingdom"
  },
  {
    "medumba": "Nǔfə̀n",
    "french": "Royauté",
    "english": "Royalty"
  },
  {
    "medumba": "Nəcâꞌntə",
    "french": "Ruisseau",
    "english": "Stream"
  },
  {
    "medumba": "Fin",
    "french": "Rumeur",
    "english": "Rumor"
  },
  {
    "medumba": "Mfʉ",
    "french": "Ruse",
    "english": "Cunning"
  },
  {
    "medumba": "Nkʉ̂nkʉ",
    "french": "Ruse",
    "english": "Cunning"
  },
  {
    "medumba": "Mɛ̀nmfʉ",
    "french": "Rusé",
    "english": "Cunning"
  },
  {
    "medumba": "Ngànkʉ̂nkʉ",
    "french": "Rusé",
    "english": "Cunning"
  },
  {
    "medumba": "Bὰm 3/6)",
    "french": "Sac",
    "english": "Bag"
  },
  {
    "medumba": "Nə̀yoꞌo",
    "french": "Sacre",
    "english": "Sacre"
  },
  {
    "medumba": "Nə̀ yoꞌo",
    "french": "Sacrer",
    "english": "Sacre"
  },
  {
    "medumba": "Ngàkangeꞌ",
    "french": "Sadique",
    "english": "Sadist"
  },
  {
    "medumba": "NgàyabngəꞋ",
    "french": "Sadique",
    "english": "Sadist"
  },
  {
    "medumba": "Njǎbngeꞌ",
    "french": "Sadique",
    "english": "Sadist"
  },
  {
    "medumba": "Nkûmmɛ̀n",
    "french": "Sage",
    "english": "Wise"
  },
  {
    "medumba": "Nzə̂nù",
    "french": "Sage",
    "english": "Wise"
  },
  {
    "medumba": "Zə̂nù",
    "french": "Sagesse",
    "english": "Wisdom"
  },
  {
    "medumba": "Kə̀mbɛ̀n",
    "french": "Sain",
    "english": "Healthy"
  },
  {
    "medumba": "Kə̀ŋuꞌu",
    "french": "Sain",
    "english": "Healthy"
  },
  {
    "medumba": "Kə̀ghòn",
    "french": "Sain",
    "english": "Healthy"
  },
  {
    "medumba": "Mɛ̀nnelαnə",
    "french": "Saint",
    "english": "Holy"
  },
  {
    "medumba": "Ywɛnəlαne",
    "french": "Saint-esprit",
    "english": "holy spirit"
  },
  {
    "medumba": "Lαn",
    "french": "Sainteté",
    "english": "Holiness"
  },
  {
    "medumba": "Nèlαnə",
    "french": "Sainteté",
    "english": "Holiness"
  },
  {
    "medumba": "Ngə̀ləŋ",
    "french": "Saison",
    "english": "Season"
  },
  {
    "medumba": "Ndʉ",
    "french": "Saison",
    "english": "Season"
  },
  {
    "medumba": "Ndʉ̌sαnə",
    "french": "Saison de pluie",
    "english": "Rainy season"
  },
  {
    "medumba": "Ndʉ̌dùm",
    "french": "Saison sèche",
    "english": "Dry season"
  },
  {
    "medumba": "Nkα̂fbfàꞌ",
    "french": "Salaire",
    "english": "Salary"
  },
  {
    "medumba": "Ncôꞌfàꞌ",
    "french": "Salaire",
    "english": "Salary"
  },
  {
    "medumba": "Ngàlǒꞌnkα̂bŋwʉ (1/6",
    "french": "Salarié",
    "english": "Employee"
  },
  {
    "medumba": "Ntsi",
    "french": "Salive",
    "english": "Saliva"
  },
  {
    "medumba": "Ntsi nə̀ sə̌ꞌ ncù",
    "french": "Saliver",
    "english": "Salivate"
  },
  {
    "medumba": "Ndα",
    "french": "Salle",
    "english": "Room"
  },
  {
    "medumba": "Tôꞌndα",
    "french": "Salle",
    "english": "Room"
  },
  {
    "medumba": "Ndα̂diaŋyən",
    "french": "Salle de cinéma",
    "english": "Cinema room"
  },
  {
    "medumba": "Tôꞌjûjʉ",
    "french": "Salle à manger",
    "english": "Dining room"
  },
  {
    "medumba": "Ndα̂nsα",
    "french": "Salle cabalistique",
    "english": "Cabalistic room"
  },
  {
    "medumba": "Ndα̂nkʉ̀n",
    "french": "Salle d’annonce",
    "english": "Announcement room"
  },
  {
    "medumba": "Ndα̂beb",
    "french": "Salle d’attente",
    "english": "Waiting room"
  },
  {
    "medumba": "Ndα̂ncà",
    "french": "Salle d’audience",
    "english": "Courtroom"
  },
  {
    "medumba": "Fə̌ꞌ ntsə",
    "french": "Salle d’eau",
    "english": "Powder room"
  },
  {
    "medumba": "Ndα̂nto",
    "french": "Salle d’injections",
    "english": "Injection room"
  },
  {
    "medumba": "Ndα̂nùbαhα",
    "french": "Salle d’urgence",
    "english": "Emergency room"
  },
  {
    "medumba": "Fěꞌntsə",
    "french": "Salle de bain",
    "english": "Bathroom"
  },
  {
    "medumba": "Fə̌ꞌsògwud",
    "french": "Salle de bain",
    "english": "Bathroom"
  },
  {
    "medumba": "Ndα̂ŋwàꞌnì",
    "french": "Salle de classe",
    "english": "Classroom"
  },
  {
    "medumba": "Ndα̂ki",
    "french": "Salle de dactylographie",
    "english": "Typing room"
  },
  {
    "medumba": "Ndα̂mfaŋə",
    "french": "Salle de pansement",
    "english": "Dressing room"
  },
  {
    "medumba": "Ndα̂fiꞌ",
    "french": "Salle de pesée",
    "english": "Weighing room"
  },
  {
    "medumba": "Ndα̂mαbwə",
    "french": "Salle des nouveaux-nés",
    "english": "Newborn room"
  },
  {
    "medumba": "Nə̀ càꞌtə",
    "french": "Saluer",
    "english": "Greet"
  },
  {
    "medumba": "Nə̀ bʉ mɛ̀n",
    "french": "Saluer",
    "english": "Greet"
  },
  {
    "medumba": "Càꞌtə̀",
    "french": "Salut",
    "english": "Hi"
  },
  {
    "medumba": "Yòg",
    "french": "Salut",
    "english": "Hi"
  },
  {
    "medumba": "Càꞌtə",
    "french": "Salutation",
    "english": "Greeting"
  },
  {
    "medumba": "Ləm",
    "french": "Sang",
    "english": "Blood"
  },
  {
    "medumba": "Ngʉ̌nyαmcwɛd",
    "french": "Sanglier",
    "english": "Boar"
  },
  {
    "medumba": "Nkǎmnkù",
    "french": "Sanglier",
    "english": "Boar"
  },
  {
    "medumba": "Kə̀shʉꞌ",
    "french": "Sanglot",
    "english": "Sob"
  },
  {
    "medumba": "Nə̀ tam kə̀shʉꞌ",
    "french": "Sangloter",
    "english": "Sobbing"
  },
  {
    "medumba": "Ngàfɛ̀dtə̌ ləm",
    "french": "Sanguinaire",
    "english": "Bloodthirsty"
  },
  {
    "medumba": "Ntsəꞌtə ghǎncoꞌtə̀ ncà",
    "french": "Sanhédrin",
    "english": "Sanhedrin"
  },
  {
    "medumba": "Kə̀",
    "french": "Sans",
    "english": "Without"
  },
  {
    "medumba": "Kə̀ndα",
    "french": "Sans abri",
    "english": "Homeless"
  },
  {
    "medumba": "Kə̀juꞌnzə̀",
    "french": "Sans discernement",
    "english": "Without discernment"
  },
  {
    "medumba": "Nyaꞌ",
    "french": "Sauce",
    "english": "Sauce"
  },
  {
    "medumba": "Sogə",
    "french": "Sauce",
    "english": "Sauce"
  },
  {
    "medumba": "Kə̀càd",
    "french": "Saut",
    "english": "Jump"
  },
  {
    "medumba": "Nə̀ laŋ nɛ̂n tʉ",
    "french": "Sauter",
    "english": "Jump"
  },
  {
    "medumba": "Nə̀ coꞌkə̀càd",
    "french": "Sauter",
    "english": "Jump"
  },
  {
    "medumba": "Nə̀ ywɛlə",
    "french": "Sauter",
    "english": "Jump"
  },
  {
    "medumba": "Ngamntαn",
    "french": "Sauterelle",
    "english": "Grasshopper"
  },
  {
    "medumba": "Ngàcoꞌ kə̀càb",
    "french": "Sauteur",
    "english": "Jumper"
  },
  {
    "medumba": "Nə̀ yògə",
    "french": "Sauver",
    "english": "Save"
  },
  {
    "medumba": "Ngàyòg",
    "french": "Sauveur",
    "english": "Savior"
  },
  {
    "medumba": "Zəmətə",
    "french": "Savant",
    "english": "Scholar"
  },
  {
    "medumba": "Ndʉ̌mju",
    "french": "Saveur",
    "english": "Flavor"
  },
  {
    "medumba": "Nə̀ lɛ̀nə",
    "french": "Savoir",
    "english": "Know"
  },
  {
    "medumba": "Sòg",
    "french": "Savon",
    "english": "Soap"
  },
  {
    "medumba": "Sògnzwə",
    "french": "Savon à linge",
    "english": "Laundry soap"
  },
  {
    "medumba": "Sògwud",
    "french": "Savon de toillette",
    "english": "Toilet soap"
  },
  {
    "medumba": "Kələꞌə",
    "french": "Scandale",
    "english": "Scandal"
  },
  {
    "medumba": "Lǒŋfaꞌtə̀",
    "french": "Scandale",
    "english": "Scandal"
  },
  {
    "medumba": "Nùkə̀bwɔ̀",
    "french": "Scandale",
    "english": "Scandal"
  },
  {
    "medumba": "Ywiꞌ",
    "french": "Scandale",
    "english": "Scandal"
  },
  {
    "medumba": "Mα̂kwa",
    "french": "Sceau",
    "english": "Seal"
  },
  {
    "medumba": "Sitαm",
    "french": "Sceau",
    "english": "Seal"
  },
  {
    "medumba": "Nə̀ fʉ̀nə",
    "french": "Sceller",
    "english": "Seal"
  },
  {
    "medumba": "Nə̀ tə sitαm",
    "french": "Sceller",
    "english": "Seal"
  },
  {
    "medumba": "Dʉ̌ꞌ diaŋə",
    "french": "Scène",
    "english": "Scene"
  },
  {
    "medumba": "Diaŋə",
    "french": "Scène spectacle",
    "english": "Stage show"
  },
  {
    "medumba": "Diaŋmàꞌ",
    "french": "Scène de tire",
    "english": "Shooting scene"
  },
  {
    "medumba": "Diaŋjʉ",
    "french": "Scène gastronomique",
    "english": "Food scene"
  },
  {
    "medumba": "Kogfə̀n",
    "french": "Sceptre",
    "english": "Scepter"
  },
  {
    "medumba": "Sɔ",
    "french": "Scie",
    "english": "Saw"
  },
  {
    "medumba": "Ngαmə",
    "french": "Science",
    "english": "Science"
  },
  {
    "medumba": "Nə̀ ziαgə",
    "french": "Scintiller",
    "english": "Sparkle"
  },
  {
    "medumba": "Nənyaꞌcum",
    "french": "Scorpion",
    "english": "Scorpio"
  },
  {
    "medumba": "Nə̀ komə",
    "french": "Sculpter",
    "english": "Sculpt"
  },
  {
    "medumba": "Nə̀ vɛnə",
    "french": "Déssiner",
    "english": "Draw"
  },
  {
    "medumba": "Nəto",
    "french": "Sculpture",
    "english": "Sculpture"
  },
  {
    "medumba": "Jum",
    "french": "Sec",
    "english": "Dry"
  },
  {
    "medumba": "Nə̀ yagə",
    "french": "Sécher",
    "english": "Dry"
  },
  {
    "medumba": "Nə̀ jumə",
    "french": "Sécher",
    "english": "Dry"
  },
  {
    "medumba": "Dùm",
    "french": "Sécheresse",
    "english": "Drought"
  },
  {
    "medumba": "Nə̀ nyìꞌtə̌",
    "french": "Secouer",
    "english": "Shake"
  },
  {
    "medumba": "Nə̀ ywìmtə̌",
    "french": "Secourir",
    "english": "Rescue"
  },
  {
    "medumba": "Ywìntə̀",
    "french": "Secours",
    "english": "Rescue"
  },
  {
    "medumba": "Càm",
    "french": "Secret",
    "english": "Secret"
  },
  {
    "medumba": "Njàm càm",
    "french": "Secret (en)",
    "english": "Secret"
  },
  {
    "medumba": "Ndèꞌcàm",
    "french": "Secrétaire",
    "english": "Secretary"
  },
  {
    "medumba": "Ngàkitə̀",
    "french": "Secrétaire",
    "english": "Secretary"
  },
  {
    "medumba": "Ndα̂càm",
    "french": "Secrétariat",
    "english": "Secretariat"
  },
  {
    "medumba": "Ndα̂kì",
    "french": "Secrétariat",
    "english": "Secretariat"
  },
  {
    "medumba": "Njàm càm",
    "french": "Secrètement",
    "english": "Secretly"
  },
  {
    "medumba": "Ghǎfagtə̀",
    "french": "Sectaires",
    "english": "Sectarians"
  },
  {
    "medumba": "Fàgtə",
    "french": "Secte",
    "english": "Sect"
  },
  {
    "medumba": "Ngàcǔꞌtù",
    "french": "Séducteur",
    "english": "Seducer"
  },
  {
    "medumba": "Cùꞌtu",
    "french": "Séduction",
    "english": "Seduction"
  },
  {
    "medumba": "Nə̀ kwabtə mɛ̀n",
    "french": "Séduire",
    "english": "Seduce"
  },
  {
    "medumba": "Nə̀ cǔꞌ tu",
    "french": "Séduire",
    "english": "Seduce"
  },
  {
    "medumba": "Bʉn",
    "french": "Sein",
    "english": "Breast"
  },
  {
    "medumba": "Tʉ̂mbàm",
    "french": "Sein dans le ventre",
    "english": "Breast in the stomach"
  },
  {
    "medumba": "Ntʉ̀m",
    "french": "Sein dans,parmi",
    "english": "Breast in,among"
  },
  {
    "medumba": "Ngwa",
    "french": "Sel",
    "english": "Salt"
  },
  {
    "medumba": "Ndǎŋndaŋ",
    "french": "Selon",
    "english": "According to"
  },
  {
    "medumba": "Ngὰbnjʉ",
    "french": "Semaine",
    "english": "Week"
  },
  {
    "medumba": "Ngὰbnju diaŋntsiꞌi",
    "french": "Semaine culturelle",
    "english": "Cultural week"
  },
  {
    "medumba": "Mfunì",
    "french": "Semblable",
    "english": "Similar"
  },
  {
    "medumba": "Nzwid",
    "french": "Semence",
    "english": "Seed"
  },
  {
    "medumba": "Nə̀ ywilə",
    "french": "Semer",
    "english": "Sow"
  },
  {
    "medumba": "Ngàmǎꞌnsa",
    "french": "Semeur",
    "english": "Sower"
  },
  {
    "medumba": "Ngàywìd",
    "french": "Semeur",
    "english": "Sower"
  },
  {
    "medumba": "Nə̀ ghù ləm",
    "french": "Sentiment",
    "english": "Feeling"
  },
  {
    "medumba": "Ntsə",
    "french": "Sentiment",
    "english": "Feeling"
  },
  {
    "medumba": "Nə̀ làmtə̌",
    "french": "Sentir bon",
    "english": "Feel good"
  },
  {
    "medumba": "Nə̀ làmə",
    "french": "Sentir mauvais",
    "english": "Feel bad"
  },
  {
    "medumba": "Fàgtə̀",
    "french": "Séparation",
    "english": "Separation"
  },
  {
    "medumba": "Nə̀ fàgtə̌",
    "french": "Séparer",
    "english": "Separate"
  },
  {
    "medumba": "Sὰmmbαhα",
    "french": "Sept",
    "english": "Seven"
  },
  {
    "medumba": "Mbattə̀ sὰmmbαhα",
    "french": "Septième",
    "english": "Seventh"
  },
  {
    "medumba": "Fì",
    "french": "Sépulcre",
    "english": "Sepulcher"
  },
  {
    "medumba": "Tûfì",
    "french": "Sépulcre",
    "english": "Sepulcher"
  },
  {
    "medumba": "Mfə",
    "french": "Serment",
    "english": "Oath"
  },
  {
    "medumba": "Nə̀ kǎnmfə",
    "french": "Serment prêter",
    "english": "Oath to take"
  },
  {
    "medumba": "Nyu",
    "french": "Serpent",
    "english": "Snake"
  },
  {
    "medumba": "Nə̀ faꞌa",
    "french": "Servir",
    "english": "Serve"
  },
  {
    "medumba": "Mɔnkəꞌ",
    "french": "Serviteur",
    "english": "Servant"
  },
  {
    "medumba": "Ngàfaꞌ",
    "french": "Serviteur",
    "english": "Servant"
  },
  {
    "medumba": "Nkʉꞌ",
    "french": "Seuil",
    "english": "Threshold"
  },
  {
    "medumba": "Tʉ̀ꞌ",
    "french": "Seuil",
    "english": "Threshold"
  },
  {
    "medumba": "Tʉꞌmə",
    "french": "Seul moi",
    "english": "Only me"
  },
  {
    "medumba": "Ŋα",
    "french": "Sève",
    "english": "Sap"
  },
  {
    "medumba": "Ngàcʉag",
    "french": "Sevère (qqn)",
    "english": "Severe (sb)"
  },
  {
    "medumba": "Nə̀cʉag",
    "french": "Sévère",
    "english": "Severe"
  },
  {
    "medumba": "Cʉag",
    "french": "Sévérité",
    "english": "Severity"
  },
  {
    "medumba": "Ngǔꞌnkʉ",
    "french": "Siècle",
    "english": "Century"
  },
  {
    "medumba": "Ngǔꞌnguꞌ",
    "french": "Siècle",
    "english": "Century"
  },
  {
    "medumba": "Kòꞌ",
    "french": "Siège",
    "english": "Headquarters"
  },
  {
    "medumba": "Ntshaŋ mbùmtə̀",
    "french": "Siège association",
    "english": "Association headquarters"
  },
  {
    "medumba": "Ntshaŋ dʉꞌfàꞌ",
    "french": "Siège entreprise",
    "english": "Company headquarters"
  },
  {
    "medumba": "Kàmnkòꞌ",
    "french": "Siège en bois",
    "english": "Wooden seat"
  },
  {
    "medumba": "Fin",
    "french": "Sifflement",
    "english": "Hissing"
  },
  {
    "medumba": "Nə tɔ",
    "french": "Siffler",
    "english": "Whistle"
  },
  {
    "medumba": "Nə̀ tɔ fin",
    "french": "Siffler",
    "english": "Whistle"
  },
  {
    "medumba": "Nə̀ tɔ fin",
    "french": "Siffler",
    "english": "Whistle"
  },
  {
    "medumba": "Ndɔ",
    "french": "Sifflet",
    "english": "Whistle"
  },
  {
    "medumba": "Ngàŋoꞌtùn",
    "french": "Signataire",
    "english": "Signatory"
  },
  {
    "medumba": "Ngàshan",
    "french": "Signataire",
    "english": "Signatory"
  },
  {
    "medumba": "Kə̀kì",
    "french": "Signe",
    "english": "Sign"
  },
  {
    "medumba": "L̀ɛ̀n",
    "french": "Signe",
    "english": "Sign"
  },
  {
    "medumba": "Nə̀ ŋuꞌtùn",
    "french": "Signer",
    "english": "Sign"
  },
  {
    "medumba": "Mbagtə̀",
    "french": "Signification",
    "english": "Meaning"
  },
  {
    "medumba": "Tùn",
    "french": "Signification",
    "english": "Meaning"
  },
  {
    "medumba": "Nə̀ bàgtə̌",
    "french": "Signifier",
    "english": "Meaning"
  },
  {
    "medumba": "Nə̀ tswìtə̌",
    "french": "Signifier",
    "english": "Meaning"
  },
  {
    "medumba": "Nkαnmαkə̀",
    "french": "Signe",
    "english": "Sign"
  },
  {
    "medumba": "Mbǎbngò",
    "french": "Silure",
    "english": "Catfish"
  },
  {
    "medumba": "Ngǒntsə",
    "french": "Sirène",
    "english": "Mermaid"
  },
  {
    "medumba": "Ntoge",
    "french": "Six",
    "english": "Six"
  },
  {
    "medumba": "Mbadtə̀ ntogə",
    "french": "Sixième",
    "english": "Sixth"
  },
  {
    "medumba": "Kum",
    "french": "Société",
    "english": "Company"
  },
  {
    "medumba": "Kumfàꞌ",
    "french": "Société",
    "english": "Company"
  },
  {
    "medumba": "Mαnjɔ̀",
    "french": "Société",
    "english": "Company"
  },
  {
    "medumba": "Ngɔ̀",
    "french": "Société",
    "english": "Company"
  },
  {
    "medumba": "Njʉ",
    "french": "Société",
    "english": "Company"
  },
  {
    "medumba": "Ngònmα",
    "french": "Sœur",
    "english": "Sister"
  },
  {
    "medumba": "Ngòntα",
    "french": "Soeur",
    "english": "Sister"
  },
  {
    "medumba": "Mαdu",
    "french": "Sœur du mari",
    "english": "Husband's sister"
  },
  {
    "medumba": "Silige",
    "french": "Sole",
    "english": "Sole"
  },
  {
    "medumba": "Nzì",
    "french": "Soif",
    "english": "Thirst"
  },
  {
    "medumba": "Kʉntʉ",
    "french": "Soif",
    "english": "Thirst"
  },
  {
    "medumba": "Nzintse (",
    "french": "Soif d’eau",
    "english": "Thirst for water"
  },
  {
    "medumba": "Nzindùꞌ",
    "french": "Soif de vin",
    "english": "Thirst for wine"
  },
  {
    "medumba": "Mfə̌dnjʉ",
    "french": "Soir",
    "english": "Evening"
  },
  {
    "medumba": "Ndʉ̌mfə̌dnjʉ",
    "french": "Soirée",
    "english": "Evening"
  },
  {
    "medumba": "Tɛ̌ndndα",
    "french": "Sol de la maison",
    "english": "House floor"
  },
  {
    "medumba": "Nsîndα",
    "french": "Sol de la maison",
    "english": "House floor"
  },
  {
    "medumba": "Nsi",
    "french": "Sol",
    "english": "Ground"
  },
  {
    "medumba": "Caꞌa",
    "french": "Sol",
    "english": "Ground"
  },
  {
    "medumba": "Màꞌncò",
    "french": "Soldat",
    "english": "Soldier"
  },
  {
    "medumba": "Nkə̀tuꞌu",
    "french": "Soldat",
    "english": "Soldier"
  },
  {
    "medumba": "Soyè",
    "french": "Soldat",
    "english": "Soldier"
  },
  {
    "medumba": "Nyàm",
    "french": "Soleil",
    "english": "Sun"
  },
  {
    "medumba": "Nyàm nə̀ bi",
    "french": "Soleil disparaître",
    "english": "Sun disappear"
  },
  {
    "medumba": "Nə̀ ta nyàm",
    "french": "Soleil faire",
    "english": "Sun do"
  },
  {
    "medumba": "Miaglo",
    "french": "Sommeil",
    "english": "Sleep"
  },
  {
    "medumba": "Nə̀ mə̌ miɛglo",
    "french": "Sommeiller",
    "english": "Sleep"
  },
  {
    "medumba": "Ngàmə̌ꞌmiαglo",
    "french": "Sommeilleuŗ",
    "english": "Sleepy"
  },
  {
    "medumba": "Miαglo",
    "french": "Somnolence",
    "english": "Drowsiness"
  },
  {
    "medumba": "Nə̀ mə̌ꞌmiαglo",
    "french": "Somnoler",
    "english": "Dozing"
  },
  {
    "medumba": "Nə̀ càŋtə̌ miαglo",
    "french": "Somnoler",
    "english": "Dozing"
  },
  {
    "medumba": "Nzə̀",
    "french": "Son",
    "english": "Sound"
  },
  {
    "medumba": "Fin",
    "french": "Son",
    "english": "Sound"
  },
  {
    "medumba": "Cùꞌtə̀",
    "french": "Son",
    "english": "Sound"
  },
  {
    "medumba": "Nə̀ diàg ntùn",
    "french": "Sonder",
    "english": "Probe"
  },
  {
    "medumba": "Nə̀ mùmtə̌",
    "french": "Sonder",
    "english": "Probe"
  },
  {
    "medumba": "Nə̀ toŋnù",
    "french": "Sonder",
    "english": "Probe"
  },
  {
    "medumba": "Nə̀ zwəꞌtə",
    "french": "Sonder",
    "english": "Probe"
  },
  {
    "medumba": "Nə̀ zwəꞌtə",
    "french": "Sonder",
    "english": "Probe"
  },
  {
    "medumba": "Nə̀ yən njèm",
    "french": "Songe",
    "english": "Dream"
  },
  {
    "medumba": "Nə̀ lab ŋwa",
    "french": "Songer",
    "english": "Think"
  },
  {
    "medumba": "Nə̀ buꞌŋwa",
    "french": "Sonner",
    "english": "Ring"
  },
  {
    "medumba": "Nə̀ tamŋwa",
    "french": "Sonner",
    "english": "Ring"
  },
  {
    "medumba": "Ŋwa",
    "french": "Sonner",
    "english": "Ring"
  },
  {
    "medumba": "Nzə̀ŋwa",
    "french": "Sonnerie",
    "english": "Ringtone"
  },
  {
    "medumba": "Nsα",
    "french": "Sonnerie",
    "english": "Ringtone"
  },
  {
    "medumba": "Ngàkà",
    "french": "Sorcellerie",
    "english": "Witchcraft"
  },
  {
    "medumba": "Ngà̀nsὰ",
    "french": "Socier",
    "english": "Social"
  },
  {
    "medumba": "Nǔ mɛ̀n",
    "french": "Sort",
    "english": "Fate"
  },
  {
    "medumba": "Tɔ̀",
    "french": "Sort",
    "english": "Fate"
  },
  {
    "medumba": "Nə̀ tumə",
    "french": "Sortie",
    "english": "Exit"
  },
  {
    "medumba": "Nzə̀ndα",
    "french": "Sortie",
    "english": "Exit"
  },
  {
    "medumba": "Nzə̀netumə",
    "french": "Sortie",
    "english": "Exit"
  },
  {
    "medumba": "Nə̀ tumə",
    "french": "Sortir",
    "english": "Go out"
  },
  {
    "medumba": "Cən",
    "french": "Sot",
    "english": "Fool"
  },
  {
    "medumba": "Ngàfèmni",
    "french": "Sot",
    "english": "Fool"
  },
  {
    "medumba": "Nkὰgnì",
    "french": "Sot",
    "english": "Fool"
  },
  {
    "medumba": "Lə",
    "french": "Soubassement",
    "english": "Basement"
  },
  {
    "medumba": "Tǔnbàꞌ",
    "french": "Soubassement",
    "english": "Basement"
  },
  {
    "medumba": "Kɔ̌tùn",
    "french": "Souche",
    "english": "Strain"
  },
  {
    "medumba": "Fəꞌnkʉα",
    "french": "Souche de palme de raphia",
    "english": "Raffia palm strain"
  },
  {
    "medumba": "Vênkʉα",
    "french": "Souche de raphia mort",
    "english": "Dead raffia stump"
  },
  {
    "medumba": "Nzwiàg",
    "french": "Souffle",
    "english": "Breath"
  },
  {
    "medumba": "Ywɛlə",
    "french": "Souffle",
    "english": "Breath"
  },
  {
    "medumba": "Nə̀ fʉαgə",
    "french": "Souffler",
    "english": "Blowing"
  },
  {
    "medumba": "Ngàfʉαg",
    "french": "Souffleur",
    "english": "Blower"
  },
  {
    "medumba": "Ngəꞌ",
    "french": "Souffrance",
    "english": "Suffering"
  },
  {
    "medumba": "Ngʉ̀dnì",
    "french": "Souffrance",
    "english": "Suffering"
  },
  {
    "medumba": "Nsòbnì",
    "french": "Souffrance",
    "english": "Suffering"
  },
  {
    "medumba": "Ntobnì",
    "french": "Souffrance",
    "english": "Suffering"
  },
  {
    "medumba": "Nə̀ fɛd nsɔ",
    "french": "Souffrir",
    "english": "Suffer"
  },
  {
    "medumba": "Nə̀ yənngəꞌ",
    "french": "Souffrir",
    "english": "Suffer"
  },
  {
    "medumba": "Solfὰ",
    "french": "Soufre",
    "english": "Sulfur"
  },
  {
    "medumba": "Nə̀ sαgtə",
    "french": "Souiller",
    "english": "Defile"
  },
  {
    "medumba": "Nə̀ tam tûmə",
    "french": "Souiller",
    "english": "Defile"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Souillure",
    "english": "Defilement"
  },
  {
    "medumba": "Mbɛ̀n",
    "french": "Souillure",
    "english": "Defilement"
  },
  {
    "medumba": "Nə̀ bʉꞌʉ",
    "french": "Soulever",
    "english": "Lift"
  },
  {
    "medumba": "Mkətoꞌo",
    "french": "Soupir",
    "english": "Sigh"
  },
  {
    "medumba": "Zwiὰg",
    "french": "Soupirer",
    "english": "Sigh"
  },
  {
    "medumba": "Nə̀ zwiὰgə",
    "french": "Source point d’eau",
    "english": "Source water point"
  },
  {
    "medumba": "Lα̂ntsə",
    "french": "Source",
    "english": "Source"
  },
  {
    "medumba": "Tûmnsntsə",
    "french": "Source endroit",
    "english": "Source location"
  },
  {
    "medumba": "Lα̂gbwə",
    "french": "Source",
    "english": "Source"
  },
  {
    "medumba": "Kaŋlαg",
    "french": "Sourcil",
    "english": "Eyebrow"
  },
  {
    "medumba": "Mbuꞌntoŋ",
    "french": "Sourd",
    "english": "Deaf"
  },
  {
    "medumba": "Mbuꞌntoŋkə̀cob",
    "french": "Sourd-muet",
    "english": "Deaf-mute"
  },
  {
    "medumba": "Nə̀ nyǔꞌzwì",
    "french": "Sourire",
    "english": "Smile"
  },
  {
    "medumba": "Cə̌dkù",
    "french": "Souris",
    "english": "Mouse"
  },
  {
    "medumba": "Fiaŋmα̂mbà",
    "french": "Sournois",
    "english": "Sneaky"
  },
  {
    "medumba": "Mfənntəꞌ",
    "french": "Sous-chef",
    "english": "Sous chef"
  },
  {
    "medumba": "Zǐkum",
    "french": "Sous-vêtement",
    "english": "Underwear"
  },
  {
    "medumba": "Màꞌtə̀",
    "french": "Souscription",
    "english": "Subscription"
  },
  {
    "medumba": "Nə̀ màꞌtə̌",
    "french": "Souscrire",
    "english": "Subscribe"
  },
  {
    "medumba": "Nə̀ tomtə",
    "french": "Soutenir",
    "english": "Support"
  },
  {
    "medumba": "Ntom",
    "french": "Soutien",
    "english": "Support"
  },
  {
    "medumba": "Nə̀kwimtə",
    "french": "Souvenir",
    "english": "Memory"
  },
  {
    "medumba": "Nə̀ kwimtə",
    "french": "Souvenir se",
    "english": "Memory"
  },
  {
    "medumba": "Tûmlam",
    "french": "Spécial",
    "english": "Special"
  },
  {
    "medumba": "Diaŋyən",
    "french": "Spectacle",
    "english": "Show"
  },
  {
    "medumba": "Nəto",
    "french": "Statue",
    "english": "Statue"
  },
  {
    "medumba": "Ntsəmɛ̀n",
    "french": "Stature",
    "english": "Stature"
  },
  {
    "medumba": "Ngǎncʉꞌ",
    "french": "Statut",
    "english": "Status"
  },
  {
    "medumba": "Kə̀bwə",
    "french": "Stérile",
    "english": "Sterile"
  },
  {
    "medumba": "Bûvə̀",
    "french": "Style artistique",
    "english": "Artistic style"
  },
  {
    "medumba": "Kʉdfi",
    "french": "Stylo",
    "english": "Pen"
  },
  {
    "medumba": "Nə̀ jʉ ndα",
    "french": "Succéder",
    "english": "Succeed"
  },
  {
    "medumba": "Njʉndα",
    "french": "Successeur",
    "english": "Successor"
  },
  {
    "medumba": "Nə̀ finə",
    "french": "Sucer",
    "english": "Suck"
  },
  {
    "medumba": "Nə̀ nyo",
    "french": "Sucer",
    "english": "Suck"
  },
  {
    "medumba": "Dʉ̀mtə̀",
    "french": "Sucre",
    "english": "Sugar"
  },
  {
    "medumba": "Ntɛ̀n",
    "french": "Sud",
    "english": "South"
  },
  {
    "medumba": "Mα ntɛ̀n",
    "french": "Sud  au",
    "english": "South to"
  },
  {
    "medumba": "Nə̀ bɛd zəꞌnì",
    "french": "Suer",
    "english": "Sweat"
  },
  {
    "medumba": "Nə̀ kwiaŋ zə̀ꞌni",
    "french": "Suer",
    "english": "Sweat"
  },
  {
    "medumba": "Zəꞌnì",
    "french": "Sueur",
    "english": "Sweat"
  },
  {
    "medumba": "Nə̀ kùꞌu",
    "french": "Suffir",
    "english": "Enough"
  },
  {
    "medumba": "Nəkuꞌu",
    "french": "Suffisance",
    "english": "Sufficiency"
  },
  {
    "medumba": "Mbì",
    "french": "Suicide",
    "english": "Suicide"
  },
  {
    "medumba": "Nə̀ ghə̌d mbì",
    "french": "Suicider se",
    "english": "Commit suicide"
  },
  {
    "medumba": "Nə̀ bə̀lə",
    "french": "Suivre",
    "english": "Follow"
  },
  {
    "medumba": "Nə̀ bwə̌",
    "french": "Suivre",
    "english": "Follow"
  },
  {
    "medumba": "Nə̀ tam njàm",
    "french": "Suivre",
    "english": "Follow"
  },
  {
    "medumba": "Tûnù",
    "french": "Sujet",
    "english": "Subject"
  },
  {
    "medumba": "Mɔnkəꞌ",
    "french": "Sujet",
    "english": "Subject"
  },
  {
    "medumba": "Bùꞌ",
    "french": "Sujet",
    "english": "Subject"
  },
  {
    "medumba": "Nkwan",
    "french": "Sujet",
    "english": "Subject"
  },
  {
    "medumba": "Mɛ̀nndʉb",
    "french": "Supérieur",
    "english": "Superior"
  },
  {
    "medumba": "Ndʉb",
    "french": "Supérieur",
    "english": "Superior"
  },
  {
    "medumba": "Nə̀ bàtə̌",
    "french": "Suppléer",
    "english": "Substitute"
  },
  {
    "medumba": "Lə̀ꞌtə̀",
    "french": "Supplication",
    "english": "supplication"
  },
  {
    "medumba": "Nə̀ mǎꞌmbu",
    "french": "Supplier",
    "english": "Supplier"
  },
  {
    "medumba": "Ntom",
    "french": "Supplier",
    "english": "Supplier"
  },
  {
    "medumba": "Nə̀ fɛntə",
    "french": "Sopportet",
    "english": "Soportet"
  },
  {
    "medumba": "Nə̀ tomtə",
    "french": "Supporter",
    "english": "Support"
  },
  {
    "medumba": "Nùm",
    "french": "Supporter",
    "english": "Support"
  },
  {
    "medumba": "Nə̀ cob kὰn mfə",
    "french": "Sûr",
    "english": "Safe"
  },
  {
    "medumba": "Nə̀ cob nsôbvə",
    "french": "Sûr",
    "english": "Safe"
  },
  {
    "medumba": "Ndébàꞌ",
    "french": "Tabac",
    "english": "Tobacco"
  },
  {
    "medumba": "Nə̀ ghud tǔn mɛ̀n",
    "french": "Tabac passer à",
    "english": "Tobacco move to"
  },
  {
    "medumba": "Nkòꞌ",
    "french": "Table",
    "english": "Table"
  },
  {
    "medumba": "Teblè",
    "french": "Table",
    "english": "Table"
  },
  {
    "medumba": "Nkòꞌjujʉ",
    "french": "Table à manger",
    "english": "Dining table"
  },
  {
    "medumba": "Nkòꞌcaŋ",
    "french": "Table à manger",
    "english": "Dining table"
  },
  {
    "medumba": "Nkǒꞌfàꞌ",
    "french": "Table de travail",
    "english": "Work table"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Tache",
    "english": "Stain"
  },
  {
    "medumba": "Fàꞌ",
    "french": "Tache",
    "english": "Stain"
  },
  {
    "medumba": "Ncǒbncob",
    "french": "Tacheté",
    "english": "Spotted"
  },
  {
    "medumba": "Ncǒbncob fogtab",
    "french": "Tacheté de blanc",
    "english": "Spotted with white"
  },
  {
    "medumba": "Ncǒbncob nəsɛn",
    "french": "Tacheté de noir",
    "english": "Black spotted"
  },
  {
    "medumba": "Ntsəwud",
    "french": "Taille",
    "english": "Size"
  },
  {
    "medumba": "Ntaŋkob",
    "french": "Taille hanche",
    "english": "Hip size"
  },
  {
    "medumba": "Nə̀ sitə",
    "french": "Tailler",
    "english": "Prune"
  },
  {
    "medumba": "Nə̀ sitə tu",
    "french": "Tailler cheveux",
    "english": "Trim hair"
  },
  {
    "medumba": "Nə̀ mi ntswə",
    "french": "Taire se",
    "english": "Shut up"
  },
  {
    "medumba": "Nə̀ miꞌi",
    "french": "Taire se",
    "english": "Shut up"
  },
  {
    "medumba": "Nə̀ tswə ncù miꞌi",
    "french": "Taire se",
    "english": "Shut up"
  },
  {
    "medumba": "Tǔnkù",
    "french": "Talon",
    "english": "Heel"
  },
  {
    "medumba": "Làmmbè",
    "french": "Tambour",
    "english": "Drum"
  },
  {
    "medumba": "Kèꞌtə̀",
    "french": "Tamis",
    "english": "Sieve"
  },
  {
    "medumba": "Nə̀ kètə̌",
    "french": "Tamiser",
    "english": "Sieve"
  },
  {
    "medumba": "Nkàg",
    "french": "Tam-tam",
    "english": "Drum"
  },
  {
    "medumba": "Tɔ",
    "french": "Tannière",
    "english": "Den"
  },
  {
    "medumba": "Yàꞌyàꞌ",
    "french": "Tapage",
    "english": "Uproar"
  },
  {
    "medumba": "Nə̀ tam yàꞌyàl",
    "french": "Tapage faire le",
    "english": "Fucking do it"
  },
  {
    "medumba": "Nə̀ tswe taꞌ",
    "french": "Tarder",
    "english": "Delay"
  },
  {
    "medumba": "Ne tswe yαmə",
    "french": "Tarder",
    "english": "Delay"
  },
  {
    "medumba": "Lòꞌ",
    "french": "Tare",
    "english": "Tare"
  },
  {
    "medumba": "Nə̀ zwimə",
    "french": "Tarir",
    "english": "Dry up"
  },
  {
    "medumba": "Kûꞌbαn",
    "french": "Taro",
    "english": "Taro"
  },
  {
    "medumba": "Bα̂nkuꞌu",
    "french": "Taro pilé",
    "english": "Pounded taro"
  },
  {
    "medumba": "Tswəꞌtə",
    "french": "Tas",
    "english": "Heap"
  },
  {
    "medumba": "Fɛd sə",
    "french": "Tas",
    "english": "Heap"
  },
  {
    "medumba": "Nə̀ mòmtə̌",
    "french": "Tâtonner",
    "english": "grope"
  },
  {
    "medumba": "Nə̀ nɛ̂n bǎgbàg",
    "french": "Tâtonner",
    "english": "grope"
  },
  {
    "medumba": "Nsaꞌ",
    "french": "Tatouage",
    "english": "Tattoo"
  },
  {
    "medumba": "Nə̀ vɛn nsaꞌ",
    "french": "Tatuoer",
    "english": "Tattoo"
  },
  {
    "medumba": "Fǒdmfɔ",
    "french": "Taureau",
    "english": "Taurus"
  },
  {
    "medumba": "Fǒdnaꞌ",
    "french": "Taureau",
    "english": "Taurus"
  },
  {
    "medumba": "Fəꞌ",
    "french": "Taxe",
    "english": "Tax"
  },
  {
    "medumba": "Nə̀ làꞌa",
    "french": "Taxer",
    "english": "Tax"
  },
  {
    "medumba": "Mbα̂ntu",
    "french": "Taigne",
    "english": "Ringworm"
  },
  {
    "medumba": "Ncʉ̀",
    "french": "Teint",
    "english": "Complexion"
  },
  {
    "medumba": "Nə̀lαnbà",
    "french": "Teint clair",
    "english": "Light complexion"
  },
  {
    "medumba": "Nə̀sɛnə",
    "french": "Teint noir",
    "english": "Black complexion"
  },
  {
    "medumba": "Nə̀sɛnə nzidtə",
    "french": "Teint noir ciré",
    "english": "Waxed black complexion"
  },
  {
    "medumba": "Nə̀bǎ",
    "french": "Teint bronzé",
    "english": "Tanned complexion"
  },
  {
    "medumba": "Nta",
    "french": "Témoignage",
    "english": "Testimony"
  },
  {
    "medumba": "Nə̀ mbǎꞌnkwαn",
    "french": "Témoigner",
    "english": "Testify"
  },
  {
    "medumba": "Nə̀ kwenta",
    "french": "Témoigner",
    "english": "Testify"
  },
  {
    "medumba": "Mbaꞌnkwαn",
    "french": "Témoin",
    "english": "Witness"
  },
  {
    "medumba": "Nkwênta",
    "french": "Témoin",
    "english": "Witness"
  },
  {
    "medumba": "Nkaŋtu",
    "french": "Tempe",
    "english": "Temple"
  },
  {
    "medumba": "Nə̀tâ fə̀mbàŋ",
    "french": "Tempête",
    "english": "Storm"
  },
  {
    "medumba": "Nə̀ shʉm fə̀dmbàŋ",
    "french": "Tempêter",
    "english": "Storm"
  },
  {
    "medumba": "Nə̀ cob lα tum",
    "french": "Tempêter",
    "english": "Storm"
  },
  {
    "medumba": "Ndα̂mətə̀",
    "french": "Temple",
    "english": "Temple"
  },
  {
    "medumba": "Ndα̂nsi",
    "french": "Temple",
    "english": "Temple"
  },
  {
    "medumba": "Ngə̀laŋ",
    "french": "Temps",
    "english": "Time"
  },
  {
    "medumba": "Njʉ",
    "french": "Temps",
    "english": "Time"
  },
  {
    "medumba": "Nga",
    "french": "Tendon",
    "english": "Tendon"
  },
  {
    "medumba": "Ngǎkù",
    "french": "Tendon d’achille",
    "english": "Achilles tendon"
  },
  {
    "medumba": "Njamə",
    "french": "Ténèbre",
    "english": "Darkness"
  },
  {
    "medumba": "Nə̀ cʉbə",
    "french": "Ténir",
    "english": "Hold"
  },
  {
    "medumba": "Nə̀ cʉb ndǎŋndaŋ",
    "french": "Tenir droit",
    "english": "Stand straight"
  },
  {
    "medumba": "Tâmcɛd",
    "french": "Tennis",
    "english": "Tennis"
  },
  {
    "medumba": "Tâmcɛd",
    "french": "Tennis de table",
    "english": "Table tennis"
  },
  {
    "medumba": "Ngàlàŋtə̀",
    "french": "Tentateur",
    "english": "Tempter"
  },
  {
    "medumba": "Ntαb",
    "french": "Tente",
    "english": "Tent"
  },
  {
    "medumba": "Ntα̌bnzwə",
    "french": "Tente",
    "english": "Tent"
  },
  {
    "medumba": "Nə̀ làŋtə̌",
    "french": "Tenter",
    "english": "Try"
  },
  {
    "medumba": "Nə̀ miàgtə̌",
    "french": "Terminer",
    "english": "Finish"
  },
  {
    "medumba": "Ngoꞌo",
    "french": "Termite",
    "english": "Termite"
  },
  {
    "medumba": "Njʉ",
    "french": "Terre",
    "english": "Earth"
  },
  {
    "medumba": "Caꞌa",
    "french": "Terre",
    "english": "Earth"
  },
  {
    "medumba": "Nsicaꞌa",
    "french": "Terre monde",
    "english": "earth world"
  },
  {
    "medumba": "Bwog ndʉb",
    "french": "Terreur",
    "english": "Terror"
  },
  {
    "medumba": "Fə̀dwud",
    "french": "Terreur",
    "english": "Terror"
  },
  {
    "medumba": "Ntʉ̂mngɔ̀",
    "french": "Territoire",
    "english": "Territory"
  },
  {
    "medumba": "Nə̀ kag fə̀dwud",
    "french": "Terroriser",
    "english": "Terrorize"
  },
  {
    "medumba": "Ntὰgmfə",
    "french": "Testament",
    "english": "Will"
  },
  {
    "medumba": "Ntαgvʉ",
    "french": "Testament",
    "english": "Will"
  },
  {
    "medumba": "Tu",
    "french": "Tête",
    "english": "Head"
  },
  {
    "medumba": "Səsə̂",
    "french": "Tête à tête",
    "english": "Head to head"
  },
  {
    "medumba": "Nə̀ bǔm ncù",
    "french": "Tête à tête",
    "english": "Head to head"
  },
  {
    "medumba": "Nə̀ nyo bʉn",
    "french": "Téter",
    "english": "Sucking"
  },
  {
    "medumba": "Nə̀ tam bô tu",
    "french": "Têter",
    "english": "Feed"
  },
  {
    "medumba": "Ngàtǎtu",
    "french": "Têtu",
    "english": "Stubborn"
  },
  {
    "medumba": "Nə̀ tǎtu",
    "french": "Têtu être",
    "english": "stubborn be"
  },
  {
    "medumba": "Diaŋsa",
    "french": "Théâtre",
    "english": "Theater"
  },
  {
    "medumba": "Diaŋzwì",
    "french": "Théâtre comique",
    "english": "Comedy theater"
  },
  {
    "medumba": "Diaŋnyα",
    "french": "Théâtre tragique",
    "english": "Tragic theater"
  },
  {
    "medumba": "Diaŋnzwə",
    "french": "Théâtre tragique",
    "english": "Tragic theater"
  },
  {
    "medumba": "Fʉnkù",
    "french": "Tibia",
    "english": "Shin"
  },
  {
    "medumba": "Nəyobtə",
    "french": "Tiède",
    "english": "Lukewarm"
  },
  {
    "medumba": "Yobtə̀",
    "french": "Tiédeur",
    "english": "Lukewarmness"
  },
  {
    "medumba": "Nə̀ yobtə",
    "french": "Tiédir",
    "english": "Warm"
  },
  {
    "medumba": "Ncʉ̌ꞌ nùm tad",
    "french": "Tiers",
    "english": "Third parties"
  },
  {
    "medumba": "Mɛ̀nwα",
    "french": "Tiers un",
    "english": "Third one"
  },
  {
    "medumba": "Tɔ̀",
    "french": "Tir au sort",
    "english": "Draw"
  },
  {
    "medumba": "Nə̀ baꞌa",
    "french": "Tisser",
    "english": "Weave"
  },
  {
    "medumba": "Mbâꞌnzwə",
    "french": "Tisserand",
    "english": "Weaver"
  },
  {
    "medumba": "Nzwə",
    "french": "Tissu",
    "english": "Fabric"
  },
  {
    "medumba": "Lɛ̀n",
    "french": "Titre appelation",
    "english": "Title appellation"
  },
  {
    "medumba": "Tu",
    "french": "Titre texte",
    "english": "Text title"
  },
  {
    "medumba": "Nə̀ sǒg sə",
    "french": "Toilette faire la",
    "english": "Toilet do the"
  },
  {
    "medumba": "Mfìꞌntəmɛ̀n",
    "french": "Toise",
    "english": "Height chart"
  },
  {
    "medumba": "Tûbaꞌ",
    "french": "Toit",
    "english": "Roof"
  },
  {
    "medumba": "Fì",
    "french": "Tombe",
    "english": "Grave"
  },
  {
    "medumba": "Nə̀ tamnsi",
    "french": "Tomber",
    "english": "Fall"
  },
  {
    "medumba": "Nə̀ vʉ̌",
    "french": "Tomber",
    "english": "Fall"
  },
  {
    "medumba": "Nə̀ cʉmnsi",
    "french": "Tomber liquide",
    "english": "Falling liquid"
  },
  {
    "medumba": "Nə̀ vǔnsi",
    "french": "Tomber à plat",
    "english": "Fall flat"
  },
  {
    "medumba": "Nə̀ fogtə",
    "french": "Tomberen cascarde",
    "english": "Fallen waterfall"
  },
  {
    "medumba": "Tɔ̀",
    "french": "Tombola",
    "english": "Raffle"
  },
  {
    "medumba": "Taŋə",
    "french": "Tonneau",
    "english": "Barrel"
  },
  {
    "medumba": "Fǎmbàŋ",
    "french": "Tonnerre",
    "english": "Thunder"
  },
  {
    "medumba": "Ncuaꞌ",
    "french": "Tontine",
    "english": "Tontine"
  },
  {
    "medumba": "Bə̀bǎꞌmbwogə",
    "french": "Torche",
    "english": "Torch"
  },
  {
    "medumba": "Nkàꞌ",
    "french": "Torche",
    "english": "Torch"
  },
  {
    "medumba": "Nkǎꞌvə̀",
    "french": "Torche",
    "english": "Torch"
  },
  {
    "medumba": "Nə̀ ba",
    "french": "Tordre",
    "english": "twist"
  },
  {
    "medumba": "Nə̀ ŋamə",
    "french": "Tordre",
    "english": "twist"
  },
  {
    "medumba": "Nə̀ ŋamə",
    "french": "Tordu",
    "english": "Twisted"
  },
  {
    "medumba": "Ntsǐdmbàŋ",
    "french": "Torrent",
    "english": "Torrent"
  },
  {
    "medumba": "Mfα̌nnù",
    "french": "Tort",
    "english": "Wrong"
  },
  {
    "medumba": "Tswəmα̂nk̀òꞌ",
    "french": "Tortue",
    "english": "Turtle"
  },
  {
    "medumba": "Ngʉ̀dnǐ",
    "french": "Torture",
    "english": "Torture"
  },
  {
    "medumba": "Nə̀ kwagə",
    "french": "Torturer",
    "english": "Torture"
  },
  {
    "medumba": "Nkʉ̂nkʉ",
    "french": "Toucher",
    "english": "Touch"
  },
  {
    "medumba": "Nghʉdnǐ",
    "french": "Tour joué",
    "english": "Trick played"
  },
  {
    "medumba": "Nə̀ ghʉ̀dnǐ",
    "french": "Tourment",
    "english": "Torment"
  },
  {
    "medumba": "Nə̀ lǎbwud",
    "french": "Tourmenter",
    "english": "Torment"
  },
  {
    "medumba": "Ŋûꞌnzə̀",
    "french": "Tournant",
    "english": "Turning point"
  },
  {
    "medumba": "Nə̀ kàŋə",
    "french": "Tourner",
    "english": "Turn"
  },
  {
    "medumba": "Nə̀ bǎꞌkwiag",
    "french": "Tousser",
    "english": "Cough"
  },
  {
    "medumba": "Nə̀ kwiagə",
    "french": "Tousser",
    "english": "Cough"
  },
  {
    "medumba": "Fa",
    "french": "Tout",
    "english": "Everything"
  },
  {
    "medumba": "Fafa",
    "french": "Tout",
    "english": "Everything"
  },
  {
    "medumba": "Nzə̌nzə̌",
    "french": "Toutes sortes",
    "english": "All kinds"
  },
  {
    "medumba": "Kə̀nguan",
    "french": "Tout puissant",
    "english": "Almighty"
  },
  {
    "medumba": "Ngànə̀ta",
    "french": "Tout puissant",
    "english": "Almighty"
  },
  {
    "medumba": "Nsi",
    "french": "Tout puissant",
    "english": "Almighty"
  },
  {
    "medumba": "Kwiag",
    "french": "Toux",
    "english": "Cough"
  },
  {
    "medumba": "Nə̀ site kùd mɛ̀n (V",
    "french": "Trahir",
    "english": "Betray"
  },
  {
    "medumba": "Nə̀ swɛ̌n mɛ̀n",
    "french": "Trahir",
    "english": "Betray"
  },
  {
    "medumba": "Nə̀ to tǔn mɛ̀n",
    "french": "Trahir",
    "english": "Betray"
  },
  {
    "medumba": "Nə̀ zwə ncàm mɛ̀n",
    "french": "Trahir",
    "english": "Betray"
  },
  {
    "medumba": "Nə̀swɛ̌n mɛ̀n",
    "french": "Trahison",
    "english": "Betrayal"
  },
  {
    "medumba": "Nə̀ zwəncàmmɛ̀n",
    "french": "Trahison",
    "english": "Betrayal"
  },
  {
    "medumba": "nganzwəncὰn",
    "french": "Traître",
    "english": "Traitor"
  },
  {
    "medumba": "Nswɛ̀nngɔ̀",
    "french": "Traître",
    "english": "Traitor"
  },
  {
    "medumba": "Nà",
    "french": "Traîtrisse",
    "english": "Traitor"
  },
  {
    "medumba": "Cʉag",
    "french": "Tranchant",
    "english": "Sharp"
  },
  {
    "medumba": "Nsam",
    "french": "Tranchée",
    "english": "Trench"
  },
  {
    "medumba": "Nə̀ kəbə",
    "french": "Trancher",
    "english": "Slice"
  },
  {
    "medumba": "Nə̀ fǎn ncʉ̀ꞌ",
    "french": "Transgresser",
    "english": "Transgress"
  },
  {
    "medumba": "Kə̀bwɔ̀",
    "french": "Transgression",
    "english": "Transgression"
  },
  {
    "medumba": "Nə̀yəntə",
    "french": "Transparent",
    "english": "Clear"
  },
  {
    "medumba": "Nə̀ to ntogə",
    "french": "Transpercer",
    "english": "Pierce"
  },
  {
    "medumba": "Nə̀ tam ntogə",
    "french": "Transpercer",
    "english": "Pierce"
  },
  {
    "medumba": "Ywìꞌ",
    "french": "Trappe",
    "english": "Hatch"
  },
  {
    "medumba": "Fàꞌ",
    "french": "Travail",
    "english": "Work"
  },
  {
    "medumba": "Ncʉ̂ꞌnὰ",
    "french": "Travail en e̍quipe",
    "english": "Teamwork"
  },
  {
    "medumba": "Njôgmαsi",
    "french": "Travail forcé",
    "english": "Forced labor"
  },
  {
    "medumba": "Fǎꞌmbu",
    "french": "Trvail manuel",
    "english": "Manual work"
  },
  {
    "medumba": "Nə̀ fàꞌa",
    "french": "Travailler",
    "english": "Work"
  },
  {
    "medumba": "Ngàfàꞌ",
    "french": "Travailleur",
    "english": "Worker"
  },
  {
    "medumba": "Fǎꞌndα",
    "french": "Traveaux domestique",
    "english": "Domestic work"
  },
  {
    "medumba": "Nə̀ dùlə",
    "french": "Traverser",
    "english": "Cross"
  },
  {
    "medumba": "Nə̀ yaꞌa",
    "french": "Traverser",
    "english": "Cross"
  },
  {
    "medumba": "Nə̀ faꞌtə",
    "french": "Trébucher",
    "english": "Stumble"
  },
  {
    "medumba": "Tshaꞌnenyiꞌi",
    "french": "Trenblement de terre",
    "english": "Earthquake"
  },
  {
    "medumba": "Nə̀ vɛdtə̌",
    "french": "Trembler",
    "english": "Tremble"
  },
  {
    "medumba": "Nə̀ nyǔꞌntsə",
    "french": "Tremper",
    "english": "Soak"
  },
  {
    "medumba": "Nə̀ ywɛ̀lə",
    "french": "Tremper",
    "english": "Soak"
  },
  {
    "medumba": "Nəshù",
    "french": "Très",
    "english": "Very"
  },
  {
    "medumba": "Fùꞌ",
    "french": "Trésor",
    "english": "Treasure"
  },
  {
    "medumba": "Jûnkαb",
    "french": "Trésor",
    "english": "Treasure"
  },
  {
    "medumba": "Ndɔ̀tu",
    "french": "Trésor",
    "english": "Treasure"
  },
  {
    "medumba": "Ndɔ̀tu",
    "french": "Tresse",
    "english": "Braid"
  },
  {
    "medumba": "Nə̀ baꞌa",
    "french": "Tresser",
    "english": "Braid"
  },
  {
    "medumba": "Nə̀ zwimə",
    "french": "Tresser",
    "english": "Braid"
  },
  {
    "medumba": "Nə̀ baꞌtu",
    "french": "Tresse tête",
    "english": "Head braid"
  },
  {
    "medumba": "Nzwìd",
    "french": "Tribu",
    "english": "Tribe"
  },
  {
    "medumba": "Tǔnndα",
    "french": "Tribu",
    "english": "Tribe"
  },
  {
    "medumba": "Ngə̀",
    "french": "Tribulation",
    "english": "Tribulation"
  },
  {
    "medumba": "Ndα̂ncà",
    "french": "Tribunal",
    "english": "Court"
  },
  {
    "medumba": "Ncùb",
    "french": "Tribut",
    "english": "Tribute"
  },
  {
    "medumba": "Nə̀ tswidtə",
    "french": "Trier",
    "english": "Sort"
  },
  {
    "medumba": "Nə̀ nywinə",
    "french": "Triste être",
    "english": "sad to be"
  },
  {
    "medumba": "Nywin",
    "french": "Tristesse",
    "english": "Sadness"
  },
  {
    "medumba": "Zwə",
    "french": "Tristesse",
    "english": "Sadness"
  },
  {
    "medumba": "Zwə̌ntʉ",
    "french": "Tristesse",
    "english": "Sadness"
  },
  {
    "medumba": "Diǎŋfə̀n",
    "french": "Trône",
    "english": "Throne"
  },
  {
    "medumba": "Diǎŋkwa",
    "french": "Trône",
    "english": "Throne"
  },
  {
    "medumba": "Kǒꞌfə̀n",
    "french": "Trône",
    "english": "Throne"
  },
  {
    "medumba": "Tad",
    "french": "Trois",
    "english": "Three"
  },
  {
    "medumba": "Mbadtə̀ tad",
    "french": "Troisième",
    "english": "Third"
  },
  {
    "medumba": "Ntà",
    "french": "Trompête",
    "english": "Trumpet"
  },
  {
    "medumba": "Nə̀ fʉ̌mɛ̀n",
    "french": "Tromper",
    "english": "Deceive"
  },
  {
    "medumba": "Nə̀ tadtə",
    "french": "Tromper",
    "english": "Deceive"
  },
  {
    "medumba": "Fʉ̀ꞌtə̀",
    "french": "Tromperie",
    "english": "Deception"
  },
  {
    "medumba": "Nkǒꞌtʉ",
    "french": "Trompette",
    "english": "Trumpet"
  },
  {
    "medumba": "Mα̂ntuꞌ",
    "french": "Tronc d’arbre",
    "english": "Tree trunk"
  },
  {
    "medumba": "Nə̀ cuadtə",
    "french": "Trophée",
    "english": "Trophy"
  },
  {
    "medumba": "Tɔ",
    "french": "Trou",
    "english": "Hole"
  },
  {
    "medumba": "Cuꞌtu",
    "french": "Trouble",
    "english": "Trouble"
  },
  {
    "medumba": "Nə̀ cǔꞌtu",
    "french": "Troubler",
    "english": "Disturb"
  },
  {
    "medumba": "Ngàcǔꞌtu",
    "french": "Troubleur",
    "english": "Troublesome"
  },
  {
    "medumba": "Nə̀ tswə̌ꞌtɔ",
    "french": "Trouer",
    "english": "Hole"
  },
  {
    "medumba": "Mfə̀ꞌkʉlə",
    "french": "Trousse d’ecolier",
    "english": "School kit"
  },
  {
    "medumba": "Fɛn",
    "french": "Trouvaille",
    "english": "Find"
  },
  {
    "medumba": "Jûnfɛn",
    "french": "Trouvaille en",
    "english": "Find in"
  },
  {
    "medumba": "Nə̀ fònə",
    "french": "Trouver",
    "english": "Find"
  },
  {
    "medumba": "Wʉ̀",
    "french": "Tu",
    "english": "You"
  },
  {
    "medumba": "Nə̀ zwi",
    "french": "Tuer",
    "english": "Kill"
  },
  {
    "medumba": "Ngàzwi",
    "french": "Tueur",
    "english": "Killer"
  },
  {
    "medumba": "Ncùꞌtə̀",
    "french": "Tumulte",
    "english": "Tumult"
  },
  {
    "medumba": "Nzwə",
    "french": "Tunique",
    "english": "Tunic"
  },
  {
    "medumba": "Ngàtəntom",
    "french": "Tuteur",
    "english": "Tutor"
  },
  {
    "medumba": "Ngacagte",
    "french": "Tuteur",
    "english": "Tutor"
  },
  {
    "medumba": "Ntom",
    "french": "Tuteur",
    "english": "Tutor"
  },
  {
    "medumba": "Ngʉꞌ tɔ̀ngɔ̀",
    "french": "Tyranie",
    "english": "Tyranny"
  },
  {
    "medumba": "Kəkoꞌo",
    "french": "Ulcère",
    "english": "Ulcer"
  },
  {
    "medumba": "Mfaŋə",
    "french": "Ulcère",
    "english": "Ulcer"
  },
  {
    "medumba": "Ndʉ̌jàm",
    "french": "Ulterieur",
    "english": "Subsequent"
  },
  {
    "medumba": "Ncʉ̌ꞌncʉꞌ",
    "french": "Un à un",
    "english": "One by one"
  },
  {
    "medumba": "Ncʉꞌ",
    "french": "Un; une",
    "english": "A; a"
  },
  {
    "medumba": "Tàꞌ",
    "french": "Un; une",
    "english": "A; a"
  },
  {
    "medumba": "Jûncʉꞌ",
    "french": "Uniforme",
    "english": "Uniform"
  },
  {
    "medumba": "Nzwə̂fà",
    "french": "Uniforme tenue",
    "english": "Uniform outfit"
  },
  {
    "medumba": "Ntàmtə̀",
    "french": "Union",
    "english": "Union"
  },
  {
    "medumba": "Nə̀ tàmtə",
    "french": "Unir",
    "english": "Unite"
  },
  {
    "medumba": "Ncʉꞌ",
    "french": "Unitaire",
    "english": "Unitary"
  },
  {
    "medumba": "Kǎmmfìꞌ",
    "french": "Unité",
    "english": "Unit"
  },
  {
    "medumba": "Màꞌ",
    "french": "Unité",
    "english": "Unit"
  },
  {
    "medumba": "Ncùncʉꞌ",
    "french": "Unité",
    "english": "Unit"
  },
  {
    "medumba": "Njʉ",
    "french": "Univers",
    "english": "Universe"
  },
  {
    "medumba": "Nsicaꞌa",
    "french": "Univers",
    "english": "Universe"
  },
  {
    "medumba": "Njʉfa",
    "french": "Universel",
    "english": "Universal"
  },
  {
    "medumba": "Ŋwaꞌnìnsὰkʉlə",
    "french": "Université",
    "english": "University"
  },
  {
    "medumba": "Nûnkund̀e",
    "french": "Urgence",
    "english": "Emergency"
  },
  {
    "medumba": "Nkǔndenkǔndə",
    "french": "Urgence de toute",
    "english": "Emergency of all"
  },
  {
    "medumba": "Ndαnùbαhα",
    "french": "Urgence salle des",
    "english": "Emergency room"
  },
  {
    "medumba": "Nkǔndə",
    "french": "Urgent",
    "english": "Urgent"
  },
  {
    "medumba": "Nə̀tsin",
    "french": "Urine",
    "english": "Urine"
  },
  {
    "medumba": "Nə̀ tsìntə̌",
    "french": "Uriner",
    "english": "Urinate"
  },
  {
    "medumba": "Dʉ̌ꞌnə̀tsìn",
    "french": "Urinoir",
    "english": "Urinal"
  },
  {
    "medumba": "Kânə̀tsìn",
    "french": "Urinoir",
    "english": "Urinal"
  },
  {
    "medumba": "Nyαmnaꞌ",
    "french": "Vache",
    "english": "Cow"
  },
  {
    "medumba": "Mfɔ",
    "french": "Vache boeuf",
    "english": "Cow beef"
  },
  {
    "medumba": "Kâdtʉ",
    "french": "Vagabond",
    "english": "Vagabond"
  },
  {
    "medumba": "Ncǎkαnncù",
    "french": "Vagabond",
    "english": "Vagabond"
  },
  {
    "medumba": "Ncǎkə̌ndα",
    "french": "Vagabond",
    "english": "Vagabond"
  },
  {
    "medumba": "Kad",
    "french": "Vagabondage",
    "english": "Vagrancy"
  },
  {
    "medumba": "Cà",
    "french": "Vagabondage",
    "english": "Vagrancy"
  },
  {
    "medumba": "Nə̀ kalə",
    "french": "Vagabonder",
    "english": "Wander"
  },
  {
    "medumba": "Nə̀ cǎ",
    "french": "Vagabonder",
    "english": "Wander"
  },
  {
    "medumba": "Tuꞌntsə",
    "french": "Vague",
    "english": "Wave"
  },
  {
    "medumba": "Ŋwatə̀",
    "french": "Vaillance",
    "english": "Valor"
  },
  {
    "medumba": "Nə̀ ŋwatə",
    "french": "Vaillant",
    "english": "Valiant"
  },
  {
    "medumba": "Nə̀ cʉǎ ncò",
    "french": "Vaincre guerre",
    "english": "Win war"
  },
  {
    "medumba": "Nə̀ ncʉǎ",
    "french": "Vaincre réussir",
    "english": "Overcome succeed"
  },
  {
    "medumba": "Vʉ̀ncò",
    "french": "Vaincu guerre",
    "english": "Defeated war"
  },
  {
    "medumba": "Ncʉ̀ncò",
    "french": "Vainqueur",
    "english": "Winner"
  },
  {
    "medumba": "Njòŋ",
    "french": "Valeur",
    "english": "Value"
  },
  {
    "medumba": "Konnzwə",
    "french": "Valise",
    "english": "Suitcase"
  },
  {
    "medumba": "Tɔ̌mboꞌ",
    "french": "Valée",
    "english": "Valley"
  },
  {
    "medumba": "Lə̀kə̀tə̀",
    "french": "Valée",
    "english": "Valley"
  },
  {
    "medumba": "Nə̀ be njǒŋ",
    "french": "Valoir",
    "english": "Value"
  },
  {
    "medumba": "Ywɛlə",
    "french": "Vapeur",
    "english": "Steam"
  },
  {
    "medumba": "Sitimàꞌ",
    "french": "Vapeur bateau",
    "english": "Steam boat"
  },
  {
    "medumba": "Ntəꞌ",
    "french": "Vassal",
    "english": "Vassal"
  },
  {
    "medumba": "Mɛ̂nmfɔ",
    "french": "Veau",
    "english": "Veal"
  },
  {
    "medumba": "Fɛ̀ntə̂leꞌnjʉ",
    "french": "Veille",
    "english": "Sleep"
  },
  {
    "medumba": "Mù",
    "french": "Veillée",
    "english": "Vigil"
  },
  {
    "medumba": "Nə̀ mǔ",
    "french": "Veiller",
    "english": "Watch"
  },
  {
    "medumba": "Nə̀ zi mù",
    "french": "Veiller",
    "english": "Watch"
  },
  {
    "medumba": "Nə̀ zi cʉâlo",
    "french": "Veiller",
    "english": "Watch"
  },
  {
    "medumba": "Ngǎləm",
    "french": "Veine",
    "english": "Vein"
  },
  {
    "medumba": "Ba",
    "french": "Vélo",
    "english": "Bike"
  },
  {
    "medumba": "Bânkù",
    "french": "Vélo",
    "english": "Bike"
  },
  {
    "medumba": "Ngàswɛ̀n",
    "french": "Vendeur",
    "english": "Seller"
  },
  {
    "medumba": "Nə̀ sɛ̀nə",
    "french": "Vendre",
    "english": "Sell"
  },
  {
    "medumba": "Mbaꞌa",
    "french": "Vengeance",
    "english": "Revenge"
  },
  {
    "medumba": "Kǒꞌ",
    "french": "Véritable",
    "english": "Genuine"
  },
  {
    "medumba": "Nenʉnə",
    "french": "Vérité",
    "english": "Truth"
  },
  {
    "medumba": "Nə̀ yαgtə mbaꞌa",
    "french": "Venger",
    "english": "Avenge"
  },
  {
    "medumba": "Nə̀ səꞌə",
    "french": "Venir",
    "english": "Come"
  },
  {
    "medumba": "Fə̀dmbàŋ",
    "french": "Vent",
    "english": "Wind"
  },
  {
    "medumba": "Nə̀swɛ̀nə",
    "french": "Vente",
    "english": "Sale"
  },
  {
    "medumba": "Ndα̂ndùꞌ",
    "french": "Vente à emporter",
    "english": "Takeaway"
  },
  {
    "medumba": "Nə̀sə̀ꞌə",
    "french": "Venue",
    "english": "Coming"
  },
  {
    "medumba": "Mαnyaoŋə",
    "french": "Ver",
    "english": "Worm"
  },
  {
    "medumba": "Tαn",
    "french": "Ver",
    "english": "Worm"
  },
  {
    "medumba": "Mbə̀ꞌ",
    "french": "Ver de terre",
    "english": "Earthworm"
  },
  {
    "medumba": "Tα̌nnkʉα",
    "french": "Ver de raphia",
    "english": "Raffia worm"
  },
  {
    "medumba": "Mbǎncobe",
    "french": "Verbe",
    "english": "Verb"
  },
  {
    "medumba": "Kə̂bnca",
    "french": "Verdict",
    "english": "Verdict"
  },
  {
    "medumba": "Shuaꞌa",
    "french": "Verge",
    "english": "Rod"
  },
  {
    "medumba": "Kǒꞌ",
    "french": "Véritable",
    "english": "Genuine"
  },
  {
    "medumba": "Nənʉne",
    "french": "Vérité",
    "english": "Truth"
  },
  {
    "medumba": "Yəntə̀",
    "french": "Verre vitre",
    "english": "Window glass"
  },
  {
    "medumba": "Ntuꞌ",
    "french": "Verre à boire",
    "english": "Drinking glass"
  },
  {
    "medumba": "Nə̀ fɛ̀dtə̌",
    "french": "Verser",
    "english": "Pour"
  },
  {
    "medumba": "Nə̀ naŋə",
    "french": "Verser",
    "english": "Pour"
  },
  {
    "medumba": "Nə̀ nəꞌə",
    "french": "Verser",
    "english": "Pour"
  },
  {
    "medumba": "Nə̀ cwɛ̀lə",
    "french": "Verser",
    "english": "Pour"
  },
  {
    "medumba": "Nka",
    "french": "Verset",
    "english": "Verse"
  },
  {
    "medumba": "Kôꞌkoꞌ",
    "french": "Vertical",
    "english": "Vertical"
  },
  {
    "medumba": "Swəꞌswəꞌ",
    "french": "Vertical",
    "english": "Vertical"
  },
  {
    "medumba": "Nə̀ kə̌dnzwə",
    "french": "Vêtir",
    "english": "Clothing"
  },
  {
    "medumba": "Nə̀ mǎꞌzwə",
    "french": "Vêtir",
    "english": "Clothing"
  },
  {
    "medumba": "Mefogmαdùm",
    "french": "Veuf",
    "english": "Widower"
  },
  {
    "medumba": "Fogə nə tswə",
    "french": "Veuvage",
    "english": "Widowed"
  },
  {
    "medumba": "Məfogmɛ̀nnzwi",
    "french": "Veuve",
    "english": "Widow"
  },
  {
    "medumba": "Mbαb",
    "french": "Viande",
    "english": "Meat"
  },
  {
    "medumba": "Mbαb fi",
    "french": "Viande fraiche",
    "english": "Fresh meat"
  },
  {
    "medumba": "Bǐmbαb",
    "french": "Viande pourrie",
    "english": "Rotten meat"
  },
  {
    "medumba": "Yâgmbὰb",
    "french": "Viande séchée",
    "english": "Dried meat"
  },
  {
    "medumba": "Ngə",
    "french": "Vide",
    "english": "Empty"
  },
  {
    "medumba": "Ghəlaŋə",
    "french": "Vide",
    "english": "Empty"
  },
  {
    "medumba": "Mbû ndaŋ",
    "french": "Vide",
    "english": "Empty"
  },
  {
    "medumba": "Njɔ̀sɔ",
    "french": "Vide entre 2 dents",
    "english": "Empty between 2 teeth"
  },
  {
    "medumba": "Fogtu",
    "french": "Vieillard",
    "english": "Old man"
  },
  {
    "medumba": "Njwɛ̀nmɛ̀n",
    "french": "Vieillard",
    "english": "Old man"
  },
  {
    "medumba": "Teloŋe",
    "french": "Vieillard",
    "english": "Old man"
  },
  {
    "medumba": "Tsəncù",
    "french": "Vieillard",
    "english": "Old man"
  },
  {
    "medumba": "Ywɛ̀n",
    "french": "Vieillesse",
    "english": "Old age"
  },
  {
    "medumba": "Nə̀ ywɛ̀nə",
    "french": "Vieillir",
    "english": "Getting old"
  },
  {
    "medumba": "Njwɛ̀nmɛ̀n",
    "french": "Vieux",
    "english": "Old"
  },
  {
    "medumba": "Nkʉα",
    "french": "Vigne",
    "english": "Vine"
  },
  {
    "medumba": "Nə̀ diǎŋ nkʉα",
    "french": "Vigner",
    "english": "Vine"
  },
  {
    "medumba": "Ndiàŋnkʉα",
    "french": "Vigneron",
    "english": "Winemaker"
  },
  {
    "medumba": "Laꞌ",
    "french": "Village",
    "english": "Village"
  },
  {
    "medumba": "Ngɔ̀",
    "french": "Village",
    "english": "Village"
  },
  {
    "medumba": "Tʉsɔ",
    "french": "Ville",
    "english": "City"
  },
  {
    "medumba": "Ndʉꞌ",
    "french": "Violence",
    "english": "Violence"
  },
  {
    "medumba": "Ntànt̀",
    "french": "Violence",
    "english": "Violence"
  },
  {
    "medumba": "Mfǎmfa",
    "french": "Violence",
    "english": "Violence"
  },
  {
    "medumba": "Ndùꞌ",
    "french": "Vin",
    "english": "Wine"
  },
  {
    "medumba": "Ndùꞌnkʉα",
    "french": "Vin de raphia",
    "english": "Raffia wine"
  },
  {
    "medumba": "Mbêdnkʉα",
    "french": "Vin de raphia sucré",
    "english": "Sweet raffia wine"
  },
  {
    "medumba": "Njʉαkʉα",
    "french": "Vin de raphia sucré",
    "english": "Sweet raffia wine"
  },
  {
    "medumba": "Cɛ̀n",
    "french": "Vinaigre",
    "english": "Vinegar"
  },
  {
    "medumba": "Cʉaggkɛdndùꞌ",
    "french": "Vinaigre",
    "english": "Vinegar"
  },
  {
    "medumba": "Ngàbuꞌloŋə",
    "french": "Violoniste",
    "english": "Violinist"
  },
  {
    "medumba": "Zwiὰgə",
    "french": "Virgule",
    "english": "Comma"
  },
  {
    "medumba": "Mibləm",
    "french": "Vitamine",
    "english": "Vitamin"
  },
  {
    "medumba": "Ndə̂ndə",
    "french": "Vite",
    "english": "Quickly"
  },
  {
    "medumba": "Nde",
    "french": "Vitesse",
    "english": "Speed"
  },
  {
    "medumba": "Ndə̂ndə",
    "french": "Vitesse",
    "english": "Speed"
  },
  {
    "medumba": "Ntʉ̀n",
    "french": "Vivant",
    "english": "Alive"
  },
  {
    "medumba": "Nə̀ be ntʉ̀n",
    "french": "Vivant être",
    "english": "Alive to be"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Vivre",
    "english": "Live"
  },
  {
    "medumba": "Nə̀ tswə ntʉ̀n",
    "french": "Vivre",
    "english": "Live"
  },
  {
    "medumba": "Nə̀ yògə",
    "french": "Vivre",
    "english": "Live"
  },
  {
    "medumba": "Jûjʉ",
    "french": "Vivres",
    "english": "Live"
  },
  {
    "medumba": "Mα̂nzə̀",
    "french": "Voie",
    "english": "Lane"
  },
  {
    "medumba": "Nzə̀",
    "french": "Voie",
    "english": "Lane"
  },
  {
    "medumba": "Fìm",
    "french": "Viole",
    "english": "Viol"
  },
  {
    "medumba": "Nkua",
    "french": "Viole",
    "english": "Viol"
  },
  {
    "medumba": "Nə̀ fimə",
    "french": "Violer",
    "english": "Violate"
  },
  {
    "medumba": "Nə̀ mǎꞌ-nkua",
    "french": "Violer",
    "english": "Violate"
  },
  {
    "medumba": "Nə̀ yənə",
    "french": "Voir",
    "english": "See"
  },
  {
    "medumba": "Nə̀ yə̌n ntǎdntad",
    "french": "Voir flou",
    "english": "See blurred"
  },
  {
    "medumba": "Mɛ̀nmbaŋndα",
    "french": "Voisin",
    "english": "Neighbor"
  },
  {
    "medumba": "Mɛ̀nndʉ̌laꞌ",
    "french": "Voisin",
    "english": "Neighbor"
  },
  {
    "medumba": "Mὰtuα",
    "french": "Voiture",
    "english": "Car"
  },
  {
    "medumba": "Yaŋbàꞌ",
    "french": "Voiture",
    "english": "Car"
  },
  {
    "medumba": "Yaŋbàꞌncoꞌ",
    "french": "Voiture militaire",
    "english": "Military car"
  },
  {
    "medumba": "Nzə̀mɛ̀n",
    "french": "Voix",
    "english": "Voice"
  },
  {
    "medumba": "Nə̀fʉlə",
    "french": "Vol",
    "english": "Flight"
  },
  {
    "medumba": "Cɔ",
    "french": "Vol oiseau",
    "english": "Bird flight"
  },
  {
    "medumba": "Sitia",
    "french": "Volant",
    "english": "Steering wheel"
  },
  {
    "medumba": "Nə̀ yǐ",
    "french": "Voler",
    "english": "Fly"
  },
  {
    "medumba": "Nə̀ fʉlə",
    "french": "Voler oiseau",
    "english": "Flying bird"
  },
  {
    "medumba": "Ncɔ",
    "french": "Voleur",
    "english": "Thief"
  },
  {
    "medumba": "Kʉ̂ntʉ",
    "french": "Volonté",
    "english": "Will"
  },
  {
    "medumba": "Nə̀kɔ̌",
    "french": "Volonté",
    "english": "Will"
  },
  {
    "medumba": "Ghag",
    "french": "Volupté",
    "english": "Voluptuousness"
  },
  {
    "medumba": "Nə̀ kǒ",
    "french": "Vouloir",
    "english": "Want"
  },
  {
    "medumba": "Bin",
    "french": "Vous",
    "english": "You"
  },
  {
    "medumba": "Binαbo",
    "french": "Vous toi et eux",
    "english": "You and them"
  },
  {
    "medumba": "Nkadtə̀",
    "french": "Vous toi et lui",
    "english": "You and him"
  },
  {
    "medumba": "Ngàkadtə̀",
    "french": "Voyage",
    "english": "Travel"
  },
  {
    "medumba": "Nə̀ kadtə",
    "french": "Voyager",
    "english": "Travel"
  },
  {
    "medumba": "Ngàkadtə̀",
    "french": "Voyageur",
    "english": "Traveler"
  },
  {
    "medumba": "Miagnkuὰ",
    "french": "Voyant",
    "english": "LED"
  },
  {
    "medumba": "Njə̂nnzə̀",
    "french": "Voyant",
    "english": "LED"
  },
  {
    "medumba": "Ghagha",
    "french": "Voyou",
    "english": "Thug"
  },
  {
    "medumba": "Kaligə",
    "french": "Wagon",
    "english": "Wagon"
  },
  {
    "medumba": "Kalig dʉ̌ꞌndùꞌ",
    "french": "Wagon-bar",
    "english": "Bar car"
  },
  {
    "medumba": "Kalig ntsə",
    "french": "Wagon-citerne",
    "english": "Tank car"
  },
  {
    "medumba": "Kaligzi",
    "french": "Wagon-lit",
    "english": "Sleeper car"
  },
  {
    "medumba": "Kalig dʉ̌ꞌnə̀ jʉju",
    "french": "Wagon-restaurant",
    "english": "Dining car"
  },
  {
    "medumba": "Kod",
    "french": "W-c",
    "english": "W-c"
  },
  {
    "medumba": "Fitə̀ngabnjù",
    "french": "Week-end",
    "english": "Weekend"
  },
  {
    "medumba": "Kə̀kɔ̂ghʉ̀n",
    "french": "Xénophobe",
    "english": "Xenophobic"
  },
  {
    "medumba": "Ngàkɔ̌ghʉ̀n",
    "french": "Xénophyle",
    "english": "Xenophyll"
  },
  {
    "medumba": "Mfam",
    "french": "Xylocope",
    "english": "Xylocope"
  },
  {
    "medumba": "Nja",
    "french": "Xylophone",
    "english": "Xylophone"
  },
  {
    "medumba": "miαg",
    "french": "Yeux",
    "english": "Eyes"
  },
  {
    "medumba": "Bitə miαg",
    "french": "Yeux petits",
    "english": "Small eyes"
  },
  {
    "medumba": "Nkɔ miαg",
    "french": "Yeux gros",
    "english": "Big eyes"
  },
  {
    "medumba": "Fʉagwud",
    "french": "Zéle",
    "english": "Zeal"
  },
  {
    "medumba": "Ngàfʉagwud",
    "french": "Zélé",
    "english": "Zealous"
  },
  {
    "medumba": "Bα̌nbαn",
    "french": "Zéro",
    "english": "Zero"
  },
  {
    "medumba": "Bǎgbàb",
    "french": "Zigazg (en)",
    "english": "Zigazg"
  },
  {
    "medumba": "Ŋwâŋŋwaŋ",
    "french": "Zigzag (en)",
    "english": "Zigzag"
  },
  {
    "medumba": "Nə̀ nɛn bǎgbàg",
    "french": "Zigzaguer",
    "english": "Zigzag"
  },
  {
    "medumba": "Tòꞌtə̀",
    "french": "Zizanie",
    "english": "Zizanie"
  },
  {
    "medumba": "Zwìd ju kə̀bwɔ̀",
    "french": "Zizanie",
    "english": "Zizanie"
  },
  {
    "medumba": "Bǎgtʉꞌ",
    "french": "Zone",
    "english": "Area"
  },
  {
    "medumba": "Ndə",
    "french": "Zone pubienne",
    "english": "Pubic area"
  },
  {
    "medumba": "Kaꞌ bὰ nyαm",
    "french": "Zoo",
    "english": "Zoo"
  },
  {
    "medumba": "Ngα̂mnyὰn",
    "french": "Zoologie",
    "english": "Zoology"
  },
  {
    "medumba": "Ndɛ̀nngα̂nnyὰm",
    "french": "Zoologiste",
    "english": "Zoologist"
  },
  {
    "medumba": "Ŋwâŋŋwaŋ",
    "french": "Abandonner",
    "english": "Give up"
  },
  {
    "medumba": "Nə̀ nɛn bǎgbàg",
    "french": "Abandonner",
    "english": "Give up"
  },
  {
    "medumba": "Tòꞌtə̀",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Nə̀ faŋə",
    "french": "Abattre",
    "english": "Cut down"
  },
  {
    "medumba": "Nə̀ yɛ̀nə",
    "french": "Abolir",
    "english": "Abolish"
  },
  {
    "medumba": "Nə̀ wàlə",
    "french": "Avaler",
    "english": "Swallow"
  },
  {
    "medumba": "Nə̀ biagə",
    "french": "Accompagner",
    "english": "Accompany"
  },
  {
    "medumba": "Nə̀ mǐ",
    "french": "Accoucher",
    "english": "Give birth"
  },
  {
    "medumba": "Nə̀ càgə",
    "french": "Acheter",
    "english": "Buy"
  },
  {
    "medumba": "Nə̀ bwə",
    "french": "Achever",
    "english": "Complete"
  },
  {
    "medumba": "Nə̀ junə",
    "french": "Accepter",
    "english": "Accept"
  },
  {
    "medumba": "Nə̀ miàgtə̌",
    "french": "Adorer",
    "english": "worship"
  },
  {
    "medumba": "Nə̀ bamə",
    "french": "Affûter",
    "english": "Sharpen"
  },
  {
    "medumba": "Nə̀ ghamtə",
    "french": "S’agiter",
    "english": "Get agitated"
  },
  {
    "medumba": "Nə̀ kʉα̌",
    "french": "Agiter",
    "english": "Shake"
  },
  {
    "medumba": "Nə̀ nyǐꞌtə̌",
    "french": "Aider",
    "english": "Help"
  },
  {
    "medumba": "Nə̀ ywimtə̌",
    "french": "Aimer",
    "english": "Love"
  },
  {
    "medumba": "Nə̀ kɔ̌",
    "french": "Augmenter",
    "english": "Increase"
  },
  {
    "medumba": "Nə̀ nyɔ mɛn",
    "french": "Allaiter",
    "english": "Breastfeed"
  },
  {
    "medumba": "Nə̀ nɛ̀nə",
    "french": "Aller",
    "english": "Go"
  },
  {
    "medumba": "Nə̀ nyǐlə",
    "french": "Allonger",
    "english": "Lengthen"
  },
  {
    "medumba": "Nə̀ kwəꞌtə",
    "french": "Allumer",
    "english": "Turn on"
  },
  {
    "medumba": "Nə̀ tsəꞌtə",
    "french": "Amasser",
    "english": "Amass"
  },
  {
    "medumba": "Nə̀ ghʉ̌ sa",
    "french": "S’amuser",
    "english": "Have fun"
  },
  {
    "medumba": "Nə̀ ŋwatə",
    "french": "Animer",
    "english": "Animate"
  },
  {
    "medumba": "Nə̀ soŋə",
    "french": "Annoncer",
    "english": "Announce"
  },
  {
    "medumba": "Nə̀ làtə̌",
    "french": "Aplanir",
    "english": "Flatten"
  },
  {
    "medumba": "Nə̀ ŋwàgə",
    "french": "Apparaitre",
    "english": "Appear"
  },
  {
    "medumba": "Nə̀ tsiaŋə",
    "french": "Appeler",
    "english": "Call"
  },
  {
    "medumba": "Nə̀ ghəbtə",
    "french": "S’approcher",
    "english": "Approach"
  },
  {
    "medumba": "Nə̀ fiàŋə",
    "french": "Arracher",
    "english": "Tear off"
  },
  {
    "medumba": "Nə̀ ghòmə",
    "french": "Arrêter",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ twənsi",
    "french": "S’asseoir",
    "english": "Sit down"
  },
  {
    "medumba": "Nə̀ kulə",
    "french": "Attacher",
    "english": "Attach"
  },
  {
    "medumba": "Nə̀ kùmə",
    "french": "Arriver",
    "english": "Arrive"
  },
  {
    "medumba": "Nə̀ bebə",
    "french": "Attendre",
    "english": "Wait"
  },
  {
    "medumba": "Ǹə̀ mîntʉ̀n",
    "french": "Avaler",
    "english": "Swallow"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Avoir",
    "english": "Have"
  },
  {
    "medumba": "Nə̀ bèꞌtə̌",
    "french": "Balayer",
    "english": "Sweep"
  },
  {
    "medumba": "Nə̀ cobtə",
    "french": "Parler",
    "english": "Talk"
  },
  {
    "medumba": "Nə̀ cuꞌu",
    "french": "Bavarder",
    "english": "Chat"
  },
  {
    "medumba": "Nə̀ cὰbtə̌",
    "french": "Insulter",
    "english": "Insult"
  },
  {
    "medumba": "Nə̀ ləmə",
    "french": "Blesser",
    "english": "Hurt"
  },
  {
    "medumba": "Nə̀ nu",
    "french": "Boire",
    "english": "Drink"
  },
  {
    "medumba": "Nə̀ na",
    "french": "Cuire",
    "english": "Cook"
  },
  {
    "medumba": "Nə̀ lə̀mə",
    "french": "Cacher",
    "english": "Hide"
  },
  {
    "medumba": "Nə̀ kʉ",
    "french": "Brûler",
    "english": "Burn"
  },
  {
    "medumba": "Nə̀ tsilə",
    "french": "Casser",
    "english": "Break"
  },
  {
    "medumba": "Nə̀ tsinə",
    "french": "S’arrêtter",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ kàŋə",
    "french": "Transformer",
    "english": "Transform"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Chasser",
    "english": "Hunt"
  },
  {
    "medumba": "Nə̀ diàgə",
    "french": "Chercher",
    "english": "Search"
  },
  {
    "medumba": "Nə̀ coꞌo",
    "french": "Choisir",
    "english": "Choose"
  },
  {
    "medumba": "Nə̀ kǎ",
    "french": "Choisir",
    "english": "Choose"
  },
  {
    "medumba": "Nə̀ siaŋə",
    "french": "Compter",
    "english": "Count"
  },
  {
    "medumba": "Nə̀ tʉntə",
    "french": "Énumérer",
    "english": "List"
  },
  {
    "medumba": "Nə̀ kwàtə̌",
    "french": "Penser",
    "english": "Think"
  },
  {
    "medumba": "Nə̀ sòŋə",
    "french": "Tirer",
    "english": "Pull"
  },
  {
    "medumba": "Nə̀ càgtə̈",
    "french": "Conduire",
    "english": "Drive"
  },
  {
    "medumba": "Nə̀ yǒbkwǐ",
    "french": "Chanter",
    "english": "Sing"
  },
  {
    "medumba": "Nə̀ taꞌyòŋ",
    "french": "Chasser",
    "english": "Hunt"
  },
  {
    "medumba": "Nə̀ caŋə",
    "french": "Chercher",
    "english": "Search"
  },
  {
    "medumba": "Nə̀ tαgə",
    "french": "Conseiller",
    "english": "Advisor"
  },
  {
    "medumba": "Nə̀ nαnə",
    "french": "Contraindre",
    "english": "Constrain"
  },
  {
    "medumba": "Nə̀ kəbə",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Nə̀ nyàŋə",
    "french": "Danser",
    "english": "Dancing"
  },
  {
    "medumba": "Nə̀ bɛdtə",
    "french": "Demander",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Demeurer",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ ghɔ",
    "french": "Demeurer",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ togə",
    "french": "Passer",
    "english": "Pass"
  },
  {
    "medumba": "Nə̀ yǐ",
    "french": "Dérober",
    "english": "Steal"
  },
  {
    "medumba": "Nə̀ swəꞌə",
    "french": "Décendre",
    "english": "Decend"
  },
  {
    "medumba": "Nə̀ yagə",
    "french": "Sécher",
    "english": "Dry"
  },
  {
    "medumba": "Nə̀ kiαgə",
    "french": "Détacher",
    "english": "Detach"
  },
  {
    "medumba": "Nə̀ lamtə",
    "french": "Detouner",
    "english": "Detoner"
  },
  {
    "medumba": "Nə̀ ghὰbtə̀",
    "french": "Partager",
    "english": "Share"
  },
  {
    "medumba": "Nə̀ fα",
    "french": "Donner",
    "english": "Give"
  },
  {
    "medumba": "Nə̀ zi",
    "french": "Dormir",
    "english": "Sleep"
  },
  {
    "medumba": "Nə̀ mὰgtə̌",
    "french": "Douter",
    "english": "Doubt"
  },
  {
    "medumba": "Nə̀ vʉ̌",
    "french": "Échouer",
    "english": "Fail"
  },
  {
    "medumba": "Nə̀ kèꞌe",
    "french": "Éclairer",
    "english": "Light up"
  },
  {
    "medumba": "Nə̀ kitə̌",
    "french": "Écrire",
    "english": "Write"
  },
  {
    "medumba": "Nə̀ kǐ",
    "french": "Écrire",
    "english": "Write"
  },
  {
    "medumba": "Nə̀ bwə̀tə̌",
    "french": "Éffacer",
    "english": "Clear"
  },
  {
    "medumba": "Nə̀ bi",
    "french": "Pendre",
    "english": "hang"
  },
  {
    "medumba": "Nə̀ kwǐtə̌",
    "french": "Égrainer",
    "english": "Seed"
  },
  {
    "medumba": "Nə̀ sǒ",
    "french": "Enfoncer",
    "english": "Fucking"
  },
  {
    "medumba": "Nə̀ kàꞌtə̌",
    "french": "S’énorgueillir",
    "english": "Be proud"
  },
  {
    "medumba": "Nə̀ twǐtə̌",
    "french": "Enseigner",
    "english": "Teach"
  },
  {
    "medumba": "Nə̀ bə",
    "french": "Étre",
    "english": "To be"
  },
  {
    "medumba": "Nə̀ làntə̌",
    "french": "Tenter",
    "english": "Try"
  },
  {
    "medumba": "Nə̀ cʉα̌",
    "french": "Passer",
    "english": "Pass"
  },
  {
    "medumba": "Nə̀ bàgtə̌",
    "french": "Expliquer",
    "english": "Explain"
  },
  {
    "medumba": "Nə̀ làꞌa",
    "french": "Se fâcher",
    "english": "Get angry"
  },
  {
    "medumba": "Nə̀ yantʉ",
    "french": "Se fâcher",
    "english": "Get angry"
  },
  {
    "medumba": "Nə̀ bolə",
    "french": "Faiblir",
    "english": "Weaken"
  },
  {
    "medumba": "Nə̀ bàgə",
    "french": "Fendre",
    "english": "Split"
  },
  {
    "medumba": "Nə̀ fʉ̀nə",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ məmə",
    "french": "Étreindre",
    "english": "Hug"
  },
  {
    "medumba": "Nə̀ yɛ̀ntə̌",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ kabtə",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ cələ",
    "french": "Filtrer",
    "english": "Filter"
  },
  {
    "medumba": "Nə̀ badtə",
    "french": "Flatter",
    "english": "Flatter"
  },
  {
    "medumba": "Nə̀ cʉbə",
    "french": "Arrêter",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ buꞌu",
    "french": "Frapper",
    "english": "Hit"
  },
  {
    "medumba": "Nə̀ làbə",
    "french": "Frapper",
    "english": "Hit"
  },
  {
    "medumba": "Nə̀ ka",
    "french": "Frire",
    "english": "Fry"
  },
  {
    "medumba": "Nə̀ saŋtə",
    "french": "Frissonner",
    "english": "Shiver"
  },
  {
    "medumba": "Nə̀ yamə",
    "french": "Fructifier",
    "english": "Fruit"
  },
  {
    "medumba": "Nə̀ kʉ̌",
    "french": "Fuir",
    "english": "Run away"
  },
  {
    "medumba": "Nə̀ jʉ",
    "french": "Manger",
    "english": "Eat"
  },
  {
    "medumba": "Nə̀ bilə",
    "french": "Germer",
    "english": "Sprout"
  },
  {
    "medumba": "Nə̀ kuꞌu",
    "french": "Grandir",
    "english": "Growing up"
  },
  {
    "medumba": "Nə̀ yàtə̌",
    "french": "Guérir",
    "english": "Heal"
  },
  {
    "medumba": "Nə̀ mǎ nzwə",
    "french": "Habiller",
    "english": "Dress up"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Mûrir",
    "english": "Ripen"
  },
  {
    "medumba": "Nə̀ bὰnə",
    "french": "Hair",
    "english": "Hair"
  },
  {
    "medumba": "Nə̀ faꞌtə",
    "french": "Se heurter",
    "english": "Collide"
  },
  {
    "medumba": "Nə̀ fiꞌtə̌",
    "french": "Imiter",
    "english": "Imitate"
  },
  {
    "medumba": "Nə̀ kwiαgə",
    "french": "Tousser",
    "english": "Cough"
  },
  {
    "medumba": "Nə̀ beꞌtə",
    "french": "Décrire",
    "english": "Describe"
  },
  {
    "medumba": "Nə̀ cʉ̀ꞌʉ",
    "french": "Interdire",
    "english": "Ban"
  },
  {
    "medumba": "Nə̀ bɛdtə",
    "french": "Interroger",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ maꞌa",
    "french": "Jeter",
    "english": "Throw"
  },
  {
    "medumba": "Nə̀ yoŋə",
    "french": "Joindre",
    "english": "Join"
  },
  {
    "medumba": "Nə̀ tàmtə̌",
    "french": "Unir",
    "english": "Unite"
  },
  {
    "medumba": "Nə̀ coꞌtə",
    "french": "Juger",
    "english": "Judge"
  },
  {
    "medumba": "Nə̀ naŋə",
    "french": "Verser",
    "english": "Pour"
  },
  {
    "medumba": "Nə̀ kαgə",
    "french": "Lacher",
    "english": "Let go"
  },
  {
    "medumba": "Nə̀ kwaꞌa",
    "french": "Pleurer",
    "english": "Cry"
  },
  {
    "medumba": "Nə̀ maꞌa",
    "french": "Lancer",
    "english": "Throw"
  },
  {
    "medumba": "Nə̀ bolə",
    "french": "Languir",
    "english": "Languish"
  },
  {
    "medumba": "Nə̀ sogə",
    "french": "Laver",
    "english": "Wash"
  },
  {
    "medumba": "Nə̀ siaŋə",
    "french": "Lire",
    "english": "Read"
  },
  {
    "medumba": "Nə̀ swɛ̀nə",
    "french": "Vendre",
    "english": "Sell"
  },
  {
    "medumba": "Nə̀ zwə̌zwə̀ꞌ",
    "french": "Lutter",
    "english": "Fight"
  },
  {
    "medumba": "Nə̀ tebtə",
    "french": "Malaxer",
    "english": "Mix"
  },
  {
    "medumba": "Nə̀ ghʉ̀dnǐ",
    "french": "Ennuyer,nuir",
    "english": "Bore, harm"
  },
  {
    "medumba": "Nə̀ tsǐ",
    "french": "Manquer",
    "english": "Miss"
  },
  {
    "medumba": "Nə̀ zətə",
    "french": "Se méfier",
    "english": "Be wary"
  },
  {
    "medumba": "Nə̀ tadtə",
    "french": "Mentir",
    "english": "Lying"
  },
  {
    "medumba": "Nə̀ fèlə",
    "french": "Se métarmorphoser",
    "english": "Transform"
  },
  {
    "medumba": "Nə̀ fiꞌi",
    "french": "Mesurer",
    "english": "Measure"
  },
  {
    "medumba": "Nə̀ yαbə",
    "french": "Poser",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ yəntəsə",
    "french": "Se mirer",
    "english": "To look at yourself"
  },
  {
    "medumba": "Nə̀ famə",
    "french": "Moisir",
    "english": "Mold"
  },
  {
    "medumba": "Nə̀ coꞌcu",
    "french": "Moissonner",
    "english": "Harvest"
  },
  {
    "medumba": "Nə̀ koꞌo",
    "french": "Monter",
    "english": "Go up"
  },
  {
    "medumba": "Nə̀ làꞌtə̌",
    "french": "Montrer",
    "english": "Show"
  },
  {
    "medumba": "Nə̀ cogə",
    "french": "Mordre",
    "english": "bite"
  },
  {
    "medumba": "Nə̀ ghoꞌo",
    "french": "Moudre",
    "english": "Grind"
  },
  {
    "medumba": "Nə̀ kwʉ",
    "french": "Mourir",
    "english": "Die"
  },
  {
    "medumba": "Nə̀ juꞌu",
    "french": "Entendre",
    "english": "Hear"
  },
  {
    "medumba": "Nə̀ coŋə",
    "french": "Enterrer",
    "english": "Bury"
  },
  {
    "medumba": "Nə̀ co",
    "french": "Entrer",
    "english": "Enter"
  },
  {
    "medumba": "Nə̀ sàtə̌",
    "french": "Éparpiller",
    "english": "Scatter"
  },
  {
    "medumba": "Nə̀ cǎ",
    "french": "Errer",
    "english": "Wander"
  },
  {
    "medumba": "Nə̀ fὰntə̌",
    "french": "Se tromper",
    "english": "Make a mistake"
  },
  {
    "medumba": "Nə̀ nywintə",
    "french": "Espérer",
    "english": "Hope"
  },
  {
    "medumba": "Nə̀ zimtə",
    "french": "Murmurer",
    "english": "Whisper"
  },
  {
    "medumba": "Nə̀ lǎntsə",
    "french": "Nager",
    "english": "Swim"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Refuser",
    "english": "Refuse"
  },
  {
    "medumba": "Nə̀ kemə",
    "french": "Nourrir",
    "english": "Feed"
  },
  {
    "medumba": "Nə̀ sɛntə",
    "french": "Obscurcir",
    "english": "Obscure"
  },
  {
    "medumba": "Nə̀ lɔtə",
    "french": "Regarder",
    "english": "Watch"
  },
  {
    "medumba": "Nə̀ kèmtə̌",
    "french": "Oser",
    "english": "Dare"
  },
  {
    "medumba": "Nə̀ lɔtə",
    "french": "Ôter",
    "english": "Remove"
  },
  {
    "medumba": "Nə̀ ghaꞌa",
    "french": "Oublier",
    "english": "Forget"
  },
  {
    "medumba": "Nə̀ ghabə",
    "french": "Ouvrir",
    "english": "Open"
  },
  {
    "medumba": "Nə̀saꞌncà",
    "french": "Palabrer",
    "english": "Palaver"
  },
  {
    "medumba": "Nə̀ lɔ",
    "french": "Paresser",
    "english": "Laze"
  },
  {
    "medumba": "Nə̀ kα̌nmfə",
    "french": "Parjurer",
    "english": "Perjure"
  },
  {
    "medumba": "Nə̀ fɛntə",
    "french": "Patienter",
    "english": "Wait"
  },
  {
    "medumba": "Nə̀ yən ngəꞌ",
    "french": "Souffrir",
    "english": "Suffer"
  },
  {
    "medumba": "Nə̀ sòbə",
    "french": "Poignarder",
    "english": "Stabbing"
  },
  {
    "medumba": "Nə̀ to",
    "french": "Percer",
    "english": "Drill"
  },
  {
    "medumba": "Nə̀ bwɔ̌",
    "french": "Plaire",
    "english": "Please"
  },
  {
    "medumba": "Nə̀ ywǐlə",
    "french": "Planter",
    "english": "Plant"
  },
  {
    "medumba": "Nə̀ tɛnə",
    "french": "Pousser",
    "english": "Push"
  },
  {
    "medumba": "Nə̀ tomtə",
    "french": "Soutenir",
    "english": "Support"
  },
  {
    "medumba": "Nə̀ kwe",
    "french": "Prendre",
    "english": "Take"
  },
  {
    "medumba": "Nə̀ fǒ",
    "french": "Prêter",
    "english": "Lend"
  },
  {
    "medumba": "Nə̀ kwimtə",
    "french": "Se rappeler",
    "english": "Remember"
  },
  {
    "medumba": "Nə̀ komə",
    "french": "Raser",
    "english": "Shave"
  },
  {
    "medumba": "Nə̀ kʉmtə",
    "french": "Rassembler",
    "english": "Gather"
  },
  {
    "medumba": "Nə̀ lə̀ꞌtə̌",
    "french": "Prier",
    "english": "Pray"
  },
  {
    "medumba": "Nə̀ kʉꞌtə",
    "french": "Réculer",
    "english": "Back"
  },
  {
    "medumba": "Nə̀ fi",
    "french": "Refroidir",
    "english": "Cool"
  },
  {
    "medumba": "Nə̀ tɔ̌",
    "french": "Régner",
    "english": "Reign"
  },
  {
    "medumba": "Nə̀ tsiàntə̌",
    "french": "Se rejouir",
    "english": "Rejoice"
  },
  {
    "medumba": "Nə̀ làbtə̌",
    "french": "Remercier",
    "english": "Thank"
  },
  {
    "medumba": "Nə̀ dunə",
    "french": "Remplir",
    "english": "Fill"
  },
  {
    "medumba": "Nə̀ fə",
    "french": "Rentrer",
    "english": "Return"
  },
  {
    "medumba": "Nə̀ bʉ̀ntə̌",
    "french": "Répondre",
    "english": "Reply"
  },
  {
    "medumba": "Nə̀ fitə",
    "french": "Se reposer",
    "english": "Rest"
  },
  {
    "medumba": "Nə̀ zwiagə",
    "french": "Respirer",
    "english": "Breathe"
  },
  {
    "medumba": "Nə̀ bamə",
    "french": "Accepter",
    "english": "Accept"
  },
  {
    "medumba": "Nə̀ sɛnə",
    "french": "Être enretard",
    "english": "Being late"
  },
  {
    "medumba": "Nə̀ cʉbə",
    "french": "Tenir",
    "english": "Hold"
  },
  {
    "medumba": "Nə̀ bwoŋtə",
    "french": "Repéter",
    "english": "Repeat"
  },
  {
    "medumba": "Nə̀ bwoŋtə",
    "french": "Rouler",
    "english": "Roll"
  },
  {
    "medumba": "Nə̀ caꞌtə̌",
    "french": "Saluer",
    "english": "Greet"
  },
  {
    "medumba": "Nə̀ ziagə",
    "french": "Scintiller",
    "english": "Sparkle"
  },
  {
    "medumba": "Nə̀ vɛnə",
    "french": "Sculpter",
    "english": "Sculpt"
  },
  {
    "medumba": "Nə̀ yagə",
    "french": "Sécher",
    "english": "Dry"
  },
  {
    "medumba": "Nə̀ ywǐlə",
    "french": "Semer",
    "english": "Sow"
  },
  {
    "medumba": "Nə̀ làmə",
    "french": "Sentir",
    "english": "Feel"
  },
  {
    "medumba": "Nə̀ mfàgtə̌",
    "french": "Séparer",
    "english": "Separate"
  },
  {
    "medumba": "Nə̀ tɔ",
    "french": "Siffler",
    "english": "Whistle"
  },
  {
    "medumba": "Nə̀ ḳɔ̌",
    "french": "Aimer",
    "english": "Love"
  },
  {
    "medumba": "Mbaŋbwe",
    "french": "A cote̍",
    "english": "Next to it"
  },
  {
    "medumba": "Mbaŋ bwe",
    "french": "A cote̍ de",
    "english": "Next to"
  },
  {
    "medumba": "Bû zwim",
    "french": "A droite",
    "english": "On the right"
  },
  {
    "medumba": "Bû kwèb",
    "french": "A gauche",
    "english": "On the left"
  },
  {
    "medumba": "Bα̌g ntûmnyàm",
    "french": "A l’est",
    "english": "To the east"
  },
  {
    "medumba": "Njʉ",
    "french": "A l’exterieur",
    "english": "Outside"
  },
  {
    "medumba": "Njàmnjʉ",
    "french": "A l’exterieur",
    "english": "Outside"
  },
  {
    "medumba": "Ntʉ̂m bwe",
    "french": "A l’interieur",
    "english": "Inside"
  },
  {
    "medumba": "Bα̌g mbînyàm",
    "french": "A l’ouest",
    "english": "To the west"
  },
  {
    "medumba": "Nə̀toʼte",
    "french": "A partir de",
    "english": "From"
  },
  {
    "medumba": "Fə̀",
    "french": "A partir de",
    "english": "From"
  },
  {
    "medumba": "Nə̀faŋəw",
    "french": "Abandon",
    "english": "Abandonment"
  },
  {
    "medumba": "Nə́ faŋe",
    "french": "Abandonner",
    "english": "Give up"
  },
  {
    "medumba": "Nə̀ yɛ̀nə",
    "french": "Abandonner",
    "english": "Give up"
  },
  {
    "medumba": "Nə̀ nyα",
    "french": "Abandonner",
    "english": "Give up"
  },
  {
    "medumba": "Nə̀ kəbə",
    "french": "Abattre",
    "english": "Cut down"
  },
  {
    "medumba": "Nə̀ kəꞌə",
    "french": "Abattre",
    "english": "Cut down"
  },
  {
    "medumba": "Nə̀ wàlə",
    "french": "Abattre",
    "english": "Cut down"
  },
  {
    "medumba": "Nèyob",
    "french": "Abattu",
    "english": "Shot down"
  },
  {
    "medumba": "Ŋwaꞌa",
    "french": "Abeille",
    "english": "Bee"
  },
  {
    "medumba": "Nè blagə",
    "french": "Abolir",
    "english": "Abolish"
  },
  {
    "medumba": "Nə̀ bagtə",
    "french": "Abolir",
    "english": "Abolish"
  },
  {
    "medumba": "Nǔndɛ̌nnko",
    "french": "Abomination",
    "english": "Abomination"
  },
  {
    "medumba": "Nùkə̀bwɔ̀",
    "french": "Abomination",
    "english": "Abomination"
  },
  {
    "medumba": "nǔŋuꞌu",
    "french": "Abomination",
    "english": "Abomination"
  },
  {
    "medumba": "Fùꞌ",
    "french": "Abondance",
    "english": "Abundance"
  },
  {
    "medumba": "Nə̀ sə̀btə̌",
    "french": "Abre̍ger",
    "english": "Abbreviate"
  },
  {
    "medumba": "A kə bətə",
    "french": "Abre̍ger",
    "english": "Abbreviate"
  },
  {
    "medumba": "A kə nsi",
    "french": "Absent (il est)",
    "english": "Absent (he is)"
  },
  {
    "medumba": "A tàgə",
    "french": "Absent (il est)",
    "english": "Absent (he is)"
  },
  {
    "medumba": "A siìꞌl",
    "french": "Absent (il est)",
    "english": "Absent (he is)"
  },
  {
    "medumba": "Nə̀ mǐ",
    "french": "Absenter (sꞌ)",
    "english": "Absent (sꞌ)"
  },
  {
    "medumba": "Nə̀ mǐntùn",
    "french": "Absorber",
    "english": "Absorb"
  },
  {
    "medumba": "Fʉ̀mwud",
    "french": "Abus",
    "english": "Abuse"
  },
  {
    "medumba": "Nə̀yaꞌ nkaꞌ",
    "french": "Abus",
    "english": "Abuse"
  },
  {
    "medumba": "Nə̀ fʉ̌mwud",
    "french": "Abuser",
    "english": "Abuse"
  },
  {
    "medumba": "Nə̀ yaꞌ nkaꞌ",
    "french": "Abuser",
    "english": "Abuse"
  },
  {
    "medumba": "Nə̀ bamə",
    "french": "Accepter",
    "english": "Accept"
  },
  {
    "medumba": "Fà",
    "french": "Accident",
    "english": "Accident"
  },
  {
    "medumba": "vʉ̂fa",
    "french": "Accident mortel",
    "english": "Fatal accident"
  },
  {
    "medumba": "Nə̀ ladtə̌",
    "french": "Accoler",
    "english": "Attach"
  },
  {
    "medumba": "Nə̀ làdtə̌ wud",
    "french": "Acoler(sꞌ)ꞌ",
    "english": "Acoler(sꞌ)ꞌ"
  },
  {
    "medumba": "Nə̀ làd wud",
    "french": "Acoler (sꞌ)",
    "english": "Acoler (sꞌ)"
  },
  {
    "medumba": "Ǹə̀ bwə̌",
    "french": "Accompagner",
    "english": "Accompany"
  },
  {
    "medumba": "Nə̀ tam njàm",
    "french": "Accompagner",
    "english": "Accompany"
  },
  {
    "medumba": "Nə̀ càgə",
    "french": "Accompagner",
    "english": "Accompany"
  },
  {
    "medumba": "Nə̀ tə",
    "french": "Acompagner",
    "english": "Accompany"
  },
  {
    "medumba": "Nə̀ bùmtə̌",
    "french": "Acomplir",
    "english": "Accomplish"
  },
  {
    "medumba": "Nə̀ sαgtə",
    "french": "Accomplir (sꞌ)",
    "english": "Accomplish (sꞌ)"
  },
  {
    "medumba": "Ncùncʉꞌ",
    "french": "Accord",
    "english": "Agreement"
  },
  {
    "medumba": "Nə̀ bə ncùncʉꞌ",
    "french": "Accord (être d́ꞌ)",
    "english": "Agreement (to be d́ꞌ)"
  },
  {
    "medumba": "Nə̀ bamə",
    "french": "Accorder",
    "english": "Grant"
  },
  {
    "medumba": "Bwə",
    "french": "Accouchement",
    "english": "Childbirth"
  },
  {
    "medumba": "Nə̀mbwə",
    "french": "Accouchement",
    "english": "Childbirth"
  },
  {
    "medumba": "Nə̀ bwə",
    "french": "Accocher",
    "english": "Hang"
  },
  {
    "medumba": "nkwêmɛn",
    "french": "Accoucheur",
    "english": "Midwife"
  },
  {
    "medumba": "Nə̀ felə",
    "french": "Acculer",
    "english": "Corner"
  },
  {
    "medumba": "Nə̀ tɛntə ncâgə",
    "french": "Acculer",
    "english": "Corner"
  },
  {
    "medumba": "Nə̀ tsiag bwə",
    "french": "Acculer",
    "english": "Corner"
  },
  {
    "medumba": "Mbotə̀mɛ̀n",
    "french": "Accusateur",
    "english": "Accuser"
  },
  {
    "medumba": "Ngàbotə̀mɛ̀n",
    "french": "Accusateur",
    "english": "Accuser"
  },
  {
    "medumba": "Botə̀",
    "french": "Accusation",
    "english": "Accusation"
  },
  {
    "medumba": "Nə̀botə",
    "french": "Accusation",
    "english": "Accusation"
  },
  {
    "medumba": "Nə̀ coꞌ kùd mɛ̀n",
    "french": "Accusation (fausse)",
    "english": "Accusation (false)"
  },
  {
    "medumba": "Nə̀ botə mɛ̀n",
    "french": "Accuser",
    "english": "Accuse"
  },
  {
    "medumba": "Nə̀june",
    "french": "Achat",
    "english": "Purchase"
  },
  {
    "medumba": "Nə̀ june",
    "french": "Acheter",
    "english": "Buy"
  },
  {
    "medumba": "Ngàjun",
    "french": "Acheteur",
    "english": "Buyer"
  },
  {
    "medumba": "Njûnju",
    "french": "Acheteur",
    "english": "Buyer"
  },
  {
    "medumba": "nə̀miàgtə̌",
    "french": "Achèvement",
    "english": "Completion"
  },
  {
    "medumba": "Nə̀ mǐ",
    "french": "Achever",
    "english": "Complete"
  },
  {
    "medumba": "Nə̀ miàgtə̌",
    "french": "Achever",
    "english": "Complete"
  },
  {
    "medumba": "Nə̀ bètə̌",
    "french": "Affùter(tailler)",
    "english": "Sharpen (cut)"
  },
  {
    "medumba": "Nə̀ nὰbtə̌",
    "french": "Affùter(ses armes)",
    "english": "Sharpen(his weapons)"
  },
  {
    "medumba": "Ndʉ",
    "french": "Afin que",
    "english": "So that"
  },
  {
    "medumba": "Ngǔꞌnjʉ̂",
    "french": "Age",
    "english": "Age"
  },
  {
    "medumba": "Ngǔꞌnjʉ̂fàꞌ",
    "french": "Age de travail",
    "english": "Working age"
  },
  {
    "medumba": "Ngǔꞌnjʉ̂nandα",
    "french": "Age nubile",
    "english": "Marriageable age"
  },
  {
    "medumba": "Nə̀ kwǐm ntûnkə̀kwiꞌ nsi",
    "french": "Agenouiller",
    "english": "Kneel"
  },
  {
    "medumba": "Vògtə̀",
    "french": "Agitation",
    "english": "Agitation"
  },
  {
    "medumba": "Faꞌtə̀",
    "french": "Agitation",
    "english": "Agitation"
  },
  {
    "medumba": "Bum",
    "french": "Agitation",
    "english": "Agitation"
  },
  {
    "medumba": "Ngàvògtə̀",
    "french": "Agite̍",
    "english": "Shake"
  },
  {
    "medumba": "Ngàfaꞌtə̀",
    "french": "Agite̍",
    "english": "Shake"
  },
  {
    "medumba": "Ngàbum",
    "french": "Agite̍",
    "english": "Shake"
  },
  {
    "medumba": "Nə̀ nyiꞌtə̌",
    "french": "Agiter",
    "english": "Shake"
  },
  {
    "medumba": "Nə̀ bumə",
    "french": "Agiter (sꞌ)",
    "english": "Shake (sꞌ)"
  },
  {
    "medumba": "Nə̀ faꞌtə",
    "french": "Agiter (sꞌ)",
    "english": "Shake (sꞌ)"
  },
  {
    "medumba": "Nə̀ vògtə̌",
    "french": "Agiter (sꞌ)",
    "english": "Shake (sꞌ)"
  },
  {
    "medumba": "Mɛnjʉ̀mbwə",
    "french": "Agneau",
    "english": "Lamb"
  },
  {
    "medumba": "Ncùncò",
    "french": "Arme̍e",
    "english": "Weapon"
  },
  {
    "medumba": "Mvɛd mə̀bwɔ",
    "french": "Aromate",
    "english": "Aromatic"
  },
  {
    "medumba": "Làmtə̂la",
    "french": "Aromate",
    "english": "Aromatic"
  },
  {
    "medumba": "Nə̀ còvo",
    "french": "Arracher",
    "english": "Tear off"
  },
  {
    "medumba": "Nə̀ fià̀ŋə",
    "french": "Arracher",
    "english": "Tear off"
  },
  {
    "medumba": "Nə̀ghòmə",
    "french": "Arrestation",
    "english": "Arrest"
  },
  {
    "medumba": "Nə̀tsinə",
    "french": "Arrêt (stop)",
    "english": "Stop (stop)"
  },
  {
    "medumba": "ŋwàꞌnikə̂bncà",
    "french": "Arrêt (de justice)",
    "english": "Judgment (of justice)"
  },
  {
    "medumba": "Ncʉꞌ",
    "french": "Arrête̍",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ cʉbə",
    "french": "Arrêter",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ tsine",
    "french": "Arrêter",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀kùmə",
    "french": "Arrive̍e",
    "english": "Arrival"
  },
  {
    "medumba": "Nə̀ kùꞌu",
    "french": "Arriver",
    "english": "Arrive"
  },
  {
    "medumba": "Nə̀ kumə",
    "french": "Arriver",
    "english": "Arrive"
  },
  {
    "medumba": "Nə̀ sə̀ꞌə",
    "french": "Arriver",
    "english": "Arrive"
  },
  {
    "medumba": "Fědmɛ̀n",
    "french": "Arriviste",
    "english": "Careerist"
  },
  {
    "medumba": "Ncʉὰnco",
    "french": "Arriviste",
    "english": "Careerist"
  },
  {
    "medumba": "Fid",
    "french": "Arrogance",
    "english": "Arrogance"
  },
  {
    "medumba": "Koꞌ tə̀wud",
    "french": "Arrogance",
    "english": "Arrogance"
  },
  {
    "medumba": "Ntâꞌ nku",
    "french": "Arrogance",
    "english": "Arrogance"
  },
  {
    "medumba": "Cὰbncù",
    "french": "Arrogance",
    "english": "Arrogance"
  },
  {
    "medumba": "Ngàcα̌bncù",
    "french": "Arrogant",
    "english": "Arrogant"
  },
  {
    "medumba": "Ngàfid",
    "french": "Arrogant",
    "english": "Arrogant"
  },
  {
    "medumba": "Ngàkoꞌtəwud",
    "french": "Arrogant",
    "english": "Arrogant"
  },
  {
    "medumba": "Ngàntâꞌ nkù",
    "french": "Arrogant",
    "english": "Arrogant"
  },
  {
    "medumba": "Tǎŋngɔ̀",
    "french": "Arrondissement",
    "english": "District"
  },
  {
    "medumba": "Nə̀ zwìꞌi",
    "french": "Arroser",
    "english": "Water"
  },
  {
    "medumba": "Nə̀ ywɛlə̀",
    "french": "Arroser",
    "english": "Water"
  },
  {
    "medumba": "Tsîntsə",
    "french": "Arrosoir",
    "english": "Watering can"
  },
  {
    "medumba": "Mbwôŋnc̩a",
    "french": "Artère",
    "english": "Artery"
  },
  {
    "medumba": "Njǒŋvogə",
    "french": "Articulation",
    "english": "Joint"
  },
  {
    "medumba": "Ngàvə̀",
    "french": "Artiste",
    "english": "Artist"
  },
  {
    "medumba": "Nə̀ femə",
    "french": "Asperger",
    "english": "Asperger's"
  },
  {
    "medumba": "Nə̀ file",
    "french": "Aspirer",
    "english": "Aspire"
  },
  {
    "medumba": "Nə̀ ghəbtə",
    "french": "Aspirer",
    "english": "Aspire"
  },
  {
    "medumba": "Nə̀ sǒŋə",
    "french": "Apirer(un fluide)",
    "english": "Aspirate (a fluid)"
  },
  {
    "medumba": "Mαnjô",
    "french": "Assemblée",
    "english": "Assembly"
  },
  {
    "medumba": "Mbǔntə",
    "french": "Assemblée",
    "english": "Assembly"
  },
  {
    "medumba": "Ntsəꞌtə̀",
    "french": "Assemblée",
    "english": "Assembly"
  },
  {
    "medumba": "Nə̀ təwə nsi",
    "french": "Assoseoir(sꞌ)",
    "english": "Seat(sꞌ)"
  },
  {
    "medumba": "Nə̀ tətùn",
    "french": "Asseoir(sʼ)",
    "english": "Sit(s)"
  },
  {
    "medumba": "Kà",
    "french": "Assiette",
    "english": "Plate"
  },
  {
    "medumba": "Bàgko",
    "french": "Assiette(plat)",
    "english": "Plate (dish)"
  },
  {
    "medumba": "Nə̀tswənsi",
    "french": "Assis",
    "english": "Sitting"
  },
  {
    "medumba": "Bwoŋbinntʉ̀m",
    "french": "Assistance",
    "english": "Support"
  },
  {
    "medumba": "Ywìmtə̀",
    "french": "Assistance",
    "english": "Support"
  },
  {
    "medumba": "Nə̀ bə bwə",
    "french": "Assister",
    "english": "Assist"
  },
  {
    "medumba": "Nə̀ ywìmtə̌",
    "french": "Assister",
    "english": "Assist"
  },
  {
    "medumba": "Kum",
    "french": "Association",
    "english": "Association"
  },
  {
    "medumba": "Tsəꞌ tə̀",
    "french": "Association",
    "english": "Association"
  },
  {
    "medumba": "ngàlɛ̌nnsa",
    "french": "Astrologue",
    "english": "Astrologer"
  },
  {
    "medumba": "Nkʉ̂nkʉ",
    "french": "Astuce",
    "english": "Tip"
  },
  {
    "medumba": "Mfʉ",
    "french": "Astuce",
    "english": "Tip"
  },
  {
    "medumba": "ngànkʉ̂nkʉ",
    "french": "Astucieux",
    "english": "Clever"
  },
  {
    "medumba": "Dʉ̌ꞌ fàꞌ",
    "french": "Atelier",
    "english": "Workshop"
  },
  {
    "medumba": "Nə̀ kulə \\",
    "french": "Attacher",
    "english": "Attach"
  },
  {
    "medumba": "nə̀lǎd wud",
    "french": "Attacher  (sꞌ)",
    "english": "Attach (sꞌ)"
  },
  {
    "medumba": "Nə̀ sǒ wud",
    "french": "Attacher  (sꞌ)",
    "english": "Attach (sꞌ)"
  },
  {
    "medumba": "Ne kùma",
    "french": "Atteindre",
    "english": "Reach"
  },
  {
    "medumba": "Nə̀ bebə",
    "french": "Attendre",
    "english": "Wait"
  },
  {
    "medumba": "Nə̀ zwiꞌtə",
    "french": "Attendre",
    "english": "Wait"
  },
  {
    "medumba": "Nə̀bebə",
    "french": "Attente",
    "english": "Waiting"
  },
  {
    "medumba": "Bαmnα",
    "french": "Attention",
    "english": "Caution"
  },
  {
    "medumba": "Nə̀ bαmnα",
    "french": "Attention  (faire)",
    "english": "Be careful (do)"
  },
  {
    "medumba": "Nə̀ zetə",
    "french": "Attention  (faire)",
    "english": "Be careful (do)"
  },
  {
    "medumba": "Nə̀ sòŋə",
    "french": "Attirer",
    "english": "Attract"
  },
  {
    "medumba": "Nə̀ kwαbtə",
    "french": "Attirer",
    "english": "Attract"
  },
  {
    "medumba": "Nə̀ fə̀dtə̌",
    "french": "Attisser",
    "english": "Attract"
  },
  {
    "medumba": "Nə̀ ghomə",
    "french": "Attraper",
    "english": "Catch"
  },
  {
    "medumba": "Nə nywinə",
    "french": "Attrister",
    "english": "Sadden"
  },
  {
    "medumba": "Nə̀ nyamtə sə",
    "french": "Attrister",
    "english": "Sadden"
  },
  {
    "medumba": "Njàmnjʉ",
    "french": "Au dehors",
    "english": "Outside"
  },
  {
    "medumba": "Ncùndα",
    "french": "Au dehors",
    "english": "Outside"
  },
  {
    "medumba": "Ghaꞌtə̀ wud",
    "french": "Au large",
    "english": "Offshore"
  },
  {
    "medumba": "Ndʉsə",
    "french": "Au moment",
    "english": "At the moment"
  },
  {
    "medumba": "bǎg tu, tu",
    "french": "Au nord",
    "english": "To the north"
  },
  {
    "medumba": "Mfə tu",
    "french": "Au nord",
    "english": "To the north"
  },
  {
    "medumba": "Fɛn",
    "french": "Aubaine",
    "english": "Bargain"
  },
  {
    "medumba": "mαnkə̂bnjʉ",
    "french": "Aube",
    "english": "Dawn"
  },
  {
    "medumba": "mαghâtswəꞌ",
    "french": "Aube",
    "english": "Dawn"
  },
  {
    "medumba": "mfôgnjʉ",
    "french": "Aube",
    "english": "Dawn"
  },
  {
    "medumba": "ndα̂ghʉ̀n",
    "french": "Auberge",
    "english": "Hostel"
  },
  {
    "medumba": "sα̌mmɛ̀n",
    "french": "Aucun (personne)",
    "english": "None (person)"
  },
  {
    "medumba": "sα̌mju",
    "french": "Aucun objet, rien",
    "english": "No object, nothing"
  },
  {
    "medumba": "Kutu",
    "french": "Audace",
    "english": "Audacity"
  },
  {
    "medumba": "Nə̀kutu",
    "french": "Audacieux (être)",
    "english": "Bold (to be)"
  },
  {
    "medumba": "Kutumɛ̀n",
    "french": "Audacieux",
    "english": "Bold"
  },
  {
    "medumba": "mǒꞌyoŋ",
    "french": "Au-delà",
    "english": "Beyond"
  },
  {
    "medumba": "lə̂dntsə̌nyὰm",
    "french": "Auge",
    "english": "Trough"
  },
  {
    "medumba": "Nə̀ kwìꞌtə̌",
    "french": "Augmenter",
    "english": "Increase"
  },
  {
    "medumba": "Nə̀ cùba",
    "french": "Augmenter",
    "english": "Increase"
  },
  {
    "medumba": "sɛ̂nnî",
    "french": "Aujourdꞌhui",
    "english": "Today"
  },
  {
    "medumba": "Fə sɛ̂nnî",
    "french": "Aujourd’hui (dès̀)",
    "english": "Today (from)"
  },
  {
    "medumba": "Lò sɛ̂nnî",
    "french": "Aujourd’hui (dès)",
    "english": "Today (from)"
  },
  {
    "medumba": "Nə̀ toꞌtə sɛ̂nnî",
    "french": "Aujourd’hui (dès)",
    "english": "Today (from)"
  },
  {
    "medumba": "Mbwə̌mbwə̀",
    "french": "Auparavant",
    "english": "Previously"
  },
  {
    "medumba": "Coꞌ nguꞌu",
    "french": "Aure̍ole",
    "english": "Aureole"
  },
  {
    "medumba": "Nkêdntubu",
    "french": "Auriculaire (doigt)",
    "english": "Little finger (finger)"
  },
  {
    "medumba": "Nkêdntukù",
    "french": "Auriculaire (orteil)",
    "english": "Little finger (toe)"
  },
  {
    "medumba": "Nkə̂bnjʉ",
    "french": "Aurore",
    "english": "Aurora"
  },
  {
    "medumba": "Ndə̂ndə",
    "french": "Aussitôt",
    "english": "Immediately"
  },
  {
    "medumba": "Bə̂ ndə̂ndə",
    "french": "Aussitôt",
    "english": "Immediately"
  },
  {
    "medumba": "Ndʉ̀sə",
    "french": "Ausssitôt",
    "english": "Immediately"
  },
  {
    "medumba": "Bə̂ ndʉ̀sə",
    "french": "Aussitôt",
    "english": "Immediately"
  },
  {
    "medumba": "tǒmbwogə",
    "french": "Autel",
    "english": "Altar"
  },
  {
    "medumba": "Mὰtuὰ",
    "french": "Auto",
    "english": "Auto"
  },
  {
    "medumba": "Yaŋbàꞌ",
    "french": "Auto",
    "english": "Auto"
  },
  {
    "medumba": "Mbaꞌ ngʉ̀",
    "french": "Autorite̍",
    "english": "Authority"
  },
  {
    "medumba": "Nsaꞌngɔ̀",
    "french": "Autorite̍",
    "english": "Authority"
  },
  {
    "medumba": "Kòŋnzə̀",
    "french": "Autoroute",
    "english": "Highway"
  },
  {
    "medumba": "Moꞌ",
    "french": "Autre",
    "english": "Other"
  },
  {
    "medumba": "Zə̀wα",
    "french": "Autre",
    "english": "Other"
  },
  {
    "medumba": "Mɛ̀nwα",
    "french": "Autre (personne)",
    "english": "Other (person)"
  },
  {
    "medumba": "Juwα",
    "french": "Autre chose",
    "english": "something else"
  },
  {
    "medumba": "Mbwə̌mbwə̀",
    "french": "Autrefois",
    "english": "Formerly"
  },
  {
    "medumba": "Moꞌ ngə̀laŋ",
    "french": "Autrefois",
    "english": "Formerly"
  },
  {
    "medumba": "Tǔnntsə",
    "french": "Aval",
    "english": "Downstream"
  },
  {
    "medumba": "Nkwêntə",
    "french": "Aval",
    "english": "Downstream"
  },
  {
    "medumba": "Nə̀ mî",
    "french": "Avaler",
    "english": "Swallow"
  },
  {
    "medumba": "Nə̀ mî ntʉ̀n",
    "french": "Avaler",
    "english": "Swallow"
  },
  {
    "medumba": "Bìn",
    "french": "Avantage",
    "english": "Advantage"
  },
  {
    "medumba": "Fùꞌ",
    "french": "Avantage",
    "english": "Advantage"
  },
  {
    "medumba": "Bô",
    "french": "Avec",
    "english": "With"
  },
  {
    "medumba": "Ndʉ̀mαnjàms",
    "french": "Avenir",
    "english": "Future"
  },
  {
    "medumba": "tôŋnzə̀",
    "french": "Avenue",
    "english": "Avenue"
  },
  {
    "medumba": "mfʉ̌miαg",
    "french": "Aveugle",
    "english": "Blind"
  },
  {
    "medumba": "Fʉ",
    "french": "Aveuglement",
    "english": "Blindness"
  },
  {
    "medumba": "Nə̀ kα̌g fʉ",
    "french": "Aveugler",
    "english": "Blind"
  },
  {
    "medumba": "Nə̀ sɛntə miαg",
    "french": "Aveugler",
    "english": "Blind"
  },
  {
    "medumba": "Nǔsaŋvə̀",
    "french": "Aviation",
    "english": "Aviation"
  },
  {
    "medumba": "Bià",
    "french": "Avocat",
    "english": "Lawyer"
  },
  {
    "medumba": "cǒmmə̀kalə",
    "french": "Avocat",
    "english": "Lawyer"
  },
  {
    "medumba": "Mbàꞌ kamə",
    "french": "Avocat",
    "english": "Lawyer"
  },
  {
    "medumba": "Mbàꞌ saꞌ",
    "french": "Avocat",
    "english": "Lawyer"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Avoir",
    "english": "Have"
  },
  {
    "medumba": "Nə̀ kondɛ̀m",
    "french": "Avoir pitie̍",
    "english": "Have mercy"
  },
  {
    "medumba": "Cu",
    "french": "Avoirs",
    "english": "Assets"
  },
  {
    "medumba": "Nkab",
    "french": "Avoirs",
    "english": "Assets"
  },
  {
    "medumba": "Nə̀ sɔ̌ bàm",
    "french": "Avorter",
    "english": "Abort"
  },
  {
    "medumba": "Nə̀ nyìnə",
    "french": "B.a.(bonne action)",
    "english": "B.a.(good deed)"
  },
  {
    "medumba": "Ncà",
    "french": "Bagarre",
    "english": "Fight"
  },
  {
    "medumba": "Ne kǎm ncà",
    "french": "Bagarrer",
    "english": "Fight"
  },
  {
    "medumba": "Nə̀ zwězwə̀",
    "french": "Bagarrer",
    "english": "Fight"
  },
  {
    "medumba": "Ngàdiα̌gncà",
    "french": "Bagarreur",
    "english": "Brawler"
  },
  {
    "medumba": "Ngàncà",
    "french": "Bagarreur",
    "english": "Brawler"
  },
  {
    "medumba": "Ngàdiagndcà",
    "french": "Bagarreur",
    "english": "Brawler"
  },
  {
    "medumba": "Ngàcaŋncà",
    "french": "Bagarreur",
    "english": "Brawler"
  },
  {
    "medumba": "Nə̀ sǒg wud",
    "french": "Baigner (se)",
    "english": "Bathe"
  },
  {
    "medumba": "Nə̀ yegə",
    "french": "Bâiller",
    "english": "Yawn"
  },
  {
    "medumba": "Swαndα",
    "french": "Balai",
    "english": "Broom"
  },
  {
    "medumba": "Nə̀ bèꞌ tə̌",
    "french": "Balayer",
    "english": "Sweep"
  },
  {
    "medumba": "Nə̀nα̌nsîndα",
    "french": "Balayure",
    "english": "Sweep"
  },
  {
    "medumba": "Ndiaŋ",
    "french": "Bambou",
    "english": "Bamboo"
  },
  {
    "medumba": "nkǒꞌ lə̀",
    "french": "Bambou",
    "english": "Bamboo"
  },
  {
    "medumba": "Bàmntʉnə",
    "french": "Bambou(moellede)",
    "english": "Bamboo (pith)"
  },
  {
    "medumba": "Kəlɔ̀ bàkə̀lɔ̀",
    "french": "Banane",
    "english": "Banana"
  },
  {
    "medumba": "Tǔnkə̀lɔ",
    "french": "Bananier",
    "english": "Banana tree"
  },
  {
    "medumba": "ntɛ̂ntkə̀lɔ̀",
    "french": "Bananier",
    "english": "Banana tree"
  },
  {
    "medumba": "ndα̂nkαb",
    "french": "Banque",
    "english": "Bank"
  },
  {
    "medumba": "Dʉ nkαb",
    "french": "Banque",
    "english": "Bank"
  },
  {
    "medumba": "ndα̂mbʉm",
    "french": "Banque",
    "english": "Bank"
  },
  {
    "medumba": "kwêntsə",
    "french": "Baptême",
    "english": "Baptism"
  },
  {
    "medumba": "Nə̀ fα kwêntsə",
    "french": "Baptiser(administrer)",
    "english": "Baptize(administer)"
  },
  {
    "medumba": "Nə kwêntsə",
    "french": "Baptiser (se faire)",
    "english": "Baptize (become)"
  },
  {
    "medumba": "Nə̀ fα lɛn",
    "french": "Baptiser (donner un nom)",
    "english": "Baptize (give a name)"
  },
  {
    "medumba": "ndα̂ndùꞌ",
    "french": "Bar",
    "english": "Bar"
  },
  {
    "medumba": "dʉncù",
    "french": "Barbe",
    "english": "Beard"
  },
  {
    "medumba": "nyǎŋncù",
    "french": "Barbe",
    "english": "Beard"
  },
  {
    "medumba": "Làntsəbaꞌ",
    "french": "Barque",
    "english": "Boat"
  },
  {
    "medumba": "tâmntsì",
    "french": "Basket ball",
    "english": "Basketball"
  },
  {
    "medumba": "nə̀ndiàŋ",
    "french": "Bas ventre",
    "english": "Lower abdomen"
  },
  {
    "medumba": "Làntsəbaꞌ",
    "french": "Bateau",
    "english": "Boat"
  },
  {
    "medumba": "Kog, shuaꞌa",
    "french": "Bâton",
    "english": "Stick"
  },
  {
    "medumba": "Kʉlə",
    "french": "Bâtonnet",
    "english": "Stick"
  },
  {
    "medumba": "nsôŋcɔ",
    "french": "Bavard",
    "english": "Talkative"
  },
  {
    "medumba": "Nə̀ cobtə",
    "french": "Bavarder",
    "english": "Chat"
  },
  {
    "medumba": "Nə̀ cùꞌu",
    "french": "Bavarder",
    "english": "Chat"
  },
  {
    "medumba": "Nə̀ndʉ",
    "french": "Bave",
    "english": "Drool"
  },
  {
    "medumba": "Nkə̀kə̀",
    "french": "Bave (sèche)",
    "english": "Drool (dry)"
  },
  {
    "medumba": "bwɔ̌",
    "french": "Beau (belle)",
    "english": "Beautiful (beautiful)"
  },
  {
    "medumba": "Yαmə",
    "french": "Beaucoup",
    "english": "A lot"
  },
  {
    "medumba": "mɛ̂nndu",
    "french": "Beau-fils",
    "english": "Son-in-law"
  },
  {
    "medumba": "mɛ̂nnzwi",
    "french": "Beau-fils",
    "english": "Son-in-law"
  },
  {
    "medumba": "Ntsə",
    "french": "Beau-fils",
    "english": "Son-in-law"
  },
  {
    "medumba": "Mɛnndu",
    "french": "Beau-frère",
    "english": "Brother-in-law"
  },
  {
    "medumba": "Ntsə,tαndu",
    "french": "Beau-père",
    "english": "Father-in-law"
  },
  {
    "medumba": "Bwɔ̀",
    "french": "Beauté̍",
    "english": "Beauty"
  },
  {
    "medumba": "Nə̀ shʉꞌtə",
    "french": "Be̍gayer",
    "english": "Be̍gayer"
  },
  {
    "medumba": "Ngàshʉꞌtə̀",
    "french": "Bègue",
    "english": "Stutterer"
  },
  {
    "medumba": "kǒnjʉ̀",
    "french": "Be̍lier",
    "english": "Aries"
  },
  {
    "medumba": "Nzwimɛ̀n",
    "french": "Belle-fille",
    "english": "Daughter-in-law"
  },
  {
    "medumba": "mɛ̂nndu",
    "french": "Belle-fille",
    "english": "Daughter-in-law"
  },
  {
    "medumba": "mɛ̂nnzwi",
    "french": "Belle-fille",
    "english": "Daughter-in-law"
  },
  {
    "medumba": "Mαndu",
    "french": "Belle-mère",
    "english": "Mother-in-law"
  },
  {
    "medumba": "Mantsə",
    "french": "Belle-mère",
    "english": "Mother-in-law"
  },
  {
    "medumba": "Mαdu",
    "french": "Belle-sœur",
    "english": "Sister-in-law"
  },
  {
    "medumba": "Mαntsə",
    "french": "Belle-sœur",
    "english": "Sister-in-law"
  },
  {
    "medumba": "nyὰm",
    "french": "Bête",
    "english": "Beast"
  },
  {
    "medumba": "cən",
    "french": "Bête",
    "english": "Beast"
  },
  {
    "medumba": "Kʉ̂dfi",
    "french": "Bic (stylo)",
    "english": "Bic (pen)"
  },
  {
    "medumba": "Ngàfen",
    "french": "Bienheureux",
    "english": "Blessed"
  },
  {
    "medumba": "ngàsǒgnzwə",
    "french": "Blanchisseur",
    "english": "Launderer"
  },
  {
    "medumba": "Nsògnzwə",
    "french": "Blanchisseur",
    "english": "Launderer"
  },
  {
    "medumba": "Nə̀ cὰbtə̌",
    "french": "Blasphémer",
    "english": "Blaspheme"
  },
  {
    "medumba": "Nsa",
    "french": "Blé̍",
    "english": "Wheat"
  },
  {
    "medumba": "Nə̀ kəꞌə",
    "french": "Blesser",
    "english": "Hurt"
  },
  {
    "medumba": "Nə̀ ləmə",
    "french": "Blesser",
    "english": "Hurt"
  },
  {
    "medumba": "Mfaŋə",
    "french": "Blessure",
    "english": "Injury"
  },
  {
    "medumba": "Ncùmfaŋə",
    "french": "Blessure",
    "english": "Injury"
  },
  {
    "medumba": "lα̂faŋe",
    "french": "Blessure",
    "english": "Injury"
  },
  {
    "medumba": "Nyὰmnaꞌ",
    "french": "Bœuf",
    "english": "Beef"
  },
  {
    "medumba": "Naꞌ",
    "french": "Bœuf",
    "english": "Beef"
  },
  {
    "medumba": "Koŋ",
    "french": "Boîte",
    "english": "Box"
  },
  {
    "medumba": "Toꞌ",
    "french": "Boite",
    "english": "Box"
  },
  {
    "medumba": "Nə̀ kəꞌə",
    "french": "Boiter",
    "english": "Limp"
  },
  {
    "medumba": "mbàŋlôkʉꞌ",
    "french": "Boiteux",
    "english": "Lame"
  },
  {
    "medumba": "Nkə̀ꞌkɛ̀d",
    "french": "Boiteux",
    "english": "Lame"
  },
  {
    "medumba": "Nə̀ nu",
    "french": "Boire",
    "english": "Drink"
  },
  {
    "medumba": "ncwɛn",
    "french": "Bois",
    "english": "Wood"
  },
  {
    "medumba": "Fɛ̀n",
    "french": "Bois",
    "english": "Wood"
  },
  {
    "medumba": "Ncwɛn jum",
    "french": "Bois sec",
    "english": "Dry wood"
  },
  {
    "medumba": "Ncwɛ̂n fi",
    "french": "Bois vert",
    "english": "Green wood"
  },
  {
    "medumba": "jûnu",
    "french": "Boisson",
    "english": "Drink"
  },
  {
    "medumba": "bwɔ̂",
    "french": "Bon",
    "english": "Good"
  },
  {
    "medumba": "Mə̀bwɔ",
    "french": "Bon",
    "english": "Good"
  },
  {
    "medumba": "Mɛ̀nmə̀bwɔ",
    "french": "Bon",
    "english": "Good"
  },
  {
    "medumba": "Mbwɔ̀ju",
    "french": "Bon (chose)",
    "english": "Good (thing)"
  },
  {
    "medumba": "Mbwɔ̀mɛ̀n",
    "french": "Bon (personne)",
    "english": "Good (person)"
  },
  {
    "medumba": "Fən",
    "french": "Bonheur",
    "english": "Happiness"
  },
  {
    "medumba": "Fùꞌ",
    "french": "Bonheur",
    "english": "Happiness"
  },
  {
    "medumba": "ntswə̂mə̀bwɔ",
    "french": "Bonheur",
    "english": "Happiness"
  },
  {
    "medumba": "bwɔ̌ntʉ",
    "french": "Bonte̍",
    "english": "Goodness"
  },
  {
    "medumba": "Nkaŋ",
    "french": "Bord",
    "english": "Edge"
  },
  {
    "medumba": "Ngǒŋ",
    "french": "Bord",
    "english": "Edge"
  },
  {
    "medumba": "tǒdiαg",
    "french": "Borgne",
    "english": "One-eyed"
  },
  {
    "medumba": "Tuꞌ mvɛ̀n",
    "french": "Bossu",
    "english": "Hunchback"
  },
  {
    "medumba": "Ngaŋə",
    "french": "Boubou",
    "english": "Boubou"
  },
  {
    "medumba": "fǒdmbẁe",
    "french": "Bouc",
    "english": "Goat"
  },
  {
    "medumba": "Cùꞌtə̀",
    "french": "Boucan",
    "english": "Boucan"
  },
  {
    "medumba": "yâg mbαb",
    "french": "Boucane̍e ( viande)",
    "english": "Boucane̍e (meat)"
  },
  {
    "medumba": "Ncù",
    "french": "Bouche",
    "english": "Mouth"
  },
  {
    "medumba": "ncǔncù",
    "french": "Bouche à bouche",
    "english": "Mouth to mouth"
  },
  {
    "medumba": "Ncù miꞌi",
    "french": "Bouche be̍e",
    "english": "Sweet mouth"
  },
  {
    "medumba": "Nswɛn mbαb",
    "french": "Boucher",
    "english": "Butcher"
  },
  {
    "medumba": "wǎ mbαb",
    "french": "Bouche̍rie",
    "english": "Butchery"
  },
  {
    "medumba": "cɛ̂dncò",
    "french": "Bouclier",
    "english": "Shield"
  },
  {
    "medumba": "Nə̀ cʉàgtə̀wud",
    "french": "Bouder(par desgestes",
    "english": "Sulk (by gestures"
  },
  {
    "medumba": "Cʉàgtə̀wud",
    "french": "Bouderie",
    "english": "Sulking"
  },
  {
    "medumba": "Nə̀tòb",
    "french": "Boue",
    "english": "Mud"
  },
  {
    "medumba": "tòbtə̌",
    "french": "Boueux",
    "english": "Muddy"
  },
  {
    "medumba": "Nə̀bʉ̀nə",
    "french": "Bouillant",
    "english": "Boiling"
  },
  {
    "medumba": "ndûmmɛ̀n",
    "french": "Bouillant (homme)",
    "english": "Boiling (man)"
  },
  {
    "medumba": "Nə̀ ne",
    "french": "Bouillir",
    "english": "Boil"
  },
  {
    "medumba": "K̀òŋnzə̀",
    "french": "Boulevard",
    "english": "Boulevard"
  },
  {
    "medumba": "tɔ̌nə̀tòb",
    "french": "Bourbier",
    "english": "Quagmire"
  },
  {
    "medumba": "Ntòn",
    "french": "Bourgeon",
    "english": "Bud"
  },
  {
    "medumba": "Ntònnkʉα",
    "french": "Bourgeon (raphia)",
    "english": "Bud (raffia)"
  },
  {
    "medumba": "Nə̀ bɛd nkaŋə",
    "french": "Bourgeonner",
    "english": "Budding"
  },
  {
    "medumba": "Nə̀ zwiαgə",
    "french": "Bourrer",
    "english": "Stuff"
  },
  {
    "medumba": "Mvə̀ꞌ,ywimtə̀",
    "french": "Bourse",
    "english": "Stock market"
  },
  {
    "medumba": "Tudtə",
    "french": "Bousculade",
    "english": "Hustle"
  },
  {
    "medumba": "Nètɛndʉꞌ",
    "french": "Bousculade",
    "english": "Hustle"
  },
  {
    "medumba": "Nə̀ tudtə",
    "french": "Bouscuer",
    "english": "Hustle"
  },
  {
    "medumba": "Nə̀ tɛnə",
    "french": "Bousculer",
    "english": "hustle"
  },
  {
    "medumba": "Ncaŋ",
    "french": "Bouteille",
    "english": "Bottle"
  },
  {
    "medumba": "ndα̂ntαnə",
    "french": "Boutique",
    "english": "Shop"
  },
  {
    "medumba": "ngàndα̂ntαnə",
    "french": "Boutiquier",
    "english": "Shopkeeper"
  },
  {
    "medumba": "mbâꞌnzwə",
    "french": "Bouton",
    "english": "Button"
  },
  {
    "medumba": "Nyadnyὰm",
    "french": "Buffle",
    "english": "Buffalo"
  },
  {
    "medumba": "Tswəꞌfiaŋə",
    "french": "Buisson",
    "english": "Bush"
  },
  {
    "medumba": "Tswəꞌnə̀nὰ",
    "french": "Buisson",
    "english": "Bush"
  },
  {
    "medumba": "Dʉ̌ꞌfàꞌ",
    "french": "Bureau",
    "english": "Office"
  },
  {
    "medumba": "Nkǒꞌfàꞌ",
    "french": "Bureau",
    "english": "Office"
  },
  {
    "medumba": "Kʉdtɔ̀ngɔ̀",
    "french": "Bureaucratie",
    "english": "Bureaucracy"
  },
  {
    "medumba": "Ndα̂ndùꞌ",
    "french": "Buvette",
    "english": "Refreshment bar"
  },
  {
    "medumba": "Nûndùꞌ",
    "french": "Buveur",
    "english": "Drinker"
  },
  {
    "medumba": "Ngànu",
    "french": "Buveur",
    "english": "Drinker"
  },
  {
    "medumba": "Mənyitɔtɔ",
    "french": "Cache-cache",
    "english": "Hide and seek"
  },
  {
    "medumba": "Nə̀ lə̀mə",
    "french": "Cacher",
    "english": "Hide"
  },
  {
    "medumba": "Mα̂kwa",
    "french": "Cachet",
    "english": "Stamp"
  },
  {
    "medumba": "Sitαme",
    "french": "Cachet",
    "english": "Stamp"
  },
  {
    "medumba": "Nə̀ tə mα̂kwa",
    "french": "Cacheter",
    "english": "Seal"
  },
  {
    "medumba": "Nə̀ tesitαme",
    "french": "Cacheter",
    "english": "Seal"
  },
  {
    "medumba": "Fə",
    "french": "Ccadavre",
    "english": "Corpse"
  },
  {
    "medumba": "Ndàꞌ",
    "french": "Cadeau",
    "english": "Gift"
  },
  {
    "medumba": "Ndàꞌntum",
    "french": "Cadeau",
    "english": "Gift"
  },
  {
    "medumba": "Nə̀ fα ndàꞌ",
    "french": "Cadeau(faire)",
    "english": "Gift(make)"
  },
  {
    "medumba": "fʉ̀n",
    "french": "Cadenas",
    "english": "Padlock"
  },
  {
    "medumba": "ntʉ̂ꞌnjàm",
    "french": "Cadet",
    "english": "Cadet"
  },
  {
    "medumba": "Ngù",
    "french": "Cadi",
    "english": "Cadi"
  },
  {
    "medumba": "Nə̀ nu ngù",
    "french": "Cadi(boire le)",
    "english": "Cadi (drink it)"
  },
  {
    "medumba": "bâdndα",
    "french": "Cadre",
    "english": "Frame"
  },
  {
    "medumba": "Ndʉ",
    "french": "Cadre",
    "english": "Frame"
  },
  {
    "medumba": "Ngàcàgtə̀",
    "french": "Cadre",
    "english": "Frame"
  },
  {
    "medumba": "Tu",
    "french": "Cadre",
    "english": "Frame"
  },
  {
    "medumba": "Toꞌ",
    "french": "Cadre (tableau)",
    "english": "Frame (table)"
  },
  {
    "medumba": "Buꞌkì",
    "french": "Cahier",
    "english": "Notebook"
  },
  {
    "medumba": "Kwangòꞌ",
    "french": "Caillou",
    "english": "Caillou"
  },
  {
    "medumba": "Ngoꞌ",
    "french": "Caillou",
    "english": "Caillou"
  },
  {
    "medumba": "ngα̌mntsə",
    "french": "Caïman",
    "english": "Cayman"
  },
  {
    "medumba": "Nə̀tata",
    "french": "Calcul",
    "english": "Calculation"
  },
  {
    "medumba": "Loŋta",
    "french": "Calculatrice",
    "english": "Calculator"
  },
  {
    "medumba": "Nə̀ ta",
    "french": "Calculer",
    "english": "Calculate"
  },
  {
    "medumba": "Ntuꞌ",
    "french": "Calebasse",
    "english": "Calabash"
  },
  {
    "medumba": "tə̂nntsə",
    "french": "Calebasse",
    "english": "Calabash"
  },
  {
    "medumba": "shâꞌ nkʉα",
    "french": "Calebasse (pour vigner)",
    "english": "Calabash (for vineyard)"
  },
  {
    "medumba": "ngandαm",
    "french": "Calomniateur",
    "english": "Slanderer"
  },
  {
    "medumba": "ndαm",
    "french": "Calomnie",
    "english": "Slander"
  },
  {
    "medumba": "Nə̀ saꞌ ndαm",
    "french": "Calomnier",
    "english": "Slander"
  },
  {
    "medumba": "Nə̀ tana",
    "french": "Calomnier",
    "english": "Slander"
  },
  {
    "medumba": "běꞌ nùmnzwìn",
    "french": "Calvitie",
    "english": "Baldness"
  },
  {
    "medumba": "Tu nə̀tonsoꞌ",
    "french": "Calvitie en m",
    "english": "Baldness in m"
  },
  {
    "medumba": "Nkoŋkàg",
    "french": "Camion",
    "english": "Truck"
  },
  {
    "medumba": "Nə̀ lǎb zwì kog",
    "french": "Camoufler le rire",
    "english": "Hide the laughter"
  },
  {
    "medumba": "Ngâbntsə, lòd",
    "french": "Canard (cane)",
    "english": "Duck (duck)"
  },
  {
    "medumba": "kâbcaꞌa",
    "french": "Canari",
    "english": "Canary"
  },
  {
    "medumba": "Kətuꞌu",
    "french": "Canari",
    "english": "Canary"
  },
  {
    "medumba": "Mbɛnmbɛnəꞌ",
    "french": "Cancrelat",
    "english": "Cockroach"
  },
  {
    "medumba": "Fubntsə",
    "french": "Caniveau",
    "english": "Gutter"
  },
  {
    "medumba": "Kog",
    "french": "Canne",
    "english": "Cane"
  },
  {
    "medumba": "Nkə̀ku",
    "french": "Canne à sucre",
    "english": "Sugar cane"
  },
  {
    "medumba": "kwǐywɛlə",
    "french": "Cantique",
    "english": "Song"
  },
  {
    "medumba": "yǒbkwi",
    "french": "Cantique",
    "english": "Song"
  },
  {
    "medumba": "A ghʉ ngʉꞌ",
    "french": "Capable ( il est)",
    "english": "Capable (he is)"
  },
  {
    "medumba": "A kùꞌnǐ",
    "french": "Capable ( il est)",
    "english": "Capable (he is)"
  },
  {
    "medumba": "Mbàꞌ",
    "french": "Capacité̍",
    "english": "Capacity"
  },
  {
    "medumba": "Nə̀kùꞌnǐ",
    "french": "Capacité",
    "english": "Capacity"
  },
  {
    "medumba": "Nə̀kuꞌ nǐ",
    "french": "Capacité",
    "english": "Capacity"
  },
  {
    "medumba": "Ngʉꞌ",
    "french": "Capacité",
    "english": "Capacity"
  },
  {
    "medumba": "Ntəd",
    "french": "Capital",
    "english": "Capital"
  },
  {
    "medumba": "Mα̂ntəd",
    "french": "Capital (initial)",
    "english": "Capital (initial)"
  },
  {
    "medumba": "Tɛ̀dlaꞌ",
    "french": "Capitale",
    "english": "Capital"
  },
  {
    "medumba": "Tɛdngɔ,ncwɛd",
    "french": "Capitale",
    "english": "Capital"
  },
  {
    "medumba": "Bùꞌ",
    "french": "Captif",
    "english": "Captive"
  },
  {
    "medumba": "Nə̀ ghòmə",
    "french": "Captiver",
    "english": "Captivate"
  },
  {
    "medumba": "Yaŋbàꞌ",
    "french": "Capturer",
    "english": "Capture"
  },
  {
    "medumba": "nǔmmbə̂",
    "french": "Car (automobile)",
    "english": "Car (automobile)"
  },
  {
    "medumba": "Nbùmtə̀nzə̀",
    "french": "Car (conjonction)",
    "english": "Because (conjunction)"
  },
  {
    "medumba": "Mbùmtə̀nzə",
    "french": "Carrefour",
    "english": "Crossroads"
  },
  {
    "medumba": "Mfàgtənzə̀",
    "french": "Carrefour",
    "english": "Crossroads"
  },
  {
    "medumba": "Bàꞌ",
    "french": "Case",
    "english": "Box"
  },
  {
    "medumba": "bǎꞌ ghʉ̀n",
    "french": "Case de passage",
    "english": "Passage box"
  },
  {
    "medumba": "Kag",
    "french": "Casier",
    "english": "Locker"
  },
  {
    "medumba": "Nə̀ tsilə",
    "french": "Casser",
    "english": "Break"
  },
  {
    "medumba": "sǎlαg",
    "french": "Cataracte",
    "english": "Cataract"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Causer(occasionner)",
    "english": "Cause(cause)"
  },
  {
    "medumba": "Nə̀ cobtə",
    "french": "Causer (parler)",
    "english": "Cause (speak)"
  },
  {
    "medumba": "Cwɛ̀d",
    "french": "Caution",
    "english": "Deposit"
  },
  {
    "medumba": "Nə tomtə nu",
    "french": "Cautionner",
    "english": "Bail"
  },
  {
    "medumba": "Nə̀ yab cwɛ̀d",
    "french": "Cautionner",
    "english": "Bail"
  },
  {
    "medumba": "Ngàblòŋ",
    "french": "Caverne",
    "english": "Cave"
  },
  {
    "medumba": "Ju ze",
    "french": "Ce que",
    "english": "What"
  },
  {
    "medumba": "Fʉ",
    "french": "Ce̍cite̍",
    "english": "Cecite"
  },
  {
    "medumba": "Nə̀ kὰgə",
    "french": "Ceder",
    "english": "Give in"
  },
  {
    "medumba": "Nə̀ faŋe, nə̀ nyα",
    "french": "Ceder",
    "english": "Give in"
  },
  {
    "medumba": "Kòb",
    "french": "Ceinture",
    "english": "Belt"
  },
  {
    "medumba": "Nə̀ tsiàŋtə̌",
    "french": "Ce̍le̍brer",
    "english": "Celebrate"
  },
  {
    "medumba": "Nə̀ fα nkùꞌ nì",
    "french": "Ce̍le̍brer",
    "english": "Celebrate"
  },
  {
    "medumba": "ndûmmɛ̀n",
    "french": "Ce̍lèbre",
    "english": "Famous"
  },
  {
    "medumba": "Ghàꞌju",
    "french": "Ce̍lèbre",
    "english": "Famous"
  },
  {
    "medumba": "Nkwì",
    "french": "Ce̍libat",
    "english": "Celibate"
  },
  {
    "medumba": "nkwimbâ",
    "french": "Ce̍libataire",
    "english": "Single"
  },
  {
    "medumba": "Koŋfəmɛ̀n",
    "french": "Cercueil",
    "english": "Coffin"
  },
  {
    "medumba": "Mbuꞌmfə",
    "french": "Cercueil",
    "english": "Coffin"
  },
  {
    "medumba": "njuαnyὰm",
    "french": "Cerf",
    "english": "Deer"
  },
  {
    "medumba": "ndǎŋndaŋ",
    "french": "Certain",
    "english": "Certain"
  },
  {
    "medumba": "Nənʉnə",
    "french": "Certain",
    "english": "Certain"
  },
  {
    "medumba": "Moꞌ",
    "french": "Certain",
    "english": "Certain"
  },
  {
    "medumba": "Tsə̀moꞌ o",
    "french": "Certain (s)",
    "english": "Certain(s)"
  },
  {
    "medumba": "Nzə̀ꞌ tu",
    "french": "Cerveau",
    "english": "Brain"
  },
  {
    "medumba": "Nə̀ tsinə",
    "french": "Cesser",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ fan̍e,nə̀ nyα",
    "french": "Cesser",
    "english": "Stop"
  },
  {
    "medumba": "Nə̀ cua",
    "french": "Cesser",
    "english": "Stop"
  },
  {
    "medumba": "zwə̂ntʉ",
    "french": "Chagrin",
    "english": "Grief"
  },
  {
    "medumba": "Zwə",
    "french": "Chagrin",
    "english": "Grief"
  },
  {
    "medumba": "Mbὰbwud",
    "french": "Chair",
    "english": "Flesh"
  },
  {
    "medumba": "Dʉꞌ nə̀ tsin ncon nù",
    "french": "Chaire",
    "english": "Chair"
  },
  {
    "medumba": "Diaŋ",
    "french": "Chaise",
    "english": "Chair"
  },
  {
    "medumba": "tôꞌ ndα",
    "french": "Chambre",
    "english": "Room"
  },
  {
    "medumba": "Toꞌ zi",
    "french": "Chambre à coucher",
    "english": "Bedroom"
  },
  {
    "medumba": "ndαnǔnὰ",
    "french": "Chambre d’agriculture",
    "english": "Chamber of Agriculture"
  },
  {
    "medumba": "Tôꞌ ntsə",
    "french": "Chambre d’eau",
    "english": "Water room"
  },
  {
    "medumba": "ndα̂nǔntαnə",
    "french": "Chambre de commerce",
    "english": "Chamber of Commerce"
  },
  {
    "medumba": "Kαmɛl",
    "french": "Chameau",
    "english": "Camel"
  },
  {
    "medumba": "Nὰ",
    "french": "Champ",
    "english": "Field"
  },
  {
    "medumba": "cwɛd",
    "french": "Champ",
    "english": "Field"
  },
  {
    "medumba": "kǒbnkʉα",
    "french": "Champ (de raphia)",
    "english": "Field (of raffia)"
  },
  {
    "medumba": "bə̂ ndʉ̀sə",
    "french": "Champ (sur le)",
    "english": "Field (on the)"
  },
  {
    "medumba": "Tsə̂ bwə",
    "french": "Champ (sur le)",
    "english": "Field (on the)"
  },
  {
    "medumba": "Bwɔ̀linə",
    "french": "Chance",
    "english": "Luck"
  },
  {
    "medumba": "Nə̀ bàtə̌",
    "french": "Changer",
    "english": "Change"
  },
  {
    "medumba": "Nə̀ kàŋe",
    "french": "Changer",
    "english": "Change"
  },
  {
    "medumba": "Ngàbàtə̀",
    "french": "Changeur",
    "english": "Changer"
  },
  {
    "medumba": "Kwì",
    "french": "Chant",
    "english": "Singing"
  },
  {
    "medumba": "yǒbkwì",
    "french": "Chant",
    "english": "Singing"
  },
  {
    "medumba": "Nə̀ yǒb kwì",
    "french": "Chanter",
    "english": "Sing"
  },
  {
    "medumba": "Nə̀ tɔ",
    "french": "Chanter ( coq)",
    "english": "Sing (rooster)"
  },
  {
    "medumba": "Nə̀ t̀otə vʉ",
    "french": "Chant(complantes)",
    "english": "Song (plants)"
  },
  {
    "medumba": "Ngàyǒbkwi",
    "french": "Chanteur",
    "english": "Singer"
  },
  {
    "medumba": "Ndə̀bàꞌ nkαnə",
    "french": "Chanvre indien",
    "english": "Indian hemp"
  },
  {
    "medumba": "Kαlige",
    "french": "Char",
    "english": "Chariot"
  },
  {
    "medumba": "kə̀kîmbwogə",
    "french": "Charbon",
    "english": "Coal"
  },
  {
    "medumba": "Ngəꞌ mbwogə",
    "french": "Charbon ardent",
    "english": "Burning coal"
  },
  {
    "medumba": "ngâꞌ loŋə",
    "french": "Chardon",
    "english": "Thistle"
  },
  {
    "medumba": "Nǔ nköndɛ̀n",
    "french": "Charitable",
    "english": "Charitable"
  },
  {
    "medumba": "kôndɛ̀n",
    "french": "Charite̍",
    "english": "Charity"
  },
  {
    "medumba": "Nkɔ̀nì",
    "french": "Charite̍",
    "english": "Charity"
  },
  {
    "medumba": "Zə̂mbὰbwud",
    "french": "Charnel",
    "english": "Carnal"
  },
  {
    "medumba": "Nconyαm",
    "french": "Charnu",
    "english": "Meaty"
  },
  {
    "medumba": "Ngàswə̌bàꞌ",
    "french": "Charpentier",
    "english": "Carpenter"
  },
  {
    "medumba": "Nkìm tûbàꞌ",
    "french": "Charpentier",
    "english": "Carpenter"
  },
  {
    "medumba": "Yòŋ",
    "french": "Chasse",
    "english": "Hunting"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Chasser",
    "english": "Hunt"
  },
  {
    "medumba": "Nə̀ taꞌyòŋ",
    "french": "Chasser",
    "english": "Hunt"
  },
  {
    "medumba": "Ngàtaꞌ yòŋ",
    "french": "Chasseur",
    "english": "Hunter"
  },
  {
    "medumba": "Ntâꞌ yòŋ",
    "french": "Chasseur",
    "english": "Hunter"
  },
  {
    "medumba": "Kə̀lɛ̌n mènnzwi",
    "french": "Chaste",
    "english": "Chaste"
  },
  {
    "medumba": "Kə̀lɛ̌n mαndùm",
    "french": "Chaste",
    "english": "Chaste"
  },
  {
    "medumba": "Bùsi",
    "french": "Chat",
    "english": "Cat"
  },
  {
    "medumba": "Ntŋntsə",
    "french": "Chateau",
    "english": "Castle"
  },
  {
    "medumba": "Nə̀ nyàŋtə̌",
    "french": "Chatouiller",
    "english": "Tickle"
  },
  {
    "medumba": "Nə̀dum",
    "french": "Chaud",
    "english": "Hot"
  },
  {
    "medumba": "Nə̀ dùmtə̌",
    "french": "Chauffer",
    "english": "Heat"
  },
  {
    "medumba": "Nə̀ dùmə",
    "french": "Chauffer",
    "english": "Heat"
  },
  {
    "medumba": "Ngàsòŋ",
    "french": "Chauffeur",
    "english": "Driver"
  },
  {
    "medumba": "Bɛnə",
    "french": "Chaume",
    "english": "Thatch"
  },
  {
    "medumba": "Nyiꞌ",
    "french": "Chaume",
    "english": "Thatch"
  },
  {
    "medumba": "Nyǐꞌ ngà",
    "french": "Chaume",
    "english": "Thatch"
  },
  {
    "medumba": "Nə̀ sǒ nkətoꞌo",
    "french": "Chausser",
    "english": "Put on"
  },
  {
    "medumba": "Nkətoꞌo",
    "french": "Chaussure",
    "english": "Shoe"
  },
  {
    "medumba": "Běꞌ nùmnzwìn",
    "french": "Chauve",
    "english": "Bald"
  },
  {
    "medumba": "Nə̀lʉnə",
    "french": "Chauve-souris",
    "english": "Bat"
  },
  {
    "medumba": "Mbəmə",
    "french": "Chaux",
    "english": "Lime"
  },
  {
    "medumba": "Mfə̀n",
    "french": "Chef",
    "english": "Chief"
  },
  {
    "medumba": "Tα̂ngɔ̀",
    "french": "Chef ( de l’etat)",
    "english": "Head (of state)"
  },
  {
    "medumba": "Tα̂fàꞌ/mα̂fàꞌ",
    "french": "Chef de service",
    "english": "Head of department"
  },
  {
    "medumba": "Ncwɛd",
    "french": "Chefferie",
    "english": "Chiefdom"
  },
  {
    "medumba": "Famncwɛd",
    "french": "Chefferie  abandonne̍e",
    "english": "Abandoned chiefdom"
  },
  {
    "medumba": "Mα̂nzə̀",
    "french": "Chemin",
    "english": "Path"
  },
  {
    "medumba": "Nzə̀",
    "french": "Chemin",
    "english": "Path"
  },
  {
    "medumba": "Tànjòŋ",
    "french": "Cher",
    "english": "Dear"
  },
  {
    "medumba": "Nə̀ diàgə",
    "french": "Chercher",
    "english": "Search"
  },
  {
    "medumba": "Nə̀ caŋə",
    "french": "Chercher",
    "english": "Search"
  },
  {
    "medumba": "Ngàdiὰg",
    "french": "Chercheur",
    "english": "Researcher"
  },
  {
    "medumba": "Ngàcaŋntùn",
    "french": "Chercheur",
    "english": "Researcher"
  },
  {
    "medumba": "Ncâŋntùn",
    "french": "Chercheur",
    "english": "Researcher"
  },
  {
    "medumba": "Nyὰmndiaŋə",
    "french": "Cheval",
    "english": "Horse"
  },
  {
    "medumba": "Nyǎŋtu",
    "french": "Cheveux",
    "english": "Hair"
  },
  {
    "medumba": "Fôgtu",
    "french": "Cheveux– blanc",
    "english": "Hair – white"
  },
  {
    "medumba": "Mbâkù",
    "french": "Cheville",
    "english": "Ankle"
  },
  {
    "medumba": "Mbwə",
    "french": "Chèvre",
    "english": "Goat"
  },
  {
    "medumba": "Ŋwàg",
    "french": "Chicotte",
    "english": "Chicotte"
  },
  {
    "medumba": "Shuaꞌa",
    "french": "Chicote",
    "english": "Chicote"
  },
  {
    "medumba": "Mbʉ",
    "french": "Chien",
    "english": "Dog"
  },
  {
    "medumba": "Mbʉ̂yòŋ",
    "french": "Chien (de chasse)",
    "english": "Dog (hunting)"
  },
  {
    "medumba": "Lα̂gtʉntə̀",
    "french": "Chiffre",
    "english": "Figure"
  },
  {
    "medumba": "Cαmnjə̀ꞌ",
    "french": "Chimpanze̍",
    "english": "Chimpanzee"
  },
  {
    "medumba": "Ngwa",
    "french": "Chique",
    "english": "Chic"
  },
  {
    "medumba": "Bwoŋ̍",
    "french": "Chœur (en)",
    "english": "Choir (en)"
  },
  {
    "medumba": "Nə̀ kǎ",
    "french": "Choisir",
    "english": "Choose"
  },
  {
    "medumba": "Nə̀ coꞌo",
    "french": "Choisir",
    "english": "Choose"
  },
  {
    "medumba": "Nə̀coꞌo /nə̀kǎ",
    "french": "Choix",
    "english": "Choice"
  },
  {
    "medumba": "Kǔmkwì",
    "french": "Chorale",
    "english": "Choir"
  },
  {
    "medumba": "Ju",
    "french": "Chose",
    "english": "Thing"
  },
  {
    "medumba": "Fogfogntsə",
    "french": "Chute d’eau",
    "english": "Waterfall"
  },
  {
    "medumba": "Zogzogntsə",
    "french": "Chute d’eau (point de )",
    "english": "Waterfall (point of )"
  },
  {
    "medumba": "Mαtùn",
    "french": "Ci-dessous",
    "english": "Below"
  },
  {
    "medumba": "Mfətʉ",
    "french": "Ci-dessous",
    "english": "Below"
  },
  {
    "medumba": "Nùntʉ",
    "french": "Ci-dessus",
    "english": "Above"
  },
  {
    "medumba": "Kǎmαnyàm",
    "french": "Ciel",
    "english": "Sky"
  },
  {
    "medumba": "Nyǎŋmiαg",
    "french": "Cils",
    "english": "Eyelashes"
  },
  {
    "medumba": "Ncʉa",
    "french": "Cime",
    "english": "Top"
  },
  {
    "medumba": "Tu",
    "french": "Cime",
    "english": "Top"
  },
  {
    "medumba": "Dʉ̌ꞌ tǔfì",
    "french": "Cimetière",
    "english": "Cemetery"
  },
  {
    "medumba": "Diaŋyən",
    "french": "Cinema",
    "english": "Cinema"
  },
  {
    "medumba": "Zwiaŋtə̀",
    "french": "Cingle̍",
    "english": "Cingle"
  },
  {
    "medumba": "Tα̂n",
    "french": "Cinq",
    "english": "Five"
  },
  {
    "medumba": "Madtə̀ tα̂n",
    "french": "Cinquième",
    "english": "Fifth"
  },
  {
    "medumba": "Ncʉ̌ꞌ nǔm tsə̀ tα̂n",
    "french": "Cinquième (1/5)",
    "english": "Fifth (1/5)"
  },
  {
    "medumba": "Nə̀ mǎꞌ mɛ̀n njà",
    "french": "Circoncire",
    "english": "Circumcise"
  },
  {
    "medumba": "Nὰ si kəd",
    "french": "Circoncire",
    "english": "Circumcise"
  },
  {
    "medumba": "Nὰconjà",
    "french": "Circoncision",
    "english": "Circumcision"
  },
  {
    "medumba": "Mɛnlaꞌ/mɛ̂nngɔ̀(1/6",
    "french": "Citoyen",
    "english": "Citizen"
  },
  {
    "medumba": "Nə̀lαnə",
    "french": "Clair",
    "english": "Clear"
  },
  {
    "medumba": "Nə̀lαnbà",
    "french": "Clair (teint)",
    "english": "Light (complexioned)"
  },
  {
    "medumba": "Njə̂nnzə̀",
    "french": "Clairvoyant",
    "english": "Clairvoyant"
  },
  {
    "medumba": "Nzə̂nù",
    "french": "Clairvoyant",
    "english": "Clairvoyant"
  },
  {
    "medumba": "Ndα̂ŋwàꞌnì",
    "french": "Classe",
    "english": "Class"
  },
  {
    "medumba": "Ghuαn",
    "french": "Classe",
    "english": "Class"
  },
  {
    "medumba": "Bàꞌfʉ̀n",
    "french": "Cle̍",
    "english": "Key"
  },
  {
    "medumba": "Nə̀ghuagnù",
    "french": "Cle̍mence",
    "english": "Clemence"
  },
  {
    "medumba": "Ngwâgnù",
    "french": "Cle̍ment",
    "english": "Clement"
  },
  {
    "medumba": "Ngàntαnə",
    "french": "Client",
    "english": "Customer"
  },
  {
    "medumba": "Ŋwa",
    "french": "Cloche",
    "english": "Bell"
  },
  {
    "medumba": "Nƴlò",
    "french": "Clou",
    "english": "Nail"
  },
  {
    "medumba": "Nə̀ kwìmə",
    "french": "Clouer",
    "english": "Nail"
  },
  {
    "medumba": "Mbǎmə̀kalə",
    "french": "Coco (noix de)",
    "english": "Coco (nuts)"
  },
  {
    "medumba": "Ntʉ",
    "french": "Cœur",
    "english": "Heart"
  },
  {
    "medumba": "Kɔ̌ntʉ",
    "french": "Cœur",
    "english": "Heart"
  },
  {
    "medumba": "Njὰm",
    "french": "Cogne̍e",
    "english": "Clash"
  },
  {
    "medumba": "Nə̀ kom tu",
    "french": "Coiffer",
    "english": "Hair styling"
  },
  {
    "medumba": "Nə̀ baꞌ tu",
    "french": "Coiffer",
    "english": "Hair styling"
  },
  {
    "medumba": "Nə̀ tə cə̀ꞌ",
    "french": "Coiffer (se)",
    "english": "Hairstyle"
  },
  {
    "medumba": "Ngàkomtu",
    "french": "Coiffeur",
    "english": "Hairdresser"
  },
  {
    "medumba": "Nkômtu",
    "french": "Coiffeur",
    "english": "Hairdresser"
  },
  {
    "medumba": "Cə̀ꞌ",
    "french": "Coiffure",
    "english": "Hairstyle"
  },
  {
    "medumba": "lαg",
    "french": "Coin",
    "english": "Corner"
  },
  {
    "medumba": "Tog",
    "french": "Coin",
    "english": "Corner"
  },
  {
    "medumba": "Yântʉ",
    "french": "Colère",
    "english": "Anger"
  },
  {
    "medumba": "Ngàyantʉ",
    "french": "Cole̍reux",
    "english": "Angry"
  },
  {
    "medumba": "Ngàzwə",
    "french": "Cole̍reux",
    "english": "Angry"
  },
  {
    "medumba": "Nshûnfaꞌ",
    "french": "Collaborateur",
    "english": "Collaborator"
  },
  {
    "medumba": "Ŋα , zìn",
    "french": "Colle",
    "english": "Glue"
  },
  {
    "medumba": "Ŋαbtə̀",
    "french": "Colle",
    "english": "Glue"
  },
  {
    "medumba": "Màꞌ tə̀",
    "french": "Collecte",
    "english": "Collection"
  },
  {
    "medumba": "Nə̀ kʉmt̀ə",
    "french": "Collecter",
    "english": "Collect"
  },
  {
    "medumba": "Ndα̂ŋwaꞌni tɛ̀dkʉlə",
    "french": "Collège",
    "english": "College"
  },
  {
    "medumba": "Nshûnfàꞌ",
    "french": "Collègue",
    "english": "Colleague"
  },
  {
    "medumba": "Nə̀ ŋαbə",
    "french": "Coller",
    "english": "Paste"
  },
  {
    "medumba": "Nə̀ ŋαbt̀ə",
    "french": "Coller",
    "english": "Paste"
  },
  {
    "medumba": "Kɔ̂ngà",
    "french": "Colline",
    "english": "Hill"
  },
  {
    "medumba": "Kǎꞌ mvɛ̀n",
    "french": "Colonne verte̍brale",
    "english": "Spine"
  },
  {
    "medumba": "Ncò",
    "french": "Combat",
    "english": "Combat"
  },
  {
    "medumba": "Nzwə̀ꞌ",
    "french": "Combat",
    "english": "Combat"
  },
  {
    "medumba": "Ngàləꞌncò",
    "french": "Combattant",
    "english": "Fighter"
  },
  {
    "medumba": "Nə̀ ləꞌə",
    "french": "Combattre",
    "english": "Fight"
  },
  {
    "medumba": "Siꞌi",
    "french": "Combien",
    "english": "How much"
  },
  {
    "medumba": "Nə̀ koŋ yαmə",
    "french": "Combler",
    "english": "Fill"
  },
  {
    "medumba": "Nə̀ zwiαgtə",
    "french": "Combler",
    "english": "Fill"
  },
  {
    "medumba": "Cûzwì",
    "french": "Comedie",
    "english": "Comedy"
  },
  {
    "medumba": "Diaŋzwi",
    "french": "Come̍di",
    "english": "Comedi"
  },
  {
    "medumba": "Nǔzwì",
    "french": "Come̍die",
    "english": "Comedy"
  },
  {
    "medumba": "Nkòmzwì",
    "french": "Come̍dien",
    "english": "Comedian"
  },
  {
    "medumba": "Ngàkǒmzwì",
    "french": "Come̍dien",
    "english": "Comedian"
  },
  {
    "medumba": "Tswə̂kum",
    "french": "Comite̍",
    "english": "Committee"
  },
  {
    "medumba": "Mαtswə̂ꞌ kum",
    "french": "Comite̍ central",
    "english": "Central Committee"
  },
  {
    "medumba": "Kǔmdiàgfù",
    "french": "Comite̍ de developpement",
    "english": "Development Committee"
  },
  {
    "medumba": "Nə̀tǒ",
    "french": "Commandement",
    "english": "Command"
  },
  {
    "medumba": "Nə̀ tǒ",
    "french": "Commander",
    "english": "Order"
  },
  {
    "medumba": "Kwʉncàŋ",
    "french": "Commando",
    "english": "Commando"
  },
  {
    "medumba": "Nə̀toꞌtə",
    "french": "Commencement",
    "english": "Beginning"
  },
  {
    "medumba": "Nə̀toꞌo",
    "french": "Commencer",
    "english": "Get started"
  },
  {
    "medumba": "Tα̂ŋtoŋnkù",
    "french": "Commissaire",
    "english": "Commissioner"
  },
  {
    "medumba": "Ndα̂ntoŋkù",
    "french": "Commissariat",
    "english": "Police station"
  },
  {
    "medumba": "Ntswìnkʉ̀n",
    "french": "Communicateur",
    "english": "Communicator"
  },
  {
    "medumba": "Nkʉ̀n",
    "french": "Communication",
    "english": "Communication"
  },
  {
    "medumba": "Nkʉ̀n",
    "french": "Communique̍",
    "english": "Communicate"
  },
  {
    "medumba": "Nə̀ tswǐ nkʉ̀n",
    "french": "Communiquer",
    "english": "Communicate"
  },
  {
    "medumba": "Shunzìn",
    "french": "Compagnon",
    "english": "Companion"
  },
  {
    "medumba": "Kôndɛn",
    "french": "Compassion",
    "english": "Compassion"
  },
  {
    "medumba": "Ndɛ̀n",
    "french": "Compassion",
    "english": "Compassion"
  },
  {
    "medumba": "Maŋ",
    "french": "Compétition",
    "english": "Competition"
  },
  {
    "medumba": "Maŋndə",
    "french": "Compétition de course",
    "english": "Running competition"
  },
  {
    "medumba": "Mìb",
    "french": "Complément",
    "english": "Supplement"
  },
  {
    "medumba": "Nə̀ kwìꞌtə̌",
    "french": "Completer",
    "english": "Complete"
  },
  {
    "medumba": "Nə̀ mìbe",
    "french": "Completer",
    "english": "Complete"
  },
  {
    "medumba": "Nə̀ zwiagtə",
    "french": "Completer",
    "english": "Complete"
  },
  {
    "medumba": "Lα̌bncù",
    "french": "Compliment",
    "english": "Compliment"
  },
  {
    "medumba": "Ndàb",
    "french": "Compliment",
    "english": "Compliment"
  },
  {
    "medumba": "Nə̀ lὰbə̌",
    "french": "Complimenter",
    "english": "Compliment"
  },
  {
    "medumba": "Nə̀ tʉn ndὰb",
    "french": "Complimenter",
    "english": "Compliment"
  },
  {
    "medumba": "Nə̀ zencὰm",
    "french": "Complot",
    "english": "Conspiracy"
  },
  {
    "medumba": "Nə̀ ncὰm",
    "french": "Comploter",
    "english": "Plotting"
  },
  {
    "medumba": "Ngà ze ncὰm",
    "french": "Comploteur",
    "english": "Plotter"
  },
  {
    "medumba": "Kǔzìn",
    "french": "Comportement",
    "english": "Behavior"
  },
  {
    "medumba": "Màd",
    "french": "Comportement",
    "english": "Behavior"
  },
  {
    "medumba": "Mbə",
    "french": "Comportement",
    "english": "Behavior"
  },
  {
    "medumba": "Ngʉ̀ninu",
    "french": "Comportement",
    "english": "Behavior"
  },
  {
    "medumba": "Ntswəndα",
    "french": "Comportement",
    "english": "Behavior"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Comporter",
    "english": "Behave"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Comporter (se)",
    "english": "Behave"
  },
  {
    "medumba": "Màdnə̀juꞌnù",
    "french": "Compre̍hension",
    "english": "Understanding"
  },
  {
    "medumba": "Nə̀siaŋtə",
    "french": "Comprehension",
    "english": "Comprehension"
  },
  {
    "medumba": "Nə̀ juꞌu",
    "french": "Comprendre",
    "english": "Understand"
  },
  {
    "medumba": "Nsiâŋnαb",
    "french": "Comptable",
    "english": "Accountant"
  },
  {
    "medumba": "Nə̀ sian̍ə",
    "french": "Compter",
    "english": "Count"
  },
  {
    "medumba": "Nə̀ tʉntə",
    "french": "Compter",
    "english": "Count"
  },
  {
    "medumba": "Nkoꞌ",
    "french": "Comptoir",
    "english": "Counter"
  },
  {
    "medumba": "Nkoꞌ ntαnə",
    "french": "Comptoir",
    "english": "Counter"
  },
  {
    "medumba": "Wǎntαnə",
    "french": "Comptoir",
    "english": "Counter"
  },
  {
    "medumba": "Laꞌ",
    "french": "Concession",
    "english": "Concession"
  },
  {
    "medumba": "Benə",
    "french": "Concession",
    "english": "Concession"
  },
  {
    "medumba": "Nə̀ kwàtə̌",
    "french": "Concevoir (qqch)",
    "english": "Design (sth)"
  },
  {
    "medumba": "Nə̀ lelə",
    "french": "Concevoir (bebe)",
    "english": "Conceive (baby)"
  },
  {
    "medumba": "Nə̀ jʉmə",
    "french": "Concevoir (bebe)",
    "english": "Conceive (baby)"
  },
  {
    "medumba": "Mɛnlaꞌ",
    "french": "Concitoyen",
    "english": "Fellow citizen"
  },
  {
    "medumba": "Mɛ̂nngɔ̀",
    "french": "Concitoyen",
    "english": "Fellow citizen"
  },
  {
    "medumba": "Maŋ",
    "french": "Concurrence",
    "english": "Competition"
  },
  {
    "medumba": "Nə̀mǎꞌncà",
    "french": "Condamnation",
    "english": "Conviction"
  },
  {
    "medumba": "Mǎꞌ ncà",
    "french": "Condamnation",
    "english": "Conviction"
  },
  {
    "medumba": "Nə̀ mǎꞌncà",
    "french": "Condamner",
    "english": "Condemn"
  },
  {
    "medumba": "Fìmmdə",
    "french": "Condom",
    "english": "Condom"
  },
  {
    "medumba": "Ngàsòŋ",
    "french": "Conducteur",
    "english": "Driver"
  },
  {
    "medumba": "Ngàcàgtə̌",
    "french": "Conducteur",
    "english": "Driver"
  },
  {
    "medumba": "Nə̀ sòŋə",
    "french": "Conduire",
    "english": "Drive"
  },
  {
    "medumba": "Nə̀ càgtə̌",
    "french": "Conduire",
    "english": "Drive"
  },
  {
    "medumba": "Diaŋncobə",
    "french": "Conference",
    "english": "Conference"
  },
  {
    "medumba": "Nə̀ bam nùkèbwɔ̀",
    "french": "Confesser",
    "english": "Confess"
  },
  {
    "medumba": "Nə̀ mǎꞌ njom",
    "french": "Confesser",
    "english": "Confess"
  },
  {
    "medumba": "Njòm",
    "french": "Confession",
    "english": "Confession"
  },
  {
    "medumba": "Mbùmtə̀ntsə",
    "french": "Confluent",
    "english": "Confluence"
  },
  {
    "medumba": "Nə̀ tswəꞌtə ntʉ",
    "french": "Confondre",
    "english": "Confuse"
  },
  {
    "medumba": "Cùꞌ tu",
    "french": "Confusion",
    "english": "Confusion"
  },
  {
    "medumba": "Tὰbtə",
    "french": "Confusion",
    "english": "Confusion"
  },
  {
    "medumba": "Mα̂kum",
    "french": "Congrès",
    "english": "Congress"
  },
  {
    "medumba": "Nə̀ lɛ̀nə",
    "french": "Connaître",
    "english": "Know"
  },
  {
    "medumba": "Nə̀ zə",
    "french": "Connaître",
    "english": "Know"
  },
  {
    "medumba": "Ntʉmɛ̀n",
    "french": "Conscience",
    "english": "Consciousness"
  },
  {
    "medumba": "Nzə̀ntʉ",
    "french": "Conscience",
    "english": "Consciousness"
  },
  {
    "medumba": "Sâꞌntʉ",
    "french": "Conscience",
    "english": "Consciousness"
  },
  {
    "medumba": "Ntαgə",
    "french": "Conseil",
    "english": "Advice"
  },
  {
    "medumba": "Ntsəꞌtə̀",
    "french": "Conseil (reunion)",
    "english": "Council (meeting)"
  },
  {
    "medumba": "Nə̀ tαgə",
    "french": "Conseiller",
    "english": "Advisor"
  },
  {
    "medumba": "Nə̀ tαgtə",
    "french": "Conseiller",
    "english": "Advisor"
  },
  {
    "medumba": "Ngàfαntαgə",
    "french": "Conseiller",
    "english": "Advisor"
  },
  {
    "medumba": "Ngàtαgtə̀",
    "french": "Conseiller",
    "english": "Advisor"
  },
  {
    "medumba": "Fitə̀ntʉ",
    "french": "Consolation",
    "english": "Consolation"
  },
  {
    "medumba": "Nə̀ fiœ tʉ",
    "french": "Consoler",
    "english": "Console"
  },
  {
    "medumba": "Nə̀ twwəꞌtə ntʉ",
    "french": "Consoler",
    "english": "Console"
  },
  {
    "medumba": "Nə̀ zibtə",
    "french": "Consoler",
    "english": "Console"
  },
  {
    "medumba": "Cʉbnkwʉ",
    "french": "Constant",
    "english": "Constant"
  },
  {
    "medumba": "Nə̀ kwʉlə",
    "french": "Construire",
    "english": "Build"
  },
  {
    "medumba": "Nə̀ kʉ",
    "french": "Consument",
    "english": "Consume"
  },
  {
    "medumba": "Cɔ̀",
    "french": "Conte",
    "english": "Tale"
  },
  {
    "medumba": "Nə̀ gha",
    "french": "Contester",
    "english": "Challenge"
  },
  {
    "medumba": "Nə̀ sòŋtə̌ ncobe",
    "french": "Contester",
    "english": "Challenge"
  },
  {
    "medumba": "Nsôŋcɔ̀",
    "french": "Conteur",
    "english": "Storyteller"
  },
  {
    "medumba": "Dibαcaꞌa",
    "french": "Continent",
    "english": "Continent"
  },
  {
    "medumba": "Kàŋ",
    "french": "Contour",
    "english": "Outline"
  },
  {
    "medumba": "Nə̀ bìntə̌",
    "french": "Contourner",
    "english": "Bypass"
  },
  {
    "medumba": "Nə̀ diaŋ mbûmə",
    "french": "Contourner",
    "english": "Bypass"
  },
  {
    "medumba": "Nə̀ kàŋtə̌",
    "french": "Contourner",
    "english": "Bypass"
  },
  {
    "medumba": "Nə̀ nαnə",
    "french": "Contraindre",
    "english": "Constrain"
  },
  {
    "medumba": "Ngò",
    "french": "Contree",
    "english": "Against"
  },
  {
    "medumba": "Nə̀ ywìmtə̌",
    "french": "Contribuer",
    "english": "Contribute"
  },
  {
    "medumba": "Nə̀ maꞌtə̌",
    "french": "Contribuer",
    "english": "Contribute"
  },
  {
    "medumba": "Màꞌtə̀",
    "french": "Contribution",
    "english": "Contribution"
  },
  {
    "medumba": "Mfαbwɔ̀",
    "french": "Contribution",
    "english": "Contribution"
  },
  {
    "medumba": "Nə̀ nkùꞌu",
    "french": "Convenir",
    "english": "Agree"
  },
  {
    "medumba": "Nə̀ bolə",
    "french": "Convenir",
    "english": "Agree"
  },
  {
    "medumba": "Nə̀ ghə̀ꞌtə̌",
    "french": "Convoiter",
    "english": "Covet"
  },
  {
    "medumba": "Ghə̀ꞌtə̀",
    "french": "Convoitise",
    "english": "Lust"
  },
  {
    "medumba": "Kǔmfàꞌ",
    "french": "Cooperative",
    "english": "Cooperative"
  },
  {
    "medumba": "Nə̀ œàm mfâꞌa",
    "french": "Cooperer",
    "english": "Cooperate"
  },
  {
    "medumba": "Kʉ̌ꞌngab",
    "french": "Coq",
    "english": "Rooster"
  },
  {
    "medumba": "Mαla",
    "french": "Corbeau",
    "english": "Raven"
  },
  {
    "medumba": "Kèsoŋə",
    "french": "Corbeille",
    "english": "Trash"
  },
  {
    "medumba": "Kàg",
    "french": "Corbeille",
    "english": "Trash"
  },
  {
    "medumba": "Nkʉ",
    "french": "Corde",
    "english": "Rope"
  },
  {
    "medumba": "Mvɛ̀d",
    "french": "Corde",
    "english": "Rope"
  },
  {
    "medumba": "Ndɔ -",
    "french": "Corne",
    "english": "Horn"
  },
  {
    "medumba": "Wud",
    "french": "Corps",
    "english": "Body"
  },
  {
    "medumba": "Wûdmɛ̀nntʉ̀n",
    "french": "Corps",
    "english": "Body"
  },
  {
    "medumba": "Ghǎ",
    "french": "Corps (corporation",
    "english": "Body (corporation"
  },
  {
    "medumba": "Tʉnwud",
    "french": "Corps constitution du",
    "english": "Body constitution of"
  },
  {
    "medumba": "Nkǎmwud",
    "french": "Corps (partie du)",
    "english": "Body (part of)"
  },
  {
    "medumba": "Bǔꞌwud",
    "french": "Corpulence",
    "english": "Corpulence"
  },
  {
    "medumba": "Nə̀tsiαgtə",
    "french": "Correction",
    "english": "Correction"
  },
  {
    "medumba": "Nə̀ tə bàkʉlə",
    "french": "Correction",
    "english": "Correction"
  },
  {
    "medumba": "Nə̀ tswid nkʉnə",
    "french": "Correction",
    "english": "Correction"
  },
  {
    "medumba": "Côꞌkʉ̂ dfi",
    "french": "Corrector",
    "english": "Correction"
  },
  {
    "medumba": "Ngàŋuꞌu",
    "french": "Corrompu",
    "english": "Corrupted"
  },
  {
    "medumba": "Nkò jubαnbαn",
    "french": "Corrompu",
    "english": "Corrupted"
  },
  {
    "medumba": "Jʉkə̀ jùb",
    "french": "Corrompu",
    "english": "Corrupted"
  },
  {
    "medumba": "Ngànὰbtə̌ngùb",
    "french": "Corroyeur",
    "english": "Grinder"
  },
  {
    "medumba": "Mbɛ̀n",
    "french": "Corruption",
    "english": "Bribery"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Corruption",
    "english": "Bribery"
  },
  {
    "medumba": "Jʉkə̀ jùb",
    "french": "Corruption",
    "english": "Bribery"
  },
  {
    "medumba": "Njogə",
    "french": "Corve̍e",
    "english": "Chore"
  },
  {
    "medumba": "Fǎꞌ kə̀kɔ̀nkô",
    "french": "Corve̍e",
    "english": "Chore"
  },
  {
    "medumba": "Kaŋntsə",
    "french": "Côte",
    "english": "Coast"
  },
  {
    "medumba": "Nkǐdnsa",
    "french": "Côte",
    "english": "Coast"
  },
  {
    "medumba": "Bàg",
    "french": "Côte̍",
    "english": "Coast"
  },
  {
    "medumba": "Mbaŋə",
    "french": "Côte̍",
    "english": "Coast"
  },
  {
    "medumba": "Mbaŋbwə",
    "french": "Côte̍ (à côte̍ de )",
    "english": "Side (next to)"
  },
  {
    "medumba": "Tɔ",
    "french": "Cou",
    "english": "Neck"
  },
  {
    "medumba": "Kəkod",
    "french": "Cou",
    "english": "Neck"
  },
  {
    "medumba": "Sàŋ",
    "french": "Cou (partie dorsale)",
    "english": "Neck (dorsal part)"
  },
  {
    "medumba": "Fiàŋ",
    "french": "Cou (partie dorsale)",
    "english": "Neck (dorsal part)"
  },
  {
    "medumba": "Nə̀ nɔ̌nsi",
    "french": "Coucher",
    "english": "Sunset"
  },
  {
    "medumba": "Nə̀ zi",
    "french": "Coucher (avec)",
    "english": "Sleep (with)"
  },
  {
    "medumba": "Tǔnbu",
    "french": "Coude",
    "english": "Elbow"
  },
  {
    "medumba": "Mfìꞌ",
    "french": "Coudee",
    "english": "Elbow"
  },
  {
    "medumba": "Nə̀ kwidtə",
    "french": "Coudre",
    "english": "Sew"
  },
  {
    "medumba": "Nə̀ tamə",
    "french": "Coudre",
    "english": "Sew"
  },
  {
    "medumba": "Ntònnkʉα",
    "french": "Couleuvre",
    "english": "Snake"
  },
  {
    "medumba": "Ntòꞌ",
    "french": "Coup",
    "english": "Blow"
  },
  {
    "medumba": "Nkɔ",
    "french": "Coup (de poing)",
    "english": "Punch (punch)"
  },
  {
    "medumba": "Ntoꞌ",
    "french": "Coup de poing)",
    "english": "Punch)"
  },
  {
    "medumba": "Ngwàlαg",
    "french": "Coup d’œil",
    "english": "Glance"
  },
  {
    "medumba": "Ntuꞌ",
    "french": "Coupe",
    "english": "Cup"
  },
  {
    "medumba": "Mα̂mtuꞌ",
    "french": "Coupe (trophe̍e)",
    "english": "Cup (trophy)"
  },
  {
    "medumba": "Ntûꞌmbodnì",
    "french": "Coupe de be̍ne̍didtion",
    "english": "Cup of blessing"
  },
  {
    "medumba": "Ŋwi / nywi",
    "french": "Coupe-coupe",
    "english": "Cutter"
  },
  {
    "medumba": "Nə̀ kəbə",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Nə̀ kəꞌə",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Ǹə̀ sə̂",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Nə̀ si",
    "french": "Couper",
    "english": "Cut"
  },
  {
    "medumba": "Ncùndα",
    "french": "Cour",
    "english": "Court"
  },
  {
    "medumba": "Tɛ̌dlaꞌ",
    "french": "Cour",
    "english": "Court"
  },
  {
    "medumba": "Fɛ̌nntʉ",
    "french": "Courage",
    "english": "Courage"
  },
  {
    "medumba": "Kàgtʉ̀n",
    "french": "Courage",
    "english": "Courage"
  },
  {
    "medumba": "Tǎnntʉ",
    "french": "Courage",
    "english": "Courage"
  },
  {
    "medumba": "Ngàfɛ̌nntʉ",
    "french": "Courageux",
    "english": "Courageous"
  },
  {
    "medumba": "Mfɛ̀nntʉ",
    "french": "Courageux",
    "english": "Courageous"
  },
  {
    "medumba": "Fə̀d",
    "french": "Courant",
    "english": "Current"
  },
  {
    "medumba": "Fə̀dntsə",
    "french": "Courant (d’eau)",
    "english": "Current (water)"
  },
  {
    "medumba": "Ŋwagntsə",
    "french": "Courant (d’eau)",
    "english": "Current (water)"
  },
  {
    "medumba": "Fə̀dmbwogvə̀",
    "french": "Courant (d’eau)",
    "english": "Current (water)"
  },
  {
    "medumba": "Cə̌ꞌmbʉm",
    "french": "Couronne",
    "english": "Crown"
  },
  {
    "medumba": "Cə̌ꞌnguꞌu",
    "french": "Couronne",
    "english": "Crown"
  },
  {
    "medumba": "Nə̀ kudtu",
    "french": "Couronner",
    "english": "Crown"
  },
  {
    "medumba": "Nə̀ mǎꞌtu",
    "french": "Couronner",
    "english": "Crown"
  },
  {
    "medumba": "Nə̀ coꞌnku",
    "french": "Couronner",
    "english": "Crown"
  },
  {
    "medumba": "Nə̀ yoꞌmfə̀n",
    "french": "Couronner",
    "english": "Crown"
  },
  {
    "medumba": "Yǎntʉ",
    "french": "Courroux",
    "english": "Wrath"
  },
  {
    "medumba": "Ndə",
    "french": "Course",
    "english": "Race"
  },
  {
    "medumba": "Kàm",
    "french": "Court",
    "english": "Short"
  },
  {
    "medumba": "Nəvogə",
    "french": "Court",
    "english": "Short"
  },
  {
    "medumba": "Nsěm tâmcɛd",
    "french": "Court (de tennis)",
    "english": "Court (tennis)"
  },
  {
    "medumba": "Məmbʉ̂sαsα",
    "french": "Courtelière",
    "english": "Courtelier"
  },
  {
    "medumba": "Bαn",
    "french": "Couscous",
    "english": "Couscous"
  },
  {
    "medumba": "Fàd",
    "french": "Cousin",
    "english": "Cousin"
  },
  {
    "medumba": "Lə̂diaŋ",
    "french": "Coussin",
    "english": "Cushion"
  },
  {
    "medumba": "Lə̂kòꞌ",
    "french": "Coussin",
    "english": "Cushion"
  },
  {
    "medumba": "Njǒŋju",
    "french": "Coût",
    "english": "Cost"
  },
  {
    "medumba": "Bi",
    "french": "Couteau",
    "english": "Knife"
  },
  {
    "medumba": "Njòŋ",
    "french": "Coûter",
    "english": "Cost"
  },
  {
    "medumba": "Tànjòŋ",
    "french": "Coûteux",
    "english": "Expensive"
  },
  {
    "medumba": "Màdngɔ̀",
    "french": "Coutume",
    "english": "Custom"
  },
  {
    "medumba": "Ntengɔ̀",
    "french": "Coutume",
    "english": "Custom"
  },
  {
    "medumba": "Nə̀ kwidtə",
    "french": "Couture",
    "english": "Sewing"
  },
  {
    "medumba": "Nə̀ tamə",
    "french": "Couture",
    "english": "Sewing"
  },
  {
    "medumba": "Ngàtanzwə",
    "french": "Couturier",
    "english": "Fashion designer"
  },
  {
    "medumba": "Ntâmnzwə",
    "french": "Couturier",
    "english": "Fashion designer"
  },
  {
    "medumba": "Nə̀zika",
    "french": "Couvaison",
    "english": "Brooding"
  },
  {
    "medumba": "Nə̀ zika",
    "french": "Couver",
    "english": "Cover"
  },
  {
    "medumba": "Nə̀ moꞌo",
    "french": "Couver (en latence)",
    "english": "Brood (latency)"
  },
  {
    "medumba": "Ncɛdka",
    "french": "Couvercle",
    "english": "Lid"
  },
  {
    "medumba": "Njɛ̂dbum",
    "french": "Couvi",
    "english": "Couvi"
  },
  {
    "medumba": "Nə̀ kabtə",
    "french": "Couvrir",
    "english": "Cover"
  },
  {
    "medumba": "Nə̀ bòmtə̌",
    "french": "Couvrir",
    "english": "Cover"
  },
  {
    "medumba": "Nə̀ cɛdtə",
    "french": "Couvrir",
    "english": "Cover"
  },
  {
    "medumba": "Ngòkɛ̂dnzwəꞌə (1/6",
    "french": "Coxalgle",
    "english": "Coxalgle"
  },
  {
    "medumba": "Kanntod",
    "french": "Crabe",
    "english": "Crab"
  },
  {
    "medumba": "Kə̀kà (",
    "french": "Crachat",
    "english": "Spit"
  },
  {
    "medumba": "Nə̀ tògə",
    "french": "Cracher",
    "english": "Spit"
  },
  {
    "medumba": "Mbə̂mkì",
    "french": "Craie",
    "english": "Chalk"
  },
  {
    "medumba": "Nə̀ bwoge",
    "french": "Craindre",
    "english": "Fear"
  },
  {
    "medumba": "Bwog",
    "french": "Crainte",
    "english": "Fear"
  },
  {
    "medumba": "Mbwôgtùn",
    "french": "Craintif",
    "english": "Fearful"
  },
  {
    "medumba": "Ntὰntὰn",
    "french": "Crampe",
    "english": "Cramp"
  },
  {
    "medumba": "Mbǔꞌtʉ",
    "french": "Cran",
    "english": "Cran"
  },
  {
    "medumba": "Kât",
    "french": "Crâne",
    "english": "Skull"
  },
  {
    "medumba": "Mətùꞌ",
    "french": "Crapaud",
    "english": "Toad"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Crasse",
    "english": "Grime"
  },
  {
    "medumba": "Kûdtɔ (1/",
    "french": "Cravate",
    "english": "Tie"
  },
  {
    "medumba": "Kʉ̂dnjumə",
    "french": "Crayon",
    "english": "Pencil"
  },
  {
    "medumba": "Njo",
    "french": "Créance",
    "english": "Claim"
  },
  {
    "medumba": "Ngànjo",
    "french": "Créancier",
    "english": "Creditor"
  },
  {
    "medumba": "Mbom",
    "french": "Créateur",
    "english": "Creator"
  },
  {
    "medumba": "Bamnə̀bamə",
    "french": "Crédule",
    "english": "Gullible"
  },
  {
    "medumba": "Nə̀ bomə/ nə̀ fìꞌi",
    "french": "Créer",
    "english": "Create"
  },
  {
    "medumba": "Ncem",
    "french": "Credit (confiance)",
    "english": "Credit (trust)"
  },
  {
    "medumba": "Nə̀ yàꞌa",
    "french": "Credit (prendre à )",
    "english": "Credit (take from )"
  },
  {
    "medumba": "Neton fə̌mɛ̀n",
    "french": "Cremation",
    "english": "Cremation"
  },
  {
    "medumba": "Dʉꞌnə̀tǒnfə̂mə̀n",
    "french": "Crematoire",
    "english": "Crematory"
  },
  {
    "medumba": "Nə̀ sǎŋ bàꞌ",
    "french": "Crepir",
    "english": "Crepir"
  },
  {
    "medumba": "Nə̀coŋtə",
    "french": "Crepu (cheveux )",
    "english": "Frizzy (hair)"
  },
  {
    "medumba": "Ndʉmfědnjʉ",
    "french": "Crepuscule",
    "english": "Twilight"
  },
  {
    "medumba": "Nə̀ tswəꞌə",
    "french": "Creuser",
    "english": "Digging"
  },
  {
    "medumba": "Nə̀ toŋə",
    "french": "Creuser",
    "english": "Digging"
  },
  {
    "medumba": "Nə̀ to / nə̀ bɛtə",
    "french": "Crever",
    "english": "Die"
  },
  {
    "medumba": "La",
    "french": "Crème",
    "english": "Cream"
  },
  {
    "medumba": "Nə̀tɔ / ngòŋ",
    "french": "Cri",
    "english": "Scream"
  },
  {
    "medumba": "Nə̀ tɔ",
    "french": "Crier",
    "english": "Scream"
  },
  {
    "medumba": "Nə̀buꞌngòŋ",
    "french": "Crier",
    "english": "Scream"
  },
  {
    "medumba": "Ngamtα",
    "french": "Criquet",
    "english": "Cricket"
  },
  {
    "medumba": "Nə̀tswidnkʉn",
    "french": "Critique (la)",
    "english": "Criticism (the)"
  },
  {
    "medumba": "Ngàtswidnkʉn",
    "french": "Critique (le)",
    "english": "Criticize (the)"
  },
  {
    "medumba": "Nə̀ tswidnkʉm",
    "french": "Critiquer",
    "english": "Criticize"
  },
  {
    "medumba": "Tα̂kə̀n jàmbὰm",
    "french": "Critiqueur",
    "english": "Critic"
  },
  {
    "medumba": "Ngùb",
    "french": "Cuir",
    "english": "Leather"
  },
  {
    "medumba": "Ngùbtu",
    "french": "Cuir chevelu",
    "english": "Scalp"
  },
  {
    "medumba": "Nə̀ na",
    "french": "Cuire",
    "english": "Cook"
  },
  {
    "medumba": "Fə̌ꞌmbwogə",
    "french": "Cuisine",
    "english": "Kitchen"
  },
  {
    "medumba": "Ngànacaŋ",
    "french": "Cuisinier",
    "english": "Cook"
  },
  {
    "medumba": "Tàmmbwə̀",
    "french": "Cuisse",
    "english": "Thigh"
  },
  {
    "medumba": "Kutu",
    "french": "Culot",
    "english": "Base"
  },
  {
    "medumba": "Kàmcə̌ꞌnkù",
    "french": "Culotte",
    "english": "Panties"
  },
  {
    "medumba": "Mbwogmbwə̀",
    "french": "D’abord",
    "english": "First"
  },
  {
    "medumba": "Nkαnə",
    "french": "D’abord",
    "english": "First"
  },
  {
    "medumba": "Fə̀dwukob",
    "french": "Danger",
    "english": "Danger"
  },
  {
    "medumba": "Mûm",
    "french": "Dans",
    "english": "In"
  },
  {
    "medumba": "Ntʉ̂m",
    "french": "Dans",
    "english": "In"
  },
  {
    "medumba": "Tɔ̀",
    "french": "Dans",
    "english": "In"
  },
  {
    "medumba": "Jûnə̀nyàŋə",
    "french": "Danse",
    "english": "Dance"
  },
  {
    "medumba": "Nə̀ nyàŋə",
    "french": "Danser",
    "english": "Dancing"
  },
  {
    "medumba": "Ngànyǎŋsa",
    "french": "Danseur",
    "english": "Dancer"
  },
  {
    "medumba": "Nyànsa",
    "french": "Danseur",
    "english": "Dancer"
  },
  {
    "medumba": "Bibi",
    "french": "Dartre",
    "english": "Dartre"
  },
  {
    "medumba": "Leꞌe / leꞌnjʉ",
    "french": "Date",
    "english": "Date"
  },
  {
    "medumba": "Nə̀siaŋtənù",
    "french": "Debat",
    "english": "Debate"
  },
  {
    "medumba": "Nə̀ siaŋtə nù",
    "french": "Debattre",
    "english": "Debate"
  },
  {
    "medumba": "Ghαnə",
    "french": "Debauche",
    "english": "Debauchery"
  },
  {
    "medumba": "Kad",
    "french": "Debauche",
    "english": "Debauchery"
  },
  {
    "medumba": "Càkə̀ndα",
    "french": "Debauche €",
    "english": "Debauchery €"
  },
  {
    "medumba": "Ngàbwɔ̌ntʉ",
    "french": "Debonnaire",
    "english": "Debonnaire"
  },
  {
    "medumba": "Nə̀ tsintʉ",
    "french": "Debout",
    "english": "Standing"
  },
  {
    "medumba": "Nə̀ fàge",
    "french": "Dechirer",
    "english": "Tear"
  },
  {
    "medumba": "Mə̀nntʉ̌ncʉꞌ",
    "french": "Decisif",
    "english": "Decisive"
  },
  {
    "medumba": "Cʉbnkwʉ",
    "french": "Decisif",
    "english": "Decisive"
  },
  {
    "medumba": "Nsoŋ",
    "french": "Declaration",
    "english": "Statement"
  },
  {
    "medumba": "Nə̀ soŋə",
    "french": "Declarer",
    "english": "Declare"
  },
  {
    "medumba": "Nə̀ cobe",
    "french": "Declarer",
    "english": "Declare"
  },
  {
    "medumba": "Nesǒ kùꞌni",
    "french": "Dedicace",
    "english": "Dedication"
  },
  {
    "medumba": "Nesǒ kùꞌni",
    "french": "Dedier",
    "english": "Dedicate"
  },
  {
    "medumba": "Nə̀ keꞌe",
    "french": "Defaire",
    "english": "Undo"
  },
  {
    "medumba": "Nə̀ nyamtə sə",
    "french": "Defaire",
    "english": "Undo"
  },
  {
    "medumba": "Nə ŋuꞌte sə",
    "french": "Defaire",
    "english": "Undo"
  },
  {
    "medumba": "Lòꞌ",
    "french": "Defaire (visage)",
    "english": "Undo (face)"
  },
  {
    "medumba": "Mbìd / mbɛ̀n",
    "french": "Defaire (visage)",
    "english": "Undo (face)"
  },
  {
    "medumba": "Nə̀ bǎꞌ kamə",
    "french": "Defaut",
    "english": "Default"
  },
  {
    "medumba": "Nə̀ kwebu",
    "french": "Defendre",
    "english": "Defend"
  },
  {
    "medumba": "Nə̀ kwe wud",
    "french": "Defendre",
    "english": "Defend"
  },
  {
    "medumba": "Nə̀ kwe nta",
    "french": "Defendre",
    "english": "Defend"
  },
  {
    "medumba": "Nə̀ t nù",
    "french": "Defendre",
    "english": "Defend"
  },
  {
    "medumba": "Nə̀tanù",
    "french": "Defense",
    "english": "Defense"
  },
  {
    "medumba": "Mbàꞌsaꞌ",
    "french": "Defenseur",
    "english": "Defender"
  },
  {
    "medumba": "Mbàꞌkam",
    "french": "Defenseur",
    "english": "Defender"
  },
  {
    "medumba": "Ŋwatəmɛ̀n",
    "french": "Degourdi",
    "english": "Dauntless"
  },
  {
    "medumba": "Ŋwatə̀",
    "french": "Degourdissement",
    "english": "Relaxation"
  },
  {
    "medumba": "Njʉ",
    "french": "Dehors",
    "english": "Outside"
  },
  {
    "medumba": "Cǎŋmbwogcʉ",
    "french": "Dejeuner",
    "english": "Lunch"
  },
  {
    "medumba": "Kə̂bntsi",
    "french": "Dejeuner (petit)",
    "english": "Lunch (small)"
  },
  {
    "medumba": "Nə̀ kiὰgtə̌",
    "french": "Delier",
    "english": "Delier"
  },
  {
    "medumba": "Ngàmfʉm",
    "french": "Deloyal",
    "english": "Disloyal"
  },
  {
    "medumba": "Dibὰmbàŋ",
    "french": "Deluge",
    "english": "Deluge"
  },
  {
    "medumba": "Ndǎmnjʉ",
    "french": "Demain",
    "english": "Tomorrow"
  },
  {
    "medumba": "Nə̀ bɛdtə",
    "french": "Demander",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ kʉα",
    "french": "Demander",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ lonə",
    "french": "Demander",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ zwiǎg mɛ̀n",
    "french": "Demander (1femme pr qqn)",
    "english": "Ask (1 woman for sb)"
  },
  {
    "medumba": "Nə̀cagni",
    "french": "Démangeaison",
    "english": "Itch"
  },
  {
    "medumba": "Nə̀ cagni",
    "french": "Démanger",
    "english": "Itch"
  },
  {
    "medumba": "Nə̀ yògə",
    "french": "Déranger",
    "english": "Disturb"
  },
  {
    "medumba": "Zwiaŋtə̀",
    "french": "Démence",
    "english": "Dementia"
  },
  {
    "medumba": "Ngàzwiaŋtə̀",
    "french": "Dément",
    "english": "Insane"
  },
  {
    "medumba": "Nə̀ kǒg ncobə",
    "french": "Démentir",
    "english": "Deny"
  },
  {
    "medumba": "Nə̀ tanù /ghanù",
    "french": "Démentir",
    "english": "Deny"
  },
  {
    "medumba": "Dʉ̌ ntswə",
    "french": "Demeurer",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ ghɔ",
    "french": "Demeurer",
    "english": "Stay"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Demeurer",
    "english": "Stay"
  },
  {
    "medumba": "Kàm",
    "french": "Demi",
    "english": "Half"
  },
  {
    "medumba": "Kǎmnyàm",
    "french": "Demi heure",
    "english": "Half hour"
  },
  {
    "medumba": "Ngɔ̌tɔ̀ngɔ̀",
    "french": "Démocratie",
    "english": "Democracy"
  },
  {
    "medumba": "Yẁadkə̀bwɔ̀",
    "french": "Démon",
    "english": "Demon"
  },
  {
    "medumba": "Kə̀bà",
    "french": "Denier",
    "english": "Denarius"
  },
  {
    "medumba": "Nə̀ bʉlə",
    "french": "Dénoncer",
    "english": "Report"
  },
  {
    "medumba": "Nə̀ soŋte",
    "french": "Dénoncer",
    "english": "Report"
  },
  {
    "medumba": "Sɔ̀",
    "french": "Dent",
    "english": "Tooth"
  },
  {
    "medumba": "Bǎgngɔ̀",
    "french": "Département",
    "english": "Department"
  },
  {
    "medumba": "Nòtogə",
    "french": "Dépassement",
    "english": "Overrun"
  },
  {
    "medumba": "Nə̀ togə",
    "french": "Dépasser",
    "english": "Overtake"
  },
  {
    "medumba": "Nαntə̀",
    "french": "Dépêche",
    "english": "Dispatch"
  },
  {
    "medumba": "Ndə̂nde",
    "french": "Dépêche",
    "english": "Dispatch"
  },
  {
    "medumba": "Nkʉ̌nndə",
    "french": "Dépêche",
    "english": "Dispatch"
  },
  {
    "medumba": "Nə̀ nαntə",
    "french": "Dépêcher",
    "english": "Hurry"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Dépravation",
    "english": "Depravity"
  },
  {
    "medumba": "Ngàŋuꞌu",
    "french": "Déprave",
    "english": "Depraved"
  },
  {
    "medumba": "Nə̀ zwaŋtə",
    "french": "Déraisonner",
    "english": "Unreason"
  },
  {
    "medumba": "Nswɛ̌dnswɛd",
    "french": "Dérangement",
    "english": "Disturbance"
  },
  {
    "medumba": "Nə̀ kàmtə̌",
    "french": "Déranger",
    "english": "Disturb"
  },
  {
    "medumba": "Nə̀ swɛ̀dtə̌",
    "french": "Déranger",
    "english": "Disturb"
  },
  {
    "medumba": "Miὰgtə̀",
    "french": "Dernier",
    "english": "Last"
  },
  {
    "medumba": "Ncɛ̌dnjàm",
    "french": "Dernier",
    "english": "Last"
  },
  {
    "medumba": "Ncɛ̌dtog",
    "french": "Dernier",
    "english": "Last"
  },
  {
    "medumba": "Nə̀ yǐ",
    "french": "Dérober",
    "english": "Steal"
  },
  {
    "medumba": "Njàm",
    "french": "Derrière",
    "english": "Behind"
  },
  {
    "medumba": "Nə̀ tʉꞌ njàm",
    "french": "Derrière (être)",
    "english": "Behind (be)"
  },
  {
    "medumba": "Njàmndα",
    "french": "Derrière (la maison)",
    "english": "Behind (the house)"
  },
  {
    "medumba": "Bə̂ ndʉ̀sə",
    "french": "Dès que",
    "english": "As soon as"
  },
  {
    "medumba": "Ndʉ̀sə̀",
    "french": "Dès que",
    "english": "As soon as"
  },
  {
    "medumba": "Nzwìd",
    "french": "Descendance",
    "english": "Descendants"
  },
  {
    "medumba": "Ntɔ̀",
    "french": "Descendance",
    "english": "Descendants"
  },
  {
    "medumba": "Nə̀ swəꞌə",
    "french": "Descendre",
    "english": "Go down"
  },
  {
    "medumba": "Dʉꞌ swə̂ꞌswəꞌ",
    "french": "Descente",
    "english": "Descent"
  },
  {
    "medumba": "Kɔ̂nkwa",
    "french": "Désert",
    "english": "Desert"
  },
  {
    "medumba": "Nə̀ nywinə",
    "french": "Désespérer",
    "english": "Despair"
  },
  {
    "medumba": "Nywin",
    "french": "Désespoir",
    "english": "Despair"
  },
  {
    "medumba": "Nə̀ sɔ̌ nswə",
    "french": "Déshabiller",
    "english": "Undress"
  },
  {
    "medumba": "Tàbnjòŋ",
    "french": "Déshonneur",
    "english": "Dishonor"
  },
  {
    "medumba": "Tûswə",
    "french": "Déshonneur",
    "english": "Dishonor"
  },
  {
    "medumba": "Nǔtuswə",
    "french": "Déshonorable",
    "english": "Dishonorable"
  },
  {
    "medumba": "Nə̀ kα̌g tûswə",
    "french": "Déshonorer",
    "english": "Dishonor"
  },
  {
    "medumba": "Nə̀ kα̌g mɛ̀n",
    "french": "Déshonorer",
    "english": "Dishonor"
  },
  {
    "medumba": "Nə̀ tǎb njoŋ̍",
    "french": "De̍shonorer",
    "english": "Dishonor"
  },
  {
    "medumba": "Nə̀ tam tûswə",
    "french": "De̍shonorer",
    "english": "Dishonor"
  },
  {
    "medumba": "Nə̀ coꞌo",
    "french": "De̍signer",
    "english": "Designate"
  },
  {
    "medumba": "Nə̀ tag ndα",
    "french": "De̍signe(auccesseur)",
    "english": "Designator (successor)"
  },
  {
    "medumba": "Kʉntʉ",
    "french": "De̍sir",
    "english": "Desire"
  },
  {
    "medumba": "Nə̀ tsi",
    "french": "De̍sirer",
    "english": "Desire"
  },
  {
    "medumba": "Nə̀ kɔ̌",
    "french": "De̍sirer",
    "english": "Desire"
  },
  {
    "medumba": "Nə̀ tǎtu",
    "french": "De̍sobe̍ir",
    "english": "To disobey"
  },
  {
    "medumba": "Sὰg",
    "french": "De̍sobe̍issance",
    "english": "Disobedience"
  },
  {
    "medumba": "Sὰgntʉ",
    "french": "De̍sobe̍issance",
    "english": "Disobedience"
  },
  {
    "medumba": "Tǎtu",
    "french": "De̍sobe̍issance",
    "english": "Disobedience"
  },
  {
    "medumba": "Ncǎgncǎgmɛ̀n",
    "french": "De̍sodonne̍",
    "english": "De̍sodonne̍"
  },
  {
    "medumba": "Ncǎgncag",
    "french": "De̍sordre",
    "english": "Mess"
  },
  {
    "medumba": "Nə̀ jumə",
    "french": "Desse̍cher",
    "english": "Dry out"
  },
  {
    "medumba": "Nə̀ yagə",
    "french": "Desse̍cher",
    "english": "Dry out"
  },
  {
    "medumba": "Nkwàtə̀",
    "french": "Dessein",
    "english": "Purpose"
  },
  {
    "medumba": "Və̀bu",
    "french": "Dessein",
    "english": "Purpose"
  },
  {
    "medumba": "Nə̀ kiàgə",
    "french": "De̍tacher",
    "english": "Detach"
  },
  {
    "medumba": "Nə̀ kiàgtə̌",
    "french": "De̍tacher",
    "english": "Detach"
  },
  {
    "medumba": "Nùkôꞌntʉ",
    "french": "De̍termine̍",
    "english": "Determine"
  },
  {
    "medumba": "Lamtə̀",
    "french": "De̍tour (de̍tournement)",
    "english": "Detour (diversion)"
  },
  {
    "medumba": "Nə̀ lamtə",
    "french": "De̍touner",
    "english": "De̍touner"
  },
  {
    "medumba": "Ne ghumtə",
    "french": "De̍touner (voler)",
    "english": "To steal (to steal)"
  },
  {
    "medumba": "Ngàlamtə",
    "french": "De̍touneur",
    "english": "Detoureur"
  },
  {
    "medumba": "Nə̀ bagtə",
    "french": "De̍truire",
    "english": "Destroy"
  },
  {
    "medumba": "Njo",
    "french": "Dette",
    "english": "Debt"
  },
  {
    "medumba": "Vʉ",
    "french": "Deuil",
    "english": "Mourning"
  },
  {
    "medumba": "Bαhα",
    "french": "Deux",
    "english": "Two"
  },
  {
    "medumba": "Mbadtə̀ bαhα",
    "french": "Deuxième",
    "english": "Second"
  },
  {
    "medumba": "Nə̀ bwǒgmbwə̀",
    "french": "De̍vancer",
    "english": "Get ahead"
  },
  {
    "medumba": "Nə̀ bwǒgsə̀",
    "french": "De̍vancer",
    "english": "Get ahead"
  },
  {
    "medumba": "Nè kwe mbwə̀",
    "french": "De̍vancer",
    "english": "Get ahead"
  },
  {
    "medumba": "Mɛ̀nmbwə̀",
    "french": "Devancier",
    "english": "Predecessor"
  },
  {
    "medumba": "Mbwə̀",
    "french": "Devant",
    "english": "In front"
  },
  {
    "medumba": "Nə tʉꞌʉ",
    "french": "Devenir",
    "english": "Become"
  },
  {
    "medumba": "Ngamndəꞌə",
    "french": "Devin",
    "english": "Diviner"
  },
  {
    "medumba": "Bʉ̀ꞌ mɛ̀n",
    "french": "Devise",
    "english": "Currency"
  },
  {
    "medumba": "Bʉ̀ꞌ ngɔ̀",
    "french": "Devise (d’un pays)",
    "english": "Currency (of a country)"
  },
  {
    "medumba": "Fiàŋtə̂ncobə",
    "french": "Dialogue",
    "english": "Dialogue"
  },
  {
    "medumba": "Nə̀ fian̍təncobə",
    "french": "Dialoguer",
    "english": "Dialogue"
  },
  {
    "medumba": "Nə̀ swtəncobə",
    "french": "Dialoguer",
    "english": "Dialogue"
  },
  {
    "medumba": "Kòŋbàm",
    "french": "Diarrhée",
    "english": "Diarrhea"
  },
  {
    "medumba": "Bàmnə̀coꞌo",
    "french": "Diarrhée",
    "english": "Diarrhea"
  },
  {
    "medumba": "Ngʉꞌ tɔ̀ngò",
    "french": "Dictature",
    "english": "Dictatorship"
  },
  {
    "medumba": "Nsi",
    "french": "Dieu",
    "english": "God"
  },
  {
    "medumba": "Nsinəto",
    "french": "Dieu (idole)",
    "english": "God (idol)"
  },
  {
    "medumba": "Nə̀bαgtəlɛn",
    "french": "Diffamation",
    "english": "Defamation"
  },
  {
    "medumba": "Nə̀tənù",
    "french": "Diffamation",
    "english": "Defamation"
  },
  {
    "medumba": "Ndαm",
    "french": "Diffamation",
    "english": "Defamation"
  },
  {
    "medumba": "Nə̀ bαgtə lɛn",
    "french": "Diffamer",
    "english": "Defame"
  },
  {
    "medumba": "Nə̀ sǎnkʉ̀n",
    "french": "Diffuser(une nouvelle)",
    "english": "Broadcast (news)"
  },
  {
    "medumba": "Nə̀kùꞌnǐ",
    "french": "Digne",
    "english": "Worthy"
  },
  {
    "medumba": "Nkamə",
    "french": "Dignitaire",
    "english": "Dignitary"
  },
  {
    "medumba": "Kamə",
    "french": "Dignité̍",
    "english": "Dignity"
  },
  {
    "medumba": "Nə̀kùꞌnǐ",
    "french": "Dignité̍",
    "english": "Dignity"
  },
  {
    "medumba": "Cǎŋmfə̌dnju",
    "french": "Dîner",
    "english": "Dinner"
  },
  {
    "medumba": "Leꞌfitə̀",
    "french": "Dimanche",
    "english": "Sunday"
  },
  {
    "medumba": "Nə̀ mintə̌",
    "french": "Diminuer",
    "english": "Decrease"
  },
  {
    "medumba": "Nə̀ sèbə",
    "french": "Diminuer",
    "english": "Decrease"
  },
  {
    "medumba": "Nə̀ cobə",
    "french": "Dire",
    "english": "Say"
  },
  {
    "medumba": "Nə̀ to lǒꞌ mɛ̀n",
    "french": "Dire les défauts",
    "english": "Say the flaws"
  },
  {
    "medumba": "Tɔtə̀",
    "french": "Discrimination",
    "english": "Discrimination"
  },
  {
    "medumba": "Tɔbu",
    "french": "Discrimination",
    "english": "Discrimination"
  },
  {
    "medumba": "Nə̀ tɔtə̌",
    "french": "Discriminer",
    "english": "Discriminate"
  },
  {
    "medumba": "Ghumtə̀",
    "french": "Dissimulation",
    "english": "Concealment"
  },
  {
    "medumba": "Nə̀ ghumtə",
    "french": "Dissimuler",
    "english": "Conceal"
  },
  {
    "medumba": "Nə̀ zin kə̀ juꞌ nzə̀",
    "french": "Divaguer",
    "english": "Wander"
  },
  {
    "medumba": "Nə̀ cǎ",
    "french": "Divaguer",
    "english": "Wander"
  },
  {
    "medumba": "Nə̀ ghὰbtə̌",
    "french": "Diviser",
    "english": "Divide"
  },
  {
    "medumba": "Ghὰbtə̀",
    "french": "Division",
    "english": "Division"
  },
  {
    "medumba": "Fàgtə̀",
    "french": "Division",
    "english": "Division"
  },
  {
    "medumba": "Fàgtə̀nândα",
    "french": "Divorce",
    "english": "Divorce"
  },
  {
    "medumba": "Gham",
    "french": "Dix",
    "english": "Ten"
  },
  {
    "medumba": "Mbadtə̀ gham",
    "french": "Dixième",
    "english": "Tenth"
  },
  {
    "medumba": "Ncʉ̌ꞌ nǔm tsə̀ gham",
    "french": "Dixième (1/10)",
    "english": "Tenth (1/10)"
  },
  {
    "medumba": "Ndɛ̀nngα̂mghòn",
    "french": "Docteur en medecine",
    "english": "Doctor of Medicine"
  },
  {
    "medumba": "Tα̂kà",
    "french": "Docteur traditionnel",
    "english": "Traditional doctor"
  },
  {
    "medumba": "Màd",
    "french": "Doctrine",
    "english": "Doctrine"
  },
  {
    "medumba": "Nkwαlὰ",
    "french": "Doctrine",
    "english": "Doctrine"
  },
  {
    "medumba": "Ntûbu",
    "french": "Doigt",
    "english": "Finger"
  },
  {
    "medumba": "Kwiag",
    "french": "Domestique",
    "english": "Domestic"
  },
  {
    "medumba": "Mɔnkəꞌ",
    "french": "Domestique",
    "english": "Domestic"
  },
  {
    "medumba": "Nə̀ kwiagte nyὰm",
    "french": "Domestiquer",
    "english": "Domesticate"
  },
  {
    "medumba": "Nə̀ kwiagtə",
    "french": "Domestiquer",
    "english": "Domesticate"
  },
  {
    "medumba": "Dʉ̌ꞌ ntswə",
    "french": "Domicile",
    "english": "Home"
  },
  {
    "medumba": "Nə̀ ləbtə",
    "french": "Dompter",
    "english": "Tame"
  },
  {
    "medumba": "Fùꞌ",
    "french": "Don",
    "english": "Donation"
  },
  {
    "medumba": "Jûbwɔ̌ntʉ / fαbwɔ̀",
    "french": "Don",
    "english": "Donation"
  },
  {
    "medumba": "Nə̀ fα",
    "french": "Donner",
    "english": "Give"
  },
  {
    "medumba": "Nə̀ nywìꞌi",
    "french": "Dorloter",
    "english": "Pamper"
  },
  {
    "medumba": "Nə̀ sǒ nkoꞌ",
    "french": "Dorloter",
    "english": "Pamper"
  },
  {
    "medumba": "Nzîmiâglo",
    "french": "Dormeur",
    "english": "Sleeper"
  },
  {
    "medumba": "Nə̀ zi",
    "french": "Dormir",
    "english": "Sleep"
  },
  {
    "medumba": "Dʉ̌ꞌzi",
    "french": "Dortoir",
    "english": "Dormitory"
  },
  {
    "medumba": "Nvɛ̀n",
    "french": "Dos",
    "english": "Back"
  },
  {
    "medumba": "Njàmmfɛ̀n",
    "french": "Dos",
    "english": "Back"
  },
  {
    "medumba": "Mfìꞌ fu",
    "french": "Dose d’un remède dose",
    "english": "Dose of a remedy dose"
  },
  {
    "medumba": "Dʉ̌ꞌfiꞌ",
    "french": "Douane",
    "english": "Customs"
  },
  {
    "medumba": "Ngàkwefeꞌ",
    "french": "Douanier",
    "english": "Customs officer"
  },
  {
    "medumba": "Ndàꞌndàꞌ",
    "french": "Doucement",
    "english": "Gently"
  },
  {
    "medumba": "Bɛdnì",
    "french": "Douceur",
    "english": "Softness"
  },
  {
    "medumba": "Nə̀ya",
    "french": "Douleur",
    "english": "Pain"
  },
  {
    "medumba": "Ya",
    "french": "Douleur",
    "english": "Pain"
  },
  {
    "medumba": "Mαgtə̀",
    "french": "Doute",
    "english": "Doubt"
  },
  {
    "medumba": "Nə̀ mqgtə̌",
    "french": "Douter",
    "english": "Doubt"
  },
  {
    "medumba": "Ngämmnyu",
    "french": "Dragon",
    "english": "Dragon"
  },
  {
    "medumba": "Nə̀ bɛd kǔ nkʉα",
    "french": "Drainer (raphia)",
    "english": "Drain (raffia)"
  },
  {
    "medumba": "Ndǎŋndaŋ",
    "french": "Droit",
    "english": "Law"
  },
  {
    "medumba": "Ntsinə",
    "french": "Droit",
    "english": "Law"
  },
  {
    "medumba": "Nə̀ tsin ndǎŋndaŋ",
    "french": "Droit (être)",
    "english": "Right (to be)"
  },
  {
    "medumba": "Nə̀ tsin câŋ",
    "french": "Droit (être)",
    "english": "Right (to be)"
  },
  {
    "medumba": "Nka",
    "french": "Droite",
    "english": "Right"
  },
  {
    "medumba": "Bûzwim",
    "french": "Droite (à)",
    "english": "Right (to)"
  },
  {
    "medumba": "Nə̀sαgə",
    "french": "Dur",
    "english": "Hard"
  },
  {
    "medumba": "Nə̀ta",
    "french": "Dur",
    "english": "Hard"
  },
  {
    "medumba": "Nə̀ tǎ",
    "french": "Durcir",
    "english": "Harden"
  },
  {
    "medumba": "Nə̀ sαgə",
    "french": "Durcir",
    "english": "Harden"
  },
  {
    "medumba": "Nə̀ saŋ tâ",
    "french": "Durcir par le froid",
    "english": "Harden by cold"
  },
  {
    "medumba": "Nə̀ sǒ nə̀ta",
    "french": "Durcir",
    "english": "Harden"
  },
  {
    "medumba": "Sagntʉ",
    "french": "Dureté̍ (du coeur)",
    "english": "Hardness (of the heart)"
  },
  {
    "medumba": "Tα̌nntʉ",
    "french": "Dureté̍ (du coeur)",
    "english": "Hardness (of the heart)"
  },
  {
    "medumba": "Nə̀tǎ",
    "french": "Dureté̍",
    "english": "Hardness"
  },
  {
    "medumba": "Cobomə",
    "french": "Dysenterie",
    "english": "Dysentery"
  },
  {
    "medumba": "Ntsə",
    "french": "Eau",
    "english": "Water"
  },
  {
    "medumba": "Ntsə nə̀dum",
    "french": "Eau chaude",
    "english": "Hot water"
  },
  {
    "medumba": "Ntsə fi",
    "french": "Eau froide",
    "english": "Cold water"
  },
  {
    "medumba": "Ntsə nəsαgtə",
    "french": "Eau polluee",
    "english": "Polluted water"
  },
  {
    "medumba": "Mbɛ̌n ntsə",
    "french": "Eau polluee",
    "english": "Polluted water"
  },
  {
    "medumba": "Mbɛ̌n ntsə",
    "french": "Eau sale",
    "english": "Dirty water"
  },
  {
    "medumba": "Yubtə̂m ntsə",
    "french": "Eau tiède",
    "english": "Lukewarm water"
  },
  {
    "medumba": "Ntsə nə̀fitə",
    "french": "Eau vive",
    "english": "Living water"
  },
  {
    "medumba": "Ŋwaꞌŋwaꞌməba",
    "french": "Ecariate",
    "english": "Ecariate"
  },
  {
    "medumba": "Nə̀vʉ̌",
    "french": "Echec",
    "english": "Failure"
  },
  {
    "medumba": "Foŋə",
    "french": "Echo",
    "english": "Echo"
  },
  {
    "medumba": "Bə̀bǎꞌmbàŋ",
    "french": "Eclair",
    "english": "Lightning"
  },
  {
    "medumba": "Nə̀ lαntə",
    "french": "Eclaircir",
    "english": "Lighten"
  },
  {
    "medumba": "Nə̀ kèꞌe",
    "french": "Eclairee",
    "english": "Enlightened"
  },
  {
    "medumba": "Nə̀ kəꞌbum",
    "french": "Eclore",
    "english": "Hatch"
  },
  {
    "medumba": "Tusɔ",
    "french": "Ecole",
    "english": "School"
  },
  {
    "medumba": "Dʉ̌ꞌŋwàꞌnì",
    "french": "Ecole",
    "english": "School"
  },
  {
    "medumba": "Ndα̂ŋwàꞌnikàmkʉle",
    "french": "Ecole primaire",
    "english": "Primary school"
  },
  {
    "medumba": "Ngàn̍waꞌnì",
    "french": "Ecolier",
    "english": "Schoolboy"
  },
  {
    "medumba": "Nə̀ zwiꞌtə",
    "french": "Ecouter",
    "english": "Listen"
  },
  {
    "medumba": "Nə̀ ghôꞌo",
    "french": "Ecraser",
    "english": "Overwrite"
  },
  {
    "medumba": "Nə̀ kǐ",
    "french": "Ecrire",
    "english": "Write"
  },
  {
    "medumba": "Nə̀ kǐtə",
    "french": "Ecrire",
    "english": "Write"
  },
  {
    "medumba": "Ngàkìtə̀",
    "french": "Ecrivain",
    "english": "Writer"
  },
  {
    "medumba": "Ndɛ̀nkukʉlə",
    "french": "Ecrivain",
    "english": "Writer"
  },
  {
    "medumba": "Nə̀ndʉ̀",
    "french": "Ecume",
    "english": "Scum"
  },
  {
    "medumba": "Kə̀sɔ",
    "french": "Edente",
    "english": "Edentulous"
  },
  {
    "medumba": "Nə̀ bwə̀tə̌",
    "french": "Effacer",
    "english": "Clear"
  },
  {
    "medumba": "Tu",
    "french": "Effigie",
    "english": "Effigy"
  },
  {
    "medumba": "Nə̀ bàꞌ mvʉ̂ nsi",
    "french": "Effondrer",
    "english": "Collapse"
  },
  {
    "medumba": "Nə̀ kǎg tùn",
    "french": "Efforcer (sꞌ)",
    "english": "Strive (sꞌ)"
  },
  {
    "medumba": "Nə̀ sǒ nə̀ta",
    "french": "Efforcer (sꞌ)",
    "english": "Strive (sꞌ)"
  },
  {
    "medumba": "Kàgtʉ̀n",
    "french": "Effort",
    "english": "Effort"
  },
  {
    "medumba": "Nə̀kǎgtʉ̀n",
    "french": "Effort",
    "english": "Effort"
  },
  {
    "medumba": "Nguα",
    "french": "Egal (âge, titre)",
    "english": "Equal (age, title)"
  },
  {
    "medumba": "Njòŋ",
    "french": "Egal (prix, quantite, valeur)",
    "english": "Equal (price, quantity, value)"
  },
  {
    "medumba": "Nə̀ bə njǒŋ",
    "french": "Egaler",
    "english": "Match"
  },
  {
    "medumba": "Nə̀ kǔꞌ njǒŋ",
    "french": "Egaler",
    "english": "Match"
  },
  {
    "medumba": "Nə̀ bi",
    "french": "Egarer",
    "english": "Misplace"
  },
  {
    "medumba": "Nə̀ ghagni",
    "french": "Egayer",
    "english": "Brighten up"
  },
  {
    "medumba": "Nə ghagni bə̀nntʉ̀n",
    "french": "Egayer les gens",
    "english": "Cheer up people"
  },
  {
    "medumba": "Ndα̂kə̀listò",
    "french": "Eglise",
    "english": "Church"
  },
  {
    "medumba": "Ghəꞌə",
    "french": "Egoïsme",
    "english": "Selfishness"
  },
  {
    "medumba": "Nyam",
    "french": "Egoïsme",
    "english": "Selfishness"
  },
  {
    "medumba": "Nyâmgheꞌe",
    "french": "Egoïste",
    "english": "Selfish"
  },
  {
    "medumba": "Nyâmcoŋ",
    "french": "Egoïste",
    "english": "Selfish"
  },
  {
    "medumba": "Nə̀ si tɔ",
    "french": "Egorger",
    "english": "Slaughter"
  },
  {
    "medumba": "Nə̀ kwìtə̌",
    "french": "Egrener",
    "english": "Eginer"
  },
  {
    "medumba": "Nə̀ ghaꞌtə",
    "french": "Elargir",
    "english": "Expand"
  },
  {
    "medumba": "Ghaꞌtə",
    "french": "Elargissement",
    "english": "Enlargement"
  },
  {
    "medumba": "Nsə̂nyὰm",
    "french": "Eléphant",
    "english": "Elephant"
  },
  {
    "medumba": "Mɛ̂nnsə",
    "french": "Eléphanteaux",
    "english": "Elephants"
  },
  {
    "medumba": "Ngàtamtɔ̀",
    "french": "Electeur",
    "english": "Voter"
  },
  {
    "medumba": "Ntâmtɔ̀",
    "french": "Electeur",
    "english": "Voter"
  },
  {
    "medumba": "Tɔ",
    "french": "Election",
    "english": "Election"
  },
  {
    "medumba": "Nə̀ kα̌g nyὰm",
    "french": "Elever",
    "english": "Raise"
  },
  {
    "medumba": "Nə̀ kwiagtə",
    "french": "Elever",
    "english": "Raise"
  },
  {
    "medumba": "Nə̀ bʉꞌʉ",
    "french": "Elever",
    "english": "Raise"
  },
  {
    "medumba": "Ngàkwiagtə",
    "french": "Eleveur",
    "english": "Breeder"
  },
  {
    "medumba": "Nə̀ toꞌo",
    "french": "Empecher",
    "english": "Prevent"
  },
  {
    "medumba": "Nə̀ cɛdtə",
    "french": "Empecher",
    "english": "Prevent"
  },
  {
    "medumba": "Dʉꞌ",
    "french": "Emplacement",
    "english": "Location"
  },
  {
    "medumba": "Ca",
    "french": "Emprisonnement",
    "english": "Imprisonment"
  },
  {
    "medumba": "Nə̀ cwiꞌi",
    "french": "Emprunter",
    "english": "Borrow"
  },
  {
    "medumba": "Bə̂ ndʉ̀sə",
    "french": "En meme temps",
    "english": "At the same time"
  },
  {
    "medumba": "Nə̀ fʉαgtə",
    "french": "Enchanter",
    "english": "Enchant"
  },
  {
    "medumba": "Ngàgʉagtəmɛ̀n (1/6",
    "french": "Enchanteur",
    "english": "Enchanting"
  },
  {
    "medumba": "Ntsəŋwàꞌnì",
    "french": "Encre",
    "english": "Ink"
  },
  {
    "medumba": "Dʉꞌ",
    "french": "Endroit",
    "english": "Location"
  },
  {
    "medumba": "Nə̀ tǎ",
    "french": "Endurcir",
    "english": "Harden"
  },
  {
    "medumba": "Nə̀ sǒ nə̀ta",
    "french": "Endurcir",
    "english": "Harden"
  },
  {
    "medumba": "Sag",
    "french": "Endurcissement",
    "english": "Hardening"
  },
  {
    "medumba": "Mɛn",
    "french": "Enfant",
    "english": "Child"
  },
  {
    "medumba": "Nə̀bwə",
    "french": "Enfantement",
    "english": "Childbirth"
  },
  {
    "medumba": "Nə̀ bwə",
    "french": "Enfanter",
    "english": "Give birth"
  },
  {
    "medumba": "Ndα̂mbwogə",
    "french": "Enfer",
    "english": "Hell"
  },
  {
    "medumba": "Nə̀ sǒ",
    "french": "Enfoncer",
    "english": "Fucking"
  },
  {
    "medumba": "Nə̀ tɛn nsô",
    "french": "Enfoncer",
    "english": "Fucking"
  },
  {
    "medumba": "Nùkôꞌntʉ",
    "french": "Engage",
    "english": "Engaged"
  },
  {
    "medumba": "Nə̀ lôꞌ mɛ̀n fàꞌ",
    "french": "Engager",
    "english": "Engage"
  },
  {
    "medumba": "Nə̀ toꞌo",
    "french": "Engager",
    "english": "Engage"
  },
  {
    "medumba": "Nə̀ bam fàꞌ",
    "french": "Engager (sꞌ)",
    "english": "Engage (sꞌ)"
  },
  {
    "medumba": "Nə̀ bwə",
    "french": "Engendrer",
    "english": "Generate"
  },
  {
    "medumba": "Nə̀ fìꞌi",
    "french": "Engendrer",
    "english": "Generate"
  },
  {
    "medumba": "Nə̀ bumə",
    "french": "Enivrer",
    "english": "Intoxicate"
  },
  {
    "medumba": "Nə̀ kələ",
    "french": "Enlever",
    "english": "Remove"
  },
  {
    "medumba": "Nə̀ lèꞌe",
    "french": "Enlever",
    "english": "Remove"
  },
  {
    "medumba": "Nə̀ sɔ̌",
    "french": "Enlever",
    "english": "Remove"
  },
  {
    "medumba": "Ngakə̀mbαn",
    "french": "Ennemi",
    "english": "Enemy"
  },
  {
    "medumba": "Ngʉ̂dnì",
    "french": "Ennui",
    "english": "Boredom"
  },
  {
    "medumba": "Nə̀ kà tə̌",
    "french": "Enorgueillir",
    "english": "Take pride"
  },
  {
    "medumba": "Nə̀ koꞌtə wud",
    "french": "Enorgueillir",
    "english": "Take pride"
  },
  {
    "medumba": "Nə zwəꞌtə",
    "french": "Enquêter",
    "english": "Investigate"
  },
  {
    "medumba": "Nə̀ tǎŋnga",
    "french": "Enraciner",
    "english": "Root"
  },
  {
    "medumba": "Nə̀ ywǐmnga",
    "french": "Enraciner",
    "english": "Root"
  },
  {
    "medumba": "Nə̀ bo",
    "french": "Enrouler",
    "english": "Roll up"
  },
  {
    "medumba": "Nə̀ botə",
    "french": "Enrouler",
    "english": "Roll up"
  },
  {
    "medumba": "Ngàtswìtə̀",
    "french": "Enseignant",
    "english": "Teacher"
  },
  {
    "medumba": "Nə̀tswitə̌",
    "french": "Enseignement",
    "english": "Teaching"
  },
  {
    "medumba": "Nə̀ tswitə̌",
    "french": "Enseigner",
    "english": "Teach"
  },
  {
    "medumba": "Bwə̀ntam",
    "french": "Ensemble",
    "english": "Together"
  },
  {
    "medumba": "Nə̀ fʉagtə",
    "french": "Ensorceler",
    "english": "Bewitch"
  },
  {
    "medumba": "Nə̀ lǒꞌ mɛn nsα",
    "french": "Ensorceler",
    "english": "Bewitch"
  },
  {
    "medumba": "Nə̀ kʉm fɛ̂d sə",
    "french": "Entasser",
    "english": "Piling up"
  },
  {
    "medumba": "Nə̀ juꞌu",
    "french": "Entendre",
    "english": "Hear"
  },
  {
    "medumba": "Nècoŋə",
    "french": "Enterrement",
    "english": "Burial"
  },
  {
    "medumba": "Nə̀ coŋə",
    "french": "Enterrer",
    "english": "Bury"
  },
  {
    "medumba": "Tûŋmwàꞌnì, tu",
    "french": "En-tête",
    "english": "Header"
  },
  {
    "medumba": "Ngàghub",
    "french": "Entêté",
    "english": "Stubborn"
  },
  {
    "medumba": "Tâtu",
    "french": "Entêtement",
    "english": "Stubbornness"
  },
  {
    "medumba": "Ghub",
    "french": "Entêtement",
    "english": "Stubbornness"
  },
  {
    "medumba": "Nə̀ tâtu",
    "french": "Entêter (sꞌ)",
    "english": "Header (sꞌ)"
  },
  {
    "medumba": "Nə̀ diàŋ mbumə",
    "french": "Entourer",
    "english": "Surround"
  },
  {
    "medumba": "Ncù",
    "french": "Entrée",
    "english": "Entrance"
  },
  {
    "medumba": "Nzə̀, nzə̀ nə̀co",
    "french": "Entrée",
    "english": "Entrance"
  },
  {
    "medumba": "Nzə̀ndα",
    "french": "Entrée",
    "english": "Entrance"
  },
  {
    "medumba": "Nətaꞌ",
    "french": "Entre jambe",
    "english": "Between leg"
  },
  {
    "medumba": "Nətʉntə (",
    "french": "Enumération",
    "english": "Enumeration"
  },
  {
    "medumba": "Nə̀ tʉntə",
    "french": "Enumérer",
    "english": "List"
  },
  {
    "medumba": "Fimŋwàꞌnì",
    "french": "Enveloppe",
    "english": "Envelope"
  },
  {
    "medumba": "Mfə̀ꞌ",
    "french": "Enveloppe",
    "english": "Envelope"
  },
  {
    "medumba": "Ghə̀ꞌtə̀",
    "french": "Envie",
    "english": "Want"
  },
  {
    "medumba": "Nə̀ ghə̀tə̌",
    "french": "Envier",
    "english": "Envy"
  },
  {
    "medumba": "Nə̀ tə lαg",
    "french": "Envier",
    "english": "Envy"
  },
  {
    "medumba": "Nə̀ cʉ̌ju",
    "french": "Envier",
    "english": "Envy"
  },
  {
    "medumba": "Nə̀ càgə",
    "french": "Envoyer",
    "english": "Send"
  },
  {
    "medumba": "Nə̀ tumə",
    "french": "Envoyer",
    "english": "Send"
  },
  {
    "medumba": "Nə̀ sàtə",
    "french": "Eparpiller",
    "english": "Scatter"
  },
  {
    "medumba": "Nkə̀mbə̀ꞌ",
    "french": "Epaule",
    "english": "Shoulder"
  },
  {
    "medumba": "Kαfὰ",
    "french": "Epée",
    "english": "Sword"
  },
  {
    "medumba": "Ŋwîncò",
    "french": "Epée",
    "english": "Sword"
  },
  {
    "medumba": "Nsὰŋwi",
    "french": "Epée",
    "english": "Sword"
  },
  {
    "medumba": "Kòꞌ",
    "french": "Epi (de mais)",
    "english": "Ear (of corn)"
  },
  {
    "medumba": "Nə̀ nyiꞌte",
    "french": "Epier",
    "english": "Epier"
  },
  {
    "medumba": "Waꞌa",
    "french": "Epilepsie",
    "english": "Epilepsy"
  },
  {
    "medumba": "Ngàvʉ̌waꞌa",
    "french": "Epileptique",
    "english": "Epileptic"
  },
  {
    "medumba": "Mvʉ̀waꞌa",
    "french": "Epileptique",
    "english": "Epileptic"
  },
  {
    "medumba": "Njɔ",
    "french": "Epine",
    "english": "Thorn"
  },
  {
    "medumba": "Bèfěca",
    "french": "Epine de folio de raphia",
    "english": "Raffia folio spine"
  },
  {
    "medumba": "Nzwîmɛ̀n",
    "french": "Epouse",
    "english": "Wife"
  },
  {
    "medumba": "Nə̀ nandα",
    "french": "Epouser",
    "english": "Marry"
  },
  {
    "medumba": "Nə so mènnzwi",
    "french": "Epouser",
    "english": "Marry"
  },
  {
    "medumba": "Ndu",
    "french": "Epoux",
    "english": "Husband"
  },
  {
    "medumba": "Làŋtə̀",
    "french": "Epreuve",
    "english": "Test"
  },
  {
    "medumba": "Nə̀ laŋ̀tə̌",
    "french": "Eprouver",
    "english": "Test"
  },
  {
    "medumba": "Nshʉꞌ",
    "french": "Equipe",
    "english": "Team"
  },
  {
    "medumba": "Kum",
    "french": "Equipe",
    "english": "Team"
  },
  {
    "medumba": "Junetsine",
    "french": "Equitable",
    "english": "Fair"
  },
  {
    "medumba": "Nunətsinə",
    "french": "Equité",
    "english": "Equity"
  },
  {
    "medumba": "Nə cǎ",
    "french": "Errer",
    "english": "Wander"
  },
  {
    "medumba": "Fὰntə̀",
    "french": "Erreur",
    "english": "Error"
  },
  {
    "medumba": "Nə̀fὰntə̀",
    "french": "Erreur",
    "english": "Error"
  },
  {
    "medumba": "Nə̀tαbtə̌",
    "french": "Erreur",
    "english": "Error"
  },
  {
    "medumba": "Tὰbtə̀",
    "french": "Erreur",
    "english": "Error"
  },
  {
    "medumba": "Kàmnkòꞌ",
    "french": "Escabeau",
    "english": "Stepladder"
  },
  {
    "medumba": "Mbǔꞌ",
    "french": "Escalier",
    "english": "Staircase"
  },
  {
    "medumba": "kwαn",
    "french": "Esclavage",
    "english": "Slavery"
  },
  {
    "medumba": "Bùꞌ",
    "french": "Esclave",
    "english": "Slave"
  },
  {
    "medumba": "Kwαn",
    "french": "Esclave",
    "english": "Slave"
  },
  {
    "medumba": "Mîntʉ̀n",
    "french": "Escroc",
    "english": "Scammer"
  },
  {
    "medumba": "Dʉꞌ",
    "french": "Espace",
    "english": "Space"
  },
  {
    "medumba": "Nə̀tɛddʉꞌ",
    "french": "Esperance",
    "english": "Hope"
  },
  {
    "medumba": "Nywintə̀",
    "french": "Esperance",
    "english": "Hope"
  },
  {
    "medumba": "Nə̀nywintə̀",
    "french": "Espérer",
    "english": "Hope"
  },
  {
    "medumba": "Nə̀ nywintə",
    "french": "Espion",
    "english": "Spy"
  },
  {
    "medumba": "Ntom",
    "french": "Espionner",
    "english": "Spy"
  },
  {
    "medumba": "Nə̀ tomə",
    "french": "Espionner",
    "english": "Spy"
  },
  {
    "medumba": "Nə̀ nyiꞌtə",
    "french": "Espionner",
    "english": "Spy"
  },
  {
    "medumba": "Nə̀ zwəꞌtə",
    "french": "Espoir",
    "english": "Hope"
  },
  {
    "medumba": "Ywɛlə",
    "french": "Esprit",
    "english": "Spirit"
  },
  {
    "medumba": "Nə̀ ləꞌə",
    "french": "Esquiver",
    "english": "Dodge"
  },
  {
    "medumba": "Nə̀ fìꞌtə̌",
    "french": "Essayer",
    "english": "Try"
  },
  {
    "medumba": "Nə̀ kə̀mtə̌",
    "french": "Essayer",
    "english": "Try"
  },
  {
    "medumba": "Nə̀ tαmtə",
    "french": "Estimer",
    "english": "Estimate"
  },
  {
    "medumba": "Cagə",
    "french": "Estomac",
    "english": "Stomach"
  },
  {
    "medumba": "Bô",
    "french": "Et",
    "english": "And"
  },
  {
    "medumba": "Dʉ̌ꞌŋwàꞌnì",
    "french": "Etablissement scolaire",
    "english": "School establishment"
  },
  {
    "medumba": "Ndα̂ŋwàꞌnì tɛ̀dkʉlə",
    "french": "Etablissement secondaire",
    "english": "Secondary establishment"
  },
  {
    "medumba": "Nkoꞌ",
    "french": "Etagère",
    "english": "Shelf"
  },
  {
    "medumba": "Nkǒꞌndα",
    "french": "Etagère",
    "english": "Shelf"
  },
  {
    "medumba": "Nkǒꞌnka",
    "french": "Etagère pour vaisselle",
    "english": "Dish shelf"
  },
  {
    "medumba": "Nə̀ biagə",
    "french": "Eteindre",
    "english": "Turn off"
  },
  {
    "medumba": "Bi",
    "french": "Eteint",
    "english": "Off"
  },
  {
    "medumba": "Màdmàd",
    "french": "Eternel",
    "english": "Eternal"
  },
  {
    "medumba": "Yoŋncʉꞌ",
    "french": "Eternel",
    "english": "Eternal"
  },
  {
    "medumba": "Ngǔꞌnguꞌ",
    "french": "Eternel",
    "english": "Eternal"
  },
  {
    "medumba": "Nsi",
    "french": "Eternel",
    "english": "Eternal"
  },
  {
    "medumba": "Ghaꞌtsie",
    "french": "Eternuement",
    "english": "Sneeze"
  },
  {
    "medumba": "Nə sòŋə",
    "french": "Etirer",
    "english": "Stretch"
  },
  {
    "medumba": "Ne sǎm wud",
    "french": "Etirer (sꞌ)",
    "english": "Stretch (sꞌ)"
  },
  {
    "medumba": "Sa",
    "french": "Etoile",
    "english": "Star"
  },
  {
    "medumba": "Nunecαmə",
    "french": "Etonnant",
    "english": "Amazing"
  },
  {
    "medumba": "Nə̀ cαmə",
    "french": "Etonner",
    "english": "Astonish"
  },
  {
    "medumba": "Nə̀ biagə",
    "french": "Etouffer",
    "english": "Suffocate"
  },
  {
    "medumba": "Nə̀ famə",
    "french": "Etouffer",
    "english": "Suffocate"
  },
  {
    "medumba": "Kὰgnì",
    "french": "Etourderie",
    "english": "thoughtlessness"
  },
  {
    "medumba": "Nkὰgnì",
    "french": "Etourdie",
    "english": "Dizzy"
  },
  {
    "medumba": "Nuìnəcαmə̀",
    "french": "Etrange",
    "english": "Strange"
  },
  {
    "medumba": "Mfαn",
    "french": "Etranger",
    "english": "Foreigner"
  },
  {
    "medumba": "Ngʉ̀n",
    "french": "Etranger",
    "english": "Foreigner"
  },
  {
    "medumba": "Tum",
    "french": "Etranger (à lꞌ)",
    "english": "Foreigner (at home)"
  },
  {
    "medumba": "Nə̀ ba ntɔ",
    "french": "Etrangler",
    "english": "Strangle"
  },
  {
    "medumba": "Nə̀ məm ntɔ",
    "french": "Etrangler",
    "english": "Strangle"
  },
  {
    "medumba": "Nə̀ cʉb ntɔ̂ntɔ̂",
    "french": "Etrangler",
    "english": "Strangle"
  },
  {
    "medumba": "Nə̀ bə",
    "french": "Être",
    "english": "Be"
  },
  {
    "medumba": "Jûzwiàg",
    "french": "Être (un)",
    "english": "To be (one)"
  },
  {
    "medumba": "Nə̀ ghuꞌu",
    "french": "Être gros",
    "english": "Being fat"
  },
  {
    "medumba": "Mɛ̀nnyǎŋtu",
    "french": "Être vivant",
    "english": "Being alive"
  },
  {
    "medumba": "Fed",
    "french": "Etroit",
    "english": "Narrow"
  },
  {
    "medumba": "Jûnə̀ziꞌi",
    "french": "Etude",
    "english": "Study"
  },
  {
    "medumba": "Ngàŋwàꞌnìndʉb",
    "french": "Etudiant",
    "english": "Student"
  },
  {
    "medumba": "Nə̀ ziꞌi",
    "french": "Etudier",
    "english": "Study"
  },
  {
    "medumba": "Ndɔ",
    "french": "Etui (boîte)",
    "english": "Case (box)"
  },
  {
    "medumba": "Mbα",
    "french": "Etui (fourreau)",
    "english": "Case (sheath)"
  },
  {
    "medumba": "Nə̀ cob nkùn mə̀bwɔ (v",
    "french": "Evangéliser",
    "english": "Evangelize"
  },
  {
    "medumba": "Ngàsoŋnǔnsi",
    "french": "Evangéliste",
    "english": "Evangelist"
  },
  {
    "medumba": "ngàtcobnkʉ̀nmə̀bwɔ",
    "french": "Evangéliste",
    "english": "Evangelist"
  },
  {
    "medumba": "Nkʉ̀nmə̀bwɔ",
    "french": "Evangile",
    "english": "Gospel"
  },
  {
    "medumba": "Ndǎŋndaŋ",
    "french": "Exact",
    "english": "Correct"
  },
  {
    "medumba": "Nə̀tsinə",
    "french": "Exact",
    "english": "Correct"
  },
  {
    "medumba": "Kwaꞌndǎŋndaŋ",
    "french": "Exactement",
    "english": "Exactly"
  },
  {
    "medumba": "Ndǎŋndaŋ",
    "french": "Exactement",
    "english": "Exactly"
  },
  {
    "medumba": "Nə̀ yaꞌnkaꞌ",
    "french": "Exagérer",
    "english": "Exaggerate"
  },
  {
    "medumba": "Nə̀ ghʉ̀ a ŋα",
    "french": "Exagérer",
    "english": "Exaggerate"
  },
  {
    "medumba": "Làŋtə̌",
    "french": "Examen",
    "english": "Review"
  },
  {
    "medumba": "Nə̀ laŋtə̌",
    "french": "Examiner",
    "english": "Examine"
  },
  {
    "medumba": "Nə̀ caꞌa",
    "french": "Examiner",
    "english": "Examine"
  },
  {
    "medumba": "Nə̀ dùdtě",
    "french": "Excéder",
    "english": "Exceed"
  },
  {
    "medumba": "Nə̀ cʉàtə̌",
    "french": "Excéder",
    "english": "Exceed"
  },
  {
    "medumba": "Nə̀ cʉǎ",
    "french": "Excéder",
    "english": "Exceed"
  },
  {
    "medumba": "Tûmlam",
    "french": "Exception",
    "english": "Exception"
  },
  {
    "medumba": "Tûmlam",
    "french": "Exceptionnel",
    "english": "Exceptional"
  },
  {
    "medumba": "Nə̀ tɛntə",
    "french": "Exciter",
    "english": "Excite"
  },
  {
    "medumba": "Mfìꞌ",
    "french": "Exemple",
    "english": "Example"
  },
  {
    "medumba": "Nə̀ be",
    "french": "Exister",
    "english": "Exist"
  },
  {
    "medumba": "Nə̀ bàgtə̌",
    "french": "Expliquer",
    "english": "Explain"
  },
  {
    "medumba": "Nə̀ bàgtə̌ nù",
    "french": "Expliquer",
    "english": "Explain"
  },
  {
    "medumba": "Diantαnə",
    "french": "Exposition-vente",
    "english": "Exhibition-sale"
  },
  {
    "medumba": "Nαntənαntə̀",
    "french": "Expressément",
    "english": "Expressly"
  },
  {
    "medumba": "Faꞌtə̀faꞌtə̀",
    "french": "Expressement",
    "english": "Expressly"
  },
  {
    "medumba": "Ndəndə",
    "french": "Expressement",
    "english": "Expressly"
  },
  {
    "medumba": "Nə̀ biagə",
    "french": "Exterminer",
    "english": "Exterminate"
  },
  {
    "medumba": "Nə̀ biagndα",
    "french": "Exterminer",
    "english": "Exterminate"
  },
  {
    "medumba": "Nùkətǒꞌyen",
    "french": "Extraordinaire",
    "english": "Extraordinary"
  },
  {
    "medumba": "Nùkətǒꞌjuꞌ",
    "french": "Extraordinaire",
    "english": "Extraordinary"
  },
  {
    "medumba": "Cʉàyàꞌnù",
    "french": "Extraordinaire",
    "english": "Extraordinary"
  },
  {
    "medumba": "Bùdncὰbnù",
    "french": "Extraordinaire",
    "english": "Extraordinary"
  },
  {
    "medumba": "Mbàŋlôkʉꞌ",
    "french": "Extropié",
    "english": "Extropiat"
  },
  {
    "medumba": "Nkəꞌnkɛ̀d",
    "french": "Extropié",
    "english": "Extropiat"
  },
  {
    "medumba": "Nə̀ nὰbtə̌",
    "french": "Fabrique",
    "english": "Factory"
  },
  {
    "medumba": "Sə",
    "french": "Face",
    "english": "Face"
  },
  {
    "medumba": "Sə̂sə",
    "french": "Face à face",
    "english": "Face to face"
  },
  {
    "medumba": "Nə̀ laꞌa",
    "french": "Fâcher (se)",
    "english": "Get angry"
  },
  {
    "medumba": "Nə̀ yantʉ",
    "french": "Fâcher (se)",
    "english": "Get angry"
  },
  {
    "medumba": "Yântʉ",
    "french": "Fâcherie",
    "english": "Angry"
  },
  {
    "medumba": "Fʉàgə",
    "french": "Facile",
    "english": "Easy"
  },
  {
    "medumba": "Ncaꞌ",
    "french": "Fagot",
    "english": "Fagot"
  },
  {
    "medumba": "Bod",
    "french": "Faible",
    "english": "Low"
  },
  {
    "medumba": "Bod",
    "french": "Faiblesse",
    "english": "Weakness"
  },
  {
    "medumba": "Nzikuꞌu",
    "french": "Faim",
    "english": "Hunger"
  },
  {
    "medumba": "Nə̀ ghʉ̌",
    "french": "Faire",
    "english": "Do"
  },
  {
    "medumba": "Nə̀ nαbtə",
    "french": "Faire",
    "english": "Do"
  },
  {
    "medumba": "Nə̀ fàꞌa",
    "french": "Faire",
    "english": "Do"
  },
  {
    "medumba": "Fə̌soŋ",
    "french": "Faire-part",
    "english": "Announcement"
  },
  {
    "medumba": "Nə̀ kǎŋ kǒꞌnù",
    "french": "Falsifier",
    "english": "Falsify"
  },
  {
    "medumba": "Tǔndα",
    "french": "Famille",
    "english": "Family"
  },
  {
    "medumba": "Kəkuα",
    "french": "Famine",
    "english": "Starvation"
  },
  {
    "medumba": "Kuα",
    "french": "Famine",
    "english": "Starvation"
  },
  {
    "medumba": "Nə̀ labə, nə̀ yubə",
    "french": "Faner",
    "english": "Fading"
  },
  {
    "medumba": "Ngàghʉ̌ghâgha (1/6",
    "french": "Fanfaron",
    "english": "Braggart"
  },
  {
    "medumba": "Ngàtaꞌnsoŋə",
    "french": "Fanfaron",
    "english": "Braggart"
  },
  {
    "medumba": "Nhâgha",
    "french": "Fanfaronnade",
    "english": "Bragging"
  },
  {
    "medumba": "Ntâꞌnsoŋ",
    "french": "Fanfaronnade",
    "english": "Bragging"
  },
  {
    "medumba": "Ghǎmɛ̀n",
    "french": "Fantôme",
    "english": "Ghost"
  },
  {
    "medumba": "Kòmzwi",
    "french": "Farce",
    "english": "Prank"
  },
  {
    "medumba": "Ngàkǒmzwì",
    "french": "Farceur",
    "english": "Prankster"
  },
  {
    "medumba": "Lɛ̀d",
    "french": "Fardeau",
    "english": "Burden"
  },
  {
    "medumba": "Mbâbbαn",
    "french": "Farine",
    "english": "Flour"
  },
  {
    "medumba": "Bod",
    "french": "Fatigue",
    "english": "Fatigue"
  },
  {
    "medumba": "Nə̀ kα̌g bod",
    "french": "Fatiguer",
    "english": "Tired"
  },
  {
    "medumba": "Fα̌nnù",
    "french": "Faute",
    "english": "Fault"
  },
  {
    "medumba": "Fα̌ntə̀",
    "french": "Faute",
    "english": "Fault"
  },
  {
    "medumba": "Nùkə̀bwɔ̀",
    "french": "Faute",
    "english": "Fault"
  },
  {
    "medumba": "Nzwinyὰm",
    "french": "Femelle",
    "english": "Female"
  },
  {
    "medumba": "Mɛ̀nnzwi",
    "french": "Femme",
    "english": "Women"
  },
  {
    "medumba": "Kâdtʉ̂ mɛ̀nnzwi 1/6",
    "french": "Femme adultaire",
    "english": "Adultary woman"
  },
  {
    "medumba": "Ghuaꞌmə̀nnzwi (1/6",
    "french": "Femme délaissée",
    "english": "abandoned woman"
  },
  {
    "medumba": "Mɛ̀nnzwîndu",
    "french": "Femme mariée",
    "english": "Married woman"
  },
  {
    "medumba": "Nzwighʉ̀n",
    "french": "Femme(nouvellement mariée)",
    "english": "Woman (newly married)"
  },
  {
    "medumba": "Mαbwə",
    "french": "Femme qui vient accoucher",
    "english": "Woman giving birth"
  },
  {
    "medumba": "Mαbwəngùb",
    "french": "Femme (1er du roi)",
    "english": "Wife (1st of the king)"
  },
  {
    "medumba": "Mα̂mfiꞌngɔ̀",
    "french": "Femme patriarche",
    "english": "Female patriarch"
  },
  {
    "medumba": "Nə̀ bagə",
    "french": "Fendre",
    "english": "Split"
  },
  {
    "medumba": "Mfeꞌ",
    "french": "Fenêtre",
    "english": "Window"
  },
  {
    "medumba": "Tʉnə",
    "french": "Fer",
    "english": "Iron"
  },
  {
    "medumba": "Ngàlɛ̌dncù",
    "french": "Ferme̍ (homme)",
    "english": "Farm (man)"
  },
  {
    "medumba": "Nə̀ fʉ̀nə",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ kabtə",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ məmə",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ yɛ̀ntə̌",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Nə̀ yiꞌi",
    "french": "Fermer",
    "english": "Close"
  },
  {
    "medumba": "Cwədtùn",
    "french": "Fesse",
    "english": "Buttock"
  },
  {
    "medumba": "Diaŋntsiꞌi (",
    "french": "Festival",
    "english": "Festival"
  },
  {
    "medumba": "Jʉα",
    "french": "Fête",
    "english": "Party"
  },
  {
    "medumba": "Leꞌjʉα",
    "french": "Fête (jour de )",
    "english": "Feast (day of)"
  },
  {
    "medumba": "Nə̀ tsiàŋtě leꞌjʉα",
    "french": "Fêter",
    "english": "Celebrate"
  },
  {
    "medumba": "Mbwoge",
    "french": "Feu",
    "english": "Fire"
  },
  {
    "medumba": "Mfə",
    "french": "Feu (défunt )",
    "english": "Fire (defunct)"
  },
  {
    "medumba": "Fu",
    "french": "Feuille",
    "english": "Leaf"
  },
  {
    "medumba": "Fə",
    "french": "Feuille (de papier)",
    "english": "Sheet (of paper)"
  },
  {
    "medumba": "Ghù",
    "french": "Fiançailles",
    "english": "Engagement"
  },
  {
    "medumba": "Ndûghù",
    "french": "Fiance",
    "english": "Engagement"
  },
  {
    "medumba": "Nzwighù",
    "french": "Fiancée",
    "english": "Fiancee"
  },
  {
    "medumba": "Ǹə̀ kǎ mɛ̀nnzwi",
    "french": "Fiancer",
    "english": "Get engaged"
  },
  {
    "medumba": "Nə̀ tsho ghù",
    "french": "Fiancer",
    "english": "Get engaged"
  },
  {
    "medumba": "Fàꞌkə̀cʉ̰ὰ",
    "french": "Fiasco",
    "english": "Fiasco"
  },
  {
    "medumba": "Nə̀ femə",
    "french": "Fiasquer",
    "english": "Fascage"
  },
  {
    "medumba": "Mfiα̂gə",
    "french": "Fibre",
    "english": "Fiber"
  },
  {
    "medumba": "Saŋtə̀wud",
    "french": "Fièvre",
    "english": "Fever"
  },
  {
    "medumba": "Com",
    "french": "Figue",
    "english": "Fig"
  },
  {
    "medumba": "Tʉmbǎtsi",
    "french": "Figuier",
    "english": "Fig tree"
  },
  {
    "medumba": "Tʉcom",
    "french": "Figuier",
    "english": "Fig tree"
  },
  {
    "medumba": "Sə",
    "french": "Figure",
    "english": "Figure"
  },
  {
    "medumba": "Mɛ̀nndʉb",
    "french": "Figure 9grqnde0",
    "english": "Figure 9grqnde0"
  },
  {
    "medumba": "Ndə̀b",
    "french": "Fil",
    "english": "Wire"
  },
  {
    "medumba": "Nka",
    "french": "File",
    "english": "File"
  },
  {
    "medumba": "Fot",
    "french": "Filet",
    "english": "Net"
  },
  {
    "medumba": "Mbunjα",
    "french": "Filet",
    "english": "Net"
  },
  {
    "medumba": "Ngòn",
    "french": "Fille",
    "english": "Girl"
  },
  {
    "medumba": "Məngòn",
    "french": "Fillette",
    "english": "little girl"
  },
  {
    "medumba": "Nshùm",
    "french": "Fils",
    "english": "Son"
  },
  {
    "medumba": "Mɛ̀nnshùm",
    "french": "Fils",
    "english": "Son"
  },
  {
    "medumba": "Ncʉàmbwə̀",
    "french": "Fils aine",
    "english": "Eldest son"
  },
  {
    "medumba": "Ngâꞌnzə̀",
    "french": "Fils aine (de la famille)",
    "english": "Eldest son (of the family)"
  },
  {
    "medumba": "Tuswə",
    "french": "Fils aine",
    "english": "Eldest son"
  },
  {
    "medumba": "Ntshoꞌndà",
    "french": "Fils unique",
    "english": "only son"
  },
  {
    "medumba": "Mɛ̂nncʉꞌ",
    "french": "Fils unique",
    "english": "only son"
  },
  {
    "medumba": "Nkwìmɛn",
    "french": "Fils unique",
    "english": "only son"
  },
  {
    "medumba": "Cêdntsə",
    "french": "Filtre",
    "english": "Filter"
  },
  {
    "medumba": "Nə̀ celə",
    "french": "Filtrer",
    "english": "Filter"
  },
  {
    "medumba": "Nə̀ mǐ",
    "french": "Finir",
    "english": "Finish"
  },
  {
    "medumba": "Nə̀ miàgtə̌",
    "french": "Finir",
    "english": "Finish"
  },
  {
    "medumba": "Miàgtə",
    "french": "Finition, fin",
    "english": "Finish, end"
  },
  {
    "medumba": "Nkàꞌ",
    "french": "Flambeau",
    "english": "Flambeau"
  },
  {
    "medumba": "Nə̀ jʉǎ mbogə",
    "french": "Flamber",
    "english": "Flamber"
  },
  {
    "medumba": "Nə̀ bad nkàꞌ",
    "french": "Flamber (faire)",
    "english": "flambé (make)"
  },
  {
    "medumba": "Nsa",
    "french": "Flanc",
    "english": "Flank"
  },
  {
    "medumba": "Nə̀ badtə",
    "french": "Flatter",
    "english": "Flatter"
  },
  {
    "medumba": "Badtə̀",
    "french": "Flatterie",
    "english": "Flattery"
  },
  {
    "medumba": "Vʉngɔ̀",
    "french": "Fléau",
    "english": "Scourge"
  },
  {
    "medumba": "Nsα̌mtʉ",
    "french": "Fleur",
    "english": "Flower"
  },
  {
    "medumba": "Nsα̌mnə̀nὰ",
    "french": "Fleur",
    "english": "Flower"
  },
  {
    "medumba": "Taꞌntsə",
    "french": "Fleuve",
    "english": "River"
  },
  {
    "medumba": "Fedntsə",
    "french": "Flot",
    "english": "Flow"
  },
  {
    "medumba": "Tuꞌntsə",
    "french": "Flot (vague)",
    "english": "Flow (wave)"
  },
  {
    "medumba": "Ntǎdntad",
    "french": "Flou",
    "english": "Blur"
  },
  {
    "medumba": "Ndɔ",
    "french": "Flûte",
    "english": "Flute"
  },
  {
    "medumba": "Mαndɔ",
    "french": "Flute",
    "english": "Flute"
  },
  {
    "medumba": "Nə̀ tɔ ndɔ",
    "french": "Fluter",
    "english": "Fluter"
  },
  {
    "medumba": "Ngàtɔndɔ",
    "french": "Flutiste",
    "english": "Flutist"
  },
  {
    "medumba": "Ntɔ̂ndɔ",
    "french": "Flutiste",
    "english": "Flutist"
  },
  {
    "medumba": "Bâmntʉ",
    "french": "Foi",
    "english": "Faith"
  },
  {
    "medumba": "Bì",
    "french": "Foie",
    "english": "Liver"
  },
  {
    "medumba": "Dibὰ ntαnə",
    "french": "Foire",
    "english": "Fair"
  },
  {
    "medumba": "Yòŋtsə",
    "french": "Fois",
    "english": "Times"
  },
  {
    "medumba": "Nzə̀tsə",
    "french": "Fois",
    "english": "Times"
  },
  {
    "medumba": "Bα",
    "french": "Folie",
    "english": "Madness"
  },
  {
    "medumba": "Zwiaŋtə̀",
    "french": "Folie",
    "english": "Madness"
  },
  {
    "medumba": "Yoŋtə̀",
    "french": "Folie",
    "english": "Madness"
  },
  {
    "medumba": "Tǔnbàꞌ",
    "french": "Fondation",
    "english": "Foundation"
  },
  {
    "medumba": "Ne tə",
    "french": "Fonder",
    "english": "Found"
  },
  {
    "medumba": "Zwìn",
    "french": "Fontanelle",
    "english": "Fontanelle"
  },
  {
    "medumba": "Tânkù",
    "french": "Football",
    "english": "Football"
  },
  {
    "medumba": "Mbàꞌ",
    "french": "Force",
    "english": "Strength"
  },
  {
    "medumba": "Nə̀ta",
    "french": "Force",
    "english": "Strength"
  },
  {
    "medumba": "Ngʉꞌ",
    "french": "Force",
    "english": "Strength"
  },
  {
    "medumba": "Tà",
    "french": "Force",
    "english": "Strength"
  },
  {
    "medumba": "Nə̀ sǒ nə̀ta",
    "french": "Forcer",
    "english": "Force"
  },
  {
    "medumba": "Nə̀ sǒ ngʉꞌ",
    "french": "Forcer",
    "english": "Force"
  },
  {
    "medumba": "Nə̀ nαnə",
    "french": "Forcer",
    "english": "Force"
  },
  {
    "medumba": "Nə̀ ncʉb tʉ̀n",
    "french": "Forcer",
    "english": "Force"
  },
  {
    "medumba": "Fɛ̀n",
    "french": "Foret",
    "english": "Drill"
  },
  {
    "medumba": "lὰm",
    "french": "Forge",
    "english": "Blacksmithing"
  },
  {
    "medumba": "Nə̀ tswə̌ lὰm",
    "french": "Forger",
    "english": "Forge"
  },
  {
    "medumba": "Nə̀ tswə̌ tʉnə",
    "french": "Forger",
    "english": "Forge"
  },
  {
    "medumba": "Nə̀ və̌",
    "french": "Forger",
    "english": "Forge"
  },
  {
    "medumba": "Tαlὰm",
    "french": "Forgeron",
    "english": "Blacksmith"
  },
  {
    "medumba": "Ngànə̀tà",
    "french": "Fort",
    "english": "Strong"
  },
  {
    "medumba": "Nətâmɛ̀n",
    "french": "Fort",
    "english": "Strong"
  },
  {
    "medumba": "Vôgncʉꞌ",
    "french": "Fort (très)",
    "english": "Strong (very)"
  },
  {
    "medumba": "Kὰbntʉnə",
    "french": "Forteresse",
    "english": "Fortress"
  },
  {
    "medumba": "Nə̀ sǒ nə̀ta",
    "french": "Fortifier",
    "english": "Fortify"
  },
  {
    "medumba": "Nə̀ fα ngʉꞌ",
    "french": "Fortifier",
    "english": "Fortify"
  },
  {
    "medumba": "Fub",
    "french": "Fosse",
    "english": "Pit"
  },
  {
    "medumba": "Fubntsə",
    "french": "Fosse̍",
    "english": "Pit"
  },
  {
    "medumba": "Fubtsǐdmbàŋ",
    "french": "Fosse̍",
    "english": "Pit"
  },
  {
    "medumba": "Mbα̂bʉnə",
    "french": "Fou",
    "english": "Crazy"
  },
  {
    "medumba": "Shuaꞌa",
    "french": "Fouet",
    "english": "Whisk"
  },
  {
    "medumba": "Nə̀ fùꞌu",
    "french": "Fouiller",
    "english": "Search"
  },
  {
    "medumba": "Nə̀ taꞌa",
    "french": "Fouiller",
    "english": "Search"
  },
  {
    "medumba": "Bwǒŋbə̀nntʉ̀n",
    "french": "Foule",
    "english": "Crowd"
  },
  {
    "medumba": "Nə̀ nyàŋtə̀ nkù",
    "french": "Fouler",
    "english": "Tread"
  },
  {
    "medumba": "Fə̂nsi",
    "french": "Fourmi",
    "english": "Ant"
  },
  {
    "medumba": "Shule",
    "french": "Fourmi",
    "english": "Ant"
  },
  {
    "medumba": "Ntα̌mbiaꞌa",
    "french": "Fourmi magnan",
    "english": "Magnan Ant"
  },
  {
    "medumba": "Ntα̌mbiaꞌa 1/6",
    "french": "Fourmi magnan",
    "english": "Magnan Ant"
  },
  {
    "medumba": "Ndûmmbwogə (1/6",
    "french": "Fournaise",
    "english": "Furnace"
  },
  {
    "medumba": "Lαgmbwogə",
    "french": "Foyer",
    "english": "Hearth"
  },
  {
    "medumba": "Tɔ̌mbwogə",
    "french": "Foyer",
    "english": "Hearth"
  },
  {
    "medumba": "Fîfi",
    "french": "Frais",
    "english": "Fees"
  },
  {
    "medumba": "Nəfitə",
    "french": "Frais",
    "english": "Fees"
  },
  {
    "medumba": "Nə̀ buꞌu",
    "french": "Frapper",
    "english": "Hit"
  },
  {
    "medumba": "Nə̀ làbə",
    "french": "Frapper",
    "english": "Hit"
  },
  {
    "medumba": "Nə̀ tamtə ŋwaꞌnì (V",
    "french": "Frapper à la machine",
    "english": "Hitting machine"
  },
  {
    "medumba": "Nə̀ kəꞌtə nzə̀ndα (V",
    "french": "Frapper à la porte",
    "english": "Knock on the door"
  },
  {
    "medumba": "Mfʉm",
    "french": "Fraude",
    "english": "Fraud"
  },
  {
    "medumba": "Kùbtə̀",
    "french": "Fraude",
    "english": "Fraud"
  },
  {
    "medumba": "Cɔ",
    "french": "Fraude",
    "english": "Fraud"
  },
  {
    "medumba": "Nə̀ ghʉ̌ fʉ̀m",
    "french": "Frauder",
    "english": "Fraud"
  },
  {
    "medumba": "Nə̀ kubtə",
    "french": "Frauder",
    "english": "Fraud"
  },
  {
    "medumba": "Ngàghʉ̌mfʉm",
    "french": "Fraudeur",
    "english": "Fraudster"
  },
  {
    "medumba": "Ngàkùbtə",
    "french": "Fraudeur",
    "english": "Fraudster"
  },
  {
    "medumba": "Mfɛd",
    "french": "Frère",
    "english": "Brother"
  },
  {
    "medumba": "Mɛ̀nmα",
    "french": "Frère",
    "english": "Brother"
  },
  {
    "medumba": "Mɛ̀ntα",
    "french": "Frère",
    "english": "Brother"
  },
  {
    "medumba": "Mfɛdntʉ̂mywɛlə(1/6",
    "french": "Frère en christ",
    "english": "Brother in Christ"
  },
  {
    "medumba": "Ntànywìn",
    "french": "Frigidaire",
    "english": "Fridge"
  },
  {
    "medumba": "Nə̀ ka",
    "french": "Frire",
    "english": "Fry"
  },
  {
    "medumba": "Nə̀ katə",
    "french": "Frire",
    "english": "Fry"
  },
  {
    "medumba": "Saŋtə̀wud (",
    "french": "Frisson",
    "english": "Thrill"
  },
  {
    "medumba": "Nə̀ saŋtə",
    "french": "Frissonner",
    "english": "Shiver"
  },
  {
    "medumba": "Ngàghag",
    "french": "Frivole",
    "english": "Frivolous"
  },
  {
    "medumba": "Nə̀ ghagə",
    "french": "Frivole (être)",
    "english": "Frivolous (to be)"
  },
  {
    "medumba": "Ghag",
    "french": "Frivolité",
    "english": "Frivolity"
  },
  {
    "medumba": "Nə̀ ko mfʉag",
    "french": "Froid (faire)",
    "english": "Cold (do)"
  },
  {
    "medumba": "Mfʉag",
    "french": "Froid",
    "english": "Cold"
  },
  {
    "medumba": "Fifi",
    "french": "Froid",
    "english": "Cold"
  },
  {
    "medumba": "Mbwə̀",
    "french": "Front",
    "english": "Forehead"
  },
  {
    "medumba": "Nkɔ̀se",
    "french": "Front",
    "english": "Forehead"
  },
  {
    "medumba": "Ncùsə",
    "french": "Front",
    "english": "Forehead"
  },
  {
    "medumba": "Ncùncò",
    "french": "Front",
    "english": "Forehead"
  },
  {
    "medumba": "Kaŋsə",
    "french": "Front (bombe̍)",
    "english": "Forehead (bomb)"
  },
  {
    "medumba": "Dʉ̌ꞌncò",
    "french": "Front (de combat)",
    "english": "Front (combat)"
  },
  {
    "medumba": "Ndʉ",
    "french": "Frontière",
    "english": "Border"
  },
  {
    "medumba": "Ndʉ̂ngɔ̀",
    "french": "Frontière",
    "english": "Border"
  },
  {
    "medumba": "Nə̀ yamntαmə",
    "french": "Fructifier",
    "english": "Fruit"
  },
  {
    "medumba": "Nə̀ faꞌa",
    "french": "Fructifier",
    "english": "Fruit"
  },
  {
    "medumba": "Nə̀ yamə",
    "french": "Fructifier",
    "english": "Fruit"
  },
  {
    "medumba": "Nə̀ co",
    "french": "Fructifier",
    "english": "Fruit"
  },
  {
    "medumba": "Tαmtʉ",
    "french": "Fruit",
    "english": "Fruit"
  },
  {
    "medumba": "Tʉnə̀yammntαmə",
    "french": "Fruitier (arbre)",
    "english": "Fruit tree (tree)"
  },
  {
    "medumba": "Nə̀ kʉ ̌",
    "french": "Fuir",
    "english": "Run away"
  },
  {
    "medumba": "Nzə̂mbwogə",
    "french": "Fume̍e",
    "english": "Smoke"
  },
  {
    "medumba": "Nə̀ lamnzə̂mbwogə",
    "french": "Fumer",
    "english": "Smoking"
  },
  {
    "medumba": "Nə̀ nu ndə̀bà",
    "french": "Fumer",
    "english": "Smoking"
  },
  {
    "medumba": "Ngànundə̀bà",
    "french": "Fumeur",
    "english": "Smoker"
  },
  {
    "medumba": "Ngαnə",
    "french": "Fusil",
    "english": "Rifle"
  },
  {
    "medumba": "Taŋə",
    "french": "Fût",
    "english": "Barrel"
  },
  {
    "medumba": "Nkwὰnnəfiagə",
    "french": "Gage",
    "english": "Gage"
  },
  {
    "medumba": "Coꞌtu",
    "french": "Gage",
    "english": "Gage"
  },
  {
    "medumba": "Nə̀ fiǎg nkὰn",
    "french": "Gager",
    "english": "Gag"
  },
  {
    "medumba": "Nə̀ yα̂b cwɛ̀d",
    "french": "Gager",
    "english": "Gag"
  },
  {
    "medumba": "Nə̀ jʉ",
    "french": "Gagner",
    "english": "Win"
  },
  {
    "medumba": "Nə̀ lǒŋ kamə",
    "french": "Gagner",
    "english": "Win"
  },
  {
    "medumba": "Nə̀ lǒŋ ncà",
    "french": "Gagner",
    "english": "Win"
  },
  {
    "medumba": "Nə̀satə",
    "french": "Gai",
    "english": "Gay"
  },
  {
    "medumba": "Nəŋwatə",
    "french": "Gai",
    "english": "Gay"
  },
  {
    "medumba": "Ŋwatəmɛ̀n",
    "french": "Gai (homme)",
    "english": "Gay (man)"
  },
  {
    "medumba": "Ŋwatə",
    "french": "Gaite̍",
    "english": "Gaite̍"
  },
  {
    "medumba": "Satə̀",
    "french": "Gaite̍",
    "english": "Gaite̍"
  },
  {
    "medumba": "Mbαnə",
    "french": "Gale",
    "english": "Scabies"
  },
  {
    "medumba": "Mɛ̀nmbαnə",
    "french": "Galeux",
    "english": "Mangy"
  },
  {
    "medumba": "Nə̀zwə̌ju",
    "french": "Gangilion",
    "english": "Gangilium"
  },
  {
    "medumba": "Mbαnnzunə",
    "french": "Gangrène",
    "english": "Gangrene"
  },
  {
    "medumba": "Nə̀bebə (",
    "french": "Garde",
    "english": "Guard"
  },
  {
    "medumba": "Ngàbeb",
    "french": "Garde",
    "english": "Guard"
  },
  {
    "medumba": "Bαmnα",
    "french": "Garde (prendre)",
    "english": "Guard (take)"
  },
  {
    "medumba": "Nə̀ zətə",
    "french": "Garde (prendre)",
    "english": "Guard (take)"
  },
  {
    "medumba": "Nə̀ bebə",
    "french": "Garder",
    "english": "Keep"
  },
  {
    "medumba": "Nə̀ ləmə",
    "french": "Garder",
    "english": "Keep"
  },
  {
    "medumba": "Nə̀ lə",
    "french": "Garnir",
    "english": "Garnish"
  },
  {
    "medumba": "Nə̀ kud mfʉag",
    "french": "Geler",
    "english": "Freeze"
  },
  {
    "medumba": "Nə̀ nywìnə",
    "french": "Geler",
    "english": "Freeze"
  },
  {
    "medumba": "Ntage",
    "french": "Gencives",
    "english": "Gums"
  },
  {
    "medumba": "Baꞌa",
    "french": "Gendarme",
    "english": "Constable"
  },
  {
    "medumba": "Ndα̂bə̀fə̀",
    "french": "Gendarmerie",
    "english": "Gendarmerie"
  },
  {
    "medumba": "Bə̀nntʉ̀n",
    "french": "Gens",
    "english": "People"
  },
  {
    "medumba": "Mfìꞌcaꞌa",
    "french": "Ge̍omètre",
    "english": "Geometry"
  },
  {
    "medumba": "Ngα̂mmfiꞌcaꞌa",
    "french": "Ge̍omètre",
    "english": "Geometry"
  },
  {
    "medumba": "Nə̀ bile",
    "french": "Germer",
    "english": "Sprout"
  },
  {
    "medumba": "Nə̀ ywìmə",
    "french": "Germer",
    "english": "Sprout"
  },
  {
    "medumba": "Dʉbtɔ̀ngɔ̀",
    "french": "Ge̍rontocratie",
    "english": "Gerontocracy"
  },
  {
    "medumba": "Nə̀ tiàgə",
    "french": "Glisser",
    "english": "Slide"
  },
  {
    "medumba": "Nkunì",
    "french": "Gloire",
    "english": "Glory"
  },
  {
    "medumba": "Ghamtə̀",
    "french": "Gloire",
    "english": "Glory"
  },
  {
    "medumba": "Nə̀ ghamtə̀",
    "french": "Glorifier",
    "english": "Glorify"
  },
  {
    "medumba": "Màꞌmî",
    "french": "Glouton",
    "english": "Glutton"
  },
  {
    "medumba": "Njʉkə̀ywɛd",
    "french": "Glouton",
    "english": "Glutton"
  },
  {
    "medumba": "Jʉkə̀ywɛd",
    "french": "Gloutonnerie",
    "english": "Gluttony"
  },
  {
    "medumba": "Lendtsə",
    "french": "Gobelet",
    "english": "Tumbler"
  },
  {
    "medumba": "Côꞌkʉdnjumə",
    "french": "Gomme",
    "english": "Eraser"
  },
  {
    "medumba": "Məcòꞌ",
    "french": "Gorille",
    "english": "Gorilla"
  },
  {
    "medumba": "Nzə̀tɔ",
    "french": "Gosier",
    "english": "Throat"
  },
  {
    "medumba": "Ntûꞌntsə",
    "french": "Gourde (d’eau)",
    "english": "Bottle (of water)"
  },
  {
    "medumba": "Ncὰmntʉ",
    "french": "Gourmand",
    "english": "Gourmet"
  },
  {
    "medumba": "Nə̀ cα̌mntʉ",
    "french": "Gourmand (être)",
    "english": "Greedy (to be)"
  },
  {
    "medumba": "Ncα̌mntʉ",
    "french": "Gourmandise",
    "english": "Gluttony"
  },
  {
    "medumba": "Nə̀cα̌mntʉ",
    "french": "Gourmandise",
    "english": "Gluttony"
  },
  {
    "medumba": "Njʉmɛ̀n",
    "french": "Goût",
    "english": "Taste"
  },
  {
    "medumba": "Numɛ̀n",
    "french": "Goût",
    "english": "Taste"
  },
  {
    "medumba": "Mbwɔ̌ju",
    "french": "Goût",
    "english": "Taste"
  },
  {
    "medumba": "Nə̀ zwiꞌtə",
    "french": "Goûter",
    "english": "Snack"
  },
  {
    "medumba": "Tαm",
    "french": "Goutte",
    "english": "Drop"
  },
  {
    "medumba": "Tαmntsə",
    "french": "Goutte d’eau",
    "english": "Water drop"
  },
  {
    "medumba": "Kondɛ̀n",
    "french": "Grâce",
    "english": "Grace"
  },
  {
    "medumba": "Nzilə",
    "french": "Grisse grand",
    "english": "Gray big"
  },
  {
    "medumba": "Nkòꞌ",
    "french": "Grand",
    "english": "Large"
  },
  {
    "medumba": "Ndʉb",
    "french": "Grand",
    "english": "Large"
  },
  {
    "medumba": "Mα",
    "french": "Grand",
    "english": "Large"
  },
  {
    "medumba": "A ghuꞌ",
    "french": "Grand (c’est)",
    "english": "Big (it’s)"
  },
  {
    "medumba": "Mɛ̀nndʉb",
    "french": "Grand homme",
    "english": "Great man"
  },
  {
    "medumba": "Nzimɛ̀n",
    "french": "Grand homme",
    "english": "Great man"
  },
  {
    "medumba": "Nsὰmɛ̀n",
    "french": "Grand homme",
    "english": "Great man"
  },
  {
    "medumba": "Ghàꞌ",
    "french": "Grandiose",
    "english": "Grandiose"
  },
  {
    "medumba": "Nkòꞌ",
    "french": "Gradiose",
    "english": "Gradiosis"
  },
  {
    "medumba": "nkǒꞌnkǒꞌ cu",
    "french": "Grandiose (chose)",
    "english": "Grand (thing)"
  },
  {
    "medumba": "Nə̀ kùꞌu",
    "french": "Grandir",
    "english": "Growing up"
  },
  {
    "medumba": "Nə̀nyamtə se",
    "french": "Grimace",
    "english": "Grimace"
  },
  {
    "medumba": "Nə̀ nyamte sə",
    "french": "Grimacer",
    "english": "Grimace"
  },
  {
    "medumba": "Nə̀ fɛdnsɔ",
    "french": "Grimacer les dent",
    "english": "Grimacing your teeth"
  },
  {
    "medumba": "Nə̀ yàtə̌",
    "french": "Guerir",
    "english": "Heal"
  },
  {
    "medumba": "Nə̀ fǎꞌ ngòkɛd",
    "french": "Guerir",
    "english": "Heal"
  },
  {
    "medumba": "Nə̀ cwètə̌ ngòkɛd",
    "french": "Guerir",
    "english": "Heal"
  },
  {
    "medumba": "Ngàcwètə̀",
    "french": "Guerisseur",
    "english": "Healer"
  },
  {
    "medumba": "Ncò",
    "french": "Guerre",
    "english": "War"
  },
  {
    "medumba": "Nə̀ ləꞌ ncò",
    "french": "Guerroyer",
    "english": "War"
  },
  {
    "medumba": "Nə̀ mǎꞌ ncò",
    "french": "Guerroyer",
    "english": "War"
  },
  {
    "medumba": "Nə̀̀màꞌnzwə",
    "french": "Habillement",
    "english": "Clothing"
  },
  {
    "medumba": "Nə̀ kět nzwə",
    "french": "Habiller",
    "english": "Dress up"
  },
  {
    "medumba": "Nə̀ mǎꞌnzwə",
    "french": "Habiller",
    "english": "Dress up"
  },
  {
    "medumba": "Nə̀ tog nzwə",
    "french": "Habiller",
    "english": "Dress up"
  },
  {
    "medumba": "Kum",
    "french": "Habit",
    "english": "Clothing"
  },
  {
    "medumba": "Nzwə",
    "french": "Habit",
    "english": "Clothing"
  },
  {
    "medumba": "Zə̀laꞌ",
    "french": "Habitant",
    "english": "Inhabitant"
  },
  {
    "medumba": "Bàꞌ",
    "french": "Habitation",
    "english": "Housing"
  },
  {
    "medumba": "Dʉ̌ꞌntswə",
    "french": "Habitation",
    "english": "Housing"
  },
  {
    "medumba": "Ndα",
    "french": "Habitatant",
    "english": "Resident"
  },
  {
    "medumba": "Nə̀ tswə",
    "french": "Habiter",
    "english": "Live"
  },
  {
    "medumba": "Màd",
    "french": "Habitude",
    "english": "Habit"
  },
  {
    "medumba": "Nə̀ lǒꞌ màd",
    "french": "Habituer",
    "english": "Get used to"
  },
  {
    "medumba": "Nə̀ mìlə",
    "french": "Habituer",
    "english": "Get used to"
  },
  {
    "medumba": "Njὰm",
    "french": "Hache",
    "english": "Ax"
  },
  {
    "medumba": "Kὰb",
    "french": "Haie",
    "english": "Hedge"
  },
  {
    "medumba": "Nkəmbαn",
    "french": "Haine",
    "english": "Hate"
  },
  {
    "medumba": "Nǔnkə̀mbαn",
    "french": "Haineux",
    "english": "Hateful"
  },
  {
    "medumba": "Nə̀ bὰnə",
    "french": "Haïr",
    "english": "Hate"
  },
  {
    "medumba": "Ywɛtncù",
    "french": "Haleine",
    "english": "Breath"
  },
  {
    "medumba": "Lubə",
    "french": "Hamec̩on",
    "english": "Hook"
  },
  {
    "medumba": "Tâmmbu",
    "french": "Handball",
    "english": "Handball"
  },
  {
    "medumba": "Zwəꞌə",
    "french": "Hanche",
    "english": "Hip"
  },
  {
    "medumba": "Kə̀bwog",
    "french": "Hardi",
    "english": "Bold"
  },
  {
    "medumba": "Ngàfid",
    "french": "Hardi",
    "english": "Bold"
  },
  {
    "medumba": "Fit",
    "french": "Hardiesse",
    "english": "Boldness"
  },
  {
    "medumba": "Kùni",
    "french": "Hardiesse",
    "english": "Boldness"
  },
  {
    "medumba": "Nkun",
    "french": "Haricot",
    "english": "Bean"
  },
  {
    "medumba": "Loŋə",
    "french": "Harpe",
    "english": "Harp"
  },
  {
    "medumba": "Mfətʉ",
    "french": "Haut",
    "english": "Top"
  },
  {
    "medumba": "Nə̀filə",
    "french": "Hautain",
    "english": "Haughty"
  },
  {
    "medumba": "Ngàfid",
    "french": "Hautain",
    "english": "Haughty"
  },
  {
    "medumba": "Nə̀nɛ̌ntʉ",
    "french": "Hauteur",
    "english": "Height"
  },
  {
    "medumba": "Mfətʉ",
    "french": "Hauteur",
    "english": "Height"
  },
  {
    "medumba": "Nùm kekaŋə",
    "french": "Hauteur (en)",
    "english": "Height (in)"
  },
  {
    "medumba": "Nə̀nὰ",
    "french": "Herbe",
    "english": "Grass"
  },
  {
    "medumba": "Ngàkαbnə̀nὰ",
    "french": "Herboriste",
    "english": "Herbalist"
  },
  {
    "medumba": "Ntsiꞌi",
    "french": "He̍ritage",
    "english": "Heritage"
  },
  {
    "medumba": "Ndα",
    "french": "He̍ritage",
    "english": "Heritage"
  },
  {
    "medumba": "Nə̀ jʉndα",
    "french": "He̍ritier",
    "english": "Heir"
  },
  {
    "medumba": "Njʉndα",
    "french": "He̍ritier",
    "english": "Heir"
  },
  {
    "medumba": "Mὰgtə̌",
    "french": "He̍sitation",
    "english": "Hesitation"
  },
  {
    "medumba": "Nə̀ mὰgtə̌",
    "french": "He̍siter",
    "english": "Hesitate"
  },
  {
    "medumba": "Ngə̀laŋ",
    "french": "Heure",
    "english": "Time"
  },
  {
    "medumba": "Nyàm",
    "french": "Heure",
    "english": "Time"
  },
  {
    "medumba": "Ngàtswəmə̀bwɔ",
    "french": "Heureux",
    "english": "Happy"
  },
  {
    "medumba": "Ngàfən",
    "french": "Heurter",
    "english": "Hit"
  },
  {
    "medumba": "Nə̀ faꞌtə",
    "french": "Heurter",
    "english": "Hit"
  },
  {
    "medumba": "Nkòg",
    "french": "Hier",
    "english": "Yesterday"
  },
  {
    "medumba": "Ngα̂mcɔ̀",
    "french": "Histoire",
    "english": "History"
  },
  {
    "medumba": "Cɔ̀",
    "french": "Histoire",
    "english": "History"
  },
  {
    "medumba": "Mαndùm",
    "french": "Homme",
    "english": "Man"
  },
  {
    "medumba": "Mə̀nntʉ̀n",
    "french": "Homme",
    "english": "Man"
  },
  {
    "medumba": "Mɛ̀nnyǎŋtu",
    "french": "Homme",
    "english": "Man"
  },
  {
    "medumba": "Ngabâmntʉ",
    "french": "Homme de foi",
    "english": "Man of faith"
  },
  {
    "medumba": "Mɛ̀nnənʉnə",
    "french": "Homme juste",
    "english": "righteous man"
  },
  {
    "medumba": "Mɛ̀nnə̀tsinə",
    "french": "Homme juste",
    "english": "righteous man"
  },
  {
    "medumba": "Nkùꞌnì",
    "french": "Honneur",
    "english": "Honor"
  },
  {
    "medumba": "Jûnkùꞌnì",
    "french": "Honorable",
    "english": "Honorable"
  },
  {
    "medumba": "Mɛ̀nnkùni",
    "french": "Honorable",
    "english": "Honorable"
  },
  {
    "medumba": "Tûswə",
    "french": "Honte",
    "english": "Shame"
  },
  {
    "medumba": "Ngàtûswə",
    "french": "Honte (qui a)",
    "english": "Shame (who has)"
  },
  {
    "medumba": "Nǔtûswə",
    "french": "Honteux",
    "english": "Shameful"
  },
  {
    "medumba": "Ndα̂ghòn",
    "french": "Hôpital",
    "english": "Hospital"
  },
  {
    "medumba": "Logtὰ",
    "french": "Hôpital",
    "english": "Hospital"
  },
  {
    "medumba": "Dʉ̌ꞌghòn",
    "french": "Hôpital",
    "english": "Hospital"
  },
  {
    "medumba": "Kə̀shʉꞌ",
    "french": "Hoquet",
    "english": "Hiccups"
  },
  {
    "medumba": "Tǔnnjʉ",
    "french": "Horizon",
    "english": "Horizon"
  },
  {
    "medumba": "Kʉ̂ꞌkʉꞌ",
    "french": "Horizontal",
    "english": "Horizontal"
  },
  {
    "medumba": "Ndòꞌngʉ̀n",
    "french": "Hospitalier",
    "english": "Hospitaller"
  },
  {
    "medumba": "Ndα̂ghʉ̀n",
    "french": "Hôtel",
    "english": "Hotel"
  },
  {
    "medumba": "Mfɛd",
    "french": "Huile",
    "english": "Oil"
  },
  {
    "medumba": "Mfɛ̂dkə̀nà",
    "french": "Huile (d’arrachide",
    "english": "Oil (peanut"
  },
  {
    "medumba": "Mfɛ̂dmbǎmə̀kalə",
    "french": "Huile (de coco)",
    "english": "Oil (coconut)"
  },
  {
    "medumba": "Mə̀nyà",
    "french": "Huile (de palmiste)",
    "english": "Oil (palm kernel)"
  },
  {
    "medumba": "Nə̀ nuꞌu",
    "french": "Huiler",
    "english": "Oil"
  },
  {
    "medumba": "Cα̌bmfɛd",
    "french": "Huilerie",
    "english": "Oil mill"
  },
  {
    "medumba": "Lǒŋcὰb",
    "french": "Huilerie",
    "english": "Oil mill"
  },
  {
    "medumba": "Fomə",
    "french": "Huit",
    "english": "Eight"
  },
  {
    "medumba": "Mbadtə fomə",
    "french": "Huitième",
    "english": "Eighth"
  },
  {
    "medumba": "Ngàfαwudnsi",
    "french": "Humble (personne)",
    "english": "Humble (person)"
  },
  {
    "medumba": "Nə̀ kǒg mɛ̀n",
    "french": "Humilier",
    "english": "Humiliate"
  },
  {
    "medumba": "Nə̀ fα wud nsi",
    "french": "Humilier (sꞌ)",
    "english": "Humiliate (sꞌ)"
  },
  {
    "medumba": "Nə̀fαwud nsi",
    "french": "Humilite̍",
    "english": "Humility"
  },
  {
    "medumba": "Yὰkintɔ̀",
    "french": "Hyacinthe",
    "english": "Hyacinth"
  },
  {
    "medumba": "Ŋàŋomə",
    "french": "Hyène",
    "english": "Hyena"
  },
  {
    "medumba": "Ced",
    "french": "Hygiène",
    "english": "Hygiene"
  },
  {
    "medumba": "Kwibʉ̌ꞌ",
    "french": "Hymne",
    "english": "Anthem"
  },
  {
    "medumba": "kwǐnkuni",
    "french": "Hymne",
    "english": "Anthem"
  },
  {
    "medumba": "Kwingô",
    "french": "Hymne national",
    "english": "National anthem"
  },
  {
    "medumba": "Mfum",
    "french": "Hypocrisie",
    "english": "Hypocrisy"
  },
  {
    "medumba": "Ngamfʉm",
    "french": "Hypocrite",
    "english": "Hypocrite"
  },
  {
    "medumba": "Nsə̌nnî",
    "french": "Ici",
    "english": "Here"
  },
  {
    "medumba": "Cən",
    "french": "Idiot",
    "english": "Idiot"
  },
  {
    "medumba": "Mbuꞌtu",
    "french": "Idiot",
    "english": "Idiot"
  },
  {
    "medumba": "Fə̀mnì",
    "french": "Idiotie",
    "english": "Idiocy"
  },
  {
    "medumba": "Nsînəto",
    "french": "Idôle",
    "english": "Idol"
  },
  {
    "medumba": "Ngàbamnsînəto(1/6",
    "french": "Idolâtre",
    "english": "Idolater"
  },
  {
    "medumba": "Bəꞌ",
    "french": "Igname",
    "english": "Yam"
  },
  {
    "medumba": "Ntsə̂ntsə",
    "french": "Igname jaune",
    "english": "Yellow yam"
  },
  {
    "medumba": "Nkὰgnì",
    "french": "Ignorant",
    "english": "Ignorant"
  },
  {
    "medumba": "A",
    "french": "Il/ elle",
    "english": "He/she"
  },
  {
    "medumba": "Bo",
    "french": "Ils / elles (eux)",
    "english": "They/them"
  },
  {
    "medumba": "Boαbo",
    "french": "Ils/ elles ( lui et eux)",
    "english": "They (him and them)"
  },
  {
    "medumba": "Ndiàŋkadcaꞌa",
    "french": "Ile",
    "english": "Island"
  },
  {
    "medumba": "Ngɔ̌tɛ̀dntsə",
    "french": "Ile",
    "english": "Island"
  },
  {
    "medumba": "Caꞌtɛ̀dntsə",
    "french": "Ile",
    "english": "Island"
  },
  {
    "medumba": "Mfuni",
    "french": "Image",
    "english": "Picture"
  },
  {
    "medumba": "Nəto",
    "french": "Image",
    "english": "Picture"
  },
  {
    "medumba": "Fiꞌtə̀",
    "french": "Imitation",
    "english": "Imitation"
  },
  {
    "medumba": "Nə̀ fiꞌtə̌",
    "french": "Imiter",
    "english": "Imitate"
  },
  {
    "medumba": "Kə̀tàg",
    "french": "Immanquablement",
    "english": "Inevitably"
  },
  {
    "medumba": "Tαkə̀tàg",
    "french": "Immanquablement",
    "english": "Inevitably"
  },
  {
    "medumba": "Kə̀kondɛ̀n",
    "french": "Impitoyable",
    "english": "Merciless"
  },
  {
    "medumba": "Kə̀zəwʉ",
    "french": "Impitoiyable",
    "english": "Merciless"
  },
  {
    "medumba": "Ngàlɛ̌dncù",
    "french": "Impoli",
    "english": "Rude"
  },
  {
    "medumba": "Kə̀nkùꞌnì",
    "french": "Impoli",
    "english": "Rude"
  },
  {
    "medumba": "Lɛ̀dncù",
    "french": "Impolitesse",
    "english": "Rudeness"
  },
  {
    "medumba": "Ncùb",
    "french": "Impot",
    "english": "Tax"
  },
  {
    "medumba": "Nùkə̀kà",
    "french": "Impre̍visible",
    "english": "Unpredictable"
  },
  {
    "medumba": "Sə̀ꞌkekaꞌ",
    "french": "Impre̍visible",
    "english": "Unpredictable"
  },
  {
    "medumba": "Sə̀ꞌkə̀zə",
    "french": "Impre̍vu",
    "english": "Unexpected"
  },
  {
    "medumba": "Nǔmɛ̀nwα",
    "french": "Impre̍vu",
    "english": "Unexpected"
  },
  {
    "medumba": "kə̀lαn",
    "french": "Impure",
    "english": "Impure"
  },
  {
    "medumba": "Ŋuꞌu",
    "french": "Impurete̍",
    "english": "Impurity"
  },
  {
    "medumba": "Nǔŋuꞌu",
    "french": "Impurete̍",
    "english": "Impurity"
  },
  {
    "medumba": "Ncwɛ̀d",
    "french": "Inapte (en danse)",
    "english": "Unfit (in dancing)"
  },
  {
    "medumba": "Nə̀ totə",
    "french": "Inaugurer",
    "english": "Inaugurate"
  },
  {
    "medumba": "Nə̀ coꞌo",
    "french": "Inaugurer",
    "english": "Inaugurate"
  },
  {
    "medumba": "Nə̀ kwiagə",
    "french": "Inaugurer (e̍difice)",
    "english": "Inaugurate (building)"
  },
  {
    "medumba": "Kə̀tà",
    "french": "Incapable",
    "english": "Unable"
  },
  {
    "medumba": "Kə̀kùꞌni",
    "french": "Incapable",
    "english": "Unable"
  },
  {
    "medumba": "Bìtò",
    "french": "Incident",
    "english": "Incident"
  },
  {
    "medumba": "Ngə̀ꞌ",
    "french": "Incident",
    "english": "Incident"
  },
  {
    "medumba": "Nùkə̀zə",
    "french": "Incident",
    "english": "Incident"
  },
  {
    "medumba": "Nə̀ to bìtò",
    "french": "Incident(avoir un)",
    "english": "Incident (have one)"
  },
  {
    "medumba": "Mɛ̀nwα",
    "french": "Inconnu",
    "english": "Unknown"
  },
  {
    "medumba": "Mǒꞌmɛ̀n",
    "french": "Inconnu",
    "english": "Unknown"
  },
  {
    "medumba": "Jûkə̀lɛ̀n",
    "french": "Inconnu (chose)",
    "english": "Unknown (thing)"
  },
  {
    "medumba": "Dìbὰ",
    "french": "Inde̍pendance",
    "english": "Independence"
  },
  {
    "medumba": "Nəbəyûtu",
    "french": "Inde̍pendant",
    "english": "Independent"
  },
  {
    "medumba": "Nə̀tʉꞌyûtu",
    "french": "Inde̍pendant",
    "english": "Independent"
  },
  {
    "medumba": "Ndâdnyaꞌ",
    "french": "Index (doigt)",
    "english": "Index (finger)"
  },
  {
    "medumba": "Ndâdsogə",
    "french": "Index (doigt)",
    "english": "Index (finger)"
  },
  {
    "medumba": "Kə̀jumbu",
    "french": "Indigent",
    "english": "Destitute"
  },
  {
    "medumba": "Mbûndaŋsə",
    "french": "Indigent",
    "english": "Destitute"
  },
  {
    "medumba": "Ngàyəngəꞌ",
    "french": "Indigent",
    "english": "Destitute"
  },
  {
    "medumba": "Nə̀ beꞌtəꞌ",
    "french": "Indiquer",
    "english": "Indicate"
  },
  {
    "medumba": "Nə̀ làꞌtə̌",
    "french": "Indiquer",
    "english": "Indicate"
  },
  {
    "medumba": "Mǒꞌmɛ̀n",
    "french": "Individu",
    "english": "Individual"
  },
  {
    "medumba": "Kôndɛ̀n",
    "french": "Indulgence",
    "english": "Indulgence"
  },
  {
    "medumba": "Bwɔ̌ntʉ",
    "french": "Indulgence",
    "english": "Indulgence"
  },
  {
    "medumba": "Ngàkondɛ̀n)",
    "french": "Indulgent",
    "english": "Forgiving"
  },
  {
    "medumba": "Ngàbwɔ̌ntʉ",
    "french": "Indulgent",
    "english": "Forgiving"
  },
  {
    "medumba": "Nùkə̀tǒꞌcob",
    "french": "Ine̍dit",
    "english": "Unpublished"
  },
  {
    "medumba": "Nùkə̀tǒꞌjuꞌ",
    "french": "Ine̍dit",
    "english": "Unpublished"
  },
  {
    "medumba": "Kad",
    "french": "Infide̍lite̍",
    "english": "Unfaithful"
  },
  {
    "medumba": "Bamkə̀ghʉ̀",
    "french": "Infide̍lite̍",
    "english": "Unfaithful"
  },
  {
    "medumba": "Nkə̀ꞌkɛ̀d",
    "french": "Infirme",
    "english": "Crippled"
  },
  {
    "medumba": "Lòꞌ",
    "french": "Infirmite̍",
    "english": "Disability"
  },
  {
    "medumba": "Nə̀ beꞌtə",
    "french": "Informer",
    "english": "Inform"
  },
  {
    "medumba": "Nə̀ soŋə",
    "french": "Informer",
    "english": "Inform"
  },
  {
    "medumba": "Nə̀ tətə",
    "french": "Informer",
    "english": "Inform"
  },
  {
    "medumba": "Nùkə̀tsin",
    "french": "Iniquite̍",
    "english": "Inequity"
  },
  {
    "medumba": "Nə̀ cǎbncù",
    "french": "Injurier",
    "english": "Insult"
  },
  {
    "medumba": "Ntsəndunnə",
    "french": "Inondation",
    "english": "Flood"
  },
  {
    "medumba": "Nə̀ dunə",
    "french": "Inonder",
    "english": "Flood"
  },
  {
    "medumba": "Nə̀ lǎbwud",
    "french": "Inquie̍ter (sꞌ)",
    "english": "To worry (to worry)"
  },
  {
    "medumba": "Nə̀ lǎbwud",
    "french": "Insense̍",
    "english": "Insense"
  },
  {
    "medumba": "Kə̀lɛ̌nnù",
    "french": "Insense̍",
    "english": "Insense"
  },
  {
    "medumba": "Mfʉ̀mwuli",
    "french": "Insense̍",
    "english": "Insense"
  },
  {
    "medumba": "Nkαgnì",
    "french": "Insense̍",
    "english": "Insense"
  },
  {
    "medumba": "Kə̀kondɛ̀n",
    "french": "Insensibilite̍",
    "english": "Insensitivity"
  },
  {
    "medumba": "Kə̀lɛ̌nngəꞌ",
    "french": "Insensible",
    "english": "Insensitive"
  },
  {
    "medumba": "Kə̀zəvʉ",
    "french": "Insensible",
    "english": "Insensitive"
  },
  {
    "medumba": "Sαgntʉmɛ̀n",
    "french": "Insensible",
    "english": "Insensitive"
  },
  {
    "medumba": "Nə̀sǎŋlaŋə",
    "french": "Insistance",
    "english": "Insistence"
  },
  {
    "medumba": "Nə̀tswèꞌtə̌",
    "french": "Insistance",
    "english": "Insistence"
  },
  {
    "medumba": "Nə̀ sǎŋ laŋə",
    "french": "Insister",
    "english": "Insist"
  },
  {
    "medumba": "Nə̀ tswə̀ꞌtə̌",
    "french": "Insister",
    "english": "Insist"
  },
  {
    "medumba": "Cὰbncù",
    "french": "Insulte",
    "english": "Insult"
  },
  {
    "medumba": "Cαbtə̀",
    "french": "Insulte",
    "english": "Insult"
  },
  {
    "medumba": "Nə̀ cα̌bncù",
    "french": "Insulter",
    "english": "Insult"
  },
  {
    "medumba": "Nə̀ cὰbtə̌",
    "french": "Insulter",
    "english": "Insult"
  },
  {
    "medumba": "Zenù",
    "french": "Intelligence",
    "english": "Intelligence"
  },
  {
    "medumba": "Ngàzə̂nù",
    "french": "Intelligent",
    "english": "Smart"
  },
  {
    "medumba": "Nzə̂nù",
    "french": "Intelligent",
    "english": "Smart"
  },
  {
    "medumba": "Nkwàtə̀",
    "french": "Intension",
    "english": "Intension"
  },
  {
    "medumba": "Nə̀ bǎb nə̀",
    "french": "Intension de (avoir)",
    "english": "Intention to (have)"
  },
  {
    "medumba": "Nə̀ zin kamə",
    "french": "Intercéder",
    "english": "Intercede"
  },
  {
    "medumba": "Nèzinkamə (",
    "french": "Intercession",
    "english": "Intercession"
  },
  {
    "medumba": "kὰn",
    "french": "Interdiction",
    "english": "Ban"
  },
  {
    "medumba": "Nə̀ cʉ̀ꞌʉ",
    "french": "Interdire",
    "english": "Ban"
  },
  {
    "medumba": "Nə̀ yab kὰn",
    "french": "Interdire",
    "english": "Ban"
  },
  {
    "medumba": "Bìn",
    "french": "Intérêt",
    "english": "Interest"
  },
  {
    "medumba": "Jûmə̀bwɔ",
    "french": "Intéressant",
    "english": "Interesting"
  },
  {
    "medumba": "Jûtsiàntə̀",
    "french": "Intéressant",
    "english": "Interesting"
  },
  {
    "medumba": "Nə̀ bwɔ̌",
    "french": "Intéresser",
    "english": "Interest"
  },
  {
    "medumba": "Nə̀bàgtə̌",
    "french": "Interprétation",
    "english": "Interpretation"
  },
  {
    "medumba": "Ngàbàgtə̀",
    "french": "Interprète",
    "english": "Interpreter"
  },
  {
    "medumba": "Mbaꞌsaꞌ",
    "french": "Interprète",
    "english": "Interpreter"
  },
  {
    "medumba": "Bɛdtə̀",
    "french": "Interrogation",
    "english": "Questioning"
  },
  {
    "medumba": "Nə̀ bɛdtə̀",
    "french": "Interroger",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ tɔtə̌",
    "french": "Interroger",
    "english": "Ask"
  },
  {
    "medumba": "Nə̀ zwəꞌtə",
    "french": "Interroger",
    "english": "Ask"
  },
  {
    "medumba": "Nto",
    "french": "Intestin",
    "english": "Intestine"
  },
  {
    "medumba": "Kɔ̂ntʉ",
    "french": "Intime",
    "english": "Intimate"
  },
  {
    "medumba": "Bwèꞌtə",
    "french": "Intimidation",
    "english": "Bullying"
  },
  {
    "medumba": "Bwog",
    "french": "Intimidation",
    "english": "Bullying"
  },
  {
    "medumba": "Fedtə̀",
    "french": "Intimidation",
    "english": "Bullying"
  },
  {
    "medumba": "Nyùꞌte",
    "french": "Intimidation",
    "english": "Bullying"
  },
  {
    "medumba": "Nə̀ bwə̀ꞌtə̌",
    "french": "Intimider",
    "english": "Intimidate"
  },
  {
    "medumba": "Nə̀ fedtə",
    "french": "Intimider",
    "english": "Intimidate"
  },
  {
    "medumba": "Nə̀ kα̌g bwog",
    "french": "Intimider",
    "english": "Intimidate"
  },
  {
    "medumba": "Nə̀ mǎꞌ nyùꞌ",
    "french": "Intimider",
    "english": "Intimidate"
  },
  {
    "medumba": "Mvαn",
    "french": "Intrus",
    "english": "Intruder"
  },
  {
    "medumba": "Kə̀bìd",
    "french": "Irréprochable",
    "english": "Impeccable"
  },
  {
    "medumba": "Kə̀loꞌ",
    "french": "Irréprochable",
    "english": "Impeccable"
  },
  {
    "medumba": "Kə̀mbɛ̀n",
    "french": "Irréprochable",
    "english": "Impeccable"
  },
  {
    "medumba": "Kə̀ŋuꞌu",
    "french": "Irréprochable",
    "english": "Impeccable"
  },
  {
    "medumba": "Yântʉ",
    "french": "Irritation",
    "english": "Irritation"
  },
  {
    "medumba": "Nə̀ loꞌtəntʉ",
    "french": "Irriter",
    "english": "Irritate"
  },
  {
    "medumba": "Nə̀ yantʉ",
    "french": "Irriter (sꞌ)",
    "english": "Irritate (sꞌ)"
  },
  {
    "medumba": "Sɔ̌nsənyὰm",
    "french": "Ivoire",
    "english": "Ivory"
  },
  {
    "medumba": "Mbûmndùꞌ",
    "french": "Ivrogne",
    "english": "Drunk"
  },
  {
    "medumba": "Ngàbumndùꞌ",
    "french": "Ivrogne",
    "english": "Drunk"
  },
  {
    "medumba": "Ngànundùꞌ",
    "french": "Ivrogne",
    "english": "Drunk"
  },
  {
    "medumba": "Nə̀bûmndùꞌ",
    "french": "Ivrognerie",
    "english": "Drunkenness"
  },
  {
    "medumba": "Nə̀ lα̌n mɛ̀n",
    "french": "Jalouser",
    "english": "Jealousy"
  },
  {
    "medumba": "Lὰnmɛ̀n",
    "french": "Jalousie",
    "english": "Jealousy"
  },
  {
    "medumba": "Lὰghəꞌə",
    "french": "Jalousie",
    "english": "Jealousy"
  },
  {
    "medumba": "Ngàlα̌nmɛ̀n",
    "french": "Jaloux",
    "english": "Jealous"
  },
  {
    "medumba": "Nə̀ lαghəꞌə",
    "french": "Jaloux (être)",
    "english": "Jealous (to be)"
  },
  {
    "medumba": "Kù",
    "french": "Jambe",
    "english": "Leg"
  },
  {
    "medumba": "Fʉnkù",
    "french": "Jambe (tibia)",
    "english": "Leg (shin)"
  },
  {
    "medumba": "Nə̀ lǒꞌ mfìꞌ",
    "french": "Jauger",
    "english": "Gauge"
  },
  {
    "medumba": "Bwòŋ",
    "french": "Jaune",
    "english": "Yellow"
  },
  {
    "medumba": "Nə̀ bwòŋə",
    "french": "Jaunir",
    "english": "Yellow"
  },
  {
    "medumba": "Mə̀",
    "french": "Je",
    "english": "I"
  },
  {
    "medumba": "Nə̀ màꞌa",
    "french": "Jeter",
    "english": "Throw"
  },
  {
    "medumba": "Nə̀ waꞌa",
    "french": "Jeter",
    "english": "Throw"
  },
  {
    "medumba": "Sa",
    "french": "Jeu",
    "english": "Game"
  },
  {
    "medumba": "Nə̀ tswə nzìkuꞌu",
    "french": "Jeuner",
    "english": "Fast"
  },
  {
    "medumba": "Ngə̀laŋ nə̀tswənzikuꞌu",
    "french": "Jeun",
    "english": "Young"
  },
  {
    "medumba": "Mɛ̂nnshùm",
    "french": "Jeune",
    "english": "Young"
  },
  {
    "medumba": "Ngwαnmɛ̀n",
    "french": "Jeune",
    "english": "Young"
  },
  {
    "medumba": "Mɛ̂nnshùm",
    "french": "Jeune (homme)",
    "english": "Young (male)"
  },
  {
    "medumba": "Nshǔmnshùm",
    "french": "Jeunes (les)",
    "english": "Young people"
  },
  {
    "medumba": "Ngə̀la:ŋnshùm",
    "french": "Jeunesse",
    "english": "Youth"
  },
  {
    "medumba": "Tsiàŋtə̀",
    "french": "Joie",
    "english": "Joy"
  },
  {
    "medumba": "Nə̀ tsiàŋtə̀",
    "french": "Joie (être en)",
    "english": "Joy (to be in)"
  },
  {
    "medumba": "Nə̀ yòŋə",
    "french": "Joindre",
    "english": "Join"
  },
  {
    "medumba": "Nə̀ tàmtə̌",
    "french": "Joindre",
    "english": "Join"
  },
  {
    "medumba": "Yoŋ",
    "french": "Joint",
    "english": "Gasket"
  },
  {
    "medumba": "Mbwɔ̀",
    "french": "Joli",
    "english": "Pretty"
  },
  {
    "medumba": "Nə̀bwɔ̌",
    "french": "Joli",
    "english": "Pretty"
  },
  {
    "medumba": "Ghəꞌ",
    "french": "Joue",
    "english": "Play"
  },
  {
    "medumba": "Dùtə̂ngəꞌ",
    "french": "Joues abattues",
    "english": "Downcast cheeks"
  },
  {
    "medumba": "Tôngəꞌ",
    "french": "Joues creuses",
    "english": "Hollow cheeks"
  },
  {
    "medumba": "Nə̀ ghʉ̌ sa",
    "french": "Jouer",
    "english": "Play"
  },
  {
    "medumba": "Mbuꞌngə̀ꞌ",
    "french": "Joufflu",
    "english": "Chubby"
  },
  {
    "medumba": "Mǔtngə̀ꞌ",
    "french": "Joufflu",
    "english": "Chubby"
  },
  {
    "medumba": "Kələꞌə",
    "french": "Joug",
    "english": "Yoke"
  },
  {
    "medumba": "Kuan",
    "french": "Joug",
    "english": "Yoke"
  },
  {
    "medumba": "Leꞌe",
    "french": "Jour",
    "english": "Day"
  },
  {
    "medumba": "Leꞌnjʉ",
    "french": "Jour",
    "english": "Day"
  },
  {
    "medumba": "Leꞌvʉ",
    "french": "Jour (de la mort)",
    "english": "Day (of death)"
  },
  {
    "medumba": "Leꞌngeꞌ",
    "french": "Jour (de malheur)",
    "english": "Day (of misfortune)"
  },
  {
    "medumba": "Leꞌnjʉ̂ndʉb",
    "french": "Jour (grand)",
    "english": "Day (big)"
  },
  {
    "medumba": "Mα̂njʉ",
    "french": "Jour (grand)",
    "english": "Day (big)"
  },
  {
    "medumba": "Leꞌngùꞌnjʉ̂nswə (5/4",
    "french": "Jour de l’an",
    "english": "New Year's Day"
  },
  {
    "medumba": "Leꞌjʉα",
    "french": "Jour ferie",
    "english": "Holiday"
  },
  {
    "medumba": "Leꞌfən",
    "french": "Jour (de bonheur)",
    "english": "Day (of happiness)"
  },
  {
    "medumba": "Leꞌbwə",
    "french": "Jour (de naissance)",
    "english": "Day (of birth)"
  },
  {
    "medumba": "Nkʉ̌nleꞌe",
    "french": "Journal",
    "english": "Newspaper"
  },
  {
    "medumba": "Nttswəꞌnjʉ̀",
    "french": "Jours (les )",
    "english": "Days (the)"
  },
  {
    "medumba": "Tswə̂tsiàŋtə̀",
    "french": "Joyeux",
    "english": "Happy"
  },
  {
    "medumba": "Ngàcoꞌtəncà",
    "french": "Juge",
    "english": "Judge"
  },
  {
    "medumba": "Ncà",
    "french": "Jugement",
    "english": "Judgment"
  },
  {
    "medumba": "Kamə",
    "french": "Jugement",
    "english": "Judgment"
  },
  {
    "medumba": "Nə̀ coꞌtə",
    "french": "Juger",
    "english": "Judge"
  },
  {
    "medumba": "Mfə",
    "french": "Jurement",
    "english": "Swear"
  },
  {
    "medumba": "Nə̀ kα̌n mfə",
    "french": "Jurer",
    "english": "Swear"
  },
  {
    "medumba": "Nə̀kuꞌu",
    "french": "Juste",
    "english": "Just"
  },
  {
    "medumba": "Nə̀tsinə",
    "french": "Juste",
    "english": "Just"
  },
  {
    "medumba": "Mɛ̀nnənʉnə",
    "french": "Juste (le)",
    "english": "Just (the)"
  },
  {
    "medumba": "Mɛ̀nnə̀tsinə",
    "french": "Juste (le)",
    "english": "Just (the)"
  },
  {
    "medumba": "Nùnə̀ntsinə",
    "french": "Justice",
    "english": "Justice"
  },
  {
    "medumba": "Mbàꞌkamə",
    "french": "Justicier",
    "english": "Vigilante"
  },
  {
    "medumba": "Ngàbǎꞌkamə",
    "french": "Justicier",
    "english": "Vigilante"
  },
  {
    "medumba": "nə̀ tsiagtənə̀ ta nù",
    "french": "Justifier",
    "english": "Justify"
  },
  {
    "medumba": "Nə̀ cob nənʉnə",
    "french": "Justifier",
    "english": "Justify"
  },
  {
    "medumba": "Mbem",
    "french": "Kaolin",
    "english": "Kaolin"
  },
  {
    "medumba": "Kwʉncàŋ",
    "french": "Kamikaze",
    "english": "Kamikaze"
  },
  {
    "medumba": "Nkə",
    "french": "Karaté̍",
    "english": "Karate"
  },
  {
    "medumba": "Cə̀",
    "french": "Képi",
    "english": "Kepi"
  },
  {
    "medumba": "Ntsəmbwognkà",
    "french": "Kérosène",
    "english": "Kerosene"
  },
  {
    "medumba": "Kilò",
    "french": "Kilogramme",
    "english": "Kilogram"
  },
  {
    "medumba": "Laŋnzə̀",
    "french": "Kilomètre",
    "english": "Kilometer"
  },
  {
    "medumba": "Kilɔ̀metὰ",
    "french": "Kilomètre",
    "english": "Kilometer"
  },
  {
    "medumba": "Mətὰncâꞌmbʉm",
    "french": "Kilomètre",
    "english": "Kilometer"
  },
  {
    "medumba": "Nzwə̂nkɔ",
    "french": "Kimono",
    "english": "Kimono"
  },
  {
    "medumba": "Ndɔ",
    "french": "Klaxon",
    "english": "Horn"
  },
  {
    "medumba": "Nə̀ tɔ ndɔ",
    "french": "Klaxonner",
    "english": "Honk"
  },
  {
    "medumba": "Ngàghumtə̀",
    "french": "Kleptomane",
    "english": "Kleptomaniac"
  },
  {
    "medumba": "Nə̀ ghumtə",
    "french": "Kleptomanie",
    "english": "Kleptomania"
  },
  {
    "medumba": "Bwə",
    "french": "Kola",
    "english": "Kola"
  },
  {
    "medumba": "Tʉbwə",
    "french": "Kolatier",
    "english": "Kolatier"
  },
  {
    "medumba": "Nə̀dʉꞌnα",
    "french": "Labour",
    "english": "Plowing"
  },
  {
    "medumba": "Ngə̀laŋŋèdʉꞌnα",
    "french": "Labour (periode)",
    "english": "Plowing (period)"
  },
  {
    "medumba": "Nə̀ dʉꞌnα",
    "french": "Labourer",
    "english": "Plow"
  },
  {
    "medumba": "Ngàdʉꞌnα",
    "french": "Laboureur",
    "english": "Plowman"
  },
  {
    "medumba": "Ndʉ̂ꞌnὰ",
    "french": "Laboureur",
    "english": "Plowman"
  },
  {
    "medumba": "Diàŋkadntsə",
    "french": "Lac",
    "english": "Lake"
  },
  {
    "medumba": "Kə̀tûntsə",
    "french": "Lac",
    "english": "Lake"
  },
  {
    "medumba": "Mὰlαlα",
    "french": "Là bas",
    "english": "There"
  },
  {
    "medumba": "Mbwôgtùn",
    "french": "Lâche",
    "english": "Coward"
  },
  {
    "medumba": "Nə̀ naŋə",
    "french": "Lâcher",
    "english": "Let go"
  },
  {
    "medumba": "Nə̀ kὰgə",
    "french": "Lâcher",
    "english": "Let go"
  },
  {
    "medumba": "Bwog",
    "french": "Lâchete̍",
    "english": "Cowardice"
  },
  {
    "medumba": "Nyǎŋnjùmbwə",
    "french": "Laine",
    "english": "Wool"
  },
  {
    "medumba": "Bʉn",
    "french": "Lait",
    "english": "Milk"
  },
  {
    "medumba": "Nə̀kwàꞌa",
    "french": "Lamentation",
    "english": "Lamentation"
  },
  {
    "medumba": "Nə̀ kwaꞌa",
    "french": "Lamenter",
    "english": "Lament"
  },
  {
    "medumba": "Nə̀ lὰnə",
    "french": "Lamenter",
    "english": "Lament"
  },
  {
    "medumba": "Lαmbò",
    "french": "Lampe",
    "english": "Lamp"
  },
  {
    "medumba": "Kɔ",
    "french": "Lance",
    "english": "Lance"
  },
  {
    "medumba": "Nə̀ màꞌa᷆",
    "french": "Lancer",
    "english": "Throw"
  },
  {
    "medumba": "Nə̀ màꞌ kɔ",
    "french": "Lancer (flèche)",
    "english": "Throw (arrow)"
  },
  {
    "medumba": "Ngàmǎꞌ",
    "french": "Lanceur",
    "english": "Launcher"
  },
  {
    "medumba": "Maꞌ",
    "french": "Lanceur",
    "english": "Launcher"
  },
  {
    "medumba": "Lem",
    "french": "Langue",
    "english": "Language"
  },
  {
    "medumba": "Ncobe",
    "french": "Langue",
    "english": "Language"
  },
  {
    "medumba": "Nə̀ bolə",
    "french": "Languir",
    "english": "Languish"
  },
  {
    "medumba": "Nə̀bolə",
    "french": "Languirssant",
    "english": "Languishing"
  },
  {
    "medumba": "Nkɔ̌ca",
    "french": "Lanière de bambou",
    "english": "Bamboo strip"
  },
  {
    "medumba": "Nàghuꞌu",
    "french": "Large",
    "english": "Large"
  },
  {
    "medumba": "Nə̀zi",
    "french": "Large",
    "english": "Large"
  },
  {
    "medumba": "Nə̀tɛdntsə",
    "french": "Large (le)",
    "english": "Wide (the)"
  },
  {
    "medumba": "Nə̀ kʉ̌",
    "french": "Large (prandre le)",
    "english": "Wide (take it)"
  },
  {
    "medumba": "Ntsə̌nyα",
    "french": "Larme",
    "english": "Tear"
  },
  {
    "medumba": "Caꞌnkwa",
    "french": "Late̍rie",
    "english": "Laterie"
  },
  {
    "medumba": "Cǒꞌnguꞌu",
    "french": "Laurier",
    "english": "Laurel"
  },
  {
    "medumba": "Fə̌ꞌntsə",
    "french": "Lavabo",
    "english": "Sink"
  },
  {
    "medumba": "Fə̀ꞌsògwud",
    "french": "Lavabo",
    "english": "Sink"
  },
  {
    "medumba": "Nə̀ sogə",
    "french": "Laver",
    "english": "Wash"
  },
  {
    "medumba": "Ngàsòg",
    "french": "Laveur",
    "english": "Washer"
  },
  {
    "medumba": "Tâmcɛd̈",
    "french": "Lawn tennis",
    "english": "Lawn tennis"
  },
  {
    "medumba": "Ngàsiaŋ",
    "french": "Lecteur",
    "english": "Reader"
  },
  {
    "medumba": "Junəsiaŋə",
    "french": "Lecture",
    "english": "Reading"
  },
  {
    "medumba": "Nə̀fʉàgə",
    "french": "Le̍gèrete̍",
    "english": "Lightness"
  },
  {
    "medumba": "Fùagə",
    "french": "Le̍ger",
    "english": "Light"
  }
];
