"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <>
      <div className="fixed top-0 left-0 h-full bg-orange-600 text-white w-64 flex flex-col hidden md:flex py-8 px-4 z-50">
        <div className="flex-grow">
          <SidebarLink href="/Home" icon={<HomeIcon className="h-6 w-6" />}>Home</SidebarLink>
          <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />}>Tenants</SidebarLink>
          <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />}>Visitors</SidebarLink>
        </div>
        <div className="mt-auto border-t border-orange-500 pt-4">
          <SidebarLink href="/" icon={<ArrowRightOnRectangleIcon className="h-6 w-6" />}>Logout</SidebarLink>
        </div>
      </div>
      
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 transition-colors"
          aria-label="Toggle menu">
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-orange-600 bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="fixed top-0 left-0 h-full w-64 bg-orange-600 text-white flex flex-col py-8 px-4 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 px-2 flex justify-between items-center">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:bg-orange-700 p-1 rounded-full"
                aria-label="Close menu">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow">
              <SidebarLink href="/Home" icon={<HomeIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Home</SidebarLink>
              <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Tenants</SidebarLink>
              <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Visitors</SidebarLink>
            </div>
            <div className="mt-auto border-t border-orange-500 pt-4">
              <SidebarLink href="/Landingpage" icon={<ArrowRightOnRectangleIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Logout</SidebarLink>
            </div>
          </div>
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
      className="flex items-center gap-4 text-lg py-3 px-2 hover:bg-orange-700 rounded transition-all"
    >
      {icon}
      {children}
    </Link>
  );
};

export default Sidebar;