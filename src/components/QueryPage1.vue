<template>
    <div>
        <query-table></query-table>
        <div>
            <h1 >我是父组件的标题</h1>
            <children :my-message="parentMsg">
                <p>学习怎么使用slot插槽</p>
                <p>父级传像子集</p>
                <div slot-scope="props">
                    <span>hello from parent</span>
                    <span>{{ props.text }}</span>
                </div>
            </children>

        </div>
    </div>
</template>

<script>
  import QueryTable from './QueryTable.vue'  //此处引入
  import children from './children.vue'  //此处引入
  export default {
    components: {QueryTable,children},   // 此处注册组件，调用的时候，要用大
    name: '',
    data() {
      return {
        parentMsg:"我是父"
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>

<style>

</style>
