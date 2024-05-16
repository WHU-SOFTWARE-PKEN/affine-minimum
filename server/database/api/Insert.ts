import { db } from "~/server/database/queryClient"
import { users } from '~/server/database/schema';

//插入用户
//无返回值
export async function InsertUser(name:string,password:string) {
    await db.insert(users).values({ name: name,password:password });
} 