import { createApp, h, provide } from 'vue'
import {decamelizeKeys, camelizeKeys} from 'humps';
import {createPinia, storeToRefs} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '@/assets/scss/main.scss';
import { ElMessage } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {useAuth} from "@/stores/auth";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "@/apolloClient";


const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
})


/*
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});
*/

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')

const store = useAuth();
const { isToken, getToken } = storeToRefs(store)

// Axios configuration
axios.defaults.baseURL = import.meta.env.VITE_BASE_API;

// Intercept request ->
axios.interceptors.request.use(function (config) {

    console.log('__axios token__',getToken.value);
    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (isToken.value) {
        config.headers['Authorization'] = `Bearer ${getToken.value}`
    }
    //
    if (!(config.data instanceof FormData)) {
        config.data = decamelizeKeys(config.data);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

store.fetchAuthToken();


// Intercept response <-
function handleError(errorCode: any, errorData: any) {
    if (errorCode === 401) {
        if(errorData) {
            ElMessage.error(errorData);
        }else{
            ElMessage.error('Авторизация устарела. Сейчас мы перенаправим вас на страницу ввода пароля.');
        }
    }
    console.log(errorData);
    if (errorData?.message) {
        ElMessage.error('this is a message.');
    } else if (Array.isArray(errorData)) {
        errorData.forEach((field) =>  ElMessage.error(field.error));
    } else {
        if (errorCode === 400) {
            ElMessage.error('Отправленные данные неверны');
        }
        if (errorCode === 403) {
            ElMessage.error('Нет доступа к ресурсу');
        }
        if (errorCode === 404) {
            ElMessage.error('Ресурс не найден');
        }
        if (errorCode === 422) {
            ElMessage.error('Отправленные данные неверны');
        }
        if (errorCode === 500) {
            ElMessage.error('Ошибка сервера (500)');
        }
        if (errorCode === 502) {
            ElMessage.error('Ошибка сервера (502)');
        }
    }
}

axios.interceptors.response.use(function (response) {
    // kraken error
    if (response.data.error_backend) {
        console.log('🐙', response.data.error_backend?.http_status_code);
        const errorCode = +response.data.error_backend?.http_status_code;
        const errorData = JSON.parse(response.data.error_backend?.http_body || "{}");
        handleError(errorCode, errorData);
        return Promise.reject({
            status: errorCode || 500,
            data: errorData
        });
    }
    response.data = camelizeKeys(response.data);
    return response.data;
}, function (error) {
    console.error('axios intercept error', error, error?.response, error.response?.status);
    handleError(+error.response?.status, error.response?.data);
    return Promise.reject(error);
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
