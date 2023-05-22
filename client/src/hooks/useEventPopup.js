import {create} from "zustand"

const useEventPpopup = create((set) => ({
    event: null,
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setEvent: (event) => set({event})
}))

export default useEventPpopup;