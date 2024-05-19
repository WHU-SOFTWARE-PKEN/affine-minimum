import { db } from "~/server/database/queryClient"
import { users } from '~/server/database/schema';


//搜索指定用户，验证密码
//返回bool:是否有该用户
export default defineEventHandler(async (context) => {
    // 获取查询参数
    const query = getQuery(context);
    console.log(query+"query");
    const {Name,Password} = query;
    const name:string = Name.toString();
    const password:string = Password.toString()
    console.log(name+'name')
    console.log(password+"password");
    // 对数据库执行查询操作
    const Users = await db.select().from(users).where(eq(users.name,name))
    console.log(Users[0])
    const target = (Users)&&(Users[0].password==password)
    console.log(target+'target')
    return target
  });
