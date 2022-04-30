<template>
  <a-form-model
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
    class="login-from"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>

    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('loginForm')">
        登录
      </a-button>

      <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//正则判断邮箱格式是否正确
    let checkEmail = (rule, value, callback) => {
      if (!value) {//没有输入邮箱
         callback(new Error("请输入邮箱"));
      } else {
        if (!emailReg.test(value)) {//邮箱格式错误
           callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {//没有输入密码
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {//账号和密码
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "change" }],//邮箱处理函数
        password: [{ validator: validatePass, trigger: "change" }],//密码处理函数
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {//点击登录时触发
      this.$refs[formName].validate((valid) => {//表达校验时触发
        if (valid) {
          api.login(this.loginForm).then((resp) => {//请求登录
            this.$store.dispatch("userCookie/fachSetUser",resp.data.data);//给仓库赋值
            this.$router.push({name:"Home"})//跳转页面
          }).catch((error) => {//返回错误
            this.$message.error(error)
          })
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {//点击重置清除
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="less" scoped>
.login-from {
    max-width: 500px;
    margin: 100px auto;
    border: 1px solid #eee;
    padding: 48px 48px 24px;
    .ant-btn-primary{
        background: #30A679;
        border: #30A679;
    }
}
</style>
