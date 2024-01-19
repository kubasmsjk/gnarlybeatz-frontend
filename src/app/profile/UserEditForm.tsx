"use client";

import { useEffect, useState } from "react";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";
import { Icons } from "@/components/ui/Icons";
import Input from "@/components/reused/Input";
import { authenticationUtils } from "@/app/utils/authenticationUtils";
import PasswordStrength from "../auth/signup/PasswordStrength";
import { passwordStrength } from "check-password-strength";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type UserEditFormProps = {
  currentEmail?: string;
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
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

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

    if (values.currentPassword === values.newPassword) {
      addFormErrorValue(
        "newPassword",
        "The new password cannot be same as current password."
      );
    }

    if (values.email === props.currentEmail) {
      addFormErrorValue(
        "email",
        "The new email cannot be the same as current email."
      );
    }

    if (
      result.success &&
      values.currentPassword != values.newPassword &&
      values.email != props.currentEmail
    ) {
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
    editUserMutation.mutate(
      {
        username: values.username,
        currentEmail: props.currentEmail!,
        newEmail: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: async (data) => {
          if (data != undefined) {
            await update({
              ...session,
              user: {
                ...session?.user,
                name: data?.username,
                email: data?.email,
              },
            }).then((result) => {
              setFormValues(initialFormState);
              router.refresh();
            });
          }
        },
      }
    );
  };

  const clearFormErrorsValues = () => {
    queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
  };

  return (
    <>
      {formErrors.get("account") != "" ? (
        <span className="flex justify-center w-[95%] pb-8 text-xs sm:text-sm text-red-600">
          {formErrors.get("account")}
        </span>
      ) : null}
      {formErrors.get("currentEmail") != "" ? (
        <span className="flex justify-center w-[95%] pb-8 text-xs sm:text-sm text-red-600">
          {formErrors.get("currentEmail")}
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
            className={
              "absolute right-0 flex py-3 px-2 cursor-pointer " +
              `${
                formErrors.get("password") === "Incorrect password."
                  ? "inset-y-[6.4rem]"
                  : formErrors.get("password") != ""
                  ? "inset-y-[9.4rem] sm:inset-y-[8.4rem]"
                  : "inset-y-[4.9rem] sm:inset-y-[5.1rem]"
              }`
            }
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
