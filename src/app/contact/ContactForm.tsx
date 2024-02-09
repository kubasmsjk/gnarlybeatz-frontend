"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Icons } from "../../components/ui/Icons";
import { useContactEmailSender } from "../services/hooks/useContactEmailSender";
import { emailUtils } from "../utils/emailUtils";
import selectValues from "./contactSelectValues";
import SelectInput from "../../components/reused/SelectInput";
import Input from "@/components/reused/Input";

const initialFormValues = {
  sender: "",
  subject: "Exclusive buy offer",
  msgBody: "",
};

const initialFormState = { values: initialFormValues };

export default function ContactForm() {
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const { sendEmail, emailFormErrors, addEmailFormErrorValue } =
    useContactEmailSender();
  const { emailFormSchema } = emailUtils();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  if (session?.user.role === "USER") {
    formValues.values.sender = session.user.email;
  }
  // const checkIsUser = () => {
  //   if (session?.user.role === "USER") {
  //     formValues.values.sender = session.user.email;
  //   }
  // };
  // checkIsUser();

  const handleChange = ({ target }: any) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateForm();

    if (result.success) {
      sendEmail.mutate({
        sender: values.sender,
        subject: values.subject,
        msgBody: values.msgBody,
      });
      setFormValues({ values: initialFormValues });
      // checkIsUser();
    }

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        addEmailFormErrorValue(issue.path[0].toString(), issue.message);
      });
    }
  };

  const validateForm = () => {
    clearFormErrorsValues();
    return emailFormSchema.safeParse({
      sender: values.sender,
      subject: values.subject,
      msgBody: values.msgBody,
    });
  };

  const clearFormErrorsValues = () => {
    queryClient.resetQueries({ queryKey: ["emailFormErrors"], exact: true });
  };

  return (
    <div className="container max-w-full" id="contact-section">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Contact me
      </h1>
      <form
        onSubmit={send}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <Input
          width="20rem"
          widthSm="27rem"
          paddingB={emailFormErrors.get("sender") != "" ? "4" : "7"}
          paddingBSm={emailFormErrors.get("sender") != "" ? "4" : "8"}
          type="email"
          id="sender"
          name="sender"
          value={values.sender}
          text="Your email"
          isDisabled={
            sendEmail.isPending ||
            session?.user.role === "USER" ||
            session?.user.role === "ADMIN"
          }
          handleFunction={handleChange}
        />
        {emailFormErrors.get("sender") != "" ? (
          <span className="flex w-[20rem] sm:w-[27rem] pb-6 text-xs sm:text-sm text-red-600">
            {emailFormErrors.get("sender")}
          </span>
        ) : null}
        <SelectInput
          width="20rem"
          widthSm="27rem"
          padding="0"
          paddingSm="0"
          paddingB={emailFormErrors.get("sender") != "" ? "7" : "7"}
          paddingBSm={emailFormErrors.get("sender") != "" ? "8" : "8"}
          name="Subject"
          selectValues={selectValues}
          defaultValue={values.subject}
          isDisabled={sendEmail.isPending || session?.user.role === "ADMIN"}
          handleFunction={handleChange}
        />
        {emailFormErrors.get("subject") != "" ? (
          <span className="flex w-[20rem] sm:w-[27rem] pb-6 text-xs sm:text-sm text-red-600">
            {emailFormErrors.get("subject")}
          </span>
        ) : null}
        <div className="relative z-0 w-[20rem] sm:w-[27rem]">
          <textarea
            id="msgBody"
            name="msgBody"
            value={values.msgBody}
            required
            minLength={30}
            maxLength={300}
            className="block w-full resize-none py-2.5 px-2 h-[9rem] text-base bg-transparent rounded border border-[#8A0303] appearance-none dark:text-white dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer shadow-lg shadow-[#660000]"
            placeholder=" "
            disabled={sendEmail.isPending || session?.user.role === "ADMIN"}
            onChange={handleChange}
          />
          <label
            htmlFor="msgBody"
            className="absolute top-0 text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </div>
        {emailFormErrors.get("msgBody") != "" ? (
          <span className="flex w-[20rem] sm:w-[27rem] pt-4 text-xs sm:text-sm text-red-600">
            {emailFormErrors.get("msgBody")}
          </span>
        ) : null}
        <div className="flex items-center justify-center p-5">
          {sendEmail.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={
                !values.sender ||
                !values.subject ||
                !values.msgBody ||
                session?.user.role === "ADMIN"
              }
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
