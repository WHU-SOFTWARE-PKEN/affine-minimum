import { db } from "~/server/database/queryClient"
import { users } from '~/server/database/schema';



export default defineEventHandler(async (res) => {
  const { username, password } = await readBody(res)
  console.log(username)

  await db.insert(users).values({ name:username, password:password });
})



//插入用户
//无返回值
// export async function InsertUser(name:string,password:string) {
//   console.log("123")
//     await db.insert(users).values({ name: name,password:password });
// } 