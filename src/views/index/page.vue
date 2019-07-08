<template>
  <ps-container :filename="filename">
    <h3 class="boxtitle">今日统计</h3>
    <el-row type="flex" class="rowbox" justify="space-between" :gutter="20">
      <el-col :md="6">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-setting"></i></div>
          <div class="gridtxt">
            <p>今日拒绝量</p>
            <div class="gridnum" v-if="statics">
              <h4>{{statics.refuseCnt ? statics.refuseCnt : 0}}</h4><span>{{statics.refusePercent ? statics.refusePercent : 0}} %</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-news"></i></div>
          <div class="gridtxt">
            <p>今日人工审核量</p>
            <div class="gridnum" v-if="statics">
              <h4>{{statics.approvalCnt ? statics.approvalCnt : 0}}</h4><span>{{statics.approvalPercent ? statics.approvalPercent : 0}} %</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-share"></i></div>
          <div class="gridtxt">
            <p>今日通过量</p>
            <div class="gridnum" v-if="statics">
              <h4>{{statics.passCnt ? statics.passCnt : 0}}</h4><span>{{statics.passPercent ? statics.passPercent : 0}} %</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-date"></i></div>
          <div class="gridtxt">
            <p>今日总量</p>
            <div class="gridnum" v-if="statics"><h4>{{statics.totalCnt ? statics.totalCnt : 0}}</h4><span></span></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <h3 class="boxtitle">风险事件统计</h3>
    <el-form :model="form" ref="form" label-width="100px" style="overflow: hidden;">
      <el-form-item label="统计时间：" prop="date">
        <el-radio-group v-model="form.timeType" @change='handleChangeDayOption'>
          <el-radio-button label="1">今天</el-radio-button>
          <el-radio-button label="2">昨天</el-radio-button>
          <el-radio-button label="3">最近七天</el-radio-button>
          <el-radio-button label="4">最近三十天</el-radio-button>
        </el-radio-group>
        <span style="padding: 0 10px;"></span>
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
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
      <el-form-item label="策略集：">
        <el-select
          v-model="form.strgyFirstId"
          filterable
          reserve-keyword
          placeholder="请输入业务类型"
          :loading="appIdOptions.loading"
          @change='handleChangeProOption'>
          <el-option
            key="全部"
            label="全部"
            value=""></el-option>
          <el-option
            v-for="item in appIdOptions.options"
            :key="item.id"
            :label="item.strgyName"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="padding: 0 10px;"></span>
        <el-select
          v-model="form.strgySecondId"
          filterable
          reserve-keyword
          placeholder="请输入业务类型"
          :loading="ruleOptions.loading">
          <el-option
            v-for="item in ruleOptions.options"
            :key="item.id"
            :label="item.strgyName"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="padding: 0 10px;"></span>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="rowbox" :gutter="20" style="padding:30px 0; text-align: center;">
      <el-col :sm="6" :md="6" v-if="chartTotal.refusePercent >= 0" >
        <percent-bar :percentNum="chartTotal.refusePercent"></percent-bar>
        <p>拒绝事件：{{chartTotal.refuseCnt}} </p>
      </el-col>
      <el-col :sm="6" :md="6" v-if="chartTotal.passPercent >= 0" >
        <percent-bar :percentNum="chartTotal.passPercent"></percent-bar>
        <p>通过事件：{{chartTotal.passCnt}} </p>
      </el-col>
      <el-col :sm="6" :md="6" v-if="chartTotal.passPercent >= 0" >
        <percent-bar :percentNum="chartTotal.approvalPercent"></percent-bar>
        <p>人工审核事件：{{chartTotal.approvalCnt}} </p>
      </el-col>
      <el-col :sm="6" v-if="chartTotal.totalCnt >= 0" :md="6">
        <percent-bar :percentNum="100"></percent-bar>
        <p>全部：{{chartTotal.totalCnt}} </p>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :sm="24" style="text-align:right;">
        <el-radio-group v-model="chartIndex" @change="handleChangeChart" size="mini" >
          <el-radio-button label="1"><svg-icon icon-class="chart" /> 柱状图</el-radio-button>
          <el-radio-button label="0"><svg-icon icon-class="chart-line" /> 折线图</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row> -->
    <el-row type="flex" class="rowbox" :gutter="20" style="padding:30px 0px;">
      <el-col :sm="24" :md="24">
        <div style="margin: 20px;">
          <!-- <ve-chart :data="chartData" :height="chartHeight" :loading="chartLoading" :colors="colors" :toolbox="toolbox" :data-empty="chartDataEmpty" :extend="chartExtend" :settings="chartSettings" ></ve-chart> -->
          <ve-histogram :data="chartData" :height="chartHeight" :loading="chartLoading" :colors="colors" :toolbox="toolbox" :data-empty="chartDataEmpty" :extend="chartExtend" :settings="chartSettings" ></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </ps-container>
</template>

<script>
import matchApi from '@/api/match'
import dayjs from 'dayjs'

