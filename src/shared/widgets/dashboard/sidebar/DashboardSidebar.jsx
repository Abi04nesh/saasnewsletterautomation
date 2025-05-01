"use client";

import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import DashboardItems from "./dashboard.items";
import UserPlan from "./user.plan";

const DashboardSideBar = () => {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } min-h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative group`}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow z-10 hidden group-hover:block"
      >
        <span className="text-gray-600 text-sm transform transition-transform">
          {isCollapsed ? ICONS.rightArrow : ICONS.leftArrow}
        </span>
      </button>

      <div className="p-4 border-b border-gray-100">
        <div className={`${isCollapsed ? "justify-center" : "px-3"} flex items-center bg-gray-50 rounded-lg h-12`}>
          <span className="text-2xl text-blue-600">{ICONS.home}</span>
          {!isCollapsed && (
            <h5 className="pl-2 font-medium capitalize truncate">
              {user?.username ? `${user.username} Newsletter` : "Your Newsletter"}
            </h5>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-shrink-0 transition-all duration-300">
          <UserPlan isCollapsed={isCollapsed} />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <DashboardItems isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
