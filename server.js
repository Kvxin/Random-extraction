const express = require("express");
const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const router = require("./apis/apiRouter");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.listen(80, () => {
  Successfully();
  // cp.exec("start http://127.0.0.1");
});

function Successfully() {
  cp.exec("cls");
  // setLocal();
  console.log(
    changeColor("\t\t服务器已在本地启动成功，三秒后打开网页....\n\n", 90)
  );
  console.log(changeColor("\t\t\thttp://127.0.0.1", 91));
  setTimeout(function () {
    // cp.exec("start http://127.0.0.1");
  }, 3000);
}
function changeColor(input, color = 92) {
  return `\x1b[${color}m${input}\x1b[0m`;
}

