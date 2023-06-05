import { Kol } from "@/types";
import { create } from "zustand";

interface KolStore {
  kol: Kol | null;
  onChangeKol: (user: Kol | null) => void;
}

const useKol = create<KolStore>((set) => ({
  kol: null,
  onChangeKol: (kol: Kol | null) => set({ kol }),
}));

export default useKol;
