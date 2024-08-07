// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import vuetify from "@/plugins/vuetify";
import axios from "axios";

const app = createApp(App);

//axios 요청 인터셉터를 설정하여 모든 요청에 엑세스 토큰을 포함
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        
    },
    error => {
        // 해당 인터셉팅가 무시되고 사용자의 본인 요청인 화면으로 라우팅
        return Promise.reject(error);
    }
)

app.use(router);
app.use(vuetify);
app.mount('#app');
