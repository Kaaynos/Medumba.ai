import React, { useState, useRef, useEffect } from 'react';
import { playMedumbaWord } from '../utils/medumbaAudio';
import { supabase } from '../config/supabase';

/* ══════════════════════════════════════════════════════════════════
   Video catalogue — most videos are served from YouTube (embedded).
   The videos below with no `youtube` id are served from Supabase
   Storage instead of /public/videos/ — those local files are tracked
   via Git LFS, and Vercel's build doesn't resolve LFS pointers, so
   they'd 404/serve pointer text in production.
══════════════════════════════════════════════════════════════════ */
const STORAGE_BASE = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos';
const CATEGORIES = [
    {
        id: 'intro',
        icon: '🎬', color: '#7c3aed', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)',
        labelEn: 'Introduction', labelFr: 'Introduction',
        descEn: 'Start here — Medumba basics', descFr: 'Commencez ici — bases du Medumba',
        videos: [
            { src: `${STORAGE_BASE}/intro/intro_01_salutation.mp4`,  titleFr: "Salutation (Cà'tə̀)",    titleEn: "Greeting (Cà'tə̀)",       descFr: 'Comment saluer',              descEn: 'How to greet',            thumb: '👋', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
            { src: `${STORAGE_BASE}/intro/intro_02_7jours.mp4`,      titleFr: '7 jours de la semaine', titleEn: '7 days of the week',      descFr: 'Les 7 jours en Medumba',      descEn: '7 days in Medumba',       thumb: '📅', bg: 'linear-gradient(135deg,#0891b2,#06b6d4)' },
            { src: `${STORAGE_BASE}/intro/intro_03_bagwud.mp4`,      titleFr: 'Bǎgwud',               titleEn: 'Bǎgwud',                  descFr: 'Vocabulaire culturel',        descEn: 'Cultural vocabulary',     thumb: '🏺', bg: 'linear-gradient(135deg,#d97706,#f59e0b)' },
            { src: `${STORAGE_BASE}/intro/intro_04_matin.mp4`,       titleFr: 'Le matin',              titleEn: 'The morning',             descFr: 'Expressions du matin',        descEn: 'Morning expressions',     thumb: '🌅', bg: 'linear-gradient(135deg,#f97316,#fb923c)' },
            { src: `${STORAGE_BASE}/intro/intro_05_8jours.mp4`,      titleFr: '8 jours (calendrier)',  titleEn: '8-day calendar',          descFr: 'Calendrier Medumba',          descEn: 'Medumba calendar',        thumb: '🗓️', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
            { src: `${STORAGE_BASE}/intro/intro_06_mois.mp4`,        titleFr: "Mois de l'année",       titleEn: 'Months of the year',      descFr: 'Les 12 mois en Medumba',      descEn: '12 months in Medumba',    thumb: '📆', bg: 'linear-gradient(135deg,#4f46e5,#818cf8)' },
            { src: `${STORAGE_BASE}/intro/intro_07_maison.mp4`,      titleFr: 'La maison (Tǔnndα)',    titleEn: 'The house (Tǔnndα)',       descFr: 'Vocabulaire de la maison',    descEn: 'Home vocabulary',         thumb: '🏠', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: `${STORAGE_BASE}/intro/intro_08_mots.mp4`,        titleFr: 'Les mots (Tʉntə̀)',     titleEn: 'Words (Tʉntə̀)',           descFr: 'Mots et chiffres de base',    descEn: 'Basic words & numbers',   thumb: '🔢', bg: 'linear-gradient(135deg,#dc2626,#f87171)' },
        ],
    },
    {
        id: 'niveau1',
        icon: '📗', color: '#16a34a', grad: 'linear-gradient(135deg,#16a34a,#4ade80)',
        labelEn: 'Level 1', labelFr: 'Niveau 1',
        descEn: 'Everyday conversations', descFr: 'Conversations du quotidien',
        videos: [
            { src: `${STORAGE_BASE}/niveau1/n1_04_salutation1.mp4`,  titleFr: 'Salutations 1',          titleEn: 'Greetings 1',             descFr: 'Formules de salutation',      descEn: 'Greeting formulas',       thumb: '🤝', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: `${STORAGE_BASE}/niveau1/n1_05_salutation2.mp4`,  titleFr: 'Salutations 2',          titleEn: 'Greetings 2',             descFr: 'Salutations approfondies',    descEn: 'Extended greetings',      thumb: '😊', bg: 'linear-gradient(135deg,#0891b2,#22d3ee)' },
            { src: `${STORAGE_BASE}/niveau1/n1_03_monnom.mp4`,       titleFr: "Mon nom (Mfǎ' nὰ)",      titleEn: "My name (Mfǎ' nὰ)",       descFr: 'Se présenter',                descEn: 'Introducing yourself',    thumb: '🪪', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
            { src: `${STORAGE_BASE}/niveau1/n1_01_marche1.mp4`,      titleFr: 'Au marché — partie 1',   titleEn: 'At the market — part 1',  descFr: 'Dialogue au marché',          descEn: 'Market dialogue',         thumb: '🛒', bg: 'linear-gradient(135deg,#d97706,#fbbf24)' },
            { src: `${STORAGE_BASE}/niveau1/n1_02_marche2.mp4`,      titleFr: 'Au marché — partie 2',   titleEn: 'At the market — part 2',  descFr: 'Négocier et acheter',         descEn: 'Haggling & buying',       thumb: '💰', bg: 'linear-gradient(135deg,#b45309,#f59e0b)' },
            { src: `${STORAGE_BASE}/niveau1/n1_06_demanderju.mp4`,   titleFr: 'Demander le jour',       titleEn: 'Asking the day',          descFr: 'Demander la date',            descEn: 'Asking for the date',     thumb: '❓', bg: 'linear-gradient(135deg,#0f766e,#2dd4bf)' },
            { src: `${STORAGE_BASE}/niveau1/n1_07_demander.mp4`,     titleFr: 'Demander quelque chose', titleEn: 'Asking for something',    descFr: 'Formuler une demande',        descEn: 'Making a request',        thumb: '🙏', bg: 'linear-gradient(135deg,#4f46e5,#6366f1)' },
            { src: `${STORAGE_BASE}/niveau1/n1_08_manger.mp4`,       titleFr: "Manger un repas",        titleEn: 'Eating a meal',           descFr: 'Vocabulaire des repas',       descEn: 'Meal vocabulary',         thumb: '🍽️', bg: 'linear-gradient(135deg,#dc2626,#fb7185)' },
            { src: `${STORAGE_BASE}/niveau1/n1_09_dormir.mp4`,       titleFr: 'Dormir (tswǐ wud)',      titleEn: 'Sleeping (tswǐ wud)',     descFr: 'Expressions du soir',         descEn: 'Evening expressions',     thumb: '😴', bg: 'linear-gradient(135deg,#1e3a5f,#3b82f6)' },
        ],
    },
    {
        id: 'niveau2',
        icon: '📘', color: '#0891b2', grad: 'linear-gradient(135deg,#0891b2,#22d3ee)',
        labelEn: 'Level 2', labelFr: 'Niveau 2',
        descEn: 'Advanced topics', descFr: 'Sujets avancés',
        videos: [
            { src: `${STORAGE_BASE}/niveau2/n2_01_chanson.mp4`,      titleFr: 'Chanson Medumba (Caŋ)', titleEn: 'Medumba song (Caŋ)',       descFr: 'Apprendre par la chanson',    descEn: 'Learn through song',      thumb: '🎵', bg: 'linear-gradient(135deg,#7c3aed,#c084fc)' },
            { src: `${STORAGE_BASE}/niveau2/n2_02_bonnenuit.mp4`,    titleFr: 'Bonne nuit, enfant',    titleEn: 'Goodnight, child',         descFr: 'Expressions pour enfants',    descEn: 'For children',            thumb: '🌙', bg: 'linear-gradient(135deg,#1e3a5f,#6366f1)' },
        ],
    },
    {
        id: 'dessin',
        icon: '🎨', color: '#e11d48', grad: 'linear-gradient(135deg,#e11d48,#fb7185)',
        labelEn: 'Drawings', labelFr: 'Dessins Medumba',
        descEn: 'Animated visual lessons', descFr: 'Leçons animées visuelles',
        videos: [
            { src: `${STORAGE_BASE}/dessin/dessin_01.mp4`, titleFr: 'Dessin 01', titleEn: 'Drawing 01', descFr: 'Leçon animée n°1',  descEn: 'Lesson #1',  thumb: '✏️', bg: 'linear-gradient(135deg,#e11d48,#f43f5e)' },
            { src: `${STORAGE_BASE}/dessin/dessin_02.mp4`, titleFr: 'Dessin 02', titleEn: 'Drawing 02', descFr: 'Leçon animée n°2',  descEn: 'Lesson #2',  thumb: '🖍️', bg: 'linear-gradient(135deg,#d97706,#fb923c)' },
            { src: `${STORAGE_BASE}/dessin/dessin_03.mp4`, titleFr: 'Dessin 03', titleEn: 'Drawing 03', descFr: 'Leçon animée n°3',  descEn: 'Lesson #3',  thumb: '🎨', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: `${STORAGE_BASE}/dessin/dessin_04.mp4`, titleFr: 'Dessin 04', titleEn: 'Drawing 04', descFr: 'Leçon animée n°4',  descEn: 'Lesson #4',  thumb: '🖌️', bg: 'linear-gradient(135deg,#0891b2,#22d3ee)' },
            { src: `${STORAGE_BASE}/dessin/dessin_05.mp4`, titleFr: 'Dessin 05', titleEn: 'Drawing 05', descFr: 'Leçon animée n°5',  descEn: 'Lesson #5',  thumb: '✏️', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
            { src: '/videos/dessin/dessin_06.mp4', youtube: 'avB2s12HFlY', titleFr: 'Lecture du temps',          titleEn: 'Telling Time',             descFr: 'Lire et dire l\'heure',       descEn: 'Reading & telling time',  thumb: '⏰', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
            { src: '/videos/dessin/dessin_07.mp4', youtube: 'O5eIMhubaQM', titleFr: 'Animaux de la savane',      titleEn: 'Savanna Animals',          descFr: 'Faune de la savane',          descEn: 'African savanna wildlife', thumb: '🦁', bg: 'linear-gradient(135deg,#d97706,#fb923c)' },
            { src: '/videos/dessin/dessin_08.mp4', youtube: 'wcKfYEYkGqA', titleFr: 'Les couleurs',              titleEn: 'Colors',                   descFr: 'Nommer les couleurs',         descEn: 'Naming colors',           thumb: '🌈', bg: 'linear-gradient(135deg,#dc2626,#f87171)' },
            { src: '/videos/dessin/dessin_09.mp4', youtube: 'K6bxqnMXrhg', titleFr: 'Formes géométriques',      titleEn: 'Geometric Shapes',         descFr: 'Les formes en Medumba',       descEn: 'Shapes in Medumba',       thumb: '🔷', bg: 'linear-gradient(135deg,#4f46e5,#818cf8)' },
            { src: '/videos/dessin/dessin_10.mp4', youtube: 'SZLGo44APac', titleFr: 'Animaux domestiques',      titleEn: 'Domestic Animals',         descFr: 'Les animaux de la maison',    descEn: 'Animals at home',         thumb: '🐾', bg: 'linear-gradient(135deg,#7c3aed,#c084fc)' },
            { src: '/videos/dessin/dessin_11.mp4', youtube: '2R8aIlUErfo', titleFr: 'Salutation (Dessin)',      titleEn: 'Greetings (Drawing)',      descFr: 'Saluer en Medumba',           descEn: 'Greetings in Medumba',    thumb: '🤝', bg: 'linear-gradient(135deg,#16a34a,#86efac)' },
            { src: '/videos/dessin/dessin_12.mp4', youtube: 'y7fWROWtMkY', titleFr: 'Chanson Mà we',            titleEn: 'Song Mà we',               descFr: 'Chanson traditionnelle',      descEn: 'Traditional song',        thumb: '🎵', bg: 'linear-gradient(135deg,#0891b2,#67e8f9)' },
            { src: '/videos/dessin/dessin_13.mp4', youtube: 'zMaHWxA1MPc', titleFr: 'Conte : la tortue et la panthère', titleEn: 'Tale: The Tortoise & Panther', descFr: 'Conte traditionnel Medumba', descEn: 'Traditional Medumba tale', thumb: '🐢', bg: 'linear-gradient(135deg,#b45309,#fbbf24)' },
        ],
    },
    {
        id: 'zenu',
        icon: '📖', color: '#7c3aed', grad: 'linear-gradient(135deg,#7c3aed,#c084fc)',
        labelEn: 'Zenù — Stories & Culture', labelFr: 'Zenù — Contes & Culture',
        descEn: 'Medumba heritage & oral tradition', descFr: 'Patrimoine & tradition orale Medumba',
        videos: [
            { src: '', youtube: 'vQMADuRX7Hs', titleFr: 'Zenù — Musique',                           titleEn: 'Zenù — Music',                         descFr: 'Chanson Zenù',                descEn: 'Zenù song',               thumb: '🎶', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
            { src: '', youtube: 'IdOO9KJk2Io', titleFr: 'Histoire : Kebwog nzwimfèn',               titleEn: 'Story: Kebwog nzwimfèn',               descFr: 'Conte traditionnel Medumba',  descEn: 'Traditional Medumba tale', thumb: '📜', bg: 'linear-gradient(135deg,#1e3a5f,#3b82f6)' },
            { src: '', youtube: '_W7BXXZJTgk', titleFr: 'La femme guerrière de Bangoulap',          titleEn: 'The Warrior Woman of Bangoulap',        descFr: 'Histoire héroïque Bangangté', descEn: 'Bangangté heroic history', thumb: '⚔️', bg: 'linear-gradient(135deg,#dc2626,#f87171)' },
            { src: '', youtube: 'sEvxMvx6sXs', titleFr: 'Les 8 jours de la semaine Medumba',       titleEn: 'The 8-Day Medumba Week',               descFr: 'Calendrier traditionnel',     descEn: 'Traditional calendar',    thumb: '🗓️', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
        ],
    },
];

/* ── Inline video player modal ─────────────────────────────── */
const VideoPlayer = ({ video, cat, isFr, onClose }) => {
    const [videoError, setVideoError] = useState(false);
    return (
    <div
        onClick={onClose}
        style={{
            position: 'fixed', inset: 0, zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
        }}
    >
        <div
            onClick={e => e.stopPropagation()}
            style={{
                width: '100%', maxWidth: '520px',
                backgroundColor: '#0f172a', borderRadius: '24px',
                overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
        >
            <div style={{
                padding: '1rem 1.1rem',
                background: video.bg,
                display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
                <span style={{ fontSize: '1.5rem' }}>{video.thumb}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '900', fontSize: '0.95rem', color: '#fff', lineHeight: 1.2 }}>
                        {isFr ? video.titleFr : video.titleEn}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: '2px' }}>
                        {isFr ? video.descFr : video.descEn}
                    </div>
                </div>
                <button onClick={onClose} style={{
                    background: 'rgba(0,0,0,0.3)', border: 'none',
                    borderRadius: '50%', width: '34px', height: '34px',
                    cursor: 'pointer', color: '#fff', fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>✕</button>
            </div>
            {video.youtube ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
                    title={isFr ? video.titleFr : video.titleEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '300px', display: 'block', border: 'none', backgroundColor: '#000' }}
                />
            ) : videoError ? (
                <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#0f172a' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎬</div>
                    <div style={{ color: '#94a3b8', fontWeight: '700', fontSize: '0.95rem' }}>
                        {isFr ? 'Vidéo non disponible' : 'Video not available'}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                        {isFr ? 'Le fichier sera bientôt disponible.' : 'This file will be available soon.'}
                    </div>
                </div>
            ) : (
                <video
                    src={video.src} controls autoPlay
                    onError={() => setVideoError(true)}
                    style={{ width: '100%', display: 'block', backgroundColor: '#000', maxHeight: '65vh' }}
                />
            )}
        </div>
    </div>
    );
};

/* ── Horizontal row card ───────────────────────────────────── */
const VideoCard = ({ video, index, isFr, onPlay }) => (
    <div
        onClick={onPlay}
        style={{
            flexShrink: 0, width: '150px', cursor: 'pointer',
            transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        {/* Thumbnail */}
        <div style={{
            width: '150px', height: '105px', borderRadius: '14px',
            background: video.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        }}>
            {/* Number badge */}
            <div style={{
                position: 'absolute', top: '8px', left: '8px',
                backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
                borderRadius: '8px', padding: '2px 7px',
                fontSize: '0.62rem', fontWeight: '900', color: '#fff',
                letterSpacing: '0.3px',
            }}>
                #{String(index + 1).padStart(2, '0')}
            </div>

            {/* Emoji */}
            <span style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
                {video.thumb}
            </span>

            {/* Play button overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: '8px',
            }}>
                <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
                }}>
                    <span style={{ fontSize: '0.7rem', color: '#0f172a', marginLeft: '2px' }}>▶</span>
                </div>
            </div>
        </div>

        {/* Title below card */}
        <div style={{ marginTop: '0.5rem', paddingLeft: '2px' }}>
            <div style={{
                fontWeight: '800', fontSize: '0.78rem', color: '#e2e8f0',
                lineHeight: 1.25, display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
                {isFr ? video.titleFr : video.titleEn}
            </div>
        </div>
    </div>
);

/* ── Featured hero card (first intro video) ────────────────── */
const HeroCard = ({ video, isFr, onPlay }) => (
    <div
        onClick={onPlay}
        style={{
            position: 'relative', width: '100%', height: '200px',
            borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
            background: video.bg,
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        {/* Background emoji decoration */}
        <div style={{
            position: 'absolute', right: '24px', top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '7rem', opacity: 0.25,
            filter: 'blur(2px)',
            pointerEvents: 'none',
        }}>
            {video.thumb}
        </div>

        {/* Gradient overlay */}
        <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 40%, transparent 100%)',
        }} />

        {/* Content */}
        <div style={{
            position: 'relative', zIndex: 1,
            padding: '1.5rem',
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
            <div>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    borderRadius: '99px', padding: '0.2rem 0.7rem',
                    fontSize: '0.65rem', fontWeight: '800', color: '#fff',
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                }}>
                    ⭐ {isFr ? 'À la une' : 'Featured'}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#fff', lineHeight: 1.25 }}>
                    {isFr ? video.titleFr : video.titleEn}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: '0.3rem' }}>
                    {isFr ? video.descFr : video.descEn}
                </div>
            </div>

            {/* Play button */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    backgroundColor: '#fff', color: '#0f172a',
                    borderRadius: '99px', padding: '0.55rem 1.2rem',
                    fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}>
                    ▶ {isFr ? 'Regarder' : 'Watch now'}
                </div>
            </div>
        </div>
    </div>
);

/* ══════════════════════════════════════════════════════════════════
   SHORTS DATA — TikTok-style 30-sec cards
══════════════════════════════════════════════════════════════════ */
const SHORTS = [
    { id: 'sh1', word: 'Ndà\'ndà\'', fr: 'Salut !', en: 'Hi!',               color: '#7c3aed', emoji: '👋', catFr: 'Salutations', catEn: 'Greetings',  audio: "Ndà'ndà' lα!" },
    { id: 'sh2', word: 'Mə lὰbtə̌',  fr: 'Merci',   en: 'Thank you',          color: '#0056D2', emoji: '🙏', catFr: 'Politesse',   catEn: 'Politeness', audio: 'Mə lὰbtə̌' },
    { id: 'sh3', word: 'Mbʉ',        fr: 'Chien',   en: 'Dog',                color: '#d97706', emoji: '🐕', catFr: 'Animaux',     catEn: 'Animals',    audio: 'Mbʉ' },
    { id: 'sh4', word: 'Ntsə',       fr: 'Eau',     en: 'Water',              color: '#0891b2', emoji: '💧', catFr: 'Nature',      catEn: 'Nature',     audio: 'Ntsə' },
    { id: 'sh5', word: 'Mɛn',        fr: 'Enfant',  en: 'Child',              color: '#16a34a', emoji: '👶', catFr: 'Famille',     catEn: 'Family',     audio: 'Mɛn' },
    { id: 'sh6', word: 'Nyàm',       fr: 'Soleil',  en: 'Sun',                color: '#f59e0b', emoji: '☀️', catFr: 'Nature',      catEn: 'Nature',     audio: 'Nyàm' },
    { id: 'sh7', word: 'Mbwoge',     fr: 'Feu',     en: 'Fire',               color: '#ef4444', emoji: '🔥', catFr: 'Nature',      catEn: 'Nature',     audio: 'Mbwoge' },
    { id: 'sh8', word: 'Baꞌ',        fr: 'Maison',  en: 'House',              color: '#059669', emoji: '🏠', catFr: 'Maison',      catEn: 'Home',       audio: "Baꞌ" },
    { id: 'sh9', word: 'Ngòn',       fr: 'Fille',   en: 'Girl',               color: '#e11d48', emoji: '👧', catFr: 'Famille',     catEn: 'Family',     audio: 'Ngòn' },
    { id: 'sh10', word: 'Bùsi',      fr: 'Chat',    en: 'Cat',                color: '#7c3aed', emoji: '🐱', catFr: 'Animaux',     catEn: 'Animals',    audio: 'Bùsi' },
    { id: 'sh11', word: 'Mαŋwʉ',     fr: 'Lune',    en: 'Moon',               color: '#1e3a5f', emoji: '🌙', catFr: 'Nature',      catEn: 'Nature',     audio: 'Mαŋwʉ' },
    { id: 'sh12', word: 'A fi tsə',  fr: 'Ça va bien', en: 'I am fine',       color: '#0f766e', emoji: '😊', catFr: 'Salutations', catEn: 'Greetings',  audio: 'A fi tsə.' },
];

/* ── Single TikTok short card (full-screen vertical) ── */
const ShortCard = ({ short, isFr, liked, onLike }) => {
    const [playing, setPlaying] = useState(false);

    const handleAudio = () => {
        setPlaying(true);
        playMedumbaWord(short.audio, null, () => setPlaying(false));
    };

    return (
        <div style={{
            height: '100vh', width: '100%',
            background: `linear-gradient(160deg, ${short.color}dd 0%, #0f172a 70%)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', padding: '2rem 1.5rem',
            flexShrink: 0,
            scrollSnapAlign: 'start',
        }}>
            {/* Category chip */}
            <div style={{
                position: 'absolute', top: '5rem', left: '1.25rem',
                backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                borderRadius: '99px', padding: '0.25rem 0.8rem',
                fontSize: '0.7rem', fontWeight: '800', color: '#fff',
                letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>{isFr ? short.catFr : short.catEn}</div>

            {/* Main emoji */}
            <div style={{ fontSize: '7rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}>
                {short.emoji}
            </div>

            {/* Medumba word */}
            <div style={{
                fontSize: '2.8rem', fontWeight: '900', color: '#fff',
                textAlign: 'center', lineHeight: 1.1, marginBottom: '0.5rem',
                textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>{short.word}</div>

            {/* Translation */}
            <div style={{
                fontSize: '1.2rem', fontWeight: '700',
                color: 'rgba(255,255,255,0.75)', textAlign: 'center',
                marginBottom: '2.5rem',
            }}>{isFr ? short.fr : short.en}</div>

            {/* Play button */}
            <button
                onClick={handleAudio}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    backgroundColor: playing ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderRadius: '99px', padding: '0.75rem 1.75rem',
                    color: playing ? '#0f172a' : '#fff',
                    fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.2s',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
            >
                {playing ? (isFr ? '🔊 En cours…' : '🔊 Playing…') : (isFr ? '🔊 Écouter' : '🔊 Listen')}
            </button>

            {/* Right action buttons */}
            <div style={{
                position: 'absolute', right: '1rem', bottom: '10rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center',
            }}>
                <button onClick={onLike} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                }}>
                    <span style={{ fontSize: '2rem', filter: liked ? 'none' : 'grayscale(1)', transition: 'filter 0.2s' }}>❤️</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>{liked ? '1' : '0'}</span>
                </button>
                <button
                    onClick={() => navigator.share?.({ title: `Medumba: ${short.word}`, text: `${short.word} = ${isFr ? short.fr : short.en} · ${isFr ? 'Apprends le Medumba sur Medumba.AI !' : 'Learn Medumba on Medumba.AI!'}` }).catch(() => {})}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}
                >
                    <span style={{ fontSize: '2rem' }}>📲</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>{isFr ? 'Partager' : 'Share'}</span>
                </button>
            </div>

            {/* Scroll hint */}
            <div style={{
                position: 'absolute', bottom: '2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                opacity: 0.5, animation: 'bounce 1.5s infinite',
            }}>
                <div style={{ width: '2px', height: '20px', backgroundColor: '#fff', borderRadius: '99px' }} />
                <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: '700' }}>↕ {isFr ? 'Défiler' : 'Scroll'}</span>
            </div>
        </div>
    );
};

/* ── Shorts feed ── */
const ShortsView = ({ isFr }) => {
    const [likedIds, setLikedIds] = useState(new Set());
    const feedRef = useRef(null);

    const toggleLike = (id) => setLikedIds(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    return (
        <div
            ref={feedRef}
            style={{
                height: '100vh', overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                scrollbarWidth: 'none',
            }}
        >
            <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(8px)} }`}</style>
            {SHORTS.map(short => (
                <ShortCard
                    key={short.id}
                    short={short}
                    isFr={isFr}
                    liked={likedIds.has(short.id)}
                    onLike={() => toggleLike(short.id)}
                />
            ))}
        </div>
    );
};

/* ── Transforme une ligne Supabase (snake_case) en objet attendu par les composants ── */
function mapSupabaseData(cats) {
    return cats.map(cat => ({
        id:       cat.id,
        icon:     cat.icon,
        color:    cat.color,
        grad:     cat.grad,
        labelFr:  cat.label_fr,
        labelEn:  cat.label_en,
        descFr:   cat.desc_fr,
        descEn:   cat.desc_en,
        videos: (cat.videos || [])
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(v => ({
                src:     v.src     ?? '',
                youtube: v.youtube ?? null,
                titleFr: v.title_fr,
                titleEn: v.title_en,
                descFr:  v.desc_fr,
                descEn:  v.desc_en,
                thumb:   v.thumb,
                bg:      v.bg,
            })),
    }));
}

/* ══════════════════════════════════════════════════════════════════
   VideoPage
══════════════════════════════════════════════════════════════════ */
const VideoPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [playing, setPlaying] = useState(null);
    const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'shorts'
    const [categories, setCategories] = useState(CATEGORIES);

    useEffect(() => {
        supabase
            .from('video_categories')
            .select('*, videos(*)')
            .order('sort_order')
            .then(({ data, error }) => {
                if (!error && data && data.length > 0) {
                    setCategories(mapSupabaseData(data));
                }
            });
    }, []);

    const totalVideos = categories.reduce((sum, c) => sum + c.videos.length, 0);
    const featuredVideo = categories[0]?.videos[0];

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            backgroundColor: '#0f172a',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                ::-webkit-scrollbar { display: none; }
                @keyframes fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            `}</style>

            {/* Player modal */}
            {playing && (
                <VideoPlayer
                    video={playing.video}
                    cat={playing.cat}
                    isFr={isFr}
                    onClose={() => setPlaying(null)}
                />
            )}

            {/* ── Top nav ── */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.25rem 1.25rem 0',
                position: 'sticky', top: 0, zIndex: 50,
                background: 'linear-gradient(to bottom, #0f172a 80%, transparent)',
            }}>
                <button onClick={onBack} style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50%', width: '40px', height: '40px',
                    cursor: 'pointer', fontSize: '1.1rem', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', flexShrink: 0,
                }}>←</button>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff' }}>
                        🎥 {isFr ? 'Vidéos Medumba' : 'Medumba Videos'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                        {totalVideos} {isFr ? 'vidéos · 5 collections' : 'videos · 5 collections'}
                    </div>
                </div>
            </div>

            {/* ── Tab switcher ── */}
            <div style={{
                display: 'flex', padding: '0.75rem 1.25rem 0',
                gap: '0.5rem', position: 'sticky', top: '64px', zIndex: 49,
                background: 'linear-gradient(to bottom, #0f172a 80%, transparent)',
            }}>
                {[
                    { id: 'videos', icon: '🎬', labelFr: 'Vidéos',  labelEn: 'Videos' },
                    { id: 'shorts', icon: '⚡', labelFr: 'Shorts',  labelEn: 'Shorts' },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        padding: '0.45rem 1.1rem', borderRadius: '99px',
                        backgroundColor: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.1)',
                        color: activeTab === tab.id ? '#0f172a' : 'rgba(255,255,255,0.6)',
                        border: 'none', fontWeight: '800', fontSize: '0.82rem',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                    }}>
                        {tab.icon} {isFr ? tab.labelFr : tab.labelEn}
                    </button>
                ))}
            </div>

            {/* ── Shorts view ── */}
            {activeTab === 'shorts' && <ShortsView isFr={isFr} />}

            {/* ── Videos content ── */}
            {activeTab === 'videos' && <div style={{ flex: 1, padding: '1.25rem 1.25rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Featured hero */}
                <div style={{ animation: 'fade-up 0.4s ease-out both' }}>
                    <HeroCard
                        video={featuredVideo}
                        isFr={isFr}
                        onPlay={() => setPlaying({ video: featuredVideo, cat: categories[0] })}
                    />
                </div>

                {/* Category rows */}
                {categories.map((cat, ci) => (
                    <div key={cat.id} style={{ animation: `fade-up 0.4s ease-out ${0.1 + ci * 0.08}s both` }}>
                        {/* Section header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                            <div style={{
                                width: '4px', height: '22px', borderRadius: '2px',
                                background: cat.grad,
                            }} />
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: '900', color: '#f1f5f9', lineHeight: 1.1 }}>
                                    {cat.icon} {isFr ? cat.labelFr : cat.labelEn}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
                                    {isFr ? cat.descFr : cat.descEn} · {cat.videos.length} {isFr ? 'vidéos' : 'videos'}
                                </div>
                            </div>
                        </div>

                        {/* Horizontal scroll row */}
                        <div style={{
                            display: 'flex', gap: '0.85rem',
                            overflowX: 'auto', paddingBottom: '0.5rem',
                            scrollbarWidth: 'none',
                            marginLeft: '-1.25rem', marginRight: '-1.25rem',
                            paddingLeft: '1.25rem', paddingRight: '1.25rem',
                        }}>
                            {cat.videos.map((vid, vi) => (
                                <VideoCard
                                    key={vi}
                                    video={vid}
                                    index={vi}
                                    isFr={isFr}
                                    onPlay={() => setPlaying({ video: vid, cat })}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default VideoPage;
