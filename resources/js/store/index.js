import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    state: {
        alert: false,
        alertMessage: null,
        alertType: null,
        loading: true,
        options: {},
        title: null
    },
    mutations: {
        setAlert (state, details) {
            state.alertMessage = details.message
            state.alertType = details.type
            state.alert = true
        },
        clearAlert (state) {
            state.alert = false
            state.alertMessage = null
            state.alertType = null
        },
        toggleLoading (state, value) {
            state.loading = value
        },
        setOption (state, value) {
            Vue.set(state.options, value.key, value.value)
        },
        setTitle (state, value) {
            state.title = value
        }
    },
    actions: {
        alert (context, details) {
            context.commit('setAlert', details)
            setTimeout(() => {
                context.commit('clearAlert')
            }, details.duration || 30000)
        }
    }
})
