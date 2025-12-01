import { Link } from "react-router-dom";
import { FaSignInAlt } from 'react-icons/fa';
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { loginAPI } from "../../apis/User/userApi";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import { useAuth } from "../../Hooks/AuthContext";
import { useEffect } from "react";
import socket from "../../utils/socket";


const emailRegularExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const validationSchema = Yup.object({
  email : Yup.string().email("Invalid Email").required("Email is required").matches(emailRegularExp , "Only gmail addresses are allowed") ,
  password : Yup.string().min(6,"Password must be at least 6 characters long").required("Password is required")
});


const LoginPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated , login , isError : isSessionExpiredError , error : sessionError , userRole } = useAuth();

  useEffect(()=>{
    if( isAuthenticated && userRole === "client" ){
      navigate("/client/dashboard");
    }else if( isAuthenticated && userRole === "freelancer" ){
      navigate("/freelancer/dashboard");
    }
  } , [ isAuthenticated , userRole ]);

  const { mutateAsync , data , isPending , isError , error , isSuccess } = useMutation({ mutationFn : loginAPI , mutationKey : ["login"] });

  const formik = useFormik({
    initialValues : {
      email : "" ,
      password : ""
    } ,
    validationSchema : validationSchema ,
    onSubmit : ( values )=>{
      mutateAsync(values).then((data)=>{
        socket.connect();
        if(data?.role === "client"){
          navigate("/client/dashboard");
        }else if(data?.role === "freelancer"){
          navigate("/freelancer/dashboard");
        }
      });
    }
  });

  useEffect(()=>{
    if(isSuccess){
      login(data?.role);
    }
  } , [ isSuccess ]);


  return (
    <section className="h-[88vh] flex justify-center items-center px-10">
      <section className="w-lg p-6 flex flex-col gap-y-3 rounded-[10px] shadow-[-1px_1px_10px_rgb(253,62,62)]">

        <h2 className="text-center text-[20px]" style={{ fontFamily : "Rowdies" }}>LOGIN</h2>

        {isPending && <AlertMessage type="loading" message="Login you in....."/>}
        {isError && <AlertMessage type="error" message={error?.response?.data?.message}/>}
        {isSuccess && <AlertMessage type="success" message="Login success"/>}
        {isSessionExpiredError && <AlertMessage type="error" message={sessionError?.response?.data?.message}/>}

        <form className="flex flex-col gap-y-5" onSubmit={formik.handleSubmit}>

          <input type="email" { ...formik.getFieldProps("email") } placeholder="Email" name="email" className="p-1 pl-3 rounded-md border-[2px] outline-none"/>
          {formik.touched.email && formik.errors.email && (<span className="text-xs text-red-500">{formik.errors.email}</span>)}

          <input type="password" {...formik.getFieldProps("password")} placeholder="Password" name="password" className="p-1 pl-3 rounded-md border-2 outline-none"/>
          {formik.touched.password && formik.errors.password && (<span className="text-xs text-red-500">{formik.errors.password}</span>)}

          <div className="flex justify-between">
            <div><input type="checkbox" className="scale-110 mr-2 translate-y-[2px]"/>Remember me</div>
            <div>Forgot Password?</div>
          </div>

          <button type="submit" className="p-[5px] bg-[linear-gradient(to_top_right,_rgba(245,_18,_18,_1),_rgba(234,_5,_97,_1))]
          flex items-center justify-center text-white gap-x-2 rounded-md hover:bg-[linear-gradient(to_top_right,_rgba(245,_18,_18,_0.8),_rgba(234,_5,_97,_0.8))]" 
          style={{ fontFamily : "Rowdies" }}><FaSignInAlt/>LOGIN</button>

          <div className="p-2 text-center rounded-[5px] bg-[rgb(242,_241,_241)]">New to SkillHive? <Link to="/register" className="text-[rgb(118,_4,_138)] hover:text-blue-700">Create Account</Link></div>

        </form>

      </section>
    </section>
  );
}

export default LoginPage;