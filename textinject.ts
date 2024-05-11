import { drizzle } from 'drizzle-orm/postgres-js';
import { user } from './server/database/schema';
import postgres from 'postgres';


const queryClient = postgres("postgresql://notebookdb_owner:yIGFKdq1W5Ru@ep-polished-haze-a1oetz16.ap-southeast-1.aws.neon.tech/notebookdb?sslmode=require");
const db = drizzle(queryClient);

await db.insert(user).values({ name: 'admin',password:'password' });