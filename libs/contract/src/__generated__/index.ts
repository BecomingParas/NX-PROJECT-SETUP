import { z } from 'zod';
import type { Prisma } from '.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TodoScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at','is_deleted','deleted_at','is_completed','completed_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  is_deleted: z.boolean(),
  deleted_at: z.coerce.date().nullable(),
  is_completed: z.boolean(),
  completed_at: z.coerce.date().nullable(),
})

export type Todo = z.infer<typeof TodoSchema>
