/* ─────────────────────────────────────────────────────────────────────────────
   theoService.js — Bus d'événements THEO
   Appelé dans CHAQUE route / action importante de l'app.

   Usage :
     import { emitTheo } from '../services/theoService';
     emitTheo('lesson_complete', { lesson_id: 'l1', xp: 20 }, 'D1');

   Dimensions :
     D1 = Éducation / Apprentissage
     D2 = Santé
     D3 = Culture
     D4 = Énergie / Ingénierie
     D5 = Social / Communauté
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

let _sessionId = null;
const _queue   = [];  // file offline : si Supabase indispo, on flush au retour

function getSessionId() {
    if (!_sessionId) {
        _sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }
    return _sessionId;
}

function getPlatform() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
    if (/Android/.test(ua))           return 'android';
    return 'web';
}

/* ── emitTheo ─────────────────────────────────────────────────────────────────
   event_type : string identifiant l'action (ex: 'lesson_complete')
   payload    : objet JSON libre avec les données contextuelles
   dimension  : 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | null
──────────────────────────────────────────────────────────────────────────── */
export async function emitTheo(eventType, payload = {}, dimension = null) {
    const { data: { session } } = await supabase.auth.getSession();

    const event = {
        user_id:       session?.user?.id ?? null,
        session_id:    getSessionId(),
        event_type:    eventType,
        component:     payload.component ?? _inferComponent(eventType),
        payload:       payload,
        dimension:     dimension,
        location_type: payload.location_type ?? 'diaspora_us',
        platform:      getPlatform(),
    };

    try {
        const { error } = await supabase.from('theo_events').insert(event);
        if (error) {
            console.warn('[THEO] insert error, queuing:', error.message);
            _queue.push(event);
        }
    } catch {
        _queue.push(event);
        _scheduleFlush();
    }
}

/* ── Flush la file offline ── */
async function _flushQueue() {
    if (_queue.length === 0) return;
    const batch = [..._queue];
    _queue.length = 0;
    try {
        await supabase.from('theo_events').insert(batch);
    } catch {
        _queue.unshift(...batch); // remettre si encore offline
    }
}

let _flushTimer = null;
function _scheduleFlush() {
    if (_flushTimer) return;
    _flushTimer = setTimeout(() => { _flushTimer = null; _flushQueue(); }, 5000);
}

window.addEventListener('online', _flushQueue);

/* ── Inférer le composant depuis le type d'événement ── */
function _inferComponent(eventType) {
    if (eventType.startsWith('lesson_') || eventType.startsWith('word_') ||
        eventType.startsWith('quiz_')   || eventType.startsWith('streak_'))  return 'app';
    if (eventType.startsWith('class_') || eventType.startsWith('tutor_'))    return 'classes';
    if (eventType.startsWith('book_'))                                        return 'books';
    if (eventType.startsWith('artifact_') || eventType.startsWith('museum_')) return 'museum';
    if (eventType.startsWith('dict_'))                                        return 'dictionary';
    return 'app';
}

/* ── Événements prédéfinis (utiliser ces helpers pour cohérence) ──────────── */
export const THEO = {
    // App — Learning (D1)
    lessonStart:    (lessonId, unitId)            => emitTheo('lesson_start',    { lesson_id: lessonId, unit_id: unitId }, 'D1'),
    lessonComplete: (lessonId, xp, accuracy)      => emitTheo('lesson_complete', { lesson_id: lessonId, xp, accuracy },   'D1'),
    wordView:       (wordFr, wordMedumba, catId)  => emitTheo('word_view',       { word_fr: wordFr, word_medumba: wordMedumba, category: catId }, 'D1'),
    quizAnswer:     (correct, wordId)             => emitTheo('quiz_answer',     { correct, word_id: wordId },             'D1'),
    streakUpdate:   (streak, userId)              => emitTheo('streak_update',   { streak, user_id: userId },              'D1'),
    xpEarned:       (amount, source)              => emitTheo('xp_earned',       { amount, source },                       'D1'),

    // App — Culture (D3)
    musicPlay:      (trackId, trackName)          => emitTheo('music_play',      { track_id: trackId, name: trackName },   'D3'),
    phraseView:     (catId, phraseId)             => emitTheo('phrase_view',     { category: catId, phrase_id: phraseId }, 'D3'),

    // Dictionary (D1)
    dictSearch:     (query, resultCount)          => emitTheo('dict_search',     { query, result_count: resultCount },     'D1'),
    dictWordTap:    (wordId, wordFr)              => emitTheo('dict_word_tap',   { word_id: wordId, word_fr: wordFr },     'D1'),
    dictWordSubmit: (wordFr, domain)              => emitTheo('dict_word_submit',{ word_fr: wordFr, domain },              'D1'),

    // Museum (D3)
    artifactView:   (artifactId, title)           => emitTheo('artifact_view',   { artifact_id: artifactId, title },       'D3'),
    museumOpen:     ()                            => emitTheo('museum_open',     {},                                       'D3'),

    // Classes (D1 + D5)
    classBook:      (tutorId, slot)              => emitTheo('class_book',      { tutor_id: tutorId, slot },              'D1'),
    classComplete:  (bookingId, durationMin)     => emitTheo('class_complete',  { booking_id: bookingId, durationMin },   'D1'),

    // Navigation
    pageView:       (page)                        => emitTheo('page_view',       { page },                                 null),
    appOpen:        ()                            => emitTheo('app_open',        { platform: getPlatform() },              null),

    // Next Best Action (nextBestActionService.js) — logged so a future
    // reinforcement-learning pass has real shown/clicked outcomes to train
    // on, not just the rules-engine's own guesses.
    nbaShown:       (ruleId)                      => emitTheo('nba_shown',       { rule_id: ruleId },                      null),
    nbaClicked:     (ruleId)                      => emitTheo('nba_clicked',     { rule_id: ruleId },                      null),
};
