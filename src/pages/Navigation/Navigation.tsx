"use client";

import React, { useState } from "react";
import { CartIcon } from "../../../public/assets/svgs/CartIcon";

const Menus = [
  { name: "Home" },
  { name: "Beats" },
  { name: "Licences" },
  { name: "Contact" },
  { name: <CartIcon className="text-2xl" /> },
  { name: "Log in" },
];

export default function Navigation() {
  const [activ, setActive] = useState(0);

  return (
      <div className="bg-white h-18 rounded-full px-5 py-2">
        <ul className="flex">
          {Menus.map((menu, i) => (
            <li key={i}>
              <a
                className="flex flex-col text-center cursor-pointer px-4"
                onClick={() => setActive(i)}
              >
                <span
                  className={`${
                    activ === i
                      ? "duration-700 opacity-100 font-bold"
                      : "opacity-40"
                  }`}
                >
                  {menu.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
  );
}
