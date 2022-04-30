<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="page"
    @change="handleChange"
  >
    <div slot="operation" slot-scope="text,revord">
      <a-button @click="editGoods(revord)">编辑</a-button>
      <a-button @click="removeGoods(revord)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [//dataIndex要和请求的数据一一对应
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "库存量",
    dataIndex: "inventory",
    key: "inventory",
    ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width:200,
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },

  props: ["data", "page", "categorylist"],

  methods: {
    handleChange(page) {//换页时抛出事件和数据参数
      this.$emit("change", page);
    },

    editGoods(revord){////点击编辑时抛出事件和数据参数
      this.$emit("edit", revord);
    },

    removeGoods(revord){////点击删除时抛出事件和数据参数
      this.$emit("remove", revord);
    }

  },
};
</script>
