import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SocketProvider } from "@/context/socketContext";

const font = Inter({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Water",
  description: "IoT Plant Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex overflow-hidden", font.className)}>
        <SocketProvider>
          <NavigationSidebar className="sm:block hidden" />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
