<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="模板名称">
            <el-input placeholder="请填写模板名称" v-model="name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10"><span>签到类型：</span><checkin-type-list :callBack = "getCheckinType"></checkin-type-list></div>
      <div class="pad10"><span>签到时间：</span><date-type-list :type="checkinTypeVal" :callBack = "getDateType"></date-type-list></div>
      <div class="pad10" v-if="dateTypeVal == 5">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="自定义时间段:">
            <el-input placeholder="请填写时间" v-model="period"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <span>开始时间与结束时间：</span>
        <el-date-picker @change="getDatePeriod" :default-time="['00:00:00']" v-model="datePeriod" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="pad10">
        <el-button type="primary" @click="submit">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addSignon } from '@/api/getData'
import { dateFormat } from '@/common/utils/date-util'
export default {
  data () {
    return {
      name: '',
      dateType: {},
      checkinType: {},
      dateTypeVal: 0,
      checkinTypeVal: 0,
      period: 0,
      datePeriod: [],
      params: {}
    }
  },
  components: {
    'date-type-list': () => import('@/components/dateTypeList.vue'),
    'checkin-type-list': () => import('@/components/checkinTypeList.vue')
  },
  methods: {
    getDateType (data) {
      console.log('@callBack: ', data.name)
      this.dateType = data
      this.params.dateType = this.dateTypeVal = this.dateType.type
    },
    getCheckinType (data) {
      console.log('@callBack: ', data.name)
      this.checkinType = data
      this.params.checkinType = this.checkinTypeVal = data.type
      console.log(this.checkinTypeVal)
    },
    getDatePeriod (dates) {
      console.log('@dates: ', dates)
      this.params.startAt = dateFormat(dates[0], 'yyyy-MM-dd')
      this.params.endAt = dateFormat(dates[1], 'yyyy-MM-dd')
      console.log('@params: ', this.params)
    },
    async submit () {
      this.params.number = this.period
      this.params.name = this.name
      let res = await addSignon(this.params)
    }
  }
}
</script>

<style lang="less">
.mar10 {
  margin: 10px;
}
.pad10 {
  padding: 10px;
}
</style>
