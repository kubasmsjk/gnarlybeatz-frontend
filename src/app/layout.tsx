import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import Logo from "@/components/ui/Logo";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import Providers from "@/providers/Providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_NAME!,
    template: `%s | ${process.env.NEXT_PUBLIC_NAME}`,
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
        className={`flex flex-col w-auto h-screen antialiased ${montserrat.className}`}
      >
        <Logo />
        <Providers>
          <div className="container flex flex-col max-w-7xl h-auto mx-auto">
            {children}
          </div>
          <Navigation />
          <Footer />
        </Providers>
        <ToastContainer
          closeButton={false}
          toastStyle={{ borderRadius: "10px" }}
        />
      </body>
    </html>
  );
}
