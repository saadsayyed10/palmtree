import { create } from "zustand";

interface FounderRegisterStore {
  name: string;
  setName: (name: string) => void;

  email: string;
  setEmail: (email: string) => void;

  password: string;
  setPassword: (password: string) => void;

  contact: string;
  setContact: (contact: string) => void;
}

export const useFounderRegister = create<FounderRegisterStore>((set) => ({
  name: "",
  email: "",
  password: "",
  contact: "",

  setName: (name) => {
    set({ name });
  },

  setEmail: (email) => {
    set({ email });
  },

  setPassword: (password) => {
    set({ password });
  },

  setContact: (contact) => {
    set({ contact });
  },
}));
