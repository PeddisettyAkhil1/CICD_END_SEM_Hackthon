import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";


export const createRoomAPI = async ({ freelancerId = "", clientId = "" })=> {
    const response = await axios.post(`${BASE_URL}/message/create-room` , { freelancerId , clientId } , {
        withCredentials : true
    });
    return response?.data;
}

export const freelancerRoomsAPI = async ()=>{
    const response = await axios.get(`${BASE_URL}/message/freelancer-rooms`,{
        withCredentials : true
    });
    return response?.data;
}

export const clientRoomsAPI = async ()=>{
    const response = await axios.get(`${BASE_URL}/message/client-rooms`,{
        withCredentials : true
    });
    return response?.data;
}