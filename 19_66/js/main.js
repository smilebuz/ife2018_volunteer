/**
* @file 脚本包含了轮播图操作、用户信息的下拉框联动及表格切换
* @author victorxpz
*/
//国家城市映射对象
var geoObject = {
    "CN": [
        {
            "city": "北京",
            "value": "BJ"
        },
        {
            "city": "上海",
            "value": "SH"
        },
        {
            "city": "广州",
            "value": "GZ"
        }
    ],
    "US": [
        {
            "city": "洛杉矶",
            "value": "LA"
        },
        {
            "city": "纽约",
            "value": "NY"
        },
        {
            "city": "旧金山",
            "value": "SFO"
        }
    ],
    "UK": [
        {
            "city": "伦敦",
            "value": "LON"
        },
        {
            "city": "利物浦",
            "value": "LIV"
        },
        {
            "city": "曼彻斯特",
            "value": "MAN"
        }
    ]
}
//不同table的数据
var tables = {
    "table1": {
        "tr1": ["Feature T1","Some Text T1","Some Text T1","Some Text T1"],
        "tr2": ["Feature T1","Some Text T1","Some Text T1","Some Text T1"],
        "tr3": ["Feature T1","Some Text T1","Some Text T1","Some Text T1"],
        "tr4": ["Feature T1","Some Text T1","Some Text T1","Some Text T1"],
    },
    "table2": {
        "tr1": ["Feature T2","Some Text T2","Some Text T2","Some Text T2"],
        "tr2": ["Feature T2","Some Text T2","Some Text T2","Some Text T2"],
        "tr3": ["Feature T2","Some Text T2","Some Text T2","Some Text T2"],
        "tr4": ["Feature T2","Some Text T2","Some Text T2","Some Text T2"],
    },
    "table3": {
        "tr1": ["Feature T3","Some Text T3","Some Text T3","Some Text T3"],
        "tr2": ["Feature T3","Some Text T3","Some Text T3","Some Text T3"],
        "tr3": ["Feature T3","Some Text T3","Some Text T3","Some Text T3"],
        "tr4": ["Feature T3","Some Text T3","Some Text T3","Some Text T3"],
    },
    "table4": {
        "tr1": ["Feature T4","Some Text T4","Some Text T4","Some Text T4"],
        "tr2": ["Feature T4","Some Text T4","Some Text T4","Some Text T4"],
        "tr3": ["Feature T4","Some Text T4","Some Text T4","Some Text T4"],
        "tr4": ["Feature T4","Some Text T4","Some Text T4","Some Text T4"],
    }
};

