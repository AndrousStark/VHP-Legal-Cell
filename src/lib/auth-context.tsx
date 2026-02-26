"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type RoleName, ROLES } from "./constants";

/* ─── Types ─── */

export interface AuthUser {
  id: string;
  name: string;
  nameHi: string;
  phone: string;
  role: RoleName;
  roleLevel: number;
  chetraId?: string;
  prantId?: string;
  courtId?: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; user?: AuthUser; message: string }>;
  logout: () => void;
  hasRole: (minRole: RoleName) => boolean;
}

/* ─── Mock Auth Data ─── */

const MOCK_USERS: Record<string, AuthUser> = {
  "9876543210": {
    id: "usr_1",
    name: "Dr. Abhishek Atrey",
    nameHi: "डॉ. अभिषेक आत्रेय",
    phone: "9876543210",
    role: "NATIONAL_ADMIN",
    roleLevel: ROLES.NATIONAL_ADMIN,
    chetraId: "delhi",
  },
  "9876543211": {
    id: "usr_2",
    name: "Adv. Vikram Singh",
    nameHi: "अधि. विक्रम सिंह",
    phone: "9876543211",
    role: "CHETRA_CONVENOR",
    roleLevel: ROLES.CHETRA_CONVENOR,
    chetraId: "braj-chetra",
  },
  "9876543212": {
    id: "usr_3",
    name: "Adv. Kavita Mishra",
    nameHi: "अधि. कविता मिश्रा",
    phone: "9876543212",
    role: "PRANT_CONVENOR",
    roleLevel: ROLES.PRANT_CONVENOR,
    chetraId: "rajasthan",
    prantId: "jaipur",
  },
};

const MOCK_OTP = "123456";

/* ─── Context ─── */

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore session from localStorage on mount (with expiry check)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vhp_auth_user");
      if (stored) {
        const parsed = JSON.parse(stored) as { user: AuthUser; expiresAt: number } | AuthUser;
        // Handle both old format (plain user) and new format (with expiry)
        if ("expiresAt" in parsed) {
          if (Date.now() > parsed.expiresAt) {
            localStorage.removeItem("vhp_auth_user");
            setState((prev) => ({ ...prev, isLoading: false }));
            return;
          }
          setState({ user: parsed.user, isAuthenticated: true, isLoading: false });
        } else {
          // Legacy format — treat as valid but migrate on next login
          setState({ user: parsed, isAuthenticated: true, isLoading: false });
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      localStorage.removeItem("vhp_auth_user");
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Cross-tab logout synchronization
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "vhp_auth_user" && e.newValue === null) {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback(
    async (phone: string): Promise<{ success: boolean; message: string }> => {
      // Mock: accept any 10-digit number
      if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        return { success: false, message: "Please enter a valid 10-digit mobile number" };
      }

      // In production: call Twilio Verify API here
      return { success: true, message: `OTP sent to +91 ${phone}` };
    },
    []
  );

  const verifyOtp = useCallback(
    async (
      phone: string,
      otp: string
    ): Promise<{ success: boolean; user?: AuthUser; message: string }> => {
      // Mock OTP verification
      if (otp !== MOCK_OTP) {
        return { success: false, message: "Invalid OTP. Try 123456 for demo." };
      }

      const user = MOCK_USERS[phone];
      if (!user) {
        return {
          success: false,
          message: "No account found for this number. Contact your Chetra Convenor.",
        };
      }

      // Persist session with expiry (7 days)
      const sessionData = { user, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
      localStorage.setItem("vhp_auth_user", JSON.stringify(sessionData));
      setState({ user, isAuthenticated: true, isLoading: false });

      return { success: true, user, message: "Login successful" };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("vhp_auth_user");
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const hasRole = useCallback(
    (minRole: RoleName): boolean => {
      if (!state.user) return false;
      return state.user.roleLevel >= ROLES[minRole];
    },
    [state.user]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        verifyOtp,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
