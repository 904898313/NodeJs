/*
 * @Author: yangchenguang
 * @Description: 世界
 * @Date: 2023-09-28 16:52:20
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-03-05 17:12:24
 */

import express from "express";
import { body, validationResult } from "express-validator";
import sql from "../db/index.js";

const userRouter = express.Router();

// 获取城市信息
userRouter.get("/getCountry", async (req, res) => {
  const sqlQuery = [];
  const sqlParams = [];
  const { Name, Region } = req.query;
  if (Name) {
    sqlQuery.push("Name = ?");
    sqlParams.push(Name);
  }
  if (Region) {
    sqlQuery.push("Region = ?");
    sqlParams.push(Region);
  }

  let q = `SELECT * FROM country`;
  if (sqlQuery.length) {
    q += ` WHERE ${sqlQuery.join(" AND ")}`;
  }
  const [results, fields] = await sql.query(q, sqlParams);
  res.send({
    success: true,
    data: results,
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
