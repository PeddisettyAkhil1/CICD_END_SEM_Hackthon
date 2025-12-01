import { useQuery } from "@tanstack/react-query";
import { filterGigsAPI } from "../../apis/Gig/gigApi";
import { FaEye , FaComments } from 'react-icons/fa';  
import { Link } from "react-router-dom";
import { useState } from "react";
import { clientRoomsAPI } from "../../apis/Message/messageAPI";
import { getUserInfo } from "../../apis/User/userApi";



const ClientRooms = ()=>{
  let rooms;
  const { data , isSuccess } = useQuery({ queryFn : clientRoomsAPI , queryKey : ["clientRooms"] });
  if(isSuccess){
    rooms = (
      <section className="flex flex-col md:flex-row gap-5">
        {data.map((room)=>{
          return (
            <div className="flex gap-x-5" key={room._id}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className="w-15 h-15 object-cover"/>
              <div className="flex flex-col gap-y-2 text-gray-500">
                <h2>{room.freelancerId.username}</h2>
                <div className="flex gap-x-5">
                  <div>{room.freelancerId.email}</div>
                  <Link to={`/chat/${room._id}`} state={{ currentUser : room.clientId._id }} className="flex items-center justify-center gap-x-2 text-orange-700"><FaComments/>CHAT</Link>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    )
  }
  return <>{ isSuccess && rooms }</>
}



const ClientDashboard = () => {

  const [ filter , setFilter ] = useState({ category : "Website Development" , price : "" });

  const { data , isSuccess } = useQuery({
    queryFn : ()=>filterGigsAPI(filter) ,
    queryKey : ["filteredGigs" , filter]
  });

  const { data : userData , isSuccess : userDataSuccess } = useQuery({
    queryFn : getUserInfo ,
    queryKey : ["userInfo"]
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  let content;
  if(isSuccess){
    content =  (
      <section className="p-5 flex  gap-x-8 flex-wrap gap-y-8">
        { data.map((gig)=>{
          return (
            <div className="flex flex-col gap-y-3 rounded-md shadow-[-2px_2px_10px_rgba(0,0,0,0.5)] w-md p-5" key={gig._id}>
              <img src={gig.imageURL} alt="image" className="h-60 rounded-md object-cover"/>
              <div className="flex flex-col gap-y-3">
                <h1 className="break-words">{gig.title}</h1>
                <div className="flex justify-between">
                  <h2 className="flex gap-x-5">₹ {gig.price} <span>⭐{gig.rating} ({ gig.totalOrders })</span></h2>
                  <Link to={`/client/gig/${gig._id}`} style={{ fontFamily : "Rowdies" }} className="text-sm text-violet-900 border-[2px] py-1 px-4 rounded-md 
                  hover:bg-violet-900 hover:text-white flex items-center gap-x-2"><FaEye/>VIEW</Link>
                </div>
              </div>
            </div>
          )
        }) }
      </section>
    )
  }

  return (
    <>
      <section className="bg-[url('/client-bg-pic.png')] bg-center bg-cover bg-no-repeat px-10 pt-25 h-[500px] w-full flex flex-col gap-y-10">
        {userDataSuccess && <h1 style={{ fontFamily : "Caprasimo" }} className="text-2xl w-full text-white bg-black text-center py-2 border-[5px] border-orange-400 rounded-lg">Welcome {userData.username} ! {userData.email}</h1>}
        <h1 style={{ fontFamily : "Caprasimo" }} className="text-2xl md:w-5xl md:text-5xl w-full text-white">Find the perfect freelance services for your business</h1>
        <div className="flex gap-x-5 md:flex-row flex-col gap-y-4">
          <select name="category" className="bg-white p-3 rounded-md outline-none w-full" defaultValue={filter.category} onChange={handleFilterChange}>
            <option value="Logo Design">Logo Design</option>
            <option value="Website Development">Website Development</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Mobile App Development">Mobile App Development</option>
          </select>
          <input type="number" name="price" value={filter.price} onChange={handleFilterChange} placeholder="Price upto....." className="bg-white p-3 rounded-md outline-none w-full"/>
        </div>
      </section>
      { isSuccess && content }
      <section className="flex m-5 flex-col gap-y-5 shadow-[-2px_2px_10px_rgba(0,0,0,0.5)] p-5 rounded-md flex-1">
        <h2 style={{ fontFamily : "Rowdies" }} className="flex justify-between">CHATS</h2>
        <ClientRooms/>
      </section>
    </>
  )
}

export default ClientDashboard;