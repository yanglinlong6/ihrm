<template>
  <!-- 新增部门的弹层 visible 控制显示, -->
  <el-dialog title="新增部门" :visible="isShowDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <!-- 第一要注意就是开闭标签插槽嵌套 -->
          <!-- el-option 的 value 属性决定了点击时那个数据会传入上面的 v-model -->
          <!-- <el-option value="小明" />
          <el-option value="小刚" /> -->
          <!-- 选项可以遍历列表
          其中 value 值会在某个选项被选中时
          绑到 上面的 v-model 属性中 -->
          <el-option
            v-for="item in userList"
            :key="item.id"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employee'
export default {
  props: {
    // 这里是弹窗组件, 是否显示由外部控制
    isShowDialog: {
      type: Boolean,
      required: true
      // 除了 required 还能用 default 属性
      // required 是指定是否必填
      // default 是可以指定默认值
      // default: false
    }
  },
  data() {
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      userList: []
    }
  },
  async created() {
    this.userList = await getEmployeeSimple()
    console.log('获取员工简单列表', this.userList)
  }
}
</script>

<style>

</style>
