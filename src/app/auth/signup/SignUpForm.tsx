"use client";

import { useEffect, useState } from "react";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";
import { Icons } from "../../../components/ui/Icons";
import Input from "../../../components/reused/Input";
import { authenticationUtils } from "@/app/utils/authenticationUtils";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { useQueryClient } from "@tanstack/react-query";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};

const initialFormState = { values: initialFormValues };

export default function SingUpForm() {
  const [passStrength, setPassStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const { singUpMutation, formErrors, addFormErrorValue } =
    useAuthenticationForm();
  const { singUpFormSchema } = authenticationUtils();
  const queryClient = useQueryClient();

  useEffect(() => {
    setPassStrength(passwordStrength(values.password).id);
  }, [values.password]);

  const handleChange = ({ target }: any) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateForm();

    if (result.success) {
      register();
    }

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        addFormErrorValue(issue.path[0].toString(), issue.message);
      });
    }
  };

  const validateForm = () => {
    clearFormErrorsValues();
    return singUpFormSchema.safeParse({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  const register = () => {
    singUpMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  const clearFormErrorsValues = () => {
    queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
  };

  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <form
        onSubmit={signUp}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={formErrors.get("username") != "" ? "3" : "7"}
          paddingBSm={formErrors.get("username") != "" ? "3" : "8"}
          type="text"
          id="username"
          name="username"
          value={values.username}
          text="Username"
          handleFunction={handleChange}
        />
        {formErrors.get("username") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-6 text-xs text-red-600">
            {formErrors.get("username")}
          </span>
        ) : null}

        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={formErrors.get("email") != "" ? "3" : "7"}
          paddingBSm={formErrors.get("email") != "" ? "3" : "8"}
          type="email"
          id="email"
          name="email"
          value={values.email}
          text="E-mail"
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
        <PasswordStrength passStrength={passStrength} />
        {formErrors.get("password") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] text-xs text-red-600">
            {formErrors.get("password")}
          </span>
        ) : null}

        <div className="flex items-center justify-center p-3">
          {singUpMutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={!values.username || !values.email || !values.password}
            >
              Sign up
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
