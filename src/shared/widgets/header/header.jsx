"use client";

import Toolbar from "./toolbar";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Left: Logo & Branding */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Logo />
        </Link>
        <span className="text-l font-bold">NETZWERK</span>
      </div>

      {/* Right: Toolbar */}
      <Toolbar />
    </header>
  );
};

export default Header;
