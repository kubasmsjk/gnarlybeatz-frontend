import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import ApiLogin from "@/app/(auth)/user/ApiLogin";
import SignUpForm from "@/components/forms/SignUpForm";

export default function SingUp() {
  return (
    <div className="container flex flex-col max-w-full items-center justify-center">
      <h1 className="flex justify-center py-4 sm:py-4 text-red-700">
        <Icons.userProfile />
      </h1>
      <SignUpForm />
      <ApiLogin />
      <p className="p-3 text-center text-sm">
        Do you already have an account?{" "}
        <Link
          href={"/sign-in"}
          className="hover:text-[#8A0303] text-sm underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
