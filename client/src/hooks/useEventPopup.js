import {create} from "zustand"

const useEventPopup = create((set) => ({
    event: null,
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setEvent: (event) => set({event})
}))

export default useEventPopup;