<template>
  <div class="ps-multiple-page-control-group" flex>
    <div class="ps-multiple-page-control-content" flex-box="1">
      <div class="ps-multiple-page-control-content-inner">
        <el-tabs class="ps-multiple-page-control" type="card"
          :value="current"
          @tab-click="handleClick"
          @edit="handleTabsEdit"
          :closable="true" >
          <el-tab-pane
            v-for="(item) in opened"
            :key="item.fullPath"
            :label="item.meta.title"
            :name="item.fullPath"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div
      class="ps-multiple-page-control-btn"
      flex-box="0">
      <el-dropdown
        size="default"
        @click="closeAll"
        split-button >
        <i class="el-icon-close"></i>
        <el-dropdown-menu slot="dropdown">
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('page', [
      'opened',
      'current'
    ])
  },
  methods: {
    ...mapActions('page', [
      'close',
      'closeAll'
    ]),
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick (tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
     */
    handleTabsEdit (tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName,
          vm: this
        })
      }
    }
  }
}
</script>
