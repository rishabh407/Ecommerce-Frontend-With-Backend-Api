import { useEffect, useState } from "react";
import { getProductById,getProducts,getProductsByCategory } from "./axiosdata.js";
export default function useProducts(){
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState("");
    const [singleProduct, setsingleProduct] = useState(null);
    const [categorywisedata, setcategorywisedata] = useState([])
    // Fetch All Products

    const fetchAllProducts=async()=>{
        try{
            const data=await getProducts();
            setproducts(data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setloading(false);
        }
    };
    
    // Fetch Single Product

    const fetchProductById=async(id)=>{
        if(!id)return;
        setloading(true);
        try{
            const data=await getProductById(id);
            setsingleProduct(data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setloading(false);
        }
    };

    // Fetch Products By Category

    const fetchProductByCategory=async (category)=>{
        if(!category)return;
        setloading(true);
        try{
            const data= await getProductsByCategory(category);
            setcategorywisedata(data);
        }
        catch(err){
              setError(err.message);
        }

        finally{
            setloading(false);
        }
    }
    useEffect(()=>{
         fetchAllProducts();
    },[])
    return{
        products,singleProduct,setsingleProduct,loading,error,fetchProductById,fetchProductByCategory,categorywisedata
    };
}