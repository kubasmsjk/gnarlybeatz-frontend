"use client";

import { Icons } from "@/components/ui/Icons";
import UserEditForm from "./UserEditForm";
import { useState } from "react";

type AccountProps = {
  username?: string;
  email?: string;
};

export default function Account(props: AccountProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-0 sm:pt-1 md:pt-3.5 lg:pt-4">
      <div className="flex flex-row items-center justify-start w-[95%] bg-[#8A0303] bg-opacity-20 border-[0.5px] border-[#660000] shadow-lg shadow-[#660000] px-1 py-0.5 md:p-2 mb-1 sm:mb-2 rounded-md">
        <span className="h-[28px] sm:h-[36px] md:h-[44px]">
          <Icons.headphones />
        </span>
        <div className="flex flex-col p-2">
          <div className="text-xs md:text-base font-semibold">
            {props.username}
          </div>
          <div className="text-xs md:text-base font-light">{props.email}</div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-[95%] p-2">
        <button
          className={
            "text-red-700 hover:text-white text-xs sm:text-sm md:text-base " +
            `${showEditForm && "pb-6"}`
          }
          onClick={() => {
            setShowEditForm(!showEditForm);
          }}
        >
          Edit account
        </button>
        {showEditForm ? <UserEditForm /> : null}

        <button className="text-red-700 hover:text-white text-xs sm:text-sm md:text-base">
          Delete account
        </button>
      </div>
    </div>
  );
}
