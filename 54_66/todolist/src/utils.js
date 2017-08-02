import Vue from 'vue'

export default new Vue({
  data () {
    return {
    }
  },
  methods: {
    addClass: (el, newClass) => {
      let className = el.className
      if (!className.includes(newClass)) {
        if (className.length) {
          className += ' '
          className += className
        } else {
          className = newClass
        }
      }
      el.className = className
    },
    removeClass: (el, targetClass) => {
      let className = el.className
      if (className.includes(targetClass)) {
        className = className.split(' ').filter((element, index, array) => {
          return element !== targetClass
        }).join(' ')
      }
      el.className = className
    },
    toggleClass (el, targetClass) {
      let className = el.className
      if (className.includes(targetClass)) {
        // 删除类
        this.removeClass(el, targetClass)
      } else {
        // 添加类
        this.addClass(el, targetClass)
      }
    }
  }
})
