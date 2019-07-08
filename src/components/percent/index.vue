<template>
  <div class="percent" :style="{height: height + 'px', width: width + 'px'}">
    <div class="circleleft">
      <div ref="leftcontent"></div>
    </div>
    <div class="circleright">
      <div ref="rightcontent"></div>
    </div>
    <div class="number">{{ percent }} %</div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: [ Number ],
      default: 120
    },
    height: {
      type: [ Number ],
      default: 120
    },
    percentNum: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      percent: this.percentNum,
      initDeg: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.goRotate(this.getDeg)
    })
  },
  destroyed () {
    clearInterval(this.timeId)
  },
  watch: {
    'percentNum': function (val) {
      this.percent = val
      this.goRotate(this.getDeg)
    }
  },
  computed: {
    getDeg () {
      let deg = 0
      if (this.percent >= 100) {
        deg = 360
      } else {
        deg = parseInt(360 * this.percent / 100)
      }
      return deg
    }
  },
  methods: {
    goRotate (deg) {
      this.timeId = setInterval(() => {
        if (Number(deg) === Number(this.initDeg)) {
          clearInterval(this.timeId)
        } else if (deg > this.initDeg) {
          this.initDeg += 1
          if (this.initDeg > 180) {
            this.$refs.rightcontent.style.transform = 'rotate(' + (this.initDeg - 180) + 'deg)'
          } else {
            this.$refs.leftcontent.style.transform = 'rotate(' + this.initDeg + 'deg)'
          }
        } else {
          this.initDeg -= 1
          if (this.initDeg >= 180) {
            this.$refs.rightcontent.style.transform = 'rotate(' + (this.initDeg - 180) + 'deg)'
          } else {
            this.$refs.leftcontent.style.transform = 'rotate(' + this.initDeg + 'deg)'
          }
        }
      }, 0)
    }
  }
}
</script>
<style scoped lang="scss">
.percent {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto 10px;
  .circleleft, .circleright {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #0fac8c;
    overflow: hidden;
    & > div {
      width: 100%;
      height: 100%;
      background-color: #d4eee8;
      transform-origin: right center;
      // transition: all .5s linear;
    }
  }
  .circleright {
    left: 50%;
    & > div {
      transform-origin: left center;
    }
  }
  .number {
    position: absolute;
    font-size: 14px;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
  }
}
</style>
