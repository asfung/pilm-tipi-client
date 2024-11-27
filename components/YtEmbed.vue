<template>
  <div class="">
    <iframe class='ql-video' frameborder='0' allowfullscreen='true'
      :src="`https://www.youtube.com/embed/${keySite}`"></iframe>
    <!-- <p>{{ item.name }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
    },
    keySite: {
    }
  },
}
</script>

<style scoped>
.ql-video {
  width: 100vh;
  height: 100vh;
}
</style>