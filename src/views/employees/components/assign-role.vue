<template>
  <el-dialog title="分配角色" :visible="isShowDialog">
    <!-- checkList 是当前选中数组, 选中的那些数据的id会出现在这 -->
    <el-checkbox-group v-model="checkList">
      <!-- list 是总表, 遍历所有选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
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
      list: []
    }
  },
  async created() {
    const { rows } = await getRoleList({ page: 1, pagesize: 999 })
    this.list = rows
    console.log(this.list)
  }
}
</script>

<style>

</style>
