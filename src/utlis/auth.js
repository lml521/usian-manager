// 封装 存储 token  以及  用户信息

let TOKEN_KEY = "token";//设置 token 变量
let USER_INIT_KEY = "userInit"; //设置 userInit 用户信息 变量

// 设置 token
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

// 获取 token 
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

// 设置 用户信息
export const setUserInit = (userInit) => {
    localStorage.setItem(USER_INIT_KEY, JSON.stringify(userInit))
}

// 获取 用户信息
export const getuserInit = () => {
    return JSON.parse(localStorage.getItem(USER_INIT_KEY)||"{}")
}

// 清除 token 和 用户信息
export const removeTokenOruserInit = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INIT_KEY)
}