<template>
  <div class="page-wrapper">
    <el-card class="card">
      <!-- 页面顶部公司信息行 -->
      <TreeTools :data="companyInfo" :company="true" @showAddDialog="showAddDialog" />
      <!-- 页面顶部公司信息行结束(只是一行) -->
      <hr>
      <!-- 部门树形 -->
      <!-- 树形组件传入 data 会自动渲染页面 但是如果想要自定义每个部门的样式 需要用到插槽 -->
      <el-tree :expand-on-click-node="false" :data="list" :props="config" default-expand-all>
        <!-- 这里可以写部门想要的模板(只写一次, 代表一个部门, 其实el-tree 会自动遍历) -->
        <!-- 这里跟公司的样式一样, 但是数据不能写死 可以根据文档, 用作用域插槽 data 属性拿到各个部门数据对象 -->
        <template v-slot="{data}">
          <!-- 这里 data 就是el-tree 遍历的每个部门数据, 是 element ui 自己封装好的
          只需当成部门对象来用即可 -->
          <TreeTools :data="data" :company="false" @showAddDialog="showAddDialog" @showEditDialog="showEditDialog" @reload="getList" />
        </template>
      </el-tree>
    </el-card>

    <AddDept
      :id="deptId"
      ref="addForm"
      :is-show-dialog="isShowDialog"
      @reload="getList"
      @closeDialog="isShowDialog = false"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDeptsList, getDeptById } from '@/api/departments'
import { listToTree } from '@/utils/'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      // 弹窗相关
      isShowDialog: false,
      deptId: '',

      companyInfo: {
        name: '黑马程序员',
        manager: '负责人',
        id: ''
      },
      list: [],
      config: {
        label: 'name'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { depts } = await getDeptsList()
      // 这里是页面进入调用的函数进行数据获取,
      // 不过数据是扁平的(接口原因)需要转换
      // 这个转换逻辑后续其他页面也用到, 会封装成一个公共函数
      // this.list = depts
      this.list = listToTree(depts, '')
    },
    // 树形组件点击添加部门触发
    showAddDialog(id) {
      // 树形子组件, 点击时带上了 id
      // 这里作为父组件是一个桥梁的效果, 自己存起来
      // 再交给弹窗, 方便新增时记录到底属于哪个父部门
      this.deptId = id
      this.isShowDialog = true
    },
    // 显示编辑弹窗
    async showEditDialog(id) {
      // 每个部门被编辑, 都会在这里弹窗
      // 这里也知道部门id如果要拿数据最方便
      // 唯一需要做的是, 弹窗表单在子组件, 所以直接改子组件的数据
      // 父组件可以通过 refs 调用子组件函数或者直接修改子组件的数据
      this.$refs.addForm.formData = await getDeptById(id)

      this.deptId = id
      this.isShowDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 40px;
}
</style>
