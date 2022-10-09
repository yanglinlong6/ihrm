<template>
  <el-row style="width: 100%;">
    <!-- 左侧 -->
    <el-col :span="20">{{ data.name }}</el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <!-- 右侧再分一行两列 -->
      <el-row type="flex">
        <el-col>{{ data.manager }}</el-col>
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
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
