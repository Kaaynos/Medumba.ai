import React, { createContext, useContext, useState, useEffect } from 'react';
import { listenAuthState, getUserProfile } from '../services/authService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Onboarding form state (pre-registration)
  const [nativeLang, setNativeLang] = useState('fr');
  const [learningLang, setLearningLang] = useState('medumba');
  const [connection, setConnection] = useState(null);
  const [proficiency, setProficiency] = useState(null);
  const [reason, setReason] = useState(null);
  const [goals, setGoals] = useState([]);
  const [dailyGoal, setDailyGoal] = useState('normal');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Firebase auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenAuthState(async (firebaseUser) => {
      setCurrentUser(firebaseUser);
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        if (profile) {
          setUserName(profile.name || '');
          setUserEmail(profile.email || '');
        }
      } else {
        setUserProfile(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const userStats = userProfile
    ? {
        streak: userProfile.streak  ?? 0,
        xp:     userProfile.xp      ?? 0,
        gems:   userProfile.gems    ?? 50,
        hearts: userProfile.hearts  ?? 5,
      }
    : { streak: 0, xp: 0, gems: 50, hearts: 5 };

  const profile = {
    name: userName, age: userAge, email: userEmail,
    connection, proficiency, reason, goals, dailyGoal,
  };

  return (
    <AppContext.Provider value={{
      nativeLang, setNativeLang,
      learningLang, setLearningLang,
      connection, setConnection,
      proficiency, setProficiency,
      reason, setReason,
      goals, setGoals,
      dailyGoal, setDailyGoal,
      userName, setUserName,
      userAge, setUserAge,
      userEmail, setUserEmail,
      userStats,
      profile,
      currentUser,
      userProfile,
      setUserProfile,
      authLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
