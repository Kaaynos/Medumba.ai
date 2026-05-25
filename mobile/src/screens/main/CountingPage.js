import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { colors } from '../../theme/colors';

// ── Medumba number system ─────────────────────────────────────────────────
const _U = ["bαnbαn","ncʉ'","bα̂","tad","kuὰ","tὰn","ntogə","sὰmbα̂","fomə","bwə̀'ə"];
const _C = ["","ncʉ'","bα̂","tad","kuὰ","tὰn","ntôg","sὰmbα̂","fôm","bwə̀'ə̂"];
const _T = ["","gham","ŋambα̂","ŋamntad","ŋamkuὰ","ŋamntὰn","ŋamntogə","ŋamsὰmbα̂","ŋamfomə","ŋambwə̀'ə"];
const _B = ["","","bonbα̂","bontad","bonkuὰ","bontὰn","bonntôg","bonsὰmbα̂","bonfôm","bonbwə̀'ə"];
const _H = ["","nkʉ","nkʉbα̂","nkʉtad","nkʉkuὰ","nkʉtὰn","nkʉntogə","nkʉsὰmbα̂","nkʉfomə","nkʉbwə̀'ə"];

function toMedumba(n) {
  if (n === 0) return "bαnbαn";
  if (n === 1000) return "ncaꞌ";
  const h = Math.floor(n / 100), r = n % 100, d = Math.floor(r / 10), u = r % 10;
  if (h > 0) {
    const hun = _H[h];
    if (r === 0) return hun;
    if (r <= 9) return _C[r] + "tû " + hun;
    if (r === 10) return "mɛnmbʉ̂m " + hun;
    if (r <= 19) return "ncòb" + _C[u] + " mɛnmbʉ̂m " + hun;
    const bt = _B[d];
    return u === 0 ? bt + " " + hun : "ncòb" + _C[u] + " " + bt + " " + hun;
  }
  if (n <= 9) return _U[n];
  if (n === 10) return "gham";
  if (n <= 19) return "ncòb" + _C[u] + " gham";
  return u === 0 ? _T[d] : "ncòb" + _C[u] + " " + _T[d];
}

// ── Audio timestamps (seconds) from vocal-count-medumba.ogg ──────────────
const AUDIO_MAP = {
  0:    [2.50,  3.60],
  1:    [5.20,  6.05],
  2:    [7.90,  8.70],
  3:    [10.90, 11.40],
  4:    [13.45, 14.15],
  5:    [16.60, 17.10],
  6:    [18.75, 19.65],
  7:    [21.30, 22.35],
  8:    [23.95, 24.70],
  9:    [26.40, 27.30],
  10:   [28.95, 29.55],
  11:   [31.40, 33.35],
  12:   [34.85, 37.00],
  13:   [38.50, 40.35],
  14:   [41.85, 43.60],
  15:   [45.05, 46.75],
  16:   [48.20, 50.05],
  17:   [51.35, 53.45],
  18:   [54.70, 56.70],
  19:   [57.95, 60.00],
  20:   [73.25, 73.95],
  30:   [74.70, 76.45],
  40:   [77.95, 79.80],
  50:   [80.10, 83.00],
  60:   [83.35, 84.15],
  70:   [86.85, 87.65],
  80:   [90.20, 93.30],
  90:   [94.65, 95.80],
  100:  [97.60, 99.20],
  1000: [100.75, 102.55],
};

// 0–20 + multiples of 10 up to 1000
const BASE_NUMBERS = [
  ...Array.from({ length: 21 }, (_, i) => i),
  30, 40, 50, 60, 70, 80, 90,
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
].map(n => ({ n, medumba: toMedumba(n) }));

