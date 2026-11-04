# Medumba.ai — Document de plan : l'application mobile

**Objet :** plan de réalisation de l'application mobile Medumba.ai, pour Android et iPhone
**Date :** 21 octobre 2026
**Statut :** document de planification — le développement n'a pas encore commencé
**Destinataires :** direction du projet, équipe, partenaires, locuteurs

> Ce document explique ce que sera l'application mobile Medumba.ai, comment elle sera réalisée,
> à quel rythme, et quelles décisions restent à prendre. Il est écrit pour être lu par
> quelqu'un qui ne travaille pas dans le développement.

---

## 1. En bref

Medumba.ai dispose d'un site internet complet : des cours, un dictionnaire, des expressions, un jeu
de prononciation, un système de points et de séries. Ce site fonctionne. Mais il n'existe que dans
un navigateur : on ne peut pas l'installer, il ne prévient pas l'apprenant qu'une nouvelle leçon est
disponible, et chaque visite demande de tout retélécharger.

Ce projet consiste à **créer une véritable application mobile** Medumba.ai, installable sur Android
et iPhone, qui fonctionne **avec une connexion internet**, comme le site, mais de façon plus rapide
et plus simple : le contenu est chargé une fois pour toutes, les leçons et la progression se mettent
à jour en temps réel, et l'apprenant reçoit une notification dès qu'une nouvelle leçon est
disponible.

Le travail est estimé à **environ 10 semaines** pour un développeur. Le premier jalon visible sera
une application utilisable avec : création de compte, parcours d'apprentissage, dictionnaire et
prononciation avec la voix réelle des locuteurs.

**Trois décisions doivent être prises par des personnes avant d'aller plus loin** : l'autorisation de
distribuer le contenu linguistique avec l'application, le contenu exact de la première version, et
les moyens de publication dans les magasins d'applications.

---

## 2. Pourquoi une application mobile

| Ce qui manque aujourd'hui | Ce que ça provoque |
|---|---|
| Le site ne s'installe pas : il faut passer par un navigateur, à chaque fois. | Un apprenant de 9 ans ne peut pas « installer » l'apprentissage dans sa poche. |
| Chaque visite au site retélécharge tout : dictionnaire, expressions, enregistrements audio. | Sur une connexion lente ou expensive, l'attente est longue et la batterie s'épuise. |
| Le contenu Medumba est déjà complet et disponible. | Il peut être chargé dans l'application une fois pour toutes : ensuite, tout s'ouvre instantanément, sans rien retélécharger. |
| Le site fonctionne et est utilisé. | L'application ne doit pas le remplacer : elle doit **partager ses données** avec lui. Un même compte, une même progression, sur tous les appareils. |
| Les apprenants ont souvent un téléphone Android ancien, avec peu de mémoire. | L'application doit rester légère et rapide. |

**Ce que l'application mobile n'est pas :** une refonte du site. C'est le même produit, mis dans un
format qui s'installe, qui charge le contenu une seule fois, et qui prévient l'utilisateur quand
il y a du nouveau.

**L'application est une application connectée.** Elle a besoin d'une connexion internet pour
fonctionner normalement : c'est sur le site que vivent les leçons, la progression, le classement et
les classes. La priorité n'est donc pas de faire tourner l'application sans réseau, mais de la faire
bien fonctionner **quand le réseau est lent, faible ou instable** — ce qui est le cas de beaucoup
d'apprenants.

---

## 3. Ce qui existe aujourd'hui

### 3.1 Le site internet — la référence

C'est la source de vérité. Il contient déjà :

- l'inscription, la connexion et la gestion du compte ;
- le parcours d'apprentissage, de l'alphabet aux expressions ;
- le dictionnaire bilingue et le traducteur automatique ;
- le jeu de prononciation, la page alphabet, le calendrier culturel ;
- les points d'expérience, les gemmes, les cœurs et la série de jours consécutifs ;
- le classement, les défis quotidiens et hebdomadaires, les certifications ;
- les portails enseignants et administrateurs.

