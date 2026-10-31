import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Auth, User } from 'firebase/auth';
import type { AuthContextType, FirebaseConfig } from '../types/auth';
import {
  getActiveFirebaseConfig,
  persistFirebaseConfig,
  removeStoredFirebaseConfig,
  initializeFirebaseClient,
  loginWithGooglePopup,
  logoutFirebaseAuth,
  subscribeToAuth,
} from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [config, setConfig] = useState<FirebaseConfig | null>(() => getActiveFirebaseConfig());
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);

  // Initialize or re-initialize Firebase when config changes
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    async function setupFirebase() {
      const activeCfg = getActiveFirebaseConfig();
      if (!activeCfg || !activeCfg.apiKey || !activeCfg.projectId) {
        if (isMounted) {
          setConfig(null);
          setAuthInstance(null);
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const { auth } = await initializeFirebaseClient(activeCfg);
        if (!isMounted) return;

        setAuthInstance(auth);
        setConfig(activeCfg);

        unsubscribe = subscribeToAuth(auth, (currentUser) => {
          if (isMounted) {
            setUser(currentUser);
            setLoading(false);
          }
        });
      } catch (err: unknown) {
        if (isMounted) {
          setLoading(false);
          setAuthError(err instanceof Error ? err.message : 'Firebase কনফিগারেশনে ত্রুটি হয়েছে।');
        }
      }
    }

    setupFirebase();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthError(null);
    let auth = authInstance;

    if (!auth) {
      const activeCfg = getActiveFirebaseConfig();
      if (!activeCfg) {
        setAuthError('Firebase কনফিগার করা নেই। অনুগ্রহ করে প্রথমে Firebase প্রজেক্ট সেটআপ করুন।');
        throw new Error('Firebase is not configured');
      }
      const initialized = await initializeFirebaseClient(activeCfg);
      auth = initialized.auth;
      setAuthInstance(auth);
    }

    try {
      setLoading(true);
      const loggedUser = await loginWithGooglePopup(auth);
      setUser(loggedUser);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google সাইন-ইনে ত্রুটি হয়েছে।';
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [authInstance]);

  const logout = useCallback(async () => {
    setAuthError(null);
    if (!authInstance) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      await logoutFirebaseAuth(authInstance);
      setUser(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'লগআউটে সমস্যা হয়েছে।';
      setAuthError(message);
    } finally {
      setLoading(false);
    }
  }, [authInstance]);

  const saveConfig = useCallback((newConfig: FirebaseConfig): boolean => {
    if (!newConfig.apiKey || !newConfig.authDomain || !newConfig.projectId) {
      setAuthError('API Key, Auth Domain এবং Project ID পূরণ করা আবশ্যক।');
      return false;
    }

    try {
      persistFirebaseConfig(newConfig);
      setConfig(newConfig);
      setAuthError(null);

      // Re-initialize immediately
      initializeFirebaseClient(newConfig).then(({ auth }) => {
        setAuthInstance(auth);
        subscribeToAuth(auth, (currentUser) => {
          setUser(currentUser);
        });
      });

      return true;
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'কনফিগারেশন সেভ করতে ত্রুটি হয়েছে।');
      return false;
    }
  }, []);

  const clearConfig = useCallback(() => {
    removeStoredFirebaseConfig();
    setConfig(null);
    setUser(null);
    setAuthInstance(null);
    setAuthError(null);
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const isConfigured = Boolean(config && config.apiKey && config.projectId);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured,
        authError,
        config,
        loginWithGoogle,
        logout,
        saveConfig,
        clearConfig,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
