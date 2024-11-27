<template>
  <div class="h-full w-full">
    <YtEmbed :item="item" :keySite="keySite" />
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props: {
    keySite: {
    },
    item: {
    }
  }
}
</script>