<template>
  <div class="fillcontain">
    <div class="table_container">
      <div class="mar10">
        <div class="pad10">签到活动模板列表</div>
        <div class="pad10">
          <signon-list :signonList="signonList"></signon-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSignonList } from '@/api/getData'
export default {
  data () {
    return {
      signonList: []
    }
  },
  components: {
    'signon-list': () => import('@/components/signonList.vue')
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getSignonList(this.params)
      this.signonList = res.data.list
      console.log('@data: ', res)
    }
  }
}
</script>

<style lang="less">
</style>
