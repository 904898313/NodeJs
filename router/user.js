/*
 * @Author: yangchenguang
 * @Description: 用户
 * @Date: 2023-09-28 16:52:20
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-03-01 10:26:37
 */

import express from "express";
import { body, validationResult } from "express-validator";

const userRouter = express.Router();

// 获取用户信息
userRouter.get("/getUserInfo", (req, res) => {
  res.send({
    success: true,
    data: `我是李坤夏今年${Math.floor(Math.random() * 100)}岁`,
  });
});

// 处理根路径的 post 请求
userRouter.post(
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

export default userRouter;
