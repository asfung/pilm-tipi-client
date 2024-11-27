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
import { ref, onMounted } from 'vue';
import { useMovieStore } from '~/store/Movie';
const movieStore = useMovieStore();
const route = useRoute();
const isLoading = ref(false);
const categoryParam = route.params.category;
const moviesData = ref([]);

// Load initial data on component mount
onMounted(async () => {
  await loadInitialData();
});

// Function to load initial data based on category
async function loadInitialData() {
  switch (categoryParam) {
    case 'popular':
      if (!movieStore.popularMoviesBucket.length) {
        // await movieStore.popularMovies(movieStore.popularPageNumber);
        // await movieStore.popularMovies({
        //   page: movieStore.popularPageNumber
        // })
      }
      moviesData.value = movieStore.popularMoviesBucket;
      break;
    case 'top_rated':
      if (!movieStore.topRatedMoviesBucket.length) {
        await movieStore.topRatedMovies(movieStore.topRatedPageNumber);
      }
      moviesData.value = movieStore.topRatedMoviesBucket;
      break;
    case 'trending':
      if (!movieStore.trendingMoviesBucket.length) {
        await movieStore.trendingMovies(movieStore.trendingPageNumber);
      }
      moviesData.value = movieStore.trendingMoviesBucket;
      break;
    default:
      throw createError({ statusCode: 404, fatal: true });
  }
}

// Load more data when scrolling
async function load({ done }) {
  if (isLoading.value) return;
  isLoading.value = true;

  let newMovies = [];
  switch (categoryParam) {
    case 'popular':
      console.log(movieStore.popularPageNumber)
      // newMovies = await movieStore.popularMovies(movieStore.popularPageNumber);
      newMovies =   await movieStore.popularMovies({
        page: movieStore.popularPageNumber
      })
      console.log('Before Increment:', movieStore.popularPageNumber);
      if (newMovies.length > 0) {
        moviesData.value.push(...newMovies); // Append new data
        // movieStore.popularPageNumber++; // Increment page number
        // movieStore.commit('incrementPopularPageNumber');
        movieStore.incrementPopularPageNumber(); // Call action directly
      }
      console.log('After Increment:', movieStore.popularPageNumber);
      break;
    case 'top_rated':
      newMovies = await movieStore.topRatedMovies(movieStore.topRatedPageNumber);
      if (newMovies.length > 0) {
        moviesData.value.push(...newMovies);
        // movieStore.topRatedPageNumber++;
        movieStore.commit('incrementtopRatedPageNumber');
      }
      break;
    case 'trending':
      newMovies = await movieStore.trendingMovies(movieStore.trendingPageNumber);
      if (newMovies.length > 0) {
        moviesData.value.push(...newMovies);
        // movieStore.trendingPageNumber++;
        movieStore.commit('incrementTrendingPageNumber');
      }
      break;
    default:
      throw createError({ statusCode: 404, fatal: true });
  }

  console.log('Current Page Number:', movieStore.popularPageNumber);

  isLoading.value = false;
  done(newMovies.length > 0 ? 'ok' : 'no more'); // Indicate if more data is available
}
</script>
