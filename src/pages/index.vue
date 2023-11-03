<template>
  <el-container class="wrap">
    <el-header><AppHeader></AppHeader></el-header>
    <el-container>
      <AppSidebar></AppSidebar>
      <el-main  v-loading="getLoading">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" class="image"/>
              <div style="padding: 14px">
                <span>Mens Cotton Jacket</span>
                <div class="bottom">
                  <el-button text class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"/>
              <div style="padding: 14px">
                <span>Yummy hamburger</span>
                <div class="bottom">
                  <el-button text class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" class="image"/>
              <div style="padding: 14px">
                <span>Mens Casual Slim Fit</span>
                <div class="bottom">
                  <el-button text class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg" class="image"/>
              <div style="padding: 14px">
                <span>Solid Gold Petite Micropave</span>
                <div class="bottom">
                  <el-button text class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">

import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import { ref, onMounted, nextTick } from 'vue'
import {Api} from "@/compositions/api";

import {useCatalog} from "@/stores/catalog";
// https://element-plus.org/en-US/component/icon.html#combined-with-el-icon
export default {
  components: {AppHeader, AppSidebar},
  setup() {
    const getLoading = ref(false);
    const store = useCatalog();
    // const authStore = useAuth();
    onMounted(() => {
      nextTick(async () => {
       // authStore.fetchUser();
      });
    });
    return {
      getLoading,
      currentDate: ref(new Date())
    };
  },
}
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-row {
  margin-bottom: 20px;
  margin-top: 40px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
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

.image {
  width: 100%;
  display: block;
  height: 210px;
  object-fit: cover;
}
</style>
