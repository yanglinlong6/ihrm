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

import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDWszA4lvCCNJA8Gsi5FBrKe9WdS5bP61k',
  SecretKey: 'mIXZMbaNhV3asxLQFrXx6ze9VZPKyKgm'
})

export default {
  data() {
    return {
      // 管理图片的数组, 其中每张图片都是一个对象数据, 重点是其中的 url 属性是图片地址
      fileList: []
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
    httpRequest(options) {
      // 链接腾讯云
      console.log('真正上传', options)
      cos.putObject({
        Bucket: 'hr81-1300310660', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: options.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: options.file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        // onProgress: function(progressData) {
        //   console.log(JSON.stringify(progressData))
        // }
      }, (err, data) => {
        // 上传结束的回调(成功失败都在这)
        // 如果失败就有 err, 如果成功就没有 err 有 data
        console.log(err || data)
        if (!err) {
          console.log('腾讯云上传成功', data)
          // 改图片状态
          this.fileList[0].status = 'success'
          // 改图片 url
          this.fileList[0].url = 'http://' + data.Location
          // 之后需要用到图片地址, 都可以来这里拿
        }
      })
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
