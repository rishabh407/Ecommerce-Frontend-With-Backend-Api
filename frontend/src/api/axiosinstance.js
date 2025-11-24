import axios from "axios";

// Create a pre configured Axios Instance
const api=axios.create({
    baseURL:"http://localhost:5000/api",
    timeout:8000,
    headers:{
        "Content-Type":"application/json",
    },
 });
export default api; 
