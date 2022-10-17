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
        on-change 添加图片时自动触发, 手动覆盖文件列表
      上传相关
        before-upload 上传前校验
        http-request 覆盖默认上传行为 (action 就失效, 但是不能删除)
     -->
    <el-upload
      action="#"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable: fileList.length === 1}"

      :on-remove="onRemove"
      :on-change="onChange"

      :before-upload="beforeUpload"
      :http-request="httpRequest"
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
    onRemove(file, newFileList) {
      // file 当前正在删除的图片
      // newFileList 是删除后最新的图片数组
      this.fileList = newFileList
    },
    onChange(file, newFileList) {
      this.fileList = newFileList
    },
    beforeUpload(file) {
      console.log('上传前校验')
      console.log(file)
      // 大小
      const maxSize = 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片过大')
        return false
      }
      // 格式
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('目前只支持 jpg / png 图片')
        return false
      }
    },
    httpRequest() {
      // 链接腾讯云
      console.log('真正上传')
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
