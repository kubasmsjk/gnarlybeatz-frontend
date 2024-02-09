"use client";

import { useSession } from "next-auth/react";
import { usePurchasedBeats } from "../services/hooks/usePurchasedBeats";
import { Icons } from "@/components/ui/Icons";

export default function PurchasedBeats() {
  const { data: session, status } = useSession();
  const { purchasedBeats, isLoading, isError } = usePurchasedBeats(
    session?.user.id,
    status
  );
  return (
    <div className="container max-w-full flex flex-col justify-center items-center">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Purchased Beats
      </h1>
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

      {purchasedBeats?.length != 0 ? (
        <>
          <div className="text-base md:text-xl p-3">Click to download:</div>

          {purchasedBeats?.map((element, index) => {
            return (
              <div
                className="flex flex-row justify-center w-[15rem] md:w-[20rem] p-2 mb-4 bg-[#8A0303] bg-opacity-20 rounded-lg shadow-lg shadow-[#660000]"
                key={index}
              >
                <div className="h-[15px] sm:h-[18px] md:h-[20px]">
                  <Icons.fileAudio />
                </div>
                <a
                  className="text-xs sm:text-sm md:text-base"
                  href={element.file}
                  download={element.name}
                >
                  {element.name} || {element.audioType}
                </a>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-base md:text-xl p-3">No purchased beats.</div>
      )}
    </div>
  );
}
