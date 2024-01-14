"use client";

import Link from "next/link";
import SignInForm from "@/app/auth/signin/SignInForm";
import { useAuthenticationForm } from "@/app/services/hooks/useAuthenticationForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { formErrors } = useAuthenticationForm();
  const { data: session, status } = useSession();
  const router = useRouter();
  if (session && session.user && status === "authenticated") {
    router.push("/");
  }
  if (!session && status === "unauthenticated") {
    return (
      <div className="container flex flex-col max-w-full items-center justify-center">
        <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
          Sign in
        </h1>
        <SignInForm />
        <p className="p-3 text-center text-xs sm:text-sm">
          Don&apos;t have an account yet?{" "}
          <Link
            href={"/auth/signup"}
            className="hover:text-[#8A0303] underline underline-offset-4"
            onClick={() => formErrors.clear()}
          >
            Sign up
          </Link>
        </p>
      </div>
    );
  }
}
