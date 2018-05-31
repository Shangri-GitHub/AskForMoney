<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 30px">
            <el-breadcrumb-item :to="{ path: '/nav/queryPage1' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
       <search></search>
    </div>
</template>

<script>
  import Search from './search.vue'  //此处引入
  export default {
    components: {Search},   // 此处注册组件，调用的时候，要用大写
    name: '',
    data() {
      return {}
    },
    methods: {},
    mounted: function () {

    }
  }
</script>

<style>

</style>
