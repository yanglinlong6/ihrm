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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="formData.checkPass" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    // 因为自定义校验函数, 只用一次, 无需methods声明
    // 在这里创建一下临时使用即可
    const checkPassFn = (rule, val, callback) => {
      // 这个函数是触发校验时组件库自动执行, 默认会传入三个三叔
      // rule 当前规则, val 当前用户输入的值, callback 回调函数
      // 如果函数逻辑认为输入符合条件, 直接调用 callback()
      // 如果逻辑认为填写有错, 调用 callback 时要带上 原生错误对象, new Error(字符)
      if (val === this.formData.password) {
        callback()
      } else {
        callback(new Error('两次输入密码必须相同'))
      }
    }
    // 不能像下面那样写, 会影响this指向, 建议直接使用箭头函数即可
    // function checkPassFn(rule, val, callback) {
    //   console.log(this)
    //   if (val === this.formData.password) {
    //     callback()
    //   } else {
    //     callback(new Error('两次输入密码必须相同'))
    //   }
    // }

    return {
      formData: {
        mobile: '',
        password: '',
        checkPass: ''
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
        ],
        checkPass: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          // 这里没办法定规则, 可以用自定义校验函数处理
          { validator: checkPassFn, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
