type LicencesInfoProps = {
  leaseType: string;
  cost: string;
  fileType: string;
  isInstrumentalBeSold: boolean;
  isVocalTag: boolean;
  isCreatorRights: boolean;
}

export default function LicencesInfo(props: LicencesInfoProps) {
  return (
    <div className="p-4">
      <p className="flex justify-center pb-3 text-xl sm:text-2xl font-semibold">
        {props.leaseType}
      </p>
      <ul className="flex flex-col items-start justify-start  rounded-lg bg-[#8A0303] bg-opacity-20 w-80 sm:w-96 h-56 sm:h-72 p-2 sm:p-3">
        <li className="self-center text-lg sm:text-2xl py-3 sm:py-5">
          {props.cost}
        </li>
        <li className="text-base sm:text-xl">File type(s): {props.fileType}</li>
        <li className="text-base sm:text-xl">
          Instrumental: will{" "}
          {props.isInstrumentalBeSold ? "still" : "will no longer"} be sold
        </li>
        <li className="text-base sm:text-xl">
          Vocal Tag(s): {props.isVocalTag ? "Yes" : "No"}
        </li>
        <li className="text-base sm:text-xl">Credit: ‘Prod. xGnarly’</li>
        <li className="text-sm sm:text-base">
          The {props.isCreatorRights ? "creator" : "artist"} maintains full
          instrumental rights
        </li>
      </ul>
    </div>
  );
}
