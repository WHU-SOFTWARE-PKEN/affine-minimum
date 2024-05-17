import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  createdAt: timestamp("created_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  workspace: many(workspace),
}));

export const workspace = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workspaceRelations = relations(workspace, ({ one }) => ({
  author: one(users, {
    fields: [workspace.userId],
    references: [users.id],
  }),
}));