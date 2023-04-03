<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-top>
      <div class="top">
        <!-- {{ title }} -->
        <!-- <img class="img" src="https://pic.kblue.site/picgo/iTab-WMPmZN_1VE8.jpeg" alt="" srcset=""> -->
      </div>
    </template>
  </Layout>
</template>
<style scoped>
.top {
  padding: 0 32px 0px;
  box-sizing: border-box;
  padding-bottom: 30px;
}

@media (min-width: 1280px) {
  .top {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.img {
  width: 78%;
  height: 250px;
}
</style>