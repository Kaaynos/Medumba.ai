import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MEDUMBA_VOCAB }       from '../../data/medumbaVocab';
import { MEDUMBA_EXPRESSIONS } from '../../data/medumbaExpressions';
import { colors } from '../../theme/colors';

const AI_URL = 'https://medumba-ai.onrender.com/api/translate';

export default function DictionaryPage({ navigation }) {

  // ── Tab ───────────────────────────────────────────────────────────────────
  const [tab, setTab] = useState('dict'); // 'dict' | 'ai'

  // ── Dictionary tab ────────────────────────────────────────────────────────
  const [query,     setQuery]     = useState('');
  const [direction, setDirection] = useState('fr2med');

  // Combined source: simple vocab first, then full expressions (deduplicated)
  const ALL_WORDS = useMemo(() => {
    const seen = new Set(MEDUMBA_VOCAB.map(v => v.fr.toLowerCase()));
    const extras = MEDUMBA_EXPRESSIONS.filter(e => !seen.has(e.fr.toLowerCase()));
    return [...MEDUMBA_VOCAB, ...extras];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return MEDUMBA_VOCAB; // default: simple words only
    const q = query.toLowerCase();
    return ALL_WORDS.filter(e =>
      direction === 'fr2med'
        ? e.fr.toLowerCase().includes(q)
        : e.medumba.toLowerCase().includes(q)
    ).slice(0, 60);
  }, [query, direction, ALL_WORDS]);

  const noResults = query.trim().length > 0 && results.length === 0;

  const switchToAi = () => {
    setAiInput(query);
    setAiDir(direction === 'fr2med' ? 'fr-md' : 'md-fr');
    setTab('ai');
  };

  // ── AI tab ────────────────────────────────────────────────────────────────
  const [aiInput,   setAiInput]   = useState('');
  const [aiDir,     setAiDir]     = useState('fr-md');
  const [aiResult,  setAiResult]  = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError,   setAiError]   = useState('');

  const translate = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResult('');
    setAiError('');
    try {
      const res  = await fetch(AI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiInput.trim(), direction: aiDir }),
      });
      const data = await res.json();
      setAiResult(data.translation || data.result || JSON.stringify(data));
    } catch {
      setAiError('Erreur de connexion. Vérifiez votre réseau.');
    } finally {
      setAiLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medumba</Text>
      </View>

      {/* ── Tab bar ── */}
      <View style={styles.tabBar}>
        {[
          { id: 'dict', icon: '📖', label: 'Dictionnaire',  active: styles.tabBtnActiveDct },
          { id: 'ai',   icon: '🤖', label: 'Traducteur IA', active: styles.tabBtnActiveAI  },
        ].map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tabBtn, tab === t.id && t.active]}
            onPress={() => setTab(t.id)}
          >
            <Text style={[styles.tabBtnText, tab === t.id && styles.tabBtnTextActive]}>
              {t.icon}  {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ─── DICTIONARY TAB ─────────────────────────────────────────────────── */}
      {tab === 'dict' && (
        <>
          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder={direction === 'fr2med' ? 'Rechercher en français…' : 'Rechercher en Medumba…'}
              placeholderTextColor={colors.textMuted}
              autoCorrect={false}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Text style={styles.clearBtn}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.directionRow}>
            {[
              { id: 'fr2med', label: '🇫🇷 → Medumba' },
              { id: 'med2fr', label: '🌍 → Français' },
            ].map(d => (
              <TouchableOpacity
                key={d.id}
                style={[styles.dirBtn, direction === d.id && styles.dirBtnActive]}
                onPress={() => { setDirection(d.id); setQuery(''); }}
              >
                <Text style={[styles.dirBtnText, direction === d.id && styles.dirBtnTextActive]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.countText}>
            {query
              ? `${results.length} résultat(s)`
              : `${MEDUMBA_VOCAB.length} mots · recherche dans ${ALL_WORDS.length} entrées`}
          </Text>

          {noResults ? (
            <View style={styles.noResultWrap}>
              <Text style={styles.noResultEmoji}>🔍</Text>
              <Text style={styles.noResultTitle}>Aucun résultat pour « {query} »</Text>
              <Text style={styles.noResultSub}>
                Ce mot n'est peut-être pas encore dans le dictionnaire.
              </Text>
              <TouchableOpacity style={styles.aiSuggestBtn} onPress={switchToAi}>
                <Text style={styles.aiSuggestText}>🤖 Essayer le Traducteur IA</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(_, i) => String(i)}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.frText}>
                    {direction === 'fr2med' ? item.fr : item.medumba}
                  </Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.medumbaText}>
                    {direction === 'fr2med' ? item.medumba : item.fr}
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </>
      )}

      {/* ─── AI TRANSLATOR TAB ──────────────────────────────────────────────── */}
      {tab === 'ai' && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.aiContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.aiBanner}>
              <Text style={styles.aiBannerText}>
                🤖 Le Traducteur IA utilise un modèle entraîné sur le Medumba.
                Il est séparé du dictionnaire et peut faire des erreurs.
              </Text>
            </View>

            <View style={styles.directionRow}>
              {[
                { id: 'fr-md', label: '🇫🇷 Français → Medumba' },
                { id: 'md-fr', label: '🌍 Medumba → Français' },
              ].map(d => (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.dirBtn, aiDir === d.id && styles.dirBtnActiveAI]}
                  onPress={() => setAiDir(d.id)}
                >
                  <Text style={[styles.dirBtnText, aiDir === d.id && styles.dirBtnTextActiveAI]}>
                    {d.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.aiLabel}>TEXTE À TRADUIRE</Text>
            <TextInput
              style={styles.aiTextarea}
              value={aiInput}
              onChangeText={setAiInput}
              placeholder={
                aiDir === 'fr-md'
                  ? 'Entrez un texte en français…'
                  : 'Entrez un texte en Medumba…'
              }
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.aiBtn, (!aiInput.trim() || aiLoading) && styles.aiBtnDisabled]}
              onPress={translate}
              disabled={!aiInput.trim() || aiLoading}
            >
              {aiLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.aiBtnText}>🤖 Traduire</Text>
              }
            </TouchableOpacity>

            {aiResult !== '' && (
              <View style={styles.aiResultCard}>
                <Text style={styles.aiResultLabel}>TRADUCTION</Text>
                <Text style={styles.aiResultText}>{aiResult}</Text>
              </View>
            )}

            {aiError !== '' && (
              <View style={[styles.aiResultCard, { backgroundColor: '#fef2f2', borderColor: '#fca5a5' }]}>
                <Text style={[styles.aiResultLabel, { color: '#dc2626' }]}>ERREUR</Text>
                <Text style={[styles.aiResultText, { color: '#dc2626' }]}>{aiError}</Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12,
  },
  backBtn: { paddingRight: 4 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: colors.black },

  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tabBtn: {
    flex: 1, paddingVertical: 13, alignItems: 'center',
    borderBottomWidth: 3, borderBottomColor: 'transparent',
  },
  tabBtnActiveDct: { borderBottomColor: colors.success },
  tabBtnActiveAI:  { borderBottomColor: colors.purple },
  tabBtnText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tabBtnTextActive: { color: colors.black, fontWeight: '800' },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginTop: 12, marginBottom: 10,
    backgroundColor: colors.grayBg, borderRadius: 12,
    paddingHorizontal: 12, borderWidth: 1.5, borderColor: colors.border, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.black },
  clearBtn: { fontSize: 14, color: colors.textMuted, padding: 4 },

  directionRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 8 },
  dirBtn: {
    flex: 1, paddingVertical: 8, borderRadius: 99, alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white,
  },
  dirBtnActive:         { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  dirBtnActiveAI:       { borderColor: colors.purple,  backgroundColor: colors.purpleLight  },
  dirBtnText:           { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  dirBtnTextActive:     { color: colors.primary, fontWeight: '800' },
  dirBtnTextActiveAI:   { color: colors.purple,  fontWeight: '800' },

  countText: { fontSize: 12, color: colors.textMuted, paddingHorizontal: 16, marginBottom: 4 },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { paddingVertical: 12, gap: 4 },
  frText: { fontSize: 14, fontWeight: '600', color: colors.black },
  arrow: { fontSize: 12, color: colors.textMuted },
  medumbaText: { fontSize: 15, fontWeight: '700', color: colors.primary, lineHeight: 22 },
  separator: { height: 1, backgroundColor: colors.border },

  noResultWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  noResultEmoji: { fontSize: 48 },
  noResultTitle: { fontSize: 16, fontWeight: '800', color: colors.black, textAlign: 'center' },
  noResultSub:   { fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  aiSuggestBtn: {
    marginTop: 8, backgroundColor: colors.purple,
    borderRadius: 999, paddingHorizontal: 24, paddingVertical: 12,
  },
  aiSuggestText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  aiContent: { padding: 16, paddingBottom: 48 },
  aiBanner: {
    backgroundColor: colors.purpleLight, borderWidth: 1, borderColor: colors.purpleBorder,
    borderRadius: 14, padding: 14, marginBottom: 16,
  },
  aiBannerText: { fontSize: 13, color: colors.purple, lineHeight: 19, fontWeight: '600' },
  aiLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.8, marginBottom: 6 },
  aiTextarea: {
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 14,
    padding: 14, fontSize: 15, color: colors.black,
    backgroundColor: colors.grayBg, minHeight: 110, marginBottom: 12,
  },
  aiBtn: {
    backgroundColor: colors.purple, borderRadius: 999,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
  },
  aiBtnDisabled: { backgroundColor: colors.grayLight },
  aiBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  aiResultCard: {
    borderWidth: 1.5, borderColor: colors.purpleBorder,
    backgroundColor: colors.purpleLight, borderRadius: 16, padding: 16, gap: 8,
  },
  aiResultLabel: { fontSize: 11, fontWeight: '700', color: colors.purple, letterSpacing: 0.8 },
  aiResultText:  { fontSize: 16, fontWeight: '700', color: colors.black, lineHeight: 24 },
});
