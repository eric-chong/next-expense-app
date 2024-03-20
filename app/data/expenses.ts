import { PrismaClient } from '@prisma/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import { unstable_noStore as noStore } from 'next/cache';
import { ExpenseItem } from '@/app/types';
import { user } from '@/auth';

const prisma = new PrismaClient();

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
      orderBy: [{ date: 'asc' }],
    });
    return expenseItems.map((expenseItem: any) => {
      return {
        ...expenseItem,
        amount: expenseItem.amount / 100,
      } as ExpenseItem;
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense items data.');
  }
}
