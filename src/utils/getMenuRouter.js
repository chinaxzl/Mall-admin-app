//储存的是角色对应的路由权限
const MenuRouter = {
    coustomer: [{
            name: "Commodity"
        },
        {
            name: "CommodityList"
        },
        {
            name: "AddCommodity"
        },
        {
            name: "ModifyCommodity"
        }
    ],
    admin: [{
            name: "Commodity"
        },
        {
            name: "CommodityList"
        },
        {
            name: "AddCommodity"
        },
        {
            name: "Category"
        },
        {
            name: "ModifyCommodity"
        }
    ]
}

/**
 * 
 * @param {*} role 权限
 * @param {*} routerInfo 需匹配的路由
 * @returns 
 */
export default function (role, routerInfo) {
    const matchingRouter = MenuRouter[role].map((item) => //匹配用户所对应的路由
        item.name
    );


    const screenRouter = routerInfo.filter((item) => { //筛选传入路由是否和用户所对应路由匹配

        if (matchingRouter.indexOf(item.name) !== -1) {
            const children = item.children;

            item.children = children.filter((r) =>
                matchingRouter.indexOf(r.name) !== -1
            )
            return true
        }
        return false
    })

    return screenRouter
}