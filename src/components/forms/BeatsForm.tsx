"use client";

import { useQueryClient } from "@tanstack/react-query";
import SelectInput from "../reused/SelectInput";
import { Icons } from "../ui/Icons";
import { useBeatsFormFilter } from "@/services/useBeatsFormFilter";

export default function BeatsForm() {
  const {
    selectBpmValues,
    selectKeyValues,
    selectMoodsValues,
    selectGenresValues,
    addFilterValue,
  } = useBeatsFormFilter();
  const queryClient = useQueryClient();

  const handleChange = ({ target }: any) => {
    if(target.name ==="search"){
      setTimeout(() => {
        addFilterValue(target.name, target.value);
      }, 3000)
    }else{
      addFilterValue(target.name, target.value);
    }
    queryClient.removeQueries({ queryKey: ["audioData"] });
  };

  return (
    <div
      className="container max-w-full flex flex-col justify-center items-center pb-4 sm:pb-8"
      id="contact-section"
    >
      <div className="container flex flex-col sm:flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center ">
          <SelectInput
            width="3rem"
            widthSm="5rem"
            padding="0.5"
            paddingSm="1"
            paddingB="0"
            paddingBSm="0"
            name="Bpm"
            selectValues={selectBpmValues}
            handleFunction={handleChange}
          />
          <SelectInput
            width="3rem"
            widthSm="5rem"
            padding="0.5"
            paddingSm="1"
            paddingB="0"
            paddingBSm="0"
            name="Key"
            selectValues={selectKeyValues}
            handleFunction={handleChange}
          />
          <SelectInput
            width="4rem"
            widthSm="6rem"
            padding="0.5"
            paddingSm="1"
            paddingB="0"
            paddingBSm="0"
            name="Mood"
            selectValues={selectMoodsValues}
            handleFunction={handleChange}
          />
          <SelectInput
            width="5rem"
            widthSm="7rem"
            padding="0.5"
            paddingSm="1"
            paddingB="0"
            paddingBSm="0"
            name="Genre"
            selectValues={selectGenresValues}
            handleFunction={handleChange}
          />
        </div>
        <div className="flex flex-col relative p-0 sm:p-1 w-[20.6rem] sm:w-[35rem]">
          <label
            htmlFor="default-search"
            className="block text-sm sm:text-base text-transparent"
          >
            Search
          </label>
          <div className="flex relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icons.search />
            </div>
            <input
              type="search"
              name="search"
              id="search-bar"
              className="block w-full pl-10 py-[0.550rem] text-sm sm:text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer shadow-lg shadow-[#660000]"
              placeholder="Search..."
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
