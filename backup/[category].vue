<template>
  <div>
    <v-infinite-scroll :height="1000" :items="moviesData" :onLoad="load">
      <v-row>
        <v-col v-for="(movie, index) in moviesData" :key="movie.id">
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

  // onMounted(async () => {
  //   console.log(movieStore.popularMoviesBucket)
  //   // moviesData.value = movieStore.movies
  //   moviesData.value = movieStore.popularMoviesBucket
  // })

  onMounted(async () => {
    switch (categoryParam) {
      case 'popular':
        if (!movieStore.popularMoviesBucket.length) {
          await movieStore.popularMovies({
            page: movieStore.popularPageNumber
          })
        }
        moviesData.value = movieStore.popularMoviesBucket
        break
      case 'top_rated':
        if (!movieStore.topRatedMoviesBucket.length) {
          await movieStore.topRatedMovies(movieStore.topRatedPageNumber)
        }
        moviesData.value = movieStore.topRatedMoviesBucket
        break
      case 'trending':
        if (!movieStore.trendingMoviesBucket.length) {
          await movieStore.trendingMovies(movieStore.trendingPageNumber)
        }
        moviesData.value = movieStore.trendingMoviesBucket
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
      // case 'popular':
      //   const res = await popularMovies(pageNumber)
      //   console.log(res.length)
      //   if (res.length > 0) {
      //     // moviesData.value.push(...res); 
      //     pageNumber++; 
      //   }
      //   break;
      case 'popular':
        if (movieStore.popularMoviesBucket.length) {
          moviesData.value = movieStore.popularMoviesBucket
          isLoading.value = false
          done('ok')
          return
        }
        // await movieStore.popularMovies(movieStore.popularPageNumber)
        // await movieStore.popularMovies({
        //   page: movieStore.popularPageNumber
        // })
        moviesData.value = movieStore.popularMoviesBucket
        // pageNumber++
        console.log(movieStore.popularPageNumber)
        movieStore.popularPageNumber++
        console.log(movieStore.popularPageNumber)
        break
      case 'top_rated':

        break;
      case 'trending':

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