import { consola } from 'consola'
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres("postgresql://notebookdb_owner:yIGFKdq1W5Ru@ep-polished-haze-a1oetz16.ap-southeast-1.aws.neon.tech/notebookdb?sslmode=require", { max: 1 });



export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return
  onHubReady(async () => {
    await migrate(drizzle(migrationClient), { migrationsFolder: 'server/database/migrations' })
      .then(() => {
        consola.success('Database migrations done')
      })
      .catch((err) => {
        consola.error('Database migrations failed', err)
      })
  })
})

