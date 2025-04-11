'use client';
import Link from 'next/link';
import Layout from '../components/Layout';


export default function Home() {
  return (
    <Layout>
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Images/cars.jpg')" }}    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Welcome to Car Management System
        </h1>
        <p className="text-center text-lg mb-8 max-w-xl">
          View all tenants, their rental details, or track and manage visitors per Floor.
        </p>

        <div className="flex gap-6">
          <Link href="/Tenants">
            <div className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer shadow">
              View Tenants
            </div>
          </Link>
          <Link href="/Visitors">
            <div className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer shadow">
              Manage Visitors
            </div>
          </Link>
        </div>
      </div>
    </div>
    </Layout>
  );
}
