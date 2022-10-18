<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共 {{ total }} 条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/employees/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="isShowDialog = true">新增员工</el-button>
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
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" sortable="">
            <!-- 这里想要自定义显示, 作用域插槽获取每一行的数据 -->
            <template v-slot="{row}">
              <el-switch
                v-model="row.enableState"
                :active-value="1"
                :inactive-value="2"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showAssignRole">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
    <AddEmployee :is-show-dialog="isShowDialog" />
    <AssignRole :is-show-dialog="isShowAssignRole" />
  </div>
</template>

<script>
// 局部注册方法, 每个vue文件要用一个组件
// 都得单独进行注册, 如果多个地方使用可以
// 考虑在 main.js 全局注册
// import PageTools from '@/components/PageTools'
import { getEmployee, delEmployee } from '@/api/employee'
// import {hireType} from '@/constant/employees'
// 上面的形式针对具名导出, 如果是匿名导出里面的属性
// 必须整个导入, 点语法使用才行
import EmployeeEnum from '@/constant/employees'

import { export_json_to_excel } from '@/vendor/Export2Excel'

import { formatDate } from '@/filters'

import AddEmployee from './components/add-employee.vue'
import AssignRole from './components/assign-role.vue'
export default {
  // components: {
  //   PageTools
  // }
  components: {
    AddEmployee,
    // 分配角色
    AssignRole
  },
  data() {
    return {
      pageConfig: {
        page: 1,
        size: 5
      },
      list: [],
      total: 0,
      // 弹窗相关
      // 新增弹窗
      isShowDialog: false,
      // 显示分配角色弹窗
      isShowAssignRole: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showAssignRole() {
      // 表格中如果点击了角色按钮, 将弹窗显示出来
      this.isShowAssignRole = true
    },
    async delEmployee(id) {
      // 二次询问
      await this.$confirm('是否确认删除')
      // 发送请求
      await delEmployee(id)
      // 提醒用户
      this.$message.success('删除成功')
      // 更新页面
      this.getList()
    },
    async exportExcel() {
      // 1. 获取所有员工
      const { rows } = await getEmployee({ page: 1, size: this.total })
      console.log(rows)
      // 2. 转换数据
      const dict = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 生成表头 ['姓名', '手机号', '工号']
      // const header = []
      // for (const zhKey in dict) {
      //   header.push(zhKey)
      // }
      // 有一个函数专门为对象生成以 key 组成的数组
      const header = Object.keys(dict)

      const data = rows.map(item => {
        const resArr = []
        // resArr.push(item.username)
        // resArr.push(item.mobile)
        // resArr.push(item.workNumber)
        for (const zhKey in dict) {
          // 姓名 / 工号 / 手机号
          const enKey = dict[zhKey]
          // username / workNumber / mobile
          // 对于特殊数据 聘用形式 / 入职日期 / 转正日期
          if (enKey === 'formOfEmployment') {
            // 聘用形式处理
            // 找到对应聘用形式对象
            const obj = EmployeeEnum.hireType.find(val => +val.id === +item[enKey])
            // 如果对象找到, 就推其中的 value 否则则是位置
            resArr.push(obj ? obj.value : '未知')
          } else if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // 处理日期
            resArr.push(formatDate(item[enKey]))
          } else {
            // 其他普通数据
            resArr.push(item[enKey])
          // resArr.push(item['username'])
          }
        }
        return resArr
      })

      console.log(header)
      console.log(data)
      // 3. 生成 excel
      export_json_to_excel({
        header,
        data
      })
    },
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
      // const hireType = [
      //   // { id: 1, value: '正式工' },
      //   { id: 2, value: '非正式' },
      //   { id: 3, value: '实习生' },
      //   { id: 4, value: '试用期' }
      // ]
      // 每次显示时, 都从这个数组中找到 id 跟 cell 格子数据相同的对象
      // 然后返回 value
      const obj = EmployeeEnum.hireType.find(item => +item.id === +cell)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>
