'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/cars.jpg" 
          alt="Car background"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="relative h-full bg-black/70 flex flex-col justify-center items-center text-center text-white px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Welcome to Car Management System
          </h1>
          <p className="text-lg sm:text-xl mb-10">
            View all tenants, their rental details, or track and manage visitors per floor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/Tenants">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow">
                View Tenants
              </button>
            </Link>
            <Link href="/Visitors">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow">
                Manage Visitors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
