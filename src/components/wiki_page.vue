<template>
    <div>
        <el-radio-group v-model="tabPosition" style="margin: 30px 0;">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>

        <el-tabs :tab-position="tabPosition" style="height: 600px;">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last week, I traveled to Zhuhai. It‘s a small but beautiful city. The streets are clean and the buildings are huge. The traffic of Zhuhai is good. There is almost no traffic jams here,because the transportation system is good. Macau is on the opposite of Zhuhai.We can even see the cars running in the streets of Macau. I hope I can step into Macau to visti this magical city.</span>
                <br></br>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暑假开始了，我很开心。上周，我到珠海旅游了。它是个很小但是很美的城市。街道干净，楼很高。珠海的交通很好，几乎没有交通堵塞，因为交通系统很发达。澳门就在珠海对面。我们甚至可以看到在澳门大街上奔跑的车辆。我希望可以踏入澳门这座魔幻之城旅游。</span>
            </el-tab-pane>
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'right'
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>

<style>

</style>
