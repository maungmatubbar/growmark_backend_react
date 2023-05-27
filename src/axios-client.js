import axios from "axios";

const { REACT_APP_BACKEND_BASE_URL } = process.env;
const axiosClient = axios.create({
    baseURL: REACT_APP_BACKEND_BASE_URL+'/api',
});
if(axiosClient){
    axiosClient.interceptors.request.use((config)=>{
        const token = localStorage.getItem('ACCESS_TOKEN')
        config.headers.Authorization = `Bearer ${token}`
        return config;
    });
}
else
{
    console.log('Base URL Is Not Found')
}

axiosClient.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    console.log(error.code)
    if(error.code === 'ERR_NETWORK'){
        localStorage.removeItem('ACCESS_TOKEN')
    }
   throw error
});
export default axiosClient;