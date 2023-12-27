"use client";

import { Icons } from "../../../components/ui/Icons";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useFetchAudioFilesData } from "@/app/services/hooks/useFetchAudioFilesData";
import AudioPlayer from "./AudioPlayer";

export default function BeatsList() {
  const lastAudioFileDataRef = useRef<HTMLDivElement>(null);
  const { audioData, fetchNextPage, isError, isLoading } =
    useFetchAudioFilesData();

  const _audioData = audioData?.pages.flatMap((page) => page.content);

  const { ref, entry } = useIntersection({
    root: lastAudioFileDataRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="container max-w-full flex flex-col justify-center items-center">
      {isLoading && (
        <div role="status" className="flex justify-center items-center h-96">
          <Icons.loading />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {isError && (
        <div className="flex flex-col justify-center items-center h-96">
          <Icons.serverError />
          <h1 className="text-1xl sm:text-2xl">Server error</h1>
        </div>
      )}
      {_audioData?.map((element, index) => {
        if (index === _audioData.length - 1)
          return (
            <div
              className="container flex justify-center h-[4.1rem] sm:h-[7rem] md:h-[8.85rem] lg:h-[11rem] p-1.5 lg:p-2.5 animate-fade-up animate-delay-500"
              key={index}
              ref={ref}
            >
              <AudioPlayer
                name={element.name}
                genre={element.genre}
                mood={element.mood}
                bpm={element.bpm}
                keySignature={element.key}
                audioUrl={element.audioBlob}
                imageUrl={element.imageBlob}
              />
            </div>
          );
        return (
          <div
            className="container flex justify-center h-[4.1rem] sm:h-[7rem] md:h-[8.85rem] lg:h-[11rem] p-1.5 lg:p-2.5 animate-fade-up animate-delay-500"
            key={index}
          >
            <AudioPlayer
              name={element.name}
              genre={element.genre}
              mood={element.mood}
              bpm={element.bpm}
              keySignature={element.key}
              audioUrl={element.audioBlob}
              imageUrl={element.imageBlob}
            />
          </div>
        );
      })}
    </div>
  );
}
