<template>
  <!-- 新增部门的弹层 visible 控制显示, -->
  <el-dialog :title="formData.id?'编辑部门':'新增部门'" :visible="isShowDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addForm" label-width="120px" :model="formData" :rules="rules">
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
        <el-button type="primary" size="small" @click="btnOK">{{ $t('btnOK') }}</el-button>
        <el-button size="small" @click="btnCancel">{{ $t('btnCancel') }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employee'
import { addDept, editDept, getDeptsList } from '@/api/departments'
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
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const checkRepeatCode = async(rule, val, callback) => {
      // 根据文档, 默认会有三个形参
      // rule 当前规则对象, val 用户数据的值, callback 回调
      // 其中 callback 必须被调用 如果成功调用时不带任何参数 callback()
      // 如果出了错 带上错误对象 callback(new Error)
      // 我们实际的校验逻辑希望: 当前用户输入值 不能等于任何一个存在于部门列表中的 code
      // 1. 当前用户输入值 val
      // 2. 所有部门列表
      const { depts } = await getDeptsList()
      // 这里是有没有重复的标记, 默认设为false认为没有重复
      // 重复代码的判断, 在新增和编辑其实不一样
      // 如果是新增, 当然是不能跟以前的所有部门有任何重名
      // 但是编辑时, 重名的判断, 就要看看, 那个重名的是不是自己, 如果是,就忽略掉
      // 也就是说, 编辑时的判断调教, 必须找到一个 code 跟输入值一样, 但是不是正在编辑的这个部门
      let res = false
      if (!this.formData.id) {
        // 新增
        // depts.forEach(item => {
        // // 遍历所有部门如果有任何一个 code 等于用户输入的 val
        // // 重复标记就改为 true 证明有重复
        //   if (item.code === val) {
        //     res = true
        //   }
        // })
        res = depts.some(item => item.code === val)
      } else {
        // 编辑
        res = depts.some(item => item.code === val && item.id !== this.formData.id)
        // depts.forEach(item => {
        // // 遍历所有部门如果有任何一个 code 等于用户输入的 val
        // // 重复标记就改为 true 证明有重复
        //   if (item.code === val && item.id !== this.formData.id) {
        //     res = true
        //   }
        // })
      }
      // element ui 自定义校验函数处理
      if (res) {
        callback(new Error('code 全公司必须唯一'))
      } else {
        callback()
      }
    }
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
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          // 为了校验代码不重复, 添加自定义校验
          { validator: checkRepeatCode, trigger: 'blur' }
        ],
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
  },
  methods: {
    async btnOK() {
      try {
        // 校验表单
        await this.$refs.addForm.validate()
        // 发请求
        // 将后端需要的数据带上发送请求
        if (!this.formData.id) {
        // 没有回显过 id 就是新增
          await addDept({
          // 将所有用户填写的数据都带上
            ...this.formData,
            // 还有后端需要的父部门id
            pid: this.id
          })
        } else {
        // 编辑
          await editDept(this.formData)
        }
        // 提示用户
        this.$message.success('操作成功')
        // 关闭弹窗(有坑版)
        // props 是单项数据流, 不能直接修改
        // this.isShowDialog = false
        // 要改props要通知父页面改
        this.$emit('closeDialog')
        // 更新页面
        this.$emit('reload')
      } catch (err) {
        // 这里是为了告诉程序, 我们处理过错误
        console.log(err)
      }
    },
    btnCancel() {
      // 清理数据
      // 清理报错
      // 根据之前的经验, resetFields 清理数据在编辑情况下没法清理后续添加的 id 等数据
      // 需要手动处理
      this.$refs.addForm.resetFields()
      this.formData = {}
      // 关闭弹窗(通知父组件关闭, 单项数据流, 不能自己设置 props)
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

</style>