Le site est **en avance sur tout le reste**. C'est lui qu'il faut reproduire, et non l'inverse.

### 3.2 L'application mobile expérimentale — à ne pas conserver

Une première application mobile a été réalisée entre avril et juin 2026, puis abandonnée. Elle
sert de point de comparaison, mais **ne peut pas servir de base**. Voici pourquoi.

| Problème | Conséquence |
|---|---|
| Elle est branchée sur un autre service de données que le site. | Elle ne partage **aucune** information avec le site : un compte créé sur mobile n'existe pas sur le web. |
| Elle a plusieurs mois de retard sur le site. | Il y a des mois de travail à refaire. |
| Les points, la série et les leçons complétées sont calculés mais **jamais enregistrés**. | La progression de l'apprenant disparaît. |
| Elle simule la voix medumba avec une voix de synthèse française. | C'est **interdit** par les règles du projet : la voix medumba doit toujours être celle d'un locuteur réel. |
| Plusieurs écrans ne mènent nulle part (code de confirmation, changement de mot de passe, catalogue vidéo). | Des impasses visibles par l'utilisateur. |
| Elle contient une copie modifiée du dictionnaire, différente de celle du site. | Deux versions de la même donnée, qui divergent déjà. |

**Conclusion :** on repart de zéro. On garde simplement la liste de ses écrans comme référence de ce
qui avait été prévu. Deux éléments sont récupérés : l'enregistrement audio du comptage et les
icônes de l'application.

### 3.3 Les documents de planification déjà rédigés

Le projet contient déjà plusieurs documents sur ce sujet. Ils ont été lus et évalués.

| Document | Ce qu'il apporte | Ce qu'on en retient |
|---|---|---|
| *FLUTTER_ARCHITECTURE.md* (mars 2026) | Une bonne vision de l'organisation du travail et du fonctionnement de l'application. | Trois de ses choix sont revus (§11.3). |
| *medumba_mobile_architecture.pdf* (avril 2026) | Une vision produit très complète : les 9 modules, les 5 rôles d'utilisateurs, une feuille de route sur 6 mois. | La structure de données qu'il propose **ne correspond pas** à celle réellement en service. On ne l'applique pas (§4.3). |
| *environments-plan.md* (juillet 2026) | La répartition des environnements de travail (développement, test, production) pour les trois produits. | À jour, on s'y conforme. |
| *generate_beta_roadmap.js* | Confirme l'orientation retenue : « la version bêta sera reconstruite en Flutter ». | — |

---

## 4. Les décisions prises

### 4.1 Première version : **les apprenants et leurs parents**

La première version s'adresse **aux apprenants et à leurs parents**. Les portails des enseignants,
des coordinateurs, des modérateurs de contenu, des conseillers et des administrateurs **restent sur
le site** et ne sont pas repris.

**Pourquoi :** ce sont les apprenants qui font vivre la plateforme, c'est le public visé par le
lancement, et c'est le périmètre qui permet de livrer une application de qualité dans un délai
raisonnable. C'est aussi le public qui pose le plus de questions sur la manière dont les données
sont partagées entre les appareils (§6.3) : autant traiter ce sujet tout de suite et correctement.

### 4.2 Contenu linguistique : **chargé dans l'application** *(sous réserve de validation)*

Le dictionnaire (4 257 entrées), les expressions (1 216), les syllabes (1 147) et les termes
de grammaire seront livrés **avec** l'application, et non retéléchargés à chaque usage.

**Pourquoi :** ce sont des fichiers lourds — plus de 4 000 entrées de dictionnaire et plus de
1 000 syllabes, chacune avec ses enregistrements. Les recharger à chaque visite est lent, consomme
de la data et use la batterie. Une fois chargés, tout s'ouvre instantanément, et la recherche
dans le dictionnaire répond sans attendre le réseau.

**Ce que l'application conserve si la connexion tombe :** le dictionnaire, les expressions et les
syllabes déjà téléchargés, ainsi que les enregistrements audio déjà ouverts. **Ce qui nécessite la
connexion :** les leçons, la progression, le classement, les classes, les inscriptions et les
notifications.

