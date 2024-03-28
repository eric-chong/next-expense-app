'use server';

import { revalidatePath } from 'next/cache';
import { Budget, BudgetItem, NewBudget, NewBudgetItem } from '@/app/types';
import {
  budgetItemSchema,
  budgetSchema,
  newBudgetItemSchema,
  newBudgetSchema,
} from '@/app/schemas/budgets';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';

export async function insertBudget(newBudget: NewBudget) {
  const parsedNewBudget = newBudgetSchema.safeParse({ ...newBudget });

  if (!parsedNewBudget.success) {
    return {
      errors: parsedNewBudget.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to insert budget.',
    };
  }

  const userId = await user();
  const { startDate, endDate } = parsedNewBudget.data;

  try {
    await prisma.budget.create({
      data: { startDate, endDate, userId },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update budgets.' };
  }

  revalidatePath('/budgets/current');
}

export async function updateBudget(budget: Budget) {
  const parsedBudget = budgetSchema.safeParse(budget);

  if (!parsedBudget.success) {
    return {
      errors: parsedBudget.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update budget.',
    };
  }

  const { id, startDate, endDate, userId } = parsedBudget.data;

  try {
    await prisma.budget.update({
      where: { id, userId },
      data: { startDate, endDate },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget.' };
  }

  revalidatePath('/budgets/current');
}

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
