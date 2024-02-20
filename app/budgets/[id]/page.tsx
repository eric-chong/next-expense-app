import { fetchBudgetsDataById } from '@/app/data/budgets';
import Budgets from '@/app/ui/budgets/Budgets';
import { lusitana } from '@/app/ui/fonts';

interface IParams {
  id: string;
}

export default async function Page({ params }: { params: IParams }) {
  const { budgetItems, budgets, currentBudget } = await fetchBudgetsDataById(
    params.id,
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
