"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSignOut } from "@/app/services/hooks/useSignOut";

type DropUpProps = {
  url: string;
};

export default function DropUp(props: DropUpProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const { signOutFromBackend } = useSignOut();
  const { data: session } = useSession();

  return (
    <div>
      <button
        className="relative flex cursor-pointer px-1.5 sm:px-3"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <span
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
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
            href={session?.user.role === "USER" ? "/profile" : "/admin"}
            className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1 rounded-t-md border-b border-[#8a030350]"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            profile
          </Link>
          {session?.user.role === "USER" ? (
            <Link
              href="/purchasedBeats"
              className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1 border-b border-[#8a030350]"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              your beats
            </Link>
          ) : null}
          <Link
            href="/"
            className="hover:bg-[#8A0303] hover:text-white text-center opacity-80 px-2 py-1 rounded-b-md"
            onClick={async () => {
              await signOutFromBackend();
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
