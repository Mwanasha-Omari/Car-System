"use client";
import React, { useState, ReactNode } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16.1 bg-primary-blue bg-opacity-40 text-base text-white py-4 px-6 w-full flex font-sans items-center z-50">
      <div className="flex items-center w-full justify-between">
        <div className="hidden md:flex gap-40 mt-2 text-2xl mr-40">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#services">Our Services</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-transparent z-40 flex flex-col items-center justify-center"> {/* Removed bg-opacity */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white focus:outline-none"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <MobileNavLink href="#home" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="#services" onClick={() => setIsMenuOpen(false)}>Our Services</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a href={href} className="text-white hover:text-primary-amber hover:font-bold">
      {children}
    </a>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: ReactNode;
  onClick: () => void;
}

function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
  return (
    <a href={href} onClick={onClick} className="block px-3 py-4 text-2xl text-white hover:text-primary-amber">
      {children}
    </a>
  );
}

export default Navbar;
