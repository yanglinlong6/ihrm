<template>
  <el-row style="width: 100%;" :class="{companyTitle: company}">
    <!-- 左侧 -->
    <el-col :span="20">{{ data.name }}</el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <!-- 右侧再分一行两列 -->
      <el-row type="flex">
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <!-- 一直显示内容 -->
            <span class="dropdownSpan">
              操作
            </span>
            <!-- 菜单本体 -->
            <el-dropdown-menu>
              <!-- 这里针对 el-dropdown-item 组件进行事件监听, 他是一个子组件
              不是原生 html 标签, 不一定有 click 事件, 如果想监听浏览器原生元素点击事件
              需要添加一个修饰符 .native 当然如果是 div / span 之类则不需要-->
              <el-dropdown-item @click.native="showAddDialog">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!company">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!company">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // props: ['data']
  // props: {
  //   data: Object
  // }
  props: {
    data: {
      // 类型
      type: Object,
      // 必填
      required: true
    },
    company: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    showAddDialog() {
      console.log('树形组件点击')
      this.$emit('showAddDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdownSpan {
  cursor: pointer;
}
.companyTitle {
  font-weight: bold;
}
</style>
