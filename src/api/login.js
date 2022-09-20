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
export {
    getLogin
}