**Point d'attention majeur :** un fichier livré avec l'application peut être copié et analysé par
n'importe qui. Cela vaut pour un dictionnaire de plus de 4 000 mots. Or le projet dispose déjà d'un
dispositif de consentement des locuteurs.

> **Le contenu Medumba livré avec l'application doit être autorisé explicitement par Felix, Zenu et
> les locuteurs avant toute diffusion publique.** Ce point conditionne la date de sortie, pas la
> conception. Un plan de repli existe (§11.1) : le contenu est téléchargé depuis le site à la
> première connexion, puis conservé sur l'appareil. L'organisation retenue est la même dans les
> deux cas.

### 4.3 Les données : **celles du site, sans rien ajouter**

L'application utilisera les données déjà en service, celles du site. **Aucune nouvelle donnée ne
sera ajoutée à la base.** Un compte, une progression, un classement : les mêmes sur tous les
appareils.

**Pourquoi :** le document d'architecture le plus complet prévoyait une autre organisation des
données. L'appliquer aurait créé un second ensemble de données, sans lien avec le site, qu'il
aur ensuite fallu synchroniser — un risque inutile, pour un gain nul.

### 4.4 Nouveau développement, sans reprise de l'application expérimentale

On écrit une application neuve. Le code de l'application mobile abandonnée n'est pas repris (§3.2).

La technologie retenue est **Flutter**, qui permet de produire une seule version fonctionnant à la
fois sur Android et sur iPhone, plutôt que deux applications à écrire et à maintenir séparément.

### 4.5 Prévu pour plus tard

La vision produit prévoit, en plus de l'application pour apprenants : un espace de lecture des
publications du CEPOM, les examens de certification de A1 à C1, un tableau de bord de « vitalité
linguistique » par village, la réservation de cours en direct avec les enseignants, et l'assistant
conversationnel « THEO » qui note le ton de la prononciation.

Ces éléments sont **visés pour une version ultérieure**, pas pour la première. Ils demanderont de
nouvelles décisions : l'accès aux contenus sensibles, les paiements, la manière de faire valider
les notes de prononciation.

---

## 5. Ce que l'application fera

### 5.1 Fonctionnalités de la première version

| Domaine | Contenu |
|---|---|
| **Compte** | Inscription avec adresse e-mail et mot de passe, connexion, mot de passe oublié, nouveau mot de passe, confirmation de l'adresse e-mail, déconnexion, session qui reste ouverte. |
| **Premiers pas** | Choix de la langue de l'interface, du niveau (débutant à avancé), de la raison d'apprentissage, des objectifs, du rythme quotidien souhaité, du type de compte (parent ou apprenant), ajout d'un enfant au foyer. |
| **Écran d'accueil** | Points d'expérience, gemmes, cœurs, série de jours consécutifs, niveau atteint, barre de progression, parcours de leçons débloqué au fur et à mesure, coffres à ouvrir, défis du jour et de la semaine, classement des meilleurs apprenants, accès à toutes les rubriques. |
| **Leçons** | Fiches de vocabulaire à retourner, quatre types d'exercices (remise en ordre des mots, choix multiple, écoute et compréhension, appariement), bonus de série pour les bonnes réponses, score final, récompenses, échec et reprise. 18 leçons disponibles, de l'alphabet aux expressions. |
| **Dictionnaire** | Deux rubriques : la recherche locale (français ↔ medumba, avec bascule de sens) et le traducteur automatique. Les mots pronunciationnables sont distingués visuellement de ceux qui n'ont pas d'enregistrement. |
| **Prononciation** | Lecture de chaque syllabe avec sa variante de ton, de chaque expression, de chaque mot enregistré, et de chaque lettre de l'alphabet. |
| **Comptage** | Convertisseur nombre → medumba, avec lecture de l'enregistrement réel des nombres. |
| **Alphabet** | Les 31 lettres, leur son isolé, et la leçon d'alphabet. |
| **Calendrier** | Semaine de 8 jours, noms des mois et des jours en medumba, carte de la série de jours consécutifs, événements culturels. |
| **Profil** | Réglages, changement de langue à tout moment, informations du foyer, déconnexion. |

### 5.2 Ce qui n'est pas prévu dans la première version

Portails des enseignants, des coordinateurs et des modérateurs de contenu · console d'administration ·
espace de lecture du CEPOM · examens de certification A1 à C1 · tableau de bord de ·
vitalité linguistique · réservation de cours en direct · assistant conversationnel THEO · paiement en
ligne (carte bancaire, MTN Mobile Money, Orange Money) · notifications · enregistrement de la voix de
l'apprenant.

> **Aucune de ces fonctions n'est retirée aux utilisateurs actuels : tout reste disponible sur le site.**

---

## 6. Comment l'application fonctionnera

### 6.1 D'où vient le contenu

| Source | Ce qu'elle apporte | Comment elle est gérée |
|---|---|---|
| **Le site** | Les leçons et leur contenu, les questions, les fiches de vocabulaire, le profil, les points, le classement, les classes et les rôles. | L'application lit et écrit les mêmes données que le site, en temps réel. Rien n'est dupliqué, rien n'est recopié. **C'est la source principale : elle exige une connexion internet.** |
| **Les fichiers livrés avec l'application** | Le dictionnaire, les expressions, les syllabes et leurs tons, les termes de grammaire, les certifications, les règles de personnalisation du parcours. | Chargés une fois pour toutes, jamais modifiés à la main (voir §6.2). Ils restent consultables même si la connexion tombe. |
| **Les fichiers audio sur le site** | Les enregistrements : syllabes, mots, phrases, chapitres, berceuses, lettres. | Téléchargés à la demande, comme sur le site, puis conservés pour les prochaines ouvertures. |

### 6.1 bis Ce qui exige internet, et ce qui n'en exige pas

| Fonctionne avec une connexion | Fonctionne aussi sans connexion |
|---|---|
| Création de compte, connexion, mot de passe oublié | Consultation du dictionnaire et de la liste des expressions |
| Chargement des leçons et des questions | Lecture des syllabes, des tons et des enregistrements déjà téléchargés |
| Enregistrement de la progression, des points, de la série | Consultation du profil et des statistiques déjà connues |
| Classement, défis, coffres, badges | Jeu de comptage et page alphabet (enregistrements inclus) |
| Classes avec les enseignants, réservations | — |
| Notifications et messages | — |
| Traducteur automatique | — |

**La règle de conception qui en découle :** quand la connexion est coupée ou très lente, l'application
ne doit **jamais rester bloquée sur un écran vide**. Elle affiche ce qui est déjà connu, indique
clairement que la connexion est nécessaire, propose de réessayer, et **ne perd jamais** ce que
l'apprenant vient de gagner.

### 6.2 La règle d'or du contenu : jamais recopié à la main

Le contenu linguistique medumba est **figé** : sa correction appartient à Felix, Zenu et aux
locuteurs natifs. Le projet interdit d'y toucher sans leur accord.

Pour que l'application embarque ce contenu sans le réécrire, on met en place un **outil de
conversion** : il lit les fichiers de données du site, les transforme en fichiers pour
l'application, et le fait tout seul. Le résultat est **vérifié automatiquement** à chaque
construction : si le contenu livré dans l'application ne correspond plus exactement à la
source, la construction s'arrête et alerte l'équipe.

**Bénéfices :** une seule source de vérité, aucune divergence entre le site et l'application, aucun
risque qu'un ton, un accent ou une nuance tonale soit perdu en chemin, et un gros gain de temps sur
la saisie.

### 6.3 Les comptes, les enfants et le partage des données

C'est la partie la plus délicate, et elle explique pourquoi le périmètre « apprenants » a été choisi.

Le site permet à un parent de gérer **plusieurs enfants**, dont certains n'ont pas leur propre
adresse e-mail : ce sont des profils « sans compte », rattachés au foyer. Le parent est seul autorisé
à suivre et à faire progresser ces enfants. Un adulte peut aussi « réclamer » plus tard un profil
adolescent pour le rattacher à sa propre adresse.

