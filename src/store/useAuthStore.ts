// useAuthStore.ts
import { create } from "zustand";
import { logoutUser, getCurrentUser } from "../services/authService";
import { User } from "../types/model/User";

interface AuthState {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  hydrate: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isHydrated: false,

  setUser: (user) => set({ user }),

  hydrate: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isHydrated: true });
    } catch {
      set({ user: null, isHydrated: true });
    }
  },

  logout: () => {
    set({ user: null });
    logoutUser();
  },
}));
