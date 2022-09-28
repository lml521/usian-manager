// 引入axios
import axios from 'axios'
// 引入element-ui 的提示
// import { Message } from 'element-ui'

import {
    Loading
} from 'element-ui';
import store from '../store'
const exceptionMessage = {
    1000: "用户名或者密码错误",
    20000: "密码错误",
}
// 设置基准地址
let http = axios.create({
    // baseURL: process.env.VUE_APP_HASE_URL,
    timeout: 5000,
})

// 封装 Loading 加载

const loadings = {
    loadingInstance :null,
    option() {
        if (!this.loadingInstance) {
            this.loadingInstance=Loading.service({
                text:"拼命加载中",
                spinner:"el-icon-loading",
                background:"rgba(0, 0, 0, 0.8)",
            })
        }
    },
    close() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}
// 请求拦截
http.interceptors.request.use(res => {


    let token = store.getters.token
    if (token) res.headers.Authorization = "Bearer " + token
    loadings.option()
    return res
}, error => {
    loadings.close()
    return Promise.reject(error)

})
// 响应拦截
http.interceptors.response.use(res => {
    let status = res.data.code
    loadings.close()
    if (status === 2000) {
        // Message.success(res.data.message)
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
    loadings.close()
    return Promise.resolve(error)
    // console.log(error.response.data.errorCode, 'error111');
    // let {msg,errorCode} = error.response.data
    // console.log(msg, errorCode);
    // _showError(msg, errorCode)    
})

// const _showError = (msg, errorCode) => {
//     let title
//     title = msg || exceptionMessage[errorCode] || "未知错误"
//     Message.error(title);
// }

let request = (options) => {
    // methods 请求方式
    options.methods = options.methods || "get"
    // "GET"
    if (options.methods.toLowerCare === "get") {
        options.params = options.params || options.data
        delete options.data
    }
    // 设置全局默认的基准地址
    http.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    return http(options)
}

export default request