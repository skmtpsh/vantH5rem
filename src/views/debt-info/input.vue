<template>
  <ps-container :filename="filename">
    <template slot="header"></template>
    <div class="contbody">
      <div class="tip">债转清单录入 <el-tag type="warning">(格式：对账日期_合作商户简称_债转清单_该期实际放款总金额万元)</el-tag></div>
      <el-form status-icon ref="form" label-width="100px">
        <el-form-item label="下载模板：">
          <el-button @click.native="downLoadExcel"><svg-icon icon-class="excel" style="height: 32px; width: 32px;" /></el-button>
          <el-tag type="danger" style="margin-left: 10px;"> <b>* 下载的模板列宽 不可 改变，否则合同格式可能会发生变形</b></el-tag>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <!-- accept="aplication/zip" -->
        <!-- :http-request="devUpload" -->
        <el-form-item label="上传文件：">
          <el-upload
            drag
            action
            name="files"
            ref="uploadExcel"
            :show-file-list='true'
            :before-upload="beforeUpload"
            :http-request="devUpload"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip"><el-tag type="danger"><i class="el-icon-s-opportunity"></i> 只能上传 excel 文件，且不超过20M</el-tag></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="tip">影像资料录入 <el-tag type="warning">(格式：对账日期_合作商户简称_影像资料_该期实际放款总金额万元)</el-tag></div>
      <el-form status-icon ref="form" label-width="100px">
        <el-form-item label="上传文件：">
          <el-upload
            drag
            action
            name="files"
            :show-file-list='true'
            :before-upload="beforeUploadZip"
            :http-request="devUploadZip"
            ref="upload"
            accept="application/zip"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>点击上传 </em></div>
            <div class="el-upload__tip" slot="tip"><el-tag type="danger"><i class="el-icon-s-opportunity"></i> 只能上传 zip 文件，且不超过20M </el-tag></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template slot="footer"></template>
    </div>
  </ps-container>
</template>
<script>
import debtUploadApi from '@/api/debtUpload'
import { pageMixin } from '@/views/mixins'
export default {
  name: 'check',
  mixins: [pageMixin],
  data () {
    return {
      filename: __filename
    }
  },
  methods: {
    checkTypeM (file, type = 'zip') {
      let fileName = file.name.substr(0, file.name.lastIndexOf('.'))
      const isLtM = file.size / 1024 / 1024 > 20
      let subfix = file.name.substr(file.name.lastIndexOf('.'))
      let checkType = ['.zip']
      let regType = /^[1-9]+\d+(-[1-9]\d+)?_\S+_\u5f71\u50cf\u8d44\u6599_(\d+(\.\d{0,2})?)\u4e07\u5143$/
      if (type === 'excel') {
        checkType = ['.xls', '.xlsx']
        regType = /^[1-9]+\d+(-[1-9]\d+)?_\S+_\u503a\u8f6c\u6e05\u5355_(\d+(\.\d{0,2})?)\u4e07\u5143$/
      }
      if (!regType.test(fileName)) {
        this.$message.warning({
          message: `请上传正确命名格式的文件`
        })
        return false
      }
      // console.log(checkType, subfix)
      // console.log(checkType.includes(subfix))
      if (!checkType.includes(subfix)) {
        this.$message.warning({
          message: `请上传${type}格式的文件`
        })
        // console.log(`请上传${type}格式的文件`)
        return false
      }
      if (isLtM) {
        this.$message.warning({
          message: '请上传不超过20M'
        })
        return false
      }
      // return false
    },
    // 下载
    downLoadExcel () {
      debtUploadApi['downLoadExcel']().then(response => {
        if (response) {
          window.open(response)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 上传excel之前验证
    beforeUpload (file) {
      return this.checkTypeM(file, 'excel')
    },
    // 上传调用
    devUpload (fileObj) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传数据，稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)'
      })
      debtUploadApi['upLoadDebtListForm'](fileObj).then(response => {
        loading.close()
        let { code } = response
        if (code === 200) {
          this.$message.warning({
            message: '上传清单成功!'
          })
          // console.log(this.fileList)
        } else {
          this.$refs.uploadExcel.uploadFiles.pop()
        }
      }).catch(error => {
        loading.close()
        console.log(error)
      })
    },
    // 上传zip之前验证
    beforeUploadZip (file) {
      return this.checkTypeM(file, 'zip')
    },
    // 上传zip调用
    devUploadZip (fileObj) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传数据，稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)'
      })
      // console.log(this.$refs.upload)
      debtUploadApi['upLoadDebtPicture'](fileObj).then(response => {
        loading.close()
        let { code } = response
        if (code === 200) {
          this.$message.warning({
            message: '上传影像资料成功!'
          })
          // console.log(this.fileList)
        } else {
          this.$refs.uploadExcel.uploadFiles.pop()
        }
      }).catch(error => {
        loading.close()
        console.log(error)
      })
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
.el-upload__tip {
  margin-top: -10px;
  i {
    font-size: 16px;
    color: #f56c6c
  }
}
</style>
