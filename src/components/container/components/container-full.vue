<template>
  <div class="ps-container-full">
    <div v-if="$slots.header" class="ps-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="ps-container-full__body" ref="body" id="container-full-body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="ps-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ps-container-full'
}
</script>
