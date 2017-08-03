<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <taskFilter></taskFilter>
    <ul>
      <li v-for='task, index in tasks' :key='index' v-bind:data-id='task.id'>{{ task.priority }}{{ task.status }}{{ task.content }}</li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/HomeHeader'
import myFooter from '../components/Footer'
import TaskFilter from '../components/TaskFilter'

export default {
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    refresh () {
      this.tasks = [] // 清空列表
      let taskCount = localStorage.length
      for (let i = 0; i < taskCount; i++) {
        let id = localStorage.key(i)
        let task = JSON.parse(localStorage.getItem(id))
        let priority = task.priority
        let status = task.status
        let content = task.content
        this.tasks.push({
          id: id,
          priority: priority,
          status: status,
          content: content
        })
      }
    }
  },
  mounted () {
    this.refresh()
  },
  components: {
    myHeader, myFooter, TaskFilter
  }
}
</script>

<style lang="scss" scoped>
</style>
