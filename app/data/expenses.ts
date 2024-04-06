'use server';

import { endOfMonth, startOfMonth } from 'date-fns';
import { unstable_noStore as noStore } from 'next/cache';
import { ExpenseItem } from '@/app/types';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';

export async function fetchExpenseItemsByDate(
  date: Date | string,
): Promise<ExpenseItem[]> {
  noStore();
  const userId = await user();
  try {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const expenseItems = await prisma.expenseItem.findMany({
      where: { userId, date: { gte: start, lte: end } },
      orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
    });
    return expenseItems.map((expenseItem: any) => {
      return {
        ...expenseItem,
        amount: expenseItem.amount,
      } as ExpenseItem;
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense items data.');
  }
}

export async function fetchExpenseItemDescriptions(budgetItemId: string) {
  noStore();
  const userId = await user();
  try {
    const descriptions = await prisma.expenseItem.groupBy({
      by: ['description'],
      where: { userId, budgetItemId },
      _count: { description: true },
      orderBy: { _count: { description: 'desc' } },
      take: 30,
    });
    return descriptions;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
