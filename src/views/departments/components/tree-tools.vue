<template>
  <el-row style="width: 100%;" :class="{companyTitle: company}">
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
            <span class="dropdownSpan">
              操作
            </span>
            <!-- 菜单本体 -->
            <el-dropdown-menu>
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!company">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!company">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // props: ['data']
  // props: {
  //   data: Object
  // }
  props: {
    data: {
      // 类型
      type: Object,
      // 必填
      required: true
    },
    company: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdownSpan {
  cursor: pointer;
}
.companyTitle {
  font-weight: bold;
}
</style>
