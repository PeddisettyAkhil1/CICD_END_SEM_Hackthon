import { FaRegCommentDots } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import { clientOrders } from "../../apis/Order/orderAPI";
import { Link } from 'react-router-dom';

const ClientOrders = () => {

  const { data , isSuccess } = useQuery({ queryFn : clientOrders , queryKey : ["clientOrders"] });

  let orders;
  if(isSuccess){
    orders = (
      <section className="flex gap-x-10 gap-y-10 flex-wrap p-7">
        { data.map((order)=>{
          return (
            <section key={order._id} className="flex w-sm flex-col gap-y-2 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] p-4 rounded-xl">
              <h2>{order.title}</h2>
              <h2>{order.category}</h2>
              <h2>₹ {order.price}</h2>
              <h2>Status : <span className="text-green-400">{order.status}</span></h2>
              <Link to={`/client/review/${order.gigId?._id}`} className="flex items-center gap-x-2 justify-center bg-violet-500 text-white p-2 rounded-md hover:bg-violet-400" style={{ fontFamily : "Rowdies" }} type="button"><FaRegCommentDots/>ADD A REVIEW</Link>
            </section>
          )
        }) }
      </section>
    )
  }

  return (
    <>
      {isSuccess && orders}
    </>
  );
}

export default ClientOrders;