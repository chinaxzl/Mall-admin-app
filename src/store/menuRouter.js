
export default{
    namespaced: true,
    state:{
        menuRouter:[]//获取匹配路由信息
    },

    mutations:{
        setMenuRouter(state,player){
            state.menuRouter = player;
        }
    },

    actions:{
        setMenuRouter(ctx,player){
            ctx.commit("setMenuRouter",player);
        }
    }
}