**Conséquence pour l'application :** on ne peut pas supposer que la personne connectée est
l'apprenant affiché. Il faut toujours passer par le foyer. C'est une source classique de bugs, où la
progression d'un enfant se retrouve écrite sur un autre profil.

**Critère de recette non négociable :** un compte créé sur l'application doit retrouver exactement
le même profil, les mêmes points, les mêmes gemmes, la même série et les mêmes leçons complétées
sur le site — et réciproquement. Ce test sera fait à chaque étape clé.

### 6.4 Le son : toujours une voix réelle, jamais de synthèse

C'est une règle non négociable du projet, et le point de contrôle le plus important de ce plan.

Quand l'application prononce un mot, elle suit **exactement** la même cascade que le site :

1. l'enregistrement du locuteur, s'il existe ;
2. sinon, l'enregistrement de la syllabe unique qui compose le mot ;
3. sinon, pour les nombres, l'enregistrement du décompte ;
4. sinon, **rien** : le mot n'est pas proposé.

Aucun mot n'est prononcé par une voix de synthèse. Un mot sans enregistrement réel est **caché**
plutôt que prononcé approximativement. La cascade sera vérifiée par un test automatique sur
l'ensemble du dictionnaire.

### 6.5 Les deux langues, et le défaut déjà rencontré

Le site a connu à plusieurs reprises un problème : certaines phrases restaient en français alors que
l'interface avait été choisie en anglais.

L'application mobile corrige cela **par construction** : tous les textes sont regroupés dans un
unique catalogue, dans les deux langues. Un texte manquant devient une erreur signalée
immédiatement, au lieu d'un oubli qui passe inaperçu. Le changement de langue se fait **à chaud**,
sans redémarrage, comme sur le site.

### 6.6 La progression et la série de jours

Le site fonctionne en double : la progression est conservée immédiatement sur l'appareil, puis
recopiée sur le site. L'application mobile adopte la même logique, avec un point d'amélioration :
**la série de jours consécutifs est calculée à partir des dates réelles**, là où le site se contente
d'ajouter un point à chaque leçon. L'application sera donc plus juste que le site sur ce point ; le
correctif pourra être repris par la suite sur le site.

Cette double conservation a un rôle supplémentaire désormais essentiel : si la connexion coupe au
milieu d'une leçon, **les points déjà gagnés restent acquis** et sont envoyés dès que la connexion
revient. L'apprenant ne perd jamais sa progression à cause du réseau.

---

## 7. L'organisation du travail

Neuf étapes, dans cet ordre. Chacune se termine par une **démonstration vérifiable** : on ne passe à
la suivante que lorsque la précédente est démontrée.

