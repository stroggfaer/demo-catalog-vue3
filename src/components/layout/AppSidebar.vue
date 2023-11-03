<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu
          class="el-menu-vertical"
          router
          :default-active="routePath"
      >
        <el-menu-item
            :key="1"
            :index="'/'"
        >
          <template v-slot:title >
            <span>Главная</span>
          </template>
        </el-menu-item>
        <el-menu-item
            :key="2"
            :index="'/catalog'"
        >
          <template v-slot:title >
            <span>Каталог</span>
          </template>
        </el-menu-item>

<!--        <el-menu-item-->
<!--            :key="2"-->
<!--            :index="'/graphql-test'"-->
<!--        >-->
<!--          <template v-slot:title >-->
<!--            <span>Graphql test</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item-->
<!--            :key="3"-->
<!--            :index="'/graphql'"-->
<!--        >-->
<!--          <template v-slot:title >-->
<!--            <span>Graphql</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->

        <el-menu-item
            :key="3"
            :index="'/users'"
        >
          <template v-slot:title >
            <span>Users</span>
          </template>
        </el-menu-item>


      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import { useRoute } from 'vue-router';

const routePath = computed(() => {
  const route  = useRoute().path;
  if(route === '/') {
    return '/'
  }else{
    return '/' + route.split('/').filter(element => element !== '').shift();
  }
})

</script>

<style scoped lang="scss">
.el-aside {
  color: $color-black-normal;
  text-align: left;
  position: relative;
  background: $color-blue-lite;
}
.el-menu {
  z-index: 100;
  border-right: none;
  background: transparent;
  padding: 20px 0px 0px 0px;
  :deep(.el-menu-item) {
    @include ease();

    &:hover {
      background: transparent;
      color: $color-blue-normal;
    }
    &.is-active{
      background: $color-blue-normal;
      color: #fff;
    }
  }
}
</style>
