"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icons } from "../ui/Icons";

const initialValues = {
  login: "",
  password: "",
};

const initialState = { values: initialValues };

export default function SingInForm() {
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

        <div className="relative pb-6 w-[15rem] sm:w-[20rem]">
          <input
            type="text"
            id="login"
            name="login"
            value={values.login}
            required
            className="block w-full py-2.5 px-2 text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer shadow-lg shadow-[#660000]"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="login"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Login
          </label>
        </div>

        <div className="relative w-[15rem] sm:w-[20rem]">
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            required
            className="block w-full py-2.5 px-2 text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

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
