import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Medumba.AI — Set d'Entraînement Vocal</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    color: #0f172a;
    font-size: 11px;
    line-height: 1.5;
    background: #fff;
  }
  /* ── COVER PAGE ── */
  .cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0056D2 0%, #7c3aed 100%);
    color: white;
    text-align: center;
    padding: 60px;
    page-break-after: always;
  }
  .cover-badge {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 999px;
    padding: 6px 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .cover h1 {
    font-size: 42px;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .cover h2 {
    font-size: 22px;
    font-weight: 400;
    opacity: 0.85;
    margin-bottom: 40px;
  }
  .cover-desc {
    font-size: 14px;
    opacity: 0.8;
    max-width: 480px;
    line-height: 1.7;
    margin-bottom: 48px;
  }
  .cover-stats {
    display: flex;
    gap: 40px;
    margin-top: 8px;
  }
  .cover-stat {
    text-align: center;
  }
  .cover-stat-val {
    font-size: 36px;
    font-weight: 900;
    display: block;
  }
  .cover-stat-label {
    font-size: 11px;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .cover-footer {
    position: absolute;
    bottom: 32px;
    font-size: 10px;
    opacity: 0.6;
  }

  /* ── CONTENT ── */
  .page { padding: 36px 48px; }

  .section-header {
    background: linear-gradient(90deg, #0056D2, #7c3aed);
    color: white;
    padding: 14px 20px;
    border-radius: 12px;
    margin: 24px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-header h2 {
    font-size: 16px;
    font-weight: 800;
  }
  .section-header .badge {
    background: rgba(255,255,255,0.2);
    border-radius: 999px;
    padding: 3px 12px;
    font-size: 10px;
    font-weight: 700;
  }

  .phase-intro {
    background: #f0f7ff;
    border-left: 4px solid #0056D2;
    padding: 12px 16px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 16px;
    font-size: 11px;
    color: #1e40af;
    font-weight: 600;
  }

  .lesson-block {
    margin-bottom: 20px;
    break-inside: avoid;
  }
  .lesson-title {
    font-size: 12px;
    font-weight: 800;
    color: #0056D2;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 2px solid #e0f2fe;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 4px;
    font-size: 10.5px;
  }
  th {
    background: #f8fafc;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 9px;
    padding: 6px 10px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  td {
    padding: 6px 10px;
    border-bottom: 1px solid #f1f5f9;
  }
  tr:last-child td { border-bottom: none; }
  .num { color: #94a3b8; width: 28px; }
  .medumba {
    font-weight: 700;
    color: #0056D2;
    font-size: 12px;
    width: 40%;
  }
  .french { color: #334155; }
  .record-col {
    width: 90px;
    text-align: center;
  }
  .record-box {
    border: 1.5px solid #e2e8f0;
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 9px;
    color: #94a3b8;
    text-align: center;
    display: inline-block;
    width: 70px;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* Phase 2 — phoneme table */
  .phoneme-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  .phoneme-card {
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 12px;
    break-inside: avoid;
  }
  .phoneme-card h4 {
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 6px;
  }
  .phoneme-item {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }
  .ph { font-weight: 800; color: #7c3aed; font-size: 12px; min-width: 55px; }
  .ph-ex { color: #64748b; font-size: 10px; }

  /* Phase 3 — expressions */
  .expr-table td.expr-fr { color: #64748b; font-style: italic; }
  .expr-table td.expr-med { font-weight: 700; color: #0056D2; font-size: 11px; }

  /* Recording instructions box */
  .rec-instructions {
    background: #f0fdf4;
    border: 2px solid #bbf7d0;
    border-radius: 12px;
    padding: 16px 20px;
    margin: 20px 0;
    break-inside: avoid;
  }
  .rec-instructions h3 {
    font-size: 13px;
    font-weight: 800;
    color: #16a34a;
    margin-bottom: 10px;
  }
  .rec-instructions ul { padding-left: 16px; }
  .rec-instructions li {
    font-size: 10.5px;
    color: #15803d;
    margin-bottom: 4px;
  }
  .rec-instructions li strong { color: #166534; }

  .summary-box {
    background: #0056D2;
    color: white;
    border-radius: 12px;
    padding: 20px 24px;
    margin: 24px 0 0;
    display: flex;
    gap: 40px;
    align-items: center;
    break-inside: avoid;
  }
  .summary-box h3 { font-size: 14px; font-weight: 800; margin-bottom: 6px; }
  .summary-box p { font-size: 10px; opacity: 0.8; }
  .summary-num { font-size: 28px; font-weight: 900; margin-right: 8px; }

  .page-break { page-break-before: always; }

  .toc-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dotted #e2e8f0;
    font-size: 11px;
  }
  .toc-item:last-child { border-bottom: none; }
  .toc-phase { font-weight: 800; color: #0056D2; font-size: 10px; text-transform: uppercase; }
</style>
</head>
<body>

<!-- ══════════════ COVER ══════════════ -->
<div class="cover">
  <div class="cover-badge">Medumba.AI — Document de Référence</div>
  <h1>Set d'Entraînement<br>Vocal Medumba</h1>
  <h2>Mots & expressions pour l'app mobile</h2>
  <p class="cover-desc">
    Liste complète des mots Medumba à enregistrer pour activer les fonctionnalités
    audio de l'application Medumba.AI. Organisée en 3 phases par ordre de priorité.
  </p>
  <div class="cover-stats">
    <div class="cover-stat">
      <span class="cover-stat-val">106</span>
      <span class="cover-stat-label">Mots d'exercices</span>
    </div>
    <div class="cover-stat">
      <span class="cover-stat-val">20</span>
      <span class="cover-stat-label">Expressions</span>
    </div>
    <div class="cover-stat">
      <span class="cover-stat-val">14</span>
      <span class="cover-stat-label">Thèmes</span>
    </div>
  </div>
  <div class="cover-footer">Medumba.AI · Projet NKONI · Avril 2026</div>
</div>

<!-- ══════════════ PAGE 2 — INTRO + PHASE 1 ══════════════ -->
<div class="page">

  <div class="section-header">
    <h2>📋 Phase 1 — Mots d'exercices (OBLIGATOIRES)</h2>
    <span class="badge">106 mots · 14 leçons</span>
  </div>

  <div class="phase-intro">
    Ces 106 mots sont directement utilisés dans les exercices interactifs de l'app.
    Chaque mot doit être enregistré comme un fichier audio séparé.
    Format recommandé : <strong>.ogg</strong> ou <strong>.mp3</strong> · Mono · 44 100 Hz
  </div>

  <div class="two-col">

    <!-- L1 Salutations -->
    <div class="lesson-block">
      <div class="lesson-title">👋 Salutations (l1)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">1</td><td class="medumba">Càꞌtə̀</td><td class="french">Salut</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">2</td><td class="medumba">Càꞌtə</td><td class="french">Salutation</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">3</td><td class="medumba">Ŋ̂</td><td class="french">Oui</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">4</td><td class="medumba">Nga</td><td class="french">Non</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">5</td><td class="medumba">Làgtə</td><td class="french">Pardon</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">6</td><td class="medumba">Lὰbtə̀</td><td class="french">Remercier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L2 Corps humain -->
    <div class="lesson-block">
      <div class="lesson-title">💪 Corps humain (l2)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">7</td><td class="medumba">Bu</td><td class="french">Main</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">8</td><td class="medumba">Kù</td><td class="french">Pied</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">9</td><td class="medumba">Lαg</td><td class="french">Œil</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">10</td><td class="medumba">Toŋ</td><td class="french">Oreille</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">11</td><td class="medumba">Sɔ̀</td><td class="french">Dent</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">12</td><td class="medumba">Nkɔ̀ntsəlαg</td><td class="french">Nez</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">13</td><td class="medumba">Nvɛ̀n</td><td class="french">Ventre</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">14</td><td class="medumba">Tɔ</td><td class="french">Bouche</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">15</td><td class="medumba">Nyǎŋtu</td><td class="french">Genou</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">16</td><td class="medumba">Ntʉ</td><td class="french">Tête</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L3 Nourriture -->
    <div class="lesson-block">
      <div class="lesson-title">🍲 Nourriture (l3)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">17</td><td class="medumba">Mbαb</td><td class="french">Repas / nourriture</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">18</td><td class="medumba">Ngwa</td><td class="french">Igname</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">19</td><td class="medumba">Dʉ̀mtə̀</td><td class="french">Manioc</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">20</td><td class="medumba">Nkûnmèkale</td><td class="french">Maïs</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L4 Couleurs -->
    <div class="lesson-block">
      <div class="lesson-title">🎨 Couleurs & Vêtements (l4)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">21</td><td class="medumba">Mɛ̀nnə̀sɛn</td><td class="french">Couleur</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">22</td><td class="medumba">Bà</td><td class="french">Vêtement / tissu</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">23</td><td class="medumba">Bwòŋ</td><td class="french">Robe</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L5 Chiffres -->
    <div class="lesson-block">
      <div class="lesson-title">🔢 Chiffres & Temps (l5)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">24</td><td class="medumba">Bαhα</td><td class="french">Un / premier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">25</td><td class="medumba">Tad</td><td class="french">Deux</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">26</td><td class="medumba">Kuὰ</td><td class="french">Trois</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">27</td><td class="medumba">Tα̂n</td><td class="french">Quatre</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">28</td><td class="medumba">Ntoge</td><td class="french">Cinq</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">29</td><td class="medumba">Gham</td><td class="french">Six</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">30</td><td class="medumba">Sὰmmbαhα</td><td class="french">Sept</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">31</td><td class="medumba">Fomə</td><td class="french">Huit</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">32</td><td class="medumba">Mbwə̀ꞌə</td><td class="french">Neuf</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">33</td><td class="medumba">Ncaꞌ</td><td class="french">Dix</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L6 Animaux -->
    <div class="lesson-block">
      <div class="lesson-title">🐄 Animaux (l6)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">34</td><td class="medumba">Nyαmnaꞌ</td><td class="french">Porc</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">35</td><td class="medumba">Njʉ̀mbwə</td><td class="french">Chèvre</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">36</td><td class="medumba">Ngwα̌yid</td><td class="french">Mouton</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">37</td><td class="medumba">Nyu</td><td class="french">Oiseau</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

  </div><!-- end two-col -->

  <!-- row 2 -->
  <div class="two-col" style="margin-top:4px">

    <!-- L7 Famille -->
    <div class="lesson-block">
      <div class="lesson-title">👨‍👩‍👧 Famille (l7)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">38</td><td class="medumba">Ngònmα</td><td class="french">Femme (épouse)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">39</td><td class="medumba">Ndu</td><td class="french">Mari / homme</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">40</td><td class="medumba">Mɛ̀nnzwi</td><td class="french">Enfants (pluriel)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">41</td><td class="medumba">Nshùm</td><td class="french">Garçon</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">42</td><td class="medumba">Fàd</td><td class="french">Père</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">43</td><td class="medumba">Mɛnndu</td><td class="french">Fils</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L8 Nature -->
    <div class="lesson-block">
      <div class="lesson-title">🌿 Nature (l8)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">44</td><td class="medumba">Fə̀dmbàŋ</td><td class="french">Arbre</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">45</td><td class="medumba">Lòŋ</td><td class="french">Lumière / soleil</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">46</td><td class="medumba">Mbalə</td><td class="french">Pluie</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L9 Temps -->
    <div class="lesson-block">
      <div class="lesson-title">⏰ Temps & Horaires (l9)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">47</td><td class="medumba">Nkə̂bnjʉ</td><td class="french">Demain</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">48</td><td class="medumba">Mfə̌dnjʉ</td><td class="french">Hier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">49</td><td class="medumba">Ngὰbnjʉ</td><td class="french">Aujourd'hui</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">50</td><td class="medumba">Mətsill</td><td class="french">Maintenant</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">51</td><td class="medumba">Ngə̀laŋ</td><td class="french">Bientôt</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L10 Rencontres -->
    <div class="lesson-block">
      <div class="lesson-title">💬 Rencontres (l10)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">52</td><td class="medumba">Mαndùm</td><td class="french">Monsieur</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">53</td><td class="medumba">Mfɛd</td><td class="french">Ami</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">54</td><td class="medumba">Nshun</td><td class="french">Jeune homme</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">55</td><td class="medumba">Mɛ̀nntʉ̀n</td><td class="french">Personne</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">56</td><td class="medumba">Ncʉὰmbwə̀</td><td class="french">Étranger</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">57</td><td class="medumba">Ntʉ'njàm</td><td class="french">Chef de famille</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">58</td><td class="medumba">Tα</td><td class="french">Père (informel)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <div class="two-col" style="margin-top:24px">

    <!-- L11 Cuisine -->
    <div class="lesson-block">
      <div class="lesson-title">🔥 Cuisine (l11)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">59</td><td class="medumba">Fə̌'mbwogə</td><td class="french">Cuisine / foyer</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">60</td><td class="medumba">Nzə̂mbwogə</td><td class="french">Cuisinier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">61</td><td class="medumba">Ntànywìn</td><td class="french">Marmite</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">62</td><td class="medumba">Mbwogə</td><td class="french">Feu</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">63</td><td class="medumba">Kwe'</td><td class="french">Réfrigérateur</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">64</td><td class="medumba">Ntàmfʉαg</td><td class="french">Mortier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">65</td><td class="medumba">Tə</td><td class="french">Eau (cuisine)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">66</td><td class="medumba">Kə̀kîmbwogə</td><td class="french">Charbon de bois</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L12 Santé -->
    <div class="lesson-block">
      <div class="lesson-title">❤️ Santé (l12)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">67</td><td class="medumba">Yâtu</td><td class="french">Malade</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">68</td><td class="medumba">Bǎmmba</td><td class="french">Blessure</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">69</td><td class="medumba">Kwiag</td><td class="french">Douleur</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">70</td><td class="medumba">Saŋtə̀wud</td><td class="french">Médicament</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">71</td><td class="medumba">Bìkoŋə</td><td class="french">Injection</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">72</td><td class="medumba">Ngòkɛd</td><td class="french">Fatigue</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">73</td><td class="medumba">Mìntsi</td><td class="french">Sang</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">74</td><td class="medumba">Ngàngokɛd</td><td class="french">Fatigué (adj.)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L13 École -->
    <div class="lesson-block">
      <div class="lesson-title">📚 École (l13)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">75</td><td class="medumba">Bu'kì</td><td class="french">Livre scolaire</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">76</td><td class="medumba">Bu'ŋwà'nì</td><td class="french">Cahier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">77</td><td class="medumba">Kʉ̂dfi</td><td class="french">Crayon</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">78</td><td class="medumba">Cɛ̂dkì</td><td class="french">Élève</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">79</td><td class="medumba">Bǎgcɛ̂dkì</td><td class="french">Enseignant</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">80</td><td class="medumba">ŋwà'nì</td><td class="french">École</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">81</td><td class="medumba">Mbə̂mkì</td><td class="french">Cours / leçon</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">82</td><td class="medumba">Nkǒ'ŋwà'nì</td><td class="french">Salle de classe</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

    <!-- L14 Travail -->
    <div class="lesson-block">
      <div class="lesson-title">💼 Travail (l14)</div>
      <table>
        <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
        <tbody>
          <tr><td class="num">83</td><td class="medumba">Ngàtswìtə̀</td><td class="french">Travail</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">84</td><td class="medumba">Ndʉ̂'nὰ</td><td class="french">Bureau</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">85</td><td class="medumba">Tα̂lὰm</td><td class="french">Patron / chef</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">86</td><td class="medumba">Ndè'càm</td><td class="french">Policier</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">87</td><td class="medumba">Nsòŋsaŋvə̀</td><td class="french">Secrétaire</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">88</td><td class="medumba">Ntântαnə</td><td class="french">Réunion</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">89</td><td class="medumba">Nswɛ̀nfu</td><td class="french">Salaire</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
          <tr><td class="num">90</td><td class="medumba">Ndè'nkαb</td><td class="french">Surveillant</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        </tbody>
      </table>
    </div>

  </div>

  <!-- Vocabulaire de base -->
  <div class="lesson-block" style="margin-top:12px">
    <div class="lesson-title">⭐ Vocabulaire de base — Variety (16 mots)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
    <table style="width:100%">
      <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
      <tbody>
        <tr><td class="num">91</td><td class="medumba">Mbʉ</td><td class="french">Chien</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">92</td><td class="medumba">Bùsi</td><td class="french">Chat</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">93</td><td class="medumba">Ntsə</td><td class="french">Eau</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">94</td><td class="medumba">Nyàm</td><td class="french">Soleil</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">95</td><td class="medumba">Mɛn</td><td class="french">Enfant</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">96</td><td class="medumba">Mbwoge</td><td class="french">Feu</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">97</td><td class="medumba">Ngòn</td><td class="french">Fille</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">98</td><td class="medumba">Leꞌe</td><td class="french">Jour</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      </tbody>
    </table>
    <table style="width:100%">
      <thead><tr><th class="num">#</th><th>Medumba</th><th>Traduction</th><th class="record-col">Enregistré</th></tr></thead>
      <tbody>
        <tr><td class="num">99</td><td class="medumba">Mαŋwʉ</td><td class="french">Lune</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">100</td><td class="medumba">Tswəꞌ</td><td class="french">Nuit</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">101</td><td class="medumba">Ngǒntsə</td><td class="french">Rivière</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">102</td><td class="medumba">Baꞌ</td><td class="french">Père (alt.)</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">103</td><td class="medumba">Kəlɔ̀ bàkə̀lɔ̀</td><td class="french">Tortue</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">104</td><td class="medumba">Bʉn</td><td class="french">Maison</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">105</td><td class="medumba">Saŋə</td><td class="french">Animal</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
        <tr><td class="num">106</td><td class="medumba">Mbàŋ</td><td class="french">Village</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      </tbody>
    </table>
    </div>
  </div>

  <!-- ══════ PHASE 2 ══════ -->
  <div class="page-break"></div>

  <div class="section-header" style="margin-top:24px">
    <h2>🎵 Phase 2 — Couverture Phonémique (syllabes uniques)</h2>
    <span class="badge">Synthèse vocale</span>
  </div>

  <div class="phase-intro">
    Ces enregistrements permettent de <strong>synthétiser tout nouveau mot Medumba</strong> par recombinaison de syllabes.
    Le Medumba est une langue tonale à 5 niveaux de ton. Chaque combinaison voyelle+ton doit être couverte.
  </div>

  <div class="phoneme-grid">
    <div class="phoneme-card">
      <h4>Voyelles de base</h4>
      <div class="phoneme-item"><span class="ph">a / à / á</span><span class="ph-ex">ton moyen / bas / haut</span></div>
      <div class="phoneme-item"><span class="ph">â / ǎ</span><span class="ph-ex">ton descendant / montant</span></div>
      <div class="phoneme-item"><span class="ph">e / è / é</span><span class="ph-ex">→ dans Leꞌe, Mfɛd</span></div>
      <div class="phoneme-item"><span class="ph">ə / ə̀ / ə̂</span><span class="ph-ex">schwa → Càꞌtə̀</span></div>
      <div class="phoneme-item"><span class="ph">ɛ / ɛ̀ / ɛ̂</span><span class="ph-ex">→ Mɛn, Mɛ̀nnzwi</span></div>
      <div class="phoneme-item"><span class="ph">i / ì / í</span><span class="ph-ex">→ Mìntsi</span></div>
      <div class="phoneme-item"><span class="ph">o / ò / ó</span><span class="ph-ex">→ Ngòn, Bwòŋ</span></div>
      <div class="phoneme-item"><span class="ph">ɔ / ɔ̀ / ɔ̂</span><span class="ph-ex">→ Sɔ̀, Tɔ</span></div>
      <div class="phoneme-item"><span class="ph">u / ù / ú</span><span class="ph-ex">→ Kù, Ndu</span></div>
      <div class="phoneme-item"><span class="ph">ʉ / ʉ̀ / ʉ̂</span><span class="ph-ex">→ Mbʉ, Ntʉ</span></div>
      <div class="phoneme-item"><span class="ph">α / ὰ / α̂</span><span class="ph-ex">voyelle ouverte → Bαhα</span></div>
    </div>

    <div class="phoneme-card">
      <h4>Consonnes nasales (N+)</h4>
      <div class="phoneme-item"><span class="ph">mb-</span><span class="ph-ex">Mbʉ, Mbαb, Mbàŋ</span></div>
      <div class="phoneme-item"><span class="ph">ng-</span><span class="ph-ex">Nga, Ngòn, Ngwa</span></div>
      <div class="phoneme-item"><span class="ph">nd-</span><span class="ph-ex">Ndu, Ndè'càm</span></div>
      <div class="phoneme-item"><span class="ph">nk-</span><span class="ph-ex">Nkə̂bnjʉ, Nkûn</span></div>
      <div class="phoneme-item"><span class="ph">nt-</span><span class="ph-ex">Ntʉ, Ntoge, Ntànywìn</span></div>
      <div class="phoneme-item"><span class="ph">nts-</span><span class="ph-ex">Ntsə, Nkɔ̀ntsəlαg</span></div>
      <div class="phoneme-item"><span class="ph">nj-</span><span class="ph-ex">Njʉ̀mbwə</span></div>
      <div class="phoneme-item"><span class="ph">ny-</span><span class="ph-ex">Nyàm, Nyǎŋtu, Nyu</span></div>
      <div class="phoneme-item"><span class="ph">nyw-</span><span class="ph-ex">Ntànywìn</span></div>
      <div class="phoneme-item"><span class="ph">nc-</span><span class="ph-ex">Ncaꞌ, Ncʉὰmbwə̀</span></div>
      <div class="phoneme-item"><span class="ph">ns-</span><span class="ph-ex">Nswɛ̀nfu, Nsòŋsaŋvə̀</span></div>
      <div class="phoneme-item"><span class="ph">nz-</span><span class="ph-ex">Nzə̂mbwogə</span></div>
    </div>

    <div class="phoneme-card">
      <h4>Consonnes simples</h4>
      <div class="phoneme-item"><span class="ph">b-</span><span class="ph-ex">Bu, Bùsi, Bαhα</span></div>
      <div class="phoneme-item"><span class="ph">c-</span><span class="ph-ex">Càꞌtə̀, Cɛ̂dkì</span></div>
      <div class="phoneme-item"><span class="ph">d-</span><span class="ph-ex">Dʉ̀mtə̀</span></div>
      <div class="phoneme-item"><span class="ph">f-</span><span class="ph-ex">Fàd, Fomə, Fə̀dmbàŋ</span></div>
      <div class="phoneme-item"><span class="ph">g- / gh-</span><span class="ph-ex">Gham, dans expressions</span></div>
      <div class="phoneme-item"><span class="ph">k-</span><span class="ph-ex">Kù, Kwiag, Kuὰ</span></div>
      <div class="phoneme-item"><span class="ph">kw-</span><span class="ph-ex">Kwe', Kwiag</span></div>
      <div class="phoneme-item"><span class="ph">l-</span><span class="ph-ex">Lαg, Làgtə, Lòŋ</span></div>
      <div class="phoneme-item"><span class="ph">m-</span><span class="ph-ex">Mɛn, Mαŋwʉ, Mbalə</span></div>
      <div class="phoneme-item"><span class="ph">mf-</span><span class="ph-ex">Mfɛd, Mfə̌dnjʉ</span></div>
      <div class="phoneme-item"><span class="ph">s-</span><span class="ph-ex">Sɔ̀, Saŋə</span></div>
      <div class="phoneme-item"><span class="ph">t- / ts-</span><span class="ph-ex">Toŋ, Tswəꞌ, Tad</span></div>
      <div class="phoneme-item"><span class="ph">ŋ-</span><span class="ph-ex">Ŋ̂, ŋwà'nì</span></div>
      <div class="phoneme-item"><span class="ph">ꞌ (glottale)</span><span class="ph-ex">Càꞌtə̀, Leꞌe, Ncaꞌ</span></div>
    </div>
  </div>

  <!-- ══════ PHASE 3 ══════ -->
  <div class="section-header">
    <h2>💬 Phase 3 — Expressions courantes (20 phrases)</h2>
    <span class="badge">Flashcards · Conversations</span>
  </div>

  <div class="phase-intro">
    Ces phrases courtes apparaissent dans les flashcards de l'app.
    Enregistrez chaque phrase d'un seul souffle, ton naturel.
  </div>

  <table class="expr-table">
    <thead>
      <tr>
        <th class="num">#</th>
        <th style="width:32%">Français</th>
        <th>Medumba</th>
        <th class="record-col">Enregistré</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="num">1</td><td class="expr-fr">Bonjour</td><td class="expr-med">Cà'tə̀ leꞌe</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">2</td><td class="expr-fr">Bonsoir</td><td class="expr-med">Cà'tə̀ tswəꞌ</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">3</td><td class="expr-fr">Merci beaucoup</td><td class="expr-med">Lὰbtə̀ mbα</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">4</td><td class="expr-fr">Comment vas-tu ?</td><td class="expr-med">Ò wud nə̀ zə ?</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">5</td><td class="expr-fr">Je vais bien</td><td class="expr-med">Mə̀ wud mfɛd</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">6</td><td class="expr-fr">Comment t'appelles-tu ?</td><td class="expr-med">Ò tswìg zə ?</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">7</td><td class="expr-fr">Je m'appelle…</td><td class="expr-med">Mə̀ tswìg…</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">8</td><td class="expr-fr">Au revoir</td><td class="expr-med">Ò tsə mfɛd</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">9</td><td class="expr-fr">S'il te plaît</td><td class="expr-med">Lα̌g mə</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">10</td><td class="expr-fr">Je ne comprends pas</td><td class="expr-med">Mə̀ kə̂' lɛ̀nə</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">11</td><td class="expr-fr">Répète s'il te plaît</td><td class="expr-med">Kəlɔ̀ bàkə̀lɔ̀</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">12</td><td class="expr-fr">Je suis fatigué(e)</td><td class="expr-med">Mə̀ bə ngòkɛd</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">13</td><td class="expr-fr">J'ai faim</td><td class="expr-med">Mə̀ bə mbαb</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">14</td><td class="expr-fr">J'ai soif</td><td class="expr-med">Mə̀ bə ntsə</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">15</td><td class="expr-fr">C'est bon</td><td class="expr-med">A bə mfɛd</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">16</td><td class="expr-fr">C'est quoi ?</td><td class="expr-med">À bə zə ?</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">17</td><td class="expr-fr">Combien ça coûte ?</td><td class="expr-med">A bə mbα̌ zə ?</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">18</td><td class="expr-fr">Où habites-tu ?</td><td class="expr-med">Ò ntswə nsə̂n zə ?</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">19</td><td class="expr-fr">J'ai mal à la tête</td><td class="expr-med">Mə̀ kwiag ntʉ</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
      <tr><td class="num">20</td><td class="expr-fr">Allons-y !</td><td class="expr-med">Tɔ tsə</td><td class="record-col"><span class="record-box">☐ fait</span></td></tr>
    </tbody>
  </table>

  <!-- ══════ INSTRUCTIONS ══════ -->
  <div class="rec-instructions" style="margin-top:20px">
    <h3>🎙️ Instructions d'enregistrement</h3>
    <ul>
      <li><strong>Format :</strong> .ogg (Android) ou .mp3 — Mono — 44 100 Hz — 128 kbps</li>
      <li><strong>Durée :</strong> 1–3 secondes par mot isolé · 3–6 secondes par phrase</li>
      <li><strong>Silence :</strong> 0.2 seconde de silence avant et après chaque enregistrement</li>
      <li><strong>Nommage des fichiers :</strong> utiliser le mot normalisé ASCII, ex. <code>caqtaq.ogg</code>, <code>nga.ogg</code>, <code>mbuu.ogg</code></li>
      <li><strong>Microphone :</strong> enregistrer dans un endroit calme, micro à 15–20 cm de la bouche</li>
      <li><strong>Tons :</strong> respecter scrupuleusement les tons (bas à, haut á, descendant â, montant ǎ) — c'est crucial en Medumba</li>
      <li><strong>Validation :</strong> ré-écouter chaque enregistrement avant de passer au suivant</li>
    </ul>
  </div>

  <div class="summary-box">
    <div>
      <h3>Récapitulatif total</h3>
      <p>Pour une couverture complète des exercices de l'app</p>
    </div>
    <div style="text-align:center">
      <span class="summary-num">106</span><span style="font-size:13px;opacity:0.8">mots (Phase 1)</span>
    </div>
    <div style="text-align:center">
      <span class="summary-num">20</span><span style="font-size:13px;opacity:0.8">expressions (Phase 3)</span>
    </div>
    <div style="text-align:center">
      <span class="summary-num">126</span><span style="font-size:13px;opacity:0.8">fichiers audio total</span>
    </div>
  </div>

</div><!-- end .page -->
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outputPath = path.join(__dirname, 'Medumba_AI_Set_Entrainement_Vocal.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF généré :', outputPath);
})();
