<template>
  <div class="commodity-list-contrainer">
    <!-- 搜索框 -->
    <Search @submit="handleSubmit" :data="Searchdata" />
    <!-- 商品列表 -->
    <List
      :data="Listdata"
      :page="page"
      @change="changePage"
      :categorylist="Searchdata"
      @edit="handleEdit"
      @remove="handleRemove"
    />
  </div>
</template>

<script>
import Search from "@/components/CommdityList/Search";
import List from "@/components/CommdityList/List";
import api from "@/api/commodity";
export default {
  components: {
    Search,
    List,
  },

  data() {
    return {
      SearchContent: {},
      Listdata: [],
      Searchdata: {},
      categoryName: {},
      page: {
        total: 1,
        pageSize: 10,
        showSizeChanger: true,
        current: 1,
      },
    };
  },

  async created() {
    await api.category().then((e) => {
      //获取类目列表信息数据
      this.Searchdata = e.data.data.data;
      e.data.data.data.forEach((c) => {
        //遍历数据映射到categoryName
        this.categoryName[c.id] = c;
      });
    });
    this.getCommodity();
  },

  methods: {
    handleSubmit(e) {
      //搜索时，给SearchContent重新赋值
      this.SearchContent = e;
      this.getCommodity();
    },

    getCommodity() {
      api
        .commodity({
          //获取产品列表数据
          page: this.page.current,
          size: this.page.pageSize,
          ...this.SearchContent,
        })
        .then((resp) => {
          this.page.total = resp.data.data.total;
          this.Listdata = resp.data.data.data.map((e) => ({
            //遍历数据，给每一项数据加入一个新的属性值
            ...e, //categoryName，修改类目信息
            key: e._id,
            categoryName: this.categoryName[e.category].name,
          }));
        });
    },

    changePage(page) {
      //换页时重新获取数据渲染页面,page下一页的页数
      this.page = page;
      this.getCommodity();
    },

    handleEdit(revord) {
      //编辑商品，revord所编辑行的数据
      this.$router.push({ name: "ModifyCommodity", params: {id:revord.id} });
    },

    handleRemove(revord) {
      //删除商品，revord所编辑行的数据
      this.$confirm({
        title: "是否确认删除",
        content: `正在删除${revord.title}中`,
        onOk: () => {
          api.remove(revord).then((e) => {});
          this.getCommodity();
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.commodity-list-contrainer {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>