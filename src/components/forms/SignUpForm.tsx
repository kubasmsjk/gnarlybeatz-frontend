"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icons } from "../ui/Icons";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialState = { values: initialValues };

export default function SingUpForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { values } = form;

  const handleChange = ({ target }: any) => {
    setForm((prev) => ({
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
      .post("http://localhost:8081/sendMail", {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
      .then(function (response) {
        setForm(initialState);
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
            id="username"
            name="username"
            value={values.username}
            required
            className="block w-full py-2.5 px-2 text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="username"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>

        <div className="relative pb-6 w-[15rem] sm:w-[20rem]">
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
            Email
          </label>
        </div>

        <div className="relative pb-6 w-[15rem] sm:w-[20rem]">
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

        <div className="relative w-[15rem] sm:w-[20rem]">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            required
            className="block w-full py-2.5 px-2 text-base bg-transparent rounded border border-[#8A0303] bg-black dark:bg-black appearance-none dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
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
              disabled={
                !values.username ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
            >
              Sign up
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
