import { db } from "~/server/database/queryClient"
import { users } from '~/server/database/schema';

//搜索所有用户
//返回Users数组
export async function SelectAllUsers() {
    const Users = await db.select().from(users)
    return Users
}

//搜索指定用户名用户
//返回Users数组
export async function SelectTargetUsers(name:string) {
    const Users = await db.select().from(users).where(eq(users.name,name))
    return Users
}

//搜索指定用户，验证密码
//返回bool:是否有该用户
export async function CheckUsernameAndPassword(name:string,password:string) {
    const Users = await db.select().from(users).where(eq(users.name,name))
    const target = (Users)&&(Users[0].password==password)
    return target
}