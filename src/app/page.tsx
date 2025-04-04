import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import TenantDisplay from "./Tenants";
import Visitors from "./Visitors";
import LandingPage from "./Home";

export default function Home() {
  return (
  <main > 
     <Navbar/>
     <LandingPage/>
     <Login/>
     <Signup/>
     <TenantDisplay/>
     <Visitors/>
    </main>
  );
}