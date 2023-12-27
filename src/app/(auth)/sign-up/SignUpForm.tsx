"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icons } from "../../../components/ui/Icons";
import Input from "../../../components/reused/Input";

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
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="text"
          id="username"
          name="username"
          value={values.username}
          text="Username"
          handleFunction={handleChange}
        />
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="email"
          id="email"
          name="email"
          value={values.email}
          text="E-mail"
          handleFunction={handleChange}
        />
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="password"
          id="password"
          name="password"
          value={values.password}
          text="Password"
          handleFunction={handleChange}
        />
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.password}
          text="Confirm Password"
          handleFunction={handleChange}
        />
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
