import { UTCDate } from '@date-fns/utc';
import { fetchExpenseItemsByDate } from '@/app/data/expenses';
import ExpensesPage from '@/app/spa/pages/expense';
import { fetchBudgetsDataByDate } from '../data/budgets';

export default async function Page({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const utcDate = date ? new UTCDate(date) : new UTCDate();
  const [expenseItems, { budgetItems }] = await Promise.all([
    fetchExpenseItemsByDate(utcDate),
    fetchBudgetsDataByDate(utcDate),
  ]);

  return (
    <ExpensesPage
      currentDate={utcDate}
      budgetItems={budgetItems}
      expenseItems={expenseItems}
    />
  );
}
