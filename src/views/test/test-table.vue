<template>
  <table class="testTable">
    <tr>
      <!-- 插槽还可以具名 -->
      <slot name="header" />
    </tr>
    <!-- 假设封装给被人使用, 不希望写死, 使用时才确定内容, 可以用插槽 -->
    <tr v-for="item in data" :key="item.id">
      <!-- <td>{{ item.name }}</td>
      <td>{{ item.desc }}</td> -->
      <!-- 如果有数据, 作用域在子组件, 但是父组件又要用到 -->
      <!-- 可以通过给 slot 传参的方式实现 -->
      <slot :row="item" />
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
