import { Station } from './station';

export type Network = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  company?: string[];
  href?: string;
  gbfsHref?: string;
  system?: string;
  source?: string;
  stations: Station[];
};
