import { lusitana } from '@/app/ui/fonts';
import { Budget, BudgetItem } from '@/app/types';
import BudgetNavigator from '../BudgetNavigator';
import BudgetItemTable from '../BudgetItemTable';

interface IBudgets {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId?: string;
}

export default function Budgets({
  budgetItems,
  budgets,
  currentBudgetId,
}: IBudgets) {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Budgets
      </h1>
      {currentBudgetId ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
          <BudgetNavigator budgets={budgets} budgetId={currentBudgetId} />
          <BudgetItemTable
            budgetItems={budgetItems}
            currentBudgetId={currentBudgetId}
          />
        </div>
      ) : (
        <div>There is no budget setup for this date</div>
      )}
    </main>
  );
}
