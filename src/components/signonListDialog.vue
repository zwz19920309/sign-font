<template>
  <el-dialog  title="签到活动列表" :visible.sync="dialogShow">
    <el-table border ref="multipleTable" :data="cSignonList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="date" label="签到类型" width="180">
        <template slot-scope="scope" >
          <span>{{scope.row.checkin_type.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="签到周期" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.cycle_text.name}}</span>
          <span v-if="scope.row.cycle_text.type == 5">:{{scope.row.cycle_text.number}}(天)</span>
        </template>
      </el-table-column>
    </el-table>
    <div  class="mar10 pad10 t-right">
      <el-button type="primary" @click="inSure">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSignonList } from '@/api/getData'
export default {
  components: {
  },
  data () {
    return {
      value: '',
      dialogShow: false,
      cSignonList: this.signonList || [],
      cData: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      if (!this.cSignonList.length) {
        let res = await getSignonList()
        if ((res.code === 0) && (res.data.list.length)) {
          this.cSignonList = res.data.list
        }
      }
    },
    handleSelectionChange (data) {
      this.cData = data
    },
    inSure () {
      this.callBack && this.callBack(this.cData)
    },
    open () {
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['callBack', 'signonList'],
  watch: {
    'signonList': function (newVal, oldVal) {
      this.cSignonList = newVal
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
</style>
