import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  sessionId: string | null;
  userId: string | null;
  setSessionId: (id: string | null) => void;
  setUserId: (id: string | null) => void;
};

export const useAuthStore = create<Store>()(
  persist(
    set => ({
      sessionId: null,
      userId: null,
      setSessionId: sessionId => set({ sessionId }),
      setUserId: userId => set({ userId }),
    }),
    {
      name: 'yapx-auth',
      version: 1,
    }
  )
);
