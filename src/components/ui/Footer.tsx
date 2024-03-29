"use client";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session, status } = useSession();
  return (
    <div className="mt-auto">
      <div
        className={
          "bg-black h-[2.8rem] sm:h-14 mt-auto mx-auto rounded-t-3xl border-t-2 border-[#8A0303] " +
          `${
            session && session?.user && status === "authenticated"
              ? session.user.role === "USER"
                ? "w-[18.7rem] sm:w-[27.8rem]"
                : "w-[17rem] sm:w-[25rem]"
              : "w-[18.5rem] sm:w-[27.3rem]"
          }`
        }
      ></div>

      <footer className="mt-auto bg-black">
        <div className="container mx-auto max-w-full flex justify-center items-center">
          <p>
            <small>&copy; Copyright {new Date().getFullYear()}, xGnarly</small>
          </p>
        </div>
      </footer>
    </div>
  );
}
