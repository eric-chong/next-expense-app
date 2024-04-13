import { fetchBudgetsDataById } from '@/app/data/budgets';
import BudgetsPage from '@/app/spa/pages/budgets';

interface IParams {
  id: string;
}

export default async function Page({ params }: { params: IParams }) {
  const {
    budgetItems,
    budgets,
    currentBudget,
    subtotalByMonth,
    subtotalByMonthAndBudgetItem,
  } = await fetchBudgetsDataById(params.id);

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
