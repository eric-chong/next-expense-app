'use client';
import { BudgetItem } from '@/app/types';

interface IBudgetItemList {
  budgetItems: Array<BudgetItem>;
}

export default function BudgetItemList({ budgetItems }: IBudgetItemList) {
  return <div>{JSON.stringify(budgetItems)}</div>;
}
