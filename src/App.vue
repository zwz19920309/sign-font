<template>
  <div id="app" class="fillcontain">
    <head-top></head-top>
    <router-view/>
  </div>
</template>

<script>
import headTop from './components/headTop'
export default {
  name: 'App',
  components: {
    headTop
  }
}
</script>

<style lang="less">
  @import './style/common';
</style>
