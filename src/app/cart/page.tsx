"use client";

import { useSession } from "next-auth/react";
import { useCart } from "../services/hooks/useCart";
import { useStripe } from "../services/hooks/useStripe";
import BeatToBuy from "./BeatToBuy";

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
};

export default function Cart() {
  const {
    price,
    cart,
    removeBeatFromCart,
    addToPrice,
    removePrice,
    updateLicenseTypeOfBeatToCart,
  } = useCart();
  const { buy } = useStripe();
  const { data: session } = useSession();

  function extractProperties(
    map: Map<string, Beat>,
    id: string
  ): {
    productStripeId: string;
    standardProductStripePriceId: string;
    deluxeProductStripePriceId: string;
    licenseType: string;
    userId: string;
  }[] {
    return Array.from(map.values()).map((beat) => ({
      productStripeId: beat.productStripeId,
      standardProductStripePriceId: beat.standardProductStripePriceId,
      deluxeProductStripePriceId: beat.deluxeProductStripePriceId,
      licenseType: beat.licenseType,
      userId: id,
    }));
  }

  return (
    <>
      {session && session.user ? (
        <div className="container max-w-full">
          <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
            Cart
          </h1>
          <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start ">
            {cart.size != 0 ? (
              <>
                <div className="flex flex-col justify-center w-3/4 xl:w-[40rem] mx-3 mb-3 animate-fade-up animate-delay-500">
                  {Array.from(cart.entries()).map(([key, beat]) => (
                    <BeatToBuy
                      key={key}
                      licenseType={beat.licenseType}
                      name={beat.name}
                      genre={beat.genre}
                      mood={beat.mood}
                      bpm={beat.bpm}
                      keySignature={beat.keySignature}
                      imageUrl={beat.imageUrl}
                      removeBeatFromCart={removeBeatFromCart}
                      addToPrice={addToPrice}
                      removePrice={removePrice}
                      updateLicenseTypeOfBeatToCart={
                        updateLicenseTypeOfBeatToCart
                      }
                      productStripeId={beat.productStripeId}
                      standardProductStripePriceId={
                        beat.standardProductStripePriceId
                      }
                      deluxeProductStripePriceId={
                        beat.deluxeProductStripePriceId
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center items-center mx-3 mb-5 p-2 lg:p-5 xl:h-[17.7rem] w-1/3 xl:w-[25rem] bg-[#8A0303] bg-opacity-30 rounded-lg shadow-lg shadow-[#660000] animate-fade-up animate-delay-500">
                  <div className="h-1/5 pb-2 md:text-xl lg:text-2xl xl:text-3xl">
                    Total:
                  </div>
                  <div className="h-1/4 pb-2 xl:pb-0 md:text-lg lg:text-xl xl:text-2xl">
                    ${price}
                  </div>
                  <button
                    className="bg-black rounded-lg p-1 lg:p-2 xl:p-3 text-xs sm:text-sm md:text-base"
                    onClick={() => {
                      buy.mutate(extractProperties(cart, session.user.id));
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center w-full text-xl">
                Your cart is empty
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
