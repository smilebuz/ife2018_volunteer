<template lang="html">
  <header>
    <router-link to="all" tag='button' id="cancel">Cancel</router-link>
    <span> {{ title }} </span>
    <button type="button" id="done" @click='addTask'>Done</button>
  </header>
</template>

<script>
import state from '../state.js'

export default {
  data () {
    return {
      title: 'TodoList'
    }
  },
  props: ['content'],
  methods: {
    addTask () {
      let pageName = this.$route.name
      switch (pageName) {
        case 'add':
          let priority = state.get('priority')
          let status = state.get('status')
          let newTask = {
            priority: priority,
            status: status,
            content: this.content
          }
          localStorage.setItem(new Date().getTime().toString(), JSON.stringify(newTask))
          break
        case 'edit':
          let task = state.get('editTask')
          let id = task.id
          let editTask = {
            priority: state.get('priority'),
            status: state.get('status'),
            content: this.content
          }
          localStorage[id] = JSON.stringify(editTask)
          break
        default:
          break
      }
      this.$router.push('all')
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg-color: #d9d9d9;
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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
