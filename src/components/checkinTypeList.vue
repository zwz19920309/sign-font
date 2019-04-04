<template>
  <el-select v-model="value"  @change="changeType" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.type"
      :label="item.name"
      :value="item.type">
    </el-option>
  </el-select>
</template>

<script>
import { getCheckInTypeList } from '@/api/getData'
export default {
  components: {
  },
  data () {
    return {
      value: '',
      options: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getCheckInTypeList()
      if ((res.code === 0) && (res.data.list.length)) {
        this.options = res.data.list
      }
    },
    selectType (type) {
      let data = ''
      this.options.forEach((item, index) => {
        if (type === item.type) {
          data = item
        }
      })
      return data
    },
    changeType (type) {
      console.log('@chengCheckINtype: ', type)
      let dataType = this.selectType(type)
      this.callBack(dataType)
    }
  },
  props: ['callBack']
}
</script>

<style lang="less">
</style>
