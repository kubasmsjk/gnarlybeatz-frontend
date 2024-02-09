import NextAuth, { DefaultSession, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string | "user";
      accessToken: string;
      refreshToken: string;
    };
    expires: ISODateString;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      role: string | "user";
      accessToken: string;
      refreshToken: string;
    };
    expires: ISODateString;
  }
}
