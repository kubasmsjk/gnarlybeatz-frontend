"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Icons } from "../../../components/ui/Icons";
import { useWavesurfers } from "@/app/services/hooks/useWavesurfers";

type WavesurferProps = {
  url: string;
  pathname: string;
  volume: number;
};

export default function Wavesurfer(props: WavesurferProps) {
  const { wavesurfers, addWavesurfer } = useWavesurfers();
  const wavesurferAudioRef = useRef({} as WaveSurfer);
  const wavesurferRef = useRef({} as HTMLDivElement);
  const timeEl = useRef({} as HTMLDivElement);
  const durationEl = useRef({} as HTMLDivElement);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const progressGradient = ctx!.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#8A0303");
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#b80808"
    );
    progressGradient.addColorStop(1, "#a81f1f");

    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: "#6E6E6E",
      progressColor: progressGradient,
      barWidth: 2,
      height: "auto",
      normalize: true,
      url: props.url,
    });
    wavesurfer.setVolume(props.volume);
    addWavesurfer(wavesurfer);
    wavesurferAudioRef.current = wavesurfer;
    const duration = durationEl.current;
    const time = timeEl.current;
    wavesurfer.on(
      "decode",
      (seconds) => (duration.innerText = formatTime(seconds))
    );
    wavesurfer.on(
      "timeupdate",
      (seconds) => (time.innerText = formatTime(seconds))
    );
    wavesurfer.on("play", function () {
      setIsPlaying(true);
    });
    wavesurfer.on("pause", function () {
      setIsPlaying(false);
    });
    wavesurfer.on("finish", function () {
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    wavesurfers.map((audio) => {
      if (audio === wavesurferAudioRef.current) {
        wavesurferAudioRef.current.setVolume(props.volume);
      }
    });
  }, [props.volume]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <div className="container h-full flex flex-row pb-1 sm:pb-3 items-end">
      <div
        className={`flex justify-end items-center h-[20px] sm:h-[40px] md:h-[65px] ${
          props.pathname === "/beats"
            ? "lg:h-[80px]"
            : "lg:h-[80px] xl:h-[40px]"
        }`}
      >
        <button
          className={`h-[20px] sm:h-[30px] md:h-[44px] ${
            props.pathname === "/beats"
              ? "lg:h-[50px]"
              : "lg:h-[50px] xl:h-[30px]"
          } pr-1`}
          onClick={() => {
            wavesurfers.map((audio) => {
              if (audio === wavesurferAudioRef.current) {
                wavesurferAudioRef.current.playPause();
              } else {
                audio.pause();
              }
            });
          }}
        >
          {isPlaying ? <Icons.pause /> : <Icons.play />}
        </button>
      </div>
      <div
        className={`container h-[20px] sm:h-[40px] md:h-[65px] ${
          props.pathname === "/beats"
            ? "lg:h-[80px]"
            : "lg:h-[80px] xl:h-[40px]"
        } relative cursor-pointer`}
        ref={wavesurferRef}
      >
        <div
          className="absolute bg-black rounded-sm top-1/2 left-0 z-[10] text-[7px] sm:text-[10px] md:text-[11px] p-0.5 transform -translate-y-1/2"
          id="time"
          ref={timeEl}
        >
          0:00
        </div>
        <div
          className="absolute bg-black rounded-sm top-1/2 right-0 z-[10] text-[7px] sm:text-[10px] md:text-[11px] p-0.5 transform -translate-y-1/2"
          id="duration"
          ref={durationEl}
        >
          0:00
        </div>
      </div>
    </div>
  );
}
