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
        <h2 className="text-center text-lg font-semibold">Nome da Estação</h2>
        <div>
          <p>Bikes Free: {station.free_bikes}</p>
          <p>Empty Slots: {station.empty_slots}</p>
          <p>
            Coordenadas: ({station.latitude}, {station.longitude})
          </p>
          <p>Time Stamp: {station.timestamp}</p>
        </div>
      </div>
    </div>
  );
};
