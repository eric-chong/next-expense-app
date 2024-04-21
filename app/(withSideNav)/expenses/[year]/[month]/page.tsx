import { fetchBudgetsDataByDate } from '@/app/data/budgets';
import { fetchExpenseItemsByDate } from '@/app/data/expenses';
import ExpensesPage from '@/app/spa/pages/expense';
import { UTCDate } from '@date-fns/utc';

interface IParams {
  year: string;
  month: string;
}

export default async function Page({ params }: { params: IParams }) {
  const { year, month } = params;
  const date = new UTCDate(`${year}-${month}-01`);

  const [
    expenseItems,
    { budgetItems, subtotalByMonthAndBudgetItem: budgetItemSubtotals },
  ] = await Promise.all([
    fetchExpenseItemsByDate(date),
    fetchBudgetsDataByDate(date),
  ]);

  return (
    <ExpensesPage
      budgetItems={budgetItems}
      expenseItems={expenseItems}
      budgetItemSubtotals={budgetItemSubtotals}
    />
  );
}
