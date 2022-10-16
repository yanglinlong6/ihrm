<template>
  <div class="page-wrapper">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录信息">
          <el-form ref="loginForm" :model="formData" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="btnOK">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <!-- 个人详细隐私数据 -->
          <UserInfo />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <!-- 岗位工作相关信息 -->
          <JobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { saveUserDetailById } from '@/api/employee'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { min: 2, max: 5, message: '名字在2-5位之间', trigger: 'blur' },
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 12, message: '密码在6-12位之间', trigger: 'blur' },
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    console.log('详情页')
    // $router 路由对象, 一般用来执行跳转函数之类
    // $route 路由信息, 可以读取当前页面的路由数据
    // 跳转进来时问号带上的查询字符串, 可以通过this.$route.query获取
    // 跳转时, 路由配置中 /:xxx 的路径参数, 可以通过 this.$route.params获取
    console.log('问号传参的查询字符串', this.$route.query)
    console.log('路径参数', this.$route.params)
    const res = await getUserDetail(this.userId)
    this.formData = {
      ...res,
      password: ''
    }
  },
  methods: {
    async btnOK() {
      await this.$refs.loginForm.validate()
      await saveUserDetailById(this.formData)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style>

</style>
