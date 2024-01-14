"use client";

import { useEffect, useState } from "react";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";
import { Icons } from "@/components/ui/Icons";
import Input from "@/components/reused/Input";
import { authenticationUtils } from "@/app/utils/authenticationUtils";
import PasswordStrength from "../auth/signup/PasswordStrength";
import { passwordStrength } from "check-password-strength";

type UserEditFormProps = {
  username?: string;
  email?: string;
};

const initialFormValues = {
  username: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};

const initialFormState = { values: initialFormValues };

export default function UserEditForm(props: UserEditFormProps) {
  const [passStrength, setPassStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const { editUserMutation, formErrors, addFormErrorValue } =
    useAuthenticationForm();
  const { editUserFormSchema } = authenticationUtils();

  useEffect(() => {
    setPassStrength(passwordStrength(values.newPassword).id);
  }, [values.newPassword]);

  const handleChange = ({ target }: any) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const submitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateForm();

    if (result.success) {
      editUser();
    }

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        addFormErrorValue(issue.path[0].toString(), issue.message);
      });
    }
  };

  const validateForm = () => {
    clearFormErrorsValues();
    return editUserFormSchema.safeParse({
      username: values.username,
      email: values.email,
      password: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  const editUser = () => {
    editUserMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  const clearFormErrorsValues = () => {
    formErrors.clear();
  };

  return (
    <>
      {formErrors.get("account") != "" ? (
        <span className="flex justify-center w-[15rem] sm:w-[20rem] pb-6 text-xs sm:text-sm text-red-600">
          {formErrors.get("account")}
        </span>
      ) : null}
      <form
        onSubmit={submitEdit}
        method="post"
        className="flex flex-col w-[95%] justify-center items-center"
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
          text="Email"
          handleFunction={handleChange}
        />
        {formErrors.get("email") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-6 text-xs text-red-600">
            {formErrors.get("email")}
          </span>
        ) : null}
        <div className="relative flex flex-row">
          <div className="relative flex flex-col">
            <Input
              width="15rem"
              widthSm="20rem"
              paddingB={formErrors.get("password") != "" ? "3" : "7"}
              paddingBSm={formErrors.get("password") != "" ? "3" : "8"}
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={values.currentPassword}
              text="Current password"
              handleFunction={handleChange}
            />
            {formErrors.get("password") != "" ? (
              <span className="w-[15rem] sm:w-[20rem] pb-6 text-xs text-red-600">
                {formErrors.get("password")}
              </span>
            ) : null}
            <Input
              width="15rem"
              widthSm="20rem"
              paddingB="3"
              paddingBSm="3"
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={values.newPassword}
              text="New password"
              handleFunction={handleChange}
            />
          </div>
          <button
            type="button"
            className="absolute inset-y-[5.2rem] right-0 flex py-3 px-2 cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <Icons.closeEye /> : <Icons.eye />}
          </button>
        </div>
        <PasswordStrength passStrength={passStrength} />
        {formErrors.get("newPassword") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-0.5 text-xs text-red-600">
            {formErrors.get("newPassword")}
          </span>
        ) : null}
        <div className="flex items-center justify-center p-3">
          {editUserMutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={
                !values.username ||
                !values.email ||
                !values.currentPassword ||
                !values.newPassword
              }
            >
              Save
            </button>
          )}
        </div>
      </form>
    </>
  );
}
