<template>
  <ps-container :filename="filename">
    <div class="contbody">
      <el-image v-for="url in picList" :key="url" :src="url" lazy></el-image>
    </div>
    <template slot="footer"></template>
  </ps-container>
</template>
<script>
import debtApi from '@/api/debt'
const interPreviewDebt = {
  contact: 'debtPreviewContract',
  picture: 'debtPreviewPicture',
  debt: 'debtPreviewDebt'
}
export default {
  name: 'query',
  data () {
    return {
      filename: __filename,
      picList: []
    }
  },
  computed: {
  },
  methods: {
    getPic (query) {
      debtApi[interPreviewDebt[query.type]](Object.assign(
        query
      )).then(response => {
        if (response) {
          this.picList = response
          console.log(this.picList)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    let query = this.$route.query
    this.getPic(query)
  }
}
</script>
