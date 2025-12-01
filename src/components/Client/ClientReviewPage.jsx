import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane } from 'react-icons/fa'; 
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { reviewOfGigAPI } from "../../apis/Order/orderAPI";
import AlertMessage from "../Alert/AlertMessage";


const validationSchema = Yup.object({
  rating : Yup.number().required("Rating is required").max(5).min(1) ,
  comment : Yup.string().required("Comment a review")
});

const ClientReviewPage = () => {

  const { gigId } = useParams();

  const { isSuccess , error , isError , isPending , mutateAsync } = useMutation({ mutationFn : reviewOfGigAPI , mutationKey : ["review"] });

  const formik = useFormik({
    initialValues : {
      rating : "" ,
      comment : ""
    } ,
    validationSchema : validationSchema ,
    onSubmit : (values , actions)=>{
      mutateAsync({ gigId , rating : values.rating , comment : values.comment }).then(()=>{
        actions.resetForm();
      });
    }
  });    

  return (
    <section className="h-[88vh] flex justify-center items-center px-10">
      <section className="w-lg p-6 flex flex-col gap-y-3 rounded-[10px] shadow-[-1px_1px_10px_orange] ">
        <h2 className="text-center text-[20px] pb" style={{ fontFamily : "Rowdies" }}>REVIEW</h2>

        {isPending && <AlertMessage type="loading" message="Loading....." />}
        {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
        {isSuccess && <AlertMessage type="success" message="Review Added" />}

        <form className="flex flex-col gap-y-3" onSubmit={formik.handleSubmit}>
          <input type="number" { ...formik.getFieldProps("rating") } placeholder="Rating" name="rating" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.rating && formik.errors.rating && (<span className="text-xs text-red-500">{formik.errors.rating}</span>)}
          <textarea { ...formik.getFieldProps("comment") } placeholder="Review" name="comment" className="p-1 pl-3 rounded-md border-[2px] outline-none resize-none h-40"></textarea>
          {formik.touched.comment && formik.errors.comment && (<span className="text-xs text-red-500">{formik.errors.comment}</span>)}
          <button style={{ fontFamily : "Rowdies" }} className="bg-orange-500 text-white flex items-center justify-center gap-x-3 py-1 rounded-md hover:bg-orange-400" type="submit"><FaPaperPlane/>SUBMIT</button>
        </form>
      </section>
    </section>
  )
}

export default ClientReviewPage;