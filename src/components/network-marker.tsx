import { Marker, Tooltip } from 'react-leaflet';
import { Network } from '../types/network';
import { latLng } from 'leaflet';
import { PinNetworkIcon } from '../constants/pin-network';

type NetworkMarkerProps = {
  networkData: Network;
  onClick: (network: Network) => void;
};

export const NetworkMarker = ({
  networkData,
  onClick,
}: NetworkMarkerProps) => {
  const clickMarkerNetwork = () => {
    onClick(networkData);
  };

  return (
    <Marker
      key={networkData.id}
      position={latLng(
        networkData.location.latitude,
        networkData.location.longitude,
      )}
      icon={PinNetworkIcon}
      eventHandlers={{ click: clickMarkerNetwork }}
    >
      <Tooltip>
        <div className="rounded-md border px-2 py-1 text-center">
          <p className="font-semibold">
            Country - {networkData.location.country}
          </p>
          <p className="mt-2">{networkData.name}</p>
        </div>
      </Tooltip>
    </Marker>
  );
};
