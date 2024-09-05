import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { PinNetworkIcon } from './pin-network';
import axios from 'axios';
import { Network } from '../types/network';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

export const Map = () => {
  //1 state para armazenar as Networks
  const [networks, setNetworks] = useState<Network[]>([]);

  //2 modals para info network e stations
  const [modalNetworkByContry, setModalNetworkByContry] = useState(false);
  const [modalStationByNetwork, setModalStationByNetwork] = useState(false);

  //1 função para pegar as Networks
  const getNetworks = async () => {
    try {
      const response = await axios.get('http://api.citybik.es/v2/networks');
      const dataNetwork: Network[] = await response.data.networks;
      setNetworks(dataNetwork);
      console.log('Data Networks:', dataNetwork);
      console.log('Quantity Networks:', dataNetwork.length);
    } catch (error) {
      console.log('erro:', error);
    }
  };

  const showModals = () => {
    setModalNetworkByContry(true);
    setModalStationByNetwork(true);
  };
  const closeModalNetwork = () => {
    setModalNetworkByContry(false);
  };
  const closeModalStation = () => {
    setModalStationByNetwork(false);
  };

  //1 pegar as estações sempre que inicializar a aplicação
  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <MapContainer
      className="relative h-[calc(100vh-16px)] w-full rounded-md antialiased"
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
          eventHandlers={{ click: showModals }}
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
      // todo: componentizar esse item
      <div className="absolute bottom-2 left-2 z-[1000] flex flex-col gap-2">
        {/* modal com a quantidade de redes por país */}
        {modalNetworkByContry && (
          <div className="w-56 rounded-md border bg-white/75 pb-1">
            <div className="flex w-full justify-end">
              <XIcon
                className="m-1 stroke-1"
                size={18}
                onClick={closeModalNetwork}
              />
            </div>
            <div className="px-2 font-bold">
              <p className="uppercase">BR - Brasil</p>
              <p className="font-medium">
                30 networks installed in the country.
              </p>
            </div>
          </div>
        )}
        {/* modal com a quantidade de estações por rede */}
        {modalStationByNetwork && (
          <div className="w-56 rounded-md border bg-white/75 pb-1">
            <div className="flex w-full justify-end">
              <XIcon
                className="m-1 stroke-1"
                size={18}
                onClick={closeModalStation}
              />
            </div>
            <div className="px-2 font-bold">
              <p className="uppercase">Name Network</p>
              <p className="font-medium">
                30 stations installed in the network.
              </p>
            </div>
          </div>
        )}

        {/* loading antes do carregamento das redes  */}
        {networks.length === 0 ? (
          <div className="w-fit rounded-md bg-white/75 p-1">
            <p className="px-1">Loading networks...</p>
          </div>
        ) : (
          <div className="w-fit rounded-md bg-white/75 p-1">
            <p className="px-1">
              Number of networks around the world: {networks.length}
            </p>
          </div>
        )}
      </div>
    </MapContainer>
  );
};
