<template>
    <div class="login">
        <div class="videoBox">
            <video autoplay="" loop="" muted="" poster="http://7xw7ee.com1.z0.glb.clouddn.com/video-2.jpg">
                <source src="http://7xw7ee.com1.z0.glb.clouddn.com/video-2.webm" type="video/webm">
                <source src="http://7xw7ee.com1.z0.glb.clouddn.com/video-2.mp4" type="video/mp4">
                <source src="http://7xw7ee.com1.z0.glb.clouddn.com/video-2.ogg" type="video/ogg">
            </video>
        </div>
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

<style scoped>
    .login .videoBox {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden
    }

    .login video {
        width: 100%;
        height: auto;
    }

    /*居中1*/
    .login .login {
        width: 400px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -100px 0 0 -200px;
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
