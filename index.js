/*
 * @Author: yangchenguang
 * @Description:
 * @Date: 2023-09-28 16:52:20
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-02-18 17:08:58
 */

const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

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

// 处理根路径的 GET 请求
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: `我是李坤夏今年${Math.floor(Math.random() * 100)}岁`,
  });
});

// 处理根路径的 post 请求
app.post(
  "/getUser",
  [
    body("username").not().isEmpty().withMessage("用户名不能为空"),
    body("password").isLength({ min: 6 }).withMessage("密码长度不能少于6位"),
  ],
  (req, res) => {
    console.log(req.body, "req.body");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({
      //   success: false,
      //   errors: errors.array()[0].msg,
      // });
      res.send({
        success: false,
        errorMessage: errors.array()[0].msg,
      });
      return;
    }
    setTimeout(() => {
      res.send({
        success: true,
        ...req.body,
      });
    }, 1000);
  }
);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
