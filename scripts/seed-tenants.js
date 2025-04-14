import dbConnect from '../lib/dbConnect';
import Tenant from '../models/Tenant';


const tenants = [
  {
    businessName: "Bloom & Grow",
    ownerName: "Terry Mutheu",
    businessType: "Flower Shop",
    car: "Toyota Corolla",
    numberPlate: "FL-5678",
    imageUrl: "/Images/flowershop.jpg",
    floor: "First Floor"
  },
  {
    businessName: "Chic Boutique",
    ownerName: "Michael Otieno",
    businessType: "Boutique",
    car: "Honda Civic",
    numberPlate: "BQ-1234",
    imageUrl: "/Images/botique.jpg",
    floor: "First Floor"
  },
  {
    businessName: "Fresh Bites",
    ownerName: "Susan Kamau",
    businessType: "Bakery",
    car: "Nissan Sentra",
    numberPlate: "BK-7890",
    imageUrl: "/Images/bakery.jpg",
    floor: "First Floor"
  },
  {
    businessName: "Sharp Cuts",
    ownerName: "Medan Wilson",
    businessType: "Barber Shop",
    car: "Mazda 3",
    numberPlate: "BS-9012",
    imageUrl: "/Images/barbershop.jpg",
    floor: "Second Floor"
  },
  {
    businessName: "Tech Haven",
    ownerName: "James Omondi",
    businessType: "Electronics Store",
    car: "Subaru Outback",
    numberPlate: "TE-3456",
    imageUrl: "/Images/electronics.jpg",
    floor: "Second Floor"
  },
  {
    businessName: "Coffee Corner",
    ownerName: "Diana Njeri",
    businessType: "Café",
    car: "Hyundai Tucson",
    numberPlate: "CC-5678",
    imageUrl: "/images/cafe.jpg",
    floor: "Second Floor"
  }
];

async function seedTenants() {
  try {
    await dbConnect();
    console.log('Connected to database');
        const count = await Tenant.countDocuments();
    
    if (count > 0) {
      console.log(`Database already contains ${count} tenants. Skipping seed.`);
      process.exit(0);
    }
        await Tenant.insertMany(tenants);
    console.log(`Successfully added ${tenants.length} tenants`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedTenants();