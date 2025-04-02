import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import TenantDisplay from "./Tenants";

export default function Home() {
  return (
  <main > 
     <Navbar/>
     <Login/>
     <Signup/>
     <TenantDisplay/>
    </main>
  );
}