import request from '../utlis/require'

// export async function getLogin(params) {
//     let data = await http.post('/login',params)
//     return data
// }

export const getLogin = (data) => {
    return request({
        url: "/user/login",
        method: "post",
        data,
    })
}
// getUserInfo
export const getUserInfo = () => {
    return request({
        url: "/user/info/admin",
        method: "get",
    })
}

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