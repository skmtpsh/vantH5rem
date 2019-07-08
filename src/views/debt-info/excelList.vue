<template>
  <ps-container :filename="filename">
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
          fixed
          width="50"
          label="序号"
          prop="sequence">
        </el-table-column>
        <el-table-column
          fixed
          width="200"
          label="资产唯一编号"
          prop="assetNo">
        </el-table-column>
        <el-table-column
          width="200"
          label="借款合同编号"
          prop="loanContractNo">
        </el-table-column>
        <el-table-column
          width="100"
          label="借款人姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          width="150"
          label="身份证号"
          prop="idCard">
        </el-table-column>
        <el-table-column
          width="110"
          label="手机号"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="收款银行"
          prop="bankName">
        </el-table-column>
        <el-table-column
          width="160"
          label="收款账号"
          prop="bankcardNo">
        </el-table-column>
        <el-table-column
          width="100"
          label="合同起始日"
          prop="contractStartDate">
          <template slot-scope="props">
            <span v-if="props.row.contractStartDate">{{props.row.contractStartDate | FilterTime('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="合同到期日"
          prop="contractEndDate">
          <template slot-scope="props">
            <span v-if="props.row.contractEndDate">{{props.row.contractEndDate | FilterTime('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="申请时间"
          prop="applyTime">
          <template slot-scope="props">
            <span v-if="props.row.applyTime">{{props.row.applyTime | FilterTime('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="放款状态"
          prop="loanStatus">
        </el-table-column>
        <el-table-column
          label="支付渠道"
          prop="payChannel">
        </el-table-column>
        <el-table-column
          width="100"
          label="实际放款金额"
          prop="loanAmt">
        </el-table-column>
        <el-table-column
          label="借款利率"
          prop="loanRate">
        </el-table-column>
        <el-table-column
          width="180"
          label="债转合同编号"
          prop="debtContractNo">
        </el-table-column>
        <el-table-column
          width="180"
          label="借款用途"
          prop="loanPurpose">
        </el-table-column>
        <el-table-column
          width="180"
          label="地址"
          prop="address">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangeList"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="page.tableTotal">
      </el-pagination>
    </div>
  </ps-container>
</template>
<script>
import debtApi from '@/api/debt'
import { pageMixin } from '@/views/mixins'
export default {
  name: 'excellist',
  mixins: [pageMixin],
  data () {
    return {
      filename: __filename
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      return {
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    // 分页2
    handleCurrentChangeList (val) {
      this.page.currentPage = val
      this.getSyncList(this.$route.query)
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      debtApi['debtList'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        this.page.loading = false
        if (response.datalist) {
          this.page.tableData = response.datalist
          this.page.tableTotal = response.rsCount
        }
      }).catch(error => {
        this.page.loading = false
        console.log(error)
      })
    }
  },
  created () {
    let fileWayList = ['picture', 'constract', 'debt']
    let fileWay = this.$route.query.fileWay
    if (fileWayList.indexOf(fileWay) === -1) {
      return false
    }
    this.getSyncList(this.$route.query)
  }
}
</script>
