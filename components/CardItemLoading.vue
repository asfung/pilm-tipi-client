<!-- <v-card :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 12 : 2" class="dark:bg-black dark:text-white" v-bind="props"> -->
<template>
  <div class="ma-1">
    <v-skeleton-loader 
      class="dark:bg-black"
      :loading="isLoading" 
      :height="240" 
      :width="240" 
      type="image"
      >
      <!-- <v-hover v-slot="{ isHovering, props }" open-delay="200">
        <v-card class="dark:bg-black dark:text-white" v-bind="props">
          <v-img href="www.google.com" :src="``" height="335px"
            width="250px" cover>
            <div class="ma-2">
              <v-icon icon="mdi-bookmark" size="x-large" :color="isHovering ? 'primary' : 'transparent'"
                @click="null"></v-icon>
            </div>
            <v-card-title class="text-h6 text-white d-flex flex-column">
            </v-card-title>
          </v-img>
          <v-card-text class="">
            <p>LOADING</p>
          </v-card-text>
        </v-card>
      </v-hover> -->
    </v-skeleton-loader>

    <v-skeleton-loader 
      class="dark:bg-black"
      :loading="isLoading" 
      type="list-item"
      ></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {

    },
  },
}
</script>

