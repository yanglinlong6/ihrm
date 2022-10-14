<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共 {{ total }} 条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" prop="index" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column :formatter="formatEmployment" label="聘用形式" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" />
          <el-table-column label="账户状态" prop="enableState" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageConfig.size"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// 局部注册方法, 每个vue文件要用一个组件
// 都得单独进行注册, 如果多个地方使用可以
// 考虑在 main.js 全局注册
// import PageTools from '@/components/PageTools'
import { getEmployee } from '@/api/employee'
export default {
  // components: {
  //   PageTools
  // }
  data() {
    return {
      pageConfig: {
        page: 1,
        size: 5
      },
      list: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { total, rows } = await getEmployee(this.pageConfig)
      this.total = total
      // map 除了 item 还可以得到 Index
      this.list = rows.map((item, index) => {
        // 算出上一页页码
        const lastPage = this.pageConfig.page - 1
        // 算出前面页面的总条数
        const totalLastPage = lastPage * this.pageConfig.size
        // 加上当前数组索引(从零开始还要加一)
        const newIndex = totalLastPage + index + 1

        return {
          ...item,
          // 由于后台数据没有带上序号, 我每次拿到列表
          // 都进行自己的计算
          // 每一个索引 = 上一页最后一条数据索引 + 当前新索引
          //          = (上一页页码*页面长度) + 当前新索引
          index: newIndex
        }
      })
    },
    currentChange(page) {
      this.pageConfig.page = page
      this.getList()
    },
    formatEmployment(row, col, cell, index) {
      // 聘用形式格式化函数
      // 其中返回值会替换每个聘用形式的格子
      // row 当前行
      // col 当前列
      // cell 当前格子
      // index 当前索引
      // if (cell === 1) {
      //   return '正式工'
      // }
      // if (cell === 2) {
      //   return '临时工'
      // }
      // if (cell === 3) {
      //   return '实习生'
      // }
      // if (cell === 4) {
      //   return '试用期'
      // }
      // 简化思路: 将数据提取出来, 跟渲染部分分离
      // 在术语上交枚举(将所有可能性列举出来放在一起)
      const hireType = [
        // { id: 1, value: '正式工' },
        { id: 2, value: '非正式' },
        { id: 3, value: '实习生' },
        { id: 4, value: '试用期' }
      ]
      // 每次显示时, 都从这个数组中找到 id 跟 cell 格子数据相同的对象
      // 然后返回 value
      const obj = hireType.find(item => item.id === cell)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>
