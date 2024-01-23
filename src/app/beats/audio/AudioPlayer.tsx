"use client";

import Image from "next/image";
import Wavesurfer from "./Wavesurfer";
import { Icons } from "@/components/ui/Icons";
import { useFavoriteBeats } from "@/app/services/hooks/useFavoriteBeats";
import { useState } from "react";
import { useSession } from "next-auth/react";

type AudioPlayerProps = {
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  audioUrl: string;
  imageUrl: string;
  pathname: string;
};

export default function AudioPlayer(props: AudioPlayerProps) {
  const { addFavoriteBeatMutation, removeFavoriteBeatMutation } =
    useFavoriteBeats();
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="container flex flex-row w-[20.6rem] sm:w-[60rem] bg-[#8A0303] bg-opacity-20 rounded-lg shadow-lg shadow-[#660000]">
      <div className="relative w-[17%]">
        <Image
          src={props.imageUrl}
          alt={props.name + " image"}
          fill
          priority
          className="object-contain object-left rounded-l-lg"
          decoding="async"
        />
      </div>
      <div className="flex flex-col w-[83%] h-full px-1 sm:px-2 pt-1 sm:pt-2">
        <div className="flex flex-row justify-between h-fit">
          <div
            className={`text-xs sm:text-xl ${
              props.pathname === "/beats" ? "lg:text-2xl" : "lg:text-xl"
            }  font-light pl-0.5 sm:pl-1`}
          >
            <p>{props.name}</p>
          </div>
          <div
            className={`flex flex-row space-x-0.5 items-center text-[0.42rem] sm:text-[0.7rem] ${
              props.pathname === "/beats"
                ? "lg:text-[0.8rem]"
                : "lg:text-[0.7rem]"
            }  font-light`}
          >
            <p className="bg-black rounded-md px-2 py-0.5">#{props.genre}</p>
            <p className="bg-black rounded-md px-2 py-0.5">#{props.mood}</p>
            <p className="bg-black rounded-md px-2 py-0.5">bpm: {props.bpm}</p>
            <p className="bg-black rounded-md px-2 py-0.5">
              key: {props.keySignature}
            </p>
          </div>
        </div>
        <div className="flex flex-row h-full">
          <div className="flex w-full h-full">
            <Wavesurfer url={props.audioUrl} pathname={props.pathname} />
          </div>
          <div
            className={`flex justify-center items-center w-1/5 pt-1.5 sm:pt-1 ${
              props.pathname === "/beats" ? "lg:pt-4" : "lg:pt-0"
            }`}
          >
            {session ? (
              <button
                className={`w-1/3 h-3 sm:h-6 md:h-7 ${
                  props.pathname === "/beats"
                    ? "lg:h-9 lg:p-1"
                    : "lg:h-5 lg:p-0"
                } p-0 sm:p-0.5 
                ${buttonAnimate ? "animate-jump" : ""}`}
                onClick={() => {
                  setButtonAnimate(!buttonAnimate);
                  if (props.pathname === "/beats") {
                    addFavoriteBeatMutation.mutate({
                      userId: session.user.id,
                      name: props.name,
                    });
                  } else {
                    removeFavoriteBeatMutation.mutate({
                      userId: session.user.id,
                      name: props.name,
                    });
                  }
                }}
              >
                {props.pathname === "/beats" ? (
                  <Icons.heart />
                ) : (
                  <Icons.heartOff />
                )}
              </button>
            ) : null}
            <button
              className={`bg-black rounded sm:rounded-md
              ${
                session && session?.user
                  ? `w-2/3 text-[0.3rem] sm:text-[0.6rem] sm:leading-[1rem] ${
                      props.pathname === "/beats"
                        ? "lg:text-xs"
                        : "lg:text-[0.6rem]"
                    } px-[0.06rem] md:px-1 lg:px-2 py-0.5 md:py-1.5 ${
                      props.pathname === "/beats" ? "lg:py-2" : "lg:py-1"
                    }`
                  : `text-[0.4rem] sm:text-xs lg:text-xs px-0.5 md:px-2 py-0.5 sm:py-2`
              }`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
