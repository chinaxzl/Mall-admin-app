import int from "./axios";


export default {
    commodity(params){//获取商品列表
        return int.get("/products/all",{params})
    },

    category(){//获取类目列表
        return int.get("/category/all")
    },

    remove(params){//删除商品
        return int.delete("/products/"+ params.id)
    },

    add(params){//新增商品
        return int.post("/products/add",params)
    },

    edit(params){//编辑产品
        return int.put("/products/edit" ,params)
    },

    get(id){
        return int.get("/products/" + id)
    }

}