| Étape | Durée | Contenu | On la déclare terminée quand |
|---|---|---|---|
| **0 — Préparation** | 3 à 5 j | Installation de l'outillage de construction d'applications Android, vérification de l'environnement, mise à jour de la liste des fichiers à ne pas conserver dans les archives du projet. | Une application vide s'installe et se lance sur un téléphone Android réel. |
| **1 — Socle** | 1 sem | Création du projet, identité visuelle (clair et sombre), catalogues de texte dans les deux langues, navigation avec contrôle d'accès, branchement sur le site, et **tout le parcours de compte** : inscription, connexion, mot de passe oublié, confirmation d'e-mail, session qui reste ouverte. | Une personne s'inscrit et se connecte pour de vrai, sur un téléphone. |
| **2 — Contenu** | 3 à 4 j | Outil de conversion du contenu linguistique, chargement des fichiers livrés avec l'application, contrôle automatique de l'intégrité. | Le dictionnaire affiche exactement les 4 257 entrées attendues, la recherche et la bascule de sens fonctionnent, et il n'y a **aucun écart** avec la source. |
| **3 — Premiers pas et accueil** | 1,5 sem | Parcours d'inscription, profil, foyer et enfants, points, gemmes, cœurs, série, barre de progression, parcours de leçons, coffres, défis, classement, rubriques. | Le profil de test affiche **exactement** les mêmes statistiques que sur le site. |
| **4 — Moteur de leçons** | 2 sem | Règles de choix des questions selon le niveau et les objectifs, les quatre types d'exercices, les fiches de vocabulaire, les bonus de série, le score, le seuil de réussite, la reprise, l'enregistrement de la progression. | Les 18 leçons se jouent d'un bout à l'autre, et les points gagnés sont bien conservés. |
| **5 — Son** | 1 sem | Lecture des enregistrements, cascade de secours, découpage des phrases en syllabes, variantes de ton, chapitres de leçons, lettres. | Syllabes, nombres, mots et lettres se prononcent, **uniquement avec la voix d'un locuteur réel**. |
| **6 — Dictionnaire, comptage, alphabet, calendrier** | 1 sem | Les deux rubriques du dictionnaire, le traducteur, le jeu de comptage, les 31 lettres, la semaine de 8 jours. | Les mêmes saisies donnent les mêmes résultats que sur le site. |
| **7 — Réseau lent, pannes et finitions** | 1 sem | Conservation des fichiers de contenu et des enregistrements déjà téléchargés, conservation des points gagnés en attendant la connexion, animations, accessibilité, messages d'erreur clairs, bouton « réessayer ». | Sur une connexion lente ou coupée, l'application reste utilisable, indique ce qui manque et ne perd jamais la progression. |
| **8 — Publication** | 1 sem | Automatisation des tests et de la construction, icônes, écran de démarrage, signature, mise à disposition interne. | L'application signée est installée par l'équipe de test. |

**Durée totale estimée : environ 10 semaines pour un développeur.**

Deux étapes concentrent le risque : l'**étape 2**, qui organise toute la gestion du contenu, et
l'**étape 4**, le moteur de leçons, qui définit la qualité perçue de l'application. Si l'une des deux
déborde, c'est le calendrier qui s'ajuste, jamais la qualité des données.

---

## 8. Comment on vérifie que l'application fonctionne

| Type de vérification | Ce qu'elle contrôle |
|---|---|
| **Tests automatiques** | La règle « voix réelle uniquement », le découpage des phrases en syllabes, le choix des questions selon le niveau, le calcul du score et des bonus, la série de jours, la conversion du contenu. |
| **Tests d'affichage** | Le rendu des quatre types d'exercices, le changement de langue, la barre de progression, chaque élément du parcours. |
| **Tests de parcours complet** | Inscription → premiers pas → leçon → fin de leçon → statistiques, exécutés sur un appareil réel. |
| **Contrôle du contenu** | Le contenu livré dans l'application est identique à la source ; le nombre d'entrées est exact ; aucun ton, aucun accent n'a été perdu. |
| **Contrôle d'accessibilité** | Contraste des couleurs, taille des zones tactiles, lecture par les lecteurs d'écran. |
| **Contrôle réseau** | Sur une connexion lente, faible ou coupée : l'application reste utilisable, affiche un message clair, propose de réessayer et ne perd jamais la progression. Sur une connexion rétablie, tout se met à jour. |

La suite de tests automatisés existante couvre uniquement le site ; elle reste telle quelle, et
l'application disposera de ses propres tests.

---

## 9. Ce qu'il faut préparer

| Élément | Action | Nécessaire pour |
|---|---|---|
| Outillage de construction Android | Installation | Construire et tester l'application Android |
| Signature de l'application | À générer, conservée en lieu sûr | Publication sur le Play Store |
| Compte Google Play Console | À créer (frais annuels) | Publication Android |
| Compte développeur Apple | À créer (frais annuels) | Publication iPhone |
| Ordinateur Mac ou service de construction à distance | À mettre en place | Construire l'application iPhone : **impossible depuis le poste actuel**, qui tourne sous Windows |
| Validation de diffusion du contenu | Felix, Zenu et les locuteurs | Version publique |

---

## 10. Les risques

