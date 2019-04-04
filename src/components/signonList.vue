<template>
  <div>
    <el-table border :data="signonList" stripe style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="date" label="签到类型" width="180">
        <template slot-scope="scope" >
          <span>{{scope.row.checkin_type.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="签到周期" width="180">
        <template slot-scope="scope" >
          <span>{{scope.row.cycle_text.name}}</span>
          <span v-if="scope.row.cycle_text.type == 5">:{{scope.row.cycle_text.number}}(天)</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_at" label="开始时间"></el-table-column>
      <el-table-column prop="end_at" label="结束时间"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
    </el-table>
   </div>      
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      value: '',
      signonList: []
    }
  },
  created () {
  },
  methods: {
  },
  props: ['signonList']
}
</script>

<style lang="less">
</style>
