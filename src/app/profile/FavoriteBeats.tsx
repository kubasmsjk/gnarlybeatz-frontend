"use client";

import { useEffect } from "react";
import BeatsList from "../beats/audio/BeatsList";
import BeatsForm from "../beats/forms/BeatsForm";
import { useQueryClient } from "@tanstack/react-query";

export default function FavoriteBeats() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["favoriteBeatErrors"] });
    queryClient.removeQueries({ queryKey: ["beatFormFilterValues"] });
    queryClient.removeQueries({ queryKey: ["audioData"] });
  }, []);

  return (
    <>
      <BeatsForm />
      <BeatsList />
    </>
  );
}
