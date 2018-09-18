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
                    <img :src="item.url" width="50px" height="50px" v-for="item in scope.row.smallModelPhoto">
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
                    <span>{{scope.row.productStatus == 0 ? "上架中" : "已下架"}}</span>
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :closeOnClickModal="false">
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
                        <el-form-item label="单价" prop="">
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
                    <el-col :span="12">
                        <span style="padding-left: 20px">(原价为1，0.88即为八八折)</span>
                    </el-col>
                </el-row>


                <el-row :span="24">
                    <el-form-item label="尺码">
                        <el-checkbox-group v-model="size">
                            <el-checkbox label="S" name="S"></el-checkbox>
                            <el-checkbox label="M" name="M"></el-checkbox>
                            <el-checkbox label="L" name="L"></el-checkbox>
                            <el-checkbox label="XL" name="XL"></el-checkbox>
                            <el-checkbox label="XXL" name="XXL"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-row>
                <el-row :span="24">
                    <el-form-item label="颜色">
                        <el-select
                                class="color-select"
                                v-model="color"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择颜色">
                            <el-option
                                    v-for="item in colors"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                    <el-col :span="16">
                        <el-form-item label="缩略图" prop="smallModelPhoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    :accept="accept"
                                    list-type="picture"
                                    :limit=1
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange"
                                    :on-success="handleSuccessChange"
                                    :file-list="formData.smallModelPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且单张不超过10M，缩略图只能传一张</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="16">
                        <el-form-item label="大图" prop="superModelPhoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    list-type="picture"
                                    :accept="accept"
                                    :limit=3
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange1"
                                    :on-success="handleSuccessChange1"
                                    :file-list="formData.superModelPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且单张不超过10M，大图只能传三张</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :span="24">
                    <el-col :span="16">
                        <el-form-item label="商品详图" prop="detailphoto">
                            <el-upload
                                    action="http://upload-z0.qiniu.com"
                                    list-type="picture"
                                    :accept="accept"
                                    :limit=9
                                    :data="uptoken"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemoveChange2"
                                    :on-success="handleSuccessChange2"
                                    :file-list="formData.detailPhoto">
                                <el-button size="mini" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且单张不超过10M，商品详图只能传九张</div>
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
      var categoryTypeCheck = (rule, value, callback) => {
        if (value == "" || value == null) {
          return callback(new Error('请选择类目'));
        }
      }
      var smallModelPhoto = (rule, value, callback) => {
        if (value == "" || value == null) {
          return callback(new Error('请上传至少一张图片'));
        }
      }
      var superModelPhoto = (rule, value, callback) => {
        if (value == "" || value == null) {
          return callback(new Error('请上传至少一张图片'));
        }
      }
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        accept: "image/jpeg,image/gif,image/png,image/bmp",
        title: "添加商品",
        size: ['S', 'M', 'L', 'XL'],
        color: ['白色', '黑色'],
        formData: {
          smallModelPhoto: [],
          superModelPhoto: [],
          detailPhoto: [],
        },
        colors: [{
          value: '白色',
          label: '白色'
        }, {
          value: '黑色',
          label: '黑色'
        }],
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
          categoryType: [
            {required: true, validator: categoryTypeCheck, trigger: 'blur'}
          ],
          productPrice: [
            {required: true, message: '请输入商品价格', trigger: 'blur'},
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
        this.title = "添加商品";
        this.dialogFormVisible = true;
      },
      handleEdit(formData) {
        // 调用七牛云获取uptoken
        this.getUptoken();
        this.title = "修改商品";
        // 深拷贝解决单项传递问题
        this.formData = JSON.parse(JSON.stringify(formData));
      },
      saveProductInfo(formName){
        var that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formData.color = this.color;
            this.formData.size = this.size;
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
        const isLt10M = file.size < 10 * 1024 * 1024;
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isLt10M;
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

<style scoped>
    .color-select {
        width: 90%;
    }
</style>
