import { ChangeEventHandler } from "react";

type SelectInputProps = {
  width: string;
  widthSm: string;
  padding: string;
  paddingSm: string;
  paddingB: string;
  paddingBSm: string;
  name: string;
  selectValues: Set<string>;
  handleFunction: ChangeEventHandler<HTMLSelectElement>;
};

export default function SelectInput(props: SelectInputProps) {
  return (
    <div
      className={`relative p-${props.padding} sm:p-${props.paddingSm} pb-${props.paddingB} sm:pb-${props.paddingBSm} w-[${props.width}] sm:w-[${props.widthSm}]`}
    >
      <label
        htmlFor={props.name.toLowerCase()}
        className="block text-sm sm:text-base text-[#8A0303] dark:text-[#8A0303]"
      >
        {props.name}
      </label>
      <select
        id={props.name.toLowerCase()}
        name={props.name.toLowerCase()}
        className="block w-full py-2.5 px-2 text-xs sm:text-base rounded border border-[#8A0303] bg-black dark:bg-black dark:border-[#8A0303] dark:focus:border-red-700 focus:bg-black focus:outline-none focus:ring-0 focus:border-red-700 shadow-lg shadow-[#660000]"
        onChange={props.handleFunction}
        required
      >
        {Array.from(props.selectValues).map((value: string, i: number) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
