'use client';
import { Budget } from '@/app/types';

interface IBudgetNavigator {
  budgets: Array<Budget>;
}

export default function BudgetNavigator({ budgets }: IBudgetNavigator) {
  return <div>{JSON.stringify(budgets)}</div>;
}
