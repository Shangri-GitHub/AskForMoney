<template>
    <div>
        <div id="editor">
            <markdown-editor-vue :toolbars="toolbars" :ishljs = "ishljs" @save="$save" @send="$send"
                                 style="height: 100%"></markdown-editor-vue>
        </div>
        <div id="content"></div>
    </div>

</template>

<script>

  import {markdownEditorVue} from 'markdown-editer-vue'
  import 'markdown-editer-vue/dist/css/index.css'

  export default {
    components: {
      markdownEditorVue
    },
    data() {
      return {
        ishljs:true,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: false, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
//          htmlcode: true, // 展示html源码
          help: false, // 帮助
          send:true, // 发布文章
            /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: false, // 清空
          save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
          navigation: false, // 导航目录
            /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
            /* 2.2.1 */
          subfield: true, // 单双栏模式
//          preview: true, // 预览
        },
        value: {

        },
      }
    },
    methods: {
      // 转换成html页面
      $save(val,html) {
        console.log(val)
        console.log(html)
      },
      $send: function (markdown, html) {
        console.log(markdown)
        console.log(html)
      }
    },
    mounted: function () {
//      console.log(mavonEditor.getMarkdownIt())
    }
  }
</script>

<style>
    #editor {
        margin: auto;
        width: 96%;
        height: 700px;
    }
</style>
