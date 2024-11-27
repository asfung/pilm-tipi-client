import { defineStore } from "pinia";
import axios from 'axios'

export const useBookmarksStore = defineStore("BookmarksStore", {
  state: () => {
    return {
      isShow: false,
      searchValue: null,
    //   dataBookmarks: "hello world",
      dataBookmarks: [],
      currentPage: null,
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
  async allBookmarks({page = 1}){
    try{
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8998/api/1/bookmark', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })

      if(response.status === 200){
        const results = response.data.data
        // console.log(results)
        // this.PUSH_DATA(results)
        // commit('PUSH_DATA', results)
        // commit('SET_CURRENT_PAGE', page + 1) 
        // this.setCurrentPage(page + 1)
        this.currentPage = page + 1
        this.dataBookmarks.push(...results)
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

  async bookmarked({item_id, item_type}){
    try{
      const token = localStorage.getItem('token')
      const data = {
        item_id: item_id,
        item_type: item_type
      }
      const response = await axios.post('http://localhost:8998/api/1/bookmark/Create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.status === 200){
        const results = response.data.data
        // console.log(results)
        // this.PUSH_DATA(results)
        // commit('PUSH_DATA', results)
        // commit('SET_CURRENT_PAGE', page + 1) 
        // this.setCurrentPage(page + 1)
        // this.dataBookmarks.push(...results)
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

  pushDataBookmarks(payload){
    this.dataBookmarks.push(...payload)
  },

  setCurrentPage(page){
    this.currentPage = page
  }

},
mutations: {
  SET_ISSHOW(state, payload){
    state.isShow = payload
  },
  SET_SEARCH_VALUE(state, payload){
    state.searchValue = payload
  },
  PUSH_DATA(state, payload){
    state.dataBookmarks.push(...payload)
  },
  SET_DATA(state, payload){
    state.data = payload
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload
  },

},
});



// actions: {
//     async allBookmarks({ state, commit }, { page = 1 }) {
//       try {
//         const token = localStorage.getItem('token')
//         const response = await axios.get('http://localhost:8998/api/1/bookmark', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             page: page,
//           },
//         })
  
//         if (response.status === 200) {
//           const results = response.data.data
//           commit('PUSH_DATA', results)
//           commit('SET_CURRENT_PAGE', page + 1) // increment the current page
//           return {
//             status: true,
//             data: response.data.data,
//             message: response.data.message
//           }
//         }
//       } catch (e) {
//         console.error(e)
//         // return {
//         //   status: false,
//         //   data: null,
//         //   message: "Tidak Berhasil"
//         // }
//       }
//     },
//   },
//   mutations: {
//     // ...
//     SET_CURRENT_PAGE(state, payload) {
//       state.currentPage = payload
//     },
//   },

