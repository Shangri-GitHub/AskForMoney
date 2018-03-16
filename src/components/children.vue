<template>
    <div>
        <h2>我是子组件的标题</h2>
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
        parentMsg:''

      }
    },
    props: ['my-message'],
    methods: {},
    mounted: function () {
      console.log(this);
      console.log(this.myMessage);
    }
  }
</script>

<style>

</style>
