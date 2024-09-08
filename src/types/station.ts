type Extra = {
  uid?: string;
  number?: number;
  status?: string;
  score?: number;
  reviews?: number;
  address?: string;
  description?: string;
  online?: boolean;
  photo?: string;
  post_code?: string;
  altitude?: number;
  ebikes?: number;
  has_ebikes?: boolean;
  last_update?: number;
  payment?: string[];
  payment_terminal?: boolean;
  renting?: number;
  returning?: number;
  slots?: number;
  station_id?: string;
};

export type Station = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  free_bikes: number;
  empty_slots: number;
  extra?: Extra;
};
