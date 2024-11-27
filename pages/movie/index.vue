<template>
  <div>
    <v-carousel height="400" :show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet
          :style="{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          height="100%">
          <div class="d-flex fill-height justify-start align-center bg-gradient-to-r w-11/12 from-gray-900 to-transparent">
            <div class="text-h4 m-2 text-white font-bold">
              <a :href="`http://localhost:3000/movie/${slide.id}`">{{ slide.title }}</a>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>


    <div class="mt-5 dark:text-white">
      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Popular Movies</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/movie/category/popular"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="popularMoviesData" :type="'movie'" :isLoading="loading" />
      </div>

      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Top Rated Movies</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/movie/category/top_rated"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="topRatedMoviesData" :type="'movie'" :isLoading="loading" />
      </div>

      <div class="border border-black">
         <v-row>
          <v-col>
            <h1 class="text-2xl font-bold mx-20">Trending Movies</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/movie/category/trending"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="trendingMoviesData" :type="'movie'" :isLoading="loading" />
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
import { useHomeStore } from '~/store/Home';
import { useAuthStore } from '~/store/Auth';
import { useMovieStore } from '~/store/Movie';

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
      popularMoviesData: useMovieStore().indexMovie.popular,
      topRatedMoviesData: useMovieStore().indexMovie.top_rated,
      trendingMoviesData: useMovieStore().indexMovie.trending,
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
    // await homeStore.homeFetch()
    // this.fetchGames()
    // if(useMovieStore().indexMovie.popular){
    //   this.popularMovies()
    // }
    // if(useMovieStore().indexMovie.top_rated){
    //   this.topRatedMovies()
    // }
    // if(useMovieStore().indexMovie.trending){
    //   this.trendingMovies()
    // }
    this.popularMovies()
    this.topRatedMovies()
    this.trendingMovies()
  },
  computed: {
  },
  methods: {
    async popularMovies(){
      const movieStore = useMovieStore()
      try{
        this.loading = true
        const {status, data, message} = await movieStore.popularMovies({
          page: 1,
        })
        this.slides = [data.results[0]].map(movie => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          title: movie.title,
          overview: movie.overview,
        }))
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },

    async topRatedMovies(){
      const movieStore = useMovieStore()
      try{
        this.loading = true
        const {status, data, message} = await movieStore.topRatedMovies({
          page: 1,
        })
        this.slides.push(...data.results.slice(0, 2).map(movie => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          title: movie.title,
          overview: movie.overview,
        })))
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },


    async trendingMovies(){
      const movieStore = useMovieStore()
      try{
        this.loading = true
        const {status, data, message} = await movieStore.trendingMovies({
          page: 1,
        })
        this.slides.push(...data.results.slice(0, 2).map(movie => ({
          // image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          title: movie.title,
          overview: movie.overview,
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