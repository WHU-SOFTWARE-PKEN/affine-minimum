import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '~/server/database/schema';
import {user} from '~/server/database/schema';
import postgres from 'postgres';
import { consola } from 'consola'
import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm';


const queryClient = postgres("postgresql://notebookdb_owner:yIGFKdq1W5Ru@ep-polished-haze-a1oetz16.ap-southeast-1.aws.neon.tech/notebookdb?sslmode=require");
export const db = drizzle(queryClient, {schema: schema });

//插入用户
//无返回值
export async function InsertUser(name:string,password:string) {
    await db.insert(user).values({ name: name,password:password });
} 

//搜索指定用户，验证密码
//返回bool:是否有该用户
export async function CheckUsernameAndPassword(name:string,password:string) {
    const Users = await db.select().from(user).where(eq(user.name,name))
    const target = (Users[0].password==password)
    return target
}