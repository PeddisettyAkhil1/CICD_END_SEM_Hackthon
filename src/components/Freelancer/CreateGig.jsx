import { MdCreate } from 'react-icons/md';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createGigAPI } from '../../apis/Gig/gigApi';
import AlertMessage from '../Alert/AlertMessage';



const validationSchema = Yup.object({
  title : Yup.string().required("Title is required") ,
  category : Yup.string().required("Category is required") ,
  price : Yup.number().required("Price is required") ,
  file : Yup.mixed().required("Image is required").test("fileType", "Only image files are allowed", (value) => {
    return value && value.type && value.type.startsWith("image/")
  }) ,
  description : Yup.string().required("Description is required")
});





const CreateGig = () => {

  const { mutateAsync , isPending , isError , error , isSuccess } = useMutation({ mutationFn : createGigAPI , mutationKey : ["createGig"] });

  

  const formik = useFormik({
    initialValues : {
      title : "" ,
      category : "" ,
      price : "" ,
      file : "" ,
      description : ""
    } ,
    validationSchema : validationSchema ,
    onSubmit : ( values , action )=> {
      const formdata = new FormData();
      formdata.append("title" , values.title);
      formdata.append("category", values.category);
      formdata.append("price", values.price);
      formdata.append("description", values.description);
      formdata.append("image", values.file);

      mutateAsync(formdata).then(()=>{
        action.resetForm();
      });
    }
  });

  const previewImage = ()=>{
    const preview = document.getElementById("image-preview");
    preview.innerHTML = "";
    const file = document.getElementById("image").files;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file[0]);
    preview.appendChild(img);
  }

  return (
    <section className="flex justify-center items-center p-2">
      <section className="p-4 rounded-md w-[90%] md:w-[50%] shadow-[-1px_1px_15px_rgb(41,162,233)] flex flex-col gap-y-5">
        <h2 className="text-center text-[20px]" style={{ fontFamily : "Rowdies" }}>CREATE GIG</h2>

        {isPending && <AlertMessage type="loading" message="Loading....." />}
        {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
        {isSuccess && <AlertMessage type="success" message="Gig created successfully" />}

        <form className="flex flex-col gap-y-5" onSubmit={formik.handleSubmit}>

          <input type="text" { ...formik.getFieldProps("title") } placeholder="Title" name="title" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.title && formik.errors.title && (<span className="text-xs text-red-500">{formik.errors.title}</span>)}

          <select { ...formik.getFieldProps("category") } name="category" className="p-1 pl-3 rounded-md border-[2px] outline-none">
            <option value="" hidden disabled>Select</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Website Development">Website Development</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Mobile App Development">Mobile App Development</option>
          </select>
          {formik.touched.category && formik.errors.category && (<span className="text-xs text-red-500">{formik.errors.category}</span>)}
          
          <input type="number" { ...formik.getFieldProps("price") } placeholder="Price" name="price" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.price && formik.errors.price && (<span className="text-xs text-red-500">{formik.errors.price}</span>)}
          
          <input type="file" id="image" accept="image/*" onChange={(event)=>{
            formik.setFieldValue("file" , event.currentTarget.files[0]);
            previewImage();
          }} name="file" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.file && formik.errors.file && (<span className="text-xs text-red-500">{formik.errors.file}</span>)}

          <div id="image-preview" className="w-[100%]"></div>

          <textarea name="description" { ...formik.getFieldProps("description") } placeholder="Description" className="h-50 p-1 pl-3 rounded-md border-[2px] outline-none resize-none"></textarea>
          {formik.touched.description && formik.errors.description && (<span className="text-xs text-red-500">{formik.errors.description}</span>)}

          <button type="submit" style={{ fontFamily : "Rowdies" }} className='flex justify-center items-center gap-x-2 bg-blue-600 py-2 rounded-md text-white hover:bg-blue-400'><MdCreate/>CREATE</button>

        </form>
      </section>
    </section>
  )
}

export default CreateGig;