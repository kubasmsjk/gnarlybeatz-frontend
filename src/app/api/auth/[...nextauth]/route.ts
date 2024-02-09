import { authenticationUtils } from "@/app/utils/authenticationUtils";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: string;
  name: string;
  email: string;
  role: string | "user";
  accessToken: string;
  refreshToken: string;
};

const { authorizeSchema } = authenticationUtils();

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {},
        username: {},
        email: {},
        role: {},
        accessToken: {},
        refreshToken: {},
      },
      async authorize(credentials, req) {
        if (
          credentials?.id &&
          credentials?.username &&
          credentials?.email &&
          credentials?.role &&
          credentials?.accessToken &&
          credentials?.refreshToken
        ) {
          const result = authorizeSchema.safeParse({
            id: credentials.id,
            username: credentials.username,
            email: credentials.email,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          });

          if (result.success) {
            const user = {
              id: credentials.id,
              name: credentials.username,
              email: credentials.email,
              role: credentials.role,
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
            };
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.user = session.user as User;
      }

      if (user) {
        return {
          ...token,
          user: user as User,
        };
      }
      return token;
    },

    async session({ token, session }) {
      return {
        ...session,
        user: token.user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