export default function CountingPage({ navigation }) {
  const [inputVal,  setInputVal]  = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [speaking,  setSpeaking]  = useState(null);

  const soundRef   = useRef(null);
  const stopTimer  = useRef(null);

  // Load audio mode on mount
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
    return () => {
      // Cleanup on unmount
      if (stopTimer.current) clearTimeout(stopTimer.current);
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const stopCurrent = useCallback(async () => {
    if (stopTimer.current) { clearTimeout(stopTimer.current); stopTimer.current = null; }
    if (soundRef.current) {
      try { await soundRef.current.stopAsync(); } catch (_) {}
    }
    setSpeaking(null);
  }, []);

  const playClip = useCallback(async (startSec, endSec, id) => {
    await stopCurrent();

    try {
      // Unload previous sound if any
      if (soundRef.current) { await soundRef.current.unloadAsync(); soundRef.current = null; }

      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/vocal-count-medumba.ogg'),
        { shouldPlay: false, positionMillis: Math.round(startSec * 1000) }
      );
      soundRef.current = sound;

      setSpeaking(id);
      await sound.playAsync();

      const durationMs = Math.round((endSec - startSec) * 1000);
      stopTimer.current = setTimeout(async () => {
        try { await sound.stopAsync(); } catch (_) {}
        setSpeaking(null);
      }, durationMs);

    } catch (e) {
      console.warn('Audio clip failed, falling back to TTS:', e);
      speakTTS(null, id);
    }
  }, [stopCurrent]);

  const speakTTS = useCallback((text, id) => {
    setSpeaking(id);
    Speech.speak(text ?? toMedumba(id), {
      language: 'fr-FR',
      rate: 0.8,
      onDone:  () => setSpeaking(null),
      onError: () => setSpeaking(null),
    });
  }, []);

  const play = useCallback(async (n, medumbaText, id) => {
    // If already speaking this item → stop
    if (speaking === id) { await stopCurrent(); Speech.stop(); return; }

    const seg = AUDIO_MAP[n];
    if (seg) {
      await playClip(seg[0], seg[1], id);
    } else {
      // No clip → TTS fallback
      await stopCurrent();
      speakTTS(medumbaText, id);
    }
  }, [speaking, playClip, speakTTS, stopCurrent]);

  const converted = inputVal !== ''
    ? toMedumba(Math.max(0, Math.min(1000, parseInt(inputVal) || 0)))
    : '';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Numérotation Medumba</Text>
      </View>

      {/* Sub-tabs */}
      <View style={styles.subTabs}>
        {['list', 'calc'].map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.subTab, activeTab === t && styles.subTabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.subTabText, activeTab === t && styles.subTabTextActive]}>
              {t === 'list' ? '📋 Liste' : '🔢 Convertisseur'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── LIST TAB ── */}
      {activeTab === 'list' && (
        <FlatList
          data={BASE_NUMBERS}
          keyExtractor={item => String(item.n)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const active  = speaking === item.n;
            const hasClip = AUDIO_MAP[item.n] != null;
            return (
              <TouchableOpacity
                style={styles.numberCard}
                onPress={() => play(item.n, item.medumba, item.n)}
                activeOpacity={0.75}
              >
                <View style={styles.numberBadge}>
                  <Text style={styles.numberDigit}>{item.n}</Text>
                </View>
                <View style={styles.numberInfo}>
                  <Text style={styles.numberMedumba}>{item.medumba}</Text>
                  {hasClip && (
                    <Text style={styles.clipBadge}>🎙 enregistrement</Text>
                  )}
                </View>
                <View style={[styles.speakBtn, active && styles.speakBtnActive]}>
                  <Text style={styles.speakIcon}>{active ? '🔊' : '🔈'}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* ── CONVERTER TAB ── */}
      {activeTab === 'calc' && (
        <ScrollView contentContainerStyle={styles.calcContent}>
          <Text style={styles.calcLabel}>Entrez un nombre (0–1000)</Text>
          <TextInput
            style={styles.calcInput}
            value={inputVal}
            onChangeText={setInputVal}
            keyboardType="number-pad"
            placeholder="Ex: 42"
            placeholderTextColor={colors.textMuted}
            maxLength={4}
          />

          {converted !== '' && (() => {
            const num = parseInt(inputVal) || 0;
            const id  = 'conv';
            return (
              <TouchableOpacity
                style={styles.resultCard}
                onPress={() => play(num, converted, id)}
                activeOpacity={0.8}
              >
                <Text style={styles.resultNum}>{inputVal}</Text>
                <Text style={styles.resultArrow}>→</Text>
                <Text style={styles.resultMedumba}>{converted}</Text>
                <Text style={styles.resultSpeakIcon}>
                  {speaking === id ? '🔊' : '🔈'}
                </Text>
              </TouchableOpacity>
            );
          })()}

          {/* Number pad */}
          <View style={styles.numPad}>
            {[['1','2','3'],['4','5','6'],['7','8','9'],['0','⌫','C']].map((row, ri) => (
              <View key={ri} style={styles.numPadRow}>
                {row.map(key => (
                  <TouchableOpacity
                    key={key}
                    style={styles.numKey}
                    onPress={() => {
                      if (key === '⌫')            setInputVal(v => v.slice(0, -1));
                      else if (key === 'C')        setInputVal('');
                      else if (inputVal.length < 4) setInputVal(v => v + key);
                    }}
                  >
                    <Text style={styles.numKeyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
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

  subTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  subTab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  subTabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  subTabText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  subTabTextActive: { color: colors.primary, fontWeight: '800' },

  listContent: { padding: 16, gap: 10 },
  numberCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.white,
  },
  numberBadge: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  numberDigit:  { fontSize: 18, fontWeight: '900', color: colors.primary },
  numberInfo:   { flex: 1, gap: 2 },
  numberMedumba:{ fontSize: 17, fontWeight: '700', color: colors.black },
  clipBadge:    { fontSize: 10, color: colors.success, fontWeight: '600' },
  speakBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.grayBg,
    borderWidth: 1.5, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  speakBtnActive: { backgroundColor: colors.primaryLight, borderColor: colors.primaryBorder },
  speakIcon: { fontSize: 18 },

  calcContent: { padding: 24, alignItems: 'center' },
  calcLabel: { fontSize: 15, fontWeight: '600', color: colors.textMuted, marginBottom: 12 },
  calcInput: {
    width: '100%', borderWidth: 2, borderColor: colors.primary,
    borderRadius: 14, padding: 16, fontSize: 24, fontWeight: '800',
    color: colors.black, textAlign: 'center', marginBottom: 16,
    backgroundColor: colors.grayBg,
  },
  resultCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.primaryLight, borderRadius: 16,
    padding: 20, width: '100%', justifyContent: 'center', marginBottom: 28,
  },
  resultNum:       { fontSize: 22, fontWeight: '900', color: colors.black },
  resultArrow:     { fontSize: 20, color: colors.textMuted },
  resultMedumba:   { fontSize: 22, fontWeight: '900', color: colors.primary, flex: 1 },
  resultSpeakIcon: { fontSize: 22 },

  numPad: { width: '100%', gap: 10 },
  numPadRow: { flexDirection: 'row', gap: 10 },
  numKey: {
    flex: 1, paddingVertical: 18, borderRadius: 14,
    backgroundColor: colors.grayBg, alignItems: 'center',
  },
  numKeyText: { fontSize: 20, fontWeight: '700', color: colors.black },
});
