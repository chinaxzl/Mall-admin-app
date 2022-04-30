<template>
  <div>
    <a-steps :current="current" class="current-container">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 商品基本信息 -->
      <BasicInfo v-if="current < steps.length - 1" @next="next" :form="form" />
      <!-- 商品销售信息 -->
      <SaleInfo v-if="current >= 1" @next="next" @prev="prev" :form="form" />
    </div>
  </div>
</template>
<script>
import SaleInfo from "@/components/AddCommodity/SaleInfo";
import BasicInfo from "@/components/AddCommodity/BasicInfo";
import api from "@/api/commodity";
export default {
  components: {
    SaleInfo,
    BasicInfo,
  },

  data() {
    return {
      current: 0,
      steps: [//步骤条
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
      form: {
        price: "",
        price_off: "",
        inventory: "",
        unit: "",
        title: "",
        c_items: [],
        desc: "",
        category: [],
        tags: "包邮，最晚次日到达",
      },
    };
  },

  created() {//判断是否为编辑页，并且把数据保存起来赋值给form渲染页面
    let { id } = this.$route.params;
    if (id) {
      api.get(id).then((e) => {
        this.form = e.data.data;
      });
    }
  },

  methods: {
    next(form) {//点击下一步运行
      this.form = { ...form, form };//保存数据，点击上下页时，数据还存在
      if (this.current === this.steps.length - 1) {//判断是否到最后一步
        if (this.$route.params.id) {//判断是否为编辑页
          api.edit(this.form).then(() => {
            this.$message.success("修改成功");
            this.$router.push({ name: "CommodityList" });
          });
        } else {//新增页
          api.add(this.form).then((e) => {
            this.$message.success("新增成功");
            this.$router.push({ name: "CommodityList" });
          });
        }
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

.current-container {
  width: 50%;
  margin: 20px auto;
}
</style>
