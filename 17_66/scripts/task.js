/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var expWhiteSpace = /\s/g;
  var expInt = /^[1-9][0-9]*/g;
  var expChar = /[\4e00-\9ea5]/g;
  var city = document.querySelector("#aqi-city-input").value;
  var value = document.querySelector("#aqi-value-input").value;
  aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqiTable = document.querySelector("#aqi-table");
  var trs = aqiTable.querySelectorAll("tr");
  //清除原有数据
  for (let i = 0; i < trs.length; i++) {
      if (i>0) {
          aqiTable.removeChild(trs[i]);
      }
  }
  for (var city in aqiData) {
      if (aqiData.hasOwnProperty(city)) {
        var row = document.createElement("tr");
        var tdCity = document.createElement("td");
        var cityText = document.createTextNode(city);
        tdCity.appendChild(cityText);
        var tdAqi = document.createElement("td");
        var aqiText = document.createTextNode(aqiData[city]);
        tdAqi.appendChild(aqiText);
        var tdDel = document.createElement("td");
        var delBtn = document.createElement("button");
        var delText = document.createTextNode("删除");
        delBtn.appendChild(delText);
        tdDel.appendChild(delBtn);
        row.appendChild(tdCity);
        row.appendChild(tdAqi);
        row.appendChild(tdDel);
        aqiTable.appendChild(row);
      }
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.querySelector("#add-btn");
  addBtn.addEventListener("click",addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.querySelector("#aqi-table");
  aqiTable.addEventListener("click",function(event){
      if(event.target.nodeName==="BUTTON"){
          //重aqiData中删除该记录 然后刷新列表
          var city = event.target.parentElement.parentElement.firstChild.firstChild.nodeValue;
          delete aqiData[city];
          renderAqiList();
      }
  },false);
}
init();
