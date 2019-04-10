<template>
  <el-dialog  title="奖品列表" :visible.sync="dialogShow">
    <prize-list :callBack="callBcakHandler" :isEdit="isEdit" :prizeList="cPrizeList" :dynamic="dynamic"></prize-list>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageInfo.pageSize"
      layout="sizes, prev, pager, next"
      :total="cTotal">
    </el-pagination>
  </el-dialog>
</template>

<script>
import { getPrizeList } from '@/api/getData'
export default {
  components: {
    'prize-list': () => import('@/components/prizeList.vue')
  },
  data () {
    return {
      dialogShow: false,
      cPrizeList: this.prizeList || [],
      cData: [],
      cTotal: 0,
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      dynamic: null
    }
  },
  created () {
    this.initData(this.pageInfo)
  },
  methods: {
    async initData (pageInfo) {
      if (this.cPrizeList && (this.cPrizeList.length < 1)) {
        let res = await getPrizeList(pageInfo)
        if (res.code === 0) {
          this.cPrizeList = res.data.list
          this.cTotal = res.data.total
        }
      }
    },
    handleSelectionChange (data) {
      this.cData = data
    },
    callBcakHandler () {
      this.initData(this.pageInfo)
    },
    async handleSizeChange (data) {
      this.sizeChange && this.sizeChange(data)
    },
    async handleCurrentChange (data) {
      this.currentChange && this.currentChange(data)
    },
    open (params) { // 参数dynamic
      this.dynamic = params
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['sizeChange', 'currentChange', 'isEdit', 'prizeList', 'total'],
  watch: {
    'prizeList': function (newVal, oldVal) {
      this.cPrizeList = newVal
    },
    'total': function (newVal, oldVal) {
      this.cTotal = newVal
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
</style>
