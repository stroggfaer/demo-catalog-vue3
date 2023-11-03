<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <button  @click="load()">Загрузить по клику</button>
      </div>
    </template>

      <div class="card-content">
        <div v-for="item in usersData?.users" :key="item.id" class="text item">
          <div class="image">
            <img :src="item.image" />
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
      <div class="example-pagination-block" v-if="usersData.total > 0">
        <el-pagination
            @current-change="handlePagination"
            layout="prev, pager, next"
            :total="usersData.total || 0"
            :current-page="page"
        />
      </div>


  </el-card>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import { useLazyQuery } from '@vue/apollo-composable'
import {USER_TEST_QUERY} from "../../graphql/queries/getUsersTest";



export default {

  setup () {

    const page = ref(1);
    const pageLimit = ref(10);

    // useLazyQuery
    const { result, loading, fetchMore,onResult, load } = useLazyQuery(USER_TEST_QUERY, {
      params: {
        limit: 10,
        skip: 0,  //page.value
      },
      variables: {},
    },{
      enabled: true,
    ///  fetchPolicy: "no-cache",
      nextFetchPolicy: "cache-first",
    });

    const usersData = computed(() => result?.value?.usersTest ?? []) ;

    // pagination запрос;
    function loadMore () {
      fetchMore({
        query: USER_TEST_QUERY,
        updateQuery:  (prev, { fetchMoreResult }) => {
          console.log('fetchMoreResult',fetchMoreResult);
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

    //
    onResult((result)=>{})

    //pagination
    function handlePagination( number) {
      page.value = number;
      loadMore();
    }

    onMounted(()=>{
      // load();
    })

    return {
      usersData,
      loading,
      handlePagination,
      load,
      page
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
