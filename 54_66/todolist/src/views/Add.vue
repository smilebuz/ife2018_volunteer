<template lang="html">
  <div>
    <myHeader></myHeader>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/AddHeader'
import myFooter from '../components/Footer'

export default {
  data () {
    return {
    }
  },
  components: {
    myHeader, myFooter
  }
}
</script>

<style lang="css" scoped>
</style>
