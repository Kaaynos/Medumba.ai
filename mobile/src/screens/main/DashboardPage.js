import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';

const logo = require('../../../assets/logo.png');
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { logoutUser } from '../../services/authService';

const TABS = ['Accueil', 'Classement', 'Défis', 'Premium', 'Profil'];
const TAB_ICONS = ['🏠', '🏆', '⚡', '💎', '👤'];

const LEARNING_PATH = [
  { id: 'l1',  title: 'Salutations',         icon: '👋', xp: 20,  lessonId: 'l1'  },
  { id: 'l7',  title: 'Famille',             icon: '👨‍👩‍👧', xp: 25,  lessonId: 'l7'  },
  { id: 'l5',  title: 'Chiffres & Temps',    icon: '🔢', xp: 30,  lessonId: 'l5'  },
  { id: 'l4',  title: 'Couleurs & Vêtements',icon: '🎨', xp: 25,  lessonId: 'l4'  },
  { id: 'l2',  title: 'Corps humain',        icon: '💪', xp: 35,  lessonId: 'l2'  },
  { id: 'l3',  title: 'Nourriture',          icon: '🍲', xp: 30,  lessonId: 'l3'  },
  { id: 'l10', title: 'Rencontres',          icon: '💬', xp: 40,  lessonId: 'l10' },
  { id: 'l6',  title: 'Animaux',             icon: '🐄', xp: 30,  lessonId: 'l6'  },
  { id: 'l8',  title: 'Nature',              icon: '🌿', xp: 35,  lessonId: 'l8'  },
  { id: 'l9',  title: 'Temps & Horaires',    icon: '⏰', xp: 30,  lessonId: 'l9'  },
  { id: 'l13', title: 'École',               icon: '📚', xp: 40,  lessonId: 'l13' },
  { id: 'l14', title: 'Travail',             icon: '💼', xp: 40,  lessonId: 'l14' },
  { id: 'l15', title: 'Conversations',       icon: '💬', xp: 40,  lessonId: 'l15' },
  { id: 'l16', title: 'Verbes d\'action',    icon: '⚡', xp: 40,  lessonId: 'l16' },
  { id: 'l17', title: 'Culture & Rites',     icon: '🥁', xp: 45,  lessonId: 'l17' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alice M.',  xp: 2840, badge: '🥇' },
  { rank: 2, name: 'Jean K.',   xp: 2560, badge: '🥈' },
  { rank: 3, name: 'Sophie T.', xp: 2190, badge: '🥉' },
  { rank: 4, name: 'Marc D.',   xp: 1980, badge: null  },
  { rank: 5, name: 'Luc N.',    xp: 1740, badge: null  },
  { rank: 6, name: 'Emma W.',   xp: 1600, badge: null  },
  { rank: 7, name: 'Vous',      xp: 1340, badge: null, you: true },
  { rank: 8, name: 'Paul F.',   xp: 1200, badge: null  },
];

const DAILY_CHALLENGES = [
  { icon: '⚡', title: 'Terminer 3 leçons', progress: 2, total: 3, reward: 20 },
  { icon: '🔥', title: 'Maintenir votre série', progress: 1, total: 1, reward: 15 },
  { icon: '⭐', title: 'Gagner 50 XP aujourd\'hui', progress: 34, total: 50, reward: 25 },
];

const GEM_PACKAGES = [
  { gems: 500,  price: '$1.99',  popular: false },
  { gems: 1200, price: '$3.99',  popular: true  },
  { gems: 2000, price: '$5.99',  popular: false },
  { gems: 5000, price: '$12.99', popular: false },
];

export default function DashboardPage({ navigation }) {
  const { userStats, profile } = useApp();
  const [tab, setTab] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const handleLessonPress = (lesson) => {
    navigation.navigate('Lesson', {
      lesson: { id: lesson.lessonId, title: lesson.title },
      profile: profile ?? {},
    });
  };

  const stats = userStats || { streak: 7, xp: 340, gems: 50, hearts: 4 };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top stats bar */}
      <View style={styles.statsBar}>
        <Image source={logo} style={styles.logoSmall} resizeMode="contain" />
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={[styles.statVal, { color: colors.streak }]}>{stats.streak}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={[styles.statVal, { color: colors.xp }]}>{stats.xp} XP</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💎</Text>
          <Text style={[styles.statVal, { color: colors.gem }]}>{stats.gems}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={[styles.statVal, { color: colors.heart }]}>{stats.hearts}</Text>
        </View>
      </View>

      {/* Tab content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* HOME TAB */}
        {tab === 0 && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>
              {profile?.name ? `Bonjour, ${profile.name} 👋` : 'Bienvenue 👋'}
            </Text>
            <Text style={styles.sectionSub}>Continuez votre parcours d'apprentissage</Text>

            {/* Quick actions */}
            <View style={styles.quickGrid}>
              {[
                { icon: '📅', label: 'Calendrier',   color: colors.primaryDark, bg: colors.primaryLight,  screen: 'Calendar'   },
                { icon: '📖', label: 'Dictionnaire', color: colors.success,     bg: colors.successLight,  screen: 'Dictionary' },
                { icon: '🔢', label: 'Numérotation', color: colors.cyan,        bg: colors.cyanLight,     screen: 'Counting'   },
                { icon: '🎥', label: 'Vidéos',       color: colors.purple,      bg: colors.purpleLight,   screen: 'Video'      },
              ].map(q => (
                <TouchableOpacity
                  key={q.label}
                  style={[styles.quickBtn, { backgroundColor: q.bg }]}
                  onPress={() => navigation.navigate(q.screen)}
                >
                  <Text style={styles.quickIcon}>{q.icon}</Text>
                  <Text style={[styles.quickLabel, { color: q.color }]}>{q.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Learning path */}
            <Text style={styles.sectionTitle}>Parcours d'apprentissage</Text>
            <View style={styles.pathList}>
              {LEARNING_PATH.map((lesson, i) => {
                const done = completedLessons.has(lesson.lessonId);
                const active = !done;
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[styles.lessonCard, done && styles.lessonDone]}
                    onPress={() => handleLessonPress(lesson)}
                    activeOpacity={0.75}
                  >
                    <View style={[styles.lessonIcon, { backgroundColor: done ? colors.success + '22' : colors.primaryLight }]}>
                      <Text style={styles.lessonEmoji}>{lesson.icon}</Text>
                    </View>
                    <View style={styles.lessonInfo}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <ProgressBar value={done ? 100 : 0} max={100} color={done ? colors.success : colors.primary} height={6} />
                    </View>
                    <View style={styles.lessonXp}>
                      <Text style={styles.lessonXpText}>+{lesson.xp} XP</Text>
                      {done ? <Text style={styles.doneCheck}>✓</Text> : <Text style={styles.startArrow}>▶</Text>}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* LEADERBOARD TAB */}
        {tab === 1 && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>🏆 Classement de la semaine</Text>
            {LEADERBOARD.map(p => (
              <View key={p.rank} style={[styles.rankRow, p.you && styles.rankYou]}>
                <Text style={styles.rankNum}>{p.badge || `#${p.rank}`}</Text>
                <Text style={[styles.rankName, p.you && { color: colors.primary, fontWeight: '800' }]}>{p.name}</Text>
                <Text style={styles.rankXp}>{p.xp.toLocaleString()} XP</Text>
              </View>
            ))}
          </View>
        )}

        {/* CHALLENGES TAB */}
        {tab === 2 && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>⚡ Défis quotidiens</Text>
            {DAILY_CHALLENGES.map((c, i) => (
              <View key={i} style={styles.challengeCard}>
                <Text style={styles.challengeIcon}>{c.icon}</Text>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{c.title}</Text>
                  <ProgressBar value={c.progress} max={c.total} color={colors.warning} height={6} />
                  <Text style={styles.challengeProgress}>{c.progress}/{c.total}</Text>
                </View>
                <View style={styles.challengeReward}>
                  <Text style={styles.challengeRewardText}>+{c.reward} XP</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PREMIUM TAB */}
        {tab === 3 && (
          <View style={styles.tabContent}>
            <View style={styles.premiumHero}>
              <Text style={styles.premiumIcon}>💎</Text>
              <Text style={styles.premiumTitle}>Passez en Premium</Text>
              <Text style={styles.premiumSub}>Accès illimité, certifications CEPOM, et plus encore.</Text>
            </View>
            <Text style={styles.sectionTitle}>Recharger des gemmes</Text>
            <View style={styles.gemGrid}>
              {GEM_PACKAGES.map(pkg => (
                <TouchableOpacity key={pkg.gems} style={[styles.gemCard, pkg.popular && styles.gemCardPopular]}>
                  {pkg.popular && <Text style={styles.popularTag}>Populaire</Text>}
                  <Text style={styles.gemAmount}>💎 {pkg.gems.toLocaleString()}</Text>
                  <Text style={styles.gemPrice}>{pkg.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* PROFILE TAB */}
        {tab === 4 && (
          <View style={styles.tabContent}>
            <View style={styles.profileHero}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(profile?.name?.[0] || 'M').toUpperCase()}</Text>
              </View>
              <Text style={styles.profileName}>{profile?.name || 'Apprenant Medumba'}</Text>
              <Text style={styles.profileEmail}>{profile?.email || ''}</Text>
            </View>

            <View style={styles.profileStats}>
              {[
                { label: 'Jours de suite', value: stats.streak, icon: '🔥' },
                { label: 'XP total',       value: stats.xp,     icon: '⭐' },
                { label: 'Gemmes',         value: stats.gems,   icon: '💎' },
              ].map(s => (
                <View key={s.label} style={styles.profileStatBox}>
                  <Text style={styles.profileStatIcon}>{s.icon}</Text>
                  <Text style={styles.profileStatVal}>{s.value}</Text>
                  <Text style={styles.profileStatLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={async () => { await logoutUser(); navigation.replace('Welcome'); }}
            >
              <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.tabBar}>
        {TABS.map((label, i) => (
          <TouchableOpacity key={label} style={styles.tabBtn} onPress={() => setTab(i)}>
            <Text style={[styles.tabIcon, tab === i && styles.tabIconActive]}>{TAB_ICONS[i]}</Text>
            <Text style={[styles.tabLabel, tab === i && styles.tabLabelActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  logoSmall: {
    width: 32,
    height: 32,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statIcon: { fontSize: 16 },
  statVal: { fontSize: 14, fontWeight: '800' },
  content: { flex: 1 },
  tabContent: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.black, marginBottom: 4, marginTop: 8 },
  sectionSub: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  quickBtn: {
    flexBasis: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 14,
    padding: 14,
  },
  quickIcon: { fontSize: 20 },
  quickLabel: { fontSize: 13, fontWeight: '700' },
  pathList: { gap: 12, marginBottom: 24 },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  lessonDone: { borderColor: colors.success + '44', backgroundColor: colors.successLight },
  lessonIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  lessonEmoji: { fontSize: 22 },
  lessonInfo: { flex: 1, gap: 6 },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: colors.black },
  lessonXp: { alignItems: 'flex-end', gap: 4 },
  lessonXpText: { fontSize: 11, fontWeight: '700', color: colors.warning },
  doneCheck: { fontSize: 16, color: colors.success },
  startArrow: { fontSize: 14, color: colors.primary, fontWeight: '800' },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.grayBg,
    gap: 12,
  },
  rankYou: { backgroundColor: colors.primaryLight, borderWidth: 1.5, borderColor: colors.primaryBorder },
  rankNum: { fontSize: 18, width: 36 },
  rankName: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.black },
  rankXp: { fontSize: 13, fontWeight: '700', color: colors.warning },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  challengeIcon: { fontSize: 26 },
  challengeInfo: { flex: 1, gap: 6 },
  challengeTitle: { fontSize: 14, fontWeight: '700', color: colors.black },
  challengeProgress: { fontSize: 11, color: colors.textMuted },
  challengeReward: { backgroundColor: colors.xp + '22', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  challengeRewardText: { fontSize: 12, fontWeight: '700', color: colors.warning },
  premiumHero: {
    alignItems: 'center',
    padding: 28,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    marginBottom: 24,
  },
  premiumIcon: { fontSize: 52, marginBottom: 12 },
  premiumTitle: { fontSize: 22, fontWeight: '900', color: colors.black, marginBottom: 8 },
  premiumSub: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  gemGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gemCard: {
    flexBasis: '47%',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    position: 'relative',
  },
  gemCardPopular: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  popularTag: {
    position: 'absolute',
    top: -10,
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    overflow: 'hidden',
  },
  gemAmount: { fontSize: 16, fontWeight: '800', color: colors.black, marginBottom: 4 },
  gemPrice: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },
  profileHero: { alignItems: 'center', paddingVertical: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 36, fontWeight: '900', color: colors.white },
  profileName: { fontSize: 22, fontWeight: '800', color: colors.black, marginBottom: 4 },
  profileEmail: { fontSize: 14, color: colors.textMuted },
  profileStats: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  profileStatBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayBg,
    borderRadius: 16,
    padding: 14,
  },
  profileStatIcon: { fontSize: 24, marginBottom: 4 },
  profileStatVal: { fontSize: 18, fontWeight: '900', color: colors.black },
  profileStatLabel: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
  logoutBtn: {
    borderWidth: 2,
    borderColor: colors.danger,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: colors.danger },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingBottom: 4,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabIcon: { fontSize: 20, marginBottom: 2 },
  tabIconActive: {},
  tabLabel: { fontSize: 10, color: colors.textMuted },
  tabLabelActive: { color: colors.primary, fontWeight: '700' },
});
