<template>
  <el-dialog
    top='1vh'
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="50%">
    <el-image v-for="url in picList" :key="url" fit="fill" :src="url" lazy style="display: block;">
      <div slot="placeholder" style="display: block; text-align: center; margin: 20px auto">
        加载中...
      </div>
    </el-image>
    <el-form ref="form" label-width="100px" >
      <!-- <el-carousel :interval="4000" arrow="always">
        <el-carousel-item v-for="item in row" :key="item" >
          <img :src="item" style="width:100%;" />
        </el-carousel-item>
      </el-carousel> -->
    </el-form>
  </el-dialog>
</template>
<script>
import { dialogMixin } from '@/views/mixins'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    return {
      title: '预览'
    }
  },
  computed: {
    picList () {
      // console.log(this.row.length)
      return this.row
    }
  },
  created () {
    // console.log(this.picList)
  }
}
</script>
