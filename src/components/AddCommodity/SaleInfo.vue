<template>
  <div class="sale-info-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off" required>
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="title">
        <a-upload
          name="avatar"
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.userCookie.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <!-- 处理图片加载时，加载画面 -->
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label=" ">
        <a-button @click="prev">上一步</a-button>
        <a-button @click="next">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  //把图片转化为Base64格式
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ["form"],

  created() {///编辑时，判断编辑的数据是否存在img元素，如果有给fileList赋值为该img
    let img = this.form.images ? this.form.images.length : 0
    if (img > 0) {
      this.fileList = this.form.images.map((e, i) => {
        return {
          uid: i,
          name: `image-${i}.png`,
          status: "done",
          url: e,
        };
      });
    }
  },

  data() {
    return {
      previewVisible: false, //加载动画的显示
      previewImage: "", //图片src
      fileList: [], //已经上传的文件列表
      rules: {}, //规则
    };
  },

  methods: {
    next() {//点击下一页时抛出事件和数据参数
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    prev() {//点击上一页时抛出事件和数据参数
      this.$emit("prev", this.form);
    },
    handleCancel() {//图片加载完后
      this.previewVisible = false;
    },
    async handlePreview(file) {
      //点击文件链接或预览图标时的回调
      //
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    /**file 当前操作的文件对象。
     * fileList 当前的文件列表。
     * event 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。
     */
    handleChange({ file, fileList, event }) {//上传图片时运行该函数
      //change事件
      if(file.status === "done"){
        this.form.images = file.response.data.url
      }else if(file.status === "removed"){
        this.form.images = this.form.images.filter(item=>{
          item !== file.response.data.url
        })
      }
      this.fileList = fileList;
      console.log(file,fileList,event);
    },
  },
};
</script>

<style>
</style>