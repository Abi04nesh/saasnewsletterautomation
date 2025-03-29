"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Toolbar = () => {
  const { user } = useUser();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Start Trial Button */}
      <Button color="primary" className="text-lg" onClick={scrollToPricing}>
        Start Trial
      </Button>

      {/* User Avatar / Login Link */}
      {user ? (
        <Link href="/dashboard">
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link href="/sign-in" className="text-blue-500 font-semibold">
          Login
        </Link>
      )}
    </div>
  );
};

export default Toolbar;
