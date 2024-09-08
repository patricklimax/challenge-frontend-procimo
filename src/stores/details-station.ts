import { create } from 'zustand';

type ModalDetailStationState = {
  isModalOpenDetailStation: boolean;
  openModalDetailStation: () => void;
  closeModalDetailStation: () => void;
};

export const useModalDetailStation = create<ModalDetailStationState>((set) => ({
  isModalOpenDetailStation: false,
  openModalDetailStation: () => set({ isModalOpenDetailStation: true }),
  closeModalDetailStation: () => set({ isModalOpenDetailStation: false }),
}));
