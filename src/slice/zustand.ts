import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  userId: string;
  setUserId: (id: string) => void;
  logOut: () => void;
};

export const useUserStatus = create<Store>()(
  persist(
    set => ({
      userId: '',
      setUserId: (id: string) => set({ userId: id }),
      logOut: () => set({ userId: '' }),
    }),
    { name: 'userStore', version: 1 }
  )
);
