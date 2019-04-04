<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="场景名称">
            <el-input placeholder="请填写名称" v-model="name"></el-input>
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
        <el-button type="primary" @click="submit">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addScene } from '@/api/getData'
export default {
  data () {
    return {
      name: '',
      desc: ''
    }
  },
  methods: {
    async submit () {
      let res = await addScene({name: this.name, desc: this.desc})
    }
  }
}
</script>

<style lang="less">
</style>
