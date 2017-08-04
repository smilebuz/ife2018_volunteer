import Vue from 'vue'

export default new Vue({
  data () {
    return {
      priority: '',
      status: '',
      tasks: []
    }
  },
  methods: {
    set (key, val) {
      this.$set(this, key, val)
    },
    get (key) {
      return this[key]
    }
  }
})
