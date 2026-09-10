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

  state: string;
  setState: (state: string) => void;

  city: string;
  setCity: (city: string) => void;

  localAddress: string;
  setLocalAddress: (localAddress: string) => void;

  aadharNumber: string;
  setAadharNumber: (aadharNumber: string) => void;
}

export const useFounderRegister = create<FounderRegisterStore>((set) => ({
  name: "",
  email: "",
  password: "",
  contact: "",
  state: "",
  city: "",
  localAddress: "",
  aadharNumber: "",

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

  setState: (state) => {
    set({ state });
  },

  setCity: (city) => {
    set({ city });
  },

  setLocalAddress: (localAddress) => {
    set({ localAddress });
  },

  setAadharNumber: (aadharNumber) => {
    set({ aadharNumber });
  },
}));
