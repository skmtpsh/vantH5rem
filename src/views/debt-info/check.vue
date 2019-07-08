<template>
  <ps-container :filename="filename">
    <template slot="header">
      <el-form :inline="true" ref="form" size="small" :model="form" label-width="110px">
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
        <el-form-item label="审核状态：" prop="approvalStatus">
          <el-select
            style="width:100%"
            v-model="form.approvalStatus"
            filterable
            remote
            reserve-keyword
            placeholder="请选择审核状态">
            <el-option
              key="全部"
              label="全部"
              value=""></el-option>
            <el-option
              v-for="item in approOptions"
              :key="item.dicCode"
              :label="item.disName"
              :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核资料：" prop="fileWay">
          <el-select
            style="width:100%"
            v-model="form.fileWay"
            filterable
            remote
            reserve-keyword
            placeholder="请选择资料">
            <el-option
              key="全部"
              label="全部"
              value=""></el-option>
            <el-option
              v-for="item in resOptions"
              :key="item.dicCode"
              :label="item.disName"
              :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交审核时间：" prop="date">
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
          <el-button type="success" v-if="isManage" icon="el-icon-receiving" @click.native="onHandle">批量处理</el-button>
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
          label="提交审核时间 "
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
          label="清单实际放款总金额（元）"
          prop="debtTotalAmt">
        </el-table-column>
        <el-table-column
          width="80"
          label="审核状态"
          prop="approvalStatus">
          <template slot-scope="props">
            <!-- <span v-if="props.row.approvalStatus">{{ props.row.approvalStatus | FilterStatus }}</span> -->
            <el-tag :type="getStatus(props.row.approvalStatus)">{{props.row.approvalStatus | FilterStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="360"
          label="审核资料"
          prop="fileName">
          <template slot-scope="props">
            <el-button type="text" @click="handleUrl(props.row)">{{ props.row.fileName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :width="isManage ? 220 : 150"
          label="操作">
          <template slot-scope="props">
            <el-button size="mini" v-if="props.row.approvalStatus === '0' && isManage" @click="handleApp(props.row)" type="primary">处理</el-button>
            <el-button size="mini" v-if="props.row.approvalStatus !== '0'" @click="handleView(props.row)" type="warning">查看</el-button>
            <el-button size="mini" v-if="props.row.approvalStatus === '0' " @click="handleDel(props.row)" type="danger">删除</el-button>
            <!--创建合同4个条件：1.待审核 2.清单 3.合同未创建 4.管理员-->
            <el-button size="mini" v-if="props.row.approvalStatus === '1' && isManage && props.row.fileWay === 'debt' && !props.row.pdfContractNo" @click="handleCreate(props.row)" type="success">合同创建</el-button>
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
    </div>
    <dialogHandle :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' :ids.sync='ids' v-if="dialog.visible" />
    <dialogView :show.sync='dialogView.visible' :row.sync='viewRow' v-if="dialogView.visible" />
    <dialogCreate :show.sync='dialogCreate.visible' @change="handleDialogChange" :row.sync='createRow' v-if="dialogCreate.visible" />
    <template slot="footer"></template>
  </ps-container>
</template>
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import debtApi from '@/api/debt'
import { pageMixin } from '@/views/mixins'
import dialogHandle from './components/dialogHandle'
import dialogView from './components/dialogView'
import dialogCreate from './components/dialogConstract'
import setting from '@/setting.js'
export default {
  name: 'check',
  mixins: [pageMixin],
  components: {
    dialogHandle,
    dialogView,
    dialogCreate
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
      approOptions: [
        { dicCode: '0', disName: '待审核' },
        { dicCode: '1', disName: '通过' },
        { dicCode: '2', disName: '拒绝' }
      ],
      resOptions: [
        { dicCode: 'debt', disName: '债转清单' },
        { dicCode: 'picture', disName: '影像资料' }
      ],
      form: {
        appId: '',
        approvalStatus: '',
        fileWay: '',
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
  filters: {
    FilterStatus (status) {
      let statusTxt = ''
      if (status === '0') {
        statusTxt = '待审核'
      } else if (status === '1') {
        statusTxt = '通过'
      } else {
        statusTxt = '拒绝'
      }
      return statusTxt
    }
  },
  methods: {
    // 审核状态
    getStatus (status) {
      let statusType = ''
      if (status === '0') {
        statusType = 'primary'
      } else if (status === '1') {
        statusType = 'success'
      } else {
        statusType = 'danger'
      }
      return statusType
    },
    // 公用分页参数
    getParam () {
      return {
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    // 删除规则
    handleDel (row) {
      if (!row.id) {
        return
      }
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.page.loading = true
        debtApi['debtListDel'](Object.assign(
          this.getParam(),
          { id: row.id }
        )).then(response => {
          this.page.loading = false
          if (response === null) {
            this.$message.warning({
              message: `删除成功!`
            })
          }
          this.onSearch()
        }).catch(error => {
          this.page.loading = false
          console.log(error)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 单独处理
    handleApp (row) {
      if (row) {
        this.dialog.visible = true
        this.modRow = row
      }
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
      for (let item of this.selChecked) {
        if (item.status !== '0') {
          this.$message.warning({
            message: `请选择状态 ‘待审核’ 的数据！`
          })
          return false
        } else {
          statusIds.push(item.id)
        }
      }
      if (statusIds.length > 0) {
        this.ids = statusIds
        this.dialog.visible = true
      }
    },
    // 查看
    handleView (row) {
      if (row) {
        this.dialogView.visible = true
        this.viewRow = row
      }
    },
    // 处理URL
    handleUrl (row) {
      let query = { debtListCversion: row.debtListCversion, fileWay: row.fileWay, id: row.id }
      let fileWay = row.fileWay
      if (fileWay === 'picture') {
        this.page.loading = true
        debtApi['debtList'](Object.assign(
          this.getParam(),
          query
        )).then(response => {
          this.page.loading = false
          if (response.urlAddress) {
            window.open(response.urlAddress)
          }
        }).catch(error => {
          this.page.loading = false
          console.log(error)
        })
      } else if (fileWay === 'debt') {
        this.$router.push({ path: '/info/excellist', query })
      }
    },
    //
    /**
     * 创建合同
     * 由路由改为弹框保证创建合同只能创建一次
     */
    handleCreate (row) {
      if (row) {
        this.dialogCreate.visible = true
        this.createRow = row
      }
      // this.$router.push({ path: '/contract/create', query: { debtApprovalId: row.id } })
    },
    //
    handleChangeExpand (row, expandedRows) {
    },
    // 多选框
    handleSelectionChange (arr) {
      console.log(arr)
      this.selChecked = arr.map(item => {
        return { id: item.id, status: item.approvalStatus }
      })
      // this.ids = this.arr.reduce((pre, cur) => {
      //   if (cur.approvalStatus === '0') {
      //     pre.push(cur)
      //   }
      //   return pre
      // }, []).join(',')
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
    // 更新接口数据
    upDateList (row, updateObj = {}) {
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      debtApi['checkList'](Object.assign(
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
