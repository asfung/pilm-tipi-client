<template>
  <div>
    <!-- <h1>dsaads</h1>
        <v-btn :class="{ 'show-btn': false }" variant="text">dsad</v-btn> -->
    <v-carousel height="400" :show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <!-- <v-sheet :color="colors[i]" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </div>
          <v-img :src="'https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/dvBCdCohwWbsP5qAaglOXagDMtk.jpg'" :width="1850" :height="400" cover></v-img>
        </v-sheet> -->

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


    <!-- <CardItem /> -->
    <div class="mt-5 dark:text-white">
      <div class="border border-black">
        <!-- <p>{{ popularMoviesData }}</p> -->
         <v-row>
          <v-col>
            <!-- <h1 class="text-2xl font-bold mx-20">Popular Movies {{ $screen }}</h1> -->
            <h1 class="text-2xl font-bold mx-20 dark:text-blue-500">Selamat Datang, <span class="dark:text-white">{{user.name}}</span></h1>
          </v-col>
          <!-- <v-col class="text-right">
            <a href="http://localhost:3000/movie/category/popular"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col> -->
         </v-row>
      </div>

      <div class="border border-black">
        <!-- <p>{{ popularMoviesData }}</p> -->
         <v-row>
          <v-col>
            <!-- <h1 class="text-2xl font-bold mx-20">Popular Movies {{ $screen }}</h1> -->
            <h1 class="text-2xl font-bold mx-20">Popular Movies</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/movie/category/popular"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="popularMoviesData" :type="'movie'" :isLoading="loading" />
      </div>

      <div class="border border-black">
        <!-- <p>{{ popularMoviesData }}</p> -->
         <v-row>
          <v-col>
            <!-- <h1 class="text-2xl font-bold mx-20">Popular Movies {{ $screen }}</h1> -->
            <h1 class="text-2xl font-bold mx-20">Popular Tv Shows</h1>
          </v-col>
          <v-col class="text-right">
            <a href="http://localhost:3000/tv/category/popular"><h5 class="text-2xl font-bold mx-20">Explore</h5></a>
          </v-col>
         </v-row>
        <CarouselSlider :datas="popularTvsData" :type="'tv'" :isLoading="loading" />
      </div>

      <!-- <v-skeleton-loader class="dark:bg-black" :loading="true" height="240" type="image, list-item">
        <v-responsive>
          <v-img :src="src" class="rounded-lg mb-2" height="684" cover></v-img>

          <v-list-item :subtitle="subtitle" :title="title" class="px-0"></v-list-item>
        </v-responsive>
      </v-skeleton-loader> -->



      <!-- <div>
                <h1>Popular Movies</h1>
                <CarouselSlider />
            </div> -->
      <!-- <CarouselSlider />
            <CarouselSlider /> -->

    </div>

  </div>

</template>

<script setup>
import { useAuthStore } from '~/store/Auth';
const auth  = useAuthStore()
const games = ref([])

onMounted(async () => {
  // console.log('hello worldddd')
  // console.log(auth.test)
  // const response = await auth.games()
  // this.games.push(response)
  // console.log(response)

  // auth.games().then(() => {
  //   games.value = auth.data
  //   console.log(games.value)
  // })

})

definePageMeta({
  middleware: ['auth-middleware'],
})


</script>

<script>
// import { mapState } from 'vuex'
import { useHomeStore } from '~/store/Home';
import { useAuthStore } from '~/store/Auth';

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
      // https://image.tmdb.org/t/p/original
      popularMoviesData: useHomeStore().dataMovies,
      popularTvsData: useHomeStore().dataTvs,
      // slides: [
      //   'First',
      //   'Second',
      //   'Third',
      //   'Fourth',
      //   'Fifth',
      // ],
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
    console.log(this.loading)
    this.popularMovies()
    this.popularTvs()
    console.log(this.loading)
  },
  computed: {
  },
  methods: {
    async popularMovies(){
      const homeStore = useHomeStore()
      try{
        this.loading = true
        const {status, data, message} = await homeStore.popularMovies({
          page: 1,
        })
        // const results = data.results
        this.slides = this.popularMoviesData.slice(0, 5).map(movie => ({
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          title: movie.title,
          id: movie.id
        }))


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

    async popularTvs(){
      const homeStore = useHomeStore()
      try{
        this.loading = true
        const {status, data, message} = await homeStore.popularTvs({
          page: 1,
        })
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

    async fetchGames(){
      const homeStore = useHomeStore()
      await homeStore.homeFetch()
    }
  },
}
</script>

<style scoped>
.show-btn {
  color: rgba(255, 255, 255, 1) !important;
}
</style>