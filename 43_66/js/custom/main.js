let $ = (selector) => {
    return document.querySelector(selector);
}
let $$ = (selector) => {
    return document.querySelectorAll(selector);
}
/**
 * 刷新列表
 *
 */
let refreshTaskList = () => {
    let curTaskItems = $$("#task-list li");
    for (let i = 0; i < curTaskItems.length; i++) {
        $("#task-list").removeChild(curTaskItems[i]);
    }
    let taskCount = localStorage.length;
    let taskItems = "";
    for (let i = 0; i < taskCount; i++) {
        let id = localStorage.key(i);
        let task = JSON.parse(localStorage.getItem(id));
        let priority = task.priority;
        let status = task.status;
        let content = task.content;
        taskItems += `<li data-id=${id} data-priority=${priority} data-status=${status}><div><p>${priority}</p><p>${status}</p></div><p>${content}</p></li>`
    }
    $("#task-list").innerHTML = taskItems;
};
/**
 * 显示正在进行的优先级最高的时间最久的任务
 *
 */
let showImportantTask = () => {
    let taskCount = localStorage.length;
    let tasks = [];
    for (var i = 0; i < taskCount; i++) {
        let id = localStorage.key(i);
        let task = JSON.parse(localStorage.getItem(id));
        task.id = id;
        tasks.push(task);
    }
    let task_sort = tasks.filter((el, index, array) => {
        return el.priority === "high" && el.status ==="inprogress";
    }).sort((el1, el2) => {
        return el1.id - el2.id;
    });
    let curTaskItems = $$("#task-list li");
    for (let i = 0; i < curTaskItems.length; i++) {
        $("#task-list").removeChild(curTaskItems[i]);
    }
    let id = task_sort[0].id;
    let priority = task_sort[0].priority;
    let status = task_sort[0].status;
    let content = task_sort[0].content;
    let taskItems = `<li data-id=${id} data-priority=${priority} data-status=${status}><div><p>${priority}</p><p>${status}</p></div><p>${content}</p></li>`
    $("#task-list").innerHTML = taskItems;
};
/**
 * 筛选任务
 *
 */
let filterTask = () => {
    let priorityFilters = $$("[data-filter-priority-selected='true']");
    let statusFilters = $$("[data-filter-status-selected='true']");
    let priorities = [];
    let status = [];
    for (var i = 0; i < priorityFilters.length; i++) {
        priorities.push(priorityFilters[i].getAttribute("data-priority-value"));
    }
    for (var i = 0; i < statusFilters.length; i++) {
        status.push(statusFilters[i].getAttribute("data-status-value"));
    }
    let taskCount = localStorage.length;
    let tasks = [];
    for (var i = 0; i < taskCount; i++) {
        let id = localStorage.key(i);
        let task = JSON.parse(localStorage.getItem(id));
        task.id = id;
        tasks.push(task);
    }
    let task_sort = tasks.filter((el, index, array) => {
        if (!priorities.length && !status.length) {
            return el;
        }
        if (!priorities.length) {
            return status.includes(el.status);
        }
        if (!status.length) {
            return priorities.includes(el.priority);
        }
        return priorities.includes(el.priority) && status.includes(el.status);
    });
    //
    let curTaskItems = $$("#task-list li");
    for (let i = 0; i < curTaskItems.length; i++) {
        $("#task-list").removeChild(curTaskItems[i]);
    }
    let taskItems = "";
    for (let i = 0; i < task_sort.length; i++) {
        let task = task_sort[i];
        let id = task.id;
        let priority = task.priority;
        let status = task.status;
        let content = task.content;
        taskItems += `<li data-id=${id} data-priority=${priority} data-status=${status}><div><p>${priority}</p><p>${status}</p></div><p>${content}</p></li>`
    }
    $("#task-list").innerHTML = taskItems;
};
/**
 * 更改样式
 *
 * @param {string} opType 操作类型
 */
