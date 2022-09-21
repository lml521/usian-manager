// 引入axios
import axios from 'axios'
// 引入element-ui 的提示
import {
    Message
} from 'element-ui'

const exceptionMessage = {
    1000: "用户名或者密码错误"
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

    let status=res.data.meta.status

    if (status === 200) {
        Message.success(res.data.meta.msg)
        return res
    } else if (status < 400) {
        return res
    } else if (status === 400) {
        Message.error(res.data.meta.msg);
        return res
    }

    let {code, message} = res.data
    _showError(code, message)
    return res
}, error => {
    return Promise.resolve(error)
})

const _showError = (code, message) => {
    let title
    title = exceptionMessage[code] || message || "未知错误"
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