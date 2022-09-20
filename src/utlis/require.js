// import axios from "axios";

// const http = axios.create({
//     baseURL:process.env.VUE_APP_BASE_API,
//     timeout:3000,
// });

// http.interceptors.request.use(res=>{
//     return res
// }, error => {
//     return  Promise.reject(error)
// })

// http.interceptors.response.use(res => {
//     return Promise.resolve(res)
// }, error => {
//     return Promise.reject(error)
// })

// export default http

import axios from 'axios'

let http=axios.create({
    // baseURL: process.env.VUE_APP_HASE_URL,
    timeout:3000,
})

http.interceptors.request.use(res => {
    return res
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(res => {
    return res
}, error => {
    return Promise.resolve(error)
})

let request = (options) => {
    options.methods = options.methods || "get"
    if (options.methods.toLowerCare === "get") {
        options.params = options.params || options.data
        delete options.data
    }
    http.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    return http(options)
}

export default request