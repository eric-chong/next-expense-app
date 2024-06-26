'use server';

import { revalidatePath } from 'next/cache';
import { ExpenseItem, NewExpenseItem } from '@/app/types';
import {
  expenseItemSchema,
  newExpenseItemSchema,
} from '@/app/schemas/expenses';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';
import { dollarToCents } from '@/app/utils/numberHelpers';

export async function insertExpenseItem(newExpenseItem: NewExpenseItem) {
  const parseNewExpenseItem = newExpenseItemSchema.safeParse({
    ...newExpenseItem,
  });

  if (!parseNewExpenseItem.success) {
    return {
      errors: parseNewExpenseItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to insert expense item.',
    };
  }

  const userId = await user();
  const { date, amount, description, budgetItemId } = parseNewExpenseItem.data;
  const amountInCents = dollarToCents(amount);

  try {
    await prisma.expenseItem.create({
      data: { date, amount: amountInCents, description, budgetItemId, userId },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget_items.' };
  }

  revalidatePath('/expenses');
}

export async function updateExpenseItem(expenseItem: ExpenseItem) {
  const parsedExpenseItem = expenseItemSchema.safeParse(expenseItem);

  if (!parsedExpenseItem.success) {
    return {
      errors: parsedExpenseItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update expense item.',
    };
  }

  const { id, date, amount, description, budgetItemId, userId } =
    parsedExpenseItem.data;
  const amountInCents = dollarToCents(amount);

  try {
    await prisma.expenseItem.update({
      where: { id, userId },
      data: {
        date,
        amount: amountInCents,
        description,
        budgetItemId,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update expense_items.' };
  }

  revalidatePath('/expenses');
}

export async function deleteExpenseItem(expenseItem: ExpenseItem) {
  const parsedExpenseItem = expenseItemSchema.safeParse(expenseItem);
  if (!parsedExpenseItem.success) {
    return {
      errors: parsedExpenseItem.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to delete budget item.',
    };
  }

  const { id } = parsedExpenseItem.data;

  try {
    await prisma.expenseItem.delete({ where: { id } });
  } catch (e) {
    return { message: 'Database Error: Failed to delete budget_items.' };
  }

  revalidatePath('/expenses');
}
