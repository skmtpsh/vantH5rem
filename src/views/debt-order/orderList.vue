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
        <el-form-item label="债转合同编码：" prop="contractNo">
          <el-input v-model="form.contractNo"></el-input>
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
        >
        <el-table-column
          width="150"
          label="合同创建时间"
          prop="createTime">
          <template slot-scope="props">
            <span v-if="props.row.createTime">{{props.row.createTime | FilterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="合作商户"
          prop="merchantName">
        </el-table-column>
        <el-table-column
          width="180"
          label="本期应收账款总额（元）"
          prop="loanAmt">
        </el-table-column>
        <el-table-column
          width="180"
          label="债转合同编号"
          prop="contractNo">
        </el-table-column>
        <el-table-column
          width="150"
          label="债转合同签章"
          prop="fileName">
          <template slot-scope="props">
            <el-button size="mini" :disabled="!props.row.pdfContractNo" @click="handleDown(props.row, 'contract')" type="primary">下载</el-button>
            <el-button size="mini" :disabled="!props.row.pdfContractNo" @click="handleView(props.row, 'contract')" type="warning">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="债转清单签章">
          <template slot-scope="props">
            <el-button size="mini" :disabled="!props.row.excelContractNo" @click="handleDown(props.row, 'debt')" type="primary">下载</el-button>
            <el-button size="mini" :disabled="!props.row.excelContractNo" @click="handleView(props.row, 'debt')" type="warning">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="影像资料包">
          <template slot-scope="props">
            <el-button size="mini" :disabled="!props.row.pictureName" @click="handleDown(props.row, 'picture')" type="primary">下载</el-button>
            <el-popover
              style="margin-left: 10px;"
              ref="popover3"
              placement="left"
              title="影像资料名称"
              width="420"
              trigger="click" >
              <span>{{pictureName}}</span>
              <el-button slot="reference" :disabled="!props.row.pictureName" size="mini" @click="handleView(props.row, 'picture')" type="warning">查看</el-button>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="page.tableTotal">
      </el-pagination>
      <dialogView :show.sync='dialogView.visible' :row.sync='viewRow' v-if="dialogView.visible" />
    </div>
    <template slot="footer"></template>
  </ps-container>
</template>
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import debtApi from '@/api/debt'
import { pageMixin } from '@/views/mixins'
import dialogView from './components/dialogPreview'
import setting from '@/setting.js'
// 定义类型
const CONSTRACT = 'contract'
const PICTURE = 'picture'
const DEBT = 'debt'
// 预览接口
const interPreviewDebt = {
  [CONSTRACT]: 'debtPreviewContract',
  [PICTURE]: 'debtPreviewPicture',
  [DEBT]: 'debtPreviewDebt'
}
// 下载接口
const interDownDebt = {
  [CONSTRACT]: 'debtDownContract',
  [PICTURE]: 'debtDownPicture',
  [DEBT]: 'debtDownDebt'
}
export default {
  name: 'check',
  mixins: [pageMixin],
  components: {
    dialogView
  },
  data () {
    return {
      filename: __filename,
      // 下拉框loading
      merChant: {
        loading: false,
        options: []
      },
      form: {
        appId: '',
        contractNo: '',
        date: [dayjs().subtract(15, 'd').format('YYYYMMDD'), dayjs().format('YYYYMMDD')]
      },
      rules: {},
      pictureName: ''
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
    // 下载
    handleDown (row, type) {
      let option = {
        picture: { debtApprovalId: row.debtApprovalId, type },
        debt: { excelContractNo: row.excelContractNo, type },
        contract: { pdfContractNo: row.pdfContractNo, type }
      }
      if (!row[Object.keys(option[type])[0]]) {
        this.$message.warning({
          message: `信息不正确!`
        })
        return false
      }
      this.page.loading = true
      debtApi[interDownDebt[type]](Object.assign(
        option[type]
      )).then(response => {
        this.page.loading = false
        if (response) {
          window.open(response)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看
    handlePrevieView (row) {
      if (row) {
        this.dialogView.visible = true
        this.viewRow = row
      }
    },
    // 查看
    handleView (row, type) {
      let option = {
        picture: { debtApprovalId: row.debtApprovalId, type },
        debt: { excelContractNo: row.excelContractNo, type },
        contract: { pdfContractNo: row.pdfContractNo, type }
      }

      console.log(option, option[type], Object.keys(option[type]))
      if (!row[Object.keys(option[type])[0]]) {
        this.$message.warning({
          message: `返回信息不正确!`
        })
        return false
      }
      // this.$router.push({ path: '/order/orderpic', query: option[type] })
      this.page.loading = true
      console.log(interPreviewDebt[type])
      debtApi[interPreviewDebt[type]](Object.assign(
        option[type]
      )).then(response => {
        this.page.loading = false
        if (response) {
          if (type === 'picture') {
            this.pictureName = response
            return false
          }
          this.handlePrevieView(response)
        }
      }).catch(error => {
        this.page.loading = true
        console.log(error)
      })
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
      debtApi['debtListContract'](Object.assign(
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
    // if (this.isManage) {
    //   this.form.appId = this.manageAppId
    // }
    this.getMerchantOptions().then(() => {
      this.onSearch()
    })
  }
}
</script>
