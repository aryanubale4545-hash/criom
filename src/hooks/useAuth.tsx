import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#07080b] flex flex-col items-center justify-center text-[#f1f5f9] select-none" id="auth-loading-screen">
        <div className="relative flex h-10 w-10 mb-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-emerald-500"></span>
        </div>
        <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase">Synchronizing Credentials...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-[#07080b] text-[#f1f5f9] font-sans flex items-center justify-center p-4 antialiased selection:bg-[#22C55E]/30" id="login-container">
        <div className="max-w-md w-full bg-[#0d0e12]/80 border border-[#1e2230] rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Neon Glow Effects */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Secure Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              CarbonIQ Engine
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Municipal Carbon Intelligence Node & Personal Lifecycle Audit System
            </p>
          </div>

          <div className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-400 font-mono text-center">
                {authError}
              </div>
            )}

            <button
              onClick={async () => {
                try {
                  setAuthError(null);
                  await signInWithGoogle();
                } catch (err: unknown) {
                  const message = err instanceof Error ? err.message : "Failed to authenticate with Google.";
                  setAuthError(message);
                }
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 active:scale-[0.98]"
              id="google-signin-btn"
            >
              {/* Google Icon Vector */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign In with Google
            </button>

            <div className="pt-4 border-t border-[#1e2230] text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase">
                Enterprise Gating Node // IND-MEM-CORE
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
