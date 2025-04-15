"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Plus, Trash,RefreshCw} from 'lucide-react';
import { HomeIcon, UsersIcon, UserGroupIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface Visitor {
  _id?: string;
  tenantId: string;
  fullName: string;
  carType: string;
  idNumber: string;
  arrivalTime: string;
  departureTime: string;
  duration: string;
  status: 'checked-in' | 'checked-out';
  phoneNumber?: string;
}

interface Tenant {
  _id: string;
  businessName: string;
  ownerName: string;
  businessType: string;
  car: string;
  numberPlate: string;
  imageUrl: string;
  floor: string;
  visitors?: Visitor[];
}

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

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);
  
  return (
    <>
      <div className="fixed top-0 left-0 h-full bg-orange-600 text-white w-64 flex-col hidden md:flex py-8 px-4 z-30">
        <SidebarLink href="/Home" icon={<HomeIcon className="h-6 w-6" />}>Home</SidebarLink>
        <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />}>Tenants</SidebarLink>
        <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />}>Visitors</SidebarLink>
      </div>
            <div className="md:hidden fixed top-4 left-4 z-40">
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
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="fixed top-0 left-0 h-full w-64 bg-orange-600 text-white flex flex-col py-8 px-4 z-50 transform transition-transform"
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
            <SidebarLink href="/Home" icon={<HomeIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Home</SidebarLink>
            <SidebarLink href="/Tenants" icon={<UsersIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Tenants</SidebarLink>
            <SidebarLink href="/Visitors" icon={<UserGroupIcon className="h-6 w-6" />} onClick={() => setIsSidebarOpen(false)}>Visitors</SidebarLink>
          </div>
        </div>
      )}
    </>
  );
};

const mockTenants: Tenant[] = [
  {
    _id: "t1",
    businessName: "Westside Coffee Shop",
    ownerName: "John Maina",
    businessType: "Food & Beverages",
    car: "Toyota",
    numberPlate: "KBZ 123A",
    imageUrl: "/cars.jpg",
    floor: "1st Floor"
  },
  {
    _id: "t2",
    businessName: "Savannah Tech Solutions",
    ownerName: "Wanjiku Kamau",
    businessType: "IT Services",
    car: "Honda",
    numberPlate: "KCE 456B",
    imageUrl: "/cars.jpg",
    floor: "2nd Floor"
  },
  {
    _id: "t3",
    businessName: "Maisha Pharmacy",
    ownerName: "Dr. Otieno",
    businessType: "Healthcare",
    car: "Mazda",
    numberPlate: "KDF 789C",
    imageUrl: "/cars.jpg",
    floor: "1st Floor"
  },
  {
    _id: "t4",
    businessName: "Safari Books & Stationery",
    ownerName: "Sarah Njeri",
    businessType: "Retail",
    car: "Nissan",
    numberPlate: "KCA 321D",
    imageUrl: "/cars.jpg",
    floor: "3rd Floor"
  }
];

const mockVisitors: Record<string, Visitor[]> = {
  "t1": [
    {
      _id: "v1",
      tenantId: "t1",
      fullName: "Mwangi Kimani",
      carType: "Toyota",
      idNumber: "29384756",
      arrivalTime: "09:30",
      departureTime: "10:45",
      duration: "75 mins",
      status: "checked-out"
    }
  ],
  "t2": [
    {
      _id: "v2",
      tenantId: "t2",
      fullName: "Atieno Ouma",
      carType: "Honda",
      idNumber: "37485921",
      arrivalTime: "11:15",
      departureTime: "",
      duration: "",
      status: "checked-in"
    }
  ]
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="w-full md:ml-64 flex-1 py-6 px-4 transition-all">{children}</main>
    </div>
  );
};

