<template>
  <el-dialog  title="奖品列表" :visible.sync="dialogShow">
    <prize-list :callBack="callBcakHandler" :isEdit="isEdit" :prizeList="prizeList" :dynamic="dynamic"></prize-list>
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
      prizeList: [],
      cData: [],
      type: 1,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dynamic: null
    }
  },
  created () {
    this.initData(this.pageInfo)  
  },
  methods: {
    async initData (pageInfo) {
      let res = await getPrizeList(pageInfo)
      if (res.code === 0) {
        this.prizeList = res.data.list
      }
    },
    handleSelectionChange (data) {
      this.cData = data
    },
    callBcakHandler () {
      this.initData(this.pageInfo)
    },
    open (params) { // 参数dynamic
      this.dynamic = params
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['callBack', 'isEdit']
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
</style>
