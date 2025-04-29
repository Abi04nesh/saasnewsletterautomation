"use client";

import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import DashboardItems from "./dashboard.items";
import UserPlan from "./user.plan";

const DashboardSideBar = () => {
  const { user } = useUser();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <div className="p-3 flex items-center bg-gray-50 rounded-lg">
          <span className="text-2xl text-blue-600">{ICONS.home}</span>
          <h5 className="pl-2 font-medium capitalize truncate">
            {user?.username ? `${user.username} Newsletter` : "Your Newsletter"}
          </h5>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-shrink-0">
          <UserPlan />
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardItems />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
