import { defineStore } from "pinia";
import axios from 'axios'

export const useHomeStore = defineStore("HomeStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
      dataMovies: [],
      dataTvs: [],
      woi: "daadsadsa",
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

  async popularTv(){
    try{
      const response = this.$callApi.get('/tv/popular')
      return response.data
    }catch(e){
      return e
    }
  },

  async popularMovies({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/movie/popular', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })

      if(response.status === 200){
        const results = response.data.data.results
        // console.log(results)
        // this.PUSH_DATA(results)
        this.dataMovies.push(...results)
        return {
          status: true,
          data: response.data.data,
          message: response.data.message
        }
      }
    }catch(e){
      console.error(e)
      // return {
      //   status: false,
      //   data: null,
      //   message: "Tidak Berhasil"
      // }
    }
  },


  async popularTvs({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/tv/popular', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })
      if(response.status === 200){
        const results = response.data.data.results
        // console.log(results)
        // this.PUSH_DATA(results)
        this.dataTvs.push(...results)
        return {
          status: true,
          data: response.data.data,
          message: response.data.message
        }
      }
    }catch(e){
      console.error(e)
      // return {
      //   status: false,
      //   data: null,
      //   message: "Tidak Berhasil"
      // }
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
  PUSH_DATA(state, payload){
    state.data.push(...payload)
  },
  SET_DATA(state, payload){
    state.data = payload
  },
},
});

