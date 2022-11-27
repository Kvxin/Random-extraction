 // let that;
 let timer = null;
 let speed = 100; //抽人速度
 let tabNav = document.querySelector(".tab_nav");
 let tabBox = document.querySelector(".tab_box");
 const timeSpan = document
   .querySelector(".times")
   .querySelectorAll("span");
 let btns;
 const localhost = document.querySelector(".localhost");
 let stuData, classNameData;

 //历史记录区域
 localhost.querySelector(".l_tit").onclick = function () {
   let ul = localhost.querySelector("ul");
   if (ul.style.height === "" || ul.style.height === "750px") {
     ul.style.height = 0 + "px";
   } else {
     ul.style.height = 750 + "px";
   }
 };
 //tab按钮区域
 function updateNode() {
   tabNav = document.querySelector(".tab_nav");
   tabBox = document.querySelector(".tab_box");
   for (let i = 0; i < tabNav.children.length; i++) {
     tabNav.children[i].onclick = function () {
       //清除定时器
       clearInterval(timer);

       for (let i = 0; i < tabBox.children.length; i++) {
         tabBox.children[i].classList = "item";
         tabNav.children[i].classList = "";
       }
       localhost.querySelector(
         ".l_tit"
       ).textContent = `历史记录(${tabNav.children[i].textContent})`;
       // getLocalHosts(i);
       tabNav.children[i].classList.add("active");
       getLocalHosts(i);
       // getTabNavindex(i);
       tabBox.children[i].classList = "item show";
       UpdatdaButtons();
     };
   }
 }

 //tab区域
 window.onload = function () {
   setInterval(date, 100);
   init();

   setTimeout(UpdatdaButtons, 300);
   setTimeout(() => {
     localhost.querySelector(
       ".l_tit"
     ).textContent = `历史记录(${tabNav.children[0].textContent})`;
   }, 300);
   setTimeout(function () {
     tabNav.children[0].click();
   }, 300);
 };
 //异步获取第一组button
 function UpdatdaButtons() {
   btns = tabBox.querySelector(".show").querySelector(".buttons").children;
   btns[0].onclick = function () {
     let e = [
       ...document
         .querySelector(".show")
         .querySelector(".numbers")
         .querySelector("ul").children,
     ];
     start(e);
   };
   btns[1].onclick = function () {
     stop();
   };
 }
 //开始随机抽人
 function start(e) {
   clearInterval(timer);
   timer = setInterval(() => {
     let r = Math.floor(Math.random() * e.length);
     for (let i = 0; i < e.length; i++) {
       e[i].classList.remove("w");
       for (let j = 0; j < e.length; j++) {
         e[r].classList.add("w");
       }
     }
   }, speed);
 }
 function stop() {
   // console.log(timer);
   // timer = null;
   clearInterval(timer);
   pushMsg();
 }
 //layui弹出窗口组件
 function pushMsg() {
   let a = document
     .querySelector(".show")
     .querySelector(".numbers")
     .querySelector("ul")
     .querySelector(".w");
   let el = document.querySelector(".active");
   
   let index;
   for (let i = 0; i < tabNav.children.length; i++) {
     console.log(tabNav.children[i]);
     if (tabNav.children[i].className == "active") {
       index = i;
       break;
     }
   }
   layer.open({
     title: "恭喜恭喜",
     content: `<div style="text-align: center;">恭喜  <span style="color:red;">${a.textContent}</span>  同学，下次演讲，就决定是你了<br>点击确定将<span style="color:red;">${a.textContent}</span>同学移入历史记录</div>`,
     btn: ["关闭", "确定"],
     btn2: function () {
       getLocalHosts(index);
       // console.log(index);
       a.remove();
       returnData(a.textContent, el);
     },
   });
 }
 function getLocalHosts(id) {
   axios({
     method: "GET",
     url: `http://127.0.0.1/api/vhost/${id}`,
     responseType: "json",
   }).then((r) => {
     // console.log(r.data.data);
     setLocalHostNode(r.data.data);
   });
 }
 function setLocalHostNode(d) {
   let el = document.querySelector(".localhost").querySelector("ul");
   el.innerHTML = "";
   // let li = `<li><div class="l_color"></div><div class="l_data"><div class="l_times"><span>????年??月??日</span><span>星期?</span><span>??:??:??</span></div><div class="l_names"><span>name</span></div></div></li>`;
   d.forEach((element) => {
     let li = document.createElement("li");
     let color = document.createElement("div");
     let l_data = document.createElement("div");
     let l_times = document.createElement("div");
     let l_names = document.createElement("div");
     let time = element.time.split(" ");
     color.className = "l_color";
     color.style.backgroundColor = `rgb(${element.rgb})`;
     l_data.className = "l_data";
     l_times.className = "l_times";
     l_times.innerHTML = `<span>${time[0]}</span><span>${time[1]}</span><span>${time[2]}</span>`;
     l_names.className = "l_names";
     l_names.innerHTML = `<span>${element.stuName}`;
     l_data.insertAdjacentElement("beforeend", l_times);
     l_data.insertAdjacentElement("beforeend", l_names);
     li.insertAdjacentElement("beforeend", color);
     li.insertAdjacentElement("beforeend", l_data);
     el.insertAdjacentElement("beforeend", li);
     // console.log(li);
     // console.log(l_names);
   });
 }
 function returnData(a, e) {
   let r, g, b;
   r = setRandomColor();
   g = setRandomColor();
   b = setRandomColor();
   axios({
     method: "POST",
     url: `http://127.0.0.1/api/vpost?stuName=${a}&rgb=${r},${g},${b}&classname=${e.textContent}`,
     responseType: "json",
   }).then((r) => {
     console.log(r);
     // init();
     console.log("重新进行初始化");
   });
 }
 function setRandomColor() {
   return Math.floor(Math.random() * 255);
 }
 function date() {
   let mDate = new Date();
   let days = mDate.getDay();
   let week;
   let yy, mm, dd, h, m, s; //年月日时分秒
   yy = mDate.getFullYear();
   mm = mDate.getMonth() + 1;
   dd = mDate.getDate();
   h = mDate.getHours();
   m = mDate.getMinutes();
   s = mDate.getSeconds();
   switch (days) {
     case 1:
       week = "星期一";
       break;
     case 2:
       week = "星期二";
       break;
     case 3:
       week = "星期三";
       break;
     case 4:
       week = "星期四";
       break;
     case 5:
       week = "星期五";
       break;
     case 6:
       week = "星期六";
       break;
     case 0:
       week = "星期日";
       break;
   }
   timeSpan[0].textContent = `当前时间:${yy}-${mm}-${dd}`;
   timeSpan[1].textContent = week;
   timeSpan[2].textContent = `${h}:${m}:${s}`;
   h = mDate.getHours();
   m = mDate.getMinutes();
   s = mDate.getSeconds();
   if (m <= 9) {
     m = "0" + m;
   }
   if (s <= 9) {
     s = "0" + s;
   }
   timeSpan[2].textContent = `${h}:${m}:${s}`;
 }

 function init() {
   axios({
     method: "GET",
     url: "http://127.0.0.1/api/vget",
     responseType: "json",
   }).then((r) => {
     //添加班级名称
     r.data.forEach((element, value) => {
       addClassName(element);
     });
     tabBox.children[0].remove();
     tabBox.children[0].classList.add("show");
     tabNav.children[0].remove();
     tabNav.children[0].classList.add("active");
     updateNode();
   });
 }
 function removeNode() {}
 function addClassName(e) {
   //添加班级名称
   let o = e.className;
   let dom = document.createElement("li");
   dom.textContent = o;
   tabNav.insertAdjacentElement("beforeEnd", dom);
   //添加班级人员组别节点
   addStuNode(e);
 }

 function addStuNode(e) {
   let buttons =
     '<div class="buttons"><button>开抽</button><button>停止</button></div>';
   let n = document.createElement("div");
   let o = document.createElement("div");
   let ul = document.createElement("ul");
   let v = e.classStuList;

   for (let i = 0; i < v.length; i++) {
     let li = document.createElement("li");
     li.textContent = v[i];
     ul.insertAdjacentElement("beforeend", li);
   }
   o.insertAdjacentElement("beforeend", ul);
   o.classList.add("numbers");
   n.classList.add("item");
   n.insertAdjacentElement("beforeend", o);
   n.innerHTML += buttons;
   tabBox.insertAdjacentElement("beforeend", n);
 }

 function addTabBox(e, v) {
   let a = v.classStuList;
   let n = tabBox
     .querySelector(".item")
     .querySelector(".numbers")
     .querySelector("ul");
   for (let i = 0; i < a.length; i++) {
     let li = document.createElement("li");
     li.textContent = a[i];
   }
 }