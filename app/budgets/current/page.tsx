import { fetchBudgetsDataByDate } from '@/app/data/budgets';
import BudgetsPage from '@/app/spa/pages/budgets';

export default async function Page() {
  const { budgetItems, budgets, currentBudget } = await fetchBudgetsDataByDate(
    new Date(),
  );

  return (
    <BudgetsPage
      budgetItems={budgetItems}
      budgets={budgets}
      currentBudgetId={currentBudget?.id}
    />
  );
}
