import { FaSignInAlt , FaSlidersH  } from 'react-icons/fa';
import skillhiveLogo from "../../images/skillHive.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';


const PublicNavbar = () => {

  const [ openNav , setOpenNav ] = useState(false);
  const toggleNav = document.getElementById("toggle-nav");


  return (
    <>
      <header className="flex h-[80px] justify-between items-center px-3 z-2 fixed top-0 left-0 right-0 bg-white">

        <section className="flex items-center h-full mr-5 gap-x-3">
          <img src={skillhiveLogo} alt="Logo" className="h-[80%] rounded-full"/>
          <h1 style={{ fontFamily : "Caprasimo" }} className="text-3xl text-blue-400 cursor-pointer">SkillHive</h1>
        </section>

        <nav className="hidden md:flex items-center gap-x-7 ml-5">

          <Link to="/" className="px-2 hover:border-b-[3px] hover:border-orange-500 hover:rounded-bl-[5px] hover:rounded-br-[5px]">HOME</Link>

          <a href="#features" className="px-2 hover:border-b-[3px] hover:border-orange-500 hover:rounded-bl-[5px] hover:rounded-br-[5px]">FEATURES</a>

          <a href="#about" className="px-2 hover:border-b-[3px] hover:border-orange-500 hover:rounded-bl-[5px] hover:rounded-br-[5px]">ABOUT</a>

          <Link to="/login" className="flex items-center gap-x-2 bg-[linear-gradient(to_top_right,_rgb(144,_3,_168),_red)] text-white px-6 
          py-4 rounded-md hover:translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[-5px_5px_10px_rgba(0,0,0,0.7)] 
          transition-all duration-[150ms] ease-in-out"><FaSignInAlt/>LOGIN</Link>
        </nav>

        <button onClick={()=>setOpenNav(!openNav)} className="block md:hidden text-[brown] text-3xl border-[3px] border-[brown] rounded-full p-[10px]"><FaSlidersH/></button>

      </header>

      <nav id="toggle-nav" className={"block md:hidden fixed top-[80px] left-0 right-0 bg-white overflow-hidden z-1 transition-all duration-[300ms] ease"} style={{ maxHeight : openNav ? toggleNav.scrollHeight : 0 }}>
        <div className="flex flex-col px-[20px] gap-y-3 pb-[20px]">
          <a href="/" className="text-center py-2 text-black rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white">HOME</a>

          <a href="/#features" className="text-center py-2 rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white">FEATURES</a>

          <a href="/#about" className="text-center py-2 rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white">ABOUT</a>
          
          <Link to="/login" className="text-center py-2 rounded-md bg-[rgb(247,_137,_137)] hover:bg-zinc-900 hover:text-white">LOGIN</Link>
        </div>
      </nav>
    </>
  )
}

export default PublicNavbar;