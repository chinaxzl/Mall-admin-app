import Vue from 'vue';
import VueRouter from 'vue-router'
import {
    routes,
    MapRouter
} from "./routes"
import store from "@/store"
import getMenuRouter from "@/utils/getMenuRouter"
Vue.use(VueRouter);


const router = new VueRouter({
    routes
});
let lock = false;
router.beforeEach((to, from, next) => {
    if (to.fullPath !== "/login") {//除了登录页，其他页都可以直接next
        if (store.state.userCookie.user.appkey &&
            store.state.userCookie.user.username &&
            store.state.userCookie.user.email &&
            store.state.userCookie.user.role) {//判断用户是否已经登录
            if (!lock) {//加个锁，不然会无限递归，导致页面崩溃
                const newRouter = getMenuRouter(store.state.userCookie.user.role, MapRouter) //筛选符合的路由
                store.dispatch("menuRouter/setMenuRouter", routes.concat(MapRouter)).then(() => { //因为这一步是异步操作,需要等待一段时间才能得到结果
                    router.addRoutes(newRouter); //等得到结果之后再把符合的路由加进路由规则里面，并且进行跳转
                    next();
                })
                lock = true
            }
            next(); //如果不用then处理异步，当我们直接访问子路由的时候会出现空白页，这都是因为异步程序还没处理完导致的
        } else {
            next("/login");
        }
    } else {
        next()

    }
})


export default router