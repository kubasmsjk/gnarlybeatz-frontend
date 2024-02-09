"use client";

import { Icons } from "../../../components/ui/Icons";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useFetchAudioFilesData } from "@/app/services/hooks/useFetchAudioFilesData";
import AudioPlayer from "./AudioPlayer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFavoriteBeats } from "@/app/services/hooks/useFavoriteBeats";

export default function BeatsList() {
  const { data: session, status } = useSession();
  const { favoriteBeatErrors } = useFavoriteBeats();
  const pathname = usePathname();
  const lastAudioFileDataRef = useRef<HTMLDivElement>(null);

  const { audioData, fetchNextPage, isError, isLoading } =
    useFetchAudioFilesData(pathname, session, status);

  const _audioData = audioData?.pages.flatMap((page) => page?.content);

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
    <>
      {favoriteBeatErrors.get("account") != "" ? (
        <span className="flex justify-center w-[95%] pb-8 text-xs sm:text-sm text-red-600">
          {favoriteBeatErrors.get("account")}
        </span>
      ) : null}
      {favoriteBeatErrors.get("file") != "" ? (
        <span className="flex justify-center w-[95%] pb-8 text-xs sm:text-sm text-red-600">
          {favoriteBeatErrors.get("file")}
        </span>
      ) : null}

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
                className={`container flex justify-center h-[4.1rem] sm:h-[7rem] md:h-[8.85rem] ${
                  pathname === "/beats"
                    ? "lg:h-[11rem]"
                    : "lg:h-[11rem] xl:h-[7rem]"
                } p-1.5 lg:p-2.5 animate-fade-up animate-delay-500`}
                key={index}
                ref={ref}
              >
                <AudioPlayer
                  licenseType={"Standard Lease"}
                  name={element.name}
                  genre={element.genre}
                  mood={element.mood}
                  bpm={element.bpm}
                  keySignature={element.key}
                  audioUrl={element.audioBlob}
                  imageUrl={element.imageBlob}
                  pathname={pathname}
                  productStripeId={element.productStripeId}
                  standardProductStripePriceId={
                    element.standardProductStripePriceId
                  }
                  deluxeProductStripePriceId={
                    element.deluxeProductStripePriceId
                  }
                  purchased={element.purchased}
                />
              </div>
            );
          return (
            <div
              className={`container flex justify-center h-[4.1rem] sm:h-[7rem] md:h-[8.85rem] ${
                pathname === "/beats"
                  ? "lg:h-[11rem]"
                  : "lg:h-[11rem] xl:h-[7rem]"
              } p-1.5 lg:p-2.5 animate-fade-up animate-delay-500`}
              key={index}
            >
              <AudioPlayer
                licenseType={"Standard Lease"}
                name={element.name}
                genre={element.genre}
                mood={element.mood}
                bpm={element.bpm}
                keySignature={element.key}
                audioUrl={element.audioBlob}
                imageUrl={element.imageBlob}
                pathname={pathname}
                productStripeId={element.productStripeId}
                standardProductStripePriceId={
                  element.standardProductStripePriceId
                }
                deluxeProductStripePriceId={element.deluxeProductStripePriceId}
                purchased={element.purchased}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
