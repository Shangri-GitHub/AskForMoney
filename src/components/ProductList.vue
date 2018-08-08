<template>
    <div style="margin-top: 20px">
        <el-table
                :data="tableData"
                size="mini"
                border
                stripe
                style="width: 100%">
            <el-table-column label="商品Id" prop="productId"></el-table-column>
            <el-table-column label="名称" prop="productName"></el-table-column>
            <el-table-column label="商品图片" width="80" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.productIcon" width="50px" height="50px">
                </template>
            </el-table-column>
            <el-table-column label="单价" prop="productPrice"></el-table-column>
            <el-table-column label="库存" prop="productStock"></el-table-column>
            <el-table-column label="描述" prop="productDescription" width="180"></el-table-column>
            <el-table-column label="类目" prop="categoryType"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="0 上架；1下架" prop="productStatus"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                            v-if="scope.row.productStatus==0"
                            size="mini"
                            type="danger"
                            @click="handleSale(scope.row.productStatus,scope.row.productId)">下架
                    </el-button>
                    <el-button
                            v-if="scope.row.productStatus==1"
                            size="mini"
                            type="primary"
                            @click="handleSale(scope.row.productStatus,scope.row.productId)">上架
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
    </div>

</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleSale(productStatus, productId) {
        var that = this;
        this.$confirm('确定要' + (productStatus == 1 ? "上架" : "下架") + '该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          that.$http.post('seller/product/' + (productStatus == 1 ? "on_sale" : "off_sale"), {
            "productId": productId
          }).then(function (res) {
            that.dialogTableVisible = false;
            that.getTableList(that.currentPage, that.pageSize);
            that.$message({
              type: 'success',
              message: '商品' + (productStatus == 1 ? "上架" : "下架") + res.data.msg + '!'
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
        that.$http.post('seller/product/list', {
          page: currentPage,
          size: pageSize
        }).then(function (res) {
          that.tableData = res.data.data.data;
          that.total = res.data.data.total;
        })
      }
      that.getTableList(that.currentPage, that.pageSize)
    }
  }
</script>

<style>

</style>
