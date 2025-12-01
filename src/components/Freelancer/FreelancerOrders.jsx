import { freelancerOrdersAPI, updateOrderAPI } from "../../apis/Order/orderAPI";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { FaComments  } from 'react-icons/fa';
import { createRoomAPI } from "../../apis/Message/messageAPI";
import { useNavigate } from "react-router-dom";

const FreelancerOrders = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { data , isSuccess } = useQuery({
    queryFn : freelancerOrdersAPI ,
    queryKey : ["freelancerOrders"]
  });

  const { mutateAsync } = useMutation({
    mutationFn : updateOrderAPI ,
    mutationKey : ["updateStatus"]
  });

  const { mutateAsync : mutateRoomAsync } = useMutation({ mutationFn : createRoomAPI });

  const handleStatus = (orderId)=>{
    const status = document.getElementById(orderId).value;
    mutateAsync({ orderId , status }).then(()=>{
      queryClient.invalidateQueries(["freelancerOrders"]);
    });
  }

  const createRoomHandler = ( clientId )=> {
    mutateRoomAsync({ clientId }).then((data)=>{
      navigate(`/chat/${data.roomId}`, { state : { currentUser : data.currentUser}});
    });
  }

  let orders;
  let earnings = 0;
  if(isSuccess && data.length){
    data.forEach((order) => {
      earnings = earnings + order.price;
    });
    orders = (
      <section className="flex gap-y-3 p-5 flex-wrap gap-x-5">
        {data.map((order)=>{
          return (
            <section className="flex flex-col gap-y-3 p-4 border-[2px] border-gray-300 rounded-xl w-sm" key={order._id}>
              <h2>Client : <span className="text-red-500">{order.clientId.username.toUpperCase()}</span></h2>
              <h2>Category : <span className="text-violet-500">{order.category}</span></h2>
              <h2>Price : <span className="text-orange-500">{order.price}</span></h2>
              <div className="flex gap-x-2 items-center">
                <label htmlFor="status">Status : </label>
                <select onChange={()=>handleStatus(order._id)} id={order._id} className="p-1 rounded-md border-[1px] outline-none flex-1" defaultValue={order.status}>
                  {["Pending" , "In Progress" , "Delivered" , "Completed"].map((status)=>{
                    return ( <option key={status} value={status}>{status}</option> )
                  })}
                </select>
              </div>
              <button onClick={()=>createRoomHandler(order.clientId._id)} className="mt-2 bg-violet-900 text-white py-2 flex items-center justify-center gap-x-3 rounded-lg" style={{ fontFamily : "Rowdies" }}><FaComments/>CHAT</button>
            </section>
          )
        })}
      </section>
    )
  }

  return (
    <>
      <section className="mx-5 py-3 pl-10 rounded-md bg-blue-400 text-white bg-[linear-gradient(to_top_right,rgba(74,3,87,0.8),rgba(151,6,151,0.8),rgba(63,63,251,0.8),rgba(5,96,134,0.8))]">Earnings : ₹ {isSuccess && earnings}</section>
      { isSuccess && orders }
    </>
  )
}

export default FreelancerOrders;