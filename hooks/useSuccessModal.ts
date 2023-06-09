import { create } from "zustand";

interface SuccessModalStore {
  isOpen: boolean;
  content: string;
  onOpen: () => void;
  onClose: () => void;
  onContent: (value: string) => void;
}

const useSuccessModal = create<SuccessModalStore>((set) => ({
  isOpen: false,
  content: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onContent: (value: string) => set({ content: value }),
}));

export default useSuccessModal;
