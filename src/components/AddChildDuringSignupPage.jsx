import { useState } from 'react';
import { supabase } from '../config/supabase';
import { addChildProfile } from '../services/userService';

const B = '#1B4FD8';

/* Only shown when the parent picked "I'm signing up for my child" on the
   role-choice screen — right after their own account (email/password) is
   created. Without this step, "Personalize your journey" (level/reason/
   goals/daily goal) had nowhere to go but the parent's own account, since
   the child profile only ever got created later via the generic "+ Ajouter
   un membre de la famille" modal, which never asked those questions and so
   never carried them over. This is what actually makes the quiz personalize
   the child's Hub, not the parent's. */
const AddChildDuringSignupPage = ({ onNext, nativeLang, proficiency, reason, goals, dailyGoal }) => {
    const isFr = nativeLang === 'french';
    const [name, setName]           = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState('');

    const h    = isFr ? "Comment s'appelle votre enfant ? 👧🏽" : "What's your child's name? 👧🏽";
    const lbl  = isFr ? 'Prénom' : 'First name';
    const ph   = isFr ? 'ex. Aïcha' : 'e.g. Aisha';
    const ylbl = isFr ? 'Année de naissance' : 'Birth year';
    const yph  = isFr ? 'ex. 2016 (facultatif)' : 'e.g. 2016 (optional)';
    const btn  = isFr ? 'Ajouter mon enfant' : 'Add my child';
    const skip = isFr ? 'Je le ferai plus tard' : "I'll do this later";
    const sub  = isFr
        ? 'Le niveau, la raison et les objectifs que vous venez de choisir seront appliqués à son parcours.'
        : "The level, reason, and goals you just picked will be applied to their learning path.";

    const ok = name.trim().length > 0;

    const handleNext = async () => {
        if (!ok || loading) return;
        setLoading(true);
        setError('');
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');
            await addChildProfile(user.id, {
                name: name.trim(),
                birthYear: birthYear || null,
                proficiency,
                reason,
                goals,
                dailyGoal,
            });
            onNext();
        } catch (e) {
            console.error('[AddChildDuringSignupPage]', e);
            setError(isFr
                ? "Impossible d'ajouter votre enfant pour l'instant. Vous pourrez le faire depuis Compte."
                : "Couldn't add your child right now. You can do this later from Account.");
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '92%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>{h}</h1>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.5 }}>{sub}</p>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{lbl}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={ph}
                        style={{
                            border: 'none', borderBottom: `2px solid ${B}`,
                            padding: '0.5rem 0', fontSize: '1.15rem', fontWeight: '600',
                            width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{ylbl}</label>
                    <input
                        type="number"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, ''))}
                        placeholder={yph}
                        style={{
                            border: 'none', borderBottom: '2px solid #e2e8f0',
                            padding: '0.5rem 0', fontSize: '1.15rem', fontWeight: '600',
                            width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a',
                        }}
                    />
                </div>

                {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>{error}</p>
                )}

                <div style={{ flex: 1 }} />
                <button
                    onClick={handleNext}
                    disabled={!ok || loading}
                    style={{
                        width: '100%', backgroundColor: ok && !loading ? B : '#cbd5e1', color: '#fff',
                        padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem',
                        fontWeight: '700', border: 'none', cursor: ok && !loading ? 'pointer' : 'not-allowed',
                        boxShadow: ok && !loading ? '0 8px 24px rgba(27,79,216,0.3)' : 'none',
                        letterSpacing: '0.3px',
                    }}
                >{loading ? '...' : btn}</button>

                <button
                    onClick={onNext}
                    disabled={loading}
                    style={{
                        background: 'none', border: 'none', cursor: loading ? 'default' : 'pointer',
                        color: '#94a3b8', fontWeight: '700', fontSize: '0.85rem',
                        fontFamily: 'inherit', marginTop: '1rem',
                    }}
                >{skip}</button>
            </div>
        </div>
    );
};

export default AddChildDuringSignupPage;
