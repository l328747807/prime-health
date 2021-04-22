<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      :rules="rules2"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">平台登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {str2Md5} from '@/util/md5.js'
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules2: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
    };
  },
  mounted() {
    //监听键盘按键事件
    window.addEventListener("keydown", this.keyDown);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      let _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.logining = true;
          if (
            _this.ruleForm.username === "admin" &&
            _this.ruleForm.password === "123456"
          ) {
            let token = str2Md5(_this.ruleForm.password);
            sessionStorage.setItem("token", token);
            _this.logining = false;
            //设置请求头的token信息
            _this.$setToken();
            _this.$router.push({ path: "/Layout" });
          } else {
            _this.logining = false;
            _this.$alert("账号或密码不正确!", "提示", {
              confirmButtonText: "确定",
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title{
      text-align: center;
      height:40px;
    }
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
}
</style>