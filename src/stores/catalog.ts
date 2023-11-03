import { defineStore } from 'pinia'
import {Api} from "@/compositions/api";
import type {ProductsModel} from "@/models";

export const useCatalog = defineStore('catalog', {

  state: () => ({
    data: [] as ProductsModel[] | [],
    loading: false as boolean
  }),

  actions: {
    async fetchCatalog() {
      this.$patch( {data: [], loading: true });
      const res: ProductsModel[] = await Api().fetchData('products');
      this.$patch({ data: res, loading: false});
    },
  },

  getters: {
    catalog: (state): ProductsModel[] => state.data,
    getLoading: (state): boolean => state.loading
  },

})
