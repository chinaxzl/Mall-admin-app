import Vue from 'vue';
import Vuex from 'vuex';
import changCollapsed from "./changCollapsed"
import userCookie from "./userCookie"
import menuRouter from "./menuRouter"
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        changCollapsed,
        userCookie,
        menuRouter
    }
})

export default store