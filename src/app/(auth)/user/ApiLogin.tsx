"use client";
import { Icons } from "../../../components/ui/Icons";

const loginWithGoogle = async () => {
  try {
    // await signIn('google')
  } catch (error) {
    //toast notification
  } finally {
  }
};

export default function ApiLogin() {
  return (
    <>
      <div className="flex items-center justify-center w-[15rem] sm:w-[20rem] pb-2">
        <hr className="flex-grow border-t border-[#8A0303]" />
        <span className="px-3 text-white">or</span>
        <hr className="flex-grow border-t border-[#8A0303]" />
      </div>

      <div className="flex flex-col space-y-3 items-center justify-center w-[15rem] sm:w-[20rem]">
        <div className="flex items-center justify-center w-full py-2 px-4 rounded-2xl border-2 border-[#8A0303]">
          <Icons.google className="h-4 w-4 mr-2" />
          <button onClick={loginWithGoogle}>Google</button>
        </div>

        <div className="flex items-center justify-center w-full py-2 px-4 rounded-2xl border-2 border-[#8A0303]">
          <Icons.apple className="h-4 w-4 mr-2" />
          <button onClick={loginWithGoogle}>Apple</button>
        </div>
      </div>
    </>
  );
}
