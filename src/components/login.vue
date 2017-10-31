<template>
    <div>
        <div class="login">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号">
                    <el-input type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="">重置</el-button>
                    <div style="float: right">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      submitForm() {
        this.$router.push("/nav")
      },

    }
  }
</script>

<style scoped="">
    /*居中1*/
    .login {
        width: 400px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -100px 0  0 -200px;
    }
    /*居中2*/
    /*.login {*/
        /*width: 400px;*/
        /*height: 100px;*/
        /*position: absolute;*/
        /*margin: auto;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
    /*}*/
</style>
