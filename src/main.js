import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './js/App.vue'
import axios from 'axios';
import Vuex from 'vuex';
import * as Sentry from '@sentry/browser';
import Homepage from './js/pages/Homepage.vue';
console.log(process.env);
if(process.env.ENV === 'remote'){
	/*
    Sentry.init({
        dsn: 'https://9ffe4af44218439f8bc40759d4327518@sentry.io/1306129',
        integrations: [new Sentry.Integrations.Vue({ Vue })]
    });
    */
}

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
       
    },
    mutations: {
        
    }
});

const routes = [
    { path: '/', component: Homepage },
];

const router = new VueRouter({
    routes,
});

const ClearVue = new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>',
    router,
    data(){
        return {
           
        };
    },
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error

    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    ClearVue.$root.$emit('bv::show::modal','generalModal');
    // Do something with response error
    return Promise.reject(error);
});
