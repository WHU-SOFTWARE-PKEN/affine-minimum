import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '~/server/database/schema';
import {users} from '~/server/database/schema';
import postgres from 'postgres';
import { consola } from 'consola'
import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm';
// import express from 'express';

const queryClient = postgres("postgresql://notebookdb_owner:yIGFKdq1W5Ru@ep-polished-haze-a1oetz16.ap-southeast-1.aws.neon.tech/notebookdb?sslmode=require");
export const db = drizzle(queryClient, {schema: schema });

// const app = express();
// app.use(express.json()); // 用于解析 JSON 格式的请求体

// app.post('/user/register', async (req, res) => {
//     try {
//       // 从请求体中获取用户名和密码
//       const { username, password } = req.body;
//       // 验证用户名和密码是否提供
//       if (!username || !password) {
//         return res.status(400).json({ error: 'Username and password are required' });
//       }
//       // 使用 Drizzle ORM 执行插入操作
//       const result = await db.insert(user).values({ name:username, password:password }).returning('*').execute();
//       res.status(201).json(result);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   const port = 9999;
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
//插入用户
//无返回值
// export async function InsertUser(name:string,password:string) {
//     await db.insert(users).values({ name: name,password:password });
// } 

// //搜索指定用户，验证密码
// //返回bool:是否有该用户
// export async function CheckUsernameAndPassword(name:string,password:string) {
//     const Users = await db.select().from(users).where(eq(users.name,name))
//     const target = (Users[0].password==password)
//     return target
// }
