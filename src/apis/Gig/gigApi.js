import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";


export const createGigAPI = async ( formData )=> {
    const response = await axios.post(`${BASE_URL}/gigs/createGig` , formData , {
        headers : {
            "Content-Type" : "multipart/form-data"
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const fetchAllGigsAPI = async ()=> {
    const response = await axios.get(`${BASE_URL}/gigs/gigslist` , {
        withCredentials : true
    });
    return response?.data;
}

export const filterGigsAPI = async ( filteredData )=> {
    const response = await axios.get(`${BASE_URL}/gigs/filterGigs` , {
        params :{
            category : filteredData.category ,
            price : Number(filteredData.price)
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const clientFetchGigAPI = async ( gigId )=> {
    const response = await axios.get(`${BASE_URL}/gigs/clientGetGig` , {
        params :{
            gigId : gigId
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const gigReviewsAPI = async ( gigId )=> {
    const response = await axios.get(`${BASE_URL}/gigs/get-reviews` , {
        params : {
            gigId : gigId
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const freelancerFetchGigAPI = async ( gigId )=> {
    const response = await axios.get(`${BASE_URL}/gigs/freelancerGetGig` , {
        params :{
            gigId : gigId
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const getGigInfoAPI = async ( gigId )=> {
    const response = await axios.get(`${BASE_URL}/gigs/getGigInfo` , {
        params :{
            gigId : gigId
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const updateGigAPI = async ( formData )=> {
    const response = await axios.put(`${BASE_URL}/gigs/updateGig` , formData , {
        headers : {
            "Content-Type" : "multipart/form-data"
        } ,
        withCredentials : true
    });
    return response?.data;
}

export const deleteGigAPI = async ( { gigId } )=> {
    const response = await axios.delete(`${BASE_URL}/gigs/deleteGig` , {
        data : { gigId } ,
        withCredentials : true
    });
    return response?.data;
}