import Link from "next/link";

type LicensesInfoProps = {
  leaseType: string;
  cost: string;
  fileType: string;
  isInstrumentalBeSold: boolean;
  isVocalTag: boolean;
  isCreatorRights: boolean;
};

export default function LicensesInfo(props: LicensesInfoProps) {
  return (
    <div className="p-4">
      <p className="flex justify-center pb-3 text-xl sm:text-2xl font-semibold">
        {props.leaseType}
      </p>
      <ul className="flex flex-col items-start justify-start rounded-lg bg-[#8A0303] bg-opacity-20 shadow-lg shadow-[#660000] w-80 sm:w-96 h-fit p-2 sm:p-3">
        <li className="self-center text-lg sm:text-2xl py-3 sm:py-5">
          {props.cost}
        </li>
        <li className="text-base sm:text-xl">
          File type(s): <span className=" font-light"> {props.fileType}</span>
        </li>
        <li className="text-base sm:text-xl">
          Instrumental:
          <span className=" font-light">
            {" "}
            {props.isInstrumentalBeSold ? "will still" : "will no longer"} be
            sold{" "}
          </span>
        </li>
        <li className="text-base sm:text-xl">
          Vocal Tag(s):
          <span className=" font-light">
            {" "}
            {props.isVocalTag ? "Yes" : "No"}
          </span>
        </li>
        <li className="text-base sm:text-xl">
          Credit:<span className="font-light"> ‘Prod. xGnarly’</span>
        </li>
        <li className="flex justify-center items-center w-full p-2 text-sm sm:text-sm">
          The {props.isCreatorRights ? "creator" : "artist"} maintains full
          instrumental rights
        </li>
        <li className="flex justify-center items-center w-full p-0.5">
          <Link
            href={`/?showLicenseInfoModal=y&leaseType=${props.leaseType}`}
            className="bg-transparent text-red-700 font-bold py-1 hover:text-white "
          >
            More about the license
          </Link>
        </li>
      </ul>
    </div>
  );
}
