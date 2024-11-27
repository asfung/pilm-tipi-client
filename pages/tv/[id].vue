<template>
  <div class="dark:text-white">
    <Hero v-if="tvData" :item="tvData" :type="'tv'" />
    <v-tabs
      v-if="tvData"
      v-model="tab"
      align-tabs="center"
      class="text-blue-500"
    >
      <v-tab :value="1">Overview</v-tab>
      <v-tab :value="2">Videos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" v-if="tvData">
      <v-tabs-window-item :value="1">
        <v-container fluid>
          <v-row>
            <v-col>
              <Overview :item="tvData" :type="'tv'" /> 
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      
      <v-tabs-window-item :value="2">
        <v-container fluid>
          <v-row>
            <v-col v-for="(item, index) in tvData.videos.results" :key="index">
              <!-- <p>{{item}}</p> -->
               <!-- <YtEmbed :item="item" /> -->
              <VideoItem :item="item" />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- <p>{{ tvData }}</p> -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth-middleware'],
})
</script>

<script>
import { useMovieStore } from '~/store/Movie';
import { useTvStore } from '~/store/Tv';
export default {
  // async asyncData({ params, query }) {
  //   const dokumen_id = params.dokumen_id;
  //   const uri = query.uri;
  //   return { dokumen_id, uri };
  // },
  mounted() {
    this.getTv()
    console.log('dsadsa')
    // console.log(this.$route.params.id)
  },
  data(){
    return {
      tab: null, 
      loading: false,
      tvState: useTvStore().tv,
      tvData: null,
    }
  },
  computed: {
    getParamId(){
      return this.$route.params.id
    },
  },
  methods: {
    async getTv(){
      const tvStore = useTvStore()
      try{
        this.loading = true
        const {status, data, message} = await tvStore.getTv({
          tv_id: this.$route.params.id,
        })
        this.tvData = data
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