<template lang="html">
  <div class="">
    <myHeader></myHeader>
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
    }
  },
  components: {
    myHeader, myFooter, TaskFilter
  }
}
</script>

<style lang="scss" scoped>
</style>
