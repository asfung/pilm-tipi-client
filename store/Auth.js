import { defineStore } from "pinia";
import axios from 'axios'
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
      data: [],
      // user: this.getUserLocalStorage()
    };
  },
  getters: {
    getIsShow: (state) => {
      return state.isShow
    },
    getSearchValue: (state) => {
      return state.searchValue
    },
    getData: (state) => {
      return state.data
    },
  },
actions: {

  async login(payload){
    try{
      const response = await axios.post('http://localhost:8998/api/1/login', payload)
      // localStorage.setItem('user', (await response).data.user)
      const userString = JSON.stringify(response.data.user)
      const token = response.data.authorization.token
      localStorage.setItem('user', userString)
      localStorage.setItem('token', token)
      // console.log(response.data)
      // console.log(userString)
      // console.log(response.status)

      if(response.status === 200){
        return {
          status: true,
          response: response.data,
        }
      }
      return {
        status: false,
        response: response.data,
      }
    }catch(e){
      return {
        status: false,
        response: e,
      }
    }
  },

  async register(payload){
    try{
      const response = await axios.post('http://localhost:8998/api/1/register', payload)
      // localStorage.setItem('user', (await response).data.user)
      // console.log(response.data)
      // console.log(userString)
      // console.log(response.status)

      if(response.status === 200){
        return {
          status: true,
          response: response.data,
        }
      }
      return {
        status: false,
        response: response.data,
      }
    }catch(e){
      return {
        status: false,
        response: e,
      }
    }
  },


  async logout(){
    // token = localStorage.removeItem('token')
    // user = localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true
  },

  setUserLocalStorage(){
  },

  getUserLocalStorage(){
    const userHashed = localStorage.getItem('user')
    return JSON.parse(AES.decrypt(userHashed).toString(CryptoJS.enc.Utf8))
  },

  async multiSearch(page){
    try {
      const data = await this.$axios.get('/multi', {
        params: {
          page: page,
          q: this.searchValue
        }
      })
    } catch (e) {
      console.log(e)
    }
  },

  // later ahhhhh using forgor to use axios
  async homeFetch(page) {
    try {
      const url = "'https://www.freetogame.com/api/games"
      let config = {
          url,
          method: "get",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
      };
      // let response = await axios.request(config);

      const response = await axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
        // params: {
        //   page: page,
        //   q: this.searchValue
        // }
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  },

  async games(){
    try{
      const response = await ('https://www.freetogame.com/api/games', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
      this.data = response
      return response
    }catch(e){
      return e
    }
  },

  helloWorld(){
    console.log('hello world from store')
  },

},
mutations: {
  SET_ISSHOW(state, payload){
    state.isShow = payload
  },
  SET_SEARCH_VALUE(state, payload){
    state.searchValue = payload
  },
},
});

