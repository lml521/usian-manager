import request from '../utlis/require'

// export async function getLogin(params) {
//     let data = await http.post('/login',params)
//     return data
// }
// 登录
export const getLogin = (data) => {
    return request({
        url: "/user/login",
        method: "post",
        data,
    })
}
// 用户信息
export const getUserInfo = () => {
    return request({
        url: "/user/info/admin",
        method: "get",
    })
}

// 退出
export const logout = () => {
    return request({
        url: "/user/logout",
        method:"post"
    })
}



// const a = () => {
//     return request({
//         url: "/",
//         method:"get",
//         proxy: process.env.VUE_APP_BASE_API1,
//     })
// }

// const b = () => {
//     return request({
//         url: "/",
//         method:"get",
//         proxy: process.env.VUE_APP_BASE_API2,
//     })
// }
// export {
//     getLogin,
// }