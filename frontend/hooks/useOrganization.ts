import { create } from "zustand";

interface Organization {
  id: string | null;
  setId: (id: string) => void;

  fiscalYearEnd: string | null;
  setFiscalYearEnd: (fiscalYearEnd: string) => void;

  fiscalYearStart: string | null;
  setFiscalYearStart: (fiscalYearStart: string) => void;

  gstin: string | null;
  setGstin: (gstin: string) => void;

  isApproved: boolean;
  setIsApproved: (isApproved: boolean) => void;

  orgAddress: string | null;
  setOrgAddress: (orgAddress: string) => void;

  orgName: string | null;
  setOrgName: (orgName: string) => void;

  createdAt: string | null;
  setCreatedAt: (createdAt: string) => void;
}

export const useOrganization = create<Organization>((set) => ({
  id: "",
  fiscalYearEnd: "",
  fiscalYearStart: "",
  gstin: "",
  isApproved: false,
  orgAddress: "",
  orgName: "",
  createdAt: "",

  setId: (id) => {
    set({ id });
  },

  setFiscalYearEnd: (fiscalYearEnd) => {
    set({ fiscalYearEnd });
  },

  setFiscalYearStart: (fiscalYearStart) => {
    set({ fiscalYearStart });
  },

  setGstin: (gstin) => {
    set({ gstin });
  },

  setIsApproved: (isApproved) => {
    set({ isApproved: false });
  },

  setOrgAddress: (orgAddress) => {
    set({ orgAddress: "" });
  },

  setOrgName: (orgName) => {
    set({ orgName: "" });
  },

  setCreatedAt: (createdAt) => {
    set({ createdAt: "" });
  },
}));
