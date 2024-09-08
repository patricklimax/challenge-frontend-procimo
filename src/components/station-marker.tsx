import { Marker, Tooltip } from 'react-leaflet';
import { Station } from '../types/station';
import L from 'leaflet';

import Bike from '../assets/bike.svg';

type StationMarkerProps = {
  dataStation: Station;
  onClick: (iDStation: string) => void;
};

export const StationMarker = ({ dataStation, onClick }: StationMarkerProps) => {
  const icon = L.icon({
    iconUrl: Bike,
    iconSize: [32, 32],
  });

  const clickMarkerStation = () => {
    onClick(dataStation.id);
  };

  return (
    <Marker
      position={[dataStation.latitude, dataStation.longitude]}
      eventHandlers={{ click: clickMarkerStation }}
      icon={icon}
    >
      <Tooltip>
        <div className="bg-white text-center">
          <p className="p-1 text-lg font-semibold">
            Station: {dataStation.name}
          </p>
          <p className="px-2 py-1 text-xs font-medium">
            Clique na estação para ver detalhes.
          </p>
        </div>
      </Tooltip>
    </Marker>
  );
};
