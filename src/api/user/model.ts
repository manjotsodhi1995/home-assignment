import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Commit = z.infer<typeof CommitSchema>;
export const CommitSchema = z.object({
  id: z.number(),
  repository_id: z.number(),
  message: z.string(),
  author: z.string(),
  date: z.date(),
  url: z.string(),
});

export type Repository = z.infer<typeof RepositorySchema>;
export const RepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string(),
  language: z.string(),
  forks_count: z.number(),
  stars_count: z.number(),
  open_issues_count: z.number(),
  watchers_count: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});


