<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <p>{{task.priority}}{{task.status}}{{ task.content }}</p>
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
      task: {}
    }
  },
  methods: {
    getOneThing () {
      let taskCount = localStorage.length
      let tasks = []
      for (var i = 0; i < taskCount; i++) {
        let id = localStorage.key(i)
        let task = JSON.parse(localStorage.getItem(id))
        task.id = id
        tasks.push(task)
      }
      let taskSort = tasks.filter((el, index, array) => {
        return el.priority === 'high' && el.status === 'inprogress'
      }).sort((el1, el2) => {
        return el1.id - el2.id
      })
      this.task = taskSort[0]
    }
  },
  components: {
    myHeader, myFooter, TaskFilter
  },
  mounted () {
    this.getOneThing()
  }
}
</script>

<style lang="scss" scoped>
  p {
    margin-top: 30px;
  }
</style>
