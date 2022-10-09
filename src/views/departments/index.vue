<template>
  <div class="page-wrapper">
    <el-card class="card">
      <!-- 页面顶部公司信息行 -->
      <el-row>
        <!-- 左侧 -->
        <el-col :span="20">江苏传智播客教育科技股份有限公司</el-col>
        <!-- 右侧 -->
        <el-col :span="4">
          <!-- 右侧再分一行两列 -->
          <el-row type="flex">
            <el-col>负责人</el-col>
            <el-col>
              <el-dropdown>
                <!-- 一直显示内容 -->
                <span>
                  操作
                </span>
                <!-- 菜单本体 -->
                <el-dropdown-menu>
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>查看子部门</el-dropdown-item>
                  <el-dropdown-item>删除子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <hr>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.card {
  padding: 40px;
}
</style>
