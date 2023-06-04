import { create } from "zustand";

const useAddInstitutionModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddInstitutionModal;