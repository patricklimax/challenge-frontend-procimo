import { create } from 'zustand';
import { Network } from '../types/network';
import axios from 'axios';

type State = {
  networks: Network[];
};

type Action = {
  getNetworks: () => Promise<void>;
};

const url = 'http://api.citybik.es/v2/networks';

export const useNetworkStore = create<State & Action>((set) => ({
  networks: [],

  getNetworks: async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.networks;
      set({ networks: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
