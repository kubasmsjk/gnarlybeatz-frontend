import LicencesInfo from "../LicencesInfo";

export default function LicencesInfoContainer() {
  return (
    <>
      <h1 className="flex justify-center py-10 text-red-700 text-4xl">
        Licences
      </h1>
      <div className="flex flex-row justify-center items-center text-white">
        <LicencesInfo
          leaseType="Standard Lease"
          cost="$10.00"
          fileType="mp3"
          isInstrumentalBeSold={true}
          isVocalTag={true}
          isCreatorRights={true}
        />

        <LicencesInfo
          leaseType="Deluxe Lease"
          cost="$20.00"
          fileType="mp3 and wav"
          isInstrumentalBeSold={true}
          isVocalTag={true}
          isCreatorRights={true}
        />

        <LicencesInfo
          leaseType="Exclusive Lease"
          cost="Make an offer"
          fileType="mp3, wav and trackouts"
          isInstrumentalBeSold={false}
          isVocalTag={false}
          isCreatorRights={false}
        />
      </div>
    </>
  );
}
