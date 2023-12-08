import ContactForm from "@/components/forms/ContactForm";
import LicensesInfoContainer from "@/components/ui/licenses/LicensesInfoContainer";

export default function Dashboard() {
  return (
    <main className="container flex flex-col max-w-full items-center justify-center">
      <LicensesInfoContainer />
      <ContactForm />
    </main>
  );
}
