<template>
  <el-scrollbar class="scrollbar-wrapper">
    <LeftMenu mode="vertical"></LeftMenu>
  </el-scrollbar>
</template>
<script>
import LeftMenu from './menu'
export default {
  name: 'Sidebar',
  components: {
    LeftMenu
  }
}
</script>
