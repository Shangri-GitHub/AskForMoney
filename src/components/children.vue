<template>
    <div>
        <h2>我是子组件的标题</h2>
        <p><button @click="add()">add</button></p>
        <ul>
            <li v-for="tab in tabs">
                {{ tab.label }}
            </li>
        </ul>
        <!--<slot>-->
            <!--只有在没有要分发的内容时才会显示。-->
        <!--</slot>-->
        <slot text="hello from child"></slot>



    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        parentMsg:'',
        tabs:[]

      }
    },
    props: ['my-message'],
    methods: {
      add:function(num){
        this.tabs = [{
          id:"1",
          label:"hello"
        },{
          id:"2",
          label:"world"
        }]
      }
    },
    mounted: function () {
      console.log(this);
      console.log(this.myMessage);
    }
  }
</script>

<style>

</style>
