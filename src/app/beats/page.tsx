import BeatsForm from "@/app/beats/forms/BeatsForm";
import BeatsList from "@/app/beats/audio/BeatsList";

export default function Beats() {
  return (
    <main className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Beats
      </h1>
      <BeatsForm />
      <BeatsList />
    </main>
  );
}
