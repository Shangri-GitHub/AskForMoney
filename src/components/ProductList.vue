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
            <el-table-column label="商品Id" prop="productId"></el-table-column>
            <el-table-column label="名称" prop="productName"></el-table-column>
            <el-table-column label="商品图片" width="80" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.smallmodelPhoto.url" width="50px" height="50px">
                </template>
            </el-table-column>
            <el-table-column label="单价" prop="productPrice"></el-table-column>
            <el-table-column label="库存" prop="productStock"></el-table-column>
            <el-table-column label="描述" prop="productDescription" width="180"></el-table-column>
            <el-table-column label="类目">
                <template slot-scope="scope">
                    <span>{{categoryObj[scope.row.categoryType].categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="上架状态" prop="productStatus">
                <template slot-scope="scope">
                    <span>{{scope.row.productStatus==0?"上架中":"已下架"}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="dialogFormVisible = true;handleEdit(scope.row)">修改
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
        <!--修改商品的弹出框-->
        <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="80px" size="mini">
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="productName">
                            <el-input v-model="formData.productName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类目" prop="categoryType">
                            <el-select v-model="formData.categoryType" placeholder="请选择类目">
                                <el-option
                                        v-for="item in options"
                                        :key="item.categoryId"
                                        :label="item.categoryName"
                                        :value="item.categoryType">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="单价" prop="productPrice">
                            <el-input type="number" v-model="formData.productPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存">
                            <el-input-number v-model.number="formData.productStock" :min="0" :max="1000"
                                             label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="打折优惠">
                            <el-input v-model="formData.productRate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-form-item label="上架状态">
                        <el-switch inactive-text="下架..."
                                   active-text="上架..."
                                   :inactive-value=1
                                   :active-value=0
                                   v-model="formData.productStatus">
                        </el-switch>
                    </el-form-item>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="缩略图" prop="smallModelPhoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    list-type="picture"
                                    :limit=1
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange"
                                    :on-success="handleSuccessChange"
                                    :file-list="formData.smallModelPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过10M</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="大图" prop="superModelPhoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    list-type="picture"
                                    :limit=3
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange1"
                                    :on-success="handleSuccessChange1"
                                    :file-list="formData.superModelPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过10M</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="商品详图" prop="detailphoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    list-type="picture"
                                    :limit=9
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange2"
                                    :on-success="handleSuccessChange2"
                                    :file-list="formData.detailPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过10M</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :span="24">
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="formData.productDescription"></el-input>
                    </el-form-item>
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
  import Config from '../config'
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (value == "") {
          return callback(new Error('商品单价不能为空'));
        }
        if (value < 0) {
          return callback(new Error('商品单价不能是负数'));
        }
      };
      var categoryTypeCheck = (rule, value, callback) => {
        if(value == "" || value == null){
          return callback(new Error('请选择类目'));
        }
      }
      var smallModelPhoto = (rule, value, callback) => {
        if(value == "" || value == null){
          return callback(new Error('请上传至少一张图片'));
        }
      }
      var superModelPhoto = (rule, value, callback) => {
        if(value == "" || value == null){
          return callback(new Error('请上传至少一张图片'));
        }
      }
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        num1: 1,
        formData: {
          smallModelPhoto: [],
          superModelPhoto: [],
          detailPhoto: []
        },
        options: [],
        categoryObj: {},
        uptoken: {
          token: '',
          key: ""
        },
        rules: {
          productName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          productPrice: [
            {required: true, validator: checkAge, trigger: 'blur'},
          ],
          categoryType: [
            {required: true, validator: categoryTypeCheck, trigger: 'blur'}
          ],
          smallModelPhoto: [
            {required: true, validator: smallModelPhoto, trigger: 'blur'}
          ],
          superModelPhoto: [
            {required: true, validator: superModelPhoto, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      createProductInfo(){
        // 调用七牛云获取uptoken
        this.getUptoken();
        this.formData = {};
        this.dialogFormVisible = true;
      },
      saveProductInfo(formName){
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$http.post('seller/product/save', this.formData).then(function (res) {
              if (res.data.code == 0) {
                that.getTableList(that.currentPage, that.pageSize);
                that.dialogFormVisible = false;
                that.$message({
                  type: 'success',
                  message: '修改商品成功' + res.data.msg + '!'
                });
              }
            })
          } else {
            that.getTableList(that.currentPage, that.pageSize);
            return false;
          }
        });
      },
      beforeAvatarUpload(file) {
        this.uptoken.key = file.name;
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
        const isLt2M = file.size < 10 * 1024 * 1024;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemoveChange2(file, fileList){
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })
        this.formData.detailPhoto = filelists;
      },
      handleSuccessChange2(response, file, fileList) { //上传成功后在图片框显示图片
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })
        this.formData.detailPhoto = filelists;
      },
      handleRemoveChange1(file, fileList){
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })
        this.formData.superModelPhoto = filelists;
      },
      handleSuccessChange1(response, file, fileList) { //上传成功后在图片框显示图片
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })
        this.formData.superModelPhoto = filelists;
      },
      handleRemoveChange(file, fileList){
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })

        this.formData.smallModelPhoto = filelists;
      },
      handleSuccessChange(response, file, fileList) { //上传成功后在图片框显示图片
        var filelists = [];
        fileList.forEach(function (elem) {
          var item = {
            name: elem.name,
            url: Config.qiniu.action + elem.name
          }
          filelists.push(item);
        })
        this.formData.smallModelPhoto = filelists;
      },
      handleEdit(formData) { debugger
        // 调用七牛云获取uptoken
        this.getUptoken();
        // 深拷贝解决单项传递问题
        this.formData = JSON.parse(JSON.stringify(formData));
        // todo 读取存储成功过的图片
        console.log(formData)

//        this.fileList = [{
//          name: "food.jpeg",
//          url: formData.productIcon
//        }]
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
       * 获取七牛云token
       */
      that.getUptoken = function () {
        that.$http.get("qiniu/getUpToken").then(function (res) {
          that.uptoken.token = res.data.data.upToken;
        })
      }
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
      that.getTableList(that.currentPage, that.pageSize);
      /**
       * 获取下拉框的数据
       */
      that.$http.post('seller/category/findAll').then(function (res) {
        that.options = res.data.data;
        that.options.forEach(function (ele) {
          that.categoryObj[ele.categoryType] = ele;
        })
      })
    }
  }
</script>

<style>

</style>
