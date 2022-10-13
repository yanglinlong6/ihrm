<template>
  <div class="page-wrapper">
    <PageTools :show-before="true">
      <!-- 前半部分内容 -->
      <template #before>
        一共666员工
      </template>

      <!-- 后半部分内容 -->
      <template #after>
        <el-button size="small">导出员工</el-button>
        <el-button size="small">导入员工</el-button>
        <el-button type="primary" size="small">添加员工</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
export default {
  components: {
    PageTools
  }
}
</script>

<style>

</style>
