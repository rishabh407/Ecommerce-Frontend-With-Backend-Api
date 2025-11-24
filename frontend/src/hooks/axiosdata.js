// Store global data and fetch it in website anywhere we want.
import axios from "axios";
import api from '../api/axiosInstance';

export const getProducts=async()=>{
    const res=await api.get("/products");
    return res.data;
};


// Fetch product by id

export const getProductById=async(id)=>{
   const res=await api.get(`/products/${id}`);
   return res.data;
}

// Products By Category.

export const getProductsByCategory=async(category)=>{
    const res=await api.get(`/products/category/${category}`);
    return res.data;
}
export default api;
