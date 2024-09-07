import { XIcon } from 'lucide-react';

type ModalNetworksCountryProps = {
  onClick: () => void;
};

export const ModalNetworksCountry = ({
  onClick,
}: ModalNetworksCountryProps) => {
  return (
    <div className="w-56 rounded-md border bg-white/75 pb-2">
      <div className="flex w-full justify-end">
        <XIcon className="m-1 stroke-1" size={18} onClick={onClick} />
      </div>

      <div className="px-2 font-bold">
        <p className="uppercase">BR</p>
        <p className="font-medium">
          30 networks installed in the country.
        </p>
      </div>
    </div>
  );
};
