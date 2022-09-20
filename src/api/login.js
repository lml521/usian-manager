import http from '../utlis/require'

export async function getLogin(params) {
    let data = await http.post('/login',params)
    return data
}

