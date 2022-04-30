import Cookies from "js-cookie";//cookie插件

export function setCookie(info){//创建cookie
    const arr = Object.entries(info);
    for(let i=0; i<arr.length; i++){
        Cookies.set(arr[i][0], arr[i][1]);
    }
}

export function getCookie(){//获取cookie
    return {
        appkey: Cookies.get("appkey"),
        email: Cookies.get("email"),
        role: Cookies.get("role"),
        username: Cookies.get("username"),
    }
}

export function revmoCookie(){//清除cookie
    Cookies.remove("appkey");
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("username");
}