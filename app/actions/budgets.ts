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
import { dollarToCents } from '@/app/utils/numberHelpers';
import { ActionResponse } from './types';

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

export async function updateBudget(budget: Budget): Promise<ActionResponse> {
  const parsedBudget = budgetSchema.safeParse(budget);
  const hasOrphan = await hasOrphanExpenseItems(budget);
  if (hasOrphan)
    return {
      success: false,
      errors: ['orphan.expenses.items'],
      message: 'New budget period has orphan expense items',
    };

  if (!parsedBudget.success) {
    return {
      success: false,
      errors: parsedBudget.error.issues
        .map((issue) => issue.path as string[])
        .flat(),
      message: 'Missing Fields. Failed to update budget.',
    };
  }

  const { id, startDate, endDate, userId } = parsedBudget.data;

  try {
    const result = await prisma.budget.update({
      where: { id, userId },
      data: { startDate, endDate },
    });
    revalidatePath('/budgets/current');
    return {
      success: true,
      data: result,
    };
  } catch (e) {
    return {
      success: false,
      errors: ['databse.error'],
      message: 'Database Error: Failed to Update budget.',
    };
  }
}

async function hasOrphanExpenseItems(budget: Budget) {
  const expenseItems = await prisma.expenseItem.findMany({
    include: { budgetItem: { include: { budget: true } } },
    where: {
      budgetItem: {
        budgetId: { equals: budget.id },
      },
      OR: [
        { date: { lt: budget.startDate } },
        budget.endDate ? { date: { gt: budget.endDate } } : {},
      ],
    },
  });
  return expenseItems.length > 0;
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
  const amountInCents = dollarToCents(amount);

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
  const amountInCents = dollarToCents(amount);

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
