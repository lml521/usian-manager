// 封装 存储 token  以及  用户信息

let TOKEN_KEY = "token";//设置 token 变量
let USER_INFO_KEY = "userInfo"; //设置 userInfo 用户信息 变量

// 设置 token
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

// 获取 token 
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

// 设置 用户信息
export const setUserInfo = (userInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// 获取 用户信息
export const getuserInfo = () => {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY)||"{}")
}

// 清除 token 和 用户信息
export const removeTokenOruserInfo = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
}