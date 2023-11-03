<template>
  <div class="wrap" >
    <el-breadcrumb style="margin-bottom: 30px">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/graphql' }">Список пользователей</el-breadcrumb-item>
      <el-breadcrumb-item>{{loading ?  'Загрузка' : user?.username}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 v-if="!loading && user" >{{user?.username}}</h1>
    <h1 v-else>Загрузка</h1>

    <el-card class="box-card" v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>Карточка</span>
        </div>
      </template>
      <div class="card-content" v-if="!loading">
         <b>phone: {{user.phone}}</b><br><br>
         <b>email: {{user.email}}</b><br><br>
         <b>city: {{user.address.city}}</b><br><br>
         <b>street: {{user.address.street}}</b><br><br>
         <b>zipcode: {{user.address.zipcode}}</b><br><br>
         <b>geolocation: {{user.address.geolocation.lat}} - {{user.address.geolocation.long}}</b><br><br><br>
          <div v-for="(card,key) in cards" :key="key" style="margin-bottom: 10px">
            <h3>Корзин: {{card.id + ' ' + card.date}}</h3>
            <el-table :data="card.products" style="width: 100%; max-height: 300px; margin-bottom: 80px">
              <el-table-column prop="productId" label="ID" />
              <el-table-column prop="quantity" label="Количество"/>
            </el-table>
          </div>

        <el-button type="success" @click="handlePost" :loading="loadingBtn">Отправить POST</el-button>
      </div>
      <p v-if="error">{{error}}</p>
    </el-card>
  </div>
</template>

<script>

import {USER_QUERY} from "../../../graphql/queries/getUsers";
import {computed, ref} from "vue";
import { useQuery, useMutation } from '@vue/apollo-composable'
import {useRoute} from "vue-router";
import {CREATE_USER_POST} from "../../../graphql/mutations/post";
import {ElMessage} from "element-plus";

export default {
  setup () {
    const loadingBtn = ref(false);
    const route = useRoute();
    const routeParamId = computed(() => route?.params?.id);
    const { result, loading, onError, error, onResult } = useQuery(USER_QUERY,{
      id: routeParamId
    });

    onError((error)=> {
      loading.value = false
      console.log(error);
    })
    onResult((data)=>{
      console.log('onResult',data);
    })
    const user = computed(() => result.value.user || null);
    const cards = computed(() => result.value.cards || null);


    function handlePost() {
      //CREATE_USER_POST
      console.log('handlePost');
      loadingBtn.value = true;
      AddUser();
    }

    const body = {
      email:'John@gmail.com',
      username:'johnd',
      password:'m38rmF$',
      name:{
        firstname:'John',
        lastname:'Doe'
      },
      address:{
        city:'kilcoole',
        street:'7835 new road',
        number:3,
        zipcode:'12926-3874',
        geolocation:{
          lat:'-37.3159',
          long:'81.1496'
        }
      },
      phone:'1-570-236-7033'
    }

    const { mutate: AddUser, onDone } = useMutation(CREATE_USER_POST, {
      variables: {
        input: "",
        body: body
      }
    });

    onDone(({data,errors}) => {
      loadingBtn.value = false;
      console.log('data',data.result.id)
      console.log('errors',errors)
      ElMessage({
        type: 'success',
        message: 'Пользователь успешно создан (фейк смотрим консоль)',
      })
    })

    return {
      user,
      cards,
      loading,
      error,
      handlePost,
      loadingBtn
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
