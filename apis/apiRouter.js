const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
// router.post("/vpost", (req, res) => {});
//网页加载的时候请求的接口
router.get("/vget", (req, res) => {
  console.log(changeColor("\t\t\n已打开网页\n", 92));
  try {
    const data = fs
      .readFileSync(path.join("./data/stu.json"), "utf-8")
      .toString();
    let config = JSON.parse(data);
    res.send(config);
  } catch (e) {
    console.log(e);
  }
});
//点击标签请求的接口
router.get("/vhost/:id", (req, res) => {
  let l = req.params.id;
  let data = fs
    .readFileSync(path.join("./data/local.json"), "utf-8")
    .toString();
  // fs.readFile(path.join("./data/local.json"), "utf-8",(e,data))
  let c = JSON.parse(data);
  res.send(c[l]);
});

//点击确定的接口
router.post("/vpost", (req, res) => {
  console.log(changeColor("\t\t抽人完毕,正在写入历史记录.\n", 93));
  let query = req.query;
  query.time = r();
  let data, config;
  data = fs.readFileSync(path.join("./data/local.json"), "utf-8").toString();
  config = JSON.parse(data);
  setStuList(query.classname, query.stuName);
  for (let i = 0; i < config.length; i++) {
    if (config[i].className === query.classname) {
      config[i].data.push(query);
    }
  }
  fs.writeFile(path.join("./data/local.json"), JSON.stringify(config), (e) => {
    if (e) {
      console.log(`写入失败${e.message}`);
    } else {
      console.log(changeColor("\t\t写入历史记录成功.\n", 94));
    }
  });
});
function setStuList(className, stuName) {
  let data = fs.readFileSync(path.join("./data/stu.json"), "utf-8").toString();
  let config = JSON.parse(data);
  // console.log(`班级姓名:${className},学生姓名:${stuName}`);
  config.forEach((element) => {
    if (element.className == className) {
      for (let i = 0; i < element.classStuList.length; i++) {
        if (element.classStuList[i] == stuName) {
          // console.log(element.classStuList[i]);
          element.classStuList.splice(i, 1);
          console.log(
            changeColor(`\t\t 已将${className}班级的${stuName}从列表中删除.`, 96)
          );
          // console.log(`已将${className}班级的${stuName}从列表中删除.`);
          break;
        }
      }
    }
  });
  fs.writeFile(path.join("./data/stu.json"), JSON.stringify(config), (e) => {
    if (e) {
      console.log(`写入失败${e.message}`);
    }
  });
}
function changeColor(input, color = 92) {
  return `\x1b[${color}m${input}\x1b[0m`;
}
function r() {
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
  h = mDate.getHours();
  m = mDate.getMinutes();
  s = mDate.getSeconds();
  if (m <= 9) {
    m = "0" + m;
  }
  if (s <= 9) {
    s = "0" + s;
  }
  let d = w(yy, mm, dd, week, h, m, s);
  return d;
}

function w(yy, mm, dd, week, h, m, s) {
  return `${yy}-${mm}-${dd} ${week} ${h}:${m}:${s}`;
}

module.exports = router;
