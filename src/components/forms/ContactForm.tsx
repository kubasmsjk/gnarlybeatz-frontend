"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icons } from "../ui/Icons";
import SelectInput from "../reused/SelectInput";
import { useMutation } from "@tanstack/react-query";

const initialValues = {
  email: "",
  subject: "Exclusive buy offer",
  message: "",
};

const selectValues = [
  "Exclusive buy offer",
  "Technical issues",
  "Transaction issues",
  "Other",
];

const initialState = { values: initialValues };

export default function ContactForm() {
  const [state, setState] = useState(initialState);

  const { values } = state;

  const handleChange = ({ target }: any) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const mutation = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: async () => {
      await axios.post("http://localhost:8081/sendMail", {
        sender: values.email,
        msgBody: values.message,
        subject: values.subject,
      });
      setState(initialState);
      toast.success("Email sent", {
        icon: <Icons.mailSucess className="h-8 w-8 sm:h-6 sm:w-6" />,
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#1B7A43" },
      });
    },
  });

  if (mutation.isError) {
    toast.error("Unable to send email (Server error)", {
      icon: <Icons.mailWarning className="h-8 w-8 sm:h-6 sm:w-6" />,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      style: { backgroundColor: "#8A0303" },
    });
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="container max-w-full" id="contact-section">
      <h1 className="flex justify-center py-4 sm:py-9 text-red-700 text-2xl sm:text-4xl">
        Contact me
      </h1>
      <form
        onSubmit={sendEmail}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <div className="relative pb-6 w-[20rem] sm:w-[27rem]">
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            required
            className="block w-full py-2.5 px-2 text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your email
          </label>
        </div>
        <SelectInput
          width="20rem"
          widthSm="27rem"
          padding=""
          paddingB="8"
          name="Subject"
          selectValues={selectValues}
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
            className="block w-full resize-none py-2.5 px-2 h-[9rem] text-base bg-transparent rounded border border-[#8A0303] appearance-none dark:text-white dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
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
