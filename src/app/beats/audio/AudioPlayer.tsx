import Image from "next/image";
import Wavesurfer from "./Wavesurfer";

type AudioPlayerProps = {
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  audioUrl: string;
  imageUrl: string;
};

export default function AudioPlayer(props: AudioPlayerProps) {
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
          <div className="text-xs sm:text-xl lg:text-2xl font-light pl-0.5 sm:pl-1">
            <p>{props.name}</p>
          </div>
          <div className="flex flex-row space-x-0.5 items-center text-[0.42rem] sm:text-[0.7rem] lg:text-[0.8rem] font-light">
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
            <Wavesurfer url={props.audioUrl} />
          </div>
          <div className="flex justify-center items-center w-1/5 pt-1.5 sm:pt-1 lg:pt-4">
            <button className="bg-black text-[0.4rem] sm:text-xs lg:text-sm px-0.5 md:px-3 py-0.5 sm:py-2 rounded-md">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
