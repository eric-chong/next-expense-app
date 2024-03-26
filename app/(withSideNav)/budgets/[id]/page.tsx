import { fetchBudgetsDataById } from '@/app/data/budgets';
import BudgetsPage from '@/app/spa/pages/budgets';

interface IParams {
  id: string;
}

export default async function Page({ params }: { params: IParams }) {
  const { budgetItems, budgets, currentBudget } = await fetchBudgetsDataById(
    params.id,
  );

  return (
    <BudgetsPage
      budgetItems={budgetItems}
      budgets={budgets}
      currentBudgetId={currentBudget?.id}
    />
  );
}
