import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'
import store from "./store"
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
import router from "./router"
import "./styles/global.less"; //全局样式

Vue.use(Antd)
Vue.use(VCharts)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
