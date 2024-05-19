import { Param } from "drizzle-orm";
import { db } from "~/server/database/queryClient"
import { users } from '~/server/database/schema';


  //搜索指定用户名用户
//返回Users数组
export default defineEventHandler(async (context) => {
    // 获取查询参数
    const query = getQuery(context);
    console.log(query);
    const {Name} = query;
    const name = Name.toString();
    console.log(name)
    // 对数据库执行查询操作
    const Users = await db.select().from(users).where(eq(users.name,name))
  
    // 返回查询到的用户信息
    return Users;
  });


