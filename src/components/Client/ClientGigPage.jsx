import { useParams , useNavigate } from "react-router-dom";
import { FaPhoneAlt , FaShoppingCart , FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useQuery , useMutation } from "@tanstack/react-query";
import { clientFetchGigAPI, gigReviewsAPI } from "../../apis/Gig/gigApi";
import { createOrderAPI } from "../../apis/Order/orderAPI";
import AlertMessage from "../Alert/AlertMessage";
import { createRoomAPI } from "../../apis/Message/messageAPI";


const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return <div className="flex gap-x-2 items-center">{stars} {rating}</div>;
};


const ClientGigPage = () => {

  const { gigId } = useParams();
  const navigate = useNavigate();

  const { data , isSuccess } = useQuery({ 
    queryFn : ()=>clientFetchGigAPI(gigId) , 
    queryKey : ["clientFetchGig" , gigId] 
  });

  const { data : reviewsData , isSuccess : reviewFetchSuccess } = useQuery({ queryFn : ()=>gigReviewsAPI(gigId) , queryKey : ["fetchReviews", gigId] }); 

  const { isSuccess : orderSuccess , mutate , isError , error , isPending  } = useMutation({ mutationFn : createOrderAPI , mutationKey : ["createOrder"] });

  const orderHandler = (gigId , freelancerId)=>{
    mutate({ gigId , freelancerId });
  }

  const { mutateAsync } = useMutation({ mutationFn : createRoomAPI });

  const createRoomHandler = ( freelancerId )=> {
    mutateAsync({ freelancerId }).then((data)=>{
      navigate(`/chat/${data.roomId}`, { state : { currentUser : data.currentUser}});
    });
  }

  let gigInfo;
  if(isSuccess){
    gigInfo = (
      <section className="flex flex-col md:flex-row justify-between gap-y-5 gap-x-10 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] p-4 rounded-xl">

        <div className="w-full md:w-[40%] flex flex-col gap-y-2">
          <img src={data.imageURL} alt="image" className="h-60 rounded-md object-cover w-full"/>
          <h2>{data.freelancerId.username} ({data.freelancerId.role})</h2>
          <h2>₹ {data.price} <span>⭐{data.rating} ({ data.totalOrders })</span></h2>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <h1 className="text-2xl break-words text-red-500" style={{ fontFamily : "Rowdies" }}>{data.title.toUpperCase()}</h1>
          <h5>{data.category}</h5>
          <h3 className="break-words text-gray-600">{data.description}</h3>
          <button onClick={()=>createRoomHandler(data.freelancerId._id)} className="bg-violet-900 text-white py-2 flex items-center justify-center gap-x-3 rounded-lg" style={{ fontFamily : "Rowdies" }}><FaPhoneAlt/>CONTACT ME</button>

          {isPending && <AlertMessage type="loading" message="Loading....." />}
          {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
          {orderSuccess && <AlertMessage type="success" message="Order Success" />}

          <button onClick={()=>orderHandler(data._id , data.freelancerId._id)} type="button" className="text-white rounded-lg bg-yellow-500 py-2 flex items-center justify-center gap-x-3" style={{ fontFamily : "Rowdies" }}><FaShoppingCart/>ORDER NOW</button>
        </div>

      </section>
    )
  }

  let reviews;
  if(reviewFetchSuccess && reviewsData.length){
    reviews = (
      <section className="flex flex-col gap-y-4 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] p-4 rounded-xl">
        <h2 className="text-center text-2xl" style={{ fontFamily : "Rowdies" }}>REVIEWS</h2>
        <section className="flex flex-col gap-y-10">

          {reviewsData.map((review)=>{
            return (
              <div className="flex gap-x-3" key={review._id}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile-image" className="w-[40px] h-10 object-cover"/>
                <div>
                  <h2>{review.reviewerId.username} - <span>{new Date(review.createdAt).toLocaleDateString()}</span></h2>
                  <StarRating rating={review.rating}/>
                  <p className="break-words">{review.comment}</p>
                </div>
              </div>
            )
          })}

        </section>
      </section>
    )
  }

  return (
    <section className="flex gap-y-8 flex-col p-7">
      { isSuccess && gigInfo }
      { reviewFetchSuccess && reviews }
    </section>
  )
}

export default ClientGigPage;