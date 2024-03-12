import { UTCDate } from '@date-fns/utc';
import { fetchExpenseItemsByDate } from '@/app/data/expenses';
import ExpensesPage from '@/app/spa/pages/expense';

export default async function Page({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const expenseItems = await fetchExpenseItemsByDate(
    date ? new UTCDate(date) : new UTCDate(),
  );

  return <ExpensesPage expenseItems={expenseItems} />;
}
