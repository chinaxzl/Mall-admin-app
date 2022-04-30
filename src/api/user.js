import int from "./axios";

export default {
    login(params) {//登录
        return int.post("/passport/login",params);
    }
}