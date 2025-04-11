"use client";
import React, { useState } from 'react';
import Link from 'next/link'; 
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      
      <div className="fixed top-0 left-0 h-full bg-orange-600 text-white w-64 flex-col hidden md:flex py-8 px-4 z-50">
        <SidebarLink href="/home" icon={<HomeIcon className="h-6 w-6" />}>Home</SidebarLink>
        <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />}>Tenants</SidebarLink>
        <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />}>Visitors</SidebarLink>
      </div>

      
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

     
      {isSidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col py-8 px-4 z-40">
          <SidebarLink href="/home" icon={<HomeIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Home</SidebarLink>
          <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Tenants</SidebarLink>
          <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Visitors</SidebarLink>
        </div>
      )}
    </>
  );
};

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, children, icon, onClick }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 text-lg py-3 px-2 hover:bg-gray-800 rounded transition-all"
    >
      {icon}
      {children}
    </Link>
  );
};

export default Sidebar;
