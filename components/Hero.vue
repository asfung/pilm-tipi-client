<template>
  <!--
    Heads up! 👋
  
    This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
  -->
  <!-- class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat" -->

  <section class="relative bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }">
    <div
      class="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-white/35 sm:to-white/10 dark:sm:from-black/95 dark:sm:to-black/10 bg-gradient-to-r">
    </div>

    <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
      <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <h1 class="text-3xl font-extrabold dark:text-white sm:text-5xl">
          <!-- <strong class="block font-extrabold text-rose-500"> Forever Home. {{ `https://image.tmdb.org/t/p/original${item.backdrop_path}` }} </strong> -->
          <a :href="item.homepage"><strong class="block font-extrabold dark:text-white"> {{ item.title ? item.title : item.name  }}
            </strong></a>
        </h1>

        <p class="mt-4 max-w-lg dark:text-white sm:text-xl/relaxed">
          <v-row class="">
            <v-col class="text-right">
              <v-rating :length="5" density="compact" size="large" :model-value="item.vote_average / 2" active-color="primary" readonly /> 
            </v-col>
            <v-col class="text-left">
              <p class="text-blue-500">{{ item.vote_average }}</p>
            </v-col>
          </v-row>
        </p>

        <p class="max-w-lg dark:text-white sm:text-xl/relaxed text-left">
          {{item.tagline ? item.tagline : ''}}
        </p>

        <div class="mt-8" v-for="(video, index) in item.videos.results" :key="index">
          <!-- <p v-if="video.name === 'Official Trailer'">{{ video }}</p> -->
          <a v-if="video.name === 'Official Trailer' && type === 'movie'" :href="`https://www.youtube.com/watch?v=${video.key}`" target="_blank"
            class="block w-full rounded bg-gray-600/50 hover:bg-gray-600/90 px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto">
            Watch Trailer
          </a>
        </div>

        <div class="mt-8" v-if="type === 'tv'">
          <a v-if="firstVideoTrailer.site === 'YouTube'" :href="`https://www.youtube.com/watch?v=${firstVideoTrailer.key}`" target="_blank"
            class="block w-full rounded bg-gray-600/50 hover:bg-gray-600/90 px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto">
            Watch Trailer
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // bgUrl: `https://image.tmdb.org/t/p/original${this.item.backdrop_path}`
    };
  },
  computed: {
    firstVideoTrailer(){
      return this.item.videos.results[0]
    }
  },
  props: {
    item: {
    },
    type: {
    }
  }
};
</script>
