import { Link } from "react-router-dom";
import { FaEye , FaComments } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import { fetchAllGigsAPI } from "../../apis/Gig/gigApi";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { freelancerRoomsAPI } from "../../apis/Message/messageAPI";
import { getUserInfo } from "../../apis/User/userApi";



const MyGigs = ()=> {
  let content;
  const { data , isSuccess } = useQuery({ queryFn : fetchAllGigsAPI , queryKey : ["fetchGigs"] });
  if(isSuccess){
    content =  (
      <section className="flex gap-5 flex-wrap justify-center">
        {data.map((gig)=>{
          return (
            <div className="flex flex-col w-85 gap-y-3 rounded-md shadow-[-2px_2px_10px_rgba(0,0,0,0.5)] p-3" key={gig._id}>
              <img src={gig.imageURL} alt="image" className="h-50 rounded-md object-cover"/>
              <h1 className="break-words">{gig.title}</h1>
              <h2 className="flex gap-x-5">₹ {gig.price} <span>⭐{gig.rating} ({gig.totalOrders})</span></h2>
              <Link to={`/freelancer/gig/${gig._id}`} style={{ fontFamily : "Rowdies" }} className="bg-violet-900 text-white text-sm py-1 rounded-md 
              hover:bg-violet-800 flex items-center justify-center gap-x-2"><FaEye/>VIEW</Link>
            </div>
          )
        })}
      </section>
    )
  }
  return <>{ isSuccess && content }</>;
}

const FreeLancerRooms = ()=>{
  let rooms;
  const { data , isSuccess } = useQuery({ queryFn : freelancerRoomsAPI , queryKey : ["freelancerRooms"] });
  if(isSuccess){
    rooms = (
      <section className="flex flex-col md:flex-row gap-5">
        {data.map((room)=>{
          return (
            <div className="flex gap-x-5" key={room._id}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className="w-15 h-15 object-cover"/>
              <div className="flex flex-col gap-y-2 text-gray-500">
                <h2>{room.clientId.username}</h2>
                <div className="flex gap-x-5">
                  <div>{room.clientId.email}</div>
                  <Link to={`/chat/${room._id}`} state={{ currentUser : room.freelancerId._id }} className="flex items-center justify-center gap-x-2 text-orange-700"><FaComments/>CHAT</Link>
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


const FreelancerDashboard = () => {

  const { data : userData , isSuccess : userDataSuccess } = useQuery({
    queryFn : getUserInfo ,
    queryKey : ["userInfo"]
  });

  return (
    <>
    <section className="flex flex-col gap-y-5 m-5">
      {userDataSuccess && <h1 style={{ fontFamily : "Caprasimo" }} className="text-2xl w-full text-white bg-black text-center py-2 border-[5px] border-orange-400 rounded-lg">Welcome {userData.username} ! {userData.email}</h1>}
      <section className="flex flex-col gap-y-5 shadow-[-2px_2px_10px_rgba(0,0,0,0.5)] p-5 rounded-md">
        <h1 className="flex justify-between">
          <div style={{ fontFamily : "Rowdies" }}>GIGS</div>
          <Link to="/freelancer/create-gig" className="flex justify-center items-center bg-red-600 gap-x-2 text-white px-3 py-1 rounded-md"><AiOutlinePlusCircle/>CREATE</Link>
        </h1>
        <MyGigs/>
      </section>
      <section className="flex flex-col gap-y-5 shadow-[-2px_2px_10px_rgba(0,0,0,0.5)] p-5 rounded-md flex-1">
        <h2 style={{ fontFamily : "Rowdies" }} className="flex justify-between">CHATS</h2>
        <FreeLancerRooms/>
      </section>
    </section>
    </>
  );
}

export default FreelancerDashboard;