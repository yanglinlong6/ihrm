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
            <el-button size="small" type="primary" @click="isShowDialog = true">添加角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table :data="list" border>
            <!-- table-column 是表格列, label 可以定义表头 -->
            <!-- prop指定当前列的字段名 -->
            <el-table-column label="角色名" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" />
          </el-table>
          <!-- 分页/翻页器 -->
          <el-row type="flex" justify="center" style="margin-top: 20px;">
            <!--
              分页组件 total 指定总条数
              page-size 指定每页长度, 自动得出页码
             -->
            <el-pagination
              :total="total"
              :page-size="pageConfig.pagesize"
              @current-change="currentChange"
            />
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
    <!-- 弹窗 -->
    <el-dialog :visible="isShowDialog" title="新增角色">
      <!-- 表单校验三个要素 el-form 绑定 model rules , el-form-item 绑定 prop -->
      <el-form :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      // 分页配置
      pageConfig: {
        page: 1,
        pagesize: 2
      },
      // 公司信息
      companyInfo: {},
      // 角色列表
      list: [],
      // 角色列表总条数
      total: 0,
      // 控制弹窗
      isShowDialog: false,
      // 定义表单数据:
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '角色名在 2-10 位之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 20, message: '描述在20字内', trigger: 'blur' }
        ]
      }
    }
  },
  // 进入页面需要获取数据进行渲染
  created() {
    // 获取公司信息
    this.getCompany()
    // 获取角色列表
    this.getList()
  },
  methods: {
    async getCompany() {
      // 获取公司信息放入data
      console.log('vuex数据', this.$store.state)
      // 获取公司信息放入data进行渲染
      // 发送请求, 已经引入一个封装了的接口getCompanyInfo
      // 这个接口需要用到公司id 这个id 在个人数据中, 存放在 vuex
      const companyId = this.$store.state.user.userInfo.companyId
      this.companyInfo = await getCompanyInfo(companyId)
    },
    async getList() {
      // 获取角色列表
      const { rows, total } = await getRoleList(this.pageConfig)
      this.list = rows
      this.total = total
    },
    currentChange(page) {
      console.log(page)
      // 每当触发这个改变页码函数, 都能得到用户最新点击的值
      // 要把这个值设置到页面配置中, 重新获取数据渲染页面
      this.pageConfig.page = page
      // 获取角色列表
      this.getList()
    },
    btnOK() {
      this.isShowDialog = false
    },
    btnCancel() {
      this.isShowDialog = false
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  padding: 20px;
}
</style>
