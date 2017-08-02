<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <taskFilter></taskFilter>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/HomeHeader'
import myFooter from '../components/Footer'
import taskFilter from '../components/taskFilter'

export default {
  data () {
    return {
    }
  },
  components: {
    myHeader, myFooter, taskFilter
  }
}
</script>

<style lang="scss" scoped>
</style>
