import {Link} from "react-router-dom";
import { FaRocket , FaInfoCircle } from 'react-icons/fa';
import aboutIMG from"../../images/about.png";


const Home = () => {
  return (
    <>
      <section className="bg-[linear-gradient(to_top_right,rgba(74,3,87,0.8),rgba(151,6,151,0.8),rgba(63,63,251,0.8),rgba(5,96,134,0.8)),url('/hero-image.png')] bg-contain bg-center md:bg-right bg-no-repeat flex flex-col h-[65vh] px-15 gap-y-10 justify-center">
        <h1 style={{ fontFamily : "Caprasimo", fontWeight : 200 }} className="xl:text-6xl text-4xl xl:w-300">Find the perfect freelance talent <span style={{ fontFamily : "inherit" , fontWeight : "inherit" }} className="text-orange-400">for your project</span></h1>
        <h2 className="text-xl text-gray-300">Designers, Developers, Writers & more — all in one place</h2>
        <div className="flex gap-x-5 text-white">
          <Link to="/login"className="flex items-center gap-x-2 p-3 rounded-lg border-[2px] border-white"><FaRocket/>GET STARTED</Link>
          <a href="#features" className="flex items-center gap-x-2 p-3 rounded-lg border-[2px] border-white"><FaInfoCircle/>LEARN MORE</a>
        </div>
      </section>

      <section className="flex flex-col gap-y-8 p-10">
        <h2 className="text-center text-3xl" style={{ fontFamily : "Rowdies" }}>CATEGORIES</h2>
        <section className="flex flex-wrap justify-between gap-y-5">
          <div className="rounded-md px-5 py-3 bg-gray-100">🎨 Logo Design</div>
          <div className="rounded-md px-5 py-3 bg-gray-100">✍️ Content Writing</div>
          <div className="rounded-md px-5 py-3 bg-gray-100">💻 Web Dev</div>
          <div className="rounded-md px-5 py-3 bg-gray-100">📣 Social Media Marketing</div>
          <div className="rounded-md px-5 py-3 bg-gray-100">🎬 Video Editing</div>
          <div className="rounded-md px-5 py-3 bg-gray-100">📱 Mobile App Dev</div>
        </section>
      </section>

      <section id="features" className="flex flex-col gap-y-8 p-10">
        <h2 className="text-center text-3xl" style={{ fontFamily: "Rowdies" }}>FEATURES</h2>
        <section className="flex flex-wrap gap-8 justify-center">
          <div className="flex flex-col max-w-xs p-4 bg-white rounded-lg shadow-[-5px_5px_20px_rgb(177,243,244)] hover:shadow-[-5px_5px_10px_darkblue] hover:translate-x-[5px] hover:-translate-y-[5px] transition-all duration-[150ms] ease-in-out">
            <h2 className="text-xl mb-2 text-center text-blue-400">🛡️ Secure Payments</h2>
            <p className="text-blue-800">
              All transactions are protected using bank-level encryption.
              We hold payments in escrow until your project is complete.
              You only release funds when you're 100% satisfied.
            </p>
          </div>

          <div className="flex flex-col max-w-xs p-4 bg-white rounded-lg shadow-[-5px_5px_20px_rgb(177,243,244)] hover:shadow-[-5px_5px_10px_darkblue] hover:translate-x-[5px] hover:-translate-y-[5px] transition-all duration-[150ms] ease-in-out">
            <h2 className="text-xl mb-2 text-center text-blue-400">👩‍💼 Verified Freelancers</h2>
            <p className="text-blue-800">
              Every freelancer undergoes identity and skill verification.
              Browse trusted professionals with strong portfolios and reviews.
              Work confidently with vetted, reliable talent.
            </p>
          </div>

          <div className="flex flex-col max-w-xs p-4 bg-white rounded-lg shadow-[-5px_5px_20px_rgb(177,243,244)] hover:shadow-[-5px_5px_10px_darkblue] hover:translate-x-[5px] hover:-translate-y-[5px] transition-all duration-[150ms] ease-in-out">
            <h2 className="text-xl mb-2 text-center text-blue-400">💬 Real-time Chat</h2>
            <p className="text-blue-800">
              Stay connected through our built-in messaging system.
              Send files, share updates, and collaborate seamlessly.
              No third-party tools — everything happens in one place.
            </p>
          </div>

          <div className="flex flex-col max-w-xs p-4 bg-white rounded-lg shadow-[-5px_5px_20px_rgb(177,243,244)] hover:shadow-[-5px_5px_10px_darkblue] hover:translate-x-[5px] hover:-translate-y-[5px] transition-all duration-[150ms] ease-in-out">
            <h2 className="text-xl mb-2 text-center text-blue-400">🕐 Delivery on Time</h2>
            <p className="text-blue-800">
              Deadlines matter — and we help everyone stick to them.
              Track project milestones and receive real-time updates.
              Your work gets delivered when you expect it.
            </p>
          </div>
        </section>
      </section>

      <section id="about" className="bg-[linear-gradient(to_top_right,rgba(74,3,87,0.8),rgba(151,6,151,0.8),rgba(63,63,251,0.8),rgba(5,96,134,0.8)),url('/about.png')] bg-cover bg-center bg-no-repeat flex flex-col gap-y-8 p-10 text-white">
        <h2 className="text-center text-3xl" style={{ fontFamily: "Rowdies" }}>ABOUT</h2>
        <div className="flex gap-x-10">
          <img src={aboutIMG} alt="aboutIMG" className="w-200 h-64 rounded-lg hidden xl:block"/>
          Welcome to SkillHive, a vibrant digital marketplace where creativity meets opportunity. We are driven by a mission to connect 
          businesses with top-tier freelance talent from around the world — seamlessly, securely, and smartly. Whether you're an 
          entrepreneur launching your dream project or a freelancer looking to showcase your skills, SkillHive provides the tools and 
          trust needed to collaborate with confidence. At SkillHive, we believe freelancing should be simple, efficient, and rewarding. 
          That's why we've built a platform where every professional is verified, every transaction is secure, and every conversation is 
          effortless. From real-time chat and project tracking to guaranteed delivery timelines, we ensure a smooth experience from 
          the first message to the final handoff. Our community thrives on trust, talent, and the shared passion for getting things done 
          — the right way. Join us and be part of a growing network that values transparency, creativity, and mutual success. 
          Whether you're hiring or getting hired, your journey starts here.
        </div>
      </section>

      <footer className="flex justify-between px-5 mt-10 py-5 bg-gray-700 text-white text-[10px]">
        <h5>© 2025 SkillHive. All rights reserved</h5>
        <h5>Designed & Developed by Amal George</h5>
      </footer>
    </>
  )
}

export default Home;