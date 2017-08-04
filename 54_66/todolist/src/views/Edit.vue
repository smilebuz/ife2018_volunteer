<template lang="html">
  <div>
    <myHeader v-bind:content='task.content'></myHeader>
    <TaskFilter></TaskFilter>
    <textarea rows="8" cols="80" id="content" v-model='task.content'></textarea>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/AddHeader'
import myFooter from '../components/Footer'
import TaskFilter from '../components/TaskFilter'
import state from '../state.js'

export default {
  data () {
    return {
      task: {}
    }
  },
  methods: {
    getTaskInfo () {
      this.task = state.get('editTask')
    }
  },
  components: {
    myHeader, myFooter, TaskFilter
  },
  mounted () {
    this.getTaskInfo()
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
