"use client";

import { useSession } from "next-auth/react";
import axiosNoAuth from "../axios/axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axiosNoAuth.post(
      "api/auth/refreshToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.user.refreshToken}`,
        },
      }
    );

    if (session) {
      session.user.accessToken = res.data.accessToken;
    }
  };
  return refreshToken;
};
