<template lang="html">
  <header>
    <router-link to="home" tag='button' id="cancel">Cancel</router-link>
    <span> {{ title }} </span>
    <button type="button" id="done">Done</button>
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
    addTask () {
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg-color: #d9d9d9;
  header {
    background-color: $bg-color;
    #cancel {
      float: left;
      margin-left: 20px;
    }
    #done {
      float: right;
      margin-right: 20px;
    }
  }
</style>
