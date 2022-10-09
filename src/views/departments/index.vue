<template>
  <div class="page-wrapper">
    <el-card class="card">
      <!-- 页面顶部公司信息行 -->
      <TreeTools :data="companyInfo" />
      <!-- 页面顶部公司信息行结束(只是一行) -->
      <hr>
      <!-- 部门树形 -->
      <!-- 树形组件传入 data 会自动渲染页面 但是如果想要自定义每个部门的样式 需要用到插槽 -->
      <el-tree :data="list" :props="config" default-expand-all>
        <!-- 这里可以写部门想要的模板(只写一次, 代表一个部门, 其实el-tree 会自动遍历) -->
        <!-- 这里跟公司的样式一样, 但是数据不能写死 可以根据文档, 用作用域插槽 data 属性拿到各个部门数据对象 -->
        <template v-slot="{data}">
          <!-- 这里 data 就是el-tree 遍历的每个部门数据, 是 element ui 自己封装好的
          只需当成部门对象来用即可 -->
          <TreeTools :data="data" />
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsList } from '@/api/departments'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      companyInfo: {
        name: '黑马程序员',
        manager: '负责人'
      },
      list: [],
      config: {
        label: 'name'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { depts } = await getDeptsList()
      this.list = depts
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 40px;
}
</style>
