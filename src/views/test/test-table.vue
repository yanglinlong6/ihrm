<template>
  <table class="testTable">
    <!-- 假设封装给被人使用, 不希望写死, 使用时才确定内容, 可以用插槽 -->
    <slot />

    <tr v-for="item in data" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.desc }}</td>
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
