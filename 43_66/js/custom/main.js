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
        taskItems += `<li data-id=${id} data-priority=${priority} data-status=${status}><div class='pan-left'><span class='task-status' data-status='complete'>已完成</span><span class='task-status' data-status='waiting'>待办</span><span class='task-status' data-status='inprogress'>进行中</span></div><div class='prefix'><p>${priority}</p><p>${status}</p></div><p>${content}</p><div class='pan-right'><span class='task-edit'>编辑</span><span class='task-delete'>删除</span></div></li>`;
    }
    $("#task-list").innerHTML = taskItems;
    initPanEvents();
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
        taskItems += `<li data-id=${id} data-priority=${priority} data-status=${status}><div class='pan-left'><span class='task-status' data-status='complete'>已完成</span><span class='task-status' data-status='waiting'>待办</span><span class='task-status' data-status='inprogress'>进行中</span></div><div class='prefix'><p>${priority}</p><p>${status}</p></div><p>${content}</p><div class='pan-right'><span class='task-edit'>编辑</span><span class='task-delete'>删除</span></div></li>`;
    }
    $("#task-list").innerHTML = taskItems;
    initPanEvents();
};
/**
 * 更改样式
 *
 * @param {string} opType 操作类型
 * @param {string} taskID 任务ID
 */
let toggleDisplay = (opType, taskID) => {
    if (opType === "add" || opType === "edit") {
        $("#header-list").style.display = "none";
        $("#main-list").style.display = "none";
        $("#header-edit").style.display = "block";
        $("#main-edit").style.display = "block";
        if (opType === "add") {
            $("#done-edit").setAttribute("data-optype","add");
        }
        else {
            //编辑
            $("#done-edit").setAttribute("data-optype","edit");
            $("#done-edit").setAttribute("taskID",taskID);
            let task = JSON.parse(localStorage.getItem(taskID));
            let priority = task.priority;
            let status = task.status;
            $("#edit-priority-container [data-priority-value='" + priority + "']").setAttribute("data-edit-priority-selected","true");
            $("#edit-status-container [data-status-value='" + status + "']").setAttribute("data-edit-status-selected","true");
            $("#task-content").value = task.content;
        }
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
 * 添加/编辑新的任务
 *
 */
let editTask = () => {
    let opType = $("#done-edit").getAttribute("data-optype");
    switch (opType) {
        case "add":
            let taskContent = $("#task-content").value;
            let taskPriority = $("[data-edit-priority-selected='true']").getAttribute("data-priority-value");
            let taskStatus = $("[data-edit-status-selected='true']").getAttribute("data-status-value");
            let newTask = {
                priority: taskPriority,
                status: taskStatus,
                content: taskContent
            };
            localStorage.setItem(new Date().getTime().toString(),JSON.stringify(newTask));
            break;
        case "edit":
            let taskID = $("#done-edit").getAttribute("taskID");
            let task = JSON.parse(localStorage.getItem(taskID));
            task.priority = $("[data-edit-priority-selected='true']").getAttribute("data-priority-value");
            task.status = $("[data-edit-status-selected='true']").getAttribute("data-status-value");
            task.content = $("#task-content").value;
            localStorage[taskID] = JSON.stringify(task);
            break;
        default:
            break;
    }
};
/**
 * 滑动事件
 *
 */
let initPanEvents = () => {
    let curTaskItems = $$("#task-list li");
    for (let i = 0; i < curTaskItems.length; i++) {
        new Hammer(curTaskItems[i]).on("panleft panright panend", (event) => {
            switch (event.type) {
                case "panleft":
                    //let panDis = Math.abs(event.deltaX);
                    let panDisLeft = event.deltaX;
                    if (Math.abs(panDisLeft) <= 200) {
                        console.log(panDisLeft);
                        curTaskItems[i].style.transform = "translateX("+panDisLeft+"px)";
                    }
                    else {

                    }
                    break;
                case "panright":
                    let panDisRight = event.deltaX;
                    if (panDisRight <= 200) {
                        console.log(panDisRight);
                        curTaskItems[i].style.transform = "translateX("+panDisRight+"px)";
                    }
                    else {

                    }
                    break;
                case "panend":
                    let panDisFinal = Math.abs(event.deltaX);
                    console.log("end: " + panDisFinal);
                    break;
                default:

            }
        });
    }
}
//以下为工具类
/**
* 添加类
*
* @param {Object} el 添加类的元素
* @param {string} newClassName 添加的类名称
*/
function addClass(el,newClassName) {
    var classes = el.className.split(" ");
    if (!classes.length) {
        classes.push(newClassName);
    }
    else {
        if (classes.indexOf(newClassName)<0) {
            classes.push(newClassName);
        }
    }
    el.className = classes.join(" ");
}
/**
* 删除类
*
* @param {Object} el 删除类的元素
* @param {string} delClassName 删除的类名称
*/
function removeClass(el,delClassName) {
    var classes = el.className.split(" ");
    var position = classes.indexOf(delClassName);
    if (position>=0) {
        classes.splice(position,1);
    }
    el.className = classes.join(" ");
}
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
    let taskList = new Hammer($("#task-list"));
    oneThingBtn.on("tap",() => {
        showImportantTask();
    });
    allBtn.on("tap", () => {
        refreshTaskList();
    });
    addItemBtn.on("tap",() => {
        toggleDisplay("add");
    });
    cancelEdit.on("tap",() => {
        toggleDisplay("cancel");
    });
    doneEditBtn.on("tap",() => {
        editTask();
        toggleDisplay("done");
    });
    //编辑
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
    //筛选
    for (let i = 0; i < priorityFilters.length; i++) {
        new Hammer(priorityFilters[i]).on("tap", () => {
            let cur_selected = priorityFilters[i].getAttribute("data-filter-priority-selected");
            if (cur_selected === "true") {
                priorityFilters[i].setAttribute("data-filter-priority-selected","false");
            }
            else {
                priorityFilters[i].setAttribute("data-filter-priority-selected","true");
            }
            filterTask();
        });
    }
    for (let i = 0; i < statusFilters.length; i++) {
        new Hammer(statusFilters[i]).on("tap", () => {
            let cur_selected = statusFilters[i].getAttribute("data-filter-status-selected");
            if (cur_selected === "true") {
                statusFilters[i].setAttribute("data-filter-status-selected","false");
            }
            else {
                statusFilters[i].setAttribute("data-filter-status-selected","true");
            }
            filterTask();
        });
    }
    //滑动按钮
    taskList.on("tap", (event) => {
        let target = event.target;
        let targetClass = target.className;
        if (targetClass.indexOf("status") >= 0) {
            let taskID = target.parentElement.parentElement.getAttribute("data-id");
            let status = target.getAttribute("data-status");
            let task = JSON.parse(localStorage.getItem(taskID));
            task.status = status;
            localStorage[taskID] = JSON.stringify(task);
            refreshTaskList();
        }
        if (targetClass.indexOf("task-edit") >= 0) {
            let taskID = target.parentElement.parentElement.getAttribute("data-id");
            toggleDisplay("edit",taskID);
        }
        if (targetClass.indexOf("task-delete") >= 0) {
            let taskID = target.parentElement.parentElement.getAttribute("data-id");
            localStorage.removeItem(taskID);
            refreshTaskList();
        }
    });
    refreshTaskList();
}

init();
