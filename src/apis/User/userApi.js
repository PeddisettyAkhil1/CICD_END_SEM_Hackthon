import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";

export const registerAPI = async ( userData )=> {
    const response = await axios.post(`${BASE_URL}/user/register` , {
        username : userData?.username ,
        email : userData?.email ,
        role : userData?.role ,
        password : userData?.password
    } , {
        withCredentials : true
    });
    return response?.data;
}

export const loginAPI = async ( userData )=> {
    const response = await axios.post(`${BASE_URL}/user/login` , {
        email : userData?.email ,
        password : userData?.password
    } , {
        withCredentials : true
    });
    return response?.data;
}

export const getUserInfo = async ()=> {
    const response = await axios.get(`${BASE_URL}/user/userInfo`,{
        withCredentials : true
    });
    return response?.data;
}


export const checkAuthAPI = async ()=> {
    const response = await axios.get(`${BASE_URL}/user/check-auth`,{
        withCredentials : true
    });
    return response?.data;
}

export const logoutAPI = async ()=> {
    const response = await axios.get(`${BASE_URL}/user/logout`,{
        withCredentials : true
    });
    return response?.data;
}