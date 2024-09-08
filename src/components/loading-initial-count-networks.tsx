type StatusPhrase = {
  statusphrase: string;
};
export const LoadingInitialCountNetwork = ({ statusphrase }: StatusPhrase) => {
  return (
    <div className="w-fit rounded-md bg-white/75 p-1">
      <p className="px-1">{statusphrase}</p>
    </div>
  );
};
