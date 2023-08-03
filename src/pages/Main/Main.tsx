import Image from "next/image";
import background from "../../../public/assets/banner.webp";
import ContactForm from "@/components/forms/ContactForm";
import LicencesInfoContainer from "@/components/forms/LicencesInfoContainer";
export default function Main() {
  return (
    <>
      <div className="w-full h-2/5 relative">
        <Image
          src={background}
          alt="xGnarly logo image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full"
        />
      </div>
      <div className="flex flex-col w-full h-fit" id="licences-section">
        <LicencesInfoContainer />
      </div>

      <div className="flex flex-col w-full h-fit" id="contact-section">
        <ContactForm />
        <div className="bg-black h-12 w-[34rem] mx-auto mt-auto rounded-t-3xl border-t-2 border-[#8A0303]"></div>
      </div>
    </>
  );
}
