<template>
  <div>
    <!--
    form model 属性绑定数据对象
    form rules 绑定规则对象
    form item prop 属性绑定字段名字符串
     -->
    <el-form :model="formData" :rules="rules">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        mobile: '',
        password: ''
      },
      // 规则本身是个对象, 里面的属性跟数据同名
      rules: {
        mobile: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { pattern: /^1[3-9][0-9]{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码在6-12位之间', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
