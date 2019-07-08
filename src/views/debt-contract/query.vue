<template>
  <ps-container :filename="filename">
    <template slot="header">
      <el-form :inline="true" ref="form" size="small" :model="form" label-width="140px">
        <el-form-item label="合作商户：" prop="appId">
          <!-- :disabled="!isManage" -->
          <el-select
            :disabled="!isManage"
            style="width:100%"
            v-model="form.appId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择合作商户"
            :loading="merChant.loading">
            <el-option
              v-if="isManage"
              :key="manageAppId"
              label="全部"
              :value="manageAppId"></el-option>
            <el-option
              v-for="item in merChant.options"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款人姓名：" prop="partyName">
          <el-input v-model="form.partyName"></el-input>
        </el-form-item>
        <el-form-item label="借款人身份证号：" prop="partyIdcard">
          <el-input v-model="form.partyIdcard"></el-input>
        </el-form-item>
        <el-form-item label="合同创建时间：" prop="date">
          <el-date-picker
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyyMMdd"
            v-model="form.date"
            type="daterange"
            align="left"
            unlink-panels
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">立即查询</el-button>
          <el-button type="info" icon="el-icon-circle-close" @click.native="onReset">重置</el-button>
          <el-button type="success" icon="el-icon-receiving" @click.native="onHandle">批量下载</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div class="contbody">
      <el-table
        size="small"
        class="ps-table"
        header-row-class-name="ps-table-head"
        style="width: 100%"
        stripe
        v-loading="page.loading"
        :data="page.tableData"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="handleChangeExpand"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          width="180"
          label="合同创建时间"
          prop="responseTime">
          <template slot-scope="props">
            <span v-if="props.row.responseTime">{{props.row.responseTime | FilterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="合作商户"
          prop="merchantName">
        </el-table-column>
        <el-table-column
          label="借款人姓名"
          prop="partyName">
        </el-table-column>
        <el-table-column
          label="借款人身份证号"
          prop="partyIdcard">
        </el-table-column>
        <el-table-column
          label="借款合同签章"
          prop="fileName">
          <template slot-scope="props">
            <el-button size="mini" @click="handleDown(props.row, 'down')" type="primary">下载</el-button>
            <el-button size="mini" @click="handleDown(props.row, 'preview')" type="warning">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="sizes, total, prev, pager, next, jumper"
        :total="page.tableTotal">
      </el-pagination>
    </div>
    <template slot="footer"></template>
    <dialogView :show.sync='dialogView.visible' :row.sync='viewRow' v-if="dialogView.visible" />
  </ps-container>
</template>
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import debtApi from '@/api/debt'
import { pageMixin } from '@/views/mixins'
import dialogView from './components/dialogPreview'
import setting from '@/setting.js'
export default {
  name: 'query',
  mixins: [pageMixin],
  components: {
    dialogView
  },
  data () {
    return {
      filename: __filename,
      // 获取row的key值
      getRowKeys (row) {
        return row.id
      },
      expands: [],
      ids: '',
      // 下拉框loading
      merChant: {
        loading: false,
        options: []
      },
      form: {
        appId: '',
        partyName: '',
        partyIdcard: '',
        date: [dayjs().subtract(15, 'd').format('YYYYMMDD'), dayjs().format('YYYYMMDD')]
      },
      rules: {}
    }
  },
  computed: {
    isManage () {
      return this.manageAppId === this.info.appId
    },
    manageAppId () {
      return setting.appId
    },
    ...mapState('user', [
      'info'
    ])
  },
  methods: {
    // 公用分页参数
    getParam () {
      return {
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    //
    handleChangeExpand (row, expandedRows) {
    },
    // 多选框
    handleSelectionChange (arr) {
      this.selChecked = arr.map(item => {
        return { id: item.id, pdfContractNo: item.pdfContractNo }
      })
    },
    //
    handleSizeChange (val) {
      console.log(val)
      this.page.pageSize = val
      this.onSearch()
    },
    // 查看
    handlePrevieView (row) {
      if (row) {
        this.dialogView.visible = true
        this.viewRow = row
      }
    },
    // 下载
    handleDown (row, type = 'down') {
      if (!row.pdfContractNo) {
        this.$message.warning({
          message: `信息不正确!`
        })
        return false
      }
      this.page.loading = true
      let reqCmd = 'debtContractDown'
      if (type === 'preview') {
        reqCmd = 'debtContractPreview'
      }
      debtApi[reqCmd](Object.assign(
        { pdfContractNo: row.pdfContractNo }
      )).then(response => {
        this.page.loading = false
        if (response) {
          if (type === 'preview') {
            this.handlePrevieView(response)
            return false
          }
          window.open(response)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 批量处理
    onHandle () {
      // 不能为空
      if (!this.selChecked || this.selChecked.length === 0) {
        this.$message.warning({
          message: `请选择要处理的数据`
        })
        return false
      }
      // 选择待审核状态
      let statusIds = []
      // console.log(this.selChecked)
      statusIds = this.selChecked.map(item => {
        return item.pdfContractNo
      })
      const loading = this.$loading({
        lock: true,
        text: '正在打包数据，稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)'
      })
      if (statusIds.length > 0) {
        this.ids = statusIds
        // this.page.loading = true
        debtApi['debtContractBatchDown'](Object.assign(
          { pdfContractNos: this.ids }
        )).then(response => {
          loading.close()
          // this.page.loading = false
          if (response) {
            window.open(response)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 商户名称
    getMerchantOptions () {
      return new Promise((resolve, reject) => {
        this.merChant.loading = true
        debtApi['merchantList']().then(response => {
          this.merChant.loading = false
          this.merChant.options = response
          resolve()
        })
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      debtApi['debtContractList'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        this.page.loading = false
        if (response.datalist) {
          this.page.tableData = response.datalist
          this.page.tableTotal = response.rsCount
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.form.appId = this.info.appId
    if (this.isManage) {
      this.form.appId = this.manageAppId
    }
    this.getMerchantOptions().then(() => {
      this.onSearch()
    })
  }
}
</script>
