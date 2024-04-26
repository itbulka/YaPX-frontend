import { create } from "zustand";

type Store = {
  state: string,
  logIn: (id: string) => void,
  logOut: () => void,

}

export const useUserStatus = create<Store>((set) => ({
  state: '',
  logIn: (id: string) => set({state: id}),
  logOut: () => set({state: ''})
}));