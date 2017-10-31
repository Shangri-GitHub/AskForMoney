<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="-1" ><a style="margin-left: 132px" v-model="isCollapse" @click="isCollapse=!isCollapse"><i class="el-icon-tickets"></i></a></el-menu-item>
            <el-menu-item index="0" @click="goto3D()"><a>3D福彩</a></el-menu-item>
            <el-menu-item index="1">
                <a @click="gotoShuang()">双色球</a>
            </el-menu-item>
            <el-menu-item index="2">
                <a @click="gotoDaletou()">超级大乐透</a>
            </el-menu-item>
            <el-menu-item index="3" style="float: right">
                <a @click="dialogVisible = true">退出</a>
            </el-menu-item>
        </el-menu>

        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-menu
                            :collapse="isCollapse"
                            default-active="1-1"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple-light">
                    <router-view>
                    </router-view>
                </div>
            </el-col>
        </el-row>

        <!--推出框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <span>确认退出吗？</span>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;logout()">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        isCollapse: false,
        dialogVisible: false,
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      goto3D() {
        this.$router.push("/nav/queryPage1")
      },
      gotoShuang() {
        this.$router.push("/nav/queryPage2")
      },
      gotoDaletou() {
        this.$router.push("/nav/queryPage3")
      },
      logout() {
        this.$router.push("/")
      }
    },
    mounted: function () {
      this.$router.push("/nav/queryPage2")
    }
  }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 700px;
    }
    .el-menu--collapse{
        min-height: 700px;
    }
</style>
