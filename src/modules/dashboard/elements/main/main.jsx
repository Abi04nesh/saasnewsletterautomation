"use client";
import { useUser } from "@clerk/nextjs";

import DashboardOverViewCard from "@/shared/components/cards/overview.card";
import SubscribersChart from "@/shared/components/charts/subscribers.chart";
import { Button } from "@nextui-org/react";
import { ICONS } from "@/shared/utils/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const Main = () => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const smallText = document.querySelector(".copy-text");
    if (smallText) {
      const textToCopy = smallText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        toast.success("Copied");
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="max-w-[1920px] mx-auto p-5">
        <header className="mb-6">
          <h1 className="text-3xl text-surface-900 font-medium flex items-center gap-2">
            Hi {user?.username} 
            <span className="animate-wave inline-block">👋</span>
          </h1>
          <p className="text-gray-600 text-sm pt-2">
            Here&apos;s how your publication is doing
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 min-h-[85vh]">
            <br />
            <DashboardOverViewCard />
            <br />
            <SubscribersChart />
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            {/* create newsletter button */}
            <div className="w-full flex justify-end">
              <Button
                className="bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition-colors duration-200 px-6 py-2 flex items-center gap-2"
              >
                <span>{ICONS.write}</span>
                <span>Start Writing</span>
              </Button>
            </div>
            <br />
            {/* resources */}
            <div>
              <h5 className="text-xl font-medium mb-3">Resources</h5>
              <div className="w-full bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                {/* home page url */}
                <div>
                  <h4 className="font-medium">Home page</h4>
                  <div
                    className="w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer"
                    onClick={handleCopyClick}
                  >
                    <small
                      className={`w-[70%] text-sm overflow-hidden overflow-ellipsis whitespace-nowrap copy-text ${
                        copied ? "bg-blue-200" : "bg-transparent"
                      }`}
                    >
                      {process.env.NEXT_PUBLIC_WEBSITE_URL}/subscribe?username=
                      {user?.username}
                    </small>
                    <div className="absolute h-[38px] w-[90px] rounded-r-lg bg-[#DFE7FF] right-0 flex items-center justify-center">
                      <span className="text-lg">{ICONS.copy}</span>
                      <span className="pl-1">copy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need help? */}
            <div className="w-full bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-medium">Need help?</h5>
              <Link href={"/"}>
                <div className="w-max px-4 my-2 h-[38px] bg-transparent border rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Knowledge base</span>
                  <span className="ml-1">{ICONS.link}</span>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-max px-4 my-2 h-[38px] bg-transparent border rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm">API Documentation</span>
                  <span className="ml-1">{ICONS.link}</span>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-max px-4 my-2 h-[38px] bg-transparent border rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Blog</span>
                  <span className="ml-1">{ICONS.link}</span>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-max px-4 my-2 h-[38px] bg-transparent border rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm">FAQ</span>
                  <span className="ml-1">{ICONS.link}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
