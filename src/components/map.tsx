import { MapContainer, TileLayer } from 'react-leaflet';

import axios from 'axios';
import { latLng, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useModalNetworkCountry } from '../stores/networks-country';
import { useModalStationNetwork } from '../stores/stations-network';
import { Network } from '../types/network';
import { Station } from '../types/station';
import { CenterMap } from './map-center';
import { ZoomInOut } from './map-zoom';
import { ModalNetworksCountry } from './modal-networks-country';
import { ModalStationsNetwork } from './modal-stations-network';
import { NetworkMarker } from './network-marker';
import { StationMarker } from './station-marker';

const initialCenterMap = latLng(-3.7321944, -38.510347);
const initialZoom = 3;

type NetworkPerCountryProps = {
  country: string;
  quantity: number;
};

export const Map = () => {
  //1 state para armazenar as Networks
  const [networks, setNetworks] = useState<Network[]>([]);
  //state para salvar o array de network per country
  const [networksPerCountry, setNetworksPerCountry] = useState<
    NetworkPerCountryProps[]
  >([]);
  //state para salvar dados de qty of networks per country, da network clicada
  const [countrySelected, setCountrySelected] = useState<
    NetworkPerCountryProps[]
  >([]);

  //state para salvar dados da rede clicada, e pegar as stations
  const [networkDataSelected, setNetworkDataSelected] = useState<Station[]>([]);
  const [isStations, setIsStations] = useState(false);

  const [qtyStationPerNetwork, setQtyStationPerNetwork] = useState<
    number | null
  >(null);
  const [nameNetworkSelected, setNameNetworkSelected] = useState<string | null>(
    null,
  );

  const {
    isModalOpenNetworkCountry,
    openModalNetworkCountry,
    closeModalNetworkCountry,
  } = useModalNetworkCountry();

  const {
    isModalOpenStationNetwork,
    openModalStationNetwork,
    closeModalStationNetwork,
  } = useModalStationNetwork();

  // zoom e centro do mapa
  const [zoomMap, setZoomMap] = useState<number>(initialZoom);
  const [centerMap, setCenterMap] = useState<LatLng>(initialCenterMap);

  //req 1 - função para pegar as Networks
  const getNetworks = async () => {
    try {
      const response = await axios.get('http://api.citybik.es/v2/networks');
      const dataNetwork: Network[] = await response.data.networks;
      // console.log('Dados Networks:', dataNetwork);
      // console.log('Quantity Networks:', dataNetwork.length);
      setNetworks(dataNetwork);

      // contabiliza networks por country - retorna um objeto
      const networksPerCountry: Record<string, number> = {};
      for (const network of dataNetwork) {
        const country = network.location.country;
        if (!networksPerCountry[country]) {
          networksPerCountry[country] = 1;
        } else {
          networksPerCountry[country] = networksPerCountry[country] + 1;
        }
      }

      //converte objeto anterior em array
      const arrNetworksPerArray: NetworkPerCountryProps[] = [];
      for (const country in networksPerCountry) {
        arrNetworksPerArray.push({
          country: country,
          quantity: networksPerCountry[country],
        });
      }

      // console.log('array de pais/networks', arrNetworksPerArray);
      setNetworksPerCountry(arrNetworksPerArray);
    } catch (error) {
      console.log('erro:', error);
    }
  };

  //req 2 - função para pegar network pelo id
  const getNetworkById = async (idNetwork: string) => {
    const response = await axios.get(
      `http://api.citybik.es/v2/networks/${idNetwork}`,
    );
    const networkSelected: Network = response.data.network;
    // console.log('dados da rede selecionada', networkSelected);
    setNetworkDataSelected(networkSelected.stations);

    const qtyStationPerNetwork = networkSelected.stations.length;
    console.log('qde de estações da rede selecionda:', qtyStationPerNetwork);
    setQtyStationPerNetwork(qtyStationPerNetwork);

    const nameNetworkSelected = networkSelected.name;
    console.log('nome da rede selecionada:', nameNetworkSelected);
    setNameNetworkSelected(nameNetworkSelected);
  };

  // função para filtrar o país da network clicada
  const filterCountryNetworkClick = (network: Network) => {
    const country = network.location.country;
    const countryFiltered = networksPerCountry.filter(
      (item) => item.country === country,
    );
    // console.log('país filtrado com qde de redes', countryFiltered);
    setCountrySelected(countryFiltered);
  };

  //função para alterar o centro do mapa ao clicar numa network
  const changeCenterMap = (latitude: number, longitude: number) => {
    setCenterMap(latLng(latitude, longitude));
  };

  const clickNetworkMarker = (network: Network) => {
    openModalNetworkCountry();
    openModalStationNetwork();
    setZoomMap(12);

    const { latitude, longitude } = network.location;
    changeCenterMap(latitude, longitude);

    filterCountryNetworkClick(network);

    getNetworkById(network.id);

    setIsStations(true);
  };

  const showStationDetails = () => {
    // todo: abrir modal de detalhes da estação
    alert('estação clicada');
  };

  const closeModalNetwork = () => {
    setZoomMap(initialZoom);
    setCenterMap(initialCenterMap);
    closeModalNetworkCountry();
    closeModalStationNetwork();
    setIsStations(false);
  };

  const closeModalStation = () => {
    setZoomMap(initialZoom);
    setCenterMap(initialCenterMap);
    closeModalNetworkCountry();
    closeModalStationNetwork();
    setIsStations(false);
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

      {/* marcadores das estações da rede selecionada */}
      {isStations &&
        networkDataSelected.map((station) => (
          <StationMarker
            key={station.id}
            dataStation={station}
            onClick={showStationDetails}
          />
        ))}

      <div className="absolute bottom-2 left-2 z-[1000] flex flex-col gap-2">
        {/* modal com a quantidade de redes por país */}
        {isModalOpenNetworkCountry && (
          <ModalNetworksCountry
            onClick={closeModalNetwork}
            country={countrySelected[0].country}
            qtyNetworks={countrySelected[0].quantity}
          />
        )}

        {/* modal com a quantidade de estações por rede */}
        {isModalOpenStationNetwork && (
          <ModalStationsNetwork
            networkName={nameNetworkSelected}
            qtyStations={qtyStationPerNetwork}
            onClick={closeModalStation}
          />
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
