<template>
  <div class="page-wrapper">
    <PageTools>
      <template #after>
        <el-button size="small" type="primary" @click="showAddDialog(1,'0')">添加权限</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="list" border row-key="id" default-expand-all>
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="权限描述" prop="description" />
        <el-table-column>
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" type="text" @click="showAddDialog(2, row.id)">添加子权限</el-button>
            <el-button type="text" @click="showEditDialog(row.id)">编辑权限</el-button>
            <el-button type="text" @click="delPerm(row.id)">删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="formData.id?`编辑权限`:'新增权限'" :visible="isShowDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, getPermissionDetail, updatePermission, addPermission, delPermission } from '@/api/permission'
import { listToTree } from '@/utils'
export default {
  data() {
    return {
      list: [],
      isShowDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '1'
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async delPerm(id) {
      // 二次询问
      await this.$confirm('是否确认删除?')
      // 发请求
      await delPermission(id)
      // 提醒用户
      this.$message.success('删除成功')
      // 更新页面
      this.getList()
    },
    async getList() {
      const res = await getPermissionList()
      // 由于权限也有树形结构, 需要之前封装的转换函数
      this.list = listToTree(res, '0')
      console.log(this.list)
    },
    async showEditDialog(id) {
      this.formData = await getPermissionDetail(id)
      this.isShowDialog = true
    },
    showAddDialog(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.isShowDialog = true
    },
    async btnOK() {
      // 校验表单
      await this.$refs.perForm.validate()
      // 发请求
      if (this.formData.id) {
        // 编辑
        await updatePermission(this.formData)
      } else {
        await addPermission(this.formData)
      }
      // 提醒用户
      this.$message.success('操作成功')
      // 更新页面
      this.getList()
      // 关闭弹窗
      this.isShowDialog = false
    },
    btnCancel() {
      // 清理数据
      this.formData = {}
      // 清理报错
      this.$refs.perForm.resetFields()
      // 关闭弹窗
      this.isShowDialog = false
    }
  }
}
</script>

<style>

</style>
