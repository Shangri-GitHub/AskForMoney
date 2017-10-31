<template>
    <div>
       <mytable></mytable>
    </div>
</template>

<script>
  import Mytable from './table.vue'  //此处引入
  export default {
    components: {'Mytable': Mytable},  // 换了一种表达式
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
