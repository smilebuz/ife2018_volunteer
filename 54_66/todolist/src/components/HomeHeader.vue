<template lang="html">
  <header>
    <span> {{ title }} </span>
    <router-link to='add' tag='button'>Add</router-link>
  </header>
</template>

<script>
export default {
  data () {
    return {
      title: 'TodoList'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  $bg-color: #d9d9d9;
  header {
    background-color: $bg-color;
    button {
      float: right;
      margin-right: 20px;
    }
  }
</style>
