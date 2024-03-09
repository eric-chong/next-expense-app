import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from 'next-auth';
import { Budget, BudgetItem } from '@/app/types';
import { getBudgetByDate, getBudgetById } from '@/app/utils/budgetHelpers';
import { user } from '@/auth';

const prisma = new PrismaClient();

export async function fetchBudgetsDataByDate(date: Date | string) {
  const budgets = await fetchBudgets();
  const currentBudget = getBudgetByDate(budgets, date);

  const budgetItems = currentBudget
    ? await fetchBudgetItems(currentBudget.id)
    : [];

  return { budgetItems, budgets, currentBudget };
}

export async function fetchBudgetsDataById(budgetId: string) {
  const [budgets, budgetItems] = await Promise.all([
    fetchBudgets(),
    fetchBudgetItems(budgetId),
  ]);
  const currentBudget = getBudgetById(budgets, budgetId);
  return { budgetItems, budgets, currentBudget };
}

export async function fetchBudgets() {
  noStore();
  const userId = await user();
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
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
    });
    return budgetItems.map((budgetItem: any) => {
      return {
        ...budgetItem,
        amount: budgetItem.amount / 100,
      } as BudgetItem;
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget items data.');
  }
}
