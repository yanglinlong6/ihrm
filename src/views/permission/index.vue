<template>
  <div class="page-wrapper">
    <PageTools>
      <template #after>
        <el-button size="small" type="primary">添加权限</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="list" border row-key="id" default-expand-all>
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="权限描述" prop="description" />
        <el-table-column>
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" type="text">添加子权限</el-button>
            <el-button type="text">编辑权限</el-button>
            <el-button type="text">删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { listToTree } from '@/utils'
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
      const res = await getPermissionList()
      // 由于权限也有树形结构, 需要之前封装的转换函数
      this.list = listToTree(res, '0')
      console.log(this.list)
    }
  }
}
</script>

<style>

</style>
