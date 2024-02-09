import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Account from "./Account";
import FavoriteBeats from "./FavoriteBeats";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="xl:w-1/2 flex flex-col items-center px-2 sm:px-4 border-b border-[#8A0303] xl:border-b-0 xl:border-r ">
        <h1 className="pb-7 pt-12 md:pt-14 font-XXIIUltimateBlackMetal text-red-700 text-4xl sm:text-5xl md:text-7xl">
          Account
        </h1>
        <Account username={user?.name} email={user?.email} />
      </div>
      <div className="xl:h-screen"></div>
      <div className="xl:w-1/2 flex flex-col items-center px-2 sm:px-4">
        <h1 className="pb-7 pt-14 font-XXIIUltimateBlackMetal text-red-700 text-4xl sm:text-5xl md:text-7xl">
          Favorite beats
        </h1>
        <FavoriteBeats />
      </div>
    </div>
  );
};
export default Profile;
