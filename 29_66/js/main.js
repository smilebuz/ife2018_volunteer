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
 * 模拟加载数据
 *
 */
function loadMockData() {
    var menus = navs.menu;
    var tableContents = tableContent.data;
    refreshTableNavList(menus);
    refreshTableContent(tableContents);
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
 * @param {Array} tableContents 菜单数组
 */
function refreshTableContent(tableContents) {
    var tbody = $(".table tbody");
    var curRows = $$(".table tbody tr");
    if (curRows.length) {
        for (let i = 0; i < curRows.length; i++) {
            if (curRows[i].nodeType === 1) {
                tbody.removeChild(curRows[i]);
            }
        }
    }
    for (let i = 0; i < tableContents.length; i++) {
        let row = document.createElement("tr");
        let id = tableContents[i].id;
        row.setAttribute("data-tr-id",id);
        let tdName = document.createElement("td");
        let tdContent = document.createElement("td");
        let tdValue = document.createElement("td");
        let name = document.createTextNode(tableContents[i].name);
        let content = document.createTextNode(tableContents[i].content);
        let value = document.createTextNode(tableContents[i].value);
        tdName.appendChild(name);
        tdContent.appendChild(content);
        tdValue.appendChild(value);
        let tdBtn = document.createElement("td");
        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("编辑"));
        delBtn.appendChild(document.createTextNode("删除"));
        editBtn.setAttribute("data-button-type","edit");
        delBtn.setAttribute("data-button-type","delete");
        tdBtn.appendChild(editBtn);
        tdBtn.appendChild(delBtn);
        row.appendChild(tdName);
        row.appendChild(tdContent);
        row.appendChild(tdValue);
        row.appendChild(tdBtn);
        tbody.append(row);
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
/**
 * 点击表格内按钮
 *
 */
function clickTableBtn(event) {
    var rowID = event.target.parentElement.parentElement.getAttribute("data-tr-id");
    var buttonType = event.target.getAttribute("data-button-type");
    switch (buttonType) {
        case "edit":
            showEditModal(rowID);
            break;
        case "delete":
            showDeleteModal(rowID);
            break;
        default:
            break;
    }
}
/**
 * 显示编辑弹窗
 *
 * @param {string} rowID 行ID
 */
function showEditModal(rowID) {
    //停止滚动事件
    document.body.style.overflowY = "hidden";
    var name = event.target.parentElement.parentElement.firstElementChild.textContent;
    var content = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
    var value = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    var modalHeight = parseInt(window.getComputedStyle($("#edit-modal")).height);
    var modalWidth = parseInt(window.getComputedStyle($("#edit-modal")).width);
    var docHeight = document.body.offsetHeight;
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var modalLeft = (windowWidth - modalWidth)/2;
    var modalTop = (windowHeight - modalHeight)/2;
    var confirmEdit = $("#confirm-edit");
    var cancelEdit = $("#cancel-edit");
    //设置弹窗覆盖层
    $(".modal-cover").style.display = "block";
    $(".modal-cover").style.height = docHeight + "px";
    //设置弹窗居中
    $("#edit-modal").style.display = "block";
    $("#edit-modal").style.top = modalTop + "px";
    $("#edit-modal").style.left = modalLeft + "px";
    //设置弹窗输入框内容
    $("#input-name").value = name;
    $("#input-content").value = content;
    $("#input-value").value = value;
    //按钮事件
    confirmEdit.addEventListener("click",_completeOp(rowID,"edit"),false);
    cancelEdit.addEventListener("click",_hideModal("edit"),false);
    //confirmEdit.removeEventListener("click",completeEdit,false);
    //cancelEdit.removeEventListener("click",hideModal,false);
}
/**
 * 显示删除弹窗
 *
 * @param {string} rowID 行ID
 */
function showDeleteModal(rowID) {
    document.body.style.overflowY = "hidden";
    var name = event.target.parentElement.parentElement.firstElementChild.textContent;
    var modalHeight = parseInt(window.getComputedStyle($("#delete-modal")).height);
    var modalWidth = parseInt(window.getComputedStyle($("#delete-modal")).width);
    var docHeight = document.body.offsetHeight;
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var modalLeft = (windowWidth - modalWidth)/2;
    var modalTop = (windowHeight - modalHeight)/2;
    var confirmDelete = $("#confirm-delete");
    var cancelDelete = $("#cancel-delete");
    //设置弹窗覆盖层
    $(".modal-cover").style.display = "block";
    $(".modal-cover").style.height = docHeight + "px";
    //设置弹窗居中
    $("#delete-modal").style.display = "block";
    $("#delete-modal").style.top = modalTop + "px";
    $("#delete-modal").style.left = modalLeft + "px";
    //设置弹窗输入框内容
    $("#del-row-id").textContent = name + "吗?";
    //按钮事件
    confirmDelete.addEventListener("click",_completeOp(rowID,"delete"),false);
    cancelDelete.addEventListener("click",_hideModal("delete"),false);
}
/**
 * 确定修改
 *
 */
function _completeOp(rowID,modalType) {
    return function () {
        completeOp(rowID,modalType);
    }
}
function completeOp(rowID,modalType) {
    var modalCover = $(".modal-cover");
    var tableContents = tableContent.data;
    switch (modalType) {
        case "edit":
            var name = $("#input-name").value;
            var content = $("#input-content").value;
            var value = $("#input-value").value;
            for (let i = 0; i < tableContents.length; i++) {
                if (tableContents[i].id === parseInt(rowID)) {
                    tableContents[i].name = name;
                    tableContents[i].content = content;
                    tableContents[i].value = value;
                }
            }
            break;
        case "delete":
            for (let i = 0; i < tableContents.length; i++) {
                if (tableContents[i].id === parseInt(rowID)) {
                    tableContent.data.splice(i, 1);
                }
            }
            break;
        default:
            break;
    }
    hideModal(modalType);
    refreshTableContent(tableContents);
}
/**
 * 隐藏弹窗
 *
 * @param {string} modalType 弹窗类型
 */
function _hideModal(modalType) {
    return function () {
        hideModal(modalType);
    }
}
function hideModal(modalType) {
    var modalCover = $(".modal-cover");
    switch (modalType) {
        case "edit":
            modalCover.removeAttribute("style");
            $("#edit-modal").removeAttribute("style");
            break;
        case "delete":
            modalCover.removeAttribute("style");
            $("#delete-modal").removeAttribute("style");
            break;
        default:
            break;
    }
    //恢复滚动
    document.body.removeAttribute("style");
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
    var table = $(".table");
    document.addEventListener("scroll",scrollPage,false);
    tableNav.addEventListener("mouseenter",showNavScrollBar,false);
    tableNav.addEventListener("mouseleave",hideNavScrollBar,false);
    navList.addEventListener("click",toggleSubMenu,false);
    table.addEventListener("click",clickTableBtn,false);
    loadMockData();
    initTableNav();
    //calcNavHeight();
}

init();
