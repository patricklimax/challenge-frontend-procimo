import { create } from 'zustand';
import { Network } from '../types/network';
import axios from 'axios';

type State = {
  networks: Network[];
  networkId: Network | null
};

type Action = {
  getNetworks: () => void;
  getNetworkId: (idNetwork: string)=> void
};

const url = 'http://api.citybik.es/v2/networks';

export const useNetworkStore = create<State & Action>((set) => ({
  networks: [],
  networkId: null,

  getNetworks: async () => {
    try {
      const response = await axios.get(url);
      const data: Network[] = response.data.networks;
      set({ networks: data });
    } catch (error) {
      console.log(error);
    }
  },

  getNetworkId: async (idNetwork: string)=> {
    try {
      const response = await axios.get(`${url}/${idNetwork}`);
      const data: Network = response.data.network;
      set({ networkId: data });
    } catch (error) {
      console.log(error);
    }
  }
}));
