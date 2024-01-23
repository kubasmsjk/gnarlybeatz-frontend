"use client";

import BeatsForm from "@/app/beats/forms/BeatsForm";
import BeatsList from "@/app/beats/audio/BeatsList";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Beats() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["favoriteBeatErrors"] });
    queryClient.removeQueries({ queryKey: ["beatFormFilterValues"] });
    queryClient.removeQueries({ queryKey: ["audioData"] });
  }, []);

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
