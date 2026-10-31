import { initializeApp, getApps, getApp, deleteApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';
import type { FirebaseConfig } from '../types/auth';

const STORAGE_KEY = 'vidiq_firebase_config';

/**
 * Retrieves Firebase configuration from Vite environment variables.
 */
export function getEnvFirebaseConfig(): FirebaseConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (
    apiKey &&
    authDomain &&
    projectId &&
    !apiKey.includes('your_api_key') &&
    apiKey.trim() !== ''
  ) {
    return {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
      messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
      appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
      measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '').trim(),
    };
  }

  return null;
}

/**
 * Retrieves Firebase configuration stored in browser localStorage.
 */
export function getStoredFirebaseConfig(): FirebaseConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FirebaseConfig;
    if (parsed.apiKey && parsed.authDomain && parsed.projectId) {
      return parsed;
    }
  } catch {
    // Ignore invalid JSON in localStorage
  }
  return null;
}

/**
 * Resolves current active Firebase configuration.
 * Prioritizes environment variables, then falls back to localStorage.
 */
export function getActiveFirebaseConfig(): FirebaseConfig | null {
  return getEnvFirebaseConfig() || getStoredFirebaseConfig();
}

/**
 * Saves Firebase configuration into browser localStorage.
 */
export function persistFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Clears stored Firebase configuration from localStorage.
 */
export function removeStoredFirebaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

let activeApp: FirebaseApp | null = null;
let activeAuth: Auth | null = null;

/**
 * Initializes or re-initializes Firebase with the given config.
 */
export async function initializeFirebaseClient(config: FirebaseConfig): Promise<{
  app: FirebaseApp;
  auth: Auth;
}> {
  if (getApps().length > 0) {
    const existing = getApp();
    try {
      await deleteApp(existing);
    } catch {
      // Ignore cleanup error
    }
  }

  activeApp = initializeApp(config);
  activeAuth = getAuth(activeApp);

  return { app: activeApp, auth: activeAuth };
}

/**
 * Returns currently initialized Auth instance, if any.
 */
export function getActiveAuth(): Auth | null {
  if (activeAuth) return activeAuth;
  const config = getActiveFirebaseConfig();
  if (config) {
    if (getApps().length === 0) {
      activeApp = initializeApp(config);
    } else {
      activeApp = getApp();
    }
    activeAuth = getAuth(activeApp);
    return activeAuth;
  }
  return null;
}

/**
 * Triggers Google Sign-in popup.
 */
export async function loginWithGooglePopup(auth: Auth): Promise<User> {
  const provider = new GoogleAuthProvider();
  // Optional scopes or custom parameters
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error) {
      const code = (error as { code: string; message: string }).code;
      if (code === 'auth/popup-closed-by-user') {
        throw new Error('Google সাইন-ইন উইন্ডো বন্ধ করা হয়েছে। আবার চেষ্টা করুন।');
      }
      if (code === 'auth/unauthorized-domain') {
        throw new Error(
          'এই ডোমেইনটি Firebase Console-এ অনুমোদিত নয়। Firebase Console > Authentication > Settings > Authorized domains-এ বর্তমান ডোমেইন যুক্ত করুন।'
        );
      }
      if (code === 'auth/cancelled-popup-request') {
        throw new Error('অন্য একটি লগইন রিকোয়েস্টের কারণে এটি বাতিল হয়েছে।');
      }
      if (code === 'auth/network-request-failed') {
        throw new Error('নেটওয়ার্ক সমস্যা। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।');
      }
      if (code === 'auth/operation-not-allowed') {
        throw new Error(
          'Firebase Console-এ Google Sign-In এনেবল করা নেই। Authentication > Sign-in method-এ Google এনেবল করুন।'
        );
      }
      throw new Error(`Firebase Auth Error: ${code}`);
    }
    throw error;
  }
}

/**
 * Signs the user out from Firebase Auth.
 */
export async function logoutFirebaseAuth(auth: Auth): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribes to Firebase Auth state changes.
 */
export function subscribeToAuth(
  auth: Auth,
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}
