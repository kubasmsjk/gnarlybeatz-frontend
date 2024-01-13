"use client"

import Link from "next/link";
import SignUpForm from "@/app/auth/signup/SignUpForm";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";

export default function SignUp() {
  const { formErrors } = useAuthenticationForm();
  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Sign up
      </h1>
      <SignUpForm />
      <p className="p-3 text-center text-xs sm:text-sm">
        Do you already have an account?{" "}
        <Link
          href={"/auth/signin"}
          className="hover:text-[#8A0303] underline underline-offset-4"
          onClick={() => formErrors.clear()}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
