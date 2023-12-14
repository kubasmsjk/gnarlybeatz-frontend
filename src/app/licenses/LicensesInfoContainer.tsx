import LicensesInfo from "./LicensesInfo";
import LicensesInfoModal from "./LicensesInfoModal";

export default function LicensesInfoContainer() {
  return (
    <>
      <LicensesInfoModal />
      <div className="container max-w-full" id="licenses-section">
        <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
          Licenses
        </h1>
        <div className="container max-w-full flex justify-center items-center flex-col sm:flex-col md:flex-col lg:flex-row">
          <LicensesInfo
            leaseType="Standard Lease"
            cost="$10.00"
            fileType="mp3"
            isInstrumentalBeSold={true}
            isVocalTag={true}
            isCreatorRights={true}
          />
          <LicensesInfo
            leaseType="Deluxe Lease"
            cost="$20.00"
            fileType="mp3 and wav"
            isInstrumentalBeSold={true}
            isVocalTag={true}
            isCreatorRights={true}
          />
          <LicensesInfo
            leaseType="Exclusive Lease"
            cost="Make an offer"
            fileType="mp3, wav and trackouts"
            isInstrumentalBeSold={false}
            isVocalTag={false}
            isCreatorRights={false}
          />
        </div>
      </div>
    </>
  );
}
