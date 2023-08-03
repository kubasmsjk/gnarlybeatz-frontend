
interface LicencesInfoProps {
    leaseType: string,
    cost: string,
    fileType: string,
    isInstrumentalBeSold: boolean,
    isVocalTag: boolean,
    isCreatorRights: boolean
}

export default function LicencesInfo(props: LicencesInfoProps) {
    return (
        <div className="px-4">
            <p className="flex justify-center py-2 text-white text-3xl font-semibold">{props.leaseType}</p>
        <ul className="bg-[#8A0303] bg-opacity-20 p-4">
            <li className="flex justify-center py-3 text-white text-3xl">{props.cost}</li>
            <li className="flex justify-center text-white text-1xl">File type(s): {props.fileType}</li>
            <li className="flex justify-center text-white text-1xl">Instrumental: will {props.isInstrumentalBeSold ? "still" : "will no longer"} be sold</li>
            <li className="flex justify-center text-white text-1xl">Vocal Tag(s): {props.isVocalTag ? "Yes" : "No"}</li>
            <li className="flex justify-center text-white text-1xl">Credit: ‘Prod. xGnarly’</li>
            <li className="flex  text-white text-1xl">The {props.isCreatorRights ? "creator" : "artist"} maintains full instrumental rights</li>
        </ul>
        </div>
    );
  }
  