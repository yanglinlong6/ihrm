<template>
  <div>
    <!-- 年份选择 -->
    <el-select v-model="currentYear">
      <el-option v-for="item in yearList" :key="item" :value="item" :label="item+'年'" />
    </el-select>
    <!-- 月份选择 -->
    <el-select v-model="currentMonth">
      <el-option v-for="item in 12" :key="item" :value="item" :label="item+'月'" />
    </el-select>
    <!-- 日历本体 -->
    <el-calendar v-model="currentDate" />
  </div>
</template>

<script>
export default {
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
