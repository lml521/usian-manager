import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { getLogin, getUserInit } from "@/api/login";//api 接口
import {setToken,setUserInit, getToken , getuserInit} from '../utlis/auth'
export default new Vuex.Store({
  state: {
    token: getToken()||"",
    userInit:getuserInit()||"",
  },
  getters: {
    
  },

  mutations: {
    // 修改 token
   SET_TION(state,token) {
      state.token = token
      setToken(state.token)
    },

    // 修改 userinit
    SET_USER_INIT(state, init) {
      state.userInit = init
      console.log(state.userInit, 'state.userInit');
      setUserInit(state.userInit)
    }

  },
  actions: {
    // 异步获取登录 token
   async login({commit}, form) {
      try {
        let response = await getLogin(form)
        // console.log(response,'response');
        commit("SET_TION", response.data.token)
        return response.data.token        
      } catch (error) {
        console.log(error.message);
      }
    },

   async  getInit({commit}) {
     try {
       let userInit = await getUserInit()
       commit("SET_USER_INIT", userInit.data)
       return userInit.data
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  modules: {},
});
