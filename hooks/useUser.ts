import { User } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  onChangeUser: (user: User | null) => void;
}

const useUser = create<UserStore>((set) => ({
  user: null,
  onChangeUser: (user: User | null) => set({ user }),
}));

export default useUser;
