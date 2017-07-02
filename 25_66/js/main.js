/**
 * @file 任务25-28的js脚本
 * @author victorxpz
 *
 */
//模拟数据
const NAVLISTITEMS = [
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text",
    "Level 1 Some Text"
];
const TABLECONTENTS = [
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"],
    ["Content Text", "Content Text Text", "123.432"]
];
//
var isScroll = true;
var navDefaultHeight; //{string}
/**
 * 自定义选择器函数
 *
 * @param {string} selector 选择器字符串
 */
var $ = function(selector) {
    return document.querySelector(selector);
}
var $$ = function(selector) {
    return document.querySelectorAll(selector);
}
/**
 * 刷新左侧导航栏
 *
 */
function refreshTableNavList() {
    var tableNavList = $("#left-nav ul");
    var curListItems = $$("#left-nav ul li");
    if (curListItems.length) {
        for (let i = 0; i < curListItems.length; i++) {
            if (curListItems[i].nodeType === 1) {
                tableNavList.removeChild(curListItems[i]);
            }
        }
    }
    for (let i = 0; i < NAVLISTITEMS.length; i++) {
        let item = document.createElement("li");
        let itemText = document.createTextNode(NAVLISTITEMS[i]);
        item.appendChild(itemText);
        tableNavList.appendChild(item);
    }
}
/**
 * 刷新表格
 *
 */
function refreshTable() {
    var tbody = $(".table tbody");
    var curRows = $$(".table tbody tr");
    if (curRows.length) {
        for (let i = 0; i < curRows.length; i++) {
            if (curRows[i].nodeType === 1) {
                tbody.removeChild(curRows[i]);
            }
        }
    }
    for (let i = 0; i < TABLECONTENTS.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < TABLECONTENTS[i].length; j++) {
            let col = document.createElement("td");
            let text = document.createTextNode(TABLECONTENTS[i][j]);
            col.appendChild(text);
            row.appendChild(col);
        }
        let col = document.createElement("td");
        for (var k = 0; k < 3; k++) {
            let btn = document.createElement("button");
            let text = document.createTextNode("BTN");
            btn.appendChild(text);
            col.appendChild(btn);
            row.appendChild(col);
        }
        tbody.appendChild(row);
    }
}
/**
 * 初始化左侧导航栏高度
 *
 */
function initTableNav() {
    var navList = $("#left-nav ul");
    //先将navList高度设置为auto获取能够显示全部信息的默认高度
    navList.style.height = "auto";
    navDefaultHeight = window.getComputedStyle(navList).height;
    navList.removeAttribute("style");
    //设置navList高度
    var windowHeight = window.innerHeight;
    var listHeight = windowHeight - navList.getBoundingClientRect().top;
    navList.style.height = listHeight + "px";
}
/**
 * 滚动页面
 *
 */
function scrollPage() {
    if (isScroll) {
        setTimeout(scrollPage,100);
        isScroll = false;
    }
    else {
        var thead = $(".table thead");
        var rows = $$(".table tbody tr");
        var cols = rows[0].querySelectorAll("td");
        var headCols = $$("thead tr th");
        var tableNav = $("#left-nav");
        var navList = $("#left-nav ul");
        var scrollDistance = document.body.scrollTop;
        if (scrollDistance >= 360) {
            //表格样式
            thead.style.position = "fixed";
            thead.style.top = 0;
            $(".table").style.marginLeft = "220px";
            for (let i = 0; i < cols.length; i++) {
                let width = window.getComputedStyle(cols[i]).width;
                headCols[i].style.width = width;
            }
            //左侧导航栏样式
            tableNav.style.position = "fixed";
            tableNav.style.top = 0;
        }
        else {
            $(".table").removeAttribute("style");
            thead.removeAttribute("style");
            for (let i = 0; i < headCols.length; i++) {
                headCols[i].removeAttribute("style");
            }
            tableNav.removeAttribute("style");
        }
        //左侧导航栏高度
        var windowHeight = window.innerHeight;
        var listHeight = windowHeight - navList.getBoundingClientRect().top;
        if (listHeight > parseInt(navDefaultHeight)) {
            listHeight = parseInt(navDefaultHeight);
        }
        navList.style.height = listHeight + "px";
        isScroll = true;
    }
}
/**
 * 显示左侧导航栏滚动条
 *
 */
function showNavScrollBar() {
    var navList = $("#left-nav ul");
    var windowHeight = window.innerHeight;
    var listHeight = windowHeight - navList.getBoundingClientRect().top;
    if (listHeight < parseInt(navDefaultHeight)) {
        navList.style.overflow = "scroll";
    }
}
/**
 * 隐藏左侧导航栏滚动条
 *
 */
function hideNavScrollBar() {
    var navList = $("#left-nav ul");
    navList.removeAttribute("style");
}
/**
 * 页面加载时需要进行的初始化操作
 *
 */
function init() {
    var tableNav = $("#left-nav");
    refreshTableNavList();
    refreshTable();
    initTableNav();
    document.addEventListener("scroll",scrollPage,false);
    tableNav.addEventListener("mouseenter",showNavScrollBar,false);
    tableNav.addEventListener("mouseleave",hideNavScrollBar,false);
}

init();
