<template>
    <div>
        <query-table></query-table>
    </div>
</template>

<script>
  import QueryTable from './QueryTable.vue'  //此处引入
  export default {
    components: {QueryTable},   // 此处注册组件，调用的时候，要用大
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
