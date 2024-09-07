import { create } from 'zustand';

type ModalStationNetworkState = {
  isModalOpenStationNetwork: boolean;
  openModalStationNetwork: () => void;
  closeModalStationNetwork: () => void;
};

export const useModalStationNetwork = create<ModalStationNetworkState>((set) => ({
  isModalOpenStationNetwork: false,
  openModalStationNetwork: () => set({ isModalOpenStationNetwork: true }),
  closeModalStationNetwork: () => set({ isModalOpenStationNetwork: false }),
}));
