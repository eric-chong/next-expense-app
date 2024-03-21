'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ExpenseItem, NewExpenseItem } from '@/app/types';
import {
  expenseItemSchema,
  newExpenseItemSchema,
} from '@/app/schemas/expenses';
import { user } from '@/auth';

const prisma = new PrismaClient();

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
  const amountInCents = amount * 100;

  try {
    await prisma.expenseItem.create({
      data: { date, amount: amountInCents, description, budgetItemId, userId },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update budget_items.' };
  }

  revalidatePath('/expenses');
}
