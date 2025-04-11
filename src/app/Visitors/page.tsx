'use client';

import { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Layout from '../components/Layout';

interface Visitor {
  id: number;
  fullName: string;
  carType: string;
  idNumber: string;
  arrivalTime: string;
  departureTime: string;
  duration: string;
}

interface Tenant {
  id: number;
  businessName: string;
  ownerName: string;
  businessType: string;
  car: string;
  numberPlate: string;
  imageUrl: string;
  floor: string;
  visitors: Visitor[];
}

const allTenants: Tenant[] = [
  {
    id: 1,
    businessName: "Bloom & Grow",
    ownerName: "Terry Mutheu",
    businessType: "Flower Shop",
    car: "Toyota Corolla",
    numberPlate: "FL-5678",
    imageUrl: "/images/flowershop.jpg",
    floor: "First Floor",
    visitors: [],
  },
  {
    id: 2,
    businessName: "Chic Boutique",
    ownerName: "Michael Otieno",
    businessType: "Boutique",
    car: "Honda Civic",
    numberPlate: "BQ-1234",
    imageUrl: "/images/botique.jpg",
    floor: "First Floor",
    visitors: [],
  },
];

const Visitors = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All Floors');
  const [arrivalTime, setArrivalTime] = useState<string>(''); 

  useEffect(() => {
    setTimeout(() => {
      setTenants(allTenants);
      setLoading(false);
    }, 800);
  }, []);

  const generateAfricanName = () => {
    const names = ["Mwangi", "Atieno", "Mutua", "Wanjiru", "Odhiambo", "Mugambi", "Akinyi", "Njeri", "Kamau"];
    return names[Math.floor(Math.random() * names.length)] + " " + names[Math.floor(Math.random() * names.length)];
  };

  const calculateTime = (arrival: string) => {
    const arrivalDate = new Date(`2025-04-04T${arrival}`);
    const stayDuration = Math.floor(Math.random() * 120) + 60;
    const departureDate = new Date(arrivalDate.getTime() + stayDuration * 60000);

    return {
      departureTime: departureDate.toLocaleTimeString(),
      duration: `${stayDuration} mins`,
    };
  };

  const addVisitor = (tenantId: number) => {
    if (!arrivalTime) {
      alert("Please enter an arrival time.");
      return;
    }

    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === tenantId
          ? {
              ...tenant,
              visitors: [
                ...tenant.visitors,
                {
                  id: tenant.visitors.length + 1,
                  fullName: generateAfricanName(),
                  carType: ["Toyota", "Honda", "Mazda", "Nissan", "Hyundai"][Math.floor(Math.random() * 5)],
                  idNumber: `${Math.floor(Math.random() * 1000000)}`,
                  arrivalTime: arrivalTime,
                  ...calculateTime(arrivalTime),
                },
              ],
            }
          : tenant
      )
    );

    setArrivalTime(''); 
  };

  const clearVisitors = (tenantId: number) => {
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === tenantId ? { ...tenant, visitors: [] } : tenant
      )
    );
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch =
      tenant.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFloor = selectedFloor === 'All Floors' || tenant.floor === selectedFloor;
    return matchesSearch && matchesFloor;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-xl">Loading tenants...</p>
    </div>
  );

  return (
    <Layout>
      <div className="flex flex-col items-center p-4 md:p-8 text-black">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Find Your Rentals Here</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search business or floor"
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
              {['All Floors', 'First Floor', 'Second Floor'].map(floor => (
                <option key={floor} value={floor}>{floor}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FiChevronDown />
            </div>
          </div>
        </div>

        {filteredTenants.map(tenant => (
          <div key={tenant.id} className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold">{tenant.businessName}</h2>
            <p className="text-gray-700">{tenant.businessType} - {tenant.floor}</p>

            <div className="mt-3 flex gap-3">
              <input
                type="time"
                className="p-2 border border-gray-300 rounded"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
              <button
                onClick={() => addVisitor(tenant.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Add Visitor
              </button>
              <button
                onClick={() => clearVisitors(tenant.id)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Clear Visitors
              </button>
            </div>

            {tenant.visitors.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Visitors</h3>
                <table className="w-full mt-2 border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Car</th>
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Arrival</th>
                      <th className="border p-2">Departure</th>
                      <th className="border p-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenant.visitors.map(visitor => (
                      <tr key={visitor.id} className="border">
                        <td className="border p-2">{visitor.fullName}</td>
                        <td className="border p-2">{visitor.carType}</td>
                        <td className="border p-2">{visitor.idNumber}</td>
                        <td className="border p-2">{visitor.arrivalTime}</td>
                        <td className="border p-2">{visitor.departureTime}</td>
                        <td className="border p-2">{visitor.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Visitors;
