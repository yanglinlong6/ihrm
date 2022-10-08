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
            <!-- 除了用 prop 指定渲染的内容外 还能用插槽插入内容 -->
            <el-table-column label="操作">
              <!-- <template slot-scope="scope"> -->
              <!-- <template v-slot="scope"> -->
              <template v-slot="{row}">
                <!-- {{ scope.row }} -->
                <!-- 这里是自定义列模板, 每一行都会显示着三个按钮
                但是怎么获取到当前行数据, 根据组件库文档, 可以通过接收 scope.row 获取
                其中 scope 可以自己起名, 但是里面自带的 row 是组件库定义的, 其实就是每行数据自己的对象-->
                <el-button size="mini" type="primary">分配权限</el-button>
                <el-button size="mini" type="warning">编辑</el-button>
                <!-- <el-button size="mini" type="danger" @click="delRole(scope.row.id)">删除</el-button> -->
                <el-button size="mini" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
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
    <!-- 为了处理右上角的x,还有确定按钮添加成功后关闭弹窗的数据清理
    还需要将 btnCancel 这个清理数据的逻辑, 绑定到 dialog close 事件当中
    这个close 事件, 会处理x的点击, 另外还会在任何你手动关闭的时候触发 -->
    <el-dialog :visible="isShowDialog" title="新增角色" @close="btnCancel">
      <!-- 表单校验三个要素 el-form 绑定 model rules , el-form-item 绑定 prop -->
      <el-form ref="addForm" :model="formData" :rules="rules" label-width="80px">
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
import { getCompanyInfo, getRoleList, addRole } from '@/api/setting'
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
    async btnOK() {
      console.log('确定函数')
      // 当我点击确定的时候, 最直接一定要做的就是发请求
      // 除此以外, 还有一些可以进行体验上的优化
      // 1.校验表单
      await this.$refs.addForm.validate()
      // 2.发送请求(带上用户填写的内容)
      await addRole(this.formData)
      // 3.提示用户
      this.$message.success('操作成功')
      // 4.更新页面
      this.getList()
      // 5.关闭弹窗
      this.isShowDialog = false
    },
    btnCancel() {
      console.log('取消函数')
      // 清理数据
      this.$refs.addForm.resetFields()
      // 关闭弹窗
      this.isShowDialog = false
    },
    delRole(id) {
      console.log('删除按钮的点击事件, 利用作用域插槽')
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  padding: 20px;
}
</style>
