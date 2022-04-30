import Home from "@/views/Layout/Home";
import Login from "@/views/Layout/Login";
export const routes = [{
        name: "Home",
        path: "/",
        component: Home,
        meta: {
            title: "首页",
            show: false,
            icon: "home",
        },
        children: [{ //子路由不需要写/
            name: "Index",
            path: "index",
            component: () => import("@/views/page/index"),
            meta: {
                title: "统计图表",
                show: false,
                icon: "fund"
            }
        }, ]
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {
            title: "登录页",
            show: true,
        }
    },

]

export const MapRouter = [{
        name: "Commodity",
        path: "/commodity",
        component: Home,
        meta: {
            title: "商品",
            show: false,
            icon: "shop"
        },
        children: [{ //子路由不需要写/
                name: "CommodityList",
                path: "commoditylist",
                component: () => import("@/views/page/CommodityList"),
                meta: {
                    title: "商品列表",
                    show: false,
                    icon: "unordered-list"
                }
            }, {
                name: "AddCommodity",
                path: "addcommodity",
                component: () => import("@/views/page/AddCommodity"),
                meta: {
                    title: "添加商品",
                    show: false,
                    icon: "file-add"
                }
            },
            {
                name: "ModifyCommodity",
                path: "modifycommodity/:id",
                component: () => import("@/views/page/AddCommodity"),
                meta: {
                    title: "添加商品",
                    show: true,
                    icon: "file-add"
                }
            },
            {
                name: "Category",
                path: "category",
                component: () => import("@/views/page/Category"),
                meta: {
                    title: "类品管理",
                    show: false,
                    icon: "form"
                }
            }
        ]
    },

]