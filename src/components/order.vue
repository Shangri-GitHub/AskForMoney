<template>
    <div>
        <el-row style="margin-top: 20px">
            <el-form :model="form" label-width="80px">
                <el-col :span="5">
                    <el-form-item label="订单号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="创建时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" style="text-align: center" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                            style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :push="1">
                    <el-button type="primary" @click="Query()">查 询</el-button>
                </el-col>

            </el-form>
        </el-row>
        <!--表格-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="orderId"
                    label="订单号"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="buyerName"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="buyerPhone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="buyerAddress"
                    label="地址"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="orderAmount"
                    label="金额(元)">
            </el-table-column>
            <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    :formatter="orderStatusFormatter">
            </el-table-column>
            <el-table-column
                    prop="payStatus"
                    label="支付状态"
                    :formatter="payStatusFormatter">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="操作"
                    width="160">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.payStatus == 2"
                               size="mini"
                               type="warning"
                               @click="dialogTableVisible = true;handleEdit(scope.row.orderId)"
                    >支付
                    </el-button>
                    <el-button v-if="scope.row.payStatus != 2"
                               size="mini"
                               type="primary"
                               @click="dialogTableVisible = true;handleEdit(scope.row.orderId)"
                    >详情
                    </el-button>

                    <el-button
                            v-if="scope.row.orderStatus == '0'"
                            size="mini"
                            @click="handleCancel(scope.row.orderId)">取消
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
        <!----------弹框------>
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
            <el-form>
                <el-form-item label="买家信息:" label-width="100px" size="mini">
                    <label v-html="buyerInfo"></label>
                </el-form-item>
                <el-form-item label="订单总金额:" label-width="100px" prop="name">
                    <label v-html="orderAmount+'元'"></label>
                </el-form-item>
            </el-form>
            <el-table :data="gridData" border height="220" size="mini">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="商品图片" width="80" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.smallModelPhoto[0].url" width="50px" height="50px">
                    </template>
                </el-table-column>
                <el-table-column property="productName" label="商品名称"></el-table-column>
                <el-table-column property="productPrice" label="价格"></el-table-column>
                <el-table-column property="productQuantity" label="数量"></el-table-column>
                <el-table-column label="总额(元)">
                    <template slot-scope="scope">
                        <div>{{(scope.row.productPrice * scope.row.productQuantity).toFixed(2) }}</div>
                    </template>
                </el-table-column>
            </el-table>

            <el-row :gutter="20" style="top:16px">
                <el-col :span="10" :push="16">
                    <!--新订单的时候展示提交订单按钮、取消订单按钮-->
                    <div v-if="orderStatus == 0">
                        <el-button type="primary" size="small"
                                   @click="orderFinish(gridData[0].orderId)">提交订单
                        </el-button>
                        <el-button type="info" size="small"
                                   @click="handleCancel(gridData[0].orderId)">取消订单
                        </el-button>
                    </div>
                    <!--完成订单的时候或者等待支付的时候展示立即订单按钮、取消订单按钮-->
                    <div v-if="orderStatus == 1 && payStatus==2">
                        <el-button type="warning" size="small"
                                   @click="orderPay()">立即支付
                        </el-button>
                        <el-button type="info" size="small"
                                   @click="handleCancel(gridData[0].orderId)">取消订单
                        </el-button>
                    </div>
                    <!--取消订单的时候展示关闭订单按钮-->
                    <div v-if="orderStatus == 2 ||orderStatus==1&&payStatus==1">
                        <el-button type="success" size="small"
                                   @click="handleClose(gridData[0].orderId)">关闭订单
                        </el-button>
                        <el-button type="info" size="small"
                                   @click="dialogTableVisible = false">取消
                        </el-button>
                    </div>
                </el-col>
            </el-row>


        </el-dialog>

    </div>
</template>

<script>

  import config from '../config';

  export default {
    name: '',
    data() {
      return {
        buttonType: "warning",
        buyerInfo: '',
        orderAmount: '',
        dialogTableVisible: false,
        form: {
          name: '',
        },
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 5, //每页默认几条数据
        gridData: [],
        orderStatus: 0,
        payStatus: "",
        webSocket: {},
        orderPayData: {},
      }
    },
    methods: {
      orderPay(){
        console.log(this.orderPayData.orderId)
        // 支付宝网页支付
        location.href = config.api.BASEURL + 'alipay/pay/trade_page?orderId=' + this.orderPayData.orderId +
          '&returnUrl='+config.api.ALIPAYRETURNURL+'%23/nav/order';


      },
      Query(){
        var that = this;
        that.$http.post('buyer/order/create', {
          name: "宋先生",
          phone: "15992344221",
          address: "陕西西安",
          openId: "110110",
          items: [{
            productId: "1540629842505991790",
            productQuantity: 1
          }],
        }).then(function (res) {
          console.log(res)
        })
      },
      orderStatusFormatter(row, column) {
        var orderStatusEnum = {
          0: "新下单",
          1: "完成订单",
          2: "取消订单"
        }
        return orderStatusEnum[row.orderStatus];
      },
      payStatusFormatter(row) {
        var payStatusEnum = {
          0: "未支付",
          1: "支付成功",
          2: "等待支付"
        }
        return payStatusEnum[row.payStatus];
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getTableList(this.currentPage, pageSize);
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getTableList(currentPage, this.pageSize);
      },
      handleCancel(orderId){
        /**
         *  取消订单
         */
        var that = this;
        this.$confirm('确定要取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.post('seller/goods/cancel', {
            "orderId": orderId
          }).then(function (res) {
            that.dialogTableVisible = false;
            that.getTableList(that.currentPage, that.pageSize);
            that.$message({
              type: 'success',
              message: '取消' + res.data.msg + '!'
            });
          })
        })
      },
      handleEdit(orderId){
        var that = this;
        this.$http.post('seller/goods/detail', {
          "orderId": orderId
        }).then(function (res) {
          that.orderPayData = res.data;
          that.orderStatus = res.data.orderStatus;
          that.payStatus = res.data.payStatus;
          that.buyerInfo = res.data.buyerName + "-" + res.data.buyerPhone + "-" + res.data.buyerAddress;
          that.orderAmount = res.data.orderAmount;
          that.gridData = res.data.orderDetailList;
        })
      },
      orderFinish(orderId){
        var that = this;
        this.$http.post('seller/goods/finish', {
          "orderId": orderId
        }).then(function (res) {
          that.dialogTableVisible = false;
          that.getTableList(that.currentPage, that.pageSize);
        })
      },
      handleClose(orderId){
        // 关闭订单
        var that = this;
        this.$confirm('确定要关闭该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.post('seller/goods/delete', {
            "orderId": orderId
          }).then(function (res) {
            that.dialogTableVisible = false;
            that.getTableList(that.currentPage, that.pageSize);
            that.$message({
              type: 'success',
              message: '关闭' + res.data.msg + '!'
            });
          })
        });
      }
    },
    mounted: function () {
      // 接收参数
      console.log('userId: ' + this.$route.params.userId);
      var that = this;
      /**
       * 获取表格的列表
       */
      that.getTableList = function (currentPage, pageSize) {
        that.$http.post('seller/goods/list', {
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
