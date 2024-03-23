'use server';

import { revalidatePath } from 'next/cache';
import { BudgetItem, NewBudgetItem } from '@/app/types';
import { budgetItemSchema, newBudgetItemSchema } from '@/app/schemas/budgets';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';

export async function insertBudgetItem(newBudgetItem: NewBudgetItem) {
  const parseNewBudgetItem = newBudgetItemSchema.safeParse({
    ...newBudgetItem,
  });

  if (!parseNewBudgetItem.success) {
    return {
      errors: parseNewBudgetItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to insert budget item.',
    };
  }

  const userId = await user();
  const { name, amount, description, budgetId } = parseNewBudgetItem.data;
  const amountInCents = amount * 100;

  try {
    await prisma.budgetItem.create({
      data: { name, amount: amountInCents, description, budgetId, userId },
    });
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
    await prisma.budgetItem.update({
      where: { id, userId },
      data: {
        name,
        amount: amountInCents,
        description,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget_items.' };
  }

  revalidatePath('/budgets/current');
  revalidatePath(`/budgets/${budgetId}`);
}

export async function deleteBudgetItem(budgetItem: BudgetItem) {
  const parsedBudgetItem = budgetItemSchema.safeParse(budgetItem);
  if (!parsedBudgetItem.success) {
    return {
      errors: parsedBudgetItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to delete budget item.',
    };
  }

  const { id, budgetId } = parsedBudgetItem.data;

  try {
    await prisma.budgetItem.delete({ where: { id } });
  } catch (e) {
    return { message: 'Database Error: Failed to delete budget_items.' };
  }

  revalidatePath('/budgets/current');
  revalidatePath(`/budgets/${budgetId}`);
}
