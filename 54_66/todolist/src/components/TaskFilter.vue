<template lang="html">
  <div class="container">
    <div class="priority-filter filter">
      <span v-for='item, index in priorities' :key='index' @click='toggleSelected' v-bind:data-value='item.value' data-type='priority'>{{ item.message }}</span>
    </div>
    <div class="status-filter filter">
      <span v-for='item, index in status' :key='index' @click='toggleSelected' v-bind:data-value='item.value' data-type='status'>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import utils from '../utils.js'
import state from '../state.js'

export default {
  data () {
    return {
      priorities: [{
        message: '低优',
        value: 'low'
      }, {
        message: '中优',
        value: 'medium'
      }, {
        message: '高优',
        value: 'high'
      }],
      status: [{
        message: '进行中',
        value: 'inprogress'
      }, {
        message: '待办',
        value: 'waiting'
      }, {
        message: '已完成',
        value: 'complete'
      }]
    }
  },
  methods: {
    toggleSelected (event) {
      let target = event.target
      let siblings = event.target.parentElement.children
      let type = target.getAttribute('data-type')
      utils.toggleClass(target, 'selected')
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== target) {
          utils.removeClass(siblings[i], 'selected')
        }
      }
      // set state
      if (target.className.includes('selected')) {
        let value = target.getAttribute('data-value')
        state.set(type, value)
      } else {
        state.set(type, '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $priority-bg-color: #fbebeb;
  $status-bg-color: #f0fded;
  $selected-border: 1px solid #e62117;
  @mixin filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
  .container {
    margin-top: 30px;
  }
  .priority-filter {
    background: $priority-bg-color;
    @include filter-container;
  }
  .status-filter {
    background: $status-bg-color;
    @include filter-container;
  }
  .selected {
    border: $selected-border;
  }
</style>
