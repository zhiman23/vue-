<template>
  <el-row type="flex" justify="center" align="middle" class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("登录");
      this.$axios({
        method: "post",
        url: "/login",
        data: this.form,
      }).then((res) => {
        console.log(res.data);
        if (res.data.message == "登录成功") {
          this.$message.success("登录成功");
          localStorage.setItem("token", res.data.data.token);
          this.$router.push("/");
        }
      });
    },
    reset() {
      this.form = {
        username: "",
        password: "",
      };
    },
  },
};
</script>

<style>
.wrapper {
  height: 100vh;
  background-color: #f2f2f2;
}
</style>