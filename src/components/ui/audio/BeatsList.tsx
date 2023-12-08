"use client";

import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Icons } from "../Icons";
import { backendConfig } from "@/config/site";
import { b64toBlob } from "@/components/services/b64ToBlob";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import AudioPlayer from "./AudioPlayer";
import { useBeatsFormFilter } from "@/services/useBeatsFormFilter";

type AudioFileData = {
  content: [Content];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

type Content = {
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  key: string;
  audioBlob: string;
  imageBlob: string;
};

export default function BeatsList() {
  const lastAudioFileDataRef = useRef<HTMLDivElement>(null);
  const {
    filterValues,
    addSelectBpmValues,
    addSelectKeyValues,
    addSelectMoodsValues,
    addSelectGenresValues,
  } = useBeatsFormFilter();

  const fetchAudioFilesData = async (page: number): Promise<AudioFileData> =>
    await axios
      .get(
        backendConfig.url +
          `/api/audio/search?pageNo=${page}&pageSize=2&name=${
            filterValues.get("search") || ""
          }&genre=${filterValues.get("genre") || ""}&mood=${
            filterValues.get("mood") || ""
          }&bpm=${filterValues.get("bpm") || ""}&key=${
            filterValues.get("key") || ""
          }`
      )
      .then((response) => {
        response.data.content.map((element: Content) => {
          addSelectBpmValues(element.bpm);
          addSelectKeyValues(element.key);
          addSelectMoodsValues(element.mood);
          addSelectGenresValues(element.genre);
          const audioBlob = b64toBlob(element.audioBlob, "audio/mp3");
          const audioUrl = URL.createObjectURL(audioBlob);
          const imageBlob = b64toBlob(element.imageBlob, "image/png");
          const imageUrl = URL.createObjectURL(imageBlob);
          element.audioBlob = audioUrl;
          element.imageBlob = imageUrl;
        });
        return response.data;
      });

  const {
    data: audioData,
    fetchNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["audioData"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchAudioFilesData(pageParam);
      return response;
    },
    getNextPageParam: (_, pages) => {
      return pages.length;
    },
    initialPageParam: 0,
  });

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
