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
    },
    // 筛选任务
    filterTask: (priority, status) => {
      let taskCount = localStorage.length
      let tasks = []
      for (var i = 0; i < taskCount; i++) {
        let id = localStorage.key(i)
        let task = JSON.parse(localStorage.getItem(id))
        task.id = id
        tasks.push(task)
      }
      let taskSort = tasks.filter((el, index, array) => {
        if (!priority && !status) {
          return el
        }
        if (!priority) {
          return status === el.status
        }
        if (!status) {
          return priority === el.priority
        }
        return priority === el.priority && status === el.status
      })
      return taskSort
    }
  }
})
