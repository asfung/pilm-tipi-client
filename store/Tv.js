import { defineStore } from "pinia";
import axios from 'axios'

export const useTvStore = defineStore("TvStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
      tv: [],
      tvs: [],
      indexTv: {
        popular: [],
        top_rated: [],
        trending: [],
      },
      popularTvsBucket: [],
      topRatedTvsBucket: [],
      trendingTvsBucket: [],
      popularPageNumber: 1,
      topRatedPageNumber: 1,
      trendingPageNumber: 1,
    };
  },
  getters: {
  },
actions: {
  // async getMovie(movie_id){
  async getTv({tv_id}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8998/api/1/tv/${tv_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.status === 200){
        const results = response.data.data
        // console.log(response.data.data)
        this.tv = results

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
        this.popularTvsBucket.push(...results)
        this.indexTv.popular.push(...results)
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


  async topRatedTvs({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/tv/top_rated', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })

      if(response.status === 200){
        const results = response.data.data.results
        this.topRatedTvsBucket.push(...results)
        this.indexTv.top_rated.push(...results)
        return {
          status: true,
          data: response.data.data,
          message: response.data.message
        }
      }
    }catch(e){
      console.error(e)
    }
  },

  async trendingTvs({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/tv/trending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })

      if(response.status === 200){
        const results = response.data.data.results
        this.trendingTvsBucket.push(...results)
        this.indexTv.trending.push(...results)
        return {
          status: true,
          data: response.data.data,
          message: response.data.message
        }
      }
    }catch(e){
      console.error(e)
    }
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

