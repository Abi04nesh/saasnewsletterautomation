"use client";

import "../shared/styles/globals.css";
import Providers from "@/shared/utils/Providers";
import localFont from "next/font/local";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

const clashDisplay = localFont({
  src: "../assets/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clashDisplay",
  weight: "700",
});

// Dynamically import sidebar for better performance
const DashboardSidebar = dynamic(
  () => import("@/shared/widgets/dashboard/sidebar/DashboardSidebar"),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${clashDisplay.variable} bg-gray-50`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
