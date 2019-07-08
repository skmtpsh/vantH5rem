import dayjs from 'dayjs'
export const pageMixin = {
  data () {
    const dateDiff = (num, type) => {
      return [dayjs().subtract(num, type).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
    }
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', dateDiff(7, 'd'))
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', dateDiff(1, 'M'))
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', dateDiff(3, 'M'))
          }
        }]
      },
      // 数据分页相关
      page: {
        pageSizes: [20, 50, 100, 150, 200, 300],
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        tableTotal: 0,
        loading: false
      },
      // 添加修改弹框相关
      dialog: {
        visible: false
      },
      // 添加修改弹框相关
      dialogLog: {
        visible: false
      },
      // 查看弹框相关
      dialogView: {
        visible: false
      },
      // 查看弹框相关
      dialogCreate: {
        visible: false
      },
      // 修改
      modRow: {},
      // 日志修改
      viewRow: {},
      // 合同
      createRow: {}
    }
  },
  methods: {
    // 查询
    onSearch () {
      this.$refs['form'] && this.$refs['form'].validate((valid) => {
        if (valid) {
          this.page.currentPage = 1
          this.getSyncList(Object.assign({ pageNum: 1 }, this.form))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    onReset () {
      this.$refs['form'].resetFields()
      this.page.currentPage = 1
      this.getSyncList(Object.assign({ pageNum: 1 }, this.form))
    },
    // 页面条数改变
    handleSizeChange (val) {
    },
    // 分页
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getSyncList(Object.assign(this.form ? this.form : {}))
    },
    // 添加
    onAdd () {
      this.dialog.visible = true
    },
    // 日志
    viewLog (row) {
      if (row) {
        console.log(row)
        this.dialogLog.visible = true
        this.modRowLog = row
      }
    },
    // 编辑
    handleEdit (row) {
      if (row) {
        this.dialog.visible = true
        this.modRow = row
      }
    },
    // 弹窗回调
    handleDialogChange (code, msg) {
      // 根据code处理一些事情
      if (code === 'success') {
        // this.getSyncList()
        this.onSearch()
      } else {
        // this.$message.warning({
        //   message: msg
        // })
      }
    }
  }
}
export const dialogMixin = {
  methods: {
    // 关闭弹窗
    handleCloseLog () {
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    // 关闭弹窗
    handleClose () {
      this.clearForm()
    },
    // 关闭之后的处理操作
    clearForm () {
      this.$refs['form'].resetFields()
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    // 取消
    onCancel () {
      this.handleClose()
    }
  }
}
export default {
  dialogMixin,
  pageMixin
}
