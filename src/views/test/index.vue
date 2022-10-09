<template>
  <div>
    <TestTable :data="list">
      <tr>
        <th>角色名父组件</th>
        <th>描述父组件</th>
      </tr>
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
