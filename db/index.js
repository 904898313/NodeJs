/*
 * @Author: yangchenguang
 * @Description: 连接数据库
 * @Date: 2024-03-01 10:15:18
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-03-01 10:47:29
 */

import jsyaml from "js-yaml"; // 配置文件
import mysql2 from "mysql2/promise"; // mysql
import fs from "node:fs"; // 文件

const yaml = fs.readFileSync("./db.config.yaml", "utf8"); // 读取配置文件
const dbConfig = jsyaml.load(yaml); // 解析配置文件
// 根据配置文件创建数据库连接
const sql = await mysql2.createConnection({
  ...dbConfig.db,
});

export default sql;
