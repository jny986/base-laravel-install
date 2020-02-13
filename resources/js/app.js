require('./bootstrap')

import Vue from 'vue'

/**
 * Import and setup Inertia.js
 **/
import { InertiaApp } from '@inertiajs/inertia-vue'
Vue.use(InertiaApp)

/**
 * Import Vuex Store
 */
import store from './store'

/**
 * Import and setup Vuetify
 */
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1b588c',
                secondary: '#2196f3',
                accent: '#00bcd4',
                error: '#f44336',
                warning: '#ffc107',
                info: '#03a9f4',
                success: '#4caf50'
            }
        }
    },
    icons: {
        iconfont: 'mdi'
    }
})

import './vee-validate-en.js';

let app = document.getElementById('app')

new Vue({
    vuetify,
    store,
    render: h => h(InertiaApp, {
        props: {
            initialPage: JSON.parse(app.dataset.page),
            resolveComponent: (name) => {
                return import(`@/Pages/${name}`).then(module => module.default)
            },
        },
    })
}).$mount(app);
