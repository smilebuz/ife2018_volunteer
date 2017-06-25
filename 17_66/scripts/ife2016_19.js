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
    if (num>=10&&num<=100) {
        if (queueLengthCheck()) {
            queue.push(num);
            renderQueue();
        }else {
            alert("队列已满，无法添加新元素");
        }
    }else if (num<10||num>100) {
        alert("请输入10-100范围内数字");
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
    if (num>=10&&num<=100) {
        if (queueLengthCheck()) {
            queue.unshift(num);
            renderQueue();
        } else {
            alert("队列已满，无法添加新元素");
        }
    }else if (num<10||num>100) {
        alert("请输入10-100范围内数字");
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
*  冒泡排序
*/
function bubbleSort(outerindex,innerindex) {
    if (outerindex<queue.length-1) {
        if (innerindex<queue.length-1) {
            var tempNum;
            if(queue[innerindex] > queue[innerindex+1]){
                tempNum = queue[innerindex];
                queue[innerindex] = queue[innerindex+1];
                queue[innerindex+1] = tempNum;
            }
            renderQueue();
            innerindex++;
        }else {
            outerindex++;
            innerindex = 0;
        }
        setTimeout(_bubbleSort(outerindex,innerindex),100);
    } else {
        alert("排序完成!");
    }
}
/*
*  setTimout
*/
function _bubbleSort(outerindex,innerindex) {
    return function functionName() {
        bubbleSort(outerindex,innerindex);
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
*  检查队列长度
*/
function queueLengthCheck() {
    return queue.length<60;
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
        item.style.height = queue[i]+"px";
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
    var bubbleSortBtn = document.querySelector("#bubble-sort");
    var clearQueueBtn = document.querySelector("#clear-queue");
    firstInBtn.addEventListener("click",firstIn,false);
    lastInBtn.addEventListener("click",lastIn,false);
    firstOutBtn.addEventListener("click",firstOut,false);
    lastOutBtn.addEventListener("click",lastOut,false);
    bubbleSortBtn.addEventListener("click",_bubbleSort(0,0),false);
    clearQueueBtn.addEventListener("click",clearQueue,false);
}

init();