| Risque | Probabilité | Impact | Ce que nous faisons |
|---|---|---|---|
| Le contenu livré dans l'application n'est pas autorisé à être diffusé | Moyenne | Élevé | Validation avant toute diffusion ; plan de repli prêt (§11.1) : téléchargement depuis le site à la première connexion. |
| Les enregistrements audio ne se jouent pas dans l'application | Moyenne | Élevé | Contrôle automatique de la règle « voix réelle » sur l'ensemble du dictionnaire. |
| La progression d'un enfant s'écrit sur le mauvais profil | Moyenne | Élevé | Test systématique entre l'application et le site, dans les deux sens, à chaque étape clé. |
| L'inscription enregistre des informations incomplètes | Moyenne | Élevé | Reprendre exactement ce qui est attendu ; ce défaut a déjà existé sur le site et y a été corrigé depuis. |
| L'écran d'accueil du site est très volumineux | Élevée | Moyen | Découpage en sous-tâches avec une liste fermée du contenu à reprendre. |
| La construction pour iPhone est impossible en local | Certaine | Moyen | Mise en place d'un service de construction à distance, prévu à l'étape 8 ; aucun blocage sur la première version. |
| Le contenu du site et celui de l'application divergent | Moyenne | Élevé | Conversion automatique et contrôle d'égalité à chaque construction. |
| La connexion internet est lente, faible ou instable chez les apprenants | Élevée | Élevé | Le contenu lourd est livré avec l'application pour éviter les rechargements ; l'application gère la coupure de connexion sans rester bloquée et sans perdre la progression ; test systématique sur connexion dégradée. |
| L'application est lente ou consomme trop de mémoire sur un téléphone ancien | Moyenne | Moyen | Application légère ; le contenu est chargé une fois ; test sur un téléphone d'entrée de gamme avant diffusion. |
| L'outillage de développement Android est volumineux | Certaine | Moyen | Il est exclu des archives du projet dès l'étape 0. |

---

## 11. Les décisions à prendre

### 11.1 Pour la direction

| # | Question | Recommandation |
|---|---|---|
| 1 | Le contenu linguistique complet peut-il être livré avec l'application et distribué ? | **À valider par Felix, Zenu et les locuteurs** avant toute diffusion. |
| 2 | Quelle part du contenu livrer avec l'application ? | Dépend de la réponse précédente. En cas de refus, seule une sélection validée est livrée. |
| 3 | La première version couvre-t-elle uniquement les apprenants, ou aussi les parents et les enseignants ? | **Apprenants et parents uniquement** pour cette version (§4.1). |
| 4 | Faut-il corriger aussi la logique de série de jours sur le site ? | **Oui**, et c'est sans risque : l'application donnera la règle correcte. |
| 5 | Qui crée les comptes de publication ? | Administrateur du projet. |
| 6 | La suite vision produit (CEPOM, certification, cours en direct) est-elle confirmée pour une version ultérieure ? | **À confirmer** avant d'engager du travail sur ces modules. |
| 7 | L'application doit-elle rester utilisable quand la connexion tombe, ou est-ce acceptable qu'elle attende la connexion ? | **Recommandation :** rester utilisable sur le contenu déjà téléchargé et ne jamais perdre la progression. Le contenu principal reste connecté. |

### 11.2 Pour l'équipe technique

| Sujet | Position retenue | Ce qu'on écarte et pourquoi |
|---|---|---|
| Données | Celles du site, sans rien ajouter. | L'organisation proposée par le document d'avril 2026 : elle créerait un second ensemble de données sans lien avec le site. |
| Conservation sur l'appareil | Simple et légère : les fichiers de contenu et les points gagnés en attente. | Une base locale complète : elle n'est justifiée que si les tests sur connexion dégradée le montrent. |
| Lecture audio | Un seul outil de référence, capable de lire le format des enregistrements et de se déplacer à l'intérieur. | Un outil de voix de synthèse : interdit par la règle « voix réelle uniquement ». |
| Traduction automatique | On réutilise le service déjà en service, avec le même format d'échange. | Créer un nouveau service : le site en dispose déjà d'un. |
| Suivi de l'usage et des erreurs | On réutilise les deux outils déjà en service sur le site, pour avoir les mêmes tableaux de bord. | Des outils différents : cela fragmenterait le suivi. |

