import { ChangeEventHandler, LegacyRef } from "react";

type InputProps = {
  width: string;
  widthSm: string;
  paddingB: string;
  paddingBSm: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  text: string;
  isDisabled?: boolean;
  handleFunction: ChangeEventHandler<HTMLInputElement>;
  reference?: LegacyRef<HTMLInputElement>;
};

export default function Input(props: InputProps) {
  return (
    <div
      className={`relative w-[${props.width}] sm:w-[${props.widthSm}] pb-${props.paddingB} sm:pb-${props.paddingBSm}`}
    >
      <input
        ref={props.reference}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        className={`block w-full ${
          props.type === "file" ? `p-0.5` : `py-3 px-2 `
        } text-base bg-transparent rounded border border-[#8A0303] bg-[#080808] dark:bg-[#080808] appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer shadow-lg shadow-[#660000]`}
        placeholder=" "
        onChange={props.handleFunction}
        disabled={props.isDisabled}
        accept={
          props.name === "mp3AudioFile"
            ? ".mp3"
            : props.name === "wavAudioFile"
            ? ".wav"
            : props.name === "image"
            ? ".png"
            : ""
        }
        required={props.name != "image" ? true : false}
      />
      <label
        htmlFor={props.name}
        className="absolute top-0 text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {props.text}
      </label>
    </div>
  );
}