let toggleDisplay = (opType) => {
    if (opType === "list") {
        $("#header-list").style.display = "none";
        $("#main-list").style.display = "none";
        $("#header-edit").style.display = "block";
        $("#main-edit").style.display = "block";
    }
    else {
        $("#header-list").style.display = "block";
        $("#main-list").style.display = "block";
        $("#header-edit").style.display = "none";
        $("#main-edit").style.display = "none";
        let editPriorities = $$(".edit-priority");
        let editStatus = $$(".edit-status");
        for (let i = 0; i < editPriorities.length; i++) {
            editPriorities[i].removeAttribute("data-edit-priority-selected");
        }
        for (let i = 0; i < editStatus.length; i++) {
            editStatus[i].removeAttribute("data-edit-status-selected");
        }
        $("#task-content").value = "";
        refreshTaskList();
    }
};
/**
 * 重置编辑面板
 *
 */
/**
 * 添加新的任务
 *
 */
let addTask = () => {
    let taskContent = $("#task-content").value;
    let taskPriority = $("[data-edit-priority-selected='true']").getAttribute("data-priority-value");
    let taskStatus = $("[data-edit-status-selected='true']").getAttribute("data-status-value");
    let newTask = {
        priority: taskPriority,
        status: taskStatus,
        content: taskContent
    };
    localStorage.setItem(new Date().getTime().toString(),JSON.stringify(newTask));
};
/**
 *
 *
 */
let init = () => {
    let oneThingBtn = new Hammer($("#onething"));
    let allBtn = new Hammer($("#all"));
    let priorityFilters = $$(".priority-filter");
    let statusFilters = $$(".status-filter");
    let addItemBtn = new Hammer($("#add-item"));
    let cancelEdit = new Hammer($("#cancel-edit"));
    let doneEditBtn = new Hammer($("#done-edit"));
    let editPriorities = $$(".edit-priority");
    let editStatus = $$(".edit-status");
    oneThingBtn.on("tap",() => {
        showImportantTask();
    });
    allBtn.on("tap", () => {
        refreshTaskList();
    });
    addItemBtn.on("tap",() => {
        toggleDisplay("list");
    });
    cancelEdit.on("tap",() => {
        toggleDisplay("cancel");
    });
    doneEditBtn.on("tap",() => {
        addTask();
        toggleDisplay("done");
    });
    for (let i = 0; i < editPriorities.length; i++) {
        new Hammer(editPriorities[i]).on("tap",() => {
            editPriorities[i].setAttribute("data-edit-priority-selected","true");
            [...editPriorities[i].parentElement.children].forEach((el, index, number) => {
                if (el!=editPriorities[i]) {
                    el.removeAttribute("data-edit-priority-selected");
                }
            });
        });
    }
    for (let i = 0; i < editStatus.length; i++) {
        new Hammer(editStatus[i]).on("tap",() => {
            editStatus[i].setAttribute("data-edit-status-selected","true");
            [...editStatus[i].parentElement.children].forEach((el, index, number) => {
                if (el!=editStatus[i]) {
                    el.removeAttribute("data-edit-status-selected");
                }
            });
        });
    }
    for (let i = 0; i < priorityFilters.length; i++) {
        new Hammer(priorityFilters[i]).on("tap", () => {
            let cur_selected = priorityFilters[i].getAttribute("data-filter-priority-selected");
            if (cur_selected === "false") {
                priorityFilters[i].setAttribute("data-filter-priority-selected","true");
            }
            else {
                priorityFilters[i].setAttribute("data-filter-priority-selected","false");
            }
            filterTask();
        });
    }
    for (let i = 0; i < statusFilters.length; i++) {
        new Hammer(statusFilters[i]).on("tap", () => {
            let cur_selected = statusFilters[i].getAttribute("data-filter-status-selected");
            if (cur_selected === "false") {
                statusFilters[i].setAttribute("data-filter-status-selected","true");
            }
            else {
                statusFilters[i].setAttribute("data-filter-status-selected","false");
            }
            filterTask();
        });
    }
    refreshTaskList();
}

init();
