import type { User as FirebaseUser } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export type AuthUser = FirebaseUser;

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  authError: string | null;
  config: FirebaseConfig | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveConfig: (config: FirebaseConfig) => boolean;
  clearConfig: () => void;
  clearError: () => void;
}
