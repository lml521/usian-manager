import axios from "axios";
import { Promise } from "core-js";

const http = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:3000,
});

http.interceptors.request.use(res=>{
    return res
}, error => {
    return  Promise.reject(error)
})

http.interceptors.response.use(res => {
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})

export default http

