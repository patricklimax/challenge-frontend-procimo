import { create } from 'zustand';

type ModalNetworkCountryState = {
  isModalOpenNetworkCountry: boolean;
  openModalNetworkCountry: () => void;
  closeModalNetworkCountry: () => void;
};

export const useModalNetworkCountry = create<ModalNetworkCountryState>((set) => ({
  isModalOpenNetworkCountry: false,
  openModalNetworkCountry: () => set({ isModalOpenNetworkCountry: true }),
  closeModalNetworkCountry: () => set({ isModalOpenNetworkCountry: false }),
}));
