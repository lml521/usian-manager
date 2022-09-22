import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import {
  getLogin,
  getUserInfo,
  logout
} from "@/api/login"; //api 接口
import {
  setToken,
  setUserInfo,
  getToken,
  getuserInfo
} from '../utlis/auth'
export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getuserInfo() || "",
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    // 修改 token
    SET_TION(state, token) {
      state.token = token
      setToken(state.token)
    },
    // 修改 userinfo
    SET_USER_INFO(state, info) {
      state.userInfo = info
      console.log(state.userInfo, 'state.userInfo');
      setUserInfo(state.userInfo)
    }
  },
  actions: {
    // 异步获取登录 token
    async login({
      commit
    }, form) {
      try {
        let response = await getLogin(form)
        commit("SET_TION", response.data.token)
        return response.data.token
      } catch (error) {
        console.log(error.message);
      }
    },
    // 获取用户信息
    async getInfo({
      commit
    }) {
      try {
        let userInfo = await getUserInfo()
        console.log(userInfo, '444555');
        commit("SET_USER_INFO", userInfo.data)
        return userInfo.data
      } catch (error) {
        console.log(error.message);
      }
    },


    //  退出登录
    async handleLogout({ commit }) {
      let response = await logout()
      commit("SET_TION", "")
      commit("SET_USER_INFO", "")
      return response
    },

    async handle({ commit }) {
      commit("SET_TION",null)
      commit("SET_USER_INFO",null)
    }
  },
  modules: {},
});