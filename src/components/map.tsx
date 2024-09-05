import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { PinNetworkIcon } from './pin-network';

export const Map = () => {
  

  return (
    <MapContainer
      className="relative h-[calc(100vh-16px)] w-full rounded-md"
      center={[35.505, 0.540]}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} icon={PinNetworkIcon}>
        <Popup>
          <div className='px-2 py-1 border rounded-md text-center'>
            <p className='font-semibold'>País que a rede pertence</p>
            <p className='mt-2'>Network Name</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
