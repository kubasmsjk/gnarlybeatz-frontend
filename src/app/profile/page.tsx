import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Account from "./Account";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex flex-row justify-center">
      <div className="w-1/2 flex flex-col items-center px-2 sm:px-4 border-r border-[#8A0303]">
        <h1 className="pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-4xl sm:text-5xl md:text-7xl">
          Account
        </h1>
        <Account username={user?.name} email={user?.email} />
      </div>
      <div className="h-screen"></div>
      <div className="w-1/2 flex flex-col items-center px-2 sm:px-4">
        <h1 className="pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-4xl sm:text-5xl md:text-7xl">
          Favorite beats
        </h1>
      </div>
    </div>
  );
};
export default Profile;
