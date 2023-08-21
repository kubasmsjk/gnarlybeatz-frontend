import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/site";
import Logo from "@/components/ui/Logo";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";


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
        <Logo />
        <div className="container max-w-7xl mx-auto h-full">{children}</div>
        <Navigation />
        <Footer />
      </body>
    </html>
  );
}
