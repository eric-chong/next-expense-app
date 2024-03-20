import { z } from 'zod';

export const expenseItemSchema = z.object({
  id: z.string().uuid(),
  date: z.date(),
  amount: z.coerce.number().nonnegative(),
  description: z.nullable(z.string().max(100).optional()),
  budgetItemId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const newExpenseItemSchema = expenseItemSchema.omit({
  id: true,
  userId: true,
});
