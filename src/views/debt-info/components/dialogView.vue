<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" label-width="100px">
      <el-form-item label="审核结果：" prop="approvalStatus">
        <el-tag :type="form.approvalStatus === '1' ? 'success' : 'danger'">{{form.approvalStatus === '1' ? '通过' : '拒绝'}}</el-tag>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        {{form.remark ? form.remark : '无'}}
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">关闭</el-button>
      </el-form-item> -->
    </el-form>
  </el-dialog>
</template>
<script>
import { dialogMixin } from '@/views/mixins'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row', 'ids'],
  data () {
    return {
      // 表单
      form: {
        approvalStatus: 1,
        remark: ''
      },
      title: '处理结果'
    }
  },
  created () {
    this.form = this.row
  }
}
</script>
