/**
 * certification.js
 * Unit-level certification exams, signed by CEPOM — one per unit of the
 * Medumba course. Mirrors the 5 units defined in DashboardPage's
 * `unitsMedumba`. Each exam recaps "meaning" questions pooled from every
 * lesson in the unit; passing (>= PASS_THRESHOLD) unlocks the certificate.
 */
import { LEVEL_QUESTIONS } from './medumbaDictionary';

export const PASS_THRESHOLD = 0.8; // 80%
export const EXAM_QUESTION_COUNT = 12;

export const UNIT_CERTIFICATIONS = [
    { unitId: 1, lessonIds: ['l0', 'l1', 'l2', 'l3', 'l4', 'l5'],       titleFr: 'Les Bases',           titleEn: 'Foundations' },
    { unitId: 2, lessonIds: ['l6', 'l7', 'l8'],                         titleFr: 'Personnes & Monde',   titleEn: 'People & World' },
    { unitId: 3, lessonIds: ['l9', 'l10'],                              titleFr: 'Vie Quotidienne',      titleEn: 'Daily Life' },
    { unitId: 4, lessonIds: ['l11', 'l12', 'l13', 'l14'],               titleFr: 'Société & Santé',      titleEn: 'Society & Health' },
    { unitId: 5, lessonIds: ['l15', 'l16', 'l17'],                      titleFr: 'Culture & Langue',     titleEn: 'Culture & Language' },
];

function pickRandom(pool, n) {
    return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

/** Pool every "meaning" question across the unit's lessons and sample EXAM_QUESTION_COUNT of them. */
export function buildCertExam(unitId) {
    const unit = UNIT_CERTIFICATIONS.find(u => u.unitId === unitId);
    if (!unit) return [];
    const pool = unit.lessonIds.flatMap(lid => LEVEL_QUESTIONS[lid]?.meaning ?? []);
    return pickRandom(pool, Math.min(EXAM_QUESTION_COUNT, pool.length));
}

export function getCertUnit(unitId) {
    return UNIT_CERTIFICATIONS.find(u => u.unitId === unitId) ?? null;
}
