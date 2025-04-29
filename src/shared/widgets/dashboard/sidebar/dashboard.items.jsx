import { sideBarBottomItems, sideBarItems } from "@/app/configs/constants";
import useRouteChange from "@/shared/hooks/useRouteChange";
import { ICONS } from "@/shared/utils/icons";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import SidebarFotterLogo from "./sidebar.fotter.logo";
import { useEffect } from "react";

const DashboardItems = () => {
  const { activeRoute, setActiveRoute } = useRouteChange();
  const { signOut, user } = useClerk();
  const pathName = usePathname();

  const LogoutHandler = () => {
    signOut();
    redirect("/sign-in");
  };

  useEffect(() => {
    setActiveRoute(pathName);
  }, [pathName, setActiveRoute]);

  const SidebarLink = ({ item, className = "" }) => (
    <Link
      href={item.url === "/" ? `/subscribe?username=${user?.username}` : item.url}
      className={`sidebar-item ${className}`}
    >
      <span
        className={`text-2xl mr-3 transition-colors ${
          item.url === activeRoute ? "text-blue-600" : "text-gray-600"
        }`}
      >
        {item.icon}
      </span>
      <span
        className={`text-base font-medium ${
          item.url === activeRoute ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {item.title}
      </span>
    </Link>
  );

  return (
    <div className="flex flex-col h-full py-2">
      {/* Top navigation items */}
      <nav className="space-y-1 px-3 mb-6">
        {sideBarItems.map((item, index) => (
          <SidebarLink key={index} item={item} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto px-3">
        <nav className="space-y-1">
          {sideBarBottomItems.map((item, index) => (
            <SidebarLink key={index} item={item} />
          ))}
        </nav>

        <div
          className="sidebar-item mt-2 border-t pt-4 hover:bg-red-50"
          onClick={LogoutHandler}
        >
          <span className="text-2xl mr-3 text-red-600">{ICONS.logOut}</span>
          <span className="text-base font-medium text-red-600">Sign Out</span>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center mt-6 pb-4">
          <div className="cursor-pointer transform hover:scale-105 transition-transform">
            <SidebarFotterLogo />
          </div>
          <p className="text-sm text-gray-500 mt-4 font-medium">
            © 2024 Netzwerk, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardItems;
