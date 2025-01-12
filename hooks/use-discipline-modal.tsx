import { create } from 'zustand';

interface useDisciplineModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisciplineModal = create<useDisciplineModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
