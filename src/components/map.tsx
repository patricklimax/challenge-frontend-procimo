import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
// import { PinNetworkIcon } from './pin-network';
import axios from 'axios';
import { Network } from '../types/network';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { ZoomInOut } from './map-zoom';
import { CenterMap } from './map-center';
import { latLng, LatLng } from 'leaflet';
import { NetworkMarker } from './network-marker';

const initialCenterMap = latLng(-3.7321944, -38.510347);
const initialZoom = 3;

export const Map = () => {
  //1 state para armazenar as Networks
  const [networks, setNetworks] = useState<Network[]>([]);

  //2 modals para info network e stations
  const [modalNetworkByContry, setModalNetworkByContry] = useState(false);
  const [modalStationByNetwork, setModalStationByNetwork] = useState(false);

  // zoom e centro do mapa
  const [zoomMap, setZoomMap] = useState<number>(initialZoom);
  const [centerMap, setCenterMap] = useState<LatLng>(initialCenterMap);

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

  //função para alterar o centro do mapa ao clicar numa network
  const changeCenterMap = (latitude: number, longitude: number) => {
    setCenterMap(latLng(latitude, longitude));
  };

  const clickNetworkMarker = (network: Network) => {
    setModalNetworkByContry(true);
    setModalStationByNetwork(true);
    setZoomMap(zoomMap + 10);

    // info: Paris
    // const latTest = 48.856614; //todo
    // const longTest = 2.3522219; //todo
    //recebendo as coordenadas de Paris para teste
    changeCenterMap(network.location.latitude, network.location.longitude); //todo: mandar as coordenadas da network clicada
  };

  const closeModalNetwork = () => {
    setModalNetworkByContry(false);
    setZoomMap(initialZoom);
    setCenterMap(initialCenterMap);
  };
  const closeModalStation = () => {
    setModalStationByNetwork(false);
    setZoomMap(initialZoom);
    setCenterMap(initialCenterMap);
  };

  //1 pegar as estações sempre que inicializar a aplicação
  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <MapContainer
      className="relative h-[calc(100vh-16px)] w-full rounded-md antialiased"
      center={initialCenterMap}
      zoom={zoomMap}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* renderizar marcadores de rede no mapa */}
      {networks.map((network) => (
        <NetworkMarker
          key={network.id}
          networkData={network}
          onClick={clickNetworkMarker}
        />
      ))}

      {/* // todo: componentizar esse item */}
      {/* // todo: Na componetização será necessário informações da network - usar Zustand (ver uso) */}
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

      <ZoomInOut zoom={zoomMap} />
      <CenterMap latitude={centerMap.lat} longitude={centerMap.lng} />
    </MapContainer>
  );
};
