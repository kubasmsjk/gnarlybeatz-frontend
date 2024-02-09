"use client";

import { Icons } from "@/components/ui/Icons";
import UserEditForm from "./UserEditForm";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import UploadOrUpdateBeatForm from "../admin/UploadOrUpdateBeatForm";
import ArchiveBeatForm from "../admin/ArchiveBeatForm";

type AccountProps = {
  username?: string;
  email?: string;
  role?: string;
};

export default function Account(props: AccountProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showUploadOrUpdateBeatForm, setShowUploadOrUpdateBeatForm] =
    useState(false);
  const [showArchiveBeatForm, setShowArchiveBeatForm] = useState(false);
  const queryClient = useQueryClient();

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
        {props.role === "ADMIN" ? (
          <>
            <button
              className={
                "text-red-700 hover:text-white text-xs sm:text-sm md:text-base " +
                `${showUploadOrUpdateBeatForm && "pb-8"}`
              }
              onClick={() => {
                queryClient.resetQueries({
                  queryKey: ["formErrors"],
                  exact: true,
                });
                setShowUploadOrUpdateBeatForm(!showUploadOrUpdateBeatForm);
              }}
            >
              Upload or Update beat
            </button>
            {showUploadOrUpdateBeatForm ? <UploadOrUpdateBeatForm /> : null}

            <button
              className={
                "text-red-700 hover:text-white text-xs sm:text-sm md:text-base " +
                `${showArchiveBeatForm && "pb-8"}`
              }
              onClick={() => {
                queryClient.resetQueries({
                  queryKey: ["formErrors"],
                  exact: true,
                });
                setShowArchiveBeatForm(!showArchiveBeatForm);
              }}
            >
              Archive beat
            </button>
            {showArchiveBeatForm ? <ArchiveBeatForm /> : null}
          </>
        ) : null}

        <button
          className={
            "text-red-700 hover:text-white text-xs sm:text-sm md:text-base " +
            `${showEditForm && "pb-8"}`
          }
          onClick={() => {
            queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
            setShowEditForm(!showEditForm);
          }}
        >
          Edit account
        </button>
        {showEditForm ? <UserEditForm currentEmail={props.email} /> : null}
      </div>
    </div>
  );
}
