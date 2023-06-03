import { create } from "zustand";

const useEditUsersModal = create((set) => ({
  user: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setUser: (user) => set({ user }),
}));

export default useEditUsersModal;