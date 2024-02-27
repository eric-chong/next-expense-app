'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { BudgetItem, NewBudgetItem } from '@/app/types';

const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

const budgetItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  budgetId: z.string().uuid(),
  userId: z.string().uuid(),
});

export async function insertBudgetItem(newBudgetItem: NewBudgetItem) {
  const parseNewBudgetItem = budgetItemSchema
    .omit({ id: true, userId: true })
    .safeParse({ ...newBudgetItem });

  if (!parseNewBudgetItem.success) {
    return {
      errors: parseNewBudgetItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to insert budget item.',
    };
  }

  const { name, amount, description, budgetId } = parseNewBudgetItem.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      INSERT INTO budget_items (name, amount, description, budget_id, user_id)
      VALUES (${name}, ${amountInCents}, ${description}, ${budgetId}, ${userId})
    `;
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget_items.' };
  }

  revalidatePath('/budgets/current');
  revalidatePath(`/budgets/${budgetId}`);
}

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
