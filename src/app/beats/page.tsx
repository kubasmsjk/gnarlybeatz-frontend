import BeatsForm from "@/components/forms/BeatsForm";
import BeatsList from "@/components/ui/audio/BeatsList";

export default function Dashboard() {
  return (
    <main className="container flex flex-col max-w-full items-center justify-center">
      <BeatsForm />
      <BeatsList />
    </main>
  );
}
