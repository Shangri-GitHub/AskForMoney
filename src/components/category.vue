<template>


    <div style="margin-top: 20px">
        <el-row :span="24" style="padding-bottom: 10px">
            <el-col :span="3" :push="21">
                <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="small"
                        @click="createProductInfo()">新增商品
                </el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                size="mini"
                border
                stripe
                style="width: 100%">
            <el-table-column label="类目Id" prop="categoryId"></el-table-column>
            <el-table-column label="名字" prop="categoryName"></el-table-column>
            <el-table-column label="类型" prop="categoryType"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="info"
                            @click="dialogFormVisible = true;handleEdit(scope.row)">修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleSale(scope.row.categoryId)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-sizes="[5, 10, 15, 20]"
                    layout="total,sizes, ->, prev, pager,next, jumper"
                    :page-size=pageSize
                    :total=total>
            </el-pagination>
        </div>
        <!--修改商品的弹出框-->
        <el-dialog title="修改类目" :visible.sync="dialogFormVisible">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="80px" size="mini">
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="类目名称" prop="categoryName">
                            <el-input v-model="formData.categoryName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="类目类型" prop="categoryType">
                            <el-input type="number" v-model.number="formData.categoryType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="saveProductInfo('formData')">确 定
                </el-button>
                <el-button size="small" @click="dialogFormVisible = false;">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (value == "") {
          return callback(new Error('请输入类目类型'));
        }
        if (value < 0) {
          return callback(new Error('商品单价不能是负数'));
        }
      };
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        num1: 1,
        formData: {},
        fileList: [],
        rules: {
          categoryName: [
            {required: true, message: '请输入类目名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          categoryType: [
            {required: true,validator: checkAge, trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      createProductInfo(){
        this.formData = {};
        this.dialogFormVisible = true;
      },
      saveProductInfo(formName){
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$http.post('seller/category/save', this.formData).then(function (res) {
              if (res.data.code == 0) {
                that.getTableList(that.currentPage, that.pageSize);
                that.dialogFormVisible = false;
                that.$message({
                  type: 'success',
                  message: '修改类目成功' + res.data.msg + '!'
                });
              }else {
                that.$message.error(res.data.msg);
              }
            })
          } else {
            that.getTableList(that.currentPage, that.pageSize);
            return false;
          }
        });
      },
      handleImageChange(e){
        console.log(e)
      },
      handleEdit(formData) {
        // 深拷贝解决单项传递问题
        this.formData = JSON.parse(JSON.stringify(formData));
        this.fileList = [{
          name: "food.jpeg",
          url: formData.productIcon
        }]
      },
      handleSale(categoryId) {
        var that = this;
        this.$confirm('确定要删除此类目吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          that.$http.post('seller/category/deleteByCategoryId', {
            "categoryId": categoryId
          }).then(function (res) {
            that.dialogTableVisible = false;
            that.getTableList(that.currentPage, that.pageSize);
            that.$message({
              type: 'success',
              message: '类目'  + res.data.msg + '!'
            });
          })
        });


      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getTableList(this.currentPage, pageSize);
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getTableList(currentPage, this.pageSize);
      },
    },
    mounted: function () {
      // 接收参数
      var that = this;
      /**
       * 获取表格的列表
       */
      that.getTableList = function (currentPage, pageSize) {
        that.$http.post('seller/category/list', {
          page: currentPage,
          size: pageSize
        }).then(function (res) {
          that.tableData = res.data.data.data;
          that.total = res.data.data.total;
        })
      }
      that.getTableList(that.currentPage, that.pageSize);
    }
  }
</script>

<style>

</style>
