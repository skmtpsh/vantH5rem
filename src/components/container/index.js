import psContainerFull from './components/container-full.vue'
export default {
  name: 'ps-container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    }
  },
  computed: {
    // 始终返回渲染组件
    component () {
      if (this.type === 'full') return psContainerFull
      else {
        return 'div'
      }
    }
  },
  render (h) {
    const slots = [
      h('div', this.$slots.default)
    ]
    if (this.$slots.header) slots.push(h('div', { slot: 'header' }, [ this.$slots.header ]))
    if (this.$slots.footer) slots.push(h('div', { slot: 'footer' }, [ this.$slots.footer ]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs
      }, slots)
    ])
  },
  methods: {
  }
}
