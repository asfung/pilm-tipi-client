<template>
  <div class="ma-1" 
    >
    <v-skeleton-loader 
      class="dark:bg-black"
      :loading="isLoading" 
      height="240" 
      width="240" 
      type="image, list-item"
      >
      <v-hover 
        v-slot="{ isHovering, props }" open-delay="200">
        <!-- <v-card :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 12 : 2" class="dark:bg-black dark:text-white" v-bind="props"> -->
        <v-card class="dark:bg-black dark:text-white" v-bind="props">
          <!-- class="cursor-pointer transition-transform delay-200 hover:scale-125" -->

           <!-- @click="type === 'movie' ? `http://localhost:3000/movie/${item.id}` : `http://localhost:3000/tv/${item.id}`" -->
          <v-img
            class="hover:cursor-pointer"
           :href="type === 'movie' ? `http://localhost:3000/movie/${item.id}` : `http://localhost:3000/tv/${item.id}`" :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" height="335px"
            width="250px" cover>
            <div class="ma-2">
              <v-icon :icon="item.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="x-large" :color="isHovering ? 'primary' : 'transparent'"
                @click="eventBookmark(item)"></v-icon>
              <!-- <v-icon icon="mdi-bookmark-outline" size="x-large"></v-icon> -->
            </div>

            <v-card-title class="text-h6 text-white d-flex flex-column">
              <!-- <p class="mt-4">
                dsads
              </p> -->

              <!-- <div>
                <p class="ma-0 text-body-1 font-weight-bold">
                  dsadsa
                </p>
                <p class="text-caption font-weight-medium">
                  dsadsadas
                </p>
              </div> -->
            </v-card-title>
            <!-- <div class="align-self-center">
              <v-btn :class="{ 'show-btn': isHovering }" :color="transparent"
                icon="mdi-bookmark" variant="text"></v-btn>
            </div> -->
          </v-img>
          <v-card-text class="max-w-64">
    <!-- @click="navigateToMovie(item.id)"  -->
            <a :href="type === 'movie' ? `http://localhost:3000/movie/${item.id}` : `http://localhost:3000/tv/${item.id}`"><p>{{ type === 'movie' ? item.title : item.name}}</p></a>
            <!-- <p>{{ isLoading }}</p> -->
            <!-- <p>{{ item.id }}</p> -->
          </v-card-text>
        </v-card>
      </v-hover>
    </v-skeleton-loader>


  </div>
</template>

<script>
import { useBookmarksStore } from '~/store/Bookmarks';
export default {
  props: {
    item: {
      // type: any,
    },
    type: {
    },
    isLoading: {
    },
  },
  methods: {
    eventBookmark(item){
      try{
        const bookmarkStore = useBookmarksStore()
        console.log(item.id)
        console.log(this.type)
        bookmarkStore.bookmarked({
          item_id: item.id,
          item_type: this.type,
        })
        this.item.isBookmarked = !this.item.isBookmarked
      }catch(e){
        console.log(e)
      }
    },
    navigateToMovie(id) {
      this.$router.push({ name: 'movie', params: { id } });
    }
  },
}
// :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" 
// :src="'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg'" 
</script>

<style scoped>
.show-btn{
  /* color: rgba(255, 255, 255, 1) !important; */
}
</style>