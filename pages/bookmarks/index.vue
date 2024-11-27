<template>
  <div class="h-screen flex flex-col">
    <h1 class="dark:text-white mx-5 text-3xl my-2">Bookmarks</h1> 
    <!-- <v-infinite-scroll :height="300" :items="bookmarks" :onLoad="load">
      <template v-for="(bookmark, index) in bookmarks" :key="bookmark.id">
        <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']" class="dark:text-white">
          <p>Item number #{{ bookmark.id }} </p>
          <p>name {{ bookmark.item_type === 'movie' ? bookmark.data.original_title : bookmark.data.name }} </p>
        </div>
      </template>
    </v-infinite-scroll> -->
  
    <v-infinite-scroll :items="bookmarks" :onLoad="load">
      <v-row class="flex flex-wrap">
        <v-col v-for="(bookmark, index) in bookmarks" :key="bookmark.id" class="flex justify-center items-center p-2">
          <div class="dark:text-white">
            <!-- <p>Item number #{{ movie.id }} </p> -->
            <!-- <v-img href="www.google.com" :src="`https://image.tmdb.org/t/p/original${bookmark.data.poster_path}`"
              height="335px" width="250px" cover />
            <p>{{ bookmark.item_type === 'movie' ? bookmark.data.original_title : bookmark.data.name }}</p> -->
            <card-item :item="bookmark.data" :type="bookmark.item_type" />
          </div>
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useBookmarksStore } from '~/store/Bookmarks';
  const bookmarksStore = useBookmarksStore()
  let pageNumber = 1;
  let isLoading = ref(false)

  const bookmarks = ref([])

definePageMeta({
  middleware: ['auth-middleware'],
})

  // onMounted(async () => {
  //   console.log(bookmarksStore.dataBookmarks)
  //   bookmarks.value = bookmarksStore.dataBookmarks
  // })

  onMounted(async () => {
    console.log(bookmarksStore.dataBookmarks)
    bookmarks.value = bookmarksStore.dataBookmarks
    await load({ done: () => {} })
  })


  async function api (page) {
    try {
      const { status, data, message } = await bookmarksStore.allBookmarks({
        page: page
      })
      return data
    } catch (e) {
      console.error(e)
      return []
    } finally {
    }
  }
  async function load ({ done }) {
    if (isLoading.value) return; 
    isLoading.value = true; 
    console.log("Loading bookmarks...");

    const res = await api(pageNumber)

    if (res.length > 0) {
      // bookmarks.value.push(...res); 
      pageNumber++; 
    }
    isLoading.value = false; 
    done('ok')
  }
</script>