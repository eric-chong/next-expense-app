import { fetchBudgetItems, fetchBudgets } from '@/app/data/budgets';
import useGetBudget from '@/app/hooks/useGetBudget';
import Budgets from '@/app/ui/budgets/Budgets';
import { lusitana } from '@/app/ui/fonts';

interface IParams {
  id: string;
}

export default async function Page({ params }: { params: IParams }) {
  const budgets = await fetchBudgets();
  const { getBudgetById } = useGetBudget();
  const currentBudget = getBudgetById(budgets, params.id);
  console.log('currentBudget this?', currentBudget);

  const budgetItems = currentBudget
    ? await fetchBudgetItems(currentBudget.id)
    : [];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Budgets
      </h1>
      {currentBudget ? (
        <Budgets
          budgetItems={budgetItems}
          budgets={budgets}
          currentBudgetId={currentBudget.id}
        />
      ) : (
        <div>There is no budget setup for this date</div>
      )}
    </main>
  );
}
