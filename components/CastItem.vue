<template>
  <div class="ma-2">
    <!-- {{ cast }} -->
    <v-card class="dark:bg-black dark:text-white">
          <v-img
           @click="null"
           href="www.google.com" :src="`https://image.tmdb.org/t/p/original${cast.profile_path}`" height="335px"
            width="250px" cover>
          </v-img>
          <v-card-text class="max-w-64">
            <!-- <a :href="type === 'movie' ? `http://localhost:3000/movie/${item.id}` : `http://localhost:3000/tv/${item.id}`"><p>{{ type === 'movie' ? item.title : item.name}}</p></a> -->
             <p class="font-bold">{{ cast.name }}</p>
             <p class="text-gray-500 font-bold">{{ cast.character }}</p>
          </v-card-text>
        </v-card>
  </div>
</template>

<script>
export default {
  props: {
    cast: {
    }
  }
}
</script>