"use client";

import Link from "next/link";
import SignUpForm from "@/app/auth/signup/SignUpForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function SignUp() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user && status === "authenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  if (!session && status === "unauthenticated") {
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
            onClick={() =>
              queryClient.resetQueries({
                queryKey: ["formErrors"],
                exact: true,
              })
            }
          >
            Sign in
          </Link>
        </p>
      </div>
    );
  }
}
