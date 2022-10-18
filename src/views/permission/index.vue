<template>
  <div class="page-wrapper">
    <PageTools>
      <template #after>
        <el-button size="small" type="primary">添加权限</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="list" border>
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="权限描述" prop="description" />
        <el-table-column>
          <el-button type="text">添加子权限</el-button>
          <el-button type="text">编辑权限</el-button>
          <el-button type="text">删除权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.list = await getPermissionList()
    }
  }
}
</script>

<style>

</style>
