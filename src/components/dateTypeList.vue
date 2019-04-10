<template>
  <el-select v-model="cValue"  @change="changeType" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.type"
      :label="item.name"
      :value="item.type">
    </el-option>
  </el-select>
</template>

<script>
import { getDateTypeList } from '@/api/getData'
export default {
  components: {
  },
  data () {
    return {
      cValue: this.value || '',
      options: [],
      cType: this.type || 0
    }
  },
  created () {
    this.initData(this.cType)
  },
  methods: {
    async initData (type) {
      let res = await getDateTypeList({ type: type })
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
      let dataType = this.selectType(type)
      this.callBack && this.callBack(dataType)
    }
  },
  props: ['callBack', 'type', 'value'],
  watch: {
    'type': function (newVal, oldVal) {
      console.log('@type: ---')
      this.cType = newVal
    },
    'value': function (newVal, oldVal) {
      console.log('@cValue: ', newVal)
      this.cValue = newVal
    },
    cType: function (newVal, oldVal) {
      console.log('@CType: ---111111')
      this.initData(newVal)
    }
  }
}
</script>

<style lang="less">
</style>
