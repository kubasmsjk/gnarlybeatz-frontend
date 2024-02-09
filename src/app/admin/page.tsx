import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Account from "../profile/Account";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center px-2 sm:px-4 ">
        <h1 className="pb-7 pt-12 md:pt-14 font-XXIIUltimateBlackMetal text-red-700 text-4xl sm:text-5xl md:text-7xl">
          Account
        </h1>
        <Account username={user?.name} email={user?.email} role={user?.role} />
      </div>
    </div>
  );
};
export default Admin;
