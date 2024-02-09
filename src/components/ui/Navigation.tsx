"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { useSession } from "next-auth/react";
import Dropup from "./DropUp";
import { useCart } from "@/app/services/hooks/useCart";

const Menus = [
  { name: "Home", href: "/#main-logo" },
  { name: "Beats", href: "/beats" },
  { name: "Licenses", href: "/#licenses-section" },
  { name: "Contact", href: "/#contact-section" },
];

export default function Navigation() {
  const { data: session, status } = useSession();
  const path = usePathname();
  const params = useParams();
  const [url, setUrl] = useState("");
  const { cart } = useCart();
  const [numberOfBeatsInCartAnimate, setNumberOfBeatsInCartAnimate] =
    useState(0);

  useEffect(() => {
    if (path === "/beats" || path === "/profile") {
      setNumberOfBeatsInCartAnimate(cart.size);
    }
    setUrl(path + window.location.hash);
  }, [path, params, cart.size]);

  return (
    <div className="w-fit fixed inset-x-0 mx-auto z-10 bottom-7 bg-white rounded-full px-1.5 py-2.5 sm:px-3 sm:py-3 text-black">
      <ul className="flex flex-row items-center justify-center">
        {Menus.map((menu, i) => (
          <li key={i}>
            <Link
              href={menu.href}
              className={
                "relative flex cursor-pointer px-1.5 sm:px-3 text-xs sm:text-base " +
                `${
                  status === "loading" &&
                  "h-6 mx-[0.03rem] rounded-md bg-gray-300 text-gray-300 animate-pulse animate-infinite animate-duration-700 pointer-events-none"
                }`
              }
              aria-disabled={status === "loading" ? true : false}
              tabIndex={status === "loading" ? -1 : undefined}
            >
              <span
                className={`${
                  menu.href === url || (url === "/" && menu.name === "Home")
                    ? "duration-700 opacity-100 font-bold"
                    : "opacity-40"
                }`}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
        {session && session?.user && status === "authenticated" ? (
          <>
            {session?.user.role === "USER" ? (
              <li>
                <Link
                  href="/cart"
                  className="relative flex cursor-pointer px-1.5 sm:px-3 "
                >
                  <span
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      "/cart" === url
                        ? "duration-700 opacity-100 font-bold"
                        : "opacity-40"
                    }`}
                  >
                    <Icons.cart />
                  </span>
                  <div
                    className={`absolute text-[0.6rem] sm:text-xs w-fit h-full top-3 right-0.5 sm:right-1 font-bold 
                  ${"/cart" === url ? "duration-700 opacity-100" : "opacity-40"}
                  ${numberOfBeatsInCartAnimate != 0 ? "animate-jump" : ""}`}
                    onAnimationEnd={() => setNumberOfBeatsInCartAnimate(0)}
                  >
                    {cart.size}
                  </div>
                </Link>
              </li>
            ) : null}
            <li>
              <Dropup url={url} />
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/auth/signin"
              className={
                "flex cursor-pointer px-1.5 sm:px-3 text-xs sm:text-base " +
                `${
                  status === "loading" &&
                  "h-6 mx-[0.03rem] rounded-md bg-gray-300 text-gray-300 animate-pulse animate-infinite animate-duration-700 pointer-events-none"
                }`
              }
            >
              <span
                className={`${
                  "/auth/signin" === url
                    ? "duration-700 opacity-100 font-bold"
                    : "opacity-40"
                }`}
              >
                Sign in
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
