<template>
  <div>
    <h1>测试树形结构</h1>
    <!--
      data 传入嵌套的数据数组
      default-expand-all 默认展开所有
      props 传入一个配置对象,可以设置默认label/children在后台数据中真实的字段
     -->
    <el-tree :data="list" :props="config" default-expand-all />
  </div>
</template>

<script>
export default {
  // 1. 数据结构
  data() {
    return {
      // 部门数组
      // 默认情况下树形组件只认 label 作为名称, children 作为子数据
      // 由于这些数据是后端api给出可能字段不一样
      list: [
        { name: '人事部' },
        { name: '行政部' },
        {
          // 如果一个部门有下属, 应该添加一个 children 字段
          name: '技术部',
          children: [
            { name: '前端开发' },
            {
              name: '后端开发',
              children: [
                { name: 'Java' },
                { name: 'PHP' }
              ]
            }
          ]
        },
        { name: '市场部' }
      ],
      config: {
        label: 'name'
      }
    }
  }
}
</script>

<style>

</style>