const Visitors = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All Floors');
  const [visitorFormState, setVisitorFormState] = useState<Record<string, any>>({});

  const resetVisitorForm = (tenantId: string) => {
    setVisitorFormState({
      ...visitorFormState,
      [tenantId]: {
        fullName: '',
        carType: '',
        idNumber: '',
        phoneNumber: '',
        arrivalTime: ''
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          const tenantsWithVisitors = mockTenants.map(tenant => ({
            ...tenant,
            visitors: mockVisitors[tenant._id] || []
          }));
          setTenants(tenantsWithVisitors);
          const formState: Record<string, any> = {};
          tenantsWithVisitors.forEach(tenant => {
            formState[tenant._id] = {
              fullName: '',
              carType: '',
              idNumber: '',
              phoneNumber: '',
              arrivalTime: ''
            };
          });
          setVisitorFormState(formState);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTime = (arrival: string) => {
    const arrivalDate = new Date(`2025-04-14T${arrival}`);
    const stayDuration = Math.floor(Math.random() * 120) + 60;
    const departureDate = new Date(arrivalDate.getTime() + stayDuration * 60000);

    return {
      departureTime: departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: `${stayDuration} mins`,
    };
  };

  const generateName = () => {
    const firstNames = ["Mwangi", "Atieno", "Mutua", "Wanjiru", "Odhiambo", "Mugambi", "Akinyi", "Njeri", "Kamau"];
    const lastNames = ["Kimani", "Ouma", "Waweru", "Owino", "Mutiso", "Maina", "Juma", "Karanja", "Onyango"];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const handleVisitorFormChange = (tenantId: string, field: string, value: string) => {
    setVisitorFormState({
      ...visitorFormState,
      [tenantId]: {
        ...visitorFormState[tenantId],
        [field]: value
      }
    });
  };

  const addVisitor = (tenantId: string) => {
    const formData = visitorFormState[tenantId];
    
    if (!formData.arrivalTime) {
      alert("Please enter an arrival time.");
      return;
    }

    try {
      const { departureTime, duration } = calculateTime(formData.arrivalTime);

      const visitorData: Visitor = {
        _id: `v${Math.random().toString(36).substr(2, 9)}`,
        tenantId,
        fullName: formData.fullName || generateName(),
        carType: formData.carType || ["Toyota", "Honda", "Mazda", "Nissan", "Hyundai"][Math.floor(Math.random() * 5)],
        idNumber: formData.idNumber || `${Math.floor(Math.random() * 1000000)}`,
        phoneNumber: formData.phoneNumber || `07${Math.floor(Math.random() * 100000000)}`,
        arrivalTime: formData.arrivalTime,
        departureTime: '',
        duration: '',
        status: 'checked-in'
      };

      setTenants(prevTenants =>
        prevTenants.map(tenant =>
          tenant._id === tenantId
            ? { ...tenant, visitors: [...(tenant.visitors || []), visitorData] }
            : tenant
        )
      );
      resetVisitorForm(tenantId);
      
    } catch (error) {
      console.error("Error adding visitor:", error);
      alert("Failed to add visitor. Please try again.");
    }
  };

  const checkoutVisitor = (tenantId: string, visitorId: string) => {
    const { departureTime, duration } = calculateTime('08:00'); 

    setTenants(prevTenants =>
      prevTenants.map(tenant =>
        tenant._id === tenantId
          ? {
              ...tenant,
              visitors: (tenant.visitors || []).map(visitor =>
                visitor._id === visitorId
                  ? { ...visitor, departureTime, duration, status: 'checked-out' as const }
                  : visitor
              )
            }
          : tenant
      )
    );
  };

  const clearVisitors = (tenantId: string) => {
    if (confirm("Are you sure you want to clear all visitors?")) {
      setTenants(prevTenants =>
        prevTenants.map(tenant =>
          tenant._id === tenantId
            ? { ...tenant, visitors: [] }
            : tenant
        )
      );
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch =
      tenant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.floor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFloor = selectedFloor === 'All Floors' || tenant.floor === selectedFloor;
    return matchesSearch && matchesFloor;
  });

  const floors = ['All Floors', ...Array.from(new Set(tenants.map(tenant => tenant.floor)))];

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <RefreshCw className="animate-spin h-10 w-10 text-orange-500 mx-auto mb-4" />
            <p className="text-xl text-gray-700">Loading data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center p-4 w-full">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-black text-2xl font-bold mb-4 md:mb-0"> Visitors Management</h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="text-black pl-10 p-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                  className="p-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-10 cursor-pointer w-full"
                >
                  {floors.map(floor => (
                    <option key={floor} value={floor}>{floor}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
              </div>
            </div>
          </div>
          {filteredTenants.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500 text-lg">No tenants found. Try a different search.</p>
            </div>
          )}

          {filteredTenants.map(tenant => (
            <div key={tenant._id} className="bg-white shadow-md rounded-lg p-5 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{tenant.businessName}</h2>
                  <p className="text-gray-600">{tenant.businessType} • {tenant.floor}</p>
                </div>
                <div className="mt-2 md:mt-0 bg-orange-50 px-3 py-1 rounded-full text-orange-700 text-sm">
                  <p>Owner: {tenant.ownerName}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                <h3 className="font-medium mb-3 flex items-center text-black">
                  <Plus size={18} className="mr-2 text-orange-500" />
                  Add New Visitor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Visitor Name"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={visitorFormState[tenant._id]?.fullName || ''}
                    onChange={(e) => handleVisitorFormChange(tenant._id, 'fullName', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Car Type"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={visitorFormState[tenant._id]?.carType || ''}
                    onChange={(e) => handleVisitorFormChange(tenant._id, 'carType', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="ID Number"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={visitorFormState[tenant._id]?.idNumber || ''}
                    onChange={(e) => handleVisitorFormChange(tenant._id, 'idNumber', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={visitorFormState[tenant._id]?.phoneNumber || ''}
                    onChange={(e) => handleVisitorFormChange(tenant._id, 'phoneNumber', e.target.value)}
                  />
                  <input
                    type="time"
                    placeholder="Arrival Time"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={visitorFormState[tenant._id]?.arrivalTime || ''}
                    onChange={(e) => handleVisitorFormChange(tenant._id, 'arrivalTime', e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => addVisitor(tenant._id)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Visitor
                  </button>
                  <button
                    onClick={() => clearVisitors(tenant._id)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
                  >
                    <Trash size={18} className="mr-2" />
                    Clear All
                  </button>
                </div>
              </div>
              {tenant.visitors && tenant.visitors.length > 0 ? (
                <div className="overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-2">Visitors ({tenant.visitors.length})</h3>
                  <div className="min-w-full overflow-hidden">
                    <table className="w-full border-collapse text-black">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="p-3 border-b">Name</th>
                          <th className="p-3 border-b">Car</th>
                          <th className="p-3 border-b">ID</th>
                          <th className="p-3 border-b">Arrival</th>
                          <th className="p-3 border-b">Departure</th>
                          <th className="p-3 border-b">Status</th>
                          <th className="p-3 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tenant.visitors.map((visitor, index) => (
                          <tr key={visitor._id || index} className="border-b hover:bg-gray-50">
                            <td className="p-3">{visitor.fullName}</td>
                            <td className="p-3">{visitor.carType}</td>
                            <td className="p-3">{visitor.idNumber}</td>
                            <td className="p-3">{visitor.arrivalTime}</td>
                            <td className="p-3">{visitor.departureTime || '-'}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${visitor.status === 'checked-in' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {visitor.status === 'checked-in' ? 'Active' : 'Checked out'}
                              </span>
                            </td>
                            <td className="p-3">
                              {visitor.status === 'checked-in' && (
                                <button 
                                  onClick={() => checkoutVisitor(tenant._id, visitor._id!)}
                                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                                >
                                  Checkout
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No visitors recorded for this tenant yet.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Visitors;