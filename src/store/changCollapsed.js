
export default{
    namespaced: true,
    state:{
        //左导航栏伸缩
        collapsed:false,
    },

    mutations:{
        setCollapsed(state){
            state.collapsed = !state.collapsed;
        }
    },

    actions:{
        collapsed(ctx){
            ctx.commit("setCollapsed");
        }
    }
}