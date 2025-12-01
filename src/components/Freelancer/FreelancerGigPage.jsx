import { Link , useParams , useNavigate } from "react-router-dom";
import { FaSyncAlt , FaTrash , FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useQuery , useMutation } from "@tanstack/react-query";
import { deleteGigAPI, freelancerFetchGigAPI, gigReviewsAPI } from "../../apis/Gig/gigApi";



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


const FreelancerGigPage = () => {

  const { gigId } = useParams();
  const navigate = useNavigate();

  const { data , isSuccess } = useQuery({
    queryFn : ()=>freelancerFetchGigAPI(gigId) , 
    queryKey : ["freelancerFetchGig",gigId] 
  });

  const { data : reviewsData , isSuccess : reviewFetchSuccess } = useQuery({ 
    queryFn : ()=>gigReviewsAPI(gigId) , 
    queryKey : ["fetchReviews", gigId] 
  }); 

  const { mutateAsync } = useMutation({
    mutationFn : deleteGigAPI ,
    mutationKey : ["deleteGig"]
  });

  const deleteHandler = (gigId)=> {
    mutateAsync({ gigId }).then(()=>{
      navigate("/freelancer/dashboard");
    });
  }

  let gigInfo;
  if(isSuccess){
    gigInfo = (
      <section className="flex flex-col w-full gap-y-5 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] p-4 rounded-xl">

        <img src={data.imageURL} alt="image" className="h-64 rounded-md object-cover w-full"/>
        <div className="flex gap-x-5">
          <div>
            <h1 className="text-md text-violet-800">{data.title.toUpperCase()}</h1>
            <h5>{data.category}</h5>
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="flex self-end">₹ {data.price}</h2>
            <h2 className="flex gap-x-3"><StarRating rating={data.rating}/> ({data.totalOrders})</h2>
          </div>
        </div>

        <div className="flex justify-end gap-x-10">
          <Link to={`/freelancer/update/${data._id}`} style={{ fontFamily : "Rowdies" }} className="text-white p-[8px] bg-green-500 rounded-lg flex items-center gap-x-2"><FaSyncAlt/>UPDATE</Link>
          <button onClick={()=>deleteHandler(data._id)} type="button" style={{ fontFamily : "Rowdies" }} className="text-white p-[8px] bg-red-500 rounded-lg flex items-center gap-x-2"><FaTrash/>DELETE</button>
        </div>

        <div className="flex flex-col gap-y-2">
          <h1>DESCRIPTION</h1>
          <h3 className="break-words text-gray-600">{data.description}</h3>
        </div>
      </section>
    )
  }


  let reviews;
  if(reviewFetchSuccess && reviewsData.length){
    reviews = (
      <section className="flex flex-col gap-y-4 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] p-4 rounded-xl w-full">
        <h2 className="text-center text-xl" style={{ fontFamily : "Rowdies" }}>REVIEWS</h2>
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
    <section className="flex md:flex-row flex-col p-2 gap-5 justify-center">
      { isSuccess && gigInfo }
      { reviewFetchSuccess && reviews }
    </section>
  )
}

export default FreelancerGigPage;