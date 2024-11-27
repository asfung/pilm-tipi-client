import { defineStore } from "pinia";
import axios from 'axios'

export const useMovieStore = defineStore("MovieStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
      movie: [],
      movies: [],
      indexMovie: {
        popular: [],
        top_rated: [],
        trending: [],
      },
      popularMoviesBucket: [],
      topRatedMoviesBucket: [],
      trendingMoviesBucket: [],
      popularPageNumber: 1,
      topRatedPageNumber: 1,
      trendingPageNumber: 1,
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

  // async getMovie(movie_id){
  async getMovie({movie_id}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8998/api/1/movie/${movie_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   page: page,
        // },
      })

      if(response.status === 200){
        const results = response.data.data
        // console.log(results)
        // this.PUSH_DATA(results)
        // this.movie.push(...results)
        console.log(response.data.data)
        this.movie = results
        // this.movie.push(results)


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
        this.popularMoviesBucket.push(...results)
        this.indexMovie.popular.push(...results)
        // console.log(this.popularMoviesBucket)
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

  async topRatedMovies({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/movie/top_rated', {
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
        this.topRatedMoviesBucket.push(...results)
        this.indexMovie.top_rated.push(...results)
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

  async trendingMovies({page}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/movie/trending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })

      if(response.status === 200){
        const results = response.data.data.results
        this.trendingMoviesBucket.push(...results)
        this.indexMovie.trending.push(...results)
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

  incrementPopularPageNumber() {
    this.popularPageNumber++;
  },
  incrementTopRatedPageNumber() {
    this.topRatedPageNumber++;
  },
  incrementTrendingPageNumber() {
    this.trendingPageNumber++;
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
  incrementPopularPageNumber(state) {
    state.popularPageNumber++;
  },
  incrementTopRatedPageNumber(state) {
    state.topRatedPageNumber++;
  },
  incrementTrendingPageNumber(state) {
    state.trendingPageNumber++;
  },
},
});

