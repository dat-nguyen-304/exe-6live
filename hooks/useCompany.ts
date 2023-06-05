import { Company } from "@/types";
import { create } from "zustand";

interface CompanyStore {
  company: Company | null;
  onChangeCompany: (user: Company | null) => void;
}

const useCompany = create<CompanyStore>((set) => ({
  company: null,
  onChangeCompany: (company: Company | null) => set({ company }),
}));

export default useCompany;
