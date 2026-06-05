import { createContext, useContext, useState, useEffect } from 'react';

/* ── Color tokens ─────────────────────────────────────────────── */
const LIGHT = {
    bg:         '#f8fafc',
    surface:    '#ffffff',
    surface2:   '#f1f5f9',
    surface3:   '#e2e8f0',
    text:       '#0f172a',
    textMuted:  '#64748b',
    textSub:    '#94a3b8',
    border:     '#e2e8f0',
    borderSub:  '#f1f5f9',
    blueTint:   '#eff6ff',
    blueBorder: '#bfdbfe',
    navBg:      '#ffffff',
    navBorder:  '#e5e7eb',
    inputBg:    '#f8fafc',
    cardShadow: '0 2px 12px rgba(0,0,0,0.06)',
};

const DARK = {
    bg:         '#0f172a',
    surface:    '#1e293b',
    surface2:   '#263347',
    surface3:   '#334155',
    text:       '#f1f5f9',
    textMuted:  '#94a3b8',
    textSub:    '#64748b',
    border:     '#334155',
    borderSub:  '#1e293b',
    blueTint:   '#1e3252',
    blueBorder: '#2d4d8a',
    navBg:      '#1e293b',
    navBorder:  '#334155',
    inputBg:    '#263347',
    cardShadow: '0 2px 12px rgba(0,0,0,0.35)',
};

const ThemeContext = createContext({ isDark: false, T: LIGHT, toggle: () => {} });

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        try { return localStorage.getItem('med_dark') === '1'; } catch { return false; }
    });

    useEffect(() => {
        localStorage.setItem('med_dark', isDark ? '1' : '0');
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggle = () => setIsDark(d => !d);
    const T = isDark ? DARK : LIGHT;

    return (
        <ThemeContext.Provider value={{ isDark, T, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export { LIGHT, DARK };
