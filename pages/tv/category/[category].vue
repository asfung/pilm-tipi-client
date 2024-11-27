<template>
  <!-- <div class="full-height"> -->
  <div class="h-screen flex flex-col">
    <h1 class="dark:text-white mx-5 text-3xl my-2">{{ judul() }}</h1>l
    <v-infinite-scroll :items="tvsData" :onLoad="load">
      <!-- <v-row class="flex-wrap"> -->
      <v-row class="flex flex-wrap">
        <!-- <v-col v-for="(movie, index) in moviesData" :key="movie.id"> -->
        <v-col v-for="(tv, index) in tvsData" :key="index" class="flex justify-center items-center p-2">
          <!-- <div class="dark:text-white border border-white">
            <v-img @click="null" href="www.google.com" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              height="335px" width="250px" cover />
            <p>{{ movie.original_title }}</p>
          </div> -->
          <CardItem :item="tv" :type="'tv'" />
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useMovieStore } from '~/store/Movie';
  import { useTvStore } from '~/store/Tv';
  const movieStore = useMovieStore()
  const tvStore = useTvStore()
  const route = useRoute()
  // in the future the pageNumber is saved into store, making load faster
  let pageNumber = 1;
  let isLoading = ref(false)
  const categoryParam = route.params.category

definePageMeta({
  middleware: ['auth-middleware'],
})

  const tvsData = ref([])


function judul() {
  if (categoryParam === 'popular') {
    return 'Popular Tvs'
  }
  if (categoryParam === 'top_rated') {
    return 'Top Rated Tvs'
  }
  if (categoryParam === 'trending') {
    return 'Trending Tvs'
  }
}

  // onMounted(async () => {
  //   console.log(movieStore.popularMoviesBucket)
  //   // moviesData.value = movieStore.movies
  //   moviesData.value = movieStore.popularMoviesBucket
  // })

  // caching on mounted bedebadah
  onMounted(async () => {
    switch (categoryParam) {
      case 'popular':
        console.log(tvStore.popularTvsBucket.length)
        if (!tvStore.popularTvsBucket.length) {
          await tvStore.popularTvs({
            page: tvStore.popularPageNumber
          })
        }
        tvsData.value = tvStore.popularTvsBucket
        tvStore.popularPageNumber++
        break
      case 'top_rated':
        if (!tvStore.topRatedTvsBucket.length) {
          await tvStore.topRatedTvs({
            page: tvStore.topRatedPageNumber}
          )
        }
        tvsData.value = tvStore.topRatedTvsBucket
        tvStore.topRatedPageNumber++
        break
      case 'trending':
        if (!tvStore.trendingTvsBucket.length) {
          await tvStore.trendingTvs({
            page: tvStore.trendingPageNumber
          })
        }
        tvsData.value = tvStore.trendingTvsBucket
        tvStore.trendingPageNumber++
        break
      default:
        throw createError({
          statusCode: 404,
          fatal: true,
        })
    }
  })


  async function popularMovies (page) {
    try {
      const { status, data, message } = await movieStore.popularMovies({
        page: page
      })
      return data.results
    } catch (e) {
      console.error(e)
      return []
    } finally {
    }
  }
  async function load ({ done }) {
    if (isLoading.value) return; 
    isLoading.value = true; 
    console.log("Loading movies...");

    switch(categoryParam){
      case 'popular':
        await tvStore.popularTvs({
            page: tvStore.popularPageNumber
          })
        tvsData.value = tvStore.popularTvsBucket
        tvStore.popularPageNumber++
        break
      case 'top_rated':
        await tvStore.topRatedTvs({
          page: tvStore.topRatedPageNumber
        })
        tvsData.value = tvStore.topRatedTvsBucket
        tvStore.topRatedPageNumber++
        break;
      case 'trending':
        await tvStore.trendingTvs({
          page: tvStore.trendingPageNumber
        })
        tvsData.value = tvStore.trendingTvsBucket
        tvStore.trendingPageNumber++
        break;
      default: 
        throw createError({
          statusCode: 404,
          fatal: true,
        })

    }

    isLoading.value = false; 
    done('ok')
  }
</script>

<!-- <style scoped>
.full-height {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
}

.flex-wrap {
  flex-grow: 1; /* Allow the row to grow and fill available space */
}

</style> -->
