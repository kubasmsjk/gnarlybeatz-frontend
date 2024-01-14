import LicensesInfoContainer from "@/app/licenses/LicensesInfoContainer";
import ContactForm from "@/app/contact/ContactForm";

export default function Home() {
  return (
    <main
      className={`container flex flex-col max-w-full justify-center items-center`}
    >
      <LicensesInfoContainer />
      <ContactForm />
    </main>
  );
}
