import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '~/server/database/schema';
import {user} from '~/server/database/schema';
import postgres from 'postgres';
import { consola } from 'consola'
import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm';


const queryClient = postgres("postgresql://notebookdb_owner:yIGFKdq1W5Ru@ep-polished-haze-a1oetz16.ap-southeast-1.aws.neon.tech/notebookdb?sslmode=require");
export const db = drizzle(queryClient, {schema: schema });

await db.insert(user).values({ name: 'admin',password:'password' });

const Users = await db.select().from(user).where(eq(user.name,"admin1"))
const target = (Users[0].password=="password1")

consola.success(target)

