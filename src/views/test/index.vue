<template>
  <div>
    <TestTable :data="list">
      <!-- 还有具名插槽的用法 -->
      <template v-slot:header>
        <th>角色名</th>
        <th>描述</th>
      </template>
      <!-- 这里是父组件, 如果直接写 item
      会在当前父组件的 data 里面找(找不到)
      这些数据的作用域只在子组件内部 -->
      <!-- 通过作用域插槽实现, v-slot 接收一个对象, 包含内部所有的数据 -->
      <template v-slot="{ row }">
        <td>{{ row.name }}</td>
        <td>{{ row.desc }}</td>
      </template>
    </TestTable>
  </div>
</template>

<script>
import TestTable from './test-table.vue'
export default {
  components: {
    TestTable
  },
  data() {
    return {
      list: [
        { id: 1, name: '总经理', desc: '啥都能干' },
        { id: 2, name: '实习生', desc: '啥都不能干' }
      ]
    }
  }
}
</script>

<style lang="scss">
.testTable {
  td, th {
    border: 1px solid #888;
  }
}
</style>
