import { UTCDate } from '@date-fns/utc';
import { fetchExpenseItemsByDate } from '@/app/data/expenses';
import ExpensesPage from '@/app/spa/pages/expense';

export default async function Page({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const utcDate = date ? new UTCDate(date) : new UTCDate();
  const expenseItems = await fetchExpenseItemsByDate(utcDate);

  return <ExpensesPage currentDate={utcDate} expenseItems={expenseItems} />;
}
