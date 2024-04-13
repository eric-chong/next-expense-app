import { fetchBudgetsDataByDate } from '@/app/data/budgets';
import BudgetsPage from '@/app/spa/pages/budgets';

export default async function Page() {
  const {
    budgetItems,
    budgets,
    currentBudget,
    subtotalByMonth,
    subtotalByMonthAndBudgetItem,
  } = await fetchBudgetsDataByDate(new Date());

  return (
    <BudgetsPage
      budgetItems={budgetItems}
      budgets={budgets}
      currentBudgetId={currentBudget?.id}
      summaryData={{
        byMonth: subtotalByMonth,
        byMonthAndBudgetItem: subtotalByMonthAndBudgetItem,
      }}
    />
  );
}
