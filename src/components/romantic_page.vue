<template>
    <div class="romantic_box">
        <div class="content">
            <div class="timer">
                <b v-html="d"></b> Days <b v-text="h"></b> Hours <b>{{m}}</b> Minutes <b v-html="s"></b> Seconds
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        d: "",
        h: "",
        m: "",
        s: "",
      }
    },
    methods: {},
    mounted: function () {
      var that = this;

      function timer() {
        var start = new Date(2018, 1, 1); // 开始恋爱时间
        var t = new Date() - start;
        var h = ~~(t / 1000 / 60 / 60 % 24);
        if (h < 10) {
          h = "0" + h;
        }
        var m = ~~(t / 1000 / 60 % 60);
        if (m < 10) {
          m = "0" + m;
        }

        var s = ~~(t / 1000 % 60);
        if (s < 10) {
          s = "0" + s;
        }

        that.d = ~~(t / 1000 / 60 / 60 / 24);
        that.h = h;
        that.m = m;
        that.s = s;
      }

      timer();
      setInterval(timer, 1000);
    }
  }
</script>

<style scoped>
    .romantic_box {
        width: 100%;
        min-height: 700px;
        font-family: Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        background-image: url('../assets/romantic_bg.jpg');
        font-size: 85%;
        margin: 0;
    }

    .content {
        width: 100%;
    }

    .timer {
        font-size: 30px;
        position: absolute;
        top: 50%;
        left: 40%;
    }

    .timer b {
        color: rgb(253, 99, 125);
    }
</style>
