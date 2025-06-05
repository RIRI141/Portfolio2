import type { Metadata } from "next";
import { Bruno_Ace } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bruno = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bruno",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryoga Ishii",
  description: "Portfolio of Ryoga Ishii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bruno.className}>
        {/* <Header/> */}
        <main>{children}</main>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
