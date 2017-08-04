import Vue from 'vue'

export default new Vue({
  data () {
    return {
      priority: '',
      status: '',
      editTask: ''
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
