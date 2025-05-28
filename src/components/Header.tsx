"use client";
import Link from "next/link";
import { useAutoHideHeader } from "@/hooks/useAutoHideHeader";

const Header = () => {
  const { isVisible } = useAutoHideHeader(5000);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 neon-border-thin
        px-4 sm:px-6 py-5 font-bruno bg-[#1B1136] 
        transition-all duration-300 
        ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="neon-text-flicker hidden md:block font-bold text-xl ">
            LOGO
          </span>
        </Link>
        <nav className="md:flex gap-6 cursor-pointer">
          <button className="cursor-pointer neon-text-flicker hover-effect ">ABOUT ME</button>
          <button className="cursor-pointer neon-text-flicker">WORKS</button>
          <button className="cursor-pointer neon-text-flicker">CONTACT</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
