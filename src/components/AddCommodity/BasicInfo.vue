<template>
  <div class="basic-info-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in CategoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加子类目">
          <a-select-option
            v-for="(item,i) in CategoryItem.c_items"
            :key="i"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="请选择商品标签"
          :default-value="['包邮，最晚次日到达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日到达"
            >包邮，最晚次日到达</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label=" ">
        <a-button @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "@/api/commodity";
export default {
  props: ["form"],

  

  data() {
    return {
      CategoryList: [],
      CategoryItem: [],
      rules: {},
    };
  },

  created() {
    api.category().then((e) => {//获取类别数据
      this.CategoryList = e.data.data.data;
    });
  },

  methods: {
    handleChange(index) {//当我没选完商品类别时，给子类赋值，便于遍历
      this.CategoryList.forEach((item) => {
        if (item.id === index) {
          this.CategoryItem = item;
        }
      });
    },

    next() {//点击下一页时，判断是否符合，是的话抛出事件，不是则抛出错误
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
