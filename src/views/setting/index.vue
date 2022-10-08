<template>
  <div class="page-wrapper">
    <!-- el-card 组件可以显示卡片阴影样式 -->
    <el-card>
      <el-tabs>
        <!-- el-tabs 多标签容器, 里面每个标签都叫 el-tab-pane -->
        <el-tab-pane label="角色管理">
          <!-- 标签的具体使用, label  指定按钮内容,
          开闭标签插槽放入对应点击时显示东西即可 -->
          <!-- 添加按钮 -->
          <el-row style="margin-bottom: 20px;" type="flex">
            <el-button size="small" type="primary">添加角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table :data="list" border>
            <!-- table-column 是表格列, label 可以定义表头 -->
            <!-- prop指定当前列的字段名 -->
            <el-table-column label="角色名" prop="name" />
            <el-table-column label="描述" prop="desc" />
            <el-table-column label="操作" />
          </el-table>
          <!-- 分页/翻页器 -->
          <el-row type="flex" justify="center" style="margin-top: 20px;">
            <el-pagination />
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="公司信息">
          <!-- 表单 -->
          <el-form style="width: 600px;" label-width="80px">
            <el-form-item label="企业名称">
              <!-- 表单项以 label 确定名称 -->
              <el-input v-model="companyInfo.name" disabled />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled />
            </el-form-item>
            <el-form-item label="公司电话">
              <el-input v-model="companyInfo.companyPhone" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCompanyInfo } from '@/api/setting'
export default {
  data() {
    return {
      companyInfo: {},
      list: [
        // 表格行数据都是数组
        // 每个对象都是一行
        { name: '总经理', desc: '啥都管' },
        // 数据对象中每个字段都可以显示在一列格子上
        { name: '实习生', desc: '啥都不能关' }
      ]
    }
  },
  // 进入页面需要获取数据进行渲染
  async created() {
    // 获取公司信息放入data
    console.log('vuex数据', this.$store.state)
    // 获取公司信息放入data进行渲染
    // 发送请求, 已经引入一个封装了的接口getCompanyInfo
    // 这个接口需要用到公司id 这个id 在个人数据中, 存放在 vuex
    const companyId = this.$store.state.user.userInfo.companyId
    this.companyInfo = await getCompanyInfo(companyId)
  }
}
</script>

<style lang="scss">
.page-wrapper {
  padding: 20px;
}
</style>
