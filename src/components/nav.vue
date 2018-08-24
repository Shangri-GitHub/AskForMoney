<template>
    <div style="display: flex;flex-direction: column">
        <div>
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="-1"><a style="margin-left: 132px" v-model="isCollapse" @click="collapse()"><i
                        class="el-icon-tickets"></i></a></el-menu-item>
                <el-menu-item index="/nav/queryPage1"><a>3D福彩</a></el-menu-item>
                <el-menu-item index="/nav/queryPage2">
                    <a>双色球</a>
                </el-menu-item>
                <el-menu-item index="/nav/queryPage3">
                    <a>超级大乐透</a>
                </el-menu-item>
                <el-menu-item index="/nav/wiki_page">
                    <a>Wiki学习资料</a>
                </el-menu-item>
                <el-menu-item index="/nav/ResumeEdite">
                    <a>Markdown编辑器</a>
                </el-menu-item>

                <el-menu-item index="/nav/order/detail">
                    <a>订单</a>
                </el-menu-item>

                <el-menu-item index="" style="float: right" @click="dialogVisible = true">
                    <a>退出</a>
                </el-menu-item>

                <el-menu-item index="1" style="float: right">
                    <el-popover
                            placement="bottom"
                            title="新订单列表"
                            width="220"
                            trigger="click"
                            style="height: 200px;overflow: auto"
                            v-model="visible">
                        <div style="height: 250px;overflow:auto;">
                            <div v-for="list in noticeContent">
                                <div style="padding:6px 0;display: flex;align-items: center">
                                    <div style="flex-direction: column;padding-left: 10px">
                                        <div style="display: flex">
                                            <div style="width: 160px">姓名:{{list.buyerName}}</div>
                                            <div style="padding-left: 10px;color: red;font-size: 16px">
                                                ¥{{list.orderAmount}}
                                            </div>
                                        </div>
                                        <div style="color: #436180">地址:{{list.buyerAddress}}</div>
                                        <time class="time">{{list.updateTime}}</time>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div slot="reference" @click="visible = !visible;noticeHandle()">
                            <el-badge :value=noticeValue :max=99>
                                <i style="color:#ffffff;font-size: 20px;" class="el-icon-bell"> </i>
                            </el-badge>
                        </div>
                    </el-popover>
                </el-menu-item>
            </el-menu>
        </div>
        <div style="display: flex;flex: auto">
            <div class="grid-content bg-purple">
                <el-menu
                        @select="handleSelect"
                        :collapse="isCollapse"
                        default-active="1-1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/nav/order">
                        <i class="el-icon-menu"></i>
                        <span slot="title">订单</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/nav/productList">列表</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">小彩蛋</template>
                            <el-menu-item index="/nav/romantic_page">恋爱计时器</el-menu-item>
                            <el-menu-item index="/nav/photowall">照片墙</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="/nav/category">
                        <i class="el-icon-setting"></i>
                        <span slot="title">类目</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <!--:class="isCollapse?'bg-changeLeft-flag':'bg-changeRight-flag'"-->
            <div style=""
                 :class="isCollapse?'bg-changeLeft-flag':'bg-changeRight-flag'">
                <div class="grid-content bg-purple-light">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
        <!--弹出框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>确认退出吗？</span>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;logout()">确 定</el-button>
          </span>
        </el-dialog>
        <audio id="noticeAudio" preload="auto">
            <source src="../../src/assets/music/song.mp3" type="audio/mpeg">
        </audio>
    </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        isCollapse: false,
        dialogVisible: false,
        visible: false,
        activeIndex2: '0',
        noticeValue: "new",
        noticeContent: "",
      }
    },
    methods: {
      noticeHandle(){
        var that = this;
        that.$http.post('seller/goods/list', {
          page: 1,
          size: 100
        }).then(function (res) {
          that.noticeValue = res.data.data.total;
          that.noticeContent = res.data.data.data;
        })
      },
      collapse(){
        this.isCollapse = !this.isCollapse;
      },
      handleSelect(key, keyPath) {
        console.log(key)
        if (key.indexOf("/nav") > -1) {
          this.$router.push(key)
        }
      },
      handleOpen(key, keyPath) {
        console.log(key)
      },

      logout() {
        var that = this;
        that.$router.push("/")
//        that.$http.post('seller/logout', {}).then(function (res) {
//          that.$router.push("/")
//        })
      }
    },
    mounted: function () {
      /**
       * webSocket 接收消息右上角提示
       * 音乐自动播放
       * @param event
       */
      var that = this;
      this.webSocket.onmessage = function (event) {
        console.log('收到消息:' + event.data)
        that.noticeValue = "NEW";
        $("#noticeAudio")[0].play();
        that.$notify({
          title: '您有一条新订单',
          message: that.$createElement('p', {style: 'color: teal'}, '订单号:' + event.data),
          type: 'success',
          iconClass: "el-icon-news",
          duration: 3000
        });
      }
//      this.$router.push("/nav/queryPage1")
    },
    created() {
      this.webSocket = this.$WebSocket();
    },
    destroyed() {
      this.webSocket.close() //离开路由之后断开websocket连接
    },
  }
</script>

<style>

    .el-badge__content.is-fixed {
        top: 19px;
        right: 16px;
    }

    .time {
        font-size: 12px;
        color: #999;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /*align-self:stretch;*/
        min-height: 700px;

    }

    .el-menu--collapse {
        align-self: stretch;
        min-height: 700px;
    }

    .bg-changeLeft-flag {
        width: 100%;
    }

    .bg-changeRight-flag {
        width: calc(100% - 200px);
    }


</style>
