"use client";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardSidebar from "@/shared/widgets/dashboard/sidebar/DashboardSidebar";
import { Toaster } from "react-hot-toast";
import { addStripe } from "@/actions/add.stripe";
import { useEffect } from "react";

export default function Providers({ children }) {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (user) {
      addStripe(); // ✅ Runs 
    }
  }, [user]);

  if (!isLoaded) {
    return null;
  }

  const hideSidebarRoutes = [
    "/dashboard/new-email",
    "/",
    "/sign-up",
    "/subscribe",
    "/success",
    "/sign-in",
  ];

  return (
    <NextUIProvider>
      {!hideSidebarRoutes.includes(pathname) ? (
        <div className="w-full flex">
          <div className="w-[290px] h-screen overflow-y-scroll">
            <DashboardSidebar />
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}
