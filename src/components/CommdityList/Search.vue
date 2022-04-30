<template>
  <div class="search-container">
    <a-form-model
      layout="inline"
      :model="search"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="search.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类别">
        <a-select
          show-search
          placeholder="请选择商品类别"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="item in data"
            :key="item.id"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-button class="btn-add">
      <router-link :to="{ name: 'AddCommodity' }">添加商品</router-link>
    </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {//两个搜索框的内容
        searchWord: "",
        category: "",
      },
    };
  },

  props: ["data"],

  methods: {
    handleSubmit() {//点击搜索时向父组件抛出事件和数据
      this.$emit("submit", this.search);
    },
    handleChange(e) {//下拉菜单值改变时，也要改变所以对应的值
      this.search.category = e;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  position: relative;
  padding: 10px 30px;
}
.btn-add {
  position: absolute;
  top: 15px;
  right: 30px;
}
</style>
