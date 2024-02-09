import useAxiosAuth from "../axios/useAxiosAuth";

export const useSignOut = () => {
  const axiosAuth = useAxiosAuth();

  const signOutFromBackend = async () => {
    await axiosAuth
      .post("/api/auth/logout")
      .catch((error) => console.log(error));
  };
  return { signOutFromBackend };
};
