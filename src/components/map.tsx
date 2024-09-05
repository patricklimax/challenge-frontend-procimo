/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { PinNetworkIcon } from './pin-network';
import axios from 'axios';
import { Network } from '../types/network';
import { useEffect, useState } from 'react';

export const Map = () => {
  //1 state para armazenar as Networks
  const [networks, setNetworks] = useState<Network[]>([]);

  //1 função para pegar as Networks
  const getNetworks = async () => {
    const response = await axios.get('http://api.citybik.es/v2/networks');
    const dataNetwork: Network[] = await response.data.networks;
    setNetworks(dataNetwork);
    console.log(networks);
  };

  //1 pegar as estações sempre que inicializar a aplicação
  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <MapContainer
      className="relative h-[calc(100vh-16px)] w-full rounded-md"
      center={[35.505, 0.54]}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* renderizar marcadores de rede no mapa */}
      {networks.map((network) => (
        <Marker
          key={network.id}
          position={[network.location.latitude, network.location.longitude]}
          icon={PinNetworkIcon}
        >
          <Tooltip>
            <div className="rounded-md border px-2 py-1 text-center">
              <p className="font-semibold">
                Country - {network.location.country}
              </p>
              <p className="mt-2">{network.name}</p>
            </div>
          </Tooltip>
        </Marker>
      ))}

      <div className="absolute bottom-2 left-2 z-[1500]">
        Numbers Networks: {networks.length}
      </div>
    </MapContainer>
  );
};
