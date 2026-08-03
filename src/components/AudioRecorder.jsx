import { useState, useRef } from 'react';

const B = '#1B4FD8';

/* ════════════════════════════════════════════════════════════════════
   AudioRecorder — record via the browser microphone, preview, re-record.
   Calls onRecorded(blob) once a recording is finalized; passing null
   means "cleared, record again."
════════════════════════════════════════════════════════════════════ */
const AudioRecorder = ({ isFr, onRecorded, label }) => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl]   = useState(null);
    const [error, setError]         = useState('');
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const streamRef = useRef(null);

    const start = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            chunksRef.current = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioUrl(URL.createObjectURL(blob));
                onRecorded(blob);
                stream.getTracks().forEach(t => t.stop());
            };
            recorder.start();
            mediaRecorderRef.current = recorder;
            setRecording(true);
        } catch {
            setError(isFr ? 'Micro non disponible — vérifiez les autorisations du navigateur.' : 'Microphone not available — check browser permissions.');
        }
    };

    const stop = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    const clear = () => {
        setAudioUrl(null);
        onRecorded(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {label && <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155' }}>{label}</div>}
            {audioUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <audio controls src={audioUrl} style={{ height: '32px', flex: 1 }} />
                    <button onClick={clear} style={{ padding: '0.4rem 0.7rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {isFr ? 'Réenregistrer' : 'Re-record'}
                    </button>
                </div>
            ) : (
                <button
                    onClick={recording ? stop : start}
                    style={{
                        padding: '0.6rem 1rem', borderRadius: '9999px', border: 'none',
                        backgroundColor: recording ? '#dc2626' : B, color: '#fff',
                        fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    }}
                >
                    {recording ? `⏹ ${isFr ? 'Arrêter' : 'Stop'}` : `🎙️ ${isFr ? 'Enregistrer' : 'Record'}`}
                </button>
            )}
            {error && <div style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: '600' }}>{error}</div>}
        </div>
    );
};

export default AudioRecorder;
