import ContactForm from "@/components/forms/ContactForm";
import LicencesInfoContainer from "@/components/ui/licences/LicencesInfoContainer";

export default function Dashboard() {
  return (
    <main className="container flex flex-col max-w-full items-center justify-center">
      <LicencesInfoContainer />
      <ContactForm />
    </main>
  );
}
