<template lang="html">
  <footer>
    <router-link to="onething" tag="span">OneThing</router-link>
    <router-link to="all" tag="span">All</router-link>
  </footer>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg-color: #d9d9d9;
  $text-color: #000;
  footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $bg-color;
    span {
      flex: 1;
      text-align: center;
      cursor: pointer;
      color: $text-color;
    }
  }
</style>
