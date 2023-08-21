import LicencesInfo from "../LicencesInfo";

export default function LicencesInfoContainer() {
  return (
    <div className="container max-w-full" id="licences-section">
      <h1 className="flex justify-center py-4 sm:py-9 text-red-700 text-2xl sm:text-4xl">
        Licences
      </h1>
      <div className="container max-w-full flex justify-center items-center flex-col sm:flex-col md:flex-col lg:flex-row">
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
    </div>
  );
}
