import request from '../utlis/require'

// export async function getLogin(params) {
//     let data = await http.post('/login',params)
//     return data
// }

const getLogin = ( data ) => {
    return request({
        url: "/login",
        method: "post",
        data,
    })
}

const a = () => {
    return request({
        url: "/",
        method:"get",
        proxy: process.env.VUE_APP_BASE_API1,
        
    })
}
const b = () => {
    return request({
        url: "/",
        method:"get",
        proxy: process.env.VUE_APP_BASE_API2,
        
    })
}
export {
    getLogin,
    a,
    b,
}