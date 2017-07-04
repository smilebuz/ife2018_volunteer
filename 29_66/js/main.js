/**
 * @file 任务29-32的js脚本
 * @author victorxpz
 *
 */
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
 * 模拟加载左侧导航栏数据
 *
 */
function loadNavData() {
    var menus = navs.menu;
    var curListItems = $$("#main-menu > li");
    refreshTableNavList(menus);
}
/**
 * 刷新左侧导航栏
 *
 * @param {Array} menus 菜单数组
 */
function refreshTableNavList(menus) {
    var tableNavList = $("#main-menu");
    var curListItems = $$("#main-menu > li");
    //清空原有导航栏菜单
    if (curListItems.length) {
        for (let i = 0; i < curListItems.length; i++) {
            if (curListItems[i].nodeType === 1) {
                tableNavList.removeChild(curListItems[i]);
            }
        }
    }
    //加载新菜单
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        let mainMenu = menu.main;
        let item = document.createElement("li");
        let itemText = document.createTextNode(mainMenu);
        item.appendChild(itemText);
        item.setAttribute("data-menu-index",i);
        item.setAttribute("data-submenu-show","false");
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
    var navList = $("#main-menu");
    var curListItems = $$("#main-menu > li");
    //先将navList高度设置为auto获取能够显示全部信息的默认高度
    calcNavDefaultHeight();
    //设置navList高度
    var windowHeight = window.innerHeight;
    var listHeight = windowHeight - navList.getBoundingClientRect().top;
    navList.style.height = listHeight + "px";
}
/**
 * 获取左侧导航栏默认高度
 *
 */
function calcNavDefaultHeight() {
    var navList = $("#main-menu");
    var curListItems = $$("#main-menu > li");
    navList.style.height = "auto";
    navDefaultHeight = window.getComputedStyle(navList).height;
    navList.removeAttribute("style");
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
        var scrollDistance = document.body.scrollTop;
        if (scrollDistance >= 360) {
            //表格样式
            thead.style.position = "fixed";
            thead.style.top = 0;
            for (let i = 0; i < cols.length; i++) {
                let width = window.getComputedStyle(cols[i]).width;
                headCols[i].style.width = width;
            }
        }
        else {
            $(".table").removeAttribute("style");
            thead.removeAttribute("style");
            for (let i = 0; i < headCols.length; i++) {
                headCols[i].removeAttribute("style");
            }
            tableNav.removeAttribute("style");
        }
        calcNavHeight();
        isScroll = true;
    }
}
/**
 * 计算左侧导航栏高度
 *
 */
function calcNavHeight() {
    var navList = $("#main-menu");
    var windowHeight = window.innerHeight;
    var listHeight = windowHeight - navList.getBoundingClientRect().top;
    if (listHeight > parseInt(navDefaultHeight)) {
        listHeight = parseInt(navDefaultHeight);
    }
    navList.style.height = listHeight + "px";
}
/**
 * 显示左侧导航栏滚动条
 *
 */
function showNavScrollBar() {
    var navList = $("#main-menu");
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
    var navList = $("#main-menu");
    navList.removeAttribute("style");
}
/**
 * 点击左侧导航栏一级菜单 显示/隐藏左侧导航栏菜单
 *
 */
function toggleSubMenu(event) {
    let menuIndex = parseInt(event.target.getAttribute("data-menu-index"));
    let subMenuStatus = event.target.getAttribute("data-submenu-show");
    //当前已经显示二级菜单
    if (subMenuStatus==="true") {
        let subMenu = event.target.querySelector("ul");
        event.target.removeChild(subMenu);
        event.target.setAttribute("data-submenu-show","false");
    }
    //当前没有显示二级菜单
    else {
        let subMenus = navs.menu[menuIndex].sub;
        let subList = document.createElement("ul");
        addClass(subList,"sub-menu");
        for (let i = 0; i < subMenus.length; i++) {
            let item = document.createElement("li");
            let text = document.createTextNode(subMenus[i]);
            item.appendChild(text);
            subList.appendChild(item);
        }
        event.target.appendChild(subList);
        event.target.setAttribute("data-submenu-show","true");
    }
    //改变高度
    calcNavDefaultHeight();
    calcNavHeight();
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
 * 页面加载时需要进行的初始化操作
 *
 */
function init() {
    var tableNav = $("#left-nav");
    var navList = $("#main-menu");
    document.addEventListener("scroll",scrollPage,false);
    tableNav.addEventListener("mouseenter",showNavScrollBar,false);
    tableNav.addEventListener("mouseleave",hideNavScrollBar,false);
    navList.addEventListener("click",toggleSubMenu,false);
    loadNavData();
    refreshTable();
    initTableNav();
    //calcNavHeight();
}

init();
