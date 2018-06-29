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
            <el-tab-pane label="I am a new Xi'anner">
                In my mind home is accompany,
                <br>
                在我心中，家是长情陪伴
                <br>
                In my heart, home is where you have a scene of belong insecurity
                <br>
                内心深处，家如庇护港湾
                <br>
                what is home, I think home is a place to put everyone together
                <br>
                家为何物，家乃凝心团聚之处
                <br>
                The home in my mind is a place where you don't feel any stress and where you can really take a rest and feel supported
                <br>
                家 令我轻松愉快 畅快释然
                <br>
                So this is a place you can get any support from others and you don't need to worry anything
                <br>
                家给予我倾力支持  它能让我消除杂念
                <br>
                In my mind, home is a place where you can find your love as soon as you wake up
                <br>
                家是你睁开双眼 便能看到爱人的温室
                <br>
                My impression of the home is always sweet and cozy and always have Mum's food
                <br>
                家 充满温馨与甜美,妈妈的美食 飘香四溢
                <br>
                In the past year, I think that Xi'an makes me very sleepy and not energetic, There is one accurate word to describe the past of Xi'an which is "lost". Xi'an is changing every day,
                <br>
                In my mind modern Xi'an is open and diverse, Xi'an is a national central city in the national policy.
                So I believe that will be the huge potential opportunity you can be discovered.
                <br>
                And now Xi'an becomes a tolerant city. This historical city needs fresh blood,
                <br>
                西安是个包容性的城市，这个古都需要注入新鲜的血液。
                <br>
                The journey with thousand miles begins with a single step.
                <br>
                千里之行，始于足下
                <br>
                The reason why I come to Xi'an because I find Xi'an has changed a lot. 2017, we find Xi'an has a lot of opportunities for development,
                As an internet phenomenon,  Xi'an is low cast And it has lots of opportunities for me to explore, So I choose Xi'an.
                <br>
                作为一个网红城市
                <br>
                And I eager and has already wonder in many expects,
                <br>
                我很清楚，西安是最有优势的潜力股
                <br>
                Xi'an is a city where you have to be here.  If you want to know all the culture of China
                <br>
                The reason you travel far away is eventually you will come home
                <br>
                我们孤单的奔赴远方，就是为了能够 重回故乡
                <br>
                So that Xi'an can be the international city. Definitely, Xi'an is my home, I am a new Xi'aner.
            </el-tab-pane>
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
