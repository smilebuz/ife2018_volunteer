/*
*  queue中每一项的类型应该是一个对象 {value:20,match:true/false} 渲染的时候根据match的boolean值决定背景颜色
*/
var queue = [];
/*
*  获取用户输入的内容
*/
function getInput() {
    var expWhiteSpace = /\s/g;
    var input = document.querySelector("#content-input").value;
    return {
        value: input,
        match: false
    };
}
/*
*  验证用户输入的内容
*/
function validateInput() {
}
/*
*  在队列最后(左)插入内容
*/
function lastIn() {
    var content = getInput();
    if (content) {
        queue.push(content);
        resetMatchFlag();
        renderQueue();
    }else {
        alert("请输入有效内容!");
    }
}
/*
*  将最后(左)内容移出队列
*/
function lastOut() {
    if (queue.length) {
        queue.pop(queue[queue.length-1]);
        resetMatchFlag();
        renderQueue();
    }else {
        alert("队列已空!");
    }
}
/*
*  在队列最前(有)插入数字
*/
function firstIn() {
    var content = getInput();
    if (content) {
        queue.unshift(content);
        resetMatchFlag();
        renderQueue();
    }else {
        alert("请输入有效内容!");
    }
}
/*
*  将最前(右)数字移出队列
*/
function firstOut() {
    if (queue.length) {
        queue.shift(queue[0]);
        resetMatchFlag();
        renderQueue();
    }else {
        alert("队列已空!");
    }
}
/*
*  清空队列
*/
function clearQueue() {
    queue = [];
    renderQueue();
}
/*
*  搜索队列
*/
function searchItem() {
    resetMatchFlag();
    var keyword = document.querySelector("#keyword").value;
    for (var i = 0; i < queue.length; i++) {
        var item = queue[i];
        if(item.value.indexOf(keyword)>=0) {
            item.match = true;
        }
    }
    renderQueue();
}
/*
*  重置匹配标志位
*/
function resetMatchFlag() {
    for (var i = 0; i < queue.length; i++) {
        queue[i].match = false;
    }
}
/*
*  渲染队列
*/
function renderQueue() {
    var container = document.querySelector(".container");
    var curItems = container.querySelectorAll(".item");
    for (var i = 0; i < curItems.length; i++) {
        if (curItems[i].nodeType===1) {
            container.removeChild(curItems[i]);
        }
    }
    for (var i = 0; i < queue.length; i++) {
        var item = document.createElement("div");
        item.setAttribute("class","item");
        var itemText = document.createTextNode(queue[i].value);
        item.appendChild(itemText);
        if (queue[i].match) {
            item.style.backgroundColor = "#000000";
        }
        container.prepend(item);
    }
}
/*
*  初始化绑定事件
*/
function init() {
    var firstInBtn = document.querySelector("#first-in");
    var lastInBtn = document.querySelector("#last-in");
    var firstOutBtn = document.querySelector("#first-out");
    var lastOutBtn = document.querySelector("#last-out");
    var clearQueueBtn = document.querySelector("#clear-queue");
    var searchBtn = document.querySelector("#search");
    firstInBtn.addEventListener("click",firstIn,false);
    lastInBtn.addEventListener("click",lastIn,false);
    firstOutBtn.addEventListener("click",firstOut,false);
    lastOutBtn.addEventListener("click",lastOut,false);
    clearQueueBtn.addEventListener("click",clearQueue,false);
    searchBtn.addEventListener("click",searchItem,false);
}

init();
