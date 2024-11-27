<!-- <template>
  <div class="">
    <div class="">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies, Tvs..." required />
        <button type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
</script> -->


<template>
  <div class="">
    <div class="">
      <label for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search" v-model="searchValue" @input="handleInput"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies, Tvs..." required />
        <!-- <button @click.prevent="handleSearch"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useSearchStore } from '~/store/Search.js';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export default {
  setup() {
    const searchStore = useSearchStore();
    const router = useRouter();
    const searchValue = ref('');
    const timeout = ref(null);

    const handleInput = () => {
      // clearTimeout(timeout.value);
      // timeout.value = setTimeout(async () => {
      //   await searchStore.multiSearch(1);
      // }, 500);
      if (searchStore.searchValue) {
        router.push({ path: '/search', query: { q: searchStore.searchValue } });
      }
    };

    const handleSearch = () => {
      if (searchStore.searchValue) {
        router.push({ path: '/search', query: { q: searchStore.searchValue } });
      }
    };

    watch(searchValue, (newValue) => {
      searchStore.setSearchValue(newValue);
    });

    return {
      searchValue,
      handleInput,
      handleSearch,
    };
  },
};
</script>