<template>
  <el-submenu v-if="treedata.children && treedata.children.length > 0" :index="treedata.key">
    <template slot="title">
      <svg-icon :icon-class="treedata.ico" />
      <span slot="title">{{treedata.title}}</span>
    </template>
    <treeItem :treedata="item" :key="index" v-for="(item, index) in treedata.children"></treeItem>
  </el-submenu>
  <el-menu-item v-else :index="treedata.key" >
    <svg-icon :icon-class="treedata.ico" />
    <span slot="title">{{treedata.title}}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'treeItem',
  props: ['treedata'],
  data () {
    return {}
  }
}
</script>
