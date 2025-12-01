import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginPage from "./components/Users/LoginPage";
import RegisterPage from "./components/Users/RegisterPage";
import ClientNavbar from "./components/Navbar/ClientNavbar";
import FreelancerNavbar from "./components/Navbar/FreelancerNavbar";
import { useAuth } from "./Hooks/AuthContext";
import Home from "./components/Home/Home";
import ProtectRoute from "./components/Auth/ProtectRoute";
import CreateGig from "./components/Freelancer/CreateGig";
import ClientDashboard from "./components/Client/ClientDashboard";
import ClientGigPage from "./components/Client/ClientGigPage";
import FreelancerDashboard from "./components/Freelancer/FreelancerDashboard";
import ClientOrders from "./components/Client/ClientOrders";
import ClientReviewPage from "./components/Client/ClientReviewPage";
import FreelancerGigPage from "./components/Freelancer/FreelancerGigPage";
import GigUpdate from "./components/Freelancer/GigUpdate";
import FreelancerOrders from "./components/Freelancer/FreelancerOrders";
import ChatSection from "./components/Chat/ChatSection";
import socket from "./utils/socket";

function App() {

  const { isAuthenticated , userRole } = useAuth();
  if(isAuthenticated){
    socket.connect();
  }

  return (
    <BrowserRouter>
      { !isAuthenticated ? <PublicNavbar/> : userRole === "client" ? <ClientNavbar/> : <FreelancerNavbar/>  }
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/client/dashboard" element={ <ProtectRoute role="client"><ClientDashboard/></ProtectRoute> }/>
        <Route path="/client/gig/:gigId" element={ <ProtectRoute role="client"><ClientGigPage/></ProtectRoute> }/>
        <Route path="/client/orders" element={ <ProtectRoute role="client"><ClientOrders/></ProtectRoute> }/>
        <Route path="/client/review/:gigId" element={ <ProtectRoute role="client"><ClientReviewPage/></ProtectRoute> }/>

        <Route path="/chat/:roomId" element={ <ProtectRoute role="chat"><ChatSection/></ProtectRoute> }/>
        
        <Route path="/freelancer/dashboard" element={ <ProtectRoute role="freelancer"><FreelancerDashboard/></ProtectRoute> }/>
        <Route path="/freelancer/create-gig" element={ <ProtectRoute role="freelancer"><CreateGig/></ProtectRoute> }/>
        <Route path="/freelancer/gig/:gigId" element={ <ProtectRoute role="freelancer"><FreelancerGigPage/></ProtectRoute> }/>
        <Route path="/freelancer/update/:gigId" element={ <ProtectRoute role="freelancer"><GigUpdate/></ProtectRoute> }/>
        <Route path="/freelancer/orders" element={ <ProtectRoute role="freelancer"><FreelancerOrders/></ProtectRoute> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;