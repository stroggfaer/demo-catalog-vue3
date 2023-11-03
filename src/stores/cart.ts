import { defineStore } from 'pinia'

import type {ProductsModel} from "@/models";

export const useCart = defineStore('card', {

  state: () => ({
    products: [] as ProductsModel[],
    loading: false as boolean
  }),

  actions: {
    // TODO реально не добвляет так как это demo;
     addCart(products: ProductsModel) {
        this.products.push(products);
     },

     deleteCart(id: number) {
        this.$patch({
            products: this.products.filter((item)=>item.id !== id)
        });
     },

  },

  getters: {
    getLoading: (state): boolean => state.loading,
    getProductsCart: (state): ProductsModel[] => state.products,
    cartCounts: (state): number => state.products.length,
    isProductsCart: (state) => {
      return (productId: number): boolean => Boolean(state.products.find((product) => product.id === productId))
    },
    total: (state): string => state.products.map((item)=>item.price).reduce((a, b) => a + b, 0).toFixed(2)

  },

})
