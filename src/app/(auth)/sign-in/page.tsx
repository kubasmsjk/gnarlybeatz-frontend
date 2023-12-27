import Link from "next/link";
import SignInForm from "@/app/(auth)/sign-in/SignInForm";

export default function SignIn() {
  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-6xl sm:text-7xl">
        Sign in
      </h1>
      <SignInForm />
      <p className="p-3 text-center text-xs sm:text-sm">
        Don&apos;t have an account yet?{" "}
        <Link
          href={"/sign-up"}
          className="hover:text-[#8A0303] underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
