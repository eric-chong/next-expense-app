'use server';

import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';
import { SubtotalByMonth, SubtotalByMonthBudgetItem } from '../types';

export async function fetchSubtotalPerMonthBudgeItem(budgetId: string) {
  const userId = await user();
  try {
    const expenseSubtotal = (await prisma.$queryRaw(
      Prisma.sql`
          SELECT 
            DATE_TRUNC('month', ei."date") AS "month", 
            ei."budgetItemId",
            SUM(ei."amount") AS "subtotal"
          FROM "ExpenseItem" ei
          INNER JOIN "BudgetItem" bi 
          ON ei."budgetItemId" = bi."id"
          WHERE bi."budgetId" = ${budgetId} AND ei."userId" = ${userId}
          GROUP BY "month", ei."budgetItemId"
        `,
    )) as Array<SubtotalByMonthBudgetItem>;
    return expenseSubtotal.map((row: SubtotalByMonthBudgetItem) => ({
      ...row,
      month: format(new UTCDate(row.month), 'yyyy-MM'),
      subtotal: Number(row.subtotal),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense subtotal data.');
  }
}

export async function fetchSubtotalPerMonth(budgetId: string) {
  const userId = await user();
  try {
    const expenseSubtotal = (await prisma.$queryRaw(
      Prisma.sql`
          SELECT 
            DATE_TRUNC('month', ei."date") AS "month",
            SUM(ei."amount") AS "subtotal"
          FROM "ExpenseItem" ei
          INNER JOIN "BudgetItem" bi 
          ON ei."budgetItemId" = bi."id"
          WHERE bi."budgetId" = ${budgetId} AND ei."userId" = ${userId}
          GROUP BY "month"
        `,
    )) as Array<SubtotalByMonth>;
    console.log('expenseSubtotal', expenseSubtotal);
    return expenseSubtotal.map((row: SubtotalByMonth) => ({
      ...row,
      month: format(new UTCDate(row.month), 'yyyy-MM'),
      subtotal: Number(row.subtotal),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense subtotal data.');
  }
}