export default {
  name: 'index',
  data () {
    this.colors = ['#19d4ae', '#5ab1ef', '#5ab1ef',
      '#fa6e86', '#fa6e86', '#ffb980',
      '#ffb980']
    this.chartSettings = {
    //   metrics: ['事件总量', '拒绝事件', '通过事件', '审核事件']
    //   yAxisType: ['percent'],
      xAxisType: 'time',
      datatype: 'percent'
    }
    this.toolbox = {
      feature: {
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: '折线图',
            bar: '柱状图'
          }
        }
      }
    }
    // this.typeArr = ['line', 'histogram']
    return {
      filename: __filename,
      chartHeight: '500px',
      chartExtend: {
        title: {
          text: ''
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        series: {
        },
        tooltip: {
          formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              let str = `<br/> ${params[i].marker} ${params[i].seriesName} ${params[i].value ? params[i].value : '-'}`
              relVal += str
              if (params[i].seriesName.indexOf('比例') > -1) {
                relVal += `${params[i].value ? '%' : ''}`
              }
            }
            return relVal
          }
        }
      },
      chartData: {
        columns: ['日期', '事件总量', '拒绝事件', '拒绝比例', '通过事件', '通过比例', '审核事件', '审核比例'],
        rows: []
      },
      chartIndex: 1,
      // chartSettings: {
      //   type: this.typeArr[1]
      // },
      chartTotal: {},
      chartLoading: false,
      chartDataEmpty: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(7, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(1, 'M').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(3, 'M').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }]
      },
      form: {
        timeType: '4',
        strgyFirstId: '',
        strgySecondId: '',
        date: [dayjs().subtract(30, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
      },
      // 今日统计
      statics: '',
      appIdOptions: {
        options: [],
        loading: false
      },
      ruleOptions: {
        options: [],
        loading: false
      }
    }
  },
  methods: {
    // 图表切换
    handleChangeChart (type) {
      this.chartSettings = { type: this.typeArr[type] }
    },
    handleChangeDayOption (day) {
      if (day === '1') {
        this.form.date = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
      } else if (day === '2') {
        this.form.date = [dayjs().subtract(1, 'd').format('YYYY-MM-DD'), dayjs().subtract(1, 'd').format('YYYY-MM-DD')]
      } else if (day === '3') {
        this.form.date = [dayjs().subtract(6, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
      } else if (day === '4') {
        this.form.date = [dayjs().subtract(29, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
      }
    },
    // 公用分页参数
    getParam () {
      return {
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : ''
      }
    },
    // 查询
    onSearch () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.getSyncList(Object.assign(this.form))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 条件配置选择下拉
    getAppOption () {
      // return new Promise((resolve, reject) => {
      this.appIdOptions.loading = true
      matchApi['ruleGetStraFirst']({
        strgyName: ''
      }).then(response => {
        this.appIdOptions.loading = false
        this.appIdOptions.options = response
        // resolve('ok')
      })
      // })
    },
    //
    handleChangeProOption (val) {
      this.form.strgySecondId = ''
      if (!val) {
        this.ruleOptions.options = []
        return false
      }
      this.getRuleOption(val)
    },
    // 条件配置选择下拉
    getRuleOption (strgyFirstId) {
      this.ruleOptions.loading = true
      matchApi['ruleGetStraSecond']({
        strgyFirstId
      }).then(response => {
        this.ruleOptions.loading = false
        this.ruleOptions.options = response
      })
    },
    // 查询
    getStraFirst (option = {}) {
      matchApi['ruleGetInfoToday']().then(response => {
        this.statics = response
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      // const EMPTY_DATA = {
      //   columns: [],
      //   rows: []
      // }
      this.chartLoading = true
      matchApi['ruleGetResultRecord'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        // { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 }
        this.chartLoading = false
        this.chartDataEmpty = !response.rows.length
        if (response.rows.length > 0) {
          // '拒绝事件': item.refuseCnt + '(' + item.refusePercent + ')',
          // '通过事件': item.passCnt + '(' + item.passPercent + ')',
          // '审核事件': item.approvalCnt + '(' + item.approvalPercent + ')'
          let rowsData = response.rows.map((item) => {
            // return {
            //   '日期': dayjs(item.staDate).format('YYYY-MM-DD'),
            //   '事件总量': item.totalCnt,
            //   '拒绝事件': { count: item.refuseCnt, percent: item.refusePercent },
            //   '通过事件': { count: item.passCnt, percent: item.passPercent },
            //   '审核事件': { count: item.approvalCnt, percent: item.approvalPercent }
            // }
            return {
              '日期': dayjs(item.staDate).format('YYYY/MM/DD'),
              '事件总量': item.totalCnt,
              '拒绝事件': item.refuseCnt,
              '拒绝比例': item.refusePercent,
              '通过事件': item.passCnt,
              '通过比例': item.passPercent,
              '审核事件': item.approvalCnt,
              '审核比例': item.approvalPercent
            }
          })
          this.chartData.rows = rowsData
          this.chartTotal = response.total
        } else {
          // this.chartData = EMPTY_DATA
          this.chartData.rows = []
          this.chartTotal = {}
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getStraFirst()
    this.getAppOption()
    this.getSyncList()
  }
}
</script>
<style lang="scss" scoped>
.rowbox {
  background-color: #fff;
}
.gridcell {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #cfe2ff;
  border-top: 3px solid #3080fe;
}
.gridcell, .gridnum, .gridico{
  display: flex;
  justify-content: center;
  align-items: center;
}
.gridico {
  font-size: 40px;
  color: #3080fe;
  align-items: center;
  margin-right: 20px;
}
.gridcell {
  p, h4 {
    margin: 0;
  }
}
.gridnum {
  justify-content: space-between;
  h4 {
    font-size: 28px;
  }
  span {
    font-size: 12px;
  }
}
.gridtxt {
  flex: 1;
  p {
    font-size: 12px;
    color: #666;
    margin: 0 0 10px;
    font-weight: 450;
  }
}
.boxtitle {
  font-size: 16px;
  padding: 12px 0px;
  border-bottom: 1px solid rgb(240, 240, 240);
  margin: 0px 0 20px 0;
  font-weight: 700;
  color: #3f3f3f;
}
</style>
