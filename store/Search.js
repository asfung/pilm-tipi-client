import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("SearchStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
    };
  },
  getters: {
    getIsShow: (state) => {
      return state.isShow
    },
    getSearchValue: (state) => {
      return state.searchValue
    }
  },
  actions: {
    async multiSearch(page){
      try{
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8998/api/1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            q: this.searchValue
          }
        })
        const results = response.data.data.results
        const filteredResults = results.filter((item) => item.media_type !== "person");
        return filteredResults
        // return results
      }catch(e){
        console.log(e)
      }
    },

    filterResults(results) {
      return results.filter((item) => item.media_type !== "person");
    },

    setSearchValue(value) {
      this.searchValue = value; 
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
