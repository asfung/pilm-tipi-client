<template>
  <div class="dark:text-white">
    <Hero v-if="movieData" :item="movieData" :type="'movie'" />
    <v-tabs
      v-if="movieData"
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">Overview</v-tab>
      <v-tab :value="2">Videos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" v-if="movieData">
      <v-tabs-window-item :value="1">
        <v-container fluid>
          <v-row>
            <v-col>
              <Overview :item="movieData" :type="'movie'" /> 
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      
      <v-tabs-window-item :value="2">
        <v-container fluid>
          <v-row>
            <v-col v-for="(item, index) in movieData.videos.results" :key="index">
              <!-- <p>{{item}}</p> -->
               <!-- <YtEmbed :item="item" /> -->
              <VideoItem :item="item" />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- <v-slide-group v-if="movieData" class="pa-2" selected-class="bg-primary" show-arrows>
      <v-slide-group-item v-for="(cast, index) in movieData.credits.cast" :key="index">
        <CastItem :cast="cast" />
      </v-slide-group-item>
    </v-slide-group> -->
    
    <!-- <h1>{{ getParamId }}</h1>
    <p>{{ movieData }}</p> -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth-middleware'],
})
</script>

<script>
import { useMovieStore } from '~/store/Movie';
export default {
  // async asyncData({ params, query }) {
  //   const dokumen_id = params.dokumen_id;
  //   const uri = query.uri;
  //   return { dokumen_id, uri };
  // },
  mounted() {
    this.getMovie()
    console.log('dsadsa')
  },
  data(){
    return {
      tab: null, 
      loading: false,
      movieState: useMovieStore().movie,
      movieData: null,
    }
  },
  computed: {
    getParamId(){
      return this.$route.params.id
    },
  },
  methods: {
    async getMovie(){
      const movieStore = useMovieStore()
      try{
        this.loading = true
        const {status, data, message} = await movieStore.getMovie({
          movie_id: this.$route.params.id,
        })
        this.movieData = data
        // console.log(data)
        // const {status, data, message} = await movieStore.getMovie()
        // console.log(data)
        // this.popularMoviesData.push(...data.results)
        // console.log(...data)
        // this.popularMoviesData.push(...data)
        // console.log(this.popularMoviesData)
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },
  },
}
</script>