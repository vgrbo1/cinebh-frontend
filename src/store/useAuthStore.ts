import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logoutUser } from "../services/authService";
import { User } from "../types/model/User";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => {
        set({ user: null });
        logoutUser();
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
