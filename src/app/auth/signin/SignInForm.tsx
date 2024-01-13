"use client";

import { useState } from "react";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";
import { Icons } from "@/components/ui/Icons";
import Input from "@/components/reused/Input";
import Link from "next/link";
import { authenticationUtils } from "@/app/utils/authenticationUtils";

const initialFormValues = {
  email: "",
  password: "",
};

const initialFormState = { values: initialFormValues };

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const { singInMutation, formErrors, addFormErrorValue } =
    useAuthenticationForm();
  const { singInFormSchema } = authenticationUtils();

  const handleChange = ({ target }: any) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateForm();

    if (result.success) {
      login();
    }

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        addFormErrorValue(issue.path[0].toString(), issue.message);
      });
    }
  };

  const validateForm = () => {
    clearFormErrorsValues();
    return singInFormSchema.safeParse({
      email: values.email,
      password: values.password,
    });
  };

  const login = () => {
    singInMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const clearFormErrorsValues = () => {
    formErrors.clear();
  };

  return (
    <div
      className="container flex flex-col max-w-full items-center justify-center"
      id="contact-section"
    >
      {formErrors.get("account") != "" ? (
        <span className="flex justify-center w-[15rem] sm:w-[20rem] pb-6 text-xs sm:text-sm text-red-600">
          {formErrors.get("account")}
        </span>
      ) : null}
      <form
        onSubmit={signIn}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={formErrors.get("email") != "" ? "3" : "7"}
          paddingBSm={formErrors.get("email") != "" ? "3" : "8"}
          type="email"
          id="email"
          name="email"
          value={values.email}
          text="Email"
          handleFunction={handleChange}
        />
        {formErrors.get("email") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-6 text-xs text-red-600">
            {formErrors.get("email")}
          </span>
        ) : null}
        <div className="relative flex flex-row">
          <Input
            width="15rem"
            widthSm="20rem"
            paddingB="3"
            paddingBSm="3"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={values.password}
            text="Password"
            handleFunction={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex py-3 px-2 cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <Icons.closeEye /> : <Icons.eye />}
          </button>
        </div>
        {formErrors.get("password") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-0.5 text-xs text-red-600">
            {formErrors.get("password")}
          </span>
        ) : null}
        <p className="w-[15rem] sm:w-[20rem] text-right text-xs sm:text-sm">
          <Link href={"/reset-password"} className="hover:text-[#8A0303]">
            Forgot password?
          </Link>
        </p>
        <div className="flex items-center justify-center p-3">
          {singInMutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={!values.email || !values.password}
            >
              Sign in
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
