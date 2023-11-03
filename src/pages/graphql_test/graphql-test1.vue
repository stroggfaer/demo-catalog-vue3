<template>
  <div class="wrap"  >
    <h1>Graphql test 1</h1>
    <el-switch v-model="isLazy" />
    <el-card v-if="!isLazy"  class="box-card" v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>Список пользвателей </span>
          <button v-if="!isLazy" @click="handleRefetch()">Сбросить</button>
          <button v-if="!isLazy" @click="loadMore()">Перезагрузить</button>
        </div>
      </template>
      <template v-if="!isLazy">
          <div class="card-content">
            <div v-for="item in usersData.users" :key="item.id" class="text item">
              <div class="image">
                <router-link :to="`/graphql-test-1/${item.id}`">
                    <img :src="item.image" />
                </router-link>
              </div>
              <div class="title">
                id: <b>{{item.id}}</b><br>
                Лгоин: {{item.username}}<br>
                Возрасть: {{item.ageName}}<br>
                День рождения: {{item.birthDate}}<br>
                Номер карты: {{item.bank.cardNumber}}<br>
              </div>
            </div>
          </div>
          <div class="example-pagination-block">
            <el-pagination
                @current-change="handlePagination"
                layout="prev, pager, next"
                :total="usersData.total || 0"
                :current-page="page"
            />
          </div>
      </template>

      <p v-if="error">{{error}}</p>
    </el-card>
    <template v-else>
      <AppUserCard></AppUserCard>
    </template>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import { useQuery, useLazyQuery } from '@vue/apollo-composable'


import {USER_TEST_QUERY} from "../../graphql/queries/getUsersTest";
import AppUserCard from "../../components/shared/AppUserCard.vue";


export default {
  name: "graphql-test",
  components: {AppUserCard},
  setup () {

    const isLazy = ref(false);
    const page = ref(1);
    const pageLimit = ref(10);

    // useLazyQuery
    const { result, loading, error, refetch, onResult, fetchMore } = useQuery(USER_TEST_QUERY, {
      params: {
        limit: 10,
        skip: 0,  //page.value
      },
      variables: {},
    },{
      enabled: true,
    //  fetchPolicy: "no-cache",
      nextFetchPolicy: "cache-first", // повторно не слал запрос
    });


    const usersData = computed(() => result?.value?.usersTest ?? []) ;

    // pagination запрос;
    function loadMore () {
      fetchMore({
       query: USER_TEST_QUERY,
        updateQuery:  (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign({}, prev, fetchMoreResult);
        },
        variables: {
          params: {
            limit: 10,
            skip: (page.value - 1) * pageLimit.value  //page.value
          },
        }
      })
    }
    watch(isLazy, (value) => {
       refetch();
    });
    //  refetch
    function handleRefetch( ) {
       page.value = 1;
       refetch();
    }

    //pagination
    function handlePagination( number) {
      page.value = number;
      loadMore();
    }

    //
    onResult((result)=>{
       console.log('result',result.data);
    })

    onMounted(()=>{
      // load();
    })

    return {
      usersData,
      loading,
      error,
      handleRefetch,
      handlePagination,
      page,
      result,
      loadMore,
      isLazy,
    }
  }
}
</script>

<style scoped lang="scss">
  .example-pagination-block + .example-pagination-block {
    margin-top: 10px;
  }
  .example-pagination-block .example-demonstration {
    margin-bottom: 16px;
  }
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
          margin-left: 10px;
        }
      }
  }
</style>
