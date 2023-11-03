<template>
  <div v-loading="loading" class="wrap">
    <el-breadcrumb v-if="!loading" style="margin-bottom: 30px">
      <el-breadcrumb-item :to="{ path: '/catalog' }">Каталог</el-breadcrumb-item>
      <el-breadcrumb-item>{{product?.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="product" class="card">
      <div class="image">
        <el-image :src="product.image" lazy   style="width: 200px;">
          <template #error>
            <div class="image-slot">
               Загрузка...
            </div>
          </template>
        </el-image>
      </div>
      <div class="content">
        <h1 class="name">{{product.title}}</h1>
        <div class="bottom">
          <div class="price bold">{{product.price}} руб.</div>
          <el-button type="primary" :disabled="isProductsCart(product.id)" :icon="ShoppingCart" @click="handleAddCart(product)">{{isProductsCart(product.id) ? 'Добавлен' : 'Добавить'}}</el-button>
        </div>
        <div class="description" v-html="product.description"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Picture as IconPicture, ShoppingCart} from '@element-plus/icons-vue'
import {useCart} from "@/stores/cart";
import {computed, nextTick, onMounted, ref} from "vue";
import type {ProductsModel} from "@/models";
import {Api} from "@/compositions/api";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";

export default {
  setup() {
    const cardStore = useCart();
    const route = useRoute();
    const {isProductsCart} = storeToRefs(cardStore);

    const loading = ref(true);
    const product = ref<ProductsModel>() as any;

    const routeParamId = computed(() => route?.params?.id);

    function handleAddCart (product: ProductsModel) {
      cardStore.addCart(product);
    }

    onMounted(() => {
      nextTick(async () => {
        loading.value = true;
        product.value = await Api().fetchData(`/products/${routeParamId.value}`);
        loading.value = false;
      });
    });

    return {
      loading,
      product,
      ShoppingCart,
      IconPicture,
      handleAddCart,
      isProductsCart
    }
  }
}
</script>

<style scoped lang="scss">
  .card {
    display: flex;
    .image {
       img {
         width: 200px;
       }
    }
    .price {
      padding: 10px 0px;
      font-size: 24px;
    }
    .description {
      font-size: 16px;
      margin-top: 40px;
    }
  }
</style>
