'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { BudgetItem } from '@/app/types';

const budgetItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  budgetId: z.string().uuid(),
  userId: z.string().uuid(),
});

export async function updateBudgetItem(budgetItem: BudgetItem) {
  const parsedBudgetItem = budgetItemSchema.safeParse(budgetItem);

  if (!parsedBudgetItem.success) {
    return {
      errors: parsedBudgetItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update budget item.',
    };
  }

  const { id, name, amount, description, budgetId, userId } =
    parsedBudgetItem.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE budget_items
      SET name = ${name}, amount = ${amountInCents}, description = ${description}
      WHERE id = ${id} AND budget_id = ${budgetId} AND user_id = ${userId}
    `;
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget_items.' };
  }

  revalidatePath('/budgets/current');
  revalidatePath(`/budgets/${budgetId}`);
}
