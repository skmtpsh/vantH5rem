<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="审核结果" prop="approvalStatus">
                  <!-- :disabled="!!row.id" -->
        <el-select
          style="width:100%"
          v-model="form.approvalStatus"
          filterable
          remote
          reserve-keyword
          placeholder="请输入审核结果"
          :loading="appOption.loading"
          @change='handleChangeOption'>
          <el-option
            v-for="item in appOption.options"
            :key="item.dicCode"
            :label="item.disName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" maxlength="200" placeholder="请输入描述" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import debtApi from '@/api/debt'
import { dialogMixin } from '@/views/mixins'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row', 'ids'],
  data () {
    return {
      // 下拉菜单
      appOption: {
        loading: false,
        options: [
          { dicCode: 1, disName: '通过' },
          { dicCode: 2, disName: '拒绝' }
        ]
      },
      // 表单
      form: {
        approvalStatus: 1,
        remark: ''
      },
      rules: {
        approvalStatus: [
          { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      },
      title: '处理'
    }
  },
  methods: {
    // 下拉框
    handleChangeOption (val) {
      if (val === 2) {
        this.rules.remark[0].required = true
      } else {
        this.rules.remark[0].required = false
      }
    },
    // 处理保存信息
    onSave () {
      // if (this.form.approvalStatus === '2') {
      //   this.$message.warning({
      //     message: `拒绝理由必填`
      //   })
      //   return false
      // }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let reqCommond = ''
          if (this.row.id) {
            reqCommond = 'debtDeal'
          }
          if (this.ids) {
            reqCommond = 'debtBatchDeal'
          }
          const loading = this.$loading({
            lock: true,
            text: '正在处理数据，稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.3)'
          })
          debtApi[reqCommond](Object.assign(
            this.form,
            this.ids ? { ids: this.ids } : { id: this.row.id }
          )).then(response => {
            loading.close()
            this.handleClose()
            if (typeof response === 'undefined') return
            this.$notify({
              title: '成功',
              type: 'success'
            })
            this.$emit('change', 'success')
          }).catch(error => {
            loading.close()
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    // this.dialogVisible = this.show
    try {
      if (this.row.id) {
        // this.id = this.row.id
      }
    } catch (error) {
      console.log(error)
    } finally {
      // this.getAppOption()
    }
  }
}
</script>
