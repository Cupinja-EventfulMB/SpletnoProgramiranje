import { create } from "zustand";

const useEditUser = create((set) => ({
  user: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setUser: (user) => set({ user }),
}));

export default useEditUser;