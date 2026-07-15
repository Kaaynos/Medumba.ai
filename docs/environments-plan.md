# Environnements — interprétation & plan différé

**Statut : documenté uniquement, pas construit** (décision du 2026-07-15 — pas critique pour le lancement du 26 juillet).

## Note originale de la réunion

> "9 environnements (3 pour les changements, 3 pour les tests, 3 pour la production)"

## Interprétation retenue

3 produits × 3 étapes de déploiement = 9 environnements :

| Produit                    | Dev / Changements        | Test / Staging            | Production                  |
|----------------------------|--------------------------|----------------------------|------------------------------|
| Web app (React/Vite)       | local (`npm run dev`)    | Vercel Preview (par PR)    | Vercel Production (medumba-ia.vercel.app) |
| Mobile app (Flutter)       | `flutter run` local      | build interne (APK debug)  | Play Store / TestFlight     |
| Backend/Supabase           | projet Supabase séparé   | même projet, schéma de test| projet Supabase actuel      |

## État actuel (avant toute construction)

- Web : un seul environnement réel — production directe sur Vercel, pas de staging séparé, pas de preview par PR configurée.
- Mobile : build local (`flutter run`/`flutter build apk`) uniquement, pas de distribution automatisée.
- Supabase : un seul projet, utilisé à la fois en dev et en prod (pas de séparation).

## Ce qu'il faudrait construire (reporté après le 26 juillet)

1. **Vercel preview deployments** — déjà automatique par défaut sur Vercel pour chaque PR GitHub ; à activer/vérifier sur le repo.
2. **Second projet Supabase** (staging) — pour tester des changements de schéma sans risque sur les données de production.
3. **Pipeline CI** (GitHub Actions) — lancer `npm run lint`, `npm run test`, `npm run build` automatiquement sur chaque PR avant merge.
4. **Distribution mobile de test** — Firebase App Distribution ou TestFlight pour partager des builds sans passer par le Play Store.

## Pourquoi ce n'est pas fait maintenant

Vu l'échéance du 26 juillet et le principe "less is more" du boss, construire une vraie infra à 9 environnements aurait mobilisé plusieurs jours pour un bénéfice qui ne joue pas sur la date de lancement. Le strict nécessaire pour le lancement (build propre, tests qui passent, déploiement Vercel) est déjà en place.
