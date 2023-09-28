const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 服务器及端口
const app = express();
const port = 3001;

// 中间件
// 允许所有跨域请求
app.use(cors());
// 使用 body-parser 中间件解析请求体数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "10mb" }));
// 自定义中间件
app.use((req, res, next) => {
  console.log("请求方法:", req.method);
  console.log("请求路径:", req.path);
  console.log("请求参数:", req.query);
  console.log("请求体:", req.body);
  console.log("请求头:", req.headers);
  // 可以根据需要输出其他请求信息

  next(); // 调用 next() 继续处理请求
});

// 处理根路径的 GET 请求
app.get("/", (req, res) => {
  res.send(`我是李坤夏今年${Math.floor(Math.random() * 100)}岁`);
});

// 处理根路径的 post 请求
app.post("/getUser", (req, res) => {
  res.send({
    name: `我是李坤夏今年${Math.floor(Math.random() * 100)}岁`,
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
