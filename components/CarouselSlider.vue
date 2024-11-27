<template>
  <div>
    <!-- <p class="overflow-x-auto max-w-20">{{ dataFilms?.length }} dsalmdlaskmldaskmdasmldsmsa</p> -->
    <!-- <p>{{ isLoading }}</p> -->
    <v-slide-group class="pa-4" selected-class="bg-primary" show-arrows>
      <!-- <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }"> -->
      <!-- <v-slide-group-item style="overflow-x: auto; max-height: 200px;" v-for="itemfilm in dataFilms?.length" :key="itemfilm"> -->
      <v-slide-group-item v-for="(itemfilm, index) in datas" :key="index">
        <CardItem :item="itemfilm" :type="type" :isLoading="isLoading" />
      </v-slide-group-item>
      <v-slide-group-item v-for="(itemfilm, index) in 20" :key="index">
        <CardItemLoading :isLoading="isLoading" />
      </v-slide-group-item>
    </v-slide-group>

    <!-- <v-expand-transition>
      <v-sheet v-if="model != null" height="200">
        <div class="d-flex fill-height align-center justify-center">
          <h3 class="text-h6">
            Selected {{ model }}
          </h3>
        </div>
      </v-sheet>
    </v-expand-transition> -->
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      // type: any,
    },
    type: {
    },
    isLoading: {
    },
  },
  data(){
    return {
      model: null,
    }
  }
}
</script>
