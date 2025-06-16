"use client";
import Link from "next/link";
import { BiGame } from "react-icons/bi";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useAutoHideHeader } from "@/hooks/useAutoHideHeader";

const Header = () => {
  const { isVisible } = useAutoHideHeader(5000);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 75; 
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    closeMobileMenu(); 
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 neon-border-thin
          px-4 sm:px-6 py-5 font-bruno bg-[#1B1136] 
          transition-all duration-300 
          ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" onClick={closeMobileMenu}>
            <span className="neon-text-flicker font-bold text-xl">
              <BiGame  className="size-[2rem]"/>
            </span>
          </Link>

          <nav className="hidden md:flex gap-6 cursor-pointer">
            <button 
              className="cursor-pointer neon-text-flicker hover-effect"
              onClick={() => scrollToSection('about-me')}
            >
              ABOUT ME
            </button>
            <button 
              className="cursor-pointer neon-text-flicker"
              onClick={() => scrollToSection('work')}
            >
              WORKS
            </button>
            <button 
              className="cursor-pointer neon-text-flicker"
              onClick={() => scrollToSection('skill')}
            >
              SKILLS
            </button>
            <button 
              className="cursor-pointer neon-text-flicker"
              onClick={() => scrollToSection('contact')}
            >
              CONTACT
            </button>
          </nav>

          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer z-60"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <IoMenu className="neon-text-flicker size-9"/>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1B1136] z-50 transform transition-transform duration-300 md:hidden border-l neon-border-thin ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6">
          <button
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <IoClose  className="neon-text-flicker size-9"/>
          </button>

          <nav className="flex flex-col gap-8">
            <button
              className="cursor-pointer neon-text-flicker hover-effect text-left text-lg py-3 border-b border-gray-700 hover:border-white transition-colors"
              onClick={() => scrollToSection('about-me')}
            >
              ABOUT ME
            </button>
            <button
              className="cursor-pointer neon-text-flicker text-left text-lg py-3 border-b border-gray-700 hover:border-white transition-colors"
              onClick={() => scrollToSection('work')}
            >
              WORKS
            </button>
            <button
              className="cursor-pointer neon-text-flicker text-left text-lg py-3 border-b border-gray-700 hover:border-white transition-colors"
              onClick={() => scrollToSection('skill')}
            >
              SKILLS
            </button>
            <button
              className="cursor-pointer neon-text-flicker text-left text-lg py-3 border-b border-gray-700 hover:border-white transition-colors"
              onClick={() => scrollToSection('contact')}
            >
              CONTACT
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;