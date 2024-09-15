import { MapContainer, TileLayer } from 'react-leaflet';

import axios from 'axios';
import { latLng, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useModalNetworkCountry } from '../stores/networks-country';
import { Network } from '../types/network';
import { Station } from '../types/station';
import { CenterMap } from './map-center';
import { ZoomInOut } from './map-zoom';
import { ModalNetworksCountry } from './modal-networks-country';
import { ModalStationsNetwork } from './modal-stations-network';
import { NetworkMarker } from './network-marker';
import { StationMarker } from './station-marker';
import { useModalDetailStation } from '../stores/details-station';
import { ModalStationDetails } from './modal-station-details';
import { LoadingInitialCountNetwork } from './loading-initial-count-networks';
import { useModalStationNetwork } from '../stores/stations-network';
import { XIcon } from 'lucide-react';

const initialCenterMap = latLng(20.7321944, -28.510347);
const initialZoom = 3;

type NetworkCountryProps = {
  country: string;
  quantity: number;
};

const url = 'https://api.citybik.es/v2/networks';

export const Map = () => {
  //1 state para armazenar as Networks
  const [networks, setNetworks] = useState<Network[]>([]);
  //state para salvar o array de network per country
  const [networksCountry, setNetworksCountry] = useState<NetworkCountryProps[]>([]);
  //state para salvar dados de qty of networks per country, da network clicada
  const [countrySelected, setCountrySelected] = useState<NetworkCountryProps[]>([]);

  //state para salvar dados da rede clicada, e pegar as stations
  const [stationsOfNetwork, setStationsOfNetwork] = useState<Station[]>([]);
  const [isStations, setIsStations] = useState(false);

  const [qtyStationPerNetwork, setQtyStationPerNetwork] = useState<number | null>(
    null,
  );
  const [nameNetworkSelected, setNameNetworkSelected] = useState<string | null>(
    null,
  );

  // zoom e centro do mapa
  const [zoomMap, setZoomMap] = useState<number>(initialZoom);
  const [centerMap, setCenterMap] = useState<LatLng>(initialCenterMap);

  //state para salvar dados da station clicaca
  const [stationSelected, setStationSelected] = useState<Station>();

  //pesquisa cidade, rede, estação
  const [inputSearch, setInputSearch] = useState('');
  const [scrollZoomMap, setScrollZoomMap] = useState<boolean>(true);

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

  const {
    isModalOpenDetailStation,
    openModalDetailStation,
    closeModalDetailStation,
  } = useModalDetailStation();

  //req 1 - função para pegar as Networks
  const getNetworks = async () => {
    try {
      const response = await axios.get(url);
      const dataNetwork: Network[] = await response.data.networks;
      // console.log('Dados Networks:', dataNetwork);
      // console.log('Quantity Networks:', dataNetwork.length);
      setNetworks(dataNetwork);

      // contabiliza networks por country - retorna um objeto
      const networksCountry: Record<string, number> = {};
      for (const network of dataNetwork) {
        const country = network.location.country;
        if (!networksCountry[country]) {
          networksCountry[country] = 1;
        } else {
          networksCountry[country] = networksCountry[country] + 1;
        }
      }

      console.log('dados...', networksCountry)

      //converte objeto anterior em array
      const arrNetworksPerArray: NetworkCountryProps[] = [];
      for (const country in networksCountry) {
        arrNetworksPerArray.push({
          country: country,
          quantity: networksCountry[country],
        });
      }

      // console.log('array de pais/networks', arrNetworksPerArray);
      setNetworksCountry(arrNetworksPerArray);
    } catch (error) {
      console.log('erro:', error);
    }
  };

  //req 2 - função para pegar network pelo id
  const getNetworkById = async (idNetwork: string) => {
    const response = await axios.get(`${url}/${idNetwork}`);
    const networkSelected: Network = response.data.network;
    // console.log('dados da rede selecionada', networkSelected);
    setStationsOfNetwork(networkSelected.stations);

    const qtyStationPerNetwork = networkSelected.stations.length;
    // console.log('qde de estações da rede selecionda:', qtyStationPerNetwork);
    setQtyStationPerNetwork(qtyStationPerNetwork);

    const nameNetworkSelected = networkSelected.name;
    // console.log('nome da rede selecionada:', nameNetworkSelected);
    setNameNetworkSelected(nameNetworkSelected);
  };

  // função para filtrar o país da network clicada
  const filterCountryNetworkClick = (network: Network) => {
    const country = network.location.country;
    const countryFiltered = networksCountry.filter(
      (item) => item.country === country,
    );
    // console.log('país filtrado com qde de redes', countryFiltered);
    setCountrySelected(countryFiltered);
  };

  //função para alterar o centro do mapa ao clicar numa network
  // const changeCenterMap = (latitude: number, longitude: number) => {
  //   setCenterMap(latLng(latitude, longitude));
  // };

  const clickNetworkMarker = (network: Network) => {
    openModalNetworkCountry();
    openModalStationNetwork();
    setZoomMap(12);

    const { latitude, longitude } = network.location;
    setCenterMap(latLng(latitude, longitude));

    setIsStations(true);
    filterCountryNetworkClick(network);
    getNetworkById(network.id);
    setInputSearch('');
  };

  const handleClickStationDetails = (idStation: string) => {
    setInputSearch('');
    openModalDetailStation();

    const stationDataSelected = stationsOfNetwork.find(
      (station) => station.id === idStation,
    );
    // console.log('dados da station selecionada', stationDataSelected);
    setStationSelected(stationDataSelected);
  };

  const closeModalNetworkAndStation = () => {
    setZoomMap(initialZoom);
    setCenterMap(initialCenterMap);
    closeModalNetworkCountry();
    closeModalStationNetwork();
    setIsStations(false);
    closeModalDetailStation();
  };

  const closeModalStationDetails = () => {
    closeModalDetailStation();
  };

  //salva a listagem de cidades ou estações que contenham o termo da pesquisa
  const networkCityList =
    inputSearch.length > 0
      ? networks.filter(
          (rede) =>
            rede.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
            rede.location.city.toLowerCase().includes(inputSearch.toLowerCase()),
        )
      : [];

  // console.log('rede name', networkCityList);
  // função a ser chamada ao clicar em algum item da lista de cidades/rede
  const clickListNetworkCity = (network: Network) => {
    setCenterMap(latLng(network.location.latitude, network.location.longitude));
    setZoomMap(12);
    setIsStations(true);
    getNetworkById(network.id);
    setInputSearch('');
    openModalNetworkCountry();
    openModalStationNetwork();
    closeModalDetailStation();
    filterCountryNetworkClick(network);
  };

  //limpa o input de busca
  const clearInputSearch = () => {
    setInputSearch('');
  };

  //1 pegar as estações sempre que inicializar a aplicação
  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <>
      <MapContainer
        className="relative h-[calc(100vh-3rem)] w-full"
        center={initialCenterMap}
        zoom={zoomMap}
        scrollWheelZoom={scrollZoomMap}
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
          stationsOfNetwork.map((station) => (
            <StationMarker
              key={station.id}
              dataStation={station}
              onClick={handleClickStationDetails}
            />
          ))}
        {/* área dos modais */}
        <div className="absolute bottom-2 left-2 z-[1000] flex flex-col gap-2">
          {/* modal com a quantidade de redes por país */}
          {isModalOpenNetworkCountry && (
            <ModalNetworksCountry
              onClick={closeModalNetworkAndStation}
              country={countrySelected[0].country}
              qtyNetworks={countrySelected[0].quantity}
            />
          )}

          {/* modal com a quantidade de estações por rede */}
          {isModalOpenStationNetwork && (
            <ModalStationsNetwork
              networkName={nameNetworkSelected}
              qtyStations={qtyStationPerNetwork}
              onClick={closeModalNetworkAndStation}
            />
          )}

          {/* loading antes do carregamento das redes  */}
          {networks.length === 0 ? (
            <LoadingInitialCountNetwork statusphrase={'Loading networks...'} />
          ) : (
            <LoadingInitialCountNetwork
              statusphrase={`Number of networks around the world: ${networks.length}`}
            />
          )}
        </div>
        {/* // todo: mandar as informações da estação clicada */}
        {isModalOpenDetailStation && stationSelected && (
          <div className="absolute bottom-20 right-4 z-[1000]">
            <ModalStationDetails
              station={stationSelected}
              onClick={closeModalStationDetails}
            />
          </div>
        )}
        {/* modificar o zoom do mapa */}
        <ZoomInOut zoom={zoomMap} />
        {/* modificar o centro do mapa */}
        <CenterMap latitude={centerMap.lat} longitude={centerMap.lng} />
      </MapContainer>
      <div className="absolute left-16 top-3 z-[1000]">
        <div className="relative">
          <input
            type="text"
            name="inputSearch"
            className="w-80 rounded-md px-4 py-2 text-sm outline-none md:w-[28rem] md:text-xl"
            placeholder="Pesquise por uma cidade ou rede..."
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
          />

          <span className="absolute right-2 top-1/2 z-[1500] -translate-y-1/2 cursor-pointer">
            <XIcon size={16} strokeWidth={4} onClick={clearInputSearch} />
          </span>
        </div>

        {/* testar valor do input */}
        {inputSearch.length > 0 && (
          <div className="mt-2 w-80 rounded-md bg-white/75 md:w-[28rem]">
            {/* <p>{inputSearch}</p> */}
            {networkCityList.length <= 0 ? (
              <ul
                className="h-auto max-h-40 rounded-md bg-red-300"
                onMouseEnter={() => setScrollZoomMap(false)}
                onMouseLeave={() => setScrollZoomMap(true)}
              >
                <li className="px-3 py-2 text-sm hover:font-bold md:text-xl">
                  Pesquisa não encontrada!
                </li>
              </ul>
            ) : (
              <ul
                className="h-auto max-h-44 overflow-y-auto px-3"
                onMouseEnter={() => setScrollZoomMap(false)}
                onMouseLeave={() => setScrollZoomMap(true)}
              >
                {networkCityList.map((item) => {
                  return (
                    <li
                      className="cursor-pointer px-3 py-2 text-sm transition-all duration-500 hover:font-bold md:text-xl"
                      key={item.id}
                      onClick={() => clickListNetworkCity(item)}
                    >
                      {item.name} - {item.location.city}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};
