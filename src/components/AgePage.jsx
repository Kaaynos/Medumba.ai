import { useState } from 'react';

const B = '#1B4FD8';

const AgePage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [age,      setAge]      = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMon, setBirthMon] = useState('');

    const h   = isFrench ? "Quel âge as-tu ? 🎂" : "How old are you? 🎂";
    const lbl = isFrench ? "Âge" : "Age";
    const ph  = isFrench ? "ex. 25" : "e.g. 25";
    const btn = isFrench ? 'Continuer' : 'Continue';
    const ok  = age.length > 0;

    const MONTHS = isFrench
        ? ['Janv.','Févr.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.']
        : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const handleNext = () => {
        const birthdate = birthDay && birthMon ? `${birthMon}-${birthDay}` : null;
        onNext(age, birthdate);
    };

    return (
        <div style={{ width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column', backgroundColor:'#fff' }}>
            <div style={{ padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:'1rem', position:'sticky', top:0, backgroundColor:'#fff', zIndex:50 }}>
                <button onClick={onBack} style={{ background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer', color:'#0f172a', padding:'0.25rem 0.5rem' }}>←</button>
                <div style={{ flex:1, height:'6px', backgroundColor:'#e2e8f0', borderRadius:'99px' }}>
                    <div style={{ width:'83%', height:'100%', backgroundColor:B, borderRadius:'99px' }} />
                </div>
            </div>

            <div style={{ flex:1, display:'flex', flexDirection:'column', width:'100%', maxWidth:'500px', margin:'0 auto', padding:'2rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize:'1.75rem', fontWeight:'800', color:'#0f172a', marginBottom:'2.5rem' }}>{h}</h1>

                {/* Âge */}
                <div style={{ marginBottom:'2.5rem' }}>
                    <label style={{ display:'block', fontSize:'.85rem', fontWeight:'700', color:'#64748b', marginBottom:'.5rem' }}>{lbl}</label>
                    <input
                        type="number" value={age} onChange={e => setAge(e.target.value)} placeholder={ph}
                        style={{ border:'none', borderBottom:`2px solid ${B}`, padding:'.5rem 0', fontSize:'1.15rem', fontWeight:'600', width:'100%', outline:'none', backgroundColor:'transparent', color:'#0f172a' }}
                    />
                </div>

                {/* Date de naissance — optionnel */}
                <div style={{ marginBottom:'2rem', padding:'1.25rem', background:'#f8fafc', borderRadius:'16px', border:'1.5px solid #e2e8f0' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.65rem' }}>
                        <span style={{ fontSize:'.82rem', fontWeight:700, color:'#0f172a' }}>
                            {isFrench ? 'Date de naissance' : 'Date of birth'}
                        </span>
                        <span style={{ fontSize:'.68rem', background:'#eff6ff', color:B, fontWeight:700, borderRadius:'99px', padding:'1px 8px' }}>
                            {isFrench ? 'Facultatif' : 'Optional'}
                        </span>
                    </div>
                    <p style={{ fontSize:'.75rem', color:'#94a3b8', marginBottom:'1rem', lineHeight:1.5 }}>
                        {isFrench
                            ? 'Pour une expérience plus adaptée à vous.'
                            : 'For a more personalized experience.'}
                    </p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'.75rem' }}>
                        <div>
                            <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'#64748b', marginBottom:'.3rem' }}>
                                {isFrench ? 'Jour' : 'Day'}
                            </label>
                            <input
                                type="number" min="1" max="31" value={birthDay}
                                onChange={e => setBirthDay(e.target.value)}
                                placeholder="ex. 14"
                                style={{ border:'none', borderBottom:'2px solid #e2e8f0', padding:'.4rem 0', fontSize:'.95rem', fontWeight:600, width:'100%', outline:'none', backgroundColor:'transparent', color:'#0f172a' }}
                                onFocus={e => e.target.style.borderColor=B}
                                onBlur={e => e.target.style.borderColor='#e2e8f0'}
                            />
                        </div>
                        <div>
                            <label style={{ display:'block', fontSize:'.72rem', fontWeight:700, color:'#64748b', marginBottom:'.3rem' }}>
                                {isFrench ? 'Mois' : 'Month'}
                            </label>
                            <select value={birthMon} onChange={e => setBirthMon(e.target.value)}
                                style={{ border:'none', borderBottom:'2px solid #e2e8f0', padding:'.4rem 0', fontSize:'.9rem', fontWeight:600, width:'100%', outline:'none', backgroundColor:'transparent', color:birthMon?'#0f172a':'#94a3b8', cursor:'pointer' }}>
                                <option value="">{isFrench ? '— Mois —' : '— Month —'}</option>
                                {MONTHS.map((m,i) => <option key={i} value={i+1}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ flex:1 }} />
                <button onClick={handleNext} disabled={!ok}
                    style={{ width:'100%', backgroundColor:ok?B:'#cbd5e1', color:'#fff', padding:'1.1rem', borderRadius:'9999px', fontSize:'1.05rem', fontWeight:'700', border:'none', cursor:ok?'pointer':'not-allowed', boxShadow:ok?'0 8px 24px rgba(27,79,216,.3)':'none', letterSpacing:'.3px' }}>
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default AgePage;
