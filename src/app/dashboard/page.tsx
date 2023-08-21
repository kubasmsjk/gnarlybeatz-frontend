import ContactForm from "@/components/forms/ContactForm";
import LicencesInfoContainer from "@/components/forms/LicencesInfoContainer";

export default function Dashboard() {
  return (
    <main className="container flex flex-col max-w-full items-center justify-center">
      <LicencesInfoContainer />
      <div className="container flex flex-col max-w-full items-center justify-center">
        <ContactForm />
        <div className="container flex flex-col max-w-full items-center justify-center bg-black w-[20.5rem] sm:w-[30rem] h-[2.8rem] sm:h-14  mt-auto rounded-t-3xl border-t-2 border-[#8A0303]"></div>
      </div>
    </main>
  );
}
