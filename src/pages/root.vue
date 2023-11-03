<template>
  <el-container class="wrap">
    <el-header><AppHeader></AppHeader></el-header>
    <el-container>
      <AppSidebar></AppSidebar>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">

import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";

export default {
  components: {AppHeader, AppSidebar},
}
</script>

<style scoped lang="scss">
</style>