### 11.3 Deux points à préciser

**Ce que l'application ne pourra pas faire.** Le site dispose de quelques fonctions qui n'existent que
sur le serveur web : conversation avec l'assistant, envoi d'e-mails, réservation de cours en direct.
Elles n'ont pas été reprises dans la première version. L'onglet « traducteur automatique », lui, est
conservé : il utilise un service directement accessible.

**Le document d'architecture de mars 2026** reste une bonne base de réflexion, mais trois de ses
choix sont revus : le service d'authentification (on utilise celui du site, pas un nouveau), la
conservation locale (allégée) et la génération automatique du code (différée, elle fait perdre du
temps à chaque construction sans gain immédiat).

**Le document d'architecture d'avril 2026** présente l'application comme pouvant fonctionner sans
aucune connexion. Ce n'est plus l'orientation retenue : l'application est **connectée**, et la
priorité donnée à la qualité du réseau (rapidité, messages clairs, reprise après coupure) remplace
celle du fonctionnement sans réseau (§6.1 bis, §10).

---

## 12. Le résultat attendu

La première version est livrable quand **tous** ces points sont vrais :

1. Les vérifications automatisées passent sans avertissement, et le contenu livré dans
   l'application est **identique** à la source, sans ton ni accent perdu.
2. Un compte créé sur l'application retrouve sur le site le même profil, les mêmes points, les mêmes
   gemmes, la même série et les mêmes leçons complétées — et réciproquement.
3. Les 18 leçons se jouent d'un bout à l'autre, et la progression est bien enregistrée.
4. **Tout** le son medumba joué est un enregistrement réel. Aucun mot n'est prononcé par une voix de
   synthèse. Cette règle est vérifiée automatiquement.
5. Le dictionnaire contient les 4 257 entrées, avec bascule de sens, et les mots sans enregistrement
   sont distingués.
6. L'interface bascule entre français et anglais à chaud, sans redémarrage, et **aucun** texte n'est
   figé en français.
7. L'application fonctionne normalement avec une connexion internet. Sur une connexion lente ou
   coupée, elle reste utilisable sur le contenu déjà téléchargé, affiche un message clair, propose
   de réessayer, et **ne perd jamais** la progression.
8. Les enfants d'un même foyer ont des progressions séparées et cohérentes.
9. L'application Android est publiée en diffusion interne et testée sur au moins un téléphone réel
   et un iPhone.
10. Une note d'accompagnement décrit l'organisation retenue, la gestion du contenu et la manière de
    mettre à jour le contenu linguistique.

---

## 13. Ce qu'il ne faut pas faire

- ❌ Modifier le contenu Medumba à la main, pour le recopier ou le « corriger ».
- ❌ Prononcer le medumba avec une voix de synthèse.
- ❌ Ajouter de nouvelles données à la base sans validation.
- ❌ Reprendre l'application mobile expérimentale.
- ❌ Conserver l'ancienne méthode de traduction des textes, à l'origine du problème de langue déjà
  rencontré.
- ❌ Diffuser l'application sans la validation de diffusion du contenu.
- ❌ Ajouter un outil technique nouveau sans demande préalable.
- ❌ Promettre un fonctionnement complet sans internet : l'application est une application connectée.
- ❌ Laisser l'application bloquée sur un écran vide quand la connexion tombe.

---

## 14. Prochaine étape

| Étape | Contenu | Ce qui est nécessaire pour avancer |
|---|---|---|
| 1 | Préparation de l'environnement | Accord pour modifier la liste des fichiers exclus des archives du projet. |
| 2 | Socle de l'application | **Autorisation de développer.** |
| 3 | Conversion du contenu | Autorisation de créer l'outil de conversion. |
| 4 | Étapes 3 à 8 | Idem, étape par étape. |
| 5 | Relecture et validation avant diffusion | Les validations du §11.1. |

**Aucun développement ne sera commencé avant accord explicite.**
