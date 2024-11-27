<template>
  <!-- <NuxtLayout> -->
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer expand-on-hover rail class="dark:bg-black dark:text-white">
      <!-- <v-list>
                <v-list-item title="Navigation drawer"></v-list-item>
            </v-list> -->

      <v-list density="compact" class="" nav>
        <!-- <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-movie" title="movies" value="movies"></v-list-item>
        <v-list-item prepend-icon="mdi-television" title="Tvs" value="tvs"></v-list-item>
        <v-list-item prepend-icon="mdi-bookmark-multiple" title="Bookmarks" value="bookmarks"></v-list-item>
        <v-list-item prepend-icon="mdi-magnify" title="Search" value="search" @click="showSearch()"></v-list-item> -->

        <v-list-item 
          v-for="item in navItems" 
          :key="item.value" 
          :prepend-icon="item.icon" 
          :title="item.title" 
          :value="item.value" 
          :active="isActive(item.value)"
          @click="navigateTo(item.value)">
        </v-list-item>

        <v-list-item prepend-icon="mdi-magnify" title="Search" value="search" @click="showSearch()"></v-list-item>

        <v-list-item v-if="isAuthenticated === true" @click="logout()" prepend-icon="mdi-logout" title="Logout" value="logout">
        </v-list-item>

        <!-- <v-list-item value="darkMode"> -->
        <button class="mx-2" @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')">
          <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50"
            view-box="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <!-- </v-list-item> -->


      </v-list>


    </v-navigation-drawer>

    <!-- <v-bottom-navigation>
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>

        <span>Recent</span>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>

        <span>Favorites</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        <span>Nearby</span>
      </v-btn>
    </v-bottom-navigation> -->


    <!-- <v-app-bar title="Application bar"></v-app-bar> -->

    <v-main class="align-center justify-center" style="min-height: 300px;">
      <div class="dark:bg-black">
        <!-- make it sticky -->
        <search v-if="isShow" class="sticky"></search>
        <!-- <search v-if="isShow" class="fixed w-full z-10"></search> -->
        <!-- <router-view /> -->
        <NuxtPage />
        <div class="flex justify-center dark:text-white">
          <p>
            <v-icon :icon="'mdi-copyright'">
              
            </v-icon>
            Copyright
            Paung
          </p>
        </div>
      </div>
    </v-main>
  </v-layout>
  <!-- </NuxtLayout> -->
</template>

<script>
// import { mapState } from 'vuex'
import { useSearchStore } from '~/store/Search';
import { useAuthStore } from '~/store/Auth';
const searchStore = useSearchStore();
const authStore = useAuthStore();

export default {
  computed: {
    isShow: () => {
      return searchStore.$state.isShow
    },
    isAuthenticated(){
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      if (token !== null && user !== null){
        console.log("authenticated")
        return true
      }
      console.log("not authenticated")
      return false
    },

  },
  mounted() {
    // this.isAuthenticated()
    // console.log(localStorage.getItem('token'))
    // const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
  },
  data() {
    return {
      navItems: [
        { title: 'Home', icon: 'mdi-home', value: 'index' },
        { title: 'Movies', icon: 'mdi-movie', value: 'movie' },
        { title: 'Tvs', icon: 'mdi-television', value: 'tv' },
        { title: 'Bookmarks', icon: 'mdi-bookmark-multiple', value: 'bookmarks' },
      ],
    }
  },
  methods: {
    setColorTheme(newTheme){
      console.log(this.$colorMode.preference)
      useColorMode().preference = newTheme
    },
    showSearch(){
      // searchStore.SET_ISSHOW(!this.isShow)
      searchStore.helloWorld()
      searchStore.$patch({isShow: !this.isShow})
    },
    logout(){
      authStore.logout()
      return navigateTo('/login')
      // console.log('logoutt')
      // return true
    },
    isActive(value) {
      // console.log(value)
      // if(value === 'home'){
      //   return true
      // }else{
        // console.log("current route name:", this.$route.name);
        return this.$route.name === value; 
      // }
      // return this.$route.path === value;
    },
    navigateTo(value) {
      // console.log(value)
      if(value === 'index'){
        // navigateTo('/')
        this.$router.push({ name: 'index' })
      }else{
        this.$router.push({ name: value }); 
      }
    },
  },
}
</script>