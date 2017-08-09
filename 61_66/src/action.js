import { store } from 'san-store'
import { updateBuilder } from 'san-update'

// 设置路由
store.addAction('setPath', function (path) {
  return updateBuilder().set('path', path);
});

// 初始化todos
store.addAction('initTodos', function () {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  // let filter = {priority: '', status: ''};
  return updateBuilder().set('todos', todos).set('status', '').set('priority', '');
});

// 初始化filter
store.addAction('initFilter', function () {
  return updateBuilder().set('status', '').set('priority', '');
})

// 添加todo
store.addAction('addTodo', function (todo) {
  let todos = store.getState('todos');
  todos.push(todo);
  localStorage.todos = JSON.stringify(todos);
  return updateBuilder().set('todos', todos);
});

// 修改todo
store.addAction('editTodo', function (todo) {
  let id = todo.id;
  let todos = store.getState('todos');
  let index = -1;
  todos.forEach((item, i, array) => {
    if(item.id === id) {
      index = i;
    }
  });
  todos.splice(index, 1, todo);
  localStorage.todos = JSON.stringify(todos);
  return updateBuilder().set('todos', todos);
});

// 删除todo
store.addAction('removeTodo', function (id) {
  let todos = store.getState('todos');
  todos = todos.filter((todo, i, arr) => {
    return todo.id !== id;
  });
  localStorage.todos = JSON.stringify(todos);
  return updateBuilder().set('todos', todos);
});

// 修改筛选条件
store.addAction('changeFilterPriority', function (priority) {
  return updateBuilder().set('priority', priority);
});
store.addAction('changeFilterStatus', function (status) {
  return updateBuilder().set('status', status);
});

// 修改进程
store.addAction('changeStatus', function (info){
  let id = info.id;
  let status = info.status;
  console.log(status);
  let todos = store.getState('todos');
  let index = -1;
  todos.forEach((item, i, array) => {
    if(item.id === id) {
      index = i;
    }
  });
  let todo = todos[index];
  todo.status = status;
  todos.splice(index, 1, todo);
  localStorage.todos = JSON.stringify(todos);
  store.dispatch('initTodos');
  store.dispatch('initFilter');
  return updateBuilder().set('todos', todos);
});
