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
  folderId: integer("folder_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  author: one(users, {
    fields: [workspace.userId],
    references: [users.id],
  }),
  folders: one(folders,{
    fields: [workspace.folderId],
    references:[folders.id],
  }),
  notes: many(notes),
}));

// folders tables
export const folders = pgTable("folders", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const foldersRelations = relations(folders, ({ many }) => ({
  workspace: many(workspace),
}));

// notes tables
export const notes = pgTable("notes", {
  id:serial("id").primaryKey(),
  workspaceId: integer("workspace_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const notesRelations = relations(notes,({ one }) =>({
  workspace: one(workspace,{
    fields:[notes.workspaceId],
    references:[workspace.id],
  })
}))