var $ = function(el) {
    return document.querySelector(el);
};
var $$ = function(el) {
    return document.querySelectorAll(el);
}
//计时器id
var carouselMoveId1;
var carouselMoveId2;
var carouselFadeId1;
var carouselFadeId2;
//是否轮播
var isCarousel = false;
/**
* 轮播图常量
*
* @const
* @type {number} PICSIZE 图片尺寸
* @type {number} FADE_SPEED 淡入淡出速率
*/
const PICSIZE = 960;
const FADE_SPEED = 0.05;
/**
* 为在setTimeout中调用carouselChange函数创建的函数
*
* @param {string} changeType 轮播类型
* @return {Function} 返回一个调用carouselChange函数的函数
*/
function _carouselChange(changeType) {
    return function(){
        carouselChange(changeType);
    }
}
/**
* 改变轮播方式
*
* @param {string} changeType 轮播类型
*/
function carouselChange(changeType) {
    switch (changeType) {

        case "move":
            stopCarousel();
            resetCarousel();
            carouselMovePrepare();
            carouselMove();
            break;

        case "fade":
            stopCarousel();
            resetCarousel();
            carouselFadePrepare();
            carouselFade();
            break;

        case "stop":
            stopCarousel();
            resetCarousel();
            break;

        default:
            break;

    }
}
/**
* 轮播方式选择
*
*/
function selectCarouselType(event) {
    var carouselType = event.target.getAttribute("data-carousel-type");
    $(".carousel-menu").style.display = "none";
    carouselChange(carouselType);
}
/**
* 在轮播图准备进行移动切换前对DOM元素的属性进行初始化
*
*/
function carouselMovePrepare() {
    var carouselContainer = $(".carousel");
    var carouselItems = $$(".carousel-item");
    carouselContainer.style.overflow = "hidden";
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].style.left = i * PICSIZE + "px";
        carouselItems[i].style.opacity = "1";
        carouselItems[i].setAttribute("data-carousel-order",i + 1);
    }
    isCarousel = true;
}
/*
* 轮播图水平移动
*
*/
function carouselMove() {
    var carouselContainer = $(".carousel");
    var carouselItems = $$(".carousel-item");
    for (let i = 0; i < carouselItems.length; i++) {
        var el = $("[data-carousel-order='"+(i + 1)+"']");
        moveElement(el,parseInt(el.style.left) - PICSIZE);
    }
}
/**
* 为在setTimeout中调用moveElement函数创建的函数
*
* @param {Object} el 要移动的轮播项
* @param {number} final_x 移动终点的x轴坐标
* @return {Function} 一个调用moveElement函数的函数
*/
function _moveElement(el,final_x) {
    return function(){
        moveElement(el,final_x);
    }
}
/**
* 移动元素
*
* @param {Object} el 要移动的轮播项
* @param {number} final_x 移动终点的x轴坐标
*/
function moveElement(el,final_x) {
    if (isCarousel) {
        var carouselControlContainer = $(".carousel-controls");
        var carouselControlCur = $(".carousel-selected");
        var carouselItems = $$(".carousel-item");
        var carouselControlNext;
        if (carouselControlCur==carouselControlContainer.lastElementChild) {
            carouselControlNext = carouselControlContainer.firstElementChild;
        }
        else {
            carouselControlNext = carouselControlCur.nextElementSibling;
        }
        var target_order = parseInt(el.getAttribute("data-carousel-order")) - 1;
        var cur_x = parseInt(el.style.left);
        if (cur_x > final_x) {
            cur_x -= 1;
            el.style.left = cur_x+"px";
            carouselMoveId1 = setTimeout(_moveElement(el,final_x),0);
        }
        else {
            if (target_order===0) {
                el.style.left = (carouselItems.length - 1) * PICSIZE + "px";
                el.setAttribute("data-carousel-order",carouselItems.length);
            }
            else {
                el.setAttribute("data-carousel-order",target_order);
            }
            if (target_order===2) {
                removeClass(carouselControlCur,"carousel-selected");
                addClass(carouselControlNext,"carousel-selected");
                carouselMoveId2 = setTimeout(carouselMove,500);
            }
        }
    }
    else {
        resetCarousel();
    }
}
/**
* 轮播图淡入淡出初始化
*
*/
function carouselFadePrepare() {
    isCarousel = true;
}
/**
* 轮播图淡入淡出
*
*/
function carouselFade() {
    if (isCarousel) {
        var carouselContainer = $(".carousel");
        var carouselItems = $$(".carousel-item");
        var carouselCur= $("[data-carousel-cur=true]");
        var carouselNext;
        var carouselControlContainer = $(".carousel-controls");
        var carouselControlCur = $(".carousel-selected");
        var carouselControlNext;
        /*
        if (carouselCur==carouselContainer.lastElementChild) {
            carouselNext = carouselContainer.firstElementChild;
        }
        else {
            carouselNext = carouselCur.nextElementSibling;
        }
        */
        if (carouselCur==carouselItems[carouselItems.length-1]) {
            carouselNext = carouselItems[0];
        }
        else {
            carouselNext = carouselCur.nextElementSibling;
        }

        if (carouselControlCur==carouselControlContainer.lastElementChild) {
            carouselControlNext = carouselControlContainer.firstElementChild;
        }
        else {
            carouselControlNext = carouselControlCur.nextElementSibling;
        }
        var opacity1 = parseFloat(window.getComputedStyle(carouselCur).opacity);
        var opacity2 = parseFloat(window.getComputedStyle(carouselNext).opacity);
        if (opacity1 > 0) {
            opacity1 -= FADE_SPEED;
            opacity2 += FADE_SPEED;
            carouselCur.style.opacity = opacity1;
            carouselNext.style.opacity = opacity2;
            carouselFadeId1 = setTimeout(carouselFade,50);
        }
        else {
            carouselCur.setAttribute("data-carousel-cur","false");
            carouselNext.setAttribute("data-carousel-cur","true");
            removeClass(carouselControlCur,"carousel-selected");
            addClass(carouselControlNext,"carousel-selected");
            carouselFadeId2 = setTimeout(carouselFade,2000);
        }
    }
    else {
        resetCarousel();
    }
}
/**
* 暂停轮播
*
*/
function pauseCarousel() {
    console.log("秘笈：暂停！");
    //clearTimeoutIfExisted(carouselMoveId2);
    //stopCarousel();
}
/**
* 继续轮播
*
*/
function continueCarousel() {
    console.log("秘笈：继续！");
}
/**
* 停止轮播
*
*/
function stopCarousel() {
    isCarousel = false;
}
/**
* 重置轮播
*
*/
function resetCarousel() {
    clearTimeoutIfExisted(carouselFadeId1);
    clearTimeoutIfExisted(carouselFadeId2);
    clearTimeoutIfExisted(carouselMoveId1);
    clearTimeoutIfExisted(carouselMoveId2);
    var carouselContainer = $(".carousel");
    var carouselItems = $$(".carousel-item");
    var carouselControlContainer = $(".carousel-controls");
    var carouselControls = $$(".carousel-control");
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].removeAttribute("style");
        carouselItems[i].removeAttribute("data-carousel-order");
        carouselItems[i].setAttribute("data-carousel-cur","false");
    }
    carouselItems[0].setAttribute("data-carousel-cur","true");
    for (let i = 0; i < carouselControls.length; i++) {
        if (carouselControls[i]===carouselControlContainer.firstElementChild) {
            addClass(carouselControls[i],"carousel-selected");
        }
        else {
            removeClass(carouselControls[i],"carousel-selected");
        }
    }
}
/**
* 清除计时器
*
* @param {number} timeoutId 计时器的id
*/
function clearTimeoutIfExisted(timeoutId) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
}
/**
* 为轮播图容器初始化右键菜单
*
*/
function initContentMenu(event) {
    event.cancelBubble = true;
    event.returnValue = false;
    var carouselContainer = $(".carousel");
    var width = parseInt(window.getComputedStyle(carouselContainer).width);
    var height = parseInt(window.getComputedStyle(carouselContainer).height);
    var menu = $(".carousel-menu");
    menu.style.display = "flex";
    var menuLeft = event.layerX;
    var menuTop = event.layerY;
    /*
    l = event.clientX;
    t = event.clientY;
    if( l >= (width - menu.offsetWidth) ) {
        l  = width - menu.offsetWidth;
    } else {
        l = l
    }
    if(t > height - menu.offsetHeight  ) {
        t = height - menu.offsetHeight;
    } else {
        t = t;
    }
    */
    if (width - menuLeft < menu.offsetWidth) {
        menuLeft = width - menu.offsetWidth;
    }
    else {
        menuLeft = event.layerX;
    }
    if (height - menuTop < menu.offsetHeight) {
        menuTop = height - menu.offsetHeight;
    }
    else {
        menuTop = event.layerY;
    }
    menu.style.left = menuLeft + 'px';
    menu.style.top = menuTop + 'px';
    //return false;
}
/**
* 选择国家的下拉框内值发生变化时，根据选择的国家
* 调用函数改变城市下拉框中的选项
*
*/
function changeCountry() {
    var country = $("#country-select").value;
    refreshCitySelect(country);
}
/**
* 改变城市选择下拉框中的选项
*
* @param {string} country 选择的国家
*/
function refreshCitySelect(country) {
    var citySelect = $("#city-select");
    var cur_cityElements = [];
    for (let i = 0; i < citySelect.childNodes.length; i++) {
        if (citySelect.childNodes[i].nodeType===1) {
            cur_cityElements.push(citySelect.childNodes[i]);
        }
    }
    for (let i = 1; i < cur_cityElements.length; i++) {
        citySelect.removeChild(cur_cityElements[i]);
    }
    var cities = geoObject[country];
    for (let i = 0; i < cities.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value",cities[i].value);
        var text = document.createTextNode(cities[i].city);
        option.appendChild(text);
        citySelect.appendChild(option);
    }
}
/**
* 根据点击tab刷新列表
*
* @param {Object} event 点击事件
*/
function refreshTable(event) {
    var cur_trs = $$("tbody tr");
    var table = $("table");
    var tbody = $("tbody");
    var tabs = $$(".table-tabs > span");
    for (let i = 0; i < cur_trs.length; i++) {
        tbody.removeChild(cur_trs[i]);
    }
    //改变tab样式
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i]===event.target) {
            addClass(tabs[i],"tab-selected");
        }
        else {
            removeClass(tabs[i],"tab-selected");
        }
    }
    var tableChosen = event.target.getAttribute("data-for");
    var content = tables[tableChosen];
    for (var tr in content) {
        if (content.hasOwnProperty(tr)) {
            var newRow = document.createElement("tr");
            for (let i = 0; i < content[tr].length; i++) {
                var newCol = document.createElement("td");
                var text = document.createTextNode(content[tr][i]);
                newCol.appendChild(text);
                newRow.appendChild(newCol);
            }
            tbody.appendChild(newRow);
        }
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
* 初始化
*
*/
function init() {
    var countrySelect = $("#country-select");
    var tableTabs = $(".table-tabs");
    var carouselContainer = $(".carousel");
    var carouselMenu = $(".carousel-menu");
    countrySelect.addEventListener("change",changeCountry,false);
    tableTabs.addEventListener("click",refreshTable,false);
    carouselContainer.addEventListener("contextmenu",initContentMenu,false);
    carouselContainer.addEventListener("mouseenter",pauseCarousel,false);
    carouselContainer.addEventListener("mouseleave",continueCarousel,false);
    carouselMenu.style.display = "none";
    carouselMenu.addEventListener("click",selectCarouselType,false);
    //模拟点击
    $("[data-for=table1]").click();
}

init();
