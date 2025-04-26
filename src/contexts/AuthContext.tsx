import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, User, onAuthStateChanged } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  subscribed: boolean;
  setSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  subscribed: false,
  setSubscribed: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setSubscribed(false);
      return;
    }
    const fetchSubscription = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.email));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const now = new Date();
          const start = data.subscriptionStart?.toDate?.() || new Date(2000,0,1);
          const end = data.subscriptionEnd?.toDate?.() || new Date(2000,0,1);
          setSubscribed(start <= now && now <= end);
        } else {
          setSubscribed(false);
        }
      } catch (err) {
        setSubscribed(false);
      }
    };
    fetchSubscription();
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
    subscribed,
    setSubscribed,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
