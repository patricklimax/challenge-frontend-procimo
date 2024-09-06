import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type ZoomMapProps = {
  zoom: number;
};

export const ZoomInOut = ({ zoom }: ZoomMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setZoom(zoom);
  }, [map, zoom]);
  return null;
};

// const centerMap = map.getCenter() //pega o centro do mapa setado do componente pai
// const metodo = map.getZoom() // pegar zoom do mapa
// const metodo = map.getMaxZoom() //zoom maximo do mapa
// const metodo = map.getMinZoom() //zoom minimo do mapa
// const metodo = map.getSize() // pega tamanho do mapa na tela
// const metodo = map.setZoom() //atribuir zoom no mapa
