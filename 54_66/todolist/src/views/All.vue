<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <taskFilter v-on:filter='filterTask'></taskFilter>
    <ul>
      <li v-for='task, index in tasks' :key='index' v-bind:data-id='task.id'>
        <button type="button" class="progress-button" v-for='item, index in progress' :key='index' @click='changeStatus(task.id, item.value)'>{{ item.message }}</button>
        {{ task.priority }}{{ task.status }}{{ task.content }}
        <button type="button" class='operation-button' v-for='item, index in operations' :key='index' @click='opTask(task, item.value)'>{{ item.message }}</button>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/HomeHeader'
import myFooter from '../components/Footer'
import TaskFilter from '../components/TaskFilter'
import state from '../state.js'

export default {
  data () {
    return {
      tasks: [],
      progress: [{
        message: '已完成',
        value: 'complete'
      }, {
        message: '待办',
        value: 'waiting'
      }, {
        message: '进行中',
        value: 'inprogress'
      }],
      operations: [{
        message: '编辑',
        value: 'edit'
      }, {
        message: '删除',
        value: 'delete'
      }]
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
    },
    filterTask (tasks) {
      this.tasks = tasks
    },
    changeStatus (id, status) {
      let task = JSON.parse(localStorage.getItem(id))
      task.status = status
      localStorage[id] = JSON.stringify(task)
      this.refresh()
    },
    opTask (task, opType) {
      switch (opType) {
        case 'delete':
          let id = task.id
          localStorage.removeItem(id)
          this.refresh()
          break
        case 'edit':
          state.set('editTask', task)
          this.$router.push('edit')
          break
        default:
          break
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
  @mixin custom-button {
    border: 1px solid #000;
    border-radius: 5%;
    background: #fff;
    color: #000;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 5px;
      border: 1px solid #000;
      .progress-button {
        @include custom-button;
        margin-left: 5px;
        float: left;
      }
      .operation-button {
        @include custom-button;
        margin-right: 5px;
        float: right;
      }
    }
  }
</style>
