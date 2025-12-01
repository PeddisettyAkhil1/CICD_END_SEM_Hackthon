import { useState } from "react";
import skillhiveLogo from "../../images/skillHive.png";
import { FaPowerOff , FaSlidersH  } from 'react-icons/fa';
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../apis/User/userApi";
import { useAuth } from "../../Hooks/AuthContext";
import socket from "../../utils/socket";

const ClientNavbar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [ openNav , setOpenNav ] = useState(false);
  const toggleNav = document.getElementById("toggle-nav");

  const { mutate } = useMutation({ mutationFn : logoutAPI });

  const logoutHandler = ()=>{
    mutate();
    logout();
    socket.disconnect();
    navigate("/login");
  }

  return (
    <>
      <header className="flex h-[80px] justify-between items-center px-3 z-2 fixed top-0 left-0 right-0 bg-white">

        <section className="flex items-center h-full mr-5 gap-x-3">
          <img src={skillhiveLogo} alt="Logo" className="h-[80%] rounded-full"/>
          <h1 style={{ fontFamily : "Caprasimo" }} className="text-3xl text-blue-400 cursor-pointer">SkillHive</h1>
        </section>

        <nav className="hidden md:flex items-center gap-x-7 ml-5">

          <Link to="/client/dashboard" className="px-2 hover:border-b-[3px] hover:border-green-500 hover:rounded-bl-[5px] hover:rounded-br-[5px]" 
          style={{ fontFamily : "Rowdies" }}>DASHBOARD</Link>

          <Link to="/client/orders" className="px-2 hover:border-b-[3px] hover:border-green-500 hover:rounded-bl-[5px] hover:rounded-br-[5px]"
          style={{ fontFamily : "Rowdies" }}>ORDERS</Link>

          <button onClick={logoutHandler} className="flex gap-x-2 bg-[linear-gradient(to_top_right,_rgb(144,_3,_168),_red)] text-white px-[25px] 
          py-[15px] rounded-[5px] hover:translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[-5px_5px_10px_rgba(0,0,0,0.7)] 
          transition-all duration-[150ms] ease-in-out" style={{ fontFamily : "Rowdies" }}><FaPowerOff className="translate-y-[2px] text-[18px]"/>LOGOUT</button>

        </nav>

        <button onClick={()=>setOpenNav(!openNav)} className="block md:hidden text-[brown] text-3xl border-[3px] border-[brown] rounded-full p-[10px]"><FaSlidersH/></button>

      </header>

      <nav id="toggle-nav" className={"block md:hidden fixed top-[80px] left-0 right-0 bg-white overflow-hidden z-1 transition-all duration-[300ms] ease"} style={{ maxHeight : openNav ? toggleNav.scrollHeight : 0 }}>
        <div className="flex flex-col px-[20px] gap-y-3 pb-[20px]">
          <Link to="/client/dashboard" className="text-center py-2 text-black rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white"
          style={{ fontFamily : "Rowdies" }}>DASHBOARD</Link>

          <Link to="/client/orders" className="text-center py-2 rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white"
          style={{ fontFamily : "Rowdies" }}>ORDERS</Link>
          
          <button onClick={logoutHandler} className="text-center py-2 rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white"
          style={{ fontFamily : "Rowdies" }}>LOGOUT</button>
        </div>
      </nav>
    </>
  )
}

export default ClientNavbar;