import { unstable_noStore as noStore } from 'next/cache';
import { Budget, BudgetItem } from '@/app/types';
import { getBudgetByDate, getBudgetById } from '@/app/utils/budgetHelpers';
import { user } from '@/auth';
import { prisma } from '@/prismaClient';
import { centsToDollar } from '@/app/utils/numberHelpers';
import {
  fetchSubtotalPerMonth,
  fetchSubtotalPerMonthBudgeItem,
} from './summarize';

export async function fetchBudgetsDataByDate(date: Date | string) {
  const budgets = await fetchBudgets();
  const currentBudget = getBudgetByDate(budgets, date);

  const [
    budgetItems = [],
    subtotalByMonth = [],
    subtotalByMonthAndBudgetItem = [],
  ] = currentBudget
    ? await Promise.all([
        fetchBudgetItems(currentBudget.id),
        fetchSubtotalPerMonth(currentBudget.id),
        fetchSubtotalPerMonthBudgeItem(currentBudget.id),
      ])
    : [];

  return {
    budgetItems,
    budgets,
    currentBudget,
    subtotalByMonth,
    subtotalByMonthAndBudgetItem,
  };
}

export async function fetchBudgetsDataById(budgetId: string) {
  const [budgets, budgetItems, subtotalByMonth, subtotalByMonthAndBudgetItem] =
    await Promise.all([
      fetchBudgets(),
      fetchBudgetItems(budgetId),
      fetchSubtotalPerMonth(budgetId),
      fetchSubtotalPerMonthBudgeItem(budgetId),
    ]);
  const currentBudget = getBudgetById(budgets, budgetId);
  return {
    budgetItems,
    budgets,
    currentBudget,
    subtotalByMonth,
    subtotalByMonthAndBudgetItem,
  };
}

export async function fetchBudgets() {
  noStore();
  const userId = await user();
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: [{ startDate: 'asc' }],
    });
    return budgets.map((budget: any) => {
      return budget as Budget;
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget data.');
  }
}

export async function fetchBudgetItems(budgetId: string) {
  noStore();
  try {
    const budgetItems = await prisma.budgetItem.findMany({
      where: { budgetId },
      orderBy: [{ name: 'asc' }],
    });
    return budgetItems.map((budgetItem: any) => {
      return {
        ...budgetItem,
        amount: centsToDollar(budgetItem.amount),
      } as BudgetItem;
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget items data.');
  }
}
