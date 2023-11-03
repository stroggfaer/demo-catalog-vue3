<template>
  <div class="wrap" >
    <el-breadcrumb style="margin-bottom: 30px">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/graphql-test-1' }">Список пользователей</el-breadcrumb-item>
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
         <div><img :src="user.image"  width="100" height="100"/></div><br><br>
         <b>lastName: {{user.lastName}}</b><br><br>
         <b>maidenName: {{user.maidenName}}</b><br><br>
         <b>username: {{user.username}}</b><br><br>
         <b>ageName: {{user.ageName}}</b><br><br>
         <b>company: {{user.company.title}}</b><br><br>
         <b>bank cardNumber: {{user.bank.cardNumber}}</b><br><br>
         <b>bank cardType: {{user.bank.cardType}}</b><br><br>
         <b>bank cardExpire: {{user.bank.cardExpire}}</b><br><br>
        <pre>{{user}}</pre>
                <el-button type="success" @click="handlePost" :loading="loadingBtn">Отправить POST</el-button>
      </div>
      <p v-if="error">{{error}}</p>
    </el-card>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import { useQuery, useMutation } from '@vue/apollo-composable'
import {useRoute} from "vue-router";
import {CREATE_USER_FRAG_POST, CREATE_USER_POST} from "../../../graphql/mutations/post";
import {ElMessage} from "element-plus";
import {USER_TEST_QUERY_VIEW} from "../../../graphql/queries/getUsersTest";

export default {
  setup () {
    const loadingBtn = ref(false);
    const route = useRoute();
    const routeParamId = computed(() => route?.params?.id);

    const { result, loading, onError, error, onResult } = useQuery(USER_TEST_QUERY_VIEW,{
      id: routeParamId
    });

    onError((error)=> {
      loading.value = false
      console.log(error);
    })
    onResult((data)=>{
      console.log('onResult',data);
    })
    console.log('result',result);
    const user = computed(() => result.value.user || null);

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

    const { mutate: AddUser, onDone } = useMutation(CREATE_USER_FRAG_POST, {
      variables: {
        id: 1001,
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
