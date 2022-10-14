
<template>
  <div class="uploadExcelWrapper">
    <!-- 我想知道要传什么数据, 就看子组件的 props -->
    <!-- 要向知道有什么事件可以监听 -->
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
export default {
  methods: {
    onSuccess(data) {
      console.log('表头', data.header)
      console.log('内容', data.results)
      // 这个组件的功能是传入一个 excel 文件
      // 返回对象, 包括 header / results 分别是表头和每一行数据
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadExcelWrapper {
  // background-color: #eee;
  // height: calc(100vh - 50px);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding-top: 200px;
}
</style>
