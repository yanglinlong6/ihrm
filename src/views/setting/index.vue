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
                <el-button size="mini" type="primary" @click="showAssignPerm(row.id)">分配权限</el-button>
                <el-button size="mini" type="warning" @click="showEdit(row.id)">编辑</el-button>
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
              :current-page="pageConfig.page"
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
    <el-dialog :visible="isShowDialog" :title="formData.id?'编辑角色':'新增角色'" @close="btnCancel">
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

    <el-dialog title="分配权限" :visible="isAssignPerm" @close="btnPermCancel">
      <!-- 多选框组 -->
      <el-checkbox-group v-model="checkList">

        <!-- 遍历除大量的权限 -->
        <!-- 现在我想在这里用树形显示, 然后里面依旧渲染多选框 -->
        <!-- 中间的遍历由自己写的 v-for 改为 el-tree
        遍历到的 item 也变为作用域插槽data(el-tree组件封装决定) -->
        <el-tree :data="permList">
          <template v-slot="{data}">
            <el-checkbox :key="data.id" :label="data.id">
              {{ data.name }}
            </el-checkbox>
          </template>
        </el-tree>

      </el-checkbox-group>

      <template #footer>
        <el-button size="small" type="primary" @click="btnPermOK">确定</el-button>
        <el-button size="small" @click="btnPermCancel">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, addRole, delRole, getRoleDetail, editRole, assignPerm } from '@/api/setting'
// 也要引入获取权限列表, 虽然这里是角色列表页,但是要给每个角色设置权限
import { getPermissionList } from '@/api/permission'
import { listToTree } from '@/utils'
export default {
  data() {
    return {
      // 分配权限相关
      isAssignPerm: false,
      // 总权限列表
      permList: [],
      // 被选中的权限列表
      checkList: [],
      id: '',

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
    this.getList(),
    // 获取权限列表
    this.getPerm()
  },
  methods: {
    async btnPermOK() {
      // 发请求
      await assignPerm({
        // 当前角色最新的权限数组(包裹的权限id)
        permIds: this.checkList,
        // 当前点击角色id
        id: this.id
      })
      // 提示用户
      this.$message.success('操作成功')
      // 关闭弹窗
      this.isAssignPerm = false
    },
    btnPermCancel() {
      // 清数据
      this.checkList = []
      // 关闭弹窗
      this.isAssignPerm = false
    },
    async getPerm() {
      const res = await getPermissionList()
      // 权限数据是树形的, 用之前封装的递归转换函数处理
      // 得出带有 children 嵌套的数据
      this.permList = listToTree(res, '0')
      console.log('权限列表', this.permList)
    },
    async showAssignPerm(id) {
      // 拿到点击的角色旧权限
      const { permIds } = await getRoleDetail(id)
      // 放入多选框绑定的当前选项数组中
      this.checkList = permIds
      this.id = id
      this.isAssignPerm = true
    },
    async showEdit(id) {
      // 点击时, 根据点击到的id获取详情, 填充到表单上回显
      this.formData = await getRoleDetail(id)
      // 显示弹窗
      this.isShowDialog = true
    },
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
      // 可以通过 formData里面有没有id判断是不是编辑请求
      if (!this.formData.id) {
        // 原来的新增逻辑
        await addRole(this.formData)
        // 在这里是更新页面, 有同学想要实现一个效果,更新页面时自动跳到最后一页
        // 算出最后一页的页码即可, 添加完总条数+1, 计算页码
        // (注意这里计算页面控制请求发送, 另外还要帮到分页组件, 控制分页组件显示)
        this.total++
        const lastPage = Math.ceil(this.total / this.pageConfig.pagesize)
        this.pageConfig.page = lastPage
      } else {
        await editRole(this.formData)
      }

      // 3.提示用户
      this.$message.success('操作成功')
      // 4.更新页面
      this.getList()
      // 5.关闭弹窗
      this.isShowDialog = false
    },
    btnCancel() {
      console.log('取消函数')

      // 对整个表单进行重置，
      // 1. 将所有字段值重置为初始值(是根据第一次点击时, 初始化的值决定, 不一定符合条件)
      // 2. 移除校验结果(这个不能少, 也是我们为什么手动清理了数据, 也要保留这个reset的原因)
      this.$refs.addForm.resetFields()
      // 真的想要清理数据, 还是得手动处理
      this.formData = {
        name: '',
        description: ''
      }

      // 关闭弹窗
      this.isShowDialog = false
    },
    async delRole(id) {
      console.log('删除按钮的点击事件, 利用作用域插槽')
      console.log(id)
      // 为了避免误操作, 添加二次询问 await 等待
      // 只有点击确定才会往下走, 否则就会报错(正常)
      await this.$confirm('确定删除吗?')
      // 发送请求
      await delRole(id)
      // 提示用户
      this.$message.success('删除成功')
      // 删除成功后, 如果发现页面上只剩下一条数据, 赶脚往前翻一页
      // 除了页码本身是第一页的例外(只有页码不等于1才能往前翻)
      if (this.list.length === 1 && this.pageConfig.page !== 1) {
        this.pageConfig.page--
      }
      // 更新页面
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  padding: 20px;
}
</style>
