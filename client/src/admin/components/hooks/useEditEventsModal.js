import { create } from "zustand";

const useEditEventsModal = create((set) => ({
  events: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setEvent: (event) => set({ event }),
}));

export default useEditEventsModal;