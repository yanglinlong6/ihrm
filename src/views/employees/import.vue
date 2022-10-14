
<template>
  <div class="uploadExcelWrapper">
    <!-- 我想知道要传什么数据, 就看子组件的 props -->
    <!-- 要向知道有什么事件可以监听 -->
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employee'
export default {
  methods: {
    async onSuccess(data) {
      console.log('表头', data.header)
      console.log('内容', data.results)
      // 这个组件的功能是传入一个 excel 文件
      // 返回对象, 包括 header / results 分别是表头和每一行数据
      // 得到的数据是
      // [
      //   {
      //     姓名: '小王',
      //     手机号: 1322312,
      //     工号: 10001
      //   }
      // ]
      // 后端要求的数据
      // [
      //   {
      //     username: '小王',
      //     mobile: 1322312,
      //     workNumber: 10001
      //   }
      // ]
      const newData = data.results.map(item => {
        const newUser = {}
        // newUser.username = item['姓名']
        // newUser.timeOfEntry = item['入职日期']
        // newUser.workNumber = item['工号']
        // newUser.mobile = item['手机号']
        // newUser.correctionTime = item['转正日期']

        const dict = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        for (const zhKey in item) {
          console.log(zhKey)
          // zhKey 工号 / 姓名 / 手机号
          const enKey = dict[zhKey]
          // dict['姓名'] 将会输出 dict.姓名 => username
          if (enKey === 'correctionTime' || enKey === 'timeOfEntry') {
            const timestamp = this.formatExcelTime(item[zhKey])
            // newUser[enKey] = timestamp
            newUser[enKey] = new Date(timestamp)
          } else {
            newUser[enKey] = item[zhKey]
          }
          // newUser['username'] = item['姓名']
        }
        return newUser
      })

      console.log('新数据', newData)

      await importEmployee(newData)

      // 提示用户
      this.$message.success('操作成功')
      // 上传完毕, 回退上一页
      this.$router.back()
    },
    formatExcelTime(num, format = '-') {
      num = Number(num)	// 强制类型转化，以防传来的值是字符串
      let millisecond = 0	// 转化后的毫秒数
      if (num > 60) {
        millisecond = (num - 25569) * 60 * 60 * 24 * 1000
      } else {
        millisecond = (num - 25568) * 60 * 60 * 24 * 1000
      }
      const date = new Date(millisecond)	// 根据转化后的毫秒数获取对应的时间
      const yy = date.getFullYear()
      const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return yy + format + mm + format + dd	// 返回格式化后的日期
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
