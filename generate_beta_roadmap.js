import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Medumba.AI — Roadmap Version Bêta</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #0f172a; font-size: 11px; line-height: 1.5; background: #fff; }

  /* COVER */
  .cover {
    height: 100vh; display: flex; flex-direction: column; align-items: center;
    justify-content: center; background: linear-gradient(135deg, #0056D2 0%, #7c3aed 100%);
    color: white; text-align: center; padding: 60px; page-break-after: always; position: relative;
  }
  .cover-badge { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; padding: 6px 20px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 32px; }
  .cover h1 { font-size: 44px; font-weight: 900; line-height: 1.1; margin-bottom: 12px; }
  .cover h2 { font-size: 20px; font-weight: 400; opacity: 0.85; margin-bottom: 40px; }
  .cover-desc { font-size: 14px; opacity: 0.8; max-width: 520px; line-height: 1.8; margin-bottom: 48px; }
  .cover-pills { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 48px; }
  .pill { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; padding: 6px 18px; font-size: 12px; font-weight: 600; }
  .cover-footer { position: absolute; bottom: 32px; font-size: 10px; opacity: 0.6; }

  /* PAGES */
  .page { padding: 40px 48px; }
  .page-break { page-break-before: always; }

  /* SECTION HEADERS */
  .section-header { background: linear-gradient(90deg, #0056D2, #7c3aed); color: white; padding: 14px 20px; border-radius: 12px; margin: 24px 0 16px; display: flex; align-items: center; justify-content: space-between; }
  .section-header h2 { font-size: 15px; font-weight: 800; }
  .section-header .badge { background: rgba(255,255,255,0.2); border-radius: 999px; padding: 3px 12px; font-size: 10px; font-weight: 700; }

  .section-header-green { background: linear-gradient(90deg, #059669, #10b981); }
  .section-header-orange { background: linear-gradient(90deg, #d97706, #f59e0b); }
  .section-header-red { background: linear-gradient(90deg, #dc2626, #ef4444); }

  /* INTRO BOX */
  .intro-box { background: #f0f7ff; border-left: 4px solid #0056D2; padding: 14px 18px; border-radius: 0 10px 10px 0; margin-bottom: 20px; font-size: 11.5px; color: #1e40af; font-weight: 600; line-height: 1.7; }

  /* VERSION COMPARE */
  .version-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .version-card { border-radius: 14px; padding: 18px; border: 2px solid; }
  .version-alpha { border-color: #e2e8f0; background: #f8fafc; }
  .version-beta  { border-color: #7c3aed; background: #faf5ff; }
  .version-title { font-size: 13px; font-weight: 900; margin-bottom: 12px; }
  .version-alpha .version-title { color: #64748b; }
  .version-beta  .version-title { color: #7c3aed; }
  .version-item { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 7px; font-size: 10.5px; }
  .check { color: #22c55e; font-weight: 900; flex-shrink: 0; }
  .cross { color: #ef4444; font-weight: 900; flex-shrink: 0; }
  .new  { color: #7c3aed; font-weight: 900; flex-shrink: 0; }

  /* FEATURE CARDS */
  .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
  .feature-card { border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px; }
  .feature-icon { font-size: 26px; margin-bottom: 8px; }
  .feature-title { font-size: 12px; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
  .feature-desc { font-size: 10.5px; color: #64748b; line-height: 1.6; margin-bottom: 8px; }
  .feature-tag { display: inline-block; background: #eff6ff; color: #0056D2; border-radius: 999px; padding: 2px 10px; font-size: 9px; font-weight: 700; }
  .feature-tag-purple { background: #faf5ff; color: #7c3aed; }
  .feature-tag-green  { background: #f0fdf4; color: #059669; }
  .feature-tag-orange { background: #fffbeb; color: #d97706; }

  /* ONLINE CLASSES */
  .classes-hero { background: linear-gradient(135deg, #059669, #10b981); color: white; border-radius: 16px; padding: 24px 28px; margin-bottom: 20px; }
  .classes-hero h3 { font-size: 20px; font-weight: 900; margin-bottom: 8px; }
  .classes-hero p  { font-size: 12px; opacity: 0.9; line-height: 1.7; }
  .classes-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .class-card { border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; }
  .class-card .icon { font-size: 28px; margin-bottom: 8px; }
  .class-card .title { font-size: 11px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
  .class-card .desc { font-size: 10px; color: #64748b; line-height: 1.5; }

  /* SCREEN MAPPING TABLE */
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 10.5px; }
  th { background: #f8fafc; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 9px; padding: 8px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
  td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  td.screen { font-weight: 700; color: #0056D2; }
  td.feature-cell { color: #7c3aed; font-weight: 600; }
  td.status-new { background: #faf5ff; }

  /* TIMELINE */
  .timeline { margin: 0; padding: 0; list-style: none; }
  .timeline-item { display: flex; gap: 16px; margin-bottom: 20px; }
  .timeline-dot { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; margin-top: 2px; }
  .dot-blue   { background: #eff6ff; border: 2px solid #0056D2; }
  .dot-purple { background: #faf5ff; border: 2px solid #7c3aed; }
  .dot-green  { background: #f0fdf4; border: 2px solid #059669; }
  .timeline-content { flex: 1; }
  .timeline-phase { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 2px; }
  .timeline-title { font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
  .timeline-desc  { font-size: 10.5px; color: #64748b; line-height: 1.6; }
  .timeline-date  { font-size: 10px; font-weight: 700; color: #0056D2; margin-top: 4px; }

  /* SUMMARY BOX */
  .summary-box { background: linear-gradient(135deg, #0056D2, #7c3aed); color: white; border-radius: 14px; padding: 22px 28px; margin-top: 24px; display: flex; gap: 32px; align-items: center; }
  .summary-box h3 { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
  .summary-box p  { font-size: 10px; opacity: 0.8; }
  .summary-num { font-size: 30px; font-weight: 900; }
  .summary-label { font-size: 10px; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.8px; }
</style>
</head>
<body>

<!-- ══════ COVER ══════ -->
<div class="cover">
  <div class="cover-badge">Medumba.AI — Document Stratégique</div>
  <h1>Roadmap Version Bêta</h1>
  <h2>Flutter · Nouvelles fonctionnalités · Classes en ligne</h2>
  <p class="cover-desc">
    Ce document présente la vision complète de la version bêta de l'application Medumba.AI,
    reconstruite en Flutter, enrichie de fonctionnalités Gen Z et d'un système de classes en ligne,
    tout en respectant la structure Figma définie.
  </p>
  <div class="cover-pills">
    <span class="pill">🐦 Flutter</span>
    <span class="pill">🌙 Dark Mode</span>
    <span class="pill">🎓 Classes en ligne</span>
    <span class="pill">🎙 Prononciation vocale</span>
    <span class="pill">📲 Social sharing</span>
    <span class="pill">🔔 Notifications push</span>
    <span class="pill">🎵 Musique & Culture</span>
  </div>
  <div class="cover-footer">Medumba.AI · Projet NKONI · Document interne — Mai 2026</div>
</div>

<!-- ══════ PAGE 1 — ALPHA VS BETA ══════ -->
<div class="page">

  <div class="section-header">
    <h2>📊 Alpha vs Bêta — Comparaison des versions</h2>
    <span class="badge">Vue d'ensemble</span>
  </div>

  <div class="intro-box">
    La version alpha (React Native) a été envoyée pour validation. La version bêta sera reconstruite en <strong>Flutter</strong>
    pour de meilleures performances natives, une compatibilité Android + iOS, et l'ajout des fonctionnalités manquantes
    tout en respectant strictement la structure Figma.
  </div>

  <div class="version-grid">
    <div class="version-card version-alpha">
      <div class="version-title">v1.0-alpha · React Native ✅ Livré</div>
      <div class="version-item"><span class="check">✓</span> Onboarding complet (8 écrans)</div>
      <div class="version-item"><span class="check">✓</span> Auth / Inscription / Connexion</div>
      <div class="version-item"><span class="check">✓</span> Dashboard 5 onglets</div>
      <div class="version-item"><span class="check">✓</span> 15 leçons interactives (L1–L17)</div>
      <div class="version-item"><span class="check">✓</span> Numérotation + audio OGG enregistré</div>
      <div class="version-item"><span class="check">✓</span> Dictionnaire + Traducteur IA</div>
      <div class="version-item"><span class="check">✓</span> Calendrier & Vidéos</div>
      <div class="version-item"><span class="check">✓</span> Classement, Défis, Premium, Profil</div>
      <div class="version-item"><span class="cross">✗</span> Dark mode</div>
      <div class="version-item"><span class="cross">✗</span> Classes en ligne</div>
      <div class="version-item"><span class="cross">✗</span> Prononciation vocale</div>
      <div class="version-item"><span class="cross">✗</span> Notifications push</div>
      <div class="version-item"><span class="cross">✗</span> Partage social</div>
    </div>
    <div class="version-card version-beta">
      <div class="version-title">v1.0-bêta · Flutter 🔜 En développement</div>
      <div class="version-item"><span class="check">✓</span> Toutes les fonctionnalités alpha</div>
      <div class="version-item"><span class="check">✓</span> Performances natives (Android + iOS)</div>
      <div class="version-item"><span class="new">★</span> Dark mode / Light mode toggle</div>
      <div class="version-item"><span class="new">★</span> Classes en ligne (live + replay)</div>
      <div class="version-item"><span class="new">★</span> Prononciation vocale + évaluation IA</div>
      <div class="version-item"><span class="new">★</span> Notifications push (streak, rappels)</div>
      <div class="version-item"><span class="new">★</span> Partage social (WhatsApp, Instagram)</div>
      <div class="version-item"><span class="new">★</span> Vidéos TikTok-style (30 sec)</div>
      <div class="version-item"><span class="new">★</span> Stories quotidiennes (swipeable)</div>
      <div class="version-item"><span class="new">★</span> Musique & Culture Medumba</div>
      <div class="version-item"><span class="new">★</span> Communauté & Chat entre apprenants</div>
      <div class="version-item"><span class="new">★</span> Codemagic CI/CD (iOS + Android)</div>
    </div>
  </div>

  <!-- FEATURE CARDS -->
  <div class="section-header">
    <h2>✨ Nouvelles fonctionnalités Gen Z — Détail</h2>
    <span class="badge">8 fonctionnalités</span>
  </div>

  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">🌙</div>
      <div class="feature-title">Dark Mode</div>
      <div class="feature-desc">Thème sombre/clair commutable depuis le Profil. Respecte les préférences système Android/iOS. Chaque couleur du design Figma aura sa variante dark.</div>
      <span class="feature-tag">Profil → Paramètres</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🔔</div>
      <div class="feature-title">Notifications Push</div>
      <div class="feature-desc">Rappels de série ("Tu vas perdre ta flamme !"), rappels de classe programmée, nouveaux défis du jour. Firebase Cloud Messaging (FCM).</div>
      <span class="feature-tag">Profil → Notifications</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📲</div>
      <div class="feature-title">Partage Social</div>
      <div class="feature-desc">Partage de score de leçon, badge de série, progression hebdomadaire vers WhatsApp, Instagram Stories, Facebook. Carte de partage générée automatiquement.</div>
      <span class="feature-tag-green">Fin de leçon · Profil</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🎙</div>
      <div class="feature-title">Prononciation Vocale</div>
      <div class="feature-desc">L'apprenant écoute le mot Medumba, puis l'enregistre. L'IA compare la prononciation et donne un score. Intégré dans les exercices de leçon existants.</div>
      <span class="feature-tag-purple">Écran Leçon</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📱</div>
      <div class="feature-title">Vidéos TikTok-style</div>
      <div class="feature-desc">Clips de 30 secondes en scroll vertical : un mot, une phrase, une règle culturelle. Feed infini, likeable, shareable. Extension de l'écran Vidéos existant.</div>
      <span class="feature-tag-orange">Écran Vidéos</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">✨</div>
      <div class="feature-title">Stories Quotidiennes</div>
      <div class="feature-desc">Cartes swipeables en haut du Dashboard : mot du jour, expression culturelle, challenge flash. Disparaissent après 24h comme les Instagram Stories.</div>
      <span class="feature-tag">Dashboard → Accueil</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🎵</div>
      <div class="feature-title">Musique & Culture</div>
      <div class="feature-desc">Apprendre le Medumba à travers des chants traditionnels, proverbes et rythmes. Section dédiée dans la bibliothèque. Paroles affichées mot à mot.</div>
      <span class="feature-tag-green">Bibliothèque (nouvel écran)</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">👥</div>
      <div class="feature-title">Communauté & Chat</div>
      <div class="feature-desc">Forum d'apprenants, possibilité de défier un ami, chat modéré entre pairs. Nouveau 6e onglet dans la barre de navigation ou extension de Classement.</div>
      <span class="feature-tag-purple">Nouvel onglet Communauté</span>
    </div>
  </div>

</div>

<!-- ══════ PAGE 2 — CLASSES EN LIGNE ══════ -->
<div class="page page-break">

  <div class="classes-hero">
    <h3>🎓 Classes en Ligne — Fonctionnalité Phare</h3>
    <p>
      Le système de classes en ligne de Medumba.AI permet aux apprenants de rejoindre des cours
      animés par des enseignants certifiés CEPOM, en direct ou en replay, depuis l'application.
      C'est la fonctionnalité qui différencie Medumba.AI de toutes les autres apps de langue.
    </p>
  </div>

  <div class="section-header section-header-green">
    <h2>📚 Types de classes proposées</h2>
    <span class="badge">4 formats</span>
  </div>

  <div class="classes-grid">
    <div class="class-card">
      <div class="icon">📡</div>
      <div class="title">Classes Live</div>
      <div class="desc">Cours en direct avec un enseignant. Interaction en temps réel, questions/réponses. Limité à 30 apprenants par session.</div>
    </div>
    <div class="class-card">
      <div class="icon">🎬</div>
      <div class="title">Classes Replay</div>
      <div class="desc">Toutes les classes live sont enregistrées et disponibles en replay illimité dans la bibliothèque CEPOM.</div>
    </div>
    <div class="class-card">
      <div class="icon">👤</div>
      <div class="title">Cours Particuliers</div>
      <div class="desc">Session 1-à-1 avec un enseignant. Réservation directement dans l'app. Disponible pour les abonnés Premium.</div>
    </div>
    <div class="class-card">
      <div class="icon">🏆</div>
      <div class="title">Ateliers Culturels</div>
      <div class="desc">Sessions thématiques : contes Medumba, musique, cuisine, rites. Animées par des experts culturels.</div>
    </div>
    <div class="class-card">
      <div class="icon">📊</div>
      <div class="title">Classes par Niveau</div>
      <div class="desc">Débutant (A1-A2), Intermédiaire (B1-B2), Avancé (C1). Certificat CEPOM à chaque niveau validé.</div>
    </div>
    <div class="class-card">
      <div class="icon">👨‍👩‍👧</div>
      <div class="title">Classes Enfants</div>
      <div class="desc">Cours spéciaux pour enfants 6-12 ans. Interface simplifiée, contenu ludique, accompagnement parental.</div>
    </div>
  </div>

  <div class="section-header section-header-green">
    <h2>🖥 Intégration dans l'app — Écrans dédiés</h2>
    <span class="badge">Respecte le Figma</span>
  </div>

  <table>
    <thead>
      <tr>
        <th>Écran</th>
        <th>Contenu</th>
        <th>Accès</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr class="status-new">
        <td class="screen">Classes (nouvel écran)</td>
        <td class="feature-cell">Liste des classes disponibles, filtres niveau/type, classes en cours live</td>
        <td>Dashboard → bouton "Classes" dans grille rapide</td>
        <td>🆕 Nouveau</td>
      </tr>
      <tr class="status-new">
        <td class="screen">Fiche Classe</td>
        <td class="feature-cell">Détail de la classe, enseignant, niveau, durée, nombre de places, bouton Rejoindre</td>
        <td>Depuis liste Classes</td>
        <td>🆕 Nouveau</td>
      </tr>
      <tr class="status-new">
        <td class="screen">Classe Live (player)</td>
        <td class="feature-cell">Vidéo en direct, chat en bas, lever la main, partager écran enseignant</td>
        <td>Depuis Fiche Classe</td>
        <td>🆕 Nouveau</td>
      </tr>
      <tr>
        <td class="screen">Calendrier (existant)</td>
        <td class="feature-cell">Affichage des classes programmées + leçons. Rappel automatique 15 min avant</td>
        <td>Dashboard → Calendrier</td>
        <td>✏️ Étendu</td>
      </tr>
      <tr>
        <td class="screen">Vidéos (existant)</td>
        <td class="feature-cell">Bibliothèque des replays de classes. Filtrables par niveau et enseignant</td>
        <td>Dashboard → Vidéos</td>
        <td>✏️ Étendu</td>
      </tr>
      <tr>
        <td class="screen">Profil (existant)</td>
        <td class="feature-cell">Historique des classes suivies, certificats obtenus, enseignants favoris</td>
        <td>Onglet Profil</td>
        <td>✏️ Étendu</td>
      </tr>
      <tr class="status-new">
        <td class="screen">Profil Enseignant</td>
        <td class="feature-cell">Bio, spécialité, niveau enseigné, avis des apprenants, calendrier de disponibilité</td>
        <td>Depuis Fiche Classe</td>
        <td>🆕 Nouveau</td>
      </tr>
    </tbody>
  </table>

  <div class="section-header section-header-green">
    <h2>⚙️ Architecture technique — Classes en ligne</h2>
    <span class="badge">Stack recommandé</span>
  </div>

  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">📹</div>
      <div class="feature-title">Vidéo Live</div>
      <div class="feature-desc">Agora.io ou 100ms.live pour le streaming vidéo en temps réel. SDK Flutter disponible. Faible latence, jusqu'à 1000 spectateurs en mode webinar.</div>
      <span class="feature-tag">Agora / 100ms SDK</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">💬</div>
      <div class="feature-title">Chat en Classe</div>
      <div class="feature-desc">Firebase Realtime Database pour le chat en temps réel pendant les classes. Messages modérés par l'enseignant.</div>
      <span class="feature-tag">Firebase Realtime DB</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📅</div>
      <div class="feature-title">Réservation</div>
      <div class="feature-desc">Backend Node.js / Supabase pour gérer les réservations, paiements des cours particuliers, et envoi des rappels push.</div>
      <span class="feature-tag-purple">Node.js + Supabase</span>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🎬</div>
      <div class="feature-title">Replay / VOD</div>
      <div class="feature-desc">Les classes live sont enregistrées automatiquement et stockées sur Cloudflare R2 ou AWS S3. Lecture via lecteur vidéo Flutter intégré.</div>
      <span class="feature-tag-green">Cloudflare R2 / AWS S3</span>
    </div>
  </div>

</div>

<!-- ══════ PAGE 3 — TIMELINE ══════ -->
<div class="page page-break">

  <div class="section-header">
    <h2>🗓 Calendrier de développement — Version Bêta</h2>
    <span class="badge">Objectif NKONI · Juillet 2026</span>
  </div>

  <ul class="timeline">
    <li class="timeline-item">
      <div class="timeline-dot dot-blue">🏗</div>
      <div class="timeline-content">
        <div class="timeline-phase">Phase 1</div>
        <div class="timeline-title">Migration Flutter + Base technique</div>
        <div class="timeline-desc">Mise en place du projet Flutter, navigation, thème (dark/light), contexte global. Migration des 24 écrans existants depuis React Native. Intégration Codemagic pour CI/CD Android + iOS.</div>
        <div class="timeline-date">Juin 2026 — Semaines 1–3</div>
      </div>
    </li>
    <li class="timeline-item">
      <div class="timeline-dot dot-purple">✨</div>
      <div class="timeline-content">
        <div class="timeline-phase">Phase 2</div>
        <div class="timeline-title">Nouvelles fonctionnalités Gen Z</div>
        <div class="timeline-desc">Dark mode, notifications push (FCM), partage social, stories quotidiennes sur le Dashboard, vidéos TikTok-style, prononciation vocale dans les leçons.</div>
        <div class="timeline-date">Juin 2026 — Semaines 3–5</div>
      </div>
    </li>
    <li class="timeline-item">
      <div class="timeline-dot dot-green">🎓</div>
      <div class="timeline-content">
        <div class="timeline-phase">Phase 3</div>
        <div class="timeline-title">Classes en ligne</div>
        <div class="timeline-desc">Intégration Agora pour le live, écrans Classes / Fiche Classe / Classe Live. Extension du Calendrier et des Vidéos pour afficher les replays. Profil enseignant.</div>
        <div class="timeline-date">Juin–Juillet 2026 — Semaines 5–7</div>
      </div>
    </li>
    <li class="timeline-item">
      <div class="timeline-dot dot-blue">🧪</div>
      <div class="timeline-content">
        <div class="timeline-phase">Phase 4</div>
        <div class="timeline-title">Tests & Distribution Bêta</div>
        <div class="timeline-desc">Tests internes, correction des bugs, build release via Codemagic. Distribution bêta fermée via Firebase App Distribution (Android) et TestFlight (iOS).</div>
        <div class="timeline-date">Juillet 2026 — Semaine 7–8</div>
      </div>
    </li>
    <li class="timeline-item">
      <div class="timeline-dot dot-green">🥁</div>
      <div class="timeline-content">
        <div class="timeline-phase">Lancement</div>
        <div class="timeline-title">Festival NKONI — Version 1.0</div>
        <div class="timeline-desc">Lancement officiel de Medumba.AI v1.0 au Festival NKONI. Publication sur Google Play Store et App Store. Présentation au public et à la communauté Medumba.</div>
        <div class="timeline-date">Juillet 2026</div>
      </div>
    </li>
  </ul>

  <div class="section-header" style="margin-top: 32px">
    <h2>📐 Respect de la structure Figma</h2>
    <span class="badge">Principe directeur</span>
  </div>

  <div class="intro-box">
    Toutes les nouvelles fonctionnalités s'intègrent <strong>dans la structure Figma existante</strong>, sans la modifier.
    Les nouveaux écrans (Classes, Bibliothèque, Profil Enseignant) respecteront le design system défini
    (couleurs, typographie, composants, espacement). Aucune fonctionnalité ne nécessite de revoir l'architecture
    de navigation existante.
  </div>

  <table>
    <thead>
      <tr>
        <th>Fonctionnalité bêta</th>
        <th>Écran Figma concerné</th>
        <th>Type d'intégration</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Dark mode</td><td class="screen">Tous les écrans</td><td>Toggle global — variante dark de chaque composant</td></tr>
      <tr><td>Notifications push</td><td class="screen">Profil → Paramètres</td><td>Nouveau sous-écran dans Profil existant</td></tr>
      <tr><td>Partage social</td><td class="screen">Fin de leçon + Profil</td><td>Bouton ajouté aux écrans existants</td></tr>
      <tr><td>Prononciation vocale</td><td class="screen">LessonPage</td><td>Nouveau type d'exercice dans le flux leçon</td></tr>
      <tr><td>Stories quotidiennes</td><td class="screen">Dashboard — Accueil</td><td>Bande horizontale swipeable en haut du feed</td></tr>
      <tr><td>Vidéos TikTok-style</td><td class="screen">VideoPage</td><td>Nouveau onglet "Shorts" dans VideoPage</td></tr>
      <tr><td>Classes en ligne</td><td class="screen">Nouveau + Calendrier + Vidéos</td><td>Nouvel écran + extensions</td></tr>
      <tr><td>Musique & Culture</td><td class="screen">Nouveau écran Bibliothèque</td><td>Accessible depuis Dashboard grille rapide</td></tr>
      <tr><td>Communauté</td><td class="screen">Dashboard — onglet Classement</td><td>Onglet étendu ou 6e onglet nav</td></tr>
    </tbody>
  </table>

  <div class="summary-box">
    <div style="flex:2">
      <h3>Medumba.AI v1.0-bêta — Résumé</h3>
      <p>Flutter · Android + iOS · Dark mode · Classes live · Prononciation IA · Social · NKONI Festival 2026</p>
    </div>
    <div style="text-align:center">
      <div class="summary-num">9</div>
      <div class="summary-label">Nouvelles fonctionnalités</div>
    </div>
    <div style="text-align:center">
      <div class="summary-num">4</div>
      <div class="summary-label">Types de classes</div>
    </div>
    <div style="text-align:center">
      <div class="summary-num">Juil. 2026</div>
      <div class="summary-label">Deadline NKONI</div>
    </div>
  </div>

</div>
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outputPath = path.join(__dirname, 'Medumba_AI_Beta_Roadmap.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF généré :', outputPath);
})();
