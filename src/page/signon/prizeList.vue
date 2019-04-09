<template>
  <div class="fillcontain">
    <div class="table_container">
      <div class="mar10"><h3>奖品管理</h3></div>
      <div class="mar10 pad10">名称: {{signon.name}}</div>
      <div class="mar10 pad10" v-if="signon.checkin_type">类型: {{signon.checkin_type.name}}</div>
      <div class="mar10 pad10" v-if="signon.cycle_text">签到周期: {{signon.cycle_text.number}} 天</div>
      <div class="mar10">
        <div>
          <el-table border :data="prizes" stripe style="width: 100%">
            <el-table-column prop="index" label="日期" width="180"></el-table-column>
            <el-table-column label="奖品id" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.prizeIds}}</span>
              </template>
            </el-table-column>
            <el-table-column label="详情" width="180">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="openPrizeList(scope.$index, scope.row)">添加</el-button> 
              </template>
            </el-table-column>
         </el-table>
        </div>
      </div>
      <div>
        <prize-list-dialog :isEdit="isEdit" :total="total"  :prizeList="prizeList" ref="prizeListRef"></prize-list-dialog>
      </div>     
    </div>
  </div>
</template>

<script>
import { getPrizeList, getSignonById, signonBulkAddPrizes, getPrizesBySignonById } from '@/api/getData'
export default {
  data () {
    return {
      prizes: [],
      signon: {},
      isEdit: true,
      prize: {},
      prizeList: [],
      total: 0,
      sceneId: 0
    }
  },
  components: {
    'prize-list-dialog': () => import('@/components/prizeListDialog.vue')
  },
  created () {
    this.sceneId = this.$route.query.id
    console.log('@this.sceneId: --------------------', this.sceneId)
    this.initData(this.sceneId)
  },
  methods: {
    async initData (id) {
      let res = await getSignonById ({ id: id })
      let prizes = []
      console.log('@initData: -------')
      if (res.code === 0) {
        this.signon = res.data
        let cycle_num = parseInt(this.signon.cycle_text.number)
        for (let m = 1; m <= cycle_num; m++) {
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
    async callBackHanlder (data) {
      console.log('@data: ', data)
    },
    async handleSelectionChange () {
      console.log('@handleSelectionChange: ')
    },
    async addSignOnPrize (row) {
      let prizeIds = []
      if (row instanceof Array) {
        row.forEach(ele => {
          prizeIds.push(ele.id)
        })
      } else {
        prizeIds.push(row.id)
      }
      let res = await signonBulkAddPrizes({ id: this.signon.id, prizeIds: prizeIds, number: this.prize.index })
      if (res.code === 0) {
        this.$message({ message: '添加成功', type: 'success' })
        this.$refs.prizeListRef.close()
        this.initData(this.sceneId)
      } else {
        this.$message.error('添加失败')
      }
    },
    async openPrizeList (index, row) {
      this.prize = row
      let res = await getPrizesBySignonById({ id: this.signon.id, number: this.prize.index })
      if (res.code === 0) {
        if (!res.data.list || res.data.list.length < 1) {
          this.$message.error('暂无新奖品')
          return
        }
        this.prizeList = res.data.list
        this.total = res.data.total
      }
      let that = this
      this.$refs.prizeListRef.open({ 
        actionbutton: [
          { label: '添加', type: 'primary', size: 'mini', action: async function (row) { that.addSignOnPrize(row) } }
        ],
        bluckActionbutton: [
          { label: '批量添加', type: 'primary', size: 'mini', action: async function (data) { that.addSignOnPrize(data) } }
        ]
      })
    }
  }
}
</script>

<style lang="less">
</style>
