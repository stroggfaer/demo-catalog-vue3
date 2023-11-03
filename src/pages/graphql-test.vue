<template>
  <div class="wrap"  >
    <h1>Graphql test </h1>
    <el-card class="box-card" v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>Список продуктов</span>
        </div>
      </template>
      <div class="card-content" v-if="!loading">
        <div v-for="item in products" :key="item.id" class="text item">
          <div class="image">
            <img :src="item.image" />
          </div>
          <div class="title">
            {{item.title}}
            <div class="rating">
              <el-rate
                  disabled
                  show-score
                  v-model="item.rating.rate"
                  score-template="{value}"
              />
            </div>
          </div>
        </div>
      </div>
      <p v-if="error">{{error}}</p>
    </el-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useQuery } from '@vue/apollo-composable'
import {PRODUCTS_QUERY} from "../graphql/queries/getProducts";

export default {
  name: "graphql-test",
  setup () {

    const { result, loading, error } = useQuery(PRODUCTS_QUERY,{
      params: {
        limit: 5,
        page: 2,
        id: 2
      },
      ep: true
    });

    const products = computed(() => result.value.products ?? []);

    return {
      products,
      loading,
      error
    }
  }
}
</script>

<style scoped lang="scss">
  .box-card {

    .card-content {
      overflow: auto;
      max-height: 600px;
    }
      .item {
        display: flex;
        align-items: center;
        border: 1px solid $color-grey;
        margin-bottom: 5px;
        padding: 5px;
        img {
          width: 40px;
        }
        .title {
          font-weight: bold;
          margin-left: 10px;
        }
      }
  }
</style>
