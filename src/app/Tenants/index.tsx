'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown } from 'react-icons/fi';

interface Tenant {
  id: number;
  businessName: string;
  ownerName: string;
  businessType: string;
  car: string;
  numberPlate: string;
  imageUrl: string;
  floor: string;
}

const TenantDisplay = () => {
  const mockTenants: Tenant[] = [
    {
      id: 1,
      businessName: "Bloom & Grow",
      ownerName: "Terry Mutheu",
      businessType: "Flower Shop",
      car: "Toyota Corolla",
      numberPlate: "FL-5678",
      imageUrl: "/images/flower-shop.jpg", 
      floor: "First Floor"
    },
    {
      id: 2,
      businessName: "Chic Boutique",
      ownerName: "Michael Otieno",
      businessType: "Boutique",
      car: "Honda Civic",
      numberPlate: "BQ-1234",
      imageUrl: "/images/boutique.jpg",
      floor: "First Floor"
    },
    {
      id: 3,
      businessName: "Sharp Cuts",
      ownerName: "Medan Wilson",
      businessType: "Barber Shop",
      car: "Mazda 3",
      numberPlate: "BS-9012",
      imageUrl: "/images/barber-shop.jpg",
      floor: "Second Floor"
    }
  ];

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All Floors');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTenants(mockTenants);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.floor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFloor = selectedFloor === 'All Floors' || tenant.floor === selectedFloor;
    return matchesSearch && matchesFloor;
  });

  const floors = ['All Floors', ...Array.from(new Set(tenants.map(tenant => tenant.floor)))];

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-xl">Loading tenants...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Find Your Rentals Here</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search per floor"
          className="p-3 bg-gray-100 rounded focus:outline-none flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="relative">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="p-3 bg-gray-100 rounded focus:outline-none appearance-none pr-10 cursor-pointer min-w-[150px]"
          >
            {floors.map(floor => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <FiChevronDown />
          </div>
        </div>
      </div>

      {floors.filter(floor => floor !== 'All Floors').map(floor => {
        const floorTenants = filteredTenants.filter(tenant => 
          selectedFloor === 'All Floors' || selectedFloor === floor ? tenant.floor === floor : false
        );
        
        if (floorTenants.length === 0) return null;
        
        return (
          <div key={floor} className="w-full max-w-6xl mb-8">
            <h2 className="text-xl font-semibold mb-4">{floor}</h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {floorTenants.map((tenant) => (
                <div key={tenant.id} className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    {tenant.imageUrl.startsWith('/images/') ? (
                      <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="font-bold text-xl">{tenant.businessName}</p>
                          <p className="text-gray-700">{tenant.businessType}</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={tenant.imageUrl}
                        alt={tenant.businessName}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg"
                      />
                    )}
                  </div>
                  <div className="p-4 text-black">
                    <h3 className="text-lg font-semibold">{tenant.businessName}</h3>
                    <p className="text-gray-700">Name: {tenant.ownerName}</p>
                    <p className="text-gray-700">Business: {tenant.businessType}</p>
                    <p className="text-gray-700">Car: {tenant.car}</p>
                    <p className="text-gray-700">Number Plate: {tenant.numberPlate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filteredTenants.length === 0 && (
        <div className="text-center p-8">
          <p className="text-xl text-gray-500">No tenants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TenantDisplay;