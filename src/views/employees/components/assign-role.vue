<template>
  <el-dialog title="分配角色" :visible="isShowDialog" @close="btnCancel">
    <!-- checkList 是当前选中数组, 选中的那些数据的id会出现在这 -->
    <el-checkbox-group v-model="checkList">
      <!-- list 是总表, 遍历所有选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      <el-button size="small" @click="btnCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { assignRole } from '@/api/employee'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选中的列表
      checkList: [],
      // 所有角色总表
      list: [],
      // 当前被点击的员工id
      id: ''
    }
  },
  async created() {
    const { rows } = await getRoleList({ page: 1, pagesize: 999 })
    this.list = rows
    console.log(this.list)
  },
  methods: {
    async btnOK() {
      // 发请求
      await assignRole({
        roleIds: this.checkList,
        id: this.id
      })
      // 提示用户
      this.$message.success('操作成功')
      // 关闭弹窗
      this.$emit('closeDialog')
    },
    btnCancel() {
      // 清理数据
      this.checkList = []
      // 关闭弹窗
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

</style>
