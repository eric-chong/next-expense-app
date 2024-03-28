import { z } from 'zod';

export const budgetSchema = z.object({
  id: z.string().cuid(),
  startDate: z.date(),
  endDate: z.date().optional(),
  userId: z.string().cuid(),
});

export const newBudgetSchema = budgetSchema.omit({
  id: true,
  userId: true,
});

export const budgetItemSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(20),
  description: z.string().max(100).optional(),
  amount: z.coerce.number().nonnegative(),
  budgetId: z.string().cuid(),
  userId: z.string().cuid(),
});

export const newBudgetItemSchema = budgetItemSchema.omit({
  id: true,
  userId: true,
});
