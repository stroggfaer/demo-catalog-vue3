<template>
  <el-container class="wrap">
    <el-header><AppHeader></AppHeader></el-header>
    <el-container>
      <AppSidebar></AppSidebar>
      <el-main>
        <div class="text-center-flex">
          <div class="t_404">404</div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">

import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";

import { ref } from 'vue'
export default {
  components: {AppHeader, AppSidebar},
  setup() {
    return {};
  },
}
</script>

<style scoped lang="scss">
.t_404 {
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  width: 100%;
}
</style>

