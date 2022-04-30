import * as api from "@/utils/userCookie";
export default {
    namespaced: true,
    state: {
        //用户信息
        user: api.getCookie()//获取cookie值
    },

    mutations: {
        setUser(state, player) {//登录时cookie赋值
            state.user = player;
        },
        logOut(state) {//退出时清楚cookie值
            state.user = {
                appkey: "",
                email: "",
                role: "",
                username: "",
            }
        }
    },

    actions: {
        fachSetUser(ctx, player) {
            ctx.commit("setUser", player);
            api.setCookie(player)
        },

        fachlogOut(ctx) {
            ctx.commit("logOut");
            api.revmoCookie()
        }
    }
}