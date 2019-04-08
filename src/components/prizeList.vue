<template>
  <div>
    <el-table border :data="prizeList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="isEdit"> </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="desc" label="描述" width="250"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="desc" label="操作" width="180" v-if="isEdit">
        <template slot-scope="scope">
          <el-button v-for="(item, key) in cDynamic.actionbutton" :key="key" :type="item.type" :size="item.size" @click="func(item.action, scope.row)">
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pad10 t-right" v-if="isEdit"> 
      <el-button v-for="(item, key) in cDynamic.bluckActionbutton" :key="key" :type="item.type" :size="item.size" @click="func(item.action, prizes)">
        {{ item.label }}
      </el-button>
    </div>
   </div>      
</template>

<script>
import { deletePrize, bulkDeletePrize } from '@/api/getData'
export default {
  components: {
  },
  data () {
    let that = this
    return {
      prizes: [],
      cDynamic: this.dynamic || {
        actionbutton: [
          { label: '编辑', type: 'primary', size: 'mini', action: async function (row) { console.log('编辑') } },
          { label: '删除', type: 'danger', size: 'mini', action: async function (row) { await that.handleDelete(row) } }
        ],
        bluckActionbutton: [
          { label: '批量删除', type: 'danger', size: 'mini', action: async function () { await that.handleBluckEdit() } }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    async func (func, data) {
      func && func(data)
    },
    async handleEdit (data) {
      console.log('handleEdit: ')
    },
    async handleDelete (row) {
      this.$confirm('确认删除该选项?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(async () => {
        let res = await deletePrize({ id: row.id })
        if (res.code === 0) {
          this.$message({ message: '删除成功', type: 'success' })
          this.callBack && this.callBack()
        }
      })
    },
    async handleSelectionChange (data) {
      this.prizes = data
    },
    async handleBluckEdit () {
      if (this.prizes.length < 1) {
        this.$message({ message: '请选择要删除的选项', type: 'warning' })
        return
      }
      let ids = []
      this.prizes.forEach(ele => {
        ids.push(ele.id)
      })
      let res = await bulkDeletePrize({ 'ids': ids })
      if (res.code === 0) {
        this.$message({ message: '删除成功', type: 'success' })
        this.callBack && this.callBack()
      }
    }
  },
  props: ['prizeList', 'isEdit', 'callBack', 'dynamic'], // isEdit false: 只显示：true: 可操作, 'dynamic': 外部传入操作按钮详情以及回调函数
  watch: {
    'dynamic': function (newVal, oldVal) {
      this.cDynamic = newVal
    }
  }
}
</script>

<style lang="less">
</style>
