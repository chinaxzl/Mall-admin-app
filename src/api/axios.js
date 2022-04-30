import axios from "axios";
import store from "../store";
const int = axios.create({ //创建新实例，请求这个地址
    baseURL: 'https://mallapi.duyiedu.com/'
})

int.interceptors.request.use((config) => { //添加请求拦截器
    if (config.url.includes('/passport')) {//根据接口文档判断请求地址作出处理
        return config
    }else{
        return {//当请求地址不是/passport时，需给后台传入appkey和原先的信息
            ...config,
            params:{
                ...config.params,
                appkey:store.state.userCookie.user.appkey
            }
        }
    }
}, (error) => {//返回错误
    return Promise.reject(error);
})

int.interceptors.response.use((response) => { //添加响应拦截器
    if (response.data.status === "fail") {//请求失败返回返回错误信息
        return Promise.reject(response.data.msg)
    }
    return response
}, (error) => {
    return Promise.reject(error);
})

export default int