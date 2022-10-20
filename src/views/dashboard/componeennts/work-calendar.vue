<template>
  <div>
    <!-- 年份选择 -->
    <el-select v-model="currentYear" @change="dateChange">
      <el-option v-for="item in yearList" :key="item" :value="item" :label="item+'年'" />
    </el-select>
    <!-- 月份选择 -->
    <el-select v-model="currentMonth" @change="dateChange">
      <el-option v-for="item in 12" :key="item" :value="item" :label="item+'月'" />
    </el-select>
    <!-- 日历本体 -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{date, data}">
        <!-- 这里是每个格子渲染模板 -->
        <!-- 使用作用域插槽可以取得数据进行渲染 -->
        <!-- date 日期对象 Sat Oct 01 2022 08:00:00 GMT+0800 (中国标准时间) -->
        <!-- data 是个数据对象, 里面比较重要的是 data.day 是个格式化后的日期字符串 2022-10-30 -->
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(oldVal) {
      return oldVal.split('-')[2]
    }
  },
  data() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const yearList = []
    // 假设我想要前面五年+后面五年列表 从2017(当前年份-5)
    for (let i = 0; i <= 10; i++) {
      yearList.push(currentYear - 5 + i)
    }

    return {
      currentDate,
      currentMonth,
      currentYear,
      yearList
    }
  },
  methods: {
    dateChange() {
      const str = this.currentYear + '-' + this.currentMonth
      console.log(str)
      // 2018-6
      this.currentDate = new Date(str)
    },
    isWeek(date) {
      // 返回是否周末布尔值
      return date.getDay() === 0 || date.getDay() === 6
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
