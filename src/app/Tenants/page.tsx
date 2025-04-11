'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown } from 'react-icons/fi';
import Layout from '../components/Layout';


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
    // First Floor Tenants
    {
      id: 1,
      businessName: "Bloom & Grow",
      ownerName: "Terry Mutheu",
      businessType: "Flower Shop",
      car: "Toyota Corolla",
      numberPlate: "FL-5678",
      imageUrl: "/Images/flowershop.jpg",
      floor: "First Floor"
    },
    {
      id: 2,
      businessName: "Chic Boutique",
      ownerName: "Michael Otieno",
      businessType: "Boutique",
      car: "Honda Civic",
      numberPlate: "BQ-1234",
      imageUrl: "/Images/botique.jpg",
      floor: "First Floor"
    },
    {
      id: 3,
      businessName: "Fresh Bites",
      ownerName: "Susan Kamau",
      businessType: "Bakery",
      car: "Nissan Sentra",
      numberPlate: "BK-7890",
      imageUrl: "/Images/bakery.jpg",
      floor: "First Floor"
    },
    
    // Second Floor Tenants
    {
      id: 4,
      businessName: "Sharp Cuts",
      ownerName: "Medan Wilson",
      businessType: "Barber Shop",
      car: "Mazda 3",
      numberPlate: "BS-9012",
      imageUrl: "/Images/barbershop.jpg",
      floor: "Second Floor"
    },
    {
      id: 5,
      businessName: "Tech Haven",
      ownerName: "James Omondi",
      businessType: "Electronics Store",
      car: "Subaru Outback",
      numberPlate: "TE-3456",
      imageUrl: "/Images/electronics.jpg",
      floor: "Second Floor"
    },
    {
      id: 6,
      businessName: "Coffee Corner",
      ownerName: "Diana Njeri",
      businessType: "Café",
      car: "Hyundai Tucson",
      numberPlate: "CC-5678",
      imageUrl: "/images/cafe.jpg",
      floor: "Second Floor"
    },
    
    // Third Floor Tenants
    {
      id: 7,
      businessName: "Fitness First",
      ownerName: "Brian Kimani",
      businessType: "Gym",
      car: "Ford Ranger",
      numberPlate: "FF-9012",
      imageUrl: "/images/gym.jpg",
      floor: "Third Floor"
    },
    {
      id: 8,
      businessName: "Dental Care",
      ownerName: "Rose Wambui",
      businessType: "Dental Clinic",
      car: "Toyota RAV4",
      numberPlate: "DC-3456",
      imageUrl: "/images/dental.jpg",
      floor: "Third Floor"
    },
    {
      id: 9,
      businessName: "Book Nook",
      ownerName: "Peter Ndungu",
      businessType: "Bookstore",
      car: "Honda HR-V",
      numberPlate: "BN-7890",
      imageUrl: "/images/bookstore.jpg",
      floor: "Third Floor"
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
    const matchesSearch = tenant.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.businessType.toLowerCase().includes(searchTerm.toLowerCase());
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
   <Layout>
     <div className="flex text-black flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Find Your Rentals Here</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search by floor"
          className="p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="relative">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-10 cursor-pointer min-w-[150px]"
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

      {/* tenants by floor */}
      {floors.filter(floor => floor !== 'All Floors').map(floor => {
        const floorTenants = filteredTenants.filter(tenant => 
          selectedFloor === 'All Floors' || selectedFloor === floor ? tenant.floor === floor : false
        );
        
        if (floorTenants.length === 0) return null;
        
        return (
          <div key={floor} className="w-full max-w-7xl mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 px-4">{floor}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {floorTenants.map((tenant) => (
                <div key={tenant.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-52 w-full">
                    {!tenant.imageUrl.includes('http') ? (
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
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{tenant.businessName}</h3>
                    <div className="space-y-1">
                      <p className="text-gray-700"><span className="font-medium">Owner:</span> {tenant.ownerName}</p>
                      <p className="text-gray-700"><span className="font-medium">Business:</span> {tenant.businessType}</p>
                      <p className="text-gray-700"><span className="font-medium">Car:</span> {tenant.car}</p>
                      <p className="text-gray-700"><span className="font-medium">Number Plate:</span> {tenant.numberPlate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filteredTenants.length === 0 && (
        <div className="text-center p-8 w-full">
          <p className="text-xl text-gray-500">No tenants found matching your criteria.</p>
        </div>
      )}
    </div>
   </Layout>
  );
};

export default TenantDisplay;