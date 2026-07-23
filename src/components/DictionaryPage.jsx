import { useState, useMemo, useRef, useEffect } from 'react';
import { DICTIONARY } from '../data/medumbaDictionary';
import { MEDUMBA_EXPRESSIONS } from '../data/medumbaExpressions';
import { playPhraseAudio } from '../utils/syllableAudio';
import { hasRealVoice } from '../utils/medumbaAudio';

// Lancement du 26 juillet : le dictionnaire n'affiche que les entrées avec
// une vraie voix EXACTE (ni TTS de secours, ni mot "créé" en enchaînant
// plusieurs syllabes) — cf. décision réunion "less is more" / "Remove the
// created vocals for words" plutôt qu'un dictionnaire large mais peu fiable.
const EXPR_ENTRIES = MEDUMBA_EXPRESSIONS.map(e => ({ medumba: e.medumba, french: e.fr, english: e.en, isExpression: true }));

const ALL_ENTRIES = [...DICTIONARY, ...EXPR_ENTRIES].filter(e => hasRealVoice(e.medumba));
const AI_URL = 'https://medumba-ai.onrender.com/api/translate';

// Paires vérifiées (les deux formes ont une vraie voix complète) pour que
// les puces de suggestion ne mènent jamais à "aucun résultat".
const SUGGESTION_CHIPS = [
    { fr: 'Main',    en: 'Hand',  md: 'Bu' },
    { fr: 'Pied',    en: 'Foot',  md: 'Kù' },
    { fr: 'Chien',   en: 'Dog',   md: 'Mbʉ' },
    { fr: 'Enfant',  en: 'Child', md: 'Mɛn' },
    { fr: 'Rouge',   en: 'Red',   md: 'Bà' },
];

// Mots courts affichés par défaut avant que l'utilisateur ne cherche —
// une page vide au premier chargement donne une mauvaise impression.
const DEFAULT_ENTRIES = ALL_ENTRIES
    .filter(e => e.medumba && e.medumba.length <= 12 && !e.medumba.includes(' '))
    .slice(0, 24);

