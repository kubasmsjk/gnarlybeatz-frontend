"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { signOut } from "next-auth/react";
import Link from "next/link";

type DropUpProps = {
  url: string;
};

export default function DropUp(props: DropUpProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex cursor-pointer px-1.5 sm:px-3 text-xs sm:text-base">
      <button
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <span
          className={`${
            "/profile" === props.url
              ? "duration-700 opacity-100 font-bold"
              : "opacity-40"
          }`}
        >
          <Icons.profile />
        </span>
      </button>

      {openMenu && (
        <div className="w-fit h-fit absolute bottom-[2.6rem] sm:bottom-[3.2rem] -right-1 flex flex-col rounded-md bg-white text-xs sm:text-base font-light animate-flip-up animate-once animate-delay-75">
          <Link
            href="/profile"
            className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1 rounded-t-md border-b border-[#8a030350]"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            profile
          </Link>
          <Link
            href="/likes"
            className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            likes
          </Link>
          <Link
            href="/"
            className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1 rounded-b-md border-t border-[#8a030350]"
            onClick={() => {
              signOut();
              setOpenMenu(!openMenu);
            }}
          >
            sign out
          </Link>
        </div>
      )}
    </div>
  );
}
