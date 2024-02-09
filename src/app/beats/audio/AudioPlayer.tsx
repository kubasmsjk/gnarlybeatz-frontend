"use client";

import Image from "next/image";
import Wavesurfer from "./Wavesurfer";
import { Icons } from "@/components/ui/Icons";
import { useFavoriteBeats } from "@/app/services/hooks/useFavoriteBeats";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/app/services/hooks/useCart";
import { toast } from "react-toastify";

type Beat = {
  licenseType: string;
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  imageUrl: string;
  productStripeId: string;
  standardProductStripePriceId: string;
  deluxeProductStripePriceId: string;
  purchased: boolean;
};

type AudioPlayerProps = Beat & {
  audioUrl: string;
  pathname: string;
};

export default function AudioPlayer(props: AudioPlayerProps) {
  const { addFavoriteBeatMutation, removeFavoriteBeatMutation } =
    useFavoriteBeats();
  const { cart, addBeatToCart, addToPrice } = useCart();
  const [buttonLikeAnimate, setButtonLikeAnimate] = useState(false);
  const [buttonAddToCartAnimate, setButtonAddToCartAnimate] = useState(false);
  const { data: session, status } = useSession();
  const [volume, setVolume] = useState(0.5);

  const handleAddToCart = (
    licenseType: string,
    name: string,
    genre: string,
    mood: string,
    bpm: string,
    keySignature: string,
    imageUrl: string,
    productStripeId: string,
    standardProductStripePriceId: string,
    deluxeProductStripePriceId: string,
    purchased: boolean
  ) => {
    const newBeat: Beat = {
      licenseType: licenseType,
      name: name,
      genre: genre,
      mood: mood,
      bpm: bpm,
      keySignature: keySignature,
      imageUrl: imageUrl,
      productStripeId: productStripeId,
      standardProductStripePriceId: standardProductStripePriceId,
      deluxeProductStripePriceId: deluxeProductStripePriceId,
      purchased: purchased,
    };
    if (cart.get(name)) {
      toast.success("Beat is in the cart", {
        icon: <Icons.cart className="h-8 w-8 sm:h-6 sm:w-6" />,
        position: "bottom-right",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#1B7A43" },
      });
    } else {
      addToPrice(10);
      addBeatToCart(name, newBeat);
    }
  };

  return (
    <div className="container flex flex-row w-[20.6rem] sm:w-[60rem] mb-1 bg-[#8A0303] bg-opacity-20 rounded-lg shadow-lg shadow-[#660000]">
      <div className="relative w-[19%]">
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
        <div className="flex flex-row h-fit w-full">
          <div
            className={`flex text-xs sm:text-xl ${
              props.pathname === "/beats"
                ? "lg:text-2xl"
                : "lg:text-2xl xl:text-lg"
            }  font-light pl-0.5 sm:pl-1`}
          >
            <p>{props.name}</p>
          </div>

          <div className="flex flex-row justify-center items-center my-auto pl-0.5 sm:pl-2">
            <div
              className={`
            ${
              props.pathname === "/beats"
                ? "h-3 sm:h-6 md:h-7"
                : "h-3 sm:h-6 md:h-7 xl:h-5"
            }
            `}
            >
              <Icons.volume />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVolume(Number(e.target.value))
              }
              className={`${
                props.pathname === "/beats"
                  ? "w-[1rem] sm:w-[6rem] md:w-[8rem] lg:w-[10rem]"
                  : "w-[1rem] sm:w-[6rem] md:w-[8rem] xl:w-[4rem]"
              } h-0.5 appearance-none cursor-pointer z-[10] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[5px] [&::-webkit-slider-thumb]:w-[5px] sm:[&::-webkit-slider-thumb]:h-[12px] sm:[&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:bg-[#8A0303] [&::-webkit-slider-thumb]:rounded-full `}
            />
          </div>

          <div
            className={`flex flex-row space-x-0.5 items-center text-[0.42rem] sm:text-[0.7rem] ml-auto ${
              props.pathname === "/beats"
                ? "lg:text-[0.8rem]"
                : "lg:text-[0.8rem] xl:text-[0.7rem]"
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
            <Wavesurfer
              url={props.audioUrl}
              pathname={props.pathname}
              volume={volume}
            />
          </div>

          {session &&
          session?.user &&
          session?.user.role === "USER" &&
          status === "authenticated" ? (
            <div
              className={`flex justify-center items-center  ${
                props.pathname === "/beats"
                  ? "lg:pt-1"
                  : "lg:pt-1 xl:pt-0 pb-1 xl:pb-3"
              }
              ${props.purchased ? "w-[5%]" : "w-1/5"} 
              `}
            >
              <button
                className={`h-3 sm:h-6 md:h-7 p-0 sm:p-0.5 ${
                  props.pathname === "/beats"
                    ? "lg:h-9 lg:p-1"
                    : "lg:h-9 lg:p-1 xl:h-5 xl:p-0"
                }
                ${props.purchased ? "w-full" : "w-1/3"} 
                ${buttonLikeAnimate ? "animate-jump" : ""}`}
                onClick={() => {
                  setButtonLikeAnimate(!buttonLikeAnimate);
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
                onAnimationEnd={() => setButtonLikeAnimate(!buttonLikeAnimate)}
              >
                {props.pathname === "/beats" ? (
                  <Icons.heart />
                ) : (
                  <Icons.heartOff />
                )}
              </button>
              {props.purchased ? null : (
                <button
                  className={`bg-black rounded sm:rounded-md w-2/3 text-[0.3rem] sm:text-[0.6rem] sm:leading-[1rem] ${
                    props.pathname === "/beats"
                      ? "lg:text-xs"
                      : "lg:text-xs xl:text-[0.5rem]"
                  } px-[0.06rem] md:px-1 lg:px-2 py-0.5 md:py-1.5 ${
                    props.pathname === "/beats"
                      ? "lg:py-2"
                      : "lg:py-2 xl:py-0.5"
                  }
              ${buttonAddToCartAnimate ? "animate-jump" : ""}`}
                  onClick={() => {
                    setButtonAddToCartAnimate(!buttonAddToCartAnimate);
                    handleAddToCart(
                      props.licenseType,
                      props.name,
                      props.genre,
                      props.mood,
                      props.bpm,
                      props.keySignature,
                      props.imageUrl,
                      props.productStripeId,
                      props.standardProductStripePriceId,
                      props.deluxeProductStripePriceId,
                      props.purchased
                    );
                  }}
                  onAnimationEnd={() =>
                    setButtonAddToCartAnimate(!buttonAddToCartAnimate)
                  }
                >
                  Add to cart
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
