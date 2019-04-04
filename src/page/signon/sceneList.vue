<template>
  <div class="fillcontain">
    <div class="table_container">
      <div class="mar10">
        <div class="pad10">
          <el-table border :data="sceneList" stripe style="width: 100%">
            <el-table-column prop="name" label="名称"  width="180"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
            <el-table-column prop="desc" label="活动详情" width="180">
              <template>
                <span><a>签到活动列表</a></span>
              </template>
             </el-table-column>
            <el-table-column prop="createdAt" label="创建时间"></el-table-column>
            <el-table-column prop="desc" label="签到活动" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleSigonList(scope.$index, scope.row, 1)">添加</el-button>
                <el-button type="danger" size="mini" @click="handleSigonList(scope.$index, scope.row, 2)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <signon-list-dialog :signonList="signonList" :callBack="changeScenesign" ref="signonListRef"></signon-list-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getSceneList, getSignonListBySceneId, bulkAddScenesign, bulkDeleteScenesign } from '@/api/getData'
export default {
  data () {
    return {
      scene: {},
      handleType: 0,
      sceneList: [],
      signonList: []
    }
  },
  components: {
    'signon-list-dialog': () => import('@/components/signonListDialog.vue')
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getSceneList(this.params)
      console.log('@data: ', res)
      if ((res.code === 0) && (res.data.list.length)) {
        this.sceneList = res.data.list
      }
    },
    async handleSigonList (index, row, type) {
      this.scene = row
      this.handleType = type
      let res = await getSignonListBySceneId({ sceneId: this.scene.id, type: this.handleType })
      if ((res.code === 0) && (res.data.list.length)) {
        this.signonList = res.data.list
      } else {
        if (this.handleType == 1) {  
          this.$message.error('暂无新增签到活动模板')
        } else {
          this.$message.error('该场景尚未配置签到活动模板')
        }
        return
      }
      this.$refs.signonListRef.open()
    },
    async changeScenesign (signonList) {
      let scenesignons = []
      signonList.forEach(signon => {
        scenesignons.push({ signon_id: signon.id, scene_id: this.scene.id })
      })
      let res
      if (this.handleType === 1) {
        res = await bulkAddScenesign({ scenesignons: scenesignons })
      } else {
        res = await bulkDeleteScenesign({ scenesignons: scenesignons }) 
      }
      if (res && res.code == 0) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.signonListRef.close()
      } else {
        this.$message.error('操作失败')    
      }
    }
  }
}
</script>

<style lang="less">
</style>
