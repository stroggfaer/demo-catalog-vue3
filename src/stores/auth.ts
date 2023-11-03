import { defineStore } from 'pinia'
import axios from "axios";
// @ts-ignore
import Cookies from 'js-cookie'
import {Api} from "@/compositions/api";

export const useAuth = defineStore('auth', {

    state: () => ({
        user: null,
        token: null as any | null,
        loading: false as boolean
    }),

    actions: {
        async fetchAuthToken() {
            const token = Cookies.get('token') || null
            if (token) {
                this.token = token;
                await this.fetchUser();
            } else {
                Cookies.remove('token')
                this.token = null;
                this.user = null;
            }
        },

        async fetchUser() {
           this.loading = true;
            try {

                const res: any = await axios.get('users/1');
                console.log('fetchUser res___',res);
                if(res) {
                    this.$patch({ user: res })
                }
                this.loading = false;
            }catch (e) {
                console.log('e',e);
                this.authLogout();
                this.loading = false;
            }
        },

        async  authLogin(login: string, password: string) {
            try {
                const res: any = await axios.post('/auth/login',{username: login, password});
                console.log('authLogin',res.token);
                Cookies.set('token', res.token, { expires: 1000 })
                this.token = res.token;
                this.fetchAuthToken();
                return res;
            }catch (e) {
                console.log('authLogin error',e);
            }
        },

        // Выход;
        async authLogout() {
            console.log('authLogout');
            Cookies.remove('token');
            this.token = null;
            this.user = null;
        },

    },
    getters: {
        getLoading: (state): boolean => state.loading,
        getUser: (state): any => state.user,
        isToken: (state): boolean => !!state.token,
        getToken: (state): string => state.token,
    },

})
