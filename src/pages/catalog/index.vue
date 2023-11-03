<template>
  <div v-loading="getLoading" class="catalog wrap">
    <h1>Каталог</h1>
    <el-row :gutter="20">
      <el-col
          v-for="(item, index) in catalog"
          :key="index"
          :span="6"
          :style="{marginBottom: '20px', cursor: 'pointer'}"
      >
        <el-card :key="index" :body-style="{ padding: '0px'}">
          <el-image :src="item.image" lazy cover :fit="'contain'" style="height: 200px; width: 100%;" @click="()=> $router.push(`/catalog/${item.id}`)">
            <template #error>
              <div class="image-slot">
                Загрузка...
              </div>
            </template>
          </el-image>

          <div style="padding: 14px">
            <div class="name" >{{item.title}}</div>
            <div class="bottom">
              <div class="price bold">{{item.price}} руб.</div>
              <el-button type="primary" :disabled="isProductsCart(item.id)"  :icon="ShoppingCart" @click="handleAddCart(item)">{{isProductsCart(item.id) ? 'Добавлен' : 'Добавить'}}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">

import {useCatalog} from "@/stores/catalog";
import {storeToRefs} from "pinia";
import {nextTick, onMounted, computed} from "vue";
import {ShoppingCart } from '@element-plus/icons-vue'
import {useCart} from "@/stores/cart";
import type {ProductsModel} from "@/models";

export default {
  setup() {
    const store = useCatalog();
    const cardStore = useCart();
    const { catalog, getLoading } = storeToRefs(store)
    const { isProductsCart } = storeToRefs(cardStore)

    // Методы;
    function handleAddCart (product: ProductsModel) {
       cardStore.addCart(product);
    }

    onMounted(() => {
      nextTick(async () => {
        if(!store.data.length) {
          await store.fetchCatalog();
        }
      });
    });
    // isProductsCart(item.id)
    return {
      ShoppingCart,
      catalog,
      getLoading,
      handleAddCart,
      isProductsCart
    }
  }
}
</script>

<style scoped lang="scss">

  .name {
    height: 40px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }
</style>
