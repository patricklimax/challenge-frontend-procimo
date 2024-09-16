import { XIcon } from 'lucide-react';

type ModalStationsNetworkProps = {
  networkName: string | null
  qtyStations: number | null
  onClick: () => void;
};

export const ModalStationsNetwork = ({
  networkName,
  qtyStations,
  onClick,
}: ModalStationsNetworkProps) => {
  return (
    <div className="w-56 rounded-md border bg-white/75 pb-2">
      <div className="flex w-full justify-end">
        <XIcon className="m-1 stroke-1" size={18} onClick={onClick} />
      </div>

      <div className="px-2 font-bold">
        <p className="uppercase">Network: {networkName}</p>
        <p className="font-medium">
          {qtyStations} estação(es) instalada(s) nesta rede.
        </p>
      </div>
    </div>
  );
};
