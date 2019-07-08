<template>
  <ps-container :filename="filename">
    <template slot="header"></template>
    <div class="contbody">
      <el-form ref="form" :inline="true" :rules="rules" :model="form" size="small" style="text-align: center;">
        <div  class="markdown-body">
          <h3 style="text-align: center;">转让债权债务清单</h3>
          <p style="text-align: right;">编号：______</p>
          <div class="markcont">
            <div>致 <el-form-item prop="companyName" label=" ">【<el-input v-model="form.companyName" style="width: 160px;"></el-input>】</el-form-item>：</div>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;根据编号
                <el-form-item prop="debtNo" label=" ">【<el-input v-model="form.debtNo" style="width: 160px;"></el-input></el-form-item>】的《债权债务转让合同》的约定，
                我司将总计债权本金余额（大写）人民币
                <el-form-item prop="debtAmtCapital" label=" ">【<el-input v-model="form.debtAmtCapital" style="width: 160px;"></el-input>】</el-form-item>元
                （小写 <el-form-item prop="debtAmt" label=" ">【<el-input v-model="form.debtAmt" style="width: 120px;"></el-input>】</el-form-item> 元）所对应的应收账款转让给贵司。本期应收账款的转让价格为人民币（大写）
                <el-form-item prop="loanAmtCapital" label=" ">【<el-input v-model="form.loanAmtCapital" style="width: 160px;"></el-input>】</el-form-item>元
                （小写 <el-form-item prop="loanAmt" label=" ">【<el-input v-model="form.loanAmt" style="width: 140px;"></el-input>】</el-form-item> 元），
                请贵司于
                <el-form-item prop="contractYear" label=" ">【<el-input v-model="form.contractYear" style="width: 60px;"></el-input>】</el-form-item> 年
                <el-form-item prop="contractMonth" label=" ">【<el-input v-model="form.contractMonth" style="width: 60px;"></el-input>】</el-form-item> 月
                <el-form-item prop="contractDay" label=" ">【<el-input v-model="form.contractDay" style="width: 60px;"></el-input>】</el-form-item>日将转让价款支付至我司。
            </div>
          </div>
          <p style="text-align: center; margin-top:50px; ">应收账款转让明细（附表）：</p>
          <table>
            <thead>
              <tr>
                <th>序号</th><th>资产唯一编号</th><th>借款合同编号</th><th>借款人姓名</th>
                <th>身份证号</th><th>手机号码</th><th>收款银行</th>
                <th>收款账号</th><th>合同起始日</th><th>合同到期日</th><th>申请时间</th><th>放款状态</th>
                <th>支付渠道</th><th>实际放款金额</th><th>借款利率</th><th>债转合同编号</th><th>借款用途</th><th>住址</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center;">受让方支付的转让价款、《债权债务转让清单》上载明的转让价款、受让方实际受让的应收账款金额三者不一致的，以受让方实际受让的应收账款金额为准。</p>
          <p style="text-align: right; margin-top: 40px;">转让方：哈尔滨市龙商小额贷款有限责任公司</p>
          <p style="text-align: right;">【  】年【  】月【  】日</p>
        </div>
        <el-form-item>
          <el-button type="primary" @click="handleSave()">立即创建</el-button>
          <el-button @click="handleReset()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
    </template>
  </ps-container>
</template>
<script>
import marked from 'marked'
import debtApi from '@/api/debt'

marked.setOptions({
  renderer: new marked.Renderer()
})
export default {
  data () {
    let validateBigNum = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^([零壹贰叁肆伍陆柒捌玖仟佰拾亿仟佰拾万仟佰拾元角分]+)$/.test(value))) {
          callback(new Error('请输入大写数字值'))
        } else {
          callback()
        }
      }
    }
    let validateNum = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^\d+(\.\d{0,2})?$/.test(value))) {
          callback(new Error('最多两位小数'))
        } else {
          callback()
        }
      }
    }
    let validateYear = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^([2-9]\d{3})$/.test(value))) {
          callback(new Error('大于2000的年份'))
        } else {
          callback()
        }
      }
    }
    let validateMonth = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^(0?[1-9]|1[0-2])$/.test(value))) {
          callback(new Error('正确的月份'))
        } else {
          callback()
        }
      }
    }
    let validateDay = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^(0?[1-9]|3[0-1]|2[0-8]|1[0-9])$/.test(value))) {
          callback(new Error('正确的日期'))
        } else {
          callback()
        }
      }
    }
    return {
      filename: __filename,
      // 表单
      form: {
        companyName: '',
        debtNo: '',
        debtAmtCapital: '',
        debtAmt: '',
        loanAmtCapital: '',
        loanAmt: '',
        contractYear: '',
        contractMonth: '',
        contractDay: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        debtNo: [
          { required: true, message: '请输入清单合同编号', trigger: 'blur' }
        ],
        debtAmtCapital: [
          { required: true, message: '请输入债权本金余额', trigger: 'blur' },
          { validator: validateBigNum, trigger: 'blur' }
        ],
        debtAmt: [
          { required: true, message: '请输入债权本金余额', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }
        ],
        loanAmtCapital: [
          { required: true, message: '请输入应收账款总额大写', trigger: 'blur' },
          { validator: validateBigNum, trigger: 'blur' }
        ],
        loanAmt: [
          { required: true, message: '请输入应收账款总额小写', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }
        ],
        contractYear: [
          { required: true, message: '请输入年', trigger: 'blur' },
          { validator: validateYear, trigger: 'blur' }
        ],
        contractMonth: [
          { required: true, message: '请输入月', trigger: 'blur' },
          { validator: validateMonth, trigger: 'blur' }
        ],
        contractDay: [
          { required: true, message: '请输入日', trigger: 'blur' },
          { validator: validateDay, trigger: 'blur' }
        ]
      },
      code: ``
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.code, { sanitize: true })
    }
  },
  methods: {
    handleSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.$route.query, { debtApprovalId: this.$route.query.debtApprovalId })
          debtApi['debtContractAdd'](Object.assign(
            this.form,
            this.$route.query
          )).then(response => {
            if (response) {
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleReset () {
      this.$refs['form'].resetFields()
    }
  }
}
</script>
<style lang="scss">
$height: 46px;
$height-label: 38px;
$height-inner: 28px;
.markdown-body {
  margin: 10px ;
  // height: 500px;
  font-size: 14px;
  padding: 20px 40px;
  border: 1px solid #f2f2f2;
  margin-bottom: 40px;
  box-shadow: 6px 7px 4px #ccc;
  text-align: center;
  .markcont {
    line-height: $height;
    text-align: left;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: $height-label;
  }
  .el-input__inner {
    border: 0;
    border-radius: 0;
    height: $height-inner;
    line-height: $height-inner;
    position: static;
    border-bottom: 1px solid #000;
  }
  .el-form-item--small .el-form-item__error {
    padding-left: 10px;
    margin-top: -2px;
  }
}
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.markdown-body table th {
  font-weight: 700
}
.markdown-body table td,.markdown-body table th {
  padding: 8px 5px;
  border: 1px solid #ddd
}
.markdown-body table td {
  height: 18px;
}
.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #ccc
}
.markdown-body table tr:nth-child(2n) {
 background-color: #f8f8f8
}
</style>
