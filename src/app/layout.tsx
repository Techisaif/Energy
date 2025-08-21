import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientLayout } from "./client-layout";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Energy Hub - Future Energy Visualization",
  description: "Interactive platform for energy data visualization and AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="bg-black min-h-full">
        <ClientLayout>
          <Navigation />
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
