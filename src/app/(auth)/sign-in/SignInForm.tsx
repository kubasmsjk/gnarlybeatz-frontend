"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import Input from "@/components/reused/Input";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";

const initialValues = {
  login: "",
  password: "",
};

const initialState = { values: initialValues };

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

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

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:8081/sendMail", {})
      .then(function (response) {
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
      })
      .catch(function (error) {
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
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div
      className="container flex flex-col max-w-full items-center justify-center"
      id="contact-section"
    >
      <form
        onSubmit={signIn}
        method="post"
        className="flex flex-col justify-center items-center"
      >
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="text"
          id="login"
          name="login"
          value={values.login}
          text="Login"
          handleFunction={handleChange}
        />
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
        <p className="w-[15rem] sm:w-[20rem] text-right text-xs sm:text-sm">
          <Link href={"/reset-password"} className="hover:text-[#8A0303]">
            Forgot password?
          </Link>
        </p>
        <div className="flex items-center justify-center p-3">
          {loading ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={!values.login || !values.password}
            >
              Sign in
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
