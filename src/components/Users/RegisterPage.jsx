import { Link } from "react-router-dom";
import { FaPenFancy , FaEye } from 'react-icons/fa';
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../apis/User/userApi";
import AlertMessage from "../Alert/AlertMessage";


const emailRegularExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;



const validationSchema = Yup.object({
  username : Yup.string().required("Username is required") ,
  email : Yup.string().email("Invalid Email").required("Email is required").matches(emailRegularExp , "Only gmail addresses are allowed") ,
  role : Yup.string().required("Role is required") ,
  password : Yup.string().min(6,"Password must be at least 6 characters long").required("Password is required") 
});


const RegisterPage = () => {

  const [ openEye , setOpenEye ] = useState(false);

  const { mutateAsync , isSuccess , isPending , isError , error } = useMutation({ mutationFn : registerAPI });

  const formik = useFormik({
    initialValues : {
      username : "" ,
      email : "" ,
      role : "" ,
      password : "" ,
    } ,
    validationSchema : validationSchema ,
    onSubmit : ( values , actions )=>{
      mutateAsync(values).then(()=>{
        actions.resetForm();
      }).catch((e)=>console.log(e));
    }
  });

  return (
    <section className="h-[88vh] flex justify-center items-center px-10">
      <section className="w-lg p-6 flex flex-col gap-y-3 rounded-[10px] shadow-[-1px_1px_10px_rgb(11,140,127)]">

        <h2 className="text-center text-[20px] pb" style={{ fontFamily : "Rowdies" }}>REGISTER</h2>

        {isPending && <AlertMessage type="loading" message="Loading....." />}
        {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
        {isSuccess && <AlertMessage type="success" message="Registeration Success" />}

        <form className="flex flex-col gap-y-5" onSubmit={formik.handleSubmit}>

          <input type="text" { ...formik.getFieldProps("username") } name="username" placeholder="Enter username" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.username && formik.errors.username && (<span className="text-xs text-red-500">{formik.errors.username}</span>)}

          <input type="email" { ...formik.getFieldProps("email") } name="email" placeholder="Enter email" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.email && formik.errors.email && (<span className="text-xs text-red-500">{formik.errors.email}</span>)}

          <select name="role" { ...formik.getFieldProps("role") } className="p-1 pl-3 rounded-md border-[2px] outline-none">
            <option hidden disabled value="">Select</option>
            <option value="client">Client</option>
            <option value="freelancer">Free Lancer</option>
          </select>
          {formik.touched.role && formik.errors.role && (<span className="text-xs text-red-500">{formik.errors.role}</span>)}

          <div className="flex relative">
            <FaEye className="absolute right-3 translate-y-[50%] text-[18px]" onClick={()=>setOpenEye(!openEye)}/>
            <input type={ openEye ? "text" : "password" } { ...formik.getFieldProps("password") } name="password" placeholder="Enter password" className="p-1 pl-3 rounded-md border-[2px] outline-none flex-1"/>
          </div>
          {formik.touched.password && formik.errors.password && (<span className="text-xs text-red-500">{formik.errors.password}</span>)}

          <button type="submit" className="p-[5px] bg-[rgba(12,152,138,1)] flex items-center justify-center text-white gap-x-2 
          rounded-md hover:bg-[rgba(11,140,127,0.8)]" style={{ fontFamily : "Rowdies" }}><FaPenFancy/>REGISTER</button>

          <div className="p-2 text-center rounded-[5px] bg-[rgb(242,_241,_241)]">Already have an account? <Link to="/login" className="text-[rgb(118,_4,_138)] hover:text-blue-700">Login</Link></div>

        </form>

      </section>
    </section>
  )
}

export default RegisterPage;