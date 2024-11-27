<template>
  <div>
    <v-carousel height="400" :show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet
          :style="{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          height="100%">
          <div class="d-flex fill-height justify-start align-center bg-gradient-to-r w-11/12 from-gray-900 to-transparent">
            <div class="text-h4 m-2 text-white font-bold">
              <!-- {{ slide.title }} -->
              <a :href="`http://localhost:3000/tv/${slide.id}`">{{ slide.title }}</a>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>


    <div class="mt-5 dark:text-white">
      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Popular Tvs</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/tv/category/popular"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="popularTvsData" :type="'tv'" :isLoading="loading" />
      </div>

      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Top Rated Tvs</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/tv/category/top_rated"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="topRatedTvsData" :type="'tv'" :isLoading="loading" />
      </div>

      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Trending Tvs</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/tv/category/trending"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="trendingTvsData" :type="'tv'" :isLoading="loading" />
      </div>

    </div>

  </div>

</template>

<script setup>
import { useAuthStore } from '~/store/Auth';
const auth  = useAuthStore()
const games = ref([])

onMounted(async () => {
})

definePageMeta({
  middleware: ['auth-middleware'],
})


</script>

<script>
// import { mapState } from 'vuex'
import { useAuthStore } from '~/store/Auth';
import { useTvStore } from '~/store/Tv';

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      loading: false,
      popularTvsData: useTvStore().indexTv.popular,
      topRatedTvsData: useTvStore().indexTv.top_rated,
      trendingTvsData: useTvStore().indexTv.trending,
      slides: [
        // { image: 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg' },
        // { image: 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg' },
        // { image: 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg' },
        // { image: 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg' },
        // { image: 'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg' },
      ],

    }
  },
  mounted(){
    this.popularTvs()
    this.topRatedTvs()
    this.trendingTvs()
  },
  computed: {
  },
  methods: {
    async popularTvs(){
      const tvStore = useTvStore()
      try{
        this.loading = true
        const {status, data, message} = await tvStore.popularTvs({
          page: 1,
        })
        this.slides = [data.results[0]].map(tv => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: tv.id,
          image: `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
          title: tv.name,
          overview: tv.overview,
        }))
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },

    async topRatedTvs(){
      const tvStore = useTvStore()
      try{
        this.loading = true
        const {status, data, message} = await tvStore.topRatedTvs({
          page: 1,
        })
        this.slides.push(...data.results.slice(0, 2).map(tv => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: tv.id,
          image: `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
          title: tv.name,
          overview: tv.overview,
        })))
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },


    async trendingTvs(){
      const tvStore = useTvStore()
      try{
        this.loading = true
        const {status, data, message} = await tvStore.trendingTvs({
          page: 1,
        })
        this.slides.push(...data.results.slice(0, 2).map(tv => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: tv.id,
          image: `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
          title: tv.name,
          overview: tv.overview,
        })))
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },
    
  },
}
</script>

<style scoped>
.show-btn {
  color: rgba(255, 255, 255, 1) !important;
}
</style>