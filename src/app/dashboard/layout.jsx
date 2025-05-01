"use client";

import DashboardSidebar from "@/shared/widgets/dashboard/sidebar/DashboardSidebar";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
