import { create } from "zustand"

type CoverImage = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export const useCoverImage = create<CoverImage>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))