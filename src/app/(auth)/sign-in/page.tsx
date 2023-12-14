import Link from "next/link";
import SignInForm from "@/components/forms/SignInForm";
import { Icons } from "@/components/ui/Icons";
import ApiLogin from "@/app/(auth)/user/ApiLogin";

export default function SingIn() {
  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center py-4 sm:py-4 text-red-700">
        <Icons.userProfile />
      </h1>
      <SignInForm />
      <ApiLogin />
      <p className="p-3 text-center text-sm">
        Don&apos;t have an account yet?{" "}
        <Link
          href={"/sign-up"}
          className="hover:text-[#8A0303] text-sm underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
