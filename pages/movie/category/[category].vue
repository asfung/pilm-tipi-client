<template>
  <!-- <div class="full-height"> -->
  <div class="h-screen flex flex-col">
    <h1 class="dark:text-white mx-5 text-3xl my-2">{{ judul() }}</h1>
    <v-infinite-scroll :items="moviesData" :onLoad="load">
      <!-- <v-row class="flex-wrap"> -->
      <v-row class="flex flex-wrap">
        <!-- <v-col v-for="(movie, index) in moviesData" :key="movie.id"> -->
        <v-col v-for="(movie, index) in moviesData" :key="index" class="flex justify-center items-center p-2">
          <!-- <div class="dark:text-white border border-white">
            <v-img @click="null" href="www.google.com" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              height="335px" width="250px" cover />
            <p>{{ movie.original_title }}</p>
          </div> -->
          <CardItem :item="movie" :type="'movie'" />
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMovieStore } from '~/store/Movie';
const movieStore = useMovieStore()
const route = useRoute()
// in the future the pageNumber is saved into store, making load faster
let pageNumber = 1;
let isLoading = ref(false)
const categoryParam = route.params.category

const moviesData = ref([])
definePageMeta({
  middleware: ['auth-middleware'],
})

// onMounted(async () => {
//   console.log(movieStore.popularMoviesBucket)
//   // moviesData.value = movieStore.movies
//   moviesData.value = movieStore.popularMoviesBucket
// })

function judul(){
  if(categoryParam === 'popular'){
    return 'Popular Movies'
  }
  if(categoryParam === 'top_rated'){
    return 'Top Rated Movies'
  }
  if(categoryParam === 'trending'){
    return 'Trending Movies'
  }
}

// caching on mounted bedebadah
onMounted(async () => {
  switch (categoryParam) {
    case 'popular':
      console.log(movieStore.popularMoviesBucket.length)
      if (!movieStore.popularMoviesBucket.length) {
        await movieStore.popularMovies({
          page: movieStore.popularPageNumber
        })
      }
      moviesData.value = movieStore.popularMoviesBucket
      movieStore.popularPageNumber++
      break
    case 'top_rated':
      if (!movieStore.topRatedMoviesBucket.length) {
        await movieStore.topRatedMovies({
          page: movieStore.topRatedPageNumber
        }
        )
      }
      moviesData.value = movieStore.topRatedMoviesBucket
      movieStore.topRatedPageNumber++
      break
    case 'trending':
      if (!movieStore.trendingMoviesBucket.length) {
        await movieStore.trendingMovies({
          page: movieStore.trendingPageNumber
        })
      }
      moviesData.value = movieStore.trendingMoviesBucket
      movieStore.trendingPageNumber++
      break
    default:
      throw createError({
        statusCode: 404,
        fatal: true,
      })
  }
})


async function popularMovies(page) {
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
async function load({ done }) {
  if (isLoading.value) return;
  isLoading.value = true;
  console.log("Loading movies...");

  switch (categoryParam) {
    // case 'popular':
    //   const res = await popularMovies(pageNumber)
    //   console.log(res.length)
    //   if (res.length > 0) {
    //     // moviesData.value.push(...res); 
    //     pageNumber++; 
    //   }
    //   break;
    case 'popular':
      // if (movieStore.popularMoviesBucket.length) {
      //   moviesData.value = movieStore.popularMoviesBucket
      //   isLoading.value = false
      //   done('ok')
      //   return
      // }
      // await movieStore.popularMovies(movieStore.popularPageNumber)
      await movieStore.popularMovies({
        page: movieStore.popularPageNumber
      })
      moviesData.value = movieStore.popularMoviesBucket
      movieStore.popularPageNumber++
      break
    case 'top_rated':
      await movieStore.topRatedMovies({
        page: movieStore.topRatedPageNumber
      })
      moviesData.value = movieStore.topRatedMoviesBucket
      movieStore.topRatedPageNumber++
      break;
    case 'trending':
      await movieStore.trendingMovies({
        page: movieStore.trendingPageNumber
      })
      moviesData.value = movieStore.trendingMoviesBucket
      movieStore.trendingPageNumber++
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
