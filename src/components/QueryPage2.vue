<template>
    <div>
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
