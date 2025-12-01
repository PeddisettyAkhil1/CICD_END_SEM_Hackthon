import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";


export const createOrderAPI = async ( orderDetails )=> {
    const response = await axios.post(`${BASE_URL}/order/create` , {
        gigId : orderDetails.gigId ,
        freelancerId : orderDetails.freelancerId
    } , {
        withCredentials : true
    });
    return response?.data;
}

export const clientOrders = async ()=> {
    const response = await axios.get(`${BASE_URL}/order/clientOrders` , {
        withCredentials : true
    });
    return response?.data;
}

export const reviewOfGigAPI = async ( reviewInfo )=> {
    const response = await axios.post(`${BASE_URL}/order/add-review` , {
        gigId : reviewInfo.gigId ,
        rating : reviewInfo.rating ,
        comment : reviewInfo.comment
    }, {
        withCredentials : true
    });
    return response?.data;
}

export const freelancerOrdersAPI = async ()=> {
    const response = await axios.get(`${BASE_URL}/order/freelancerOrders` , {
        withCredentials : true
    });
    return response?.data;
}

export const updateOrderAPI = async ({ orderId , status })=> {
    const response = await axios.put(`${BASE_URL}/order/update` , {
        orderId , status
    } , {
        withCredentials : true
    });
    return response?.data;
}