import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
    let token = store.getters.token
    // 当 有 token 的 时候
    if (token) {
        // 当有 token 的时候，如果要跳转的路径为login页面，则不让它通行，返回 原来的页面
        if (to.path === '/login') {
            next(from.path)
        } else {
            /**
             * 跳转的不是login 页面时 ， 获取用户信息，
             * 利用vuex 计算属性  获取 userInfo 
             * 
             * 判断 userInfo 的类型 typeOf  为object 的情况 
             * 为 true时 返回 userInfo 转换成 字符串  
             * 为false 时 返回 userInfo
             * 
             * 判断 userInfo 当为空的 或者空的"{}"时
             * 则用异步获取userInfo 信息
             * 当获取但 用户信息 时， 则通过
             * 
             * 当获取不到用户信息
             * * 否则删除token  
             * 跳转到登录页面
             */
            let userInfo = store.getters.userInfo

            userInfo = typeof userInfo === 'object' ? JSON.stringify(userInfo) : userInfo
            if (userInfo === "{}" || userInfo === "") {
                let responst = await store.dispatch("getInfo")
                console.log(responst);
                if (responst) {
                    next()
                } else {
                    store.dispatch("handle")
                    next('/login')
                }
            } else {
                next()
            }
        }
        // 当没有 token 的时候  
    } else {
        // 当没有 token 的 时候  跳转的路径是login  则通过
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})