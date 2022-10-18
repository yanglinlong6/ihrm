<template>
  <el-dialog title="分配角色" :visible="isShowDialog">
    内容
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
