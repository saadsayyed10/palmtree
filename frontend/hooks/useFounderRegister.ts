import { create } from "zustand";

interface FounderRegisterStore {
  name: string;
  setName: (name: string) => void;

  email: string;
  setEmail: (email: string) => void;
}

export const useFounderRegister = create<FounderRegisterStore>((set) => ({
  name: "",
  email: "",

  setName: (name) => {
    set({ name });
  },

  setEmail: (email) => {
    set({ email });
  },
}));
