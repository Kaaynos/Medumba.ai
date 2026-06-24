"""
transcribe_audio.py
Transcrit les 30 chapitres phrasebook avec faster-whisper (modele small)
"""
import os, json, sys
sys.stdout.reconfigure(encoding='utf-8')
from faster_whisper import WhisperModel

AUDIO_FOLDER = r"C:\Users\ndjan\Downloads\audio medumba"
OUTPUT_FILE  = r"C:\Users\ndjan\Downloads\medumba\transcriptions.json"

model = WhisperModel("small", device="cpu", compute_type="int8")

results = {}
files = sorted(f for f in os.listdir(AUDIO_FOLDER) if f.lower().endswith(('.mp4', '.mpeg', '.m4a')))

print(f"{len(files)} fichiers a transcrire...\n")

for filename in files:
    path = os.path.join(AUDIO_FOLDER, filename)
    print(f">> {filename}")
    try:
        segments, info = model.transcribe(path, language="fr", task="transcribe", beam_size=3)
        text = " ".join(s.text.strip() for s in segments).strip()
        results[filename] = {"lang": info.language, "text": text[:800]}
        preview = text[:150] + "..." if len(text) > 150 else text
        print(f"   {preview}\n")
    except Exception as e:
        results[filename] = {"error": str(e)}
        print(f"   ERREUR: {e}\n")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nDone : transcriptions sauvees dans {OUTPUT_FILE}")
