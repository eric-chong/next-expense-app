import { z } from 'zod';

export const budgetItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
  description: z.string().max(100).optional(),
  amount: z.coerce.number().nonnegative(),
  budgetId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const newBudgetItemSchema = budgetItemSchema.omit({
  id: true,
  userId: true,
});
