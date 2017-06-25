var queue = [];
/*
*  获取用户输入的数字
*/
function getInputNumber() {
    var expWhiteSpace = /\s/g;
    var num = document.querySelector("#num-input").value.replace(expWhiteSpace,"");
    if(validateInputNum(num)){
        return parseInt(num);
    }else{
        return null;
    }
}
/*
*  验证用户输入的数字
*/
function validateInputNum(num) {
    var expNum = /^[1-9][0-9]*$/;
    return expNum.test(num);
}
/*
*  在队列最后(左)插入数字
*/
function lastIn() {
    var num = getInputNumber();
    if (num) {
        queue.push(num);
        renderQueue();
    }else {
        alert("请输入数字!");
    }
}
/*
*  将最后(左)数字移出队列
*/
function lastOut() {
    if (queue.length) {
        queue.pop(queue[queue.length-1]);
        renderQueue();
    }else {
        alert("队列已空!");
    }
}
/*
*  在队列最前(有)插入数字
*/
function firstIn() {
    var num = getInputNumber();
    if (num) {
        queue.unshift(num);
        renderQueue();
    }else {
        alert("请输入数字!");
    }
}
/*
*  将最前(右)数字移出队列
*/
function firstOut() {
    if (queue.length) {
        queue.shift(queue[0]);
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
        var itemText = document.createTextNode(queue[i]);
        item.appendChild(itemText);
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
    firstInBtn.addEventListener("click",firstIn,false);
    lastInBtn.addEventListener("click",lastIn,false);
    firstOutBtn.addEventListener("click",firstOut,false);
    lastOutBtn.addEventListener("click",lastOut,false);
    clearQueueBtn.addEventListener("click",clearQueue,false);
}

init();
