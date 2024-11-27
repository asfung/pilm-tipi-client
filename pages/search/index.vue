<template>
  <div class="dark:text-white h-screen flex flex-col">
    <h1>nyariii : {{ $route.query.q }}</h1>
    <!-- <v-infinite-scroll :items="searchResults" :onLoad="load">
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        <p>{{ result.title }} => {{ result.media_type }}</p>
      </li>
    </ul>
    </v-infinite-scroll> -->
    <v-infinite-scroll :size="searchResults.length * 100" :items="searchResults" :onLoad="load">
      <!-- <v-row class="flex-wrap"> -->
      <v-row class="flex flex-wrap">
        <!-- <v-col v-for="(movie, index) in moviesData" :key="movie.id"> -->
        <v-col v-for="(item, index) in searchResults" :key="index" class="flex justify-center items-center p-2">
          <!-- <div class="dark:text-white border border-white">
            <v-img @click="null" href="www.google.com" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              height="335px" width="250px" cover />
            <p>{{ movie.original_title }}</p>
          </div> -->
          <!-- <p>{{ item.title }}</p> -->
          <CardItem :item="item" :type="item.media_type" />
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useSearchStore } from '~/store/Search.js';
// import { useRoute } from 'vue-router';

definePageMeta({
  middleware: ['auth-middleware'],
})

const searchStore = useSearchStore();
const route = useRoute();
let isLoading = ref(false)
let pageNumber = 1;

const searchResults = ref([]);
const searchQuery = ref(route.query.q || '');

const fetchSearchResults = async () => {
  try {
    const data = await searchStore.multiSearch(pageNumber);
    const filteredResults = searchStore.filterResults(data);
    searchResults.value = filteredResults;
    // pageNumber++;
  } catch (error) {
    console.error(error);
  }
};

// async function load({ done }) {
//   if (isLoading.value) return;
//   isLoading.value = true;
//   console.log("Loading ...");

//   const newQuery = route.query.q;
//   if (newQuery && newQuery !== searchQuery.value) {
//     searchQuery.value = newQuery; 
//     fetchSearchResults();
//   }

//   // pageNumber++;
//   isLoading.value = false;
//   done('ok')
// }

async function load({ done }) {
  if (isLoading.value) return;
  isLoading.value = true;
  console.log("Loading ...");

  // stupid ass, must placed in here too ,  first placed
  if (searchQuery.value !== route.query.q) {
    console.log('beda query')
    searchQuery.value = route.query.q;
    pageNumber = 1
    // pageNumber++;
    await fetchSearchResults(); 
  } else {
    console.log('masih browsing')
    const data = await searchStore.multiSearch(pageNumber);
    const filteredResults = searchStore.filterResults(data);
    searchResults.value = [...searchResults.value, ...filteredResults];
    pageNumber++;
    // pageNumber = 1
  }

  isLoading.value = false;
  done();
}


watchEffect(() => {
  const newQuery = route.query.q;

  // chad being chaddddd...., second placed
  if (searchQuery.value !== route.query.q) {
    pageNumber = 1
  } else {
    pageNumber++;
  }

  if (newQuery && newQuery !== searchQuery.value) {
    searchQuery.value = newQuery;
    fetchSearchResults(); 
    // load()
  }
});
</script>
