"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";

const Menus = [
  { name: "Home", href: "/" },
  { name: "Beats", href: "/dashboard/main/beats" },
  { name: "Licences", href: "#licences-section" },
  { name: "Contact", href: "#contact-section" },
  { name: <Icons.cart className="h-8 w-8 sm:h-6 sm:w-6" />, href: "x" },
  { name: "Sign in", href: "/sign-in" },
];

export default function Navigation() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-fit fixed inset-x-0 mx-auto bottom-7 bg-white rounded-full px-1.5 py-2 sm:px-3 sm:py-3 text-black">
      <ul className="flex flex-row items-center justify-center">
        {Menus.map((menu, i) => (
          <li key={i}>
            <Link
              href={menu.href}
              className="flex cursor-pointer px-1.5 sm:px-3 text-xs sm:text-base"
              onClick={() => setActive(i)}
            >
              <span
                className={`${
                  active === i
                    ? "duration-700 opacity-100 font-bold"
                    : "opacity-40"
                }`}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
