import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/site";
import Logo from "@/components/ui/Logo";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/util/Providers";

export const metadata: Metadata = {
  //metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="!scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <head />
      <body
        className={`flex flex-col min-h-screen antialiased ${montserrat.className}`}
      >
        <div id="main-logo ">
          <Logo />
        </div>
        <div className="container max-w-7xl h-full mx-auto">
          <Providers>{children}</Providers>
        </div>
        <Navigation />
        <Footer />
        <ToastContainer
          closeButton={false}
          toastStyle={{ borderRadius: "10px" }}
        />
      </body>
    </html>
  );
}
