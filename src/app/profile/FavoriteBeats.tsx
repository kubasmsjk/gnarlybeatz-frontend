"use client";

import { useEffect } from "react";
import BeatsList from "../beats/audio/BeatsList";
import BeatsForm from "../beats/forms/BeatsForm";
import { useQueryClient } from "@tanstack/react-query";

export default function FavoriteBeats() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["favoriteBeatErrors"] });
    queryClient.removeQueries({ queryKey: ["fetchFilterData"] });
    queryClient.removeQueries({ queryKey: ["beatFormFilterValues"] });
    queryClient.removeQueries({ queryKey: ["audioData"] });
    queryClient.setQueryData(["selectBpmValues"], () => new Set(["-"]));
    queryClient.setQueryData(["selectKeyValues"], () => new Set(["-"]));
    queryClient.setQueryData(["selectMoodsValues"], () => new Set(["-"]));
    queryClient.setQueryData(["selectGenresValues"], () => new Set(["-"]));
  }, []);

  return (
    <>
      <BeatsForm />
      <BeatsList />
    </>
  );
}
