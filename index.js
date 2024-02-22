/*
 * @Author: yangchenguang
 * @Description:
 * @Date: 2023-09-28 16:52:20
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-02-21 16:22:12
 */

const express = require("express");
const cors = require("cors");

// 服务器及端口
const app = express();
const port = 3001;

// 中间件
// 允许所有跨域请求
app.use(cors());
// 使用 body-parser 中间件解析请求体数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

//导入路由模块
const user = require("./router/user.js");
app.use(user);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
