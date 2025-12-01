import AlertMessage from '../Alert/AlertMessage';
import{ useParams } from "react-router-dom";
import { useQuery , useMutation } from "@tanstack/react-query";
import { getGigInfoAPI, updateGigAPI } from "../../apis/Gig/gigApi";
import { FaSyncAlt } from 'react-icons/fa'; 
import { useState , useEffect } from 'react';



const GigUpdate = () => {

  const {gigId} = useParams();

  const [formData,setData] = useState({
    title : "",
    category : "" ,
    price : "" ,
    description : "" ,
  });

  const { data , isSuccess , isPending , isError , error } = useQuery({ queryFn : ()=>getGigInfoAPI(gigId) , queryKey :["gigInfo",gigId] });


  const { mutateAsync , isSuccess : updateSuccess , isPending : updatePending , isError : isUpdateError , error : updateError  } = useMutation({
    mutationFn : updateGigAPI ,
    mutationKey : ["updateGig"]
  });


  const previewImage = ()=>{
    const preview = document.getElementById("image-preview");
    preview.innerHTML = "";
    const file = document.getElementById("image").files;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file[0]);
    preview.appendChild(img);
  }

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setData({
        title: data.title || "",
        category: data.category || "",
        price: data.price || "",
        description: data.description || "",
      });
    }
  }, [isSuccess, data]);

  const updateHandler = (e)=> {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData();
    formdata.append("title" , form.title.value);
    formdata.append("category", form.category.value);
    formdata.append("price", form.price.value);
    formdata.append("description", form.description.value);
    formdata.append("image", form.file.files[0]);
    formdata.append("gigId",gigId);
    mutateAsync(formdata).then((data)=>{
      console.log(data);
    });
  }


  let gigDetails;
  if(isSuccess){
    gigDetails = (
      <section className="p-4 rounded-md w-[90%] md:w-[50%] shadow-[-1px_1px_15px_rgb(41,162,233)] flex flex-col gap-y-5">
        <h2 className="text-center text-[20px]" style={{ fontFamily : "Rowdies" }}>UPDATE GIG</h2>

        {updatePending && <AlertMessage type="loading" message="Loading....." />}
        {isUpdateError && <AlertMessage type="error" message={updateError?.response?.data?.message} />}
        {updateSuccess && <AlertMessage type="success" message="Updated Successfully" />}

        <form className="flex flex-col gap-y-5" onSubmit={updateHandler}>

          <input type="text" value={formData.title} onChange={handleChange} placeholder="Title" name="title" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>

          <select onChange={handleChange} name="category" className="p-1 pl-3 rounded-md border-[2px] outline-none" value={formData.category}>
            <option value="" hidden disabled>Select</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Website Development">Website Development</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="SEO Services">SEO Services</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Voice Over">Voice Over</option>
          </select>
          
          <input onChange={handleChange} type="number" value={formData.price}  placeholder="Price" name="price" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          
          <input type="file" id="image" accept="image/*" onChange={()=>previewImage()} name="file" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>

          <div id="image-preview" className="w-[100%]">
            <img src={data.imageURL} alt="image" />
          </div>

          <textarea onChange={handleChange} name="description" value={formData.description} placeholder="Description" className="h-50 p-1 pl-3 rounded-md border-[2px] outline-none resize-none"></textarea>

          <button type="submit" style={{ fontFamily : "Rowdies" }} className='flex justify-center items-center gap-x-2 bg-blue-600 py-2 rounded-md text-white hover:bg-blue-400'><FaSyncAlt/>UPDATE</button>

        </form>
      </section>
    )
  }





  return (
    <section className="flex justify-center items-center p-2">
      { isSuccess && gigDetails }
    </section>
  )
}

export default GigUpdate;