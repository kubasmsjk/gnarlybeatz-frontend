"use client";

import { useState } from "react";
import { Icons } from "../../components/ui/Icons";
import { useContactEmailSender } from "../services/hooks/useContactEmailSender";
import SelectInput from "../../components/reused/SelectInput";
import Input from "@/components/reused/Input";

const initialFormValues = {
  email: "",
  subject: "Exclusive buy offer",
  message: "",
};

const selectValues = new Set([
  "Exclusive buy offer",
  "Technical issues",
  "Transaction issues",
  "Other",
]);

const initialFormState = { values: initialFormValues };

export default function ContactForm() {
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const { mutation } = useContactEmailSender();

  const handleChange = ({ target }: any) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    setFormValues({ values: initialFormValues });
  };

  return (
    <div className="container max-w-full" id="contact-section">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Contact me
      </h1>
      <form
        onSubmit={sendEmail}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <Input
          width="20rem"
          widthSm="27rem"
          paddingB="4"
          paddingBSm="4"
          type="email"
          id="email"
          name="email"
          value={values.email}
          text="Your email"
          isDisabled={mutation.isPending}
          handleFunction={handleChange}
        />
        <SelectInput
          width="20rem"
          widthSm="27rem"
          padding="0"
          paddingSm="0"
          paddingB="7"
          paddingBSm="8"
          name="Subject"
          selectValues={selectValues}
          defaultValue={values.subject}
          isDisabled={mutation.isPending}
          handleFunction={handleChange}
        />
        <div className="relative z-0 w-[20rem] sm:w-[27rem]">
          <textarea
            id="message"
            name="message"
            value={values.message}
            required
            minLength={30}
            maxLength={300}
            className="block w-full resize-none py-2.5 px-2 h-[9rem] text-base bg-transparent rounded border border-[#8A0303] appearance-none dark:text-white dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer shadow-lg shadow-[#660000]"
            placeholder=" "
            disabled={mutation.isPending}
            onChange={handleChange}
          />
          <label
            htmlFor="message"
            className="absolute top-0 text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </div>

        <div className="flex items-center justify-center p-5">
          {mutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={!values.email || !values.subject || !values.message}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
