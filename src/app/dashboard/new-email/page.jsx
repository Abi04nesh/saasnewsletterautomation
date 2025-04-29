"use client";
import dynamic from "next/dynamic";
import { ICONS } from "@/shared/utils/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Dynamically import the Email editor component without SSR
const Emaileditor = dynamic(() => import("@/shared/components/editor/email.editor"), {
  ssr: false,
});

const Page = () => {
  const searchParams = useSearchParams();
  
  // Safely get the subject parameter and handle null case
  const subject = searchParams.get("subject");

  // If subject is null, use a default value or handle accordingly
  const subjectTitle = subject ? subject.replace(/-/g, " ") : "Default Subject"; // Default value in case of null

  return (
    <div className="w-full flex bg-[#F7F7F7]">
      <div className="w-full p-5 bg-white rounded-r-xl">
        {/* Back arrow */}
        <Link href="/dashboard/write" className="opacity-[.7] w-min flex text-xl items-center">
          <span>{ICONS.backArrow}</span>
          <span>Exit</span>
        </Link>
        {/* Email editor */}
        <div className="my-5">
          <Emaileditor subjectTitle={subjectTitle} />
        </div>
      </div>
    </div>
  );
};

export default Page;
