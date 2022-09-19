import http from './require'

export async function getLogin(params) {
    let data = await http.post('/login',params)
    return data
}