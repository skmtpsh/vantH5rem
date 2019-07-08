<template>
  <el-tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <el-button type="text" class="btn-text" @click="toggle">
      <svg-icon icon-class="compress" v-if="active" name="arrows-alt" style="font-size: 16px" />
      <svg-icon icon-class="full" v-else  name="compress" />
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('fullscreen', [
      'toggle'
    ])
  }
}
</script>
