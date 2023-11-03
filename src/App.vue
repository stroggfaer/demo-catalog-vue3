<template>
  <div class="layouts-wrap">
     <router-view/>
  </div>
</template>

<script setup lang="ts">

</script>
<style  lang="scss">

html {
  font-family: 'Lato', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: $color-black-normal;
  background:$color-grey-lite;
}
body {
  margin: 0;
  padding: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.layouts-wrap {
  min-width: 375px;
  height: 100vh; // sroll
  margin: auto;
  padding: 0px 0 5px;
}
.el-header {
  background: $color-white;
}
.wrap{
  height: 100%;
}
.content {
  margin-top: 0px;
  padding-left: 35px;
  min-height: 600px;
}
</style>
