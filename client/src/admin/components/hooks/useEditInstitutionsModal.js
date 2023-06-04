import { create } from "zustand";

const useEditInstitutionsModal = create((set) => ({
  institutions: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setInstitution: (institution) => set({ institution }),
}));

export default useEditInstitutionsModal;