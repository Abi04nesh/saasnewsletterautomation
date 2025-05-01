"use client";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

// Dynamically import DashboardSidebar
const DashboardSidebar = dynamic(
  () => import("@/shared/widgets/dashboard/sidebar/DashboardSidebar"),
  { 
    ssr: false,
    loading: () => <div className="w-[290px] h-screen bg-gray-100 animate-pulse" />
  }
);

const hideSidebarRoutes = [
  "/dashboard/new-email",
  "/",
  "/sign-up",
  "/subscribe",
  "/success",
  "/sign-in",
];

export default function Providers({ children }) {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  const shouldShowSidebar = !hideSidebarRoutes.includes(pathname);

  return (
    <NextUIProvider>
      <Suspense fallback={<div className="w-full h-screen bg-gray-50 animate-pulse" />}>
        {shouldShowSidebar ? (
          <div className="w-full flex">
            <Suspense fallback={<div className="w-[290px] h-screen bg-gray-100 animate-pulse" />}>
              <div className="w-[290px] h-screen overflow-y-auto">
                <DashboardSidebar />
              </div>
            </Suspense>
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          children
        )}
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}
