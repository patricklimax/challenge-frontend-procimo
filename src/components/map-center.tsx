import { latLng } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type CenterMapProps = {
  latitude: number;
  longitude: number;
};

export const CenterMap = ({ latitude, longitude }: CenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView(latLng(latitude, longitude)); //pode usar um array [latitude, longitude]
  }, [map, latitude, longitude]);

  return null;
};
