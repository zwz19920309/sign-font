<template>
  <el-table border :data="sceneList" stripe style="width: 100%">
    <el-table-column prop="name" label="名称" width="180"></el-table-column>
    <el-table-column prop="desc" label="描述"></el-table-column>
    <el-table-column prop="createdAt" label="创建时间"></el-table-column>
  </el-table>
</template>

<script>
import { getSceneList } from '@/api/getData'
export default {
  components: {
  },
  data () {
    return {
      value: '',
      sceneList: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getSceneList()
      if ((res.code === 0) && (res.data.list.length)) {
        this.sceneList = res.data.list
      }
    }
  },
  props: []
}
</script>

<style lang="less">
</style>
