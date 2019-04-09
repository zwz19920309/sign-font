<template>
  <div>
    <el-table border :data="signonList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="isEdit"> </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="date" label="签到类型" width="100">
        <template slot-scope="scope" >
          <span>{{scope.row.checkin_type.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="签到周期" width="100">
        <template slot-scope="scope" >
          <span>{{scope.row.cycle_text.name}}</span>
          <span v-if="scope.row.cycle_text.type == 5">:{{scope.row.cycle_text.number}}(天)</span>
        </template>
      </el-table-column>
      <el-table-column prop="rule_desc" label="规则描述" width="250"></el-table-column>
      <el-table-column label="奖品管理" width="150">
        <template slot-scope="scope" >
          <div v-if="scope.row.cycle_text.number">
            <!-- <span  class="price_num" v-for="num in (parseInt(scope.row.cycle_text.number))" :key="num">
            {{ num }}
            </span> -->
            <span class="price_detial" @click="toPrizeList(scope.$index, scope.row)">奖品详情</span>
          </div>  
        </template>
      </el-table-column>
      <el-table-column prop="start_at" label="开始时间"></el-table-column>
      <el-table-column prop="end_at" label="结束时间"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="desc" label="操作" width="180" v-if="isEdit">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pad10 t-right" v-if="isEdit"> 
      <el-button type="primary" @click="handleBluckEdit()">批量删除</el-button> 
    </div>
   </div>      
</template>

<script>
import { deleteSignon, bulkDeleteSignOn } from '@/api/getData'
export default {
  components: {
  },
  data () {
    return {
      signons: []
    }
  },
  created () {
  },
  methods: {
    async handleEdit (data) {

    },
    async handleDelete (index, row) {
      console.log('@row: ', row)
      this.$confirm('确认删除该选项?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(async () => {
        let res = await deleteSignon({ id: row.id })
        if (res.code === 0) {
          this.$message({ message: '删除成功', type: 'success' })
          this.callBack && this.callBack()
        }
      })
    },
    async handleSelectionChange (data) {
      console.log('@data: ', data)
      this.signons = data
    },
    async handleBluckEdit () {
      console.log('@handleBluckEdit: ', this.signons)
      let ids = []
      this.signons.forEach(ele => {
        ids.push(ele.id)
      })
      let res = await bulkDeleteSignOn({ 'ids': ids })
      if (res.code === 0) {
        this.$message({ message: '删除成功', type: 'success' })
        this.callBack && this.callBack()
      }
    },
    toPrizeList (index, row) {
      this.$router.push({ path:'/prizeList', query:{ id: row.id } })
    }
  },
  props: ['signonList', 'isEdit', 'callBack']
}
</script>

<style lang="less">
.price_detial {
  padding: 0 5px;
  text-decoration: underline;
  color: #409EFF;
  cursor: pointer;
}
</style>
