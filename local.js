const fs = require("fs");
const path = require("path");

function setLocal() {
  let o = {};
  let arr = [];

  let config = JSON.parse(
    fs.readFileSync(path.join("./data/stu.json"), "utf-8").toString()
  );
  config.forEach((element) => {
    o = {};
    o.className = element.className;
    o.data = [];
    arr.push(o);
  });
  fs.writeFile(path.join("./data/local.json"), JSON.stringify(arr), (e) => {
    if (!e) {
      console.log(`\t\t写入成功`);
    } else {
      console.log(`写入文件失败:${e.message}`);
    }
  });
}
setLocal();
