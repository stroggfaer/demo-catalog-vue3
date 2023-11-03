<template>
  <div class="wrap"  >
    <h1>Graphql Users </h1>
    <el-card class="box-card" v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>Список пользователей</span>
        </div>
      </template>
      <div class="card-content" v-if="!loading">

        <div v-for="item in users" :key="item.id" class="text item">
          <router-link :to="`/graphql/${item.id}`">
              <div class="title">
                {{item.username}} ({{item.phone}})
              </div>
          </router-link>
        </div>

      </div>
      <p v-if="error">{{error}}</p>
    </el-card>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import { computed } from "vue";
import {USERS_QUERY} from "../../graphql/queries/getUsers";

export default {
  setup () {
    const { result, loading, error } = useQuery(USERS_QUERY);
    const users = computed(() => result.value.users ?? []);
    return {
      users,
      loading,
      error
    }
  }
}
</script>

<style scoped lang="scss">
  .box-card {
    a {
      color: $color-black-medium;
      text-decoration: auto;
    }
    .card-content {
      overflow: auto;
      max-height: 600px;
    }
    .item {
      display: flex;
      align-items: center;
      border: 1px solid $color-grey;
      margin-bottom: 5px;
      padding: 15px 5px;
      img {
        width: 40px;
      }
      .title {
        font-weight: bold;
        margin-left: 10px;
      }
      &:hover {
        background: $color-light-grey;
      }
    }
  }
</style>
