<template>
  <div class="body-header">
    <div class="block" >
      <div class="logo" @click="()=> $router.push('/')">
        <img width="30" src="@/assets/logo.svg" />
        <div class="title">Каталог</div>
      </div>
    </div>
    <div class="block flex">
<!--      <router-link to="'/card'">wert</router-link>-->
      <div class="card" @click="()=> $router.push('/cart')">
        <el-badge :value="cartCounts" class="item">
          <el-icon :size="30"><ShoppingCart /></el-icon>
        </el-badge>
      </div>
      <div class="user">
        <router-link to="/my">
           <el-icon :size="30"><User /></el-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useCart} from "@/stores/cart";
import {storeToRefs} from "pinia";
const cardStore = useCart();
const {cartCounts} = storeToRefs(cardStore);

</script>

<style scoped lang="scss">
  .body-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    height: 100%;
  .block {
    &.flex {
      display: flex;
      align-items: center;
    }
    .logo {
      cursor: pointer;
      display: flex;
      .title {
        @include font-size(24px, 32px, bold);
        color: $color-black;
        margin-left: 15px;
      }
    }
  }
  .card {
    cursor: pointer;
    position: relative;
  }
    .user {
      cursor: pointer;
      margin-left: 20px;
    }

}
</style>
