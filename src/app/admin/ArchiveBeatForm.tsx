"use client";

import { Icons } from "@/components/ui/Icons";
import SelectInput from "@/components/reused/SelectInput";
import { useState } from "react";
import { useArchiveBeat } from "../services/hooks/useArchiveBeat";

export default function ArchiveBeatForm() {
  const { archiveBeatMutation, selectArchiveBeatValues } = useArchiveBeat();
  const [beat, setBeat] = useState("-");

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setBeat(value);
  };

  const submitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    await archiveFile();
  };

  const archiveFile = async () => {
    archiveBeatMutation.mutate({
      archiveBeat: beat,
    });
  };

  return (
    <>
      <form
        onSubmit={submitUpload}
        method="post"
        className="flex flex-col w-[95%] justify-center items-center"
      >
        <SelectInput
          width="15rem"
          widthSm="20rem"
          padding="0.5"
          paddingSm="1"
          paddingB="3"
          paddingBSm="4"
          name="Beats"
          selectValues={selectArchiveBeatValues}
          handleFunction={handleChange}
        />

        <div className="flex items-center justify-center p-3">
          {archiveBeatMutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={beat === "-"}
            >
              Archive
            </button>
          )}
        </div>
      </form>
    </>
  );
}
