// 引入axios
import axios from 'axios'
// 引入element-ui 的提示
import {
    Message
} from 'element-ui'

const exceptionMessage = {
    1000: "用户名或者密码错误",
    20000: "密码错误",

}
// 设置基准地址
let http = axios.create({
    // baseURL: process.env.VUE_APP_HASE_URL,
    timeout: 5000,
})
// 请求拦截
http.interceptors.request.use(res => {
    return res
}, error => {
    return Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(res => {
    let status=res.data.code
    if (status === 2000) {
    Message.success(res.data.message)
    return res.data
    }
    // else if (status < 400) {
    //     return res
    // } else if (status === 400) {
    //     Message.error(res.data.meta.msg);
    //     return res
    // }

    // let {code, message} = res.data
    // _showError(code, message)
    // return res
}, error => {

    // console.log(error.response.data.errorCode, 'error111');
    // let {msg,errorCode} = error.response.data
    // console.log(msg, errorCode);
    // _showError(msg, errorCode)

    return Promise.resolve(error)
})

const _showError = (msg, errorCode) => {
    let title
    title = msg || exceptionMessage[errorCode] || "未知错误"
    Message.error(title);
}

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