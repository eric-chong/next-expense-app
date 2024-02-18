import { sql } from '@vercel/postgres';
import camelcaseKeys from 'camelcase-keys';
import { Budget, BudgetItem } from '@/app/types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchBudgets(userId: string) {
  noStore(); // TODO: remove later
  try {
    const data =
      await sql<Budget>`SELECT * FROM budgets WHERE user_id = ${userId}`;

    return camelcaseKeys(data.rows);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget data.');
  }
}

export async function fetchBudgetItems(userId: string, budgetId: string) {
  try {
    const data = await sql<BudgetItem>`
        SELECT * 
        FROM budget_items 
        WHERE 
          user_id = ${userId} AND 
          budget_id = ${budgetId}`;

    return camelcaseKeys(data.rows);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget items data.');
  }
}
