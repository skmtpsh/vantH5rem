<template>
  <el-tooltip
    effect="dark"
    content="命令"
    placement="bottom">
    <el-button type="text" class="btn-text" @click="handlexTerm">
      <svg-icon icon-class="terminal" style="" />
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handlexTerm () {
      this.$router.push({ path: '/xterm' })
    }
  }
}
</script>
