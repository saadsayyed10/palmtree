import { create } from "zustand";

interface FounderRegisterStore {
  name: string | null;
  setName: (name: string) => void;

  email: string | null;
  setEmail: (email: string) => void;
}

export const useFounderRegister = create<FounderRegisterStore>((set) => ({
  name: null,
  email: null,

  setName: (name) => {
    set({ name });
  },

  setEmail: (email) => {
    set({ email });
  },
}));
