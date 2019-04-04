<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  	<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
	        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-plus"></i>场景管理</template>
						<el-menu-item index="sceneList"><i class="el-icon-tickets"></i>场景列表</el-menu-item>
						<el-menu-item index="buildScene"><i class="el-icon-edit"></i>新建场景</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-plus"></i>签到活动模板管理</template>
						<el-menu-item index="signonList"><i class="el-icon-tickets"></i>模板活动列表</el-menu-item>
						<el-menu-item index="buildSignon"><i class="el-icon-edit"></i>新建活动模板</el-menu-item>
					</el-submenu>
        </el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<!-- <keep-alive> -->
				    <router-view></router-view>
				<!-- </keep-alive> -->
			</el-col>
		</el-row>
  	</div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
	  return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../style/mixin';
</style>
