import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin"))
        return token?.user.role === "ADMIN";
      if (req.nextUrl.pathname.startsWith("/profile"))
        return token?.user.role === "USER";
      if (req.nextUrl.pathname.startsWith("/cart"))
        return token?.user.role === "USER";
      if (req.nextUrl.pathname.startsWith("/purchasedBeats"))
        return token?.user.role === "USER";
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/cart/:path*",
    "/purchasedBeats/:path*",
  ],
};
