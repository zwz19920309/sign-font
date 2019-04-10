<template>
  <el-dialog  title="编辑模板" :visible.sync="dialogShow">
    <el-form >
      <div class="pad10"><span>签到类型：</span><checkin-type-list :value="cSignon.value"></checkin-type-list></div>
      <div class="pad10"><span>签到时间：</span><date-type-list :type="cSignon.type" :value="cSignon.dateValue"></date-type-list></div>
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="自定义时间段:">
            <el-input placeholder="请填写时间" v-model="cSignon.period"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="场景描述">
            <el-input  type="textarea" :rows="8" style="width: 450px;"  placeholder="请填写描述" v-model="cSignon.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="pad10">
        <span>开始时间与结束时间：</span>
        <el-date-picker @change="getDatePeriod" :default-time="['00:00:00']" v-model="datePeriod" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div> -->
     </el-form>  
  </el-dialog>
</template>

<script>
import { getPrizeList } from '@/api/getData'
export default {
  components: {
    'checkin-type-list': () => import('@/components/checkinTypeList.vue'),
    'date-type-list': () => import('@/components/dateTypeList.vue')
  },
  data () {
    return {
      cSignon: {},
      dialogShow: true
    }
  },
  created () {
    this.cSignon = { params: '', period: '', value: 1, type: 1, dateValue: 1 }
  },
  methods: {
    open (params) { // 参数dynamic
      this.dynamic = params
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['signon']
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
</style>
