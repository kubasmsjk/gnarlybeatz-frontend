"use client";

import Image from "next/image";
import Link from "next/link";
import LicensesInfoModal from "../licenses/LicensesInfoModal";
import { Icons } from "@/components/ui/Icons";
import { useState } from "react";

type BeatToBuyProps = {
  licenseType: string;
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  imageUrl: string;
  removeBeatFromCart: (beatName: string) => void;
  addToPrice: (value: number) => void;
  removePrice: (value: number) => void;
  updateLicenseTypeOfBeatToCart: (key: string, value: string) => void;
  productStripeId: string;
  standardProductStripePriceId: string;
  deluxeProductStripePriceId: string;
};

export default function BeatToBuy(props: BeatToBuyProps) {
  const [licenseType, setLicenseType] = useState(props.licenseType);

  return (
    <>
      <LicensesInfoModal />
      <div className="flex flex-row w-full mb-5 bg-[#8A0303] bg-opacity-20 rounded-lg shadow-lg shadow-[#660000]">
        <div className="relative w-[27%] sm:w-[25%] md:w-[22%] xl:w-[28%]">
          <Image
            src={props.imageUrl}
            alt={props.name + " image"}
            fill
            priority
            className="object-contain object-left rounded-l-lg"
            decoding="async"
          />
        </div>
        <div className="flex flex-col w-full pl-2">
          <div className="md:text-base lg:text-xl xl:text-2xl font-light md:pl-0.5 md:pt-0.5 lg:pl-1 lg:pt-1">
            <p>{props.name}</p>
          </div>
          <div className="flex flex-row space-x-0.5 mb:mt-0.5 lg:mt-1 md:mb-1 lg:mb-2 items-center text-[0.42rem] sm:text-[0.7rem] font-light">
            <p className="bg-black rounded-md sm:p-1 xl:p-2">#{props.genre}</p>
            <p className="bg-black rounded-md sm:p-1 xl:p-2">#{props.mood}</p>
            <p className="bg-black rounded-md sm:p-1 xl:p-2">
              bpm: {props.bpm}
            </p>
            <p className="bg-black rounded-md sm:p-1 xl:p-2">
              key: {props.keySignature}
            </p>
          </div>
          <div className="flex flex-row space-x-2 items-center text-[0.42rem] sm:text-[0.7rem] font-light">
            <div className="flex flex-col justify-center items-center">
              <button
                className={`${
                  licenseType === "Standard Lease"
                    ? `bg-[#8A0303] text-white`
                    : `text-red-900`
                }  font-bold md:p-0.5 lg:p-1 rounded-2xl border border-[#8A0303]`}
                onClick={() => {
                  props.updateLicenseTypeOfBeatToCart(
                    props.name,
                    "Standard Lease"
                  );
                  setLicenseType("Standard Lease");
                  props.removePrice(10);
                }}
                disabled={licenseType === "Standard Lease"}
              >
                Standard Lease
              </button>
              <Link
                href="/cart/?showLicenseInfoModal=y&leaseType=Standard Lease"
                className="bg-transparent text-red-700 md:py-0.5 lg:py-1 hover:text-white"
              >
                review
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button
                className={`${
                  licenseType === "Deluxe Lease"
                    ? `bg-[#8A0303] text-white`
                    : `text-red-900`
                }  font-bold md:p-0.5 lg:p-1 rounded-2xl border border-[#8A0303]`}
                onClick={() => {
                  props.updateLicenseTypeOfBeatToCart(
                    props.name,
                    "Deluxe Lease"
                  );
                  setLicenseType("Deluxe Lease");
                  props.addToPrice(10);
                }}
                disabled={licenseType === "Deluxe Lease"}
              >
                Deluxe Lease
              </button>
              <Link
                href="/cart/?showLicenseInfoModal=y&leaseType=Deluxe Lease"
                className="bg-transparent text-red-700 md:py-0.5 lg:py-1 hover:text-white"
              >
                review
              </Link>
            </div>
          </div>
        </div>
        <div className="w-4 h-4 sm:w-8 sm:h-8 ">
          <button
            onClick={() => {
              {
                if (licenseType === "Standard Lease") {
                  props.removePrice(10);
                }

                if (licenseType === "Deluxe Lease") {
                  props.removePrice(20);
                }

                props.removeBeatFromCart(props.name);
              }
            }}
          >
            <Icons.close />
          </button>
        </div>
      </div>
    </>
  );
}
