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
      <div class="pad10" v-if="dateTypeVal === deteMethods.USERDEFINED">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="自定义时间段:">
            <el-input placeholder="请填写时间" v-model="period"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="场景描述">
            <el-input  type="textarea" :rows="8" style="width: 450px;"  placeholder="请填写描述" v-model="desc"></el-input>
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
import { DATETYPE } from '@/common/common'
import { addSignon } from '@/api/getData'
import { dateFormat } from '@/common/utils/date-util'
export default {
  data () {
    return {
      name: '',
      deteMethods: {},
      dateType: {},
      checkinType: {},
      dateTypeVal: 0,
      checkinTypeVal: 0,
      desc: '',
      period: 0,
      datePeriod: [],
      pricesNum: 10,
      params: {},
      isEdit: true
    }
  },
  components: {
    'date-type-list': () => import('@/components/dateTypeList.vue'),
    'checkin-type-list': () => import('@/components/checkinTypeList.vue')
  },
  created () {
    console.log('@DATETYPE: ', DATETYPE)
    this.deteMethods = DATETYPE
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
      this.params.desc = this.desc
      let res = await addSignon(this.params)
      if (res.code === 0) {
        this.$message({ message: '操作成功', type: 'success' })
      }
    }
  }
}
</script>

<style lang="less">
.price-box {
  border: 1px solid #eee;
  border-radius: 3px;
  max-width: 400px;
  min-width: 100px;
  min-height: 100px;
  max-height: 200px;
  width: 200px;
  height: 100px;
  margin-left: 80px;
}
.price_num {
  padding: 0 5px;
  font-size: 11px;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
</style>
