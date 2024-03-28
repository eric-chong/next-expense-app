import { z } from 'zod';

export const expenseItemSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  amount: z.coerce.number().nonnegative(),
  description: z.nullable(z.string().max(100).optional()),
  budgetItemId: z.string().cuid(),
  userId: z.string().cuid(),
});

export const newExpenseItemSchema = expenseItemSchema.omit({
  id: true,
  userId: true,
});
