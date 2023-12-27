import Link from "next/link";
import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

export default function SignUp() {
  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Sign up
      </h1>
      <SignUpForm />
      <p className="p-3 text-center text-xs sm:text-sm">
        Do you already have an account?{" "}
        <Link
          href={"/sign-in"}
          className="hover:text-[#8A0303] underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
