<template>
  <ps-container :filename="filename">
    <div>
      <div flex="dir:top main:center cross:center"  style="padding:80px; ">
        <h3 style="font-size: 46px; font-weight: normal;">欢迎使用债转管理系统</h3>
        <p style="text-align: center; line-height: 1.8; margin-bottom: 30px;">债转后台系统是基于小贷牌照合规划通道服务的后台系统，为合作商户提供可视化、可操作的一站式系统服务支持。</p>
        <uaTag :sua='ua'></uaTag>
      </div>
    </div>
  </ps-container>
</template>
<script>
import { mapState } from 'vuex'
import menuAside from '@/menu/aside'
let uaTag = {
  render: function (h) {
    return (
      <div>
        {
          <span>
            <span class={'ua browser ' + this.sua.browser.name}>
              {this.sua.browser.name} | {this.sua.browser.version}
            </span>
            <span class={'ua platform ' + this.sua.os.name}>
              {this.sua.os.name}{this.sua.os.version}
            </span>
          </span>
        }
      </div>
    )
  },
  props: ['sua']
}

export default {
  components: {
    uaTag
  },
  data () {
    return {
      filename: __filename,
      menuAside
    }
  },
  computed: {
    ...mapState({
      ua: state => state.ua.data
    })
  }
}
</script>
<style lang="scss">
  // .theme-default .ps-theme-container-main .ps-theme-container-main-body .container-component .ps-container-full .ps-container-full__body {
  //   background-image: url('./../../assets/home.png');
  //   background-size: 100%;
  // }
  .ua { font-size:12px; background-color: #ccc!important; border-radius: 4px; padding: 2px 5px!important; margin: 0 1px!important; border: 1px solid #BBB!important; color: #fff;}
  .ua.platform.Windows{ background-color: #39b3d7!important; border-color: #46b8da!important; }
  .ua.platform.Linux { background-color: #3A3A3A!important; border-color: #1F1F1F!important; }
  .ua.platform.Android { background-color: #00C47D!important; border-color: #01B171!important; }
  .ua.browser.Chrome{ background-color: #5cb85c!important; border-color: #4cae4c!important; }
  .ua.browser.Firefox{ background-color: #f0ad4e!important; border-color: #eea236!important; }
  .ua.browser.IE{ background-color: #428bca!important; border-color: #357ebd!important; }
  .ua.browser.Opera{ background-color: #d9534f!important; border-color: #d43f3a!important; }
</style>
