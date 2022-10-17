<template>
  <div>
    <!--
      必需
        action 上传地址, 没有给个#号
        file-list 管理上传文件列表的数组
      样式相关
        list-type 组件样式
        class 动态类名控制上传图标
      钩子
        on-remove 删除图片时自动触发, 手动覆盖文件列表
     -->
    <el-upload
      action="#"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable: fileList.length === 1}"

      :on-remove="onRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 管理图片的数组, 其中每张图片都是一个对象数据, 重点是其中的 url 属性是图片地址
      fileList: [
        { url: 'https://ts1.cn.mm.bing.net/th/id/R-C.a6ac762414af42f34a1461853028434b?rik=5vQZkGCenyc9LA&riu=http%3a%2f%2fwww.gx8899.com%2fuploads%2fallimg%2f2017092012%2f3nhfrqrzygy-lp.jpg%3fx-oss-process%3dstyle%2f144x144&ehk=VRfryaW55ThPNuKfkUZQS5s8Wn8oiTQupAvN7oOehko%3d&risl=&pid=ImgRaw&r=0' }
      ]
    }
  },
  methods: {
    onRemove(file, fileList) {
      // file 当前正在删除的图片
      // fileList 是删除后最新的图片数组
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
