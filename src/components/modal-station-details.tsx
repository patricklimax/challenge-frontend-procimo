import { XIcon } from 'lucide-react';
import { Station } from '../types/station';

type ModalStationDetailsProps = {
  station: Station;
  onClick: () => void;
};

export const ModalStationDetails = ({
  station,
  onClick,
}: ModalStationDetailsProps) => {
  return (
    <div className="rounded-md border bg-white/75 pb-2">
      <div className="flex w-full justify-end">
        <XIcon className="m-1 stroke-1" size={18} onClick={onClick} />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <h2 className="text-center text-lg font-semibold">Station Name: {station.name}</h2>
        <div>
          <p>Bicicletas livres: {station.free_bikes}</p>
          <p>Slots vazios: {station.empty_slots}</p>
          <p>
            Coordenadas: ({station.latitude}, {station.longitude})
          </p>
          <p>Time Stamp: {station.timestamp}</p>
        </div>
        {/* <div>
         <p> {station?.extra?.address}</p>
         <p> {station?.extra?.altitude}</p>
         <p> {station?.extra?.description}</p>
         <p> {station?.extra?.ebikes}</p>
         <p> {station?.extra?.has_ebikes}</p>
         <p> {station?.extra?.last_update}</p>
         <p> {station?.extra?.number}</p>
         <p> {station?.extra?.online}</p>
         <p> {station?.extra?.payment}</p>
         <p> {station?.extra?.payment_terminal}</p>
         <p> {station?.extra?.photo}</p>
         <p> {station?.extra?.post_code}</p>
         <p> {station?.extra?.renting}</p>
         <p> {station?.extra?.returning}</p>
         <p> {station?.extra?.reviews}</p>
         <p> {station?.extra?.score}</p>
         <p> {station?.extra?.slots}</p>
         <p> {station?.extra?.station_id}</p>
         <p> {station?.extra?.status}</p>
         <p> {station?.extra?.uid}</p>
        </div> */}
      </div>
    </div>
  );
};
