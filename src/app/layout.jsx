"use client";

import "../shared/styles/globals.css";
import Providers from "@/shared/utils/Providers";
import localFont from "next/font/local";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Sidebar from "@/shared/widgets/dashboard/sidebar/DashboardSidebar";

const clashDisplay = localFont({
  src: "../assets/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clashDisplay",
  weight: "700",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${clashDisplay.variable} bg-gray-50`}>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

const MainLayout = ({ children }) => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const shouldShowSidebar = isSignedIn && pathname.startsWith("/dashboard");

  return (
    <div className="flex">
      {shouldShowSidebar && (
        <div className="fixed left-0 h-screen">
          <Sidebar />
        </div>
      )}
      <main className={`flex-1 min-h-screen ${shouldShowSidebar ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
};
