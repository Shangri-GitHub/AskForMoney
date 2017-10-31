<template>
    <div>
        <div class="demo-input-size">
            <el-input
                    placeholder="请输入内容"
                    suffix-icon="el-icon-date"
                    v-model="input1">
            </el-input>
            <el-input v-model="input" placeholder="请输入内容"></el-input>


            <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
            </el-date-picker>
        </div>


        <el-button type="primary" @click="goLogin()">返回首页</el-button>
    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
        input: '',
        input1: ''
      }
    },
    methods: {
      goLogin() {
        this.$router.push({path: '/'})
      }
    },
    mounted: function () {
      // 接收参数
      console.log('userId: ' + this.$route.params.userId);
    }
  }
</script>

<style>

</style>
