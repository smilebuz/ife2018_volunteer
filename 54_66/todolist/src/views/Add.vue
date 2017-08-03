<template lang="html">
  <div>
    <myHeader v-bind:content='content'></myHeader>
    <TaskFilter></TaskFilter>
    <textarea rows="8" cols="80" id="content" v-model='content'></textarea>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/AddHeader'
import myFooter from '../components/Footer'
import TaskFilter from '../components/TaskFilter'

export default {
  data () {
    return {
      content: ''
    }
  },
  components: {
    myHeader, myFooter, TaskFilter
  }
}
</script>

<style lang="scss" scoped>
  #content {
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid #000;
  }
</style>
