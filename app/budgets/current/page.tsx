import { fetchBudgetItems, fetchBudgets } from '@/app/actions/budgets';
import useGetBudget from '@/app/hooks/useGetBudget';
import Budgets from '@/app/ui/budgets/Budgets';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const budgets = await fetchBudgets();
  const { getBudgetByDate } = useGetBudget();
  const currentBudget = getBudgetByDate(budgets, new Date());
  console.log('currentBudget that', currentBudget);

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
