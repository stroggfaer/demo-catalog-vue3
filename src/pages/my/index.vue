<template>
  <div v-loading="getLoading" class="wrap">
    <h1>Личный кабинет</h1>
    <pre>{{getUser}}</pre>
    <pre>{{isToken}}</pre>
    <el-button @click="handleLogout" type="primary">Выйти</el-button>
  </div>

</template>

<script setup>
import {useAuth} from "../../stores/auth";
import {storeToRefs} from "pinia";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const storeAuth = useAuth();
const {isToken, getUser, getLoading} = storeToRefs(storeAuth);

const router = useRouter();
function handleLogout() {

  ElMessageBox.confirm(
      'Вы уверены?',
      'что хотите выйти?',
      {
        confirmButtonText: 'Выйти',
        cancelButtonText: 'Отмены',
        type: 'warning',
      }
  )
      .then(async () => {
        console.log('+');
        try {
          await storeAuth.authLogout();
          await router.push('/login?message=logout')
        }catch (e) {
          console.log(e)
        }


      }).catch((e) => {   console.log('-');})
}
</script>

<style scoped>

</style>
