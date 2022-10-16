<template>
  <el-dialog title="新增员工" :visible="isShowDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:90%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:90%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:90%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:90%" placeholder="请选择">
          <!-- option 如果想要显示的东西跟储存的不一样, 加一个 label 即可
          label 给用户看的 value 存数据 -->
          <!-- <el-option label="正式" :value="1" />
          <el-option label="非正式" :value="2" /> -->
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :value="item.id"
            :label="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:90%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input :value="formData.departmentName" style="width:90%" placeholder="请选择部门" @focus="isShowTree = true" />
        <el-tree
          v-show="isShowTree"
          class="depts"
          :data="deptList"
          :props="{label: 'name'}"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="nodeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:90%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>

    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import { getDeptsList } from '@/api/departments'
import { addEmployee } from '@/api/employee'
import { listToTree } from '@/utils/'

export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // EmployeeEnum: EmployeeEnum,
      EmployeeEnum,
      deptList: [],
      isShowTree: false,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  async created() {
    const { depts } = await getDeptsList()
    console.log('部门列表', depts)
    this.deptList = listToTree(depts, '')
    console.log(this.deptList)
  },
  methods: {
    nodeClick(data, node, component) {
      console.log(data)
      console.log(node)
      console.log(component)
      this.formData.departmentName = data.name
      this.isShowTree = false
    },
    async btnOK() {
      // 校验表单
      await this.$refs.addForm.validate()
      // 发请求(程序员必须能想到的逻辑)
      await addEmployee(this.formData)
      // 提示用户
      this.$message.success('操作成功')
      // 关闭弹窗
      this.$parent.isShowDialog = false
      // 更新页面
      this.$parent.getList()
    },
    btnCancel() {
      // 1. 清理数据
      // 2. 清理报错
      this.$refs.addForm.resetFields()
      // 3. 关闭弹窗
      // 可以用 $emit 通知父组件处理传入 pros
      // 还有一种方法, $parent 可以直接获取父组件的数据
      // this.isShowDialog = false
      this.$parent.isShowDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.depts {
  border: 1px solid #888;
  width: 90%;
  position: absolute;
  z-index: 9;
  height: 200px;
  overflow: auto;
}
</style>
