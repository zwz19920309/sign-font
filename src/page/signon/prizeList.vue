<template>
  <div class="fillcontain">
    <div class="table_container">
      <div class="mar10"><h3>奖品管理</h3></div>
      <div class="mar10 pad10">名称: {{signon.name}}</div>
      <div class="mar10 pad10" v-if="signon.checkin_type">类型: {{signon.checkin_type.name}}</div>
      <div class="mar10 pad10" v-if="signon.cycle_text">签到周期: {{cycleNum}} 天</div>
      <div class="mar10">
        <div>
          <el-table border :data="prizes" stripe style="width: 100%">
            <el-table-column prop="index" label="日期" width="180"></el-table-column>
            <el-table-column label="奖品id">
              <template slot-scope="scope">
                <span>{{scope.row.prizeIds}}</span>
              </template>
            </el-table-column>
            <el-table-column label="详情">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="openPrizeList(scope.$index, scope.row, 1)">添加</el-button> 
                <el-button type="danger" size="mini" @click="openPrizeList(scope.$index, scope.row, 2)">删除</el-button> 
              </template>
            </el-table-column>
         </el-table>
        </div>
      </div>
      <div>
        <prize-list-dialog :sizeChange="handleSizeChange" :currentChange="handleCurrentChange" :isEdit="isEdit" :total="total"  :prizeList="prizeList" ref="prizeListRef"></prize-list-dialog>
      </div>     
    </div>
  </div>
</template>

<script>
import { DATETYPE, DATETYPEVALUE } from '@/common/common'
import { getPrizeList, getSignonById, signonBulkAddPrizes, signonBulkDeletePrizes,  getPrizesBySignonById } from '@/api/getData'
export default {
  data () {
    return {
      prizes: [],
      signon: {},
      isEdit: true,
      prize: {},
      prizeList: [],
      total: 0,
      sceneId: 0,
      type: 1,
      cycleNum: 0,
      pageInfo: {
        page: 1,
        pageSize: 10
      }
    }
  },
  components: {
    'prize-list-dialog': () => import('@/components/prizeListDialog.vue')
  },
  created () {
    this.sceneId = this.$route.query.id
    this.initData(this.sceneId)
  },
  methods: {
    async initData (id) {
      let res = await getSignonById ({ id: id })
      let prizes = []
      if (res.code === 0) {
        this.signon = res.data
        this.cycleNum = this.signon.cycle_text.number ? this.signon.cycle_text.number : DATETYPEVALUE[this.signon.cycle_text.type]
        for (let m = 1; m <= this.cycleNum; m++) {
          if (this.signon.prizes_text && this.signon.prizes_text.prizes && this.signon.prizes_text.prizes[0] && this.signon.prizes_text.prizes[0][m]) {
            prizes.push({ index: m, prizeIds: this.signon.prizes_text.prizes[0][m] })
          } else {
            prizes.push({ index: m, prizeIds: [] })
          }
        }
        this.prizes = prizes
      } 
      console.log('signon: ', this.signon)
    },
     async handleSizeChange (data) {
      this.pageInfo.pageSize = data
      await this.getPrizesBySignon()
    },
    async handleCurrentChange (data) {
      this.pageInfo.page = data
      await this.getPrizesBySignon()
    },
    async handleSignOnPrize (row) {
      let prizeIds = []
      if (row instanceof Array) {
        row.forEach(ele => {
          prizeIds.push(ele.id)
        })
      } else {
        prizeIds.push(row.id)
      }
      let res = {}
      if (this.type === 1) {
        res = await signonBulkAddPrizes({ id: this.signon.id, prizeIds: prizeIds, number: this.prize.index, type: this.type })
      } else {
        res = await signonBulkDeletePrizes({ id: this.signon.id, prizeIds: prizeIds, number: this.prize.index, type: this.type })
      }
      if (res.code === 0) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.prizeListRef.close()
        this.initData(this.sceneId)
      } else {
        this.$message.error('操作失败')
      }
    },
    async getPrizesBySignon () {
      let res = await getPrizesBySignonById({ id: this.signon.id, number: this.prize.index, type: this.type, page: this.pageInfo.page, pageSize: this.pageInfo.pageSize })
      if (res.code === 0) {
        if (!res.data.list || res.data.list.length < 1) {
          return false
        }
        this.prizeList = res.data.list
        this.total = res.data.total
      }
      return res
    },
    async openPrizeList (index, row, type) {
      this.type  = type
      this.prize = row
      this.pageInfo = { page: 1, pageSize: 10 }
      let res = await this.getPrizesBySignon()
      if (!res) {
        this.type === 1 ? this.$message.error('暂无新奖品') : this.$message.error('未配置奖品')
        return
      }
      let that = this
      let changePrams = {
        btn_text: '添加',
        m_btn_text: '批量添加',
        type: 'primary'
      }
      if (this.type === 2) {
        changePrams = {
          btn_text: '删除',
          m_btn_text: '批量删除',
          type: 'danger'
        }
      }
      let params = {
        actionbutton: [
          { label: changePrams.btn_text, type: changePrams.type, size: 'mini', action: async function (row) { that.handleSignOnPrize(row) } }
        ],
        bluckActionbutton: [
          { label: changePrams.m_btn_text, type: changePrams.type, size: 'mini', action: async function (data) { that.handleSignOnPrize(data) } }
        ]
      }
      this.$refs.prizeListRef.open(params)
    }
  }
}
</script>

<style lang="less">
</style>