// Une ligne d'entrée du dictionnaire (mot + traduction + bouton écouter),
// partagée entre la liste de résultats et les mots affichés par défaut.
// `displayLang` ('french' | 'english') controls which translation shows —
// tied to the current search direction, not just the app's UI language, so
// a French search always shows French even for an English-UI user and vice
// versa.
const EntryRow = ({ entry, i, isFr, displayLang, speaking, onPlay }) => (
    <div className="dict-row" style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        padding: '0.85rem 1rem', borderBottom: '1px solid #f1f5f9',
        backgroundColor: '#fff', transition: 'background 0.15s',
        animation: `fade-up 0.25s ease-out ${Math.min(i * 0.02, 0.25)}s both`,
    }}>
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '800', fontSize: '1rem', color: '#16a34a' }}>{entry.medumba}</span>
                {entry.isExpression && (
                    <span style={{ fontSize: '0.6rem', fontWeight: '800', color: '#7c3aed', background: '#f3e8ff', borderRadius: '99px', padding: '0.1rem 0.45rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        {isFr ? 'Expression' : 'Phrase'}
                    </span>
                )}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                {displayLang === 'french' ? '🇫🇷' : '🇬🇧'} {displayLang === 'french' ? entry.french : (entry.english || entry.french)}
            </div>
        </div>
        <button onClick={() => onPlay(entry.medumba)} style={{
            background: speaking === entry.medumba ? '#dcfce7' : '#f8fafc',
            border: `2px solid ${speaking === entry.medumba ? '#22c55e' : '#e2e8f0'}`,
            borderRadius: '50%', width: '36px', height: '36px',
            cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
            {speaking === entry.medumba ? '🔊' : '🔈'}
        </button>
    </div>
);

/* ════════════════════════════════════════════════════════════════
   DictionaryPage — two completely separate tabs:
   1. 📖 Dictionnaire  (pure local search, zero AI)
   2. 🤖 Traducteur IA (AI only, zero dictionary search)
════════════════════════════════════════════════════════════════ */
const DictionaryPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';

    /* ── active tab ── */
    const [tab, setTab] = useState('dict'); // 'dict' | 'ai'

    /* ══ TAB 1 — DICTIONNAIRE ══ */
    const [query,    setQuery]    = useState('');
    // 'french' | 'english' | 'medumba' — both non-Medumba languages are
    // always available, independent of the app's own UI language, so a
    // French-speaking user can still look up in English and vice versa.
    const [lang,     setLang]     = useState('french');
    const [speaking, setSpeaking] = useState(null);

    // For the reverse (Medumba -> native language) direction, "native
    // language" follows the app's own UI language (isFr).
    const nativeKey = isFr ? 'french' : 'english';
    // Which translation to actually display for the current search
    // direction (independent of nativeKey when searching French/English
    // directly).
    const displayLang = lang === 'english' ? 'english' : lang === 'french' ? 'french' : nativeKey;

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const key = lang === 'medumba' ? 'medumba' : lang === 'english' ? 'english' : 'french';
        const val = (e) => (e[key] || e.french || '');
        const rank = (w) => {
            const lw = w.toLowerCase();
            if (lw === q)         return 0;
            if (lw.startsWith(q)) return 1;
            return 2;
        };
        return ALL_ENTRIES
            .filter(e => val(e).toLowerCase().includes(q))
            .sort((a, b) => {
                const d = rank(val(a)) - rank(val(b));
                return d !== 0 ? d : val(a).localeCompare(val(b));
            })
            .slice(0, 80);
    }, [query, lang]);

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'fr-FR'; u.rate = 0.8;
        u.onstart = () => setSpeaking(text);
        u.onend   = () => setSpeaking(null);
        u.onerror = () => setSpeaking(null);
        window.speechSynthesis.speak(u);
    };

    // Joue un mot Medumba avec les vrais enregistrements de syllabes.
    // Aucun repli TTS : toutes les entrées affichées ont déjà une couverture
    // vocale complète garantie par le filtre sur ALL_ENTRIES ci-dessus.
    const audioRef = useRef(null);
    const playEntry = (medumba) => {
        setSpeaking(medumba);
        playPhraseAudio(audioRef, medumba, { onEnd: () => setSpeaking(null) });
    };

    useEffect(() => () => {
        window.speechSynthesis?.cancel();
        audioRef.current?.pause();
    }, []);

    /* ══ TAB 2 — TRADUCTEUR IA ══ */
    const [aiInput,   setAiInput]   = useState('');
    const [aiDir,     setAiDir]     = useState('fr-md');
    const [aiResult,  setAiResult]  = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError,   setAiError]   = useState(null);
    const [copied,    setCopied]    = useState(false);

    const translate = async () => {
        if (!aiInput.trim()) return;
        setAiLoading(true);
        setAiResult(null);
        setAiError(null);
        try {
            const res  = await fetch(AI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: aiInput.trim(), direction: aiDir, useLlm: true, maxSuggestions: 5 }),
            });
            const data = await res.json();
            setAiResult(data);
        } catch {
            setAiError(isFr ? 'Erreur de connexion à l\'IA' : 'Could not connect to AI');
        } finally {
            setAiLoading(false);
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    /* ════════════════════════════════════════════════════════════ */
    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes fade-up { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin    { to   { transform: rotate(360deg); } }
                .dict-row:hover    { background: #f0fdf4 !important; }
            `}</style>

            {/* ── Header ── */}
            <div style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)', padding: '1.1rem 1.5rem 0', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? '4 516 entrées · Mots & Expressions' : '4,516 entries · Words & Expressions'}
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900' }}>
                            {tab === 'dict' ? '📖' : '🤖'}{' '}
                            {tab === 'dict'
                                ? (isFr ? 'Dictionnaire Medumba' : 'Medumba Dictionary')
                                : (isFr ? 'Traducteur IA'        : 'AI Translator')}
                        </div>
                    </div>
                </div>

                {/* ── Tab bar ── */}
                <div style={{ display: 'flex', gap: '0', borderRadius: '14px 14px 0 0', overflow: 'hidden' }}>
                    {[
                        { id: 'dict', icon: '📖', labelFr: 'Dictionnaire', labelEn: 'Dictionary' },
                        { id: 'ai',   icon: '🤖', labelFr: 'Traducteur IA', labelEn: 'AI Translator' },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            style={{
                                flex: 1, padding: '0.65rem 0.5rem', border: 'none', cursor: 'pointer',
                                fontFamily: 'inherit', fontWeight: '800', fontSize: '0.88rem',
                                background: tab === t.id ? '#fff' : 'rgba(255,255,255,0.15)',
                                color:      tab === t.id ? (t.id === 'dict' ? '#16a34a' : '#6366f1') : 'rgba(255,255,255,0.85)',
                                transition: 'all 0.15s',
                                borderBottom: tab === t.id ? 'none' : '2px solid transparent',
                            }}
                        >
                            {t.icon} {isFr ? t.labelFr : t.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                TAB 1 — DICTIONNAIRE (pure search, zero AI)
            ══════════════════════════════════════════════════════ */}
            {tab === 'dict' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                    {/* Search controls */}
                    <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1.2rem 0.7rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '14px', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '2px solid #e2e8f0' }}>
                            <span style={{ fontSize: '1rem' }}>🔍</span>
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder={
                                    lang === 'french'  ? (isFr ? 'Chercher en français…' : 'Search in French…') :
                                    lang === 'english' ? (isFr ? 'Chercher en anglais…'  : 'Search in English…') :
                                    (isFr ? 'Chercher un mot Medumba…' : 'Search a Medumba word…')
                                }
                                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', fontWeight: '600', color: '#0f172a', backgroundColor: 'transparent', fontFamily: 'inherit' }}
                                autoFocus
                            />
                            {query && (
                                <button onClick={() => setQuery('')} style={{ background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.65rem', fontWeight: '900', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.55rem', background: '#f1f5f9', borderRadius: '10px', padding: '0.2rem', flexWrap: 'wrap' }}>
                            {[
                                { id: 'english', label: '🇬🇧 ' + (isFr ? 'Anglais → Medumba' : 'English → Medumba') },
                                { id: 'french',  label: '🇫🇷 ' + (isFr ? 'Français → Medumba' : 'French → Medumba') },
                                { id: 'medumba', label: '🇨🇲 ' + (isFr ? 'Medumba → Français' : 'Medumba → English') },
                            ].map(opt => (
                                <button key={opt.id} onClick={() => { setLang(opt.id); setQuery(''); }} style={{
                                    flex: '1 1 30%', minWidth: '90px', padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                    background: lang === opt.id ? '#16a34a' : 'transparent',
                                    color:      lang === opt.id ? '#fff'    : '#64748b',
                                    fontWeight: '700', fontSize: '0.72rem', fontFamily: 'inherit', transition: 'all 0.15s',
                                }}>{opt.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Avant recherche : intro courte + mots à découvrir (jamais de page vide) */}
                    {!query && (
                        <div style={{ flex: 1, overflowY: 'auto', animation: 'fade-up 0.3s ease-out both' }}>
                            <div style={{ padding: '1.25rem 1.5rem 0.75rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.9rem' }}>
                                    {isFr
                                        ? `${ALL_ENTRIES.length} mots et expressions Medumba avec vraie voix`
                                        : `${ALL_ENTRIES.length} Medumba words and expressions with real voice`}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                                    {SUGGESTION_CHIPS.map(pair => {
                                        const w = lang === 'french' ? pair.fr : lang === 'english' ? pair.en : pair.md;
                                        return (
                                            <button key={w} onClick={() => setQuery(w)} style={{ background: '#dcfce7', border: '2px solid #bbf7d0', borderRadius: '99px', padding: '0.3rem 0.85rem', fontSize: '0.82rem', fontWeight: '700', color: '#16a34a', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                {w}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ padding: '0.6rem 1rem 0.2rem', fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {isFr ? 'Mots à découvrir' : 'Words to discover'}
                            </div>
                            {DEFAULT_ENTRIES.map((entry, i) => (
                                <EntryRow key={i} entry={entry} i={i} isFr={isFr} displayLang={displayLang} speaking={speaking} onPlay={playEntry} />
                            ))}
                        </div>
                    )}

                    {/* No results */}
                    {query && results.length === 0 && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', animation: 'fade-up 0.2s ease-out both' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔎</div>
                            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                                {isFr ? 'Aucun résultat' : 'No results found'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', textAlign: 'center' }}>
                                {isFr ? `"${query}" n'est pas dans le dictionnaire.` : `"${query}" is not in the dictionary.`}
                            </div>
                            <button
                                onClick={() => { setTab('ai'); setAiInput(query); setAiDir(lang === 'medumba' ? 'md-fr' : 'fr-md'); }}
                                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '12px', padding: '0.7rem 1.4rem', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                🤖 {isFr ? 'Essayer avec le Traducteur IA' : 'Try AI Translator'}
                            </button>
                        </div>
                    )}

                    {/* Results list */}
                    {results.length > 0 && (
                        <div style={{ flex: 1, overflowY: 'auto', animation: 'fade-up 0.2s ease-out both' }}>
                            <div style={{ padding: '0.6rem 1rem 0.2rem', fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {results.length}{results.length === 80 ? '+' : ''} {isFr ? 'résultats' : 'results'}
                            </div>
                            {results.map((entry, i) => (
                                <EntryRow key={i} entry={entry} i={i} isFr={isFr} displayLang={displayLang} speaking={speaking} onPlay={playEntry} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ══════════════════════════════════════════════════════
                TAB 2 — TRADUCTEUR IA (zero dictionary search)
            ══════════════════════════════════════════════════════ */}
            {tab === 'ai' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fade-up 0.25s ease-out both' }}>

                    {/* Info banner */}
                    <div style={{ width: '100%', maxWidth: '400px', background: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: '14px', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🤖</span>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#6366f1', marginBottom: '0.2rem' }}>
                                {isFr ? 'Traducteur IA Medumba' : 'Medumba AI Translator'}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#7c3aed', lineHeight: 1.5 }}>
                                {isFr
                                    ? 'Traduit du texte libre grâce à l\'intelligence artificielle. Pour chercher un mot précis, utilisez l\'onglet Dictionnaire.'
                                    : 'Translates free text using AI. To look up a specific word, use the Dictionary tab.'}
                            </div>
                        </div>
                    </div>

                    {/* Card */}
                    <div style={{ width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '20px', border: '2px solid #ddd6fe', boxShadow: '0 4px 24px rgba(99,102,241,0.12)', overflow: 'hidden' }}>

                        {/* Direction toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.9rem 1.1rem', gap: '0.5rem', borderBottom: '2px solid #f5f3ff', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: '800', color: aiDir === 'fr-md' ? '#fff' : 'rgba(255,255,255,0.55)', textAlign: 'center' }}>
                                🇫🇷 {isFr ? 'Français' : 'French'}
                            </span>
                            <button
                                onClick={() => { setAiDir(d => d === 'fr-md' ? 'md-fr' : 'fr-md'); setAiResult(null); setAiInput(''); }}
                                style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            >⇄</button>
                            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: '800', color: aiDir === 'md-fr' ? '#fff' : 'rgba(255,255,255,0.55)', textAlign: 'center' }}>
                                🇨🇲 Medumba
                            </span>
                        </div>

                        {/* Input */}
                        <div style={{ padding: '1rem' }}>
                            <textarea
                                value={aiInput}
                                onChange={e => { setAiInput(e.target.value); setAiResult(null); }}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); translate(); } }}
                                placeholder={aiDir === 'fr-md'
                                    ? (isFr ? 'Entrez du texte français…' : 'Enter French text…')
                                    : (isFr ? 'Entrez du texte Medumba…' : 'Enter Medumba text…')}
                                rows={4}
                                style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '0.7rem 0.85rem', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'none', outline: 'none', color: '#0f172a', boxSizing: 'border-box', lineHeight: 1.6 }}
                            />
                            <button
                                onClick={translate}
                                disabled={aiLoading || !aiInput.trim()}
                                style={{
                                    marginTop: '0.65rem', width: '100%',
                                    background: aiLoading || !aiInput.trim() ? '#e2e8f0' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: aiLoading || !aiInput.trim() ? '#94a3b8' : '#fff',
                                    border: 'none', borderRadius: '12px', padding: '0.75rem',
                                    fontWeight: '800', fontSize: '0.95rem', cursor: aiLoading || !aiInput.trim() ? 'default' : 'pointer',
                                    fontFamily: 'inherit', transition: 'all 0.15s',
                                }}
                            >
                                {aiLoading
                                    ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                        <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                                        {isFr ? 'Traduction en cours…' : 'Translating…'}
                                      </span>
                                    : (isFr ? '🤖 Traduire' : '🤖 Translate')}
                            </button>
                        </div>

                        {/* Error */}
                        {aiError && (
                            <div style={{ margin: '0 1rem 1rem', padding: '0.65rem', background: '#fef2f2', borderRadius: '10px', fontSize: '0.82rem', color: '#dc2626', fontWeight: '600' }}>
                                ⚠️ {aiError}
                            </div>
                        )}

                        {/* Result */}
                        {aiResult?.translation && (
                            <div style={{ margin: '0 1rem 1rem', padding: '1rem', background: '#f5f3ff', borderRadius: '14px', border: '1.5px solid #ddd6fe', animation: 'fade-up 0.2s ease-out both' }}>
                                <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                                    {aiDir === 'fr-md' ? '🇫🇷 → 🇨🇲' : '🇨🇲 → 🇫🇷'} {isFr ? 'Résultat' : 'Result'}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#4f46e5', lineHeight: 1.5, flex: 1 }}>
                                        {aiResult.translation}
                                    </span>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button onClick={() => speak(aiResult.translation)} style={{ background: '#ede9fe', border: '2px solid #ddd6fe', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔈</button>
                                        <button onClick={() => copyText(aiResult.translation)} style={{ background: '#ede9fe', border: '2px solid #ddd6fe', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {copied ? '✅' : '📋'}
                                        </button>
                                    </div>
                                </div>
                                {aiResult.reasoning && (
                                    <div style={{ marginTop: '0.6rem', fontSize: '0.76rem', color: '#64748b', lineHeight: 1.5 }}>
                                        💡 {aiResult.reasoning.slice(0, 140)}{aiResult.reasoning.length > 140 ? '…' : ''}
                                    </div>
                                )}
                                {aiResult.suggestions?.length > 0 && (
                                    <div style={{ marginTop: '0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                        {aiResult.suggestions.slice(0, 4).map((s, i) => (
                                            <span key={i} style={{ fontSize: '0.7rem', background: '#ede9fe', color: '#6366f1', borderRadius: '99px', padding: '0.15rem 0.55rem', fontWeight: '700' }}>
                                                {s.source} → {s.target}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Link back to dictionary */}
                    <button
                        onClick={() => setTab('dict')}
                        style={{ marginTop: '1.25rem', background: 'none', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 1.2rem', fontWeight: '700', fontSize: '0.82rem', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                        📖 {isFr ? 'Retour au Dictionnaire' : 'Back to Dictionary'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DictionaryPage;
