<template>
 <div class="wrap">
   <h1>Корзина</h1>
   <el-breadcrumb style="margin-bottom: 30px">
     <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
     <el-breadcrumb-item>Корзина</el-breadcrumb-item>
   </el-breadcrumb>
   <el-table :data="getProductsCart" border style="width: 100%; max-height:450px; overflow: auto" empty-text="Пустая корзина">
     <el-table-column label="Изображения" prop="id" width="150" align="center">
       <template #default="scope">
         <el-image :src="scope.row.image" style="width: 70px;">
           <template #error>
             <div class="image-slot">
               Загрузка...
             </div>
           </template>
         </el-image>
       </template>
     </el-table-column>
     <el-table-column label="Название" prop="title" />
     <el-table-column label="Цена" prop="price" />
     <el-table-column  width="60" align="center">
       <template #default="scope">
         <Delete @click="handleDelete(scope.row.id)" style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer" />
       </template>
     </el-table-column>
   </el-table>
   <div class="flex-total">
       <div class="m">Итого:</div>
       <div class="p">{{total}} р.</div>
   </div>
   <div class="order-btn">
     <el-button size="large" :loading="loadingBtn" :disabled="!getProductsCart.length" type="success" @click="handleOrder()">Оформить</el-button>
   </div>

 </div>
</template>

<script>

import {nextTick, onMounted, ref, watch} from "vue";

import {storeToRefs} from "pinia";
import {useCart} from "@/stores/cart";
import {useAuth} from "../../stores/auth";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

export default {
  setup() {
    const store = useCart();
    const storeAuth = useAuth();
    const {isToken} = storeToRefs(storeAuth);
    const { getProductsCart, total } = storeToRefs(store)
    const router = useRouter();
    const handleDelete = (id) => store.deleteCart(id);
    const loadingBtn = ref(false);

    function handleOrder() {
        if(isToken.value) {
          ElMessageBox.confirm(
              `Итого: ${total.value} р.`,
              'Оформить заказ?',
              {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning',
              }
          )
              .then(() => {
                loadingBtn.value = true;
                setTimeout(()=>{
                  ElMessage({
                    type: 'success',
                    message: 'Спасибо! Ваш заказ успешно оформлен!',
                  })
                  store.$reset();
                  router.push('/my')
                  loadingBtn.value = false;
                },2000)
              })
              .catch(() => {})

        }else{
          router.push('/login')
        }
    }

    onMounted(() => {
      nextTick(async () => {});
    });

    watch(getProductsCart, (value) => {

    });

    return {
      getProductsCart,
      handleDelete,
      total,
      loadingBtn,
      handleOrder
    }
  }
}
</script>

<style scoped lang="scss">
   .order-btn {
     margin-top: 15px;
     margin-bottom: 15px;
     text-align: right;
   }
   .flex-total {
     display: flex;
     justify-content: end;
     font-size: 24px;
     padding: 25px 0px;
     .m {
       margin-right: 15px;
     }
   }
</style>
