<template>
  <div>
    <div class="relative " @click="overlay = !overlay">
      <v-img @click="openOverlay(item)" :src="`https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`" width="300"
        class="cursor-pointer duration-300 hover:scale-105">
        <!-- <div class="absolute inset-0 flex justify-center items-center">
        <span class="text-white text-3xl">▶</span>
      </div> -->
        <div class="absolute inset-0 flex justify-center items-center duration-200 hover:scale-125">
          <span class="text-white text-3xl transition-transform">▶</span>
        </div>
      </v-img>
      <p>{{item.name}}</p>
    </div>

    <!-- <div>
      <div class="text-center">
        <v-btn color="error" @click="overlay = !overlay">
          Show Overlay
        </v-btn>

        <v-overlay v-model="overlay">
          <OverlayYoutube :item="item" :keySite=item.key />
        </v-overlay>
      </div>
    </div> -->

    <div>
      <v-overlay v-model="overlay">
        <!-- <OverlayYoutube :item="item" :keySite=item.key /> -->
        <div class="flex justify-center dark:text-white border border-white w-full h-full">
          <!-- {{ item }} -->
          <OverlayYoutube :item="item" :keySite=item.key />
        </div>
      </v-overlay>
    </div>

  </div>

</template>

<!-- <template>
  <div class="relative">
    <v-img
      @click="openOverlay(item)"
      :src="`https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`"
      width="300"
      class="cursor-pointer"
    >
      <div class="absolute inset-0 flex justify-center items-center">
        <span class="text-white text-3xl transition-transform duration-200 hover:scale-125">▶</span>
      </div>
    </v-img>
  </div>
</template> -->

<script>
export default {
  data(){
    return {
      overlay: false,
      itemOverlay: null,
      itemOverlayShow: false,
    }
  },
  props: {
    item: {
    }
  },
  methods: {
    openOverlay(item){
      // console.log(item)
      this.itemOverlayShow = !this.itemOverlayShow
      this.itemOverlay = item
    },
  },
}
</script>