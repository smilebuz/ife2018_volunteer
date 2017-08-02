<template lang="html">
  <div>
    <div class="priority-filter">
      <span @click='toggleSelected'>低优</span>
      <span @click='toggleSelected'>中优</span>
      <span @click='toggleSelected'>高优</span>
    </div>
    <div class="status-filter">
      <span @click='toggleSelected'>进行中</span>
      <span @click='toggleSelected'>待办</span>
      <span @click='toggleSelected'>已完成</span>
    </div>
  </div>
</template>

<script>
import utils from '../utils.js'

export default {
  data () {
    return {
    }
  },
  methods: {
    toggleSelected (event) {
      utils.toggleClass(event.target, 'selected')
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
