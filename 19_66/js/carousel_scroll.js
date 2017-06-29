/**
* @file 该脚本在轮播图部分只包含了水平方向的移动切换
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
/**
* 轮播图常量
*
* @const
* @type {number} PICSIZE 图片尺寸
* @type {string} TRANSITIONDURATION 滑动时间
*/
const PICSIZE = 960;
const TRANSITIONDURATION = "0.5s";
//
var isCarousel = false;
var index = 1;
var carouselTimer;
/**
* 初始化轮播图
*
*/
function prepareCarousel() {
    var carouselItems = $$(".carousel-item");
    var carouselItemContainer = $(".carousel-item-container");
    carouselItemContainer.style.width = carouselItemContainer.childElementCount * PICSIZE + "px";
    carouselItemContainer.style.transform = "translateX(" + (-1 * PICSIZE) + "px)";
    for (var i = 0; i < carouselItems.length; i++) {
        carouselItems[i].style.left = i * PICSIZE + "px";
    }
    startCarousel();
}
/**
* 开始轮播
*
*/
function startCarousel() {
    carouselTimer = setInterval(next,3000);
}
/**
* 暂停轮播
*
*/
function pauseCarousel() {
    clearInterval(carouselTimer);
}
/**
* 点击下一张图片按钮
*
*/
function next() {
    if (!isCarousel) {
        index++;
        move();
        switchCarouselControl(index);
    }
}
/**
* 点击上一张图片按钮
*
*/
function prev() {
    if (!isCarousel) {
        index--;
        move();
        switchCarouselControl(index);
    }
}
/**
* 轮播
*
*/
function move() {
    isCarousel = true;
    var carouselItemContainer = $(".carousel-item-container");
    var carouselItemCount = carouselItemContainer.childElementCount - 2;
    carouselItemContainer.style.transitionDuration = TRANSITIONDURATION;
    carouselItemContainer.style.transform = 'translateX(' + index * PICSIZE * (-1) + "px)";
    isCarousel = false;
    if (index > carouselItemCount) {
        setTimeout(function(){
            carouselItemContainer.style.transitionDuration = 0 + 's';
            carouselItemContainer.style.transform = 'translateX(' + (1 * PICSIZE) * (-1) + 'px)';
            index = 1;
        },500);
    }
    if (index < 1) {
        setTimeout(function(){
            carouselItemContainer.style.transitionDuration = 0 + 's';
            carouselItemContainer.style.transform = 'translateX(' + (carouselItemCount * PICSIZE) * (-1) + 'px)';
            index = carouselItemCount;
        },500);
    }
}
/**
* 切换轮播控制按钮
*
* @param {number} tabIndex 轮播图位置
*/
function switchCarouselControl(tabIndex) {
    var carouselControls = $$(".carousel-control");
    var carouselItemCount= $$(".carousel-item").length - 2;
    if (tabIndex < 1) {
        tabIndex = carouselItemCount;
    }
    if (tabIndex > carouselItemCount) {
        tabIndex = 1;
    }
    for (var i = 0; i < carouselControls.length; i++) {
        if (i === tabIndex - 1) {
            addClass(carouselControls[i],"carousel-selected");
        }else {
            removeClass(carouselControls[i],"carousel-selected");
        }
    }
}
/**
* 点击轮播控制按钮
*
*/
function clickCarouselControl(event) {
    var controls = $$(".carousel-control");
    var controlContainer = $(".carousel-controls");
    var targetControl = event.target;
    for (var i = 0; i < controls.length; i++) {
        if (controls[i] === targetControl) {
            index = i + 1;
        }
    }
    move();
    switchCarouselControl(index);
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
    var prevCarousel = $(".prev");
    var nextCarousel = $(".next");
    var carouselControlContainer = $(".carousel-controls");
    var carouselContainer = $(".carousel");
    countrySelect.addEventListener("change",changeCountry,false);
    tableTabs.addEventListener("click",refreshTable,false);
    prevCarousel.addEventListener("click",prev,false);
    nextCarousel.addEventListener("click",next,false);
    carouselControlContainer.addEventListener("click",clickCarouselControl,false);
    carouselContainer.addEventListener("mouseout",startCarousel,false);
    carouselContainer.addEventListener("mouseover",pauseCarousel,false);
    //模拟点击
    $("[data-for=table1]").click();
    //启动轮播图
    prepareCarousel();
}

init();
