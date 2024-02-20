import { fetchBudgetsDataByDate } from '@/app/data/budgets';
import Budgets from '@/app/ui/budgets/Budgets';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const { budgetItems, budgets, currentBudget } = await fetchBudgetsDataByDate(
    new Date(),
  );

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
