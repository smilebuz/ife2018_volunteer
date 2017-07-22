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
        taskItems += `<li data-id=${id} data-priority=${priority} data-status=${status}><p>${content}</p></li>`
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
    let addItemBtn = new Hammer($("#add-item"));
    let cancelEdit = new Hammer($("#cancel-edit"));
    let doneEditBtn = new Hammer($("#done-edit"));
    let editPriorities = $$(".edit-priority");
    let editStatus = $$(".edit-status");
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
    refreshTaskList();
}

init();
