'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown } from 'react-icons/fi';
import Layout from '../components/Layout';

interface Tenant {
  _id: string;
  businessName: string;
  ownerName: string;
  businessType: string;
  car: string;
  numberPlate: string;
  imageUrl: string;
  floor: string;
}

const TenantDisplay = () => {
  const allTenants: Tenant[] = [
    {
      _id: "t1",
      businessName: "Westside Coffee Shop",
      ownerName: "John Maina",
      businessType: "Food & Beverages",
      car: "Toyota",
      numberPlate: "KBZ 123A",
      imageUrl: "/Images/caffe.jpg",
      floor: "1st Floor"
    },
    {
      _id: "t2",
      businessName: "Maisha Pharmacy",
      ownerName: "Dr. Otieno",
      businessType: "Healthcare",
      car: "Mazda",
      numberPlate: "KDF 789C",
      imageUrl: "/Images/pharmacy.jpg",
      floor: "1st Floor"
    },
    {
      _id: "t3",
      businessName: "Savannah Tech Solutions",
      ownerName: "Wanjiku Kamau",
      businessType: "IT Services",
      car: "Honda",
      numberPlate: "KCE 456B",
      imageUrl: "/Images/techie.jpg",
      floor: "1st Floor"
    },
    {
      _id: "t4",
      businessName: "Safari Books & Stationery",
      ownerName: "Sarah Njeri",
      businessType: "Retail",
      car: "Nissan",
      numberPlate: "KCA 321D",
      imageUrl: "/Images/books-a.jpg",
      floor: "2nd Floor"
    },
    {
      _id: "t5",
      businessName: "Gadget Galaxy",
      ownerName: "Mike Ochieng",
      businessType: "Electronics Store",
      car: "Subaru Outback",
      numberPlate: "KBF 789J",
      imageUrl: "/Images/electronics.jpg",
      floor: "2nd Floor"
    },
    {
      _id: "t6",
      businessName: "Brew & Blend",
      ownerName: "Caroline Wambui",
      businessType: "Coffee Shop",
      car: "Hyundai Tucson",
      numberPlate: "KBC 987P",
      imageUrl: "/Images/coffee.jpg",
      floor: "2nd Floor"
    },
    {
      _id: "t7",
      businessName: "Iron Fit Gym",
      ownerName: "James Muriithi",
      businessType: "Fitness Center",
      car: "Ford Ranger",
      numberPlate: "KTW 123T",
      imageUrl: "/Images/gym-a.jpg",
      floor: "3rd Floor"
    },
    {
      _id: "t8",
      businessName: "Bright Smiles Dental",
      ownerName: "Grace Njiru",
      businessType: "Dental Care",
      car: "Toyota RAV4",
      numberPlate: "KJB 112Z",
      imageUrl: "/Images/dental.jpg",
      floor: "3rd Floor"
    },
    {
      _id: "t9",
      businessName: "Paper Trails Bookstore",
      ownerName: "Chris Mwangi",
      businessType: "Bookstore",
      car: "Honda HR-V",
      numberPlate: "KBS 456Y",
      imageUrl: "/Images/bookstore.jpg",
      floor: "3rd Floor"
    }
  ];

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All Floors');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTenants(allTenants);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.businessType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFloor = selectedFloor === 'All Floors' || tenant.floor === selectedFloor;

    return matchesSearch && matchesFloor;
  });

  const floors = ['All Floors', '1st Floor', '2nd Floor', '3rd Floor'];

  return (
    <Layout>
      <div className="flex text-black flex-col items-center p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Find Your Rentals Here</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by floor, business, or type"
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
              {floors.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FiChevronDown />
            </div>
          </div>
        </div>

        {floors.filter(f => f !== 'All Floors').map((floor) => {
          const floorTenants = filteredTenants.filter((tenant) =>
            selectedFloor === 'All Floors' || selectedFloor === floor
              ? tenant.floor === floor
              : false
          );

          if (floorTenants.length === 0) return null;

          return (
            <div key={floor} className="w-full max-w-7xl mb-12">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 px-4">{floor}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {floorTenants.map((tenant) => (
                  <div
                    key={tenant._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative h-52 w-full">
                      <Image
                        src={tenant.imageUrl}
                        alt={tenant.businessName}
                        width={400}
                        height={200}
                        quality={100}
                        className="object-cover w-full h-52 rounded-t-lg"
                      />